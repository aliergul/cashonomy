# Cashonomy - MASTER Progress Tracker

Bu dosya, Cashonomy kişisel finans uygulamasının geliştirme sürecini takip etmek için kullanılır.

**Teknoloji Yığını:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase (PostgreSQL & Auth), Zustand (State Management), Recharts.

**Test Yığını:** Vitest (unit), Playwright (E2E), MSW (API mock).
**Observability:** Pino (logger), Sentry (error tracking — opsiyonel ama Faz 4'ten itibaren wrapper hazır olacak).
**Form & Validation:** react-hook-form + zod.

---

## 🤖 AI AGENT ÇALIŞMA KURALLARI (CRITICAL INSTRUCTIONS)

_Bu dosyayı okuyan Yapay Zeka Asistanı, aşağıdaki kurallara KESİNLİKLE uymak zorundadır:_

1. **Adım Adım İlerle (Step-by-Step):** Asla birden fazla maddeyi aynı anda yapmaya çalışma. Sadece senden istenen spesifik maddeye odaklan.
2. **Onay Bekle (Wait for Confirmation):** Üzerinde çalıştığın madde ile ilgili kodlamayı bitirdiğinde dur. Asla bir sonraki maddeye kendi inisiyatifinle geçme. Kullanıcıdan devam komutu bekle.
3. **Git Commit & Push:** Kullanıcı bir maddenin/fazın başarıyla tamamlandığını onayladığında, değişiklikleri Git'e kaydet ve sade bir mesajla GitHub'a pushla. Commit mesaj formatı: `feat(phase-X): ingilizce kısa açıklama` veya `fix/chore/test/refactor`.
4. **Kapsam Dışına Çıkma (No Hallucination):** Kullanıcı aksini belirtmedikçe bu belgedeki teknoloji yığınının ve mimari kararların dışına çıkma. Faz 0'daki kararlar bağlayıcıdır.
5. **Durum Güncellemesi (Update State):** Tamamlanan adımların başındaki `[ ]` işaretini `[x]` olarak değiştir. Bu güncellemeyi kullanıcı onayından sonra, commit'ten önce yap.
6. **Test Zorunluluğu:** Her kritik feature veya servis yazımından sonra en az 1 test senaryosu/manuel kontrol mekanizması oluştur. Service Layer (Faz 4) için unit test ZORUNLUDUR, opsiyonel değildir.
7. **Strict Service Boundaries:** UI bileşenleri DB'ye (özellikle write işlemleri için) ASLA direkt istek atamaz, tüm işlemler Service Layer üzerinden geçmelidir. Read için bile UI'dan supabase client'a doğrudan erişim YASAKTIR — service layer kullan.
8. **Soft Delete Kuralı:** Hiçbir kayıt fiziksel olarak silinmez (`deleted_at` güncellenir). Uygulama genelindeki TÜM okuma (read) sorgularında `deleted_at IS NULL` şartı KESİNLİKLE bulunmalıdır. Servis katmanında bunu zorlayan bir helper (`baseQuery`) yazılacak.
9. **Faz Bağımlılığı:** Bir faz tamamlanmadan sonraki faza geçilmez. Tek istisna: Faz 1'deki logger ve test kurulumu, Faz 4 başlamadan önce hazır olmalıdır.
10. **Belirsizlik Durumu:** Bir adımı uygularken Faz 0 kararlarıyla çelişen bir durum oluşursa kod yazma, kullanıcıya sor. Asla varsayım yapıp ilerleme.
11. **Next.js Özellikleri:** Özellikle Tailwind ve Next.js kullanacağın için; CSS bundle size'ını minimumda tut, gereksiz class kalabalığı yaratma (PurgeCSS mantığıyla temiz çalış) ve Next.js'in code splitting (kod bölümlendirme) özelliklerini efektif kullan, Next.js özelliklerini kullan.
12. **Shadcn/ui:** Kendi özel (custom) UI bileşenini sıfırdan yazmadan önce mutlaka mevcut shadcn/ui bileşenlerini kontrol et. Tekrar eden, ölü koddan kaçın.

---

## 🎨 UI & TASARIM PRENSİPLERİ (GLOBAL BINDING RULES)
1. **Tasarım Dili (Vibe):** Cashonomy; Vercel / Linear tarzı modern, minimalist, güven veren ve temiz bir arayüze sahip olmalıdır.
2. **Renk Paleti:** Ana yapı (arkaplanlar, metinler, kenarlıklar) için Tailwind'in `zinc` veya `slate` tonları kullanılacaktır. Gelirler (income) için `emerald`, giderler (expense) için `rose` veya `red` aksan renkleri tercih edilecektir. Her iki temanın da (Dark/Light) kusursuz görünmesi şarttır.
3. **Layout & Boşluklar (Whitespace):** Arayüz sıkışık olmamalıdır. İnce kenarlıklar (`border`), hafif gölgeler (`shadow-sm` veya `shadow-md`) ve bol beyaz alan (cömert padding/margin) kullanılmalıdır.
4. **Bileşen Kullanımı:** shadcn/ui bileşenleri (Card, Button, Input vb.) her zaman önceliklidir.

---

## 🔴 FAZ 0 — PRODUCT & SYSTEM DESIGN (TAMAMLANDI / BAĞLAYICI KARARLAR)

_Sistem mimarisi ve iş kuralları kararları. Bu kararların dışına çıkılamaz._

### Temel Mimari

- [x] **MVP Scope:** Sadece localhost. Nihai sürüm Vercel'e yüklenecek.
- [x] **Multi-tenancy:** Tek Supabase projesi, tek DB. Her tabloda `user_id UUID NOT NULL REFERENCES auth.users(id)` kolonu olacak. İzolasyon RLS ile sağlanacak.

### Veri Üretim Stratejisi

- [x] **Aylık Veri Oluşturma (Pre-generated):** İleri tarihli/tekrarlayan işlemler girildiği an, veri tabanında ilgili tüm aylar için gerçek `transaction` kayıtları oluşturulacak.
- [x] **Tekrarlayan Ödeme Üretim Limiti:** `end_date` belirtilmeyen tekrarlayan ödemeler için sistem **bugünden itibaren 24 ay ileri** kayıt üretecek. Kullanıcı app'i her açtığında, son üretim tarihinden itibaren eksik aylar tamamlanacak (lazy generation). Kullanıcı isterse `end_date` ile sınırlandırabilir.
- [x] **Taksit Sistemi & Migration:** Her ay için ayrı kayıt oluşturulacak. Devam eden ödemeler geçmiş ve gelecek destekli sisteme girilebilecek.

### Veri Bütünlüğü

- [x] **Güncelleme Stratejisi (Immutable Past):** Geçmiş kayıtlar (transaction_date < bugün) değişmez kalacak, sadece gelecekteki kayıtlar serideki değişikliklerden etkilenecek. Herhangi bir ay manuel bağımsız düzenlenebilecek.
- [x] **Base Currency Değişikliği:** Kullanıcı `base_currency`'sini değiştirirse, **geçmiş kayıtların `normalized_amount` değerleri DEĞİŞMEZ** (Immutable Past kuralı gereği). Sadece yeni eklenecek kayıtlar yeni base currency'e göre normalize edilir. Dashboard'da çoklu base currency dönemi varsa kullanıcı uyarılır.

### Currency & Precision

- [x] **Currency Normalization:** Her kullanıcının bir `base_currency`'si olacak. Eklenen her kayıt, anlık kura göre `normalized_amount` kolonuna bu base currency cinsinden yazılacak.
- [x] **Money Storage Type:** PostgreSQL'de `NUMERIC(15, 2)` kullanılacak (max 13 haneli tam kısım, 2 ondalık). JS tarafında parasal işlemler için `decimal.js` kütüphanesi zorunlu — native `number` ile parasal hesap yasak.
- [x] **Rounding Strategy:** Half-to-even (banker's rounding), 2 ondalık. Tüm servislerde merkezi `roundMoney(amount)` helper'ı üzerinden geçecek.

### Tarih & Zaman

- [x] **Timezone Stratejisi:** Tüm `*_at` (timestamp) kolonları DB'de UTC (`TIMESTAMPTZ`) olarak saklanır. `transaction_date` ise kullanıcının lokal tarihi olarak `DATE` tipinde saklanır (timezone bilgisi olmadan) — çünkü kullanıcı için "23 Nisan'da kira ödedim" ifadesi UTC'den bağımsızdır. `year` ve `month` kolonları `transaction_date`'ten türetilir.
- [x] **Profile Timezone:** `profiles.timezone` kolonu olacak (default `'UTC'`, kayıt sırasında browser'dan IANA zone alınacak — örn. `'Europe/Istanbul'`). UI'da tüm tarih gösterimleri bu zone'a göre formatlanacak.

### Güvenlik & Erişim

- [x] **RLS Policy Şablonu:** Tüm tablolarda 4 policy zorunlu — SELECT/INSERT/UPDATE/DELETE, hepsi `auth.uid() = user_id` koşuluyla. `historical_rates` tablosu istisna (paylaşımlı, herkes okur, kimse yazmaz — service role yazar).
- [x] **Veri Silme (Hesap Kapatma / GDPR-KVKK):** Kullanıcı hesap silmek istediğinde 2 seçenek sunulacak: (1) Soft delete (30 gün içinde geri alınabilir), (2) Hard delete (kullanıcının tüm `user_id`'li kayıtları DB'den fiziksel silinir). Bu Faz 12'de uygulanacak.
- [x] **Veri Export:** Kullanıcı tüm verisini CSV ve JSON olarak export edebilecek (Faz 12).

### Şema Yönetimi

- [x] **Migration Stratejisi:** Supabase CLI migrations kullanılacak (`supabase/migrations/` klasörü). Her şema değişikliği numaralı migration dosyası olarak commit'lenecek. Manuel SQL execute YASAK.

---

## 🛠 FAZ 1 — PROJECT SETUP

- [x] Next.js (App Router), TypeScript (strict mode), Tailwind CSS kurulumu.
- [x] shadcn/ui kurulumu (button, input, card, dialog, form, sonner, dropdown-menu, table, sheet vb.).
- [x] ESLint + Prettier ayarları (import sort, tailwind plugin).
- [x] Klasör yapısı:
  ```
  app/                  # Next.js routes
  components/ui/        # shadcn/ui base components
  components/shared/    # Uygulama geneli paylaşılan bileşenler
  modules/              # Feature-based modüller (transactions, labels, dashboard, vb.)
  services/             # DB ile konuşan tek katman
  lib/                  # Utility (money.ts, date.ts, logger.ts, supabase.ts)
  hooks/                # Custom React hooks
  stores/               # Zustand stores
  types/                # Shared TS types
  supabase/migrations/  # SQL migrations
  tests/                # Unit + E2E
  ```
- [x] Supabase bağlantısı (`@supabase/ssr`) ve `.env.local` ayarı (server + client client'ları ayrı).
- [x] `next-themes` (Dark/Light mode) ve i18n (TR/EN, `next-intl`) kurulumu.
- [x] **Logger kurulumu:** `lib/logger.ts` — Pino tabanlı wrapper. Service layer ve API routes bunu kullanacak.
- [x] **Test infra kurulumu:** Vitest config, Playwright config, MSW setup. Hello-world testi geçecek.
- [x] **decimal.js** ve `lib/money.ts` (toMoney, addMoney, roundMoney, formatMoney helper'ları) kurulumu.
- [x] **Manuel kontrol:** `npm run dev`, `npm run lint`, `npm run test`, `npm run test:e2e` komutları çalışıyor olmalı.
- [x] Supabase Type Generation: Veritabanı şeması oluşturulduktan sonra npx supabase gen types typescript --local > types/supabase.ts komutu çalıştırılarak DB tipleri projeye dahil edilecek. Tüm servisler bu tipleri (Database interface) kullanacak.

---

## 🗄 FAZ 2 — DATABASE DESIGN (SUPABASE & SQL)

_Aşağıdaki yapı için RLS politikaları ve Index'ler kesinlikle kurulacak. Tüm tablolarda `user_id` ZORUNLUDUR (historical_rates hariç)._

### Tablolar

- [x] `profiles`
  - `id UUID PK REFERENCES auth.users(id) ON DELETE CASCADE`
  - `full_name TEXT`
  - `avatar_url TEXT`
  - `base_currency CHAR(3) NOT NULL DEFAULT 'USD'`
  - `timezone TEXT NOT NULL DEFAULT 'UTC'` (IANA timezone, örn. `'Europe/Istanbul'`)
  - `locale TEXT NOT NULL DEFAULT 'tr'` (`'tr' | 'en'`)
  - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
  - `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`
  - `deleted_at TIMESTAMPTZ` (soft delete — hesap pasifleştirme)

- [x] `labels`
  - `id UUID PK DEFAULT gen_random_uuid()`
  - `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
  - `name TEXT NOT NULL`
  - `type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'both'))`
  - `color TEXT` (hex, opsiyonel — UI için)
  - `created_at`, `updated_at`, `deleted_at`
  - UNIQUE(user_id, name) WHERE deleted_at IS NULL

- [x] `recurring_templates`
  - `id UUID PK`, `user_id UUID NOT NULL`
  - `type TEXT CHECK (type IN ('income', 'expense'))`
  - `amount NUMERIC(15,2) NOT NULL`
  - `currency CHAR(3) NOT NULL`
  - `description TEXT`
  - `frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly'))`
  - `start_date DATE NOT NULL`
  - `end_date DATE` (nullable — null ise 24 ay üretim kuralı uygulanır)
  - `last_generated_until DATE` (lazy generation için cursor)
  - `created_at`, `updated_at`, `deleted_at`

- [x] `installment_plans`
  - `id UUID PK`, `user_id UUID NOT NULL`
  - `total_amount NUMERIC(15,2) NOT NULL`
  - `currency CHAR(3) NOT NULL`
  - `total_installments INT NOT NULL CHECK (total_installments > 0)`
  - `installment_amount NUMERIC(15,2) NOT NULL` (total / count, son taksitte yuvarlama farkı düzeltilir)
  - `description TEXT`
  - `start_date DATE NOT NULL`
  - `created_at`, `updated_at`, `deleted_at`

- [x] `transactions` — **CORE TABLO**
  - `id UUID PK`, `user_id UUID NOT NULL`
  - `type TEXT NOT NULL CHECK (type IN ('income', 'expense'))`
  - `status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'unpaid'))`
  - `amount NUMERIC(15,2) NOT NULL`
  - `currency CHAR(3) NOT NULL`
  - `normalized_amount NUMERIC(15,2) NOT NULL` (base_currency cinsinden)
  - `exchange_rate_at_time NUMERIC(20,8) NOT NULL`
  - `base_currency_at_time CHAR(3) NOT NULL` (kayıt anındaki base currency — sonradan değişse bile değişmez)
  - `transaction_date DATE NOT NULL`
  - `year INT NOT NULL` (generated: `EXTRACT(YEAR FROM transaction_date)`)
  - `month INT NOT NULL` (generated: `EXTRACT(MONTH FROM transaction_date)`)
  - `description TEXT`
  - `source_type TEXT NOT NULL CHECK (source_type IN ('manual', 'recurring', 'installment'))`
  - `source_id UUID` (recurring_templates.id veya installment_plans.id)
  - `parent_id UUID REFERENCES transactions(id)` (seri içi referans)
  - `installment_number INT` (taksit sırası, sadece installment için)
  - `is_generated BOOLEAN NOT NULL DEFAULT FALSE`
  - `is_modified BOOLEAN NOT NULL DEFAULT FALSE` (seri kaydı manuel düzenlenmiş mi)
  - `created_at`, `updated_at`, `deleted_at`

- [x] `transaction_labels` (many-to-many bridge)
  - `transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE`
  - `label_id UUID REFERENCES labels(id) ON DELETE CASCADE`
  - `user_id UUID NOT NULL` (RLS performance için denormalize)
  - PRIMARY KEY (transaction_id, label_id)

- [x] `historical_rates` (paylaşımlı tablo, user_id YOK)
  - `id UUID PK`
  - `base_currency CHAR(3) NOT NULL`
  - `target_currency CHAR(3) NOT NULL`
  - `rate NUMERIC(20,8) NOT NULL`
  - `date DATE NOT NULL`
  - UNIQUE(base_currency, target_currency, date)
  - `created_at`

### RLS Policies

- [x] Tüm kullanıcı-bağlı tablolarda 4 policy:
  ```sql
  CREATE POLICY "users_select_own" ON {table} FOR SELECT
    USING (auth.uid() = user_id);
  CREATE POLICY "users_insert_own" ON {table} FOR INSERT
    WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "users_update_own" ON {table} FOR UPDATE
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "users_delete_own" ON {table} FOR DELETE
    USING (auth.uid() = user_id);
  ```
- [x] `historical_rates`: SELECT herkese açık (authenticated), INSERT/UPDATE/DELETE sadece `service_role`.
- [x] `profiles` için INSERT trigger: yeni `auth.users` kaydında otomatik profile oluştur.

### Indexler

- [x] `transactions(user_id, year, month)` — listeleme için.
- [x] `transactions(user_id, transaction_date DESC)` — son işlemler için.
- [x] `transactions(parent_id)` — seri sorguları.
- [x] `transactions(source_type, source_id)` — kaynak takibi.
- [x] `transactions(user_id, status)` WHERE status = 'unpaid' — partial index, notification için.
- [x] `transaction_labels(label_id)` ve `(transaction_id)`.
- [x] `historical_rates(base_currency, target_currency, date)` — UNIQUE zaten var, query optimizer kullanır.

### Soft Delete Helper

- [x] DB-level görünüm veya servis-level helper: `deleted_at IS NULL` filtresinin kaçırılmaması için service layer'da `baseQuery()` zorunlu kullanılacak.

### Migration & Verification

- [x] Tüm yapı `supabase/migrations/0001_init.sql` olarak commit'lenecek.
- [x] Manuel kontrol: 2 farklı user oluştur, A user'ı B user'ının verisini hiçbir endpoint'ten göremediğini doğrula.

---

## 🔐 FAZ 3 — AUTH SYSTEM

- [x] Email/Şifre ile kayıt ve giriş ekranları (shadcn/ui form + zod).
- [x] Email confirmation flow (Supabase default).
- [ ] Şifre sıfırlama flow.
- [ ] Google Auth entegrasyonu (Supabase üzerinden).
- [ ] Protected Routes (Next.js middleware) — `/app/(protected)/*` route group.
- [ ] Auth context provider (Zustand auth store).
- [ ] **Manuel kontrol:** Logged-out user protected route'a erişemiyor; logged-in user `/login`'e gittiğinde dashboard'a redirect oluyor.

---

## 🧩 FAZ 4 — SERVICE LAYER (CRITICAL CORE LOGIC)

_DB işlemlerini UI'dan soyutlayan katman ve core algoritmalar. Logger ve test infra Faz 1'de hazır olmalı._

### Servisler

- [ ] `lib/services/base.ts`: `baseQuery()` helper — soft delete filtresini otomatik uygular.
- [ ] `transaction.service.ts`: Tekil CRUD işlemleri (create, getById, list, update, softDelete).
- [ ] `recurring.service.ts`: Sabit ödemelerin şablondan üretimi. `generateUntil(date)` fonksiyonu — lazy generation.
- [ ] `installment.service.ts`: Taksit üretimi, son taksitte yuvarlama düzeltmesi.
- [ ] `label.service.ts`: Etiket CRUD ve transaction-label bağlama.
- [ ] `currency.service.ts`: Kur dönüşümü, historical_rates cache mantığı, fallback.
- [ ] `notification.service.ts`: Yaklaşan unpaid ödemelerin hesaplanması.
- [ ] `profile.service.ts`: Profile CRUD, base_currency değişimi, hesap silme (soft + hard).

### Kritik Helper'lar

- [ ] `updateTransactionSeries`: Seriden bir kaydı güncelleme — "sadece bu / bundan sonrası / tüm seri" seçenekleri. Geçmiş kayıtlara dokunmaz (Immutable Past).
- [ ] `deleteTransactionSeries`: Seri silme — aynı 3 seçenek.
- [ ] **Duplicate Prevention:** Idempotency key ile aynı işlemin 5 saniye içinde 2 kez atılmasını engelleyen guard.
- [ ] **Currency Rounding:** Tüm parasal hesap `lib/money.ts` üzerinden geçecek. Service layer'da raw `number` aritmetiği YASAK.

### Testler (ZORUNLU)

- [ ] `transaction.service.test.ts`: CRUD + soft delete + RLS izolasyon.
- [ ] `recurring.service.test.ts`: 24 ay üretim, end_date sınırlaması, lazy generation cursor.
- [ ] `installment.service.test.ts`: Yuvarlama farkı son takside aktarılıyor.
- [ ] `currency.service.test.ts`: Cache hit/miss, fallback senaryosu.
- [ ] `updateTransactionSeries.test.ts`: Geçmiş kayıtlar etkilenmiyor.

---

## 🎨 FAZ 5 — UI FOUNDATION & LAYOUT

- [ ] Sidebar: Ana Sayfa, Gelirler, Giderler, Etiketler, Ayarlar.
- [ ] Header: Ay/Yıl seçici, Tema/Dil switch, Profile dropdown, Notification bell.
- [ ] Responsive UI (Mobil hamburger menü, shadcn `Sheet`).
- [ ] Loading states (skeleton) ve error boundary.
- [ ] Toast sistemi (Sonner) global setup.

---

## 💰 FAZ 6 — TRANSACTION & LISTING ENGINE

- [ ] Gelir/Gider ekleme modal/form yapısı (react-hook-form + zod schema).
- [ ] Seçili aya/yıla göre hızlı listeleme (server component + client filter).
- [ ] **Pagination:** `limit-offset` ile sayfalama (default 50/sayfa). Infinite scroll Faz 13'te değerlendirilebilir.
- [ ] Tablo altı "Toplam Tutar" (`normalized_amount` üzerinden) gösterimi.
- [ ] Filtre: type, status, label, tarih aralığı.
- [ ] Tek satır düzenleme/silme — seri kaydıysa "sadece bu / bundan sonrası / tüm seri" dialog.

---

## 🔁 FAZ 7 — RECURRING & INSTALLMENT UI

- [ ] Service Layer kullanılarak taksitli işlem ekleme arayüzü.
- [ ] Tekrarlayan işlem ekleme arayüzü (frequency picker, end_date opsiyonel).
- [ ] Taksit/Tekrar serisinden tekil ay düzenleme vs tüm seriyi düzenleme dialog flow'u.
- [ ] Seri görüntüleme ekranı: bir templateın tüm üretilmiş kayıtlarını gösterme.

---

## 🏷 FAZ 8 — LABEL SYSTEM

- [ ] Etiket CRUD ve renk seçici.
- [ ] İşleme etiket bağlama (multi-select combobox).
- [ ] Etiket detay sayfası — bu etikete ait işlemler (pagination ile).
- [ ] Etiket silindiğinde transaction'ların korunması (sadece bridge silinir).

---

## 💱 FAZ 9 — CURRENCY MANAGEMENT

- [ ] Exchange Rate API entegrasyonu (örn. exchangerate.host veya open.er-api.com).
- [ ] **Historical Rates Cache:** Aynı gün içinde aynı kur API'a sadece 1 kez sorulur, sonraki sorgular `historical_rates` tablosundan okunur.
- [ ] **Fallback Stratejisi:** API çökerse en son bilinen kuru kullan, kullanıcıya "stale rate" uyarısı göster.
- [ ] Zustand store ile UI tarafı anlık convert (base currency değişimi vb. için).
- [ ] **Test:** API mock ile cache hit doğrulama, API down senaryosu.

---

## 📊 FAZ 10 — DASHBOARD & ANALYTICS

- [ ] Toplam gelir/gider/net kartları (base currency cinsinden).
- [ ] Recharts ile etiket dağılım grafikleri (pie/bar).
- [ ] Aylık gelir-gider trend grafiği (12 ay).
- [ ] Son 10 işlem listesi.
- [ ] Yaklaşan ödemeler özeti (Faz 11 ile bağlantılı).
- [ ] **Performance Notu:** Eğer kullanıcı 10K+ transaction'a ulaşırsa `monthly_summaries` materialized view eklemek gerekebilir — Faz 13 edge cases'e taşınabilir.

---

## 🔔 FAZ 11 — NOTIFICATION SYSTEM

- [ ] `notification.service.ts` ile gelecek 7 gün içindeki "unpaid" işlemleri çekme.
- [ ] Header'da bell ikonu + unread badge.
- [ ] "Yaklaşan Ödemeler" dropdown/sheet.
- [ ] İşlemi paid'e çevirme aksiyonu.
- [ ] Toast sistemi entegrasyonu (başarı/hata).

---

## ⚙️ FAZ 12 — SETTINGS & PROFILE

- [ ] Kullanıcı adı değiştirme.
- [ ] Varsayılan (base) para birimi ayarı + uyarı dialog'u (Immutable Past hatırlatması).
- [ ] Timezone ve locale ayarı.
- [ ] Supabase Storage ile avatar yükleme (max 2MB, jpg/png/webp).
- [ ] **Veri Export:** Tüm transaction + label verisini CSV ve JSON olarak indirme.
- [ ] **Hesap Silme:** Soft (30 gün geri alma) ve Hard (geri alınamaz) seçenekleri, çift onay.

---

## 🧨 FAZ 13 — EDGE CASES, LOGGING & TESTING

- [ ] Logging coverage audit: tüm servis hataları logger ile yakalanıyor mu?
- [ ] (Opsiyonel) Sentry entegrasyonu — production hata izleme.
- [ ] Taksit ortasında silme / iptal testleri.
- [ ] Geçmiş verilerin (kurlar dahil) bozulmadığının doğrulanması (Immutable Past audit testi).
- [ ] Currency API çökerse fallback testleri.
- [ ] Timezone değişimi senaryosu (kullanıcı UTC'den Europe/Istanbul'a geçtiğinde tarihler bozulmuyor).
- [ ] Base currency değişimi senaryosu (eski normalized_amount değerleri korunuyor).
- [ ] N+1 query audit (özellikle dashboard ve label detay sayfaları).
- [ ] Performance: 10K transaction'lı seed user ile dashboard load süresi < 2sn.
- [ ] **E2E Tests (Playwright):** Auth flow, transaction CRUD, recurring oluşturma, currency convert, hesap silme.

---

## 🚀 FAZ 14 — DEPLOYMENT

- [ ] DB indekslerinin ve `deleted_at` kurallarının son kontrolü.
- [ ] RLS policies'in production'da aktif olduğunun doğrulanması.
- [ ] Environment variables Vercel'e taşı (Supabase URL, anon key, service role key — sadece server).
- [ ] Lighthouse audit (performance, accessibility, SEO > 90).
- [ ] Localhost'ta uçtan uca E2E test geçişi.
- [ ] Vercel deploy.
- [ ] Production smoke test (gerçek hesapla).
- [ ] Rollback planı (Vercel'de önceki deployment'a dönme prosedürü dokümante).
