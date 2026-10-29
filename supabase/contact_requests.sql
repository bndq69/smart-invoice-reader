-- =====================================================================
-- جدول طلبات التواصل من صفحة الهبوط - قارئ الفواتير الذكي
-- شغّل الملف ده مرة واحدة من: Supabase Dashboard > SQL Editor > New query
-- =====================================================================

create table if not exists public.contact_requests (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 2 and 100),
  phone         text not null check (phone ~ '^(\+?20|0)?1[0125][0-9]{8}$'),
  shop_name     text check (char_length(shop_name) <= 120),
  city          text check (char_length(city) <= 80),
  business_type text not null check (business_type in ('retail', 'wholesale', 'distributor', 'other')),
  message       text check (char_length(message) <= 1000),
  source_page   text check (char_length(source_page) <= 300),
  status        text not null default 'new' check (status in ('new', 'contacted', 'activated', 'rejected'))
);

comment on table public.contact_requests is 'طلبات التواصل من فورم صفحة الهبوط';

-- تفعيل الحماية على مستوى الصفوف (RLS)
alter table public.contact_requests enable row level security;

-- الزوار (anon) مسموح لهم يضيفوا طلب جديد بس.
-- مفيش سياسة select/update/delete للزوار، فمحدش من الموقع يقدر يقرا أو يعدل أو يمسح البيانات.
drop policy if exists "Anyone can submit a contact request" on public.contact_requests;
create policy "Anyone can submit a contact request"
  on public.contact_requests
  for insert
  to anon
  with check (status = 'new');

-- منع الزائر من تحديد الأعمدة الإدارية بنفسه
revoke all on public.contact_requests from anon;
grant insert (name, phone, shop_name, city, business_type, message, source_page)
  on public.contact_requests to anon;

-- فهرس لعرض أحدث الطلبات بسرعة
create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

-- =====================================================================
-- 2026-10-29: لغة الطلب والموقع اللي جه منه
-- الموقع الجديد (Next.js) بيبعت language و site. الموقع الاحتياطي (landing-html)
-- متقفل ومش بيبعتهم، فالقيم الافتراضية بتعلّم طلباته: عربي ومن 'backup'.
-- =====================================================================

alter table public.contact_requests
  add column if not exists language text not null default 'ar' check (language in ('ar', 'en')),
  add column if not exists site     text not null default 'backup' check (site in ('new', 'backup'));

comment on column public.contact_requests.language is 'لغة الصفحة اللي اتبعت منها الطلب';
comment on column public.contact_requests.site is 'new = الموقع الجديد (Next.js)، backup = الموقع الاحتياطي (HTML)';

grant insert (language, site) on public.contact_requests to anon;
