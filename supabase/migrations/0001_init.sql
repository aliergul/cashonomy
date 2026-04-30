-- ============================================================
-- 0001_init.sql — Cashonomy initial schema
-- ============================================================

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  avatar_url    TEXT,
  base_currency CHAR(3)     NOT NULL DEFAULT 'USD',
  timezone      TEXT        NOT NULL DEFAULT 'UTC',
  locale        TEXT        NOT NULL DEFAULT 'tr',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at    TIMESTAMPTZ
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT
  USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE
  USING (auth.uid() = id);

-- Auto-create profile on new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url) 
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- LABELS
-- ============================================================
CREATE TABLE public.labels (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT        NOT NULL,
  type       TEXT        NOT NULL CHECK (type IN ('income', 'expense', 'both')),
  color      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Partial unique enforced via unique index (standard SQL UNIQUE doesn't support WHERE)
CREATE UNIQUE INDEX labels_user_id_name_active_uidx
  ON public.labels (user_id, name)
  WHERE deleted_at IS NULL;

ALTER TABLE public.labels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "labels_select_own" ON public.labels FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "labels_insert_own" ON public.labels FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "labels_update_own" ON public.labels FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "labels_delete_own" ON public.labels FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- RECURRING TEMPLATES
-- ============================================================
CREATE TABLE public.recurring_templates (
  id                   UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID           NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type                 TEXT           NOT NULL CHECK (type IN ('income', 'expense')),
  amount               NUMERIC(15,2)  NOT NULL,
  currency             CHAR(3)        NOT NULL,
  description          TEXT,
  frequency            TEXT           NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly')),
  start_date           DATE           NOT NULL,
  end_date             DATE,
  last_generated_until DATE,
  created_at           TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  deleted_at           TIMESTAMPTZ
);

ALTER TABLE public.recurring_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "recurring_templates_select_own" ON public.recurring_templates FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "recurring_templates_insert_own" ON public.recurring_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "recurring_templates_update_own" ON public.recurring_templates FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "recurring_templates_delete_own" ON public.recurring_templates FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- INSTALLMENT PLANS
-- ============================================================
CREATE TABLE public.installment_plans (
  id                  UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID           NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount        NUMERIC(15,2)  NOT NULL,
  currency            CHAR(3)        NOT NULL,
  total_installments  INT            NOT NULL CHECK (total_installments > 0),
  installment_amount  NUMERIC(15,2)  NOT NULL,
  description         TEXT,
  start_date          DATE           NOT NULL,
  created_at          TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ
);

ALTER TABLE public.installment_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "installment_plans_select_own" ON public.installment_plans FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "installment_plans_insert_own" ON public.installment_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "installment_plans_update_own" ON public.installment_plans FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "installment_plans_delete_own" ON public.installment_plans FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- TRANSACTIONS (core table)
-- ============================================================
CREATE TABLE public.transactions (
  id                    UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID           NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type                  TEXT           NOT NULL CHECK (type IN ('income', 'expense')),
  status                TEXT           NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'unpaid')),
  amount                NUMERIC(15,2)  NOT NULL,
  currency              CHAR(3)        NOT NULL,
  normalized_amount     NUMERIC(15,2)  NOT NULL,
  exchange_rate_at_time NUMERIC(20,8)  NOT NULL,
  base_currency_at_time CHAR(3)        NOT NULL,
  transaction_date      DATE           NOT NULL,
  year                  INT            GENERATED ALWAYS AS (EXTRACT(YEAR  FROM transaction_date)::INT) STORED,
  month                 INT            GENERATED ALWAYS AS (EXTRACT(MONTH FROM transaction_date)::INT) STORED,
  description           TEXT,
  source_type           TEXT           NOT NULL CHECK (source_type IN ('manual', 'recurring', 'installment')),
  source_id             UUID,
  parent_id             UUID           REFERENCES public.transactions(id),
  installment_number    INT,
  is_generated          BOOLEAN        NOT NULL DEFAULT FALSE,
  is_modified           BOOLEAN        NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  deleted_at            TIMESTAMPTZ
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transactions_select_own" ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "transactions_insert_own" ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "transactions_update_own" ON public.transactions FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "transactions_delete_own" ON public.transactions FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX transactions_user_year_month_idx  ON public.transactions (user_id, year, month);
CREATE INDEX transactions_user_date_idx        ON public.transactions (user_id, transaction_date DESC);
CREATE INDEX transactions_parent_id_idx        ON public.transactions (parent_id);
CREATE INDEX transactions_source_idx           ON public.transactions (source_type, source_id);
CREATE INDEX transactions_unpaid_idx           ON public.transactions (user_id, status) WHERE status = 'unpaid';

-- ============================================================
-- TRANSACTION LABELS (many-to-many bridge)
-- ============================================================
CREATE TABLE public.transaction_labels (
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  label_id       UUID NOT NULL REFERENCES public.labels(id)       ON DELETE CASCADE,
  user_id        UUID NOT NULL,
  PRIMARY KEY (transaction_id, label_id)
);

ALTER TABLE public.transaction_labels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transaction_labels_select_own" ON public.transaction_labels FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "transaction_labels_insert_own" ON public.transaction_labels FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "transaction_labels_update_own" ON public.transaction_labels FOR UPDATE
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "transaction_labels_delete_own" ON public.transaction_labels FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX transaction_labels_label_id_idx       ON public.transaction_labels (label_id);
CREATE INDEX transaction_labels_transaction_id_idx ON public.transaction_labels (transaction_id);

-- ============================================================
-- HISTORICAL RATES (shared table — no user_id)
-- ============================================================
CREATE TABLE public.historical_rates (
  id              UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency   CHAR(3)        NOT NULL,
  target_currency CHAR(3)        NOT NULL,
  rate            NUMERIC(20,8)  NOT NULL,
  date            DATE           NOT NULL,
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  UNIQUE (base_currency, target_currency, date)
);

ALTER TABLE public.historical_rates ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read; service_role writes (no INSERT/UPDATE/DELETE policy needed)
CREATE POLICY "historical_rates_select_authenticated" ON public.historical_rates FOR SELECT
  TO authenticated
  USING (TRUE);
