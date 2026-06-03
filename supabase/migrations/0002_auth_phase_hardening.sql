-- ============================================================
-- 0002_auth_phase_hardening.sql — Auth phase DB hardening
-- ============================================================

-- Keep denormalized bridge ownership tied to the referenced owner rows.
ALTER TABLE public.transaction_labels
  ADD CONSTRAINT transaction_labels_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.transactions
  ADD CONSTRAINT transactions_id_user_id_key UNIQUE (id, user_id);

ALTER TABLE public.labels
  ADD CONSTRAINT labels_id_user_id_key UNIQUE (id, user_id);

ALTER TABLE public.transaction_labels
  ADD CONSTRAINT transaction_labels_transaction_owner_fkey
  FOREIGN KEY (transaction_id, user_id)
  REFERENCES public.transactions(id, user_id)
  ON DELETE CASCADE;

ALTER TABLE public.transaction_labels
  ADD CONSTRAINT transaction_labels_label_owner_fkey
  FOREIGN KEY (label_id, user_id)
  REFERENCES public.labels(id, user_id)
  ON DELETE CASCADE;

-- Central updated_at maintenance for all tables that expose updated_at.
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_labels_updated_at ON public.labels;
CREATE TRIGGER set_labels_updated_at
  BEFORE UPDATE ON public.labels
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_recurring_templates_updated_at ON public.recurring_templates;
CREATE TRIGGER set_recurring_templates_updated_at
  BEFORE UPDATE ON public.recurring_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_installment_plans_updated_at ON public.installment_plans;
CREATE TRIGGER set_installment_plans_updated_at
  BEFORE UPDATE ON public.installment_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_transactions_updated_at ON public.transactions;
CREATE TRIGGER set_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
