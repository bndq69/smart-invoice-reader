# قارئ الفواتير الذكي – الموقع

موقع تطبيق **قارئ الفواتير الذكي**: نظام إدارة المحل والمخزن لتجار القطاعي والجملة والموزعين، بيشتغل من غير إنترنت وبيقرا فواتير الموردين بالذكاء الاصطناعي.

الموقع بيتبني من جديد بـ **Next.js**، وتسجيل الدخول بـ **Clerk**، والنشر هيبقى على **Render**.

> صفحة الـ HTML القديمة المنشورة محفوظة في برانش `landing-html`، و Cloudflare و GitHub Pages بينشروا منه. البرانش ده متقفل، محدش يعدّل فيه.

## التشغيل على جهازك

1. اعمل ملف `.env.local` فيه مفاتيح Clerk (من [Clerk Dashboard](https://dashboard.clerk.com) > **API keys**):

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

2. شغّل:

   ```bash
   npm install
   npm run dev
   ```

3. افتح `http://localhost:3000`.

> ملف `.env.local` مش بيترفع على GitHub. ممنوع تحط الـ `CLERK_SECRET_KEY` في أي ملف بيترفع.

## الملفات

- `app/` – صفحات Next.js.
- `public/assets/` – صور التطبيق (الأيقونة وصورة الشاشة الرئيسية).
- `supabase/contact_requests.sql` – جدول طلبات فورم التواصل في Supabase.
- `PROGRESS.md` – سجل تطور المشروع.

---

مالك التطبيق: إسلام محمد
