-- =====================================================================
-- جدول زيارات الموقع الجديد وضغطات زراير الواتساب - قارئ الفواتير الذكي (ADR 0003)
-- مفيش cookies ولا IP ولا user agent ولا أي بيانات شخصية: نوع الحدث، واللغة،
-- والزرار، واسم الموقع اللي جه منه الزائر (الـ host بس)، والوقت.
-- السيرفر بتاع Next.js هو اللي بيضيف الأحداث بالـ publishable key.
-- =====================================================================

create table if not exists public.site_events (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  kind          text not null check (kind in ('visit', 'whatsapp_click')),
  language      text not null check (language in ('ar', 'en')),
  button        text check (button in ('header', 'trial', 'monthly', 'yearly', 'contact', 'final_cta', 'floating')),
  referrer_host text check (char_length(referrer_host) <= 255),
  -- الزرار بيتسجل مع ضغطات الواتساب بس
  constraint site_events_button_only_on_clicks check ((kind = 'whatsapp_click') = (button is not null))
);

comment on table public.site_events is 'زيارات الموقع الجديد وضغطات زراير الواتساب، من غير أي بيانات شخصية';

-- تفعيل الحماية على مستوى الصفوف (RLS)
alter table public.site_events enable row level security;

-- الزوار (anon) يضيفوا أحداث بس. مفيش سياسة select/update/delete، فمحدش من الموقع
-- يقدر يقرا الأرقام. صفحة الإدارة هتقراها من السيرفر بعدين.
drop policy if exists "Anyone can record a site event" on public.site_events;
create policy "Anyone can record a site event"
  on public.site_events
  for insert
  to anon
  with check (kind in ('visit', 'whatsapp_click'));

-- الزائر يحدد بس الأعمدة دي. id و created_at بيتعملوا لوحدهم.
revoke all on public.site_events from anon, authenticated;
grant insert (kind, language, button, referrer_host) on public.site_events to anon;

-- لعدّ الزيارات والضغطات في فترة (النهارده / 7 / 30 يوم)
create index if not exists site_events_kind_created_at_idx
  on public.site_events (kind, created_at desc);
