# تطور المشروع

سجل بيتحدث في آخر كل جلسة. الأحدث فوق.

## الوضع الحالي

- **الموقع المنشور:** صفحة HTML ثابتة (Supabase للفورم + زراير واتساب) على برانش `landing-html` (commit `10e72ef`)، متقفل ومحدش يعدّل فيه. Cloudflare Workers و GitHub Pages الاتنين بينشروا منه بس.
- **`main`:** مشروع Next.js 16 + Clerk + Tailwind في أول الريبو. الـ build بيعدّي، وبيشتغل على `localhost:3000` بزراير Sign in / Sign up. الصفحة الرئيسية لسه الافتراضية بتاعة Next.
- صور التطبيق في `public/assets/`، وجدول فورم التواصل في `supabase/contact_requests.sql`.

## حاجات مفتوحة

- [ ] نقل محتوى الـ landing لصفحة Next.js (الـ HTML موجود في `landing-html` كمرجع).
- [ ] النشر على Render (لسه ما اتعملش service).
- [ ] skill `pre-deploy-check` مكتوب للـ `index.html` القديم، ومحتاج يتحدث لمشروع Next.js.
- [ ] Clerk فيه development instance بس. قبل النشر الحقيقي: `clerk deploy`.
- [ ] hook إضافة Render بيطلع error بسبب المسافة في `C:\Users\NEW LAP`.

## السجل

### 2026-10-29
- اتعمل الملف ده، وتعليمة في `AGENTS.md` إنه يتحدث آخر كل جلسة.
- القرار اتغير: بدل ريبو جديد، النسخة النهائية من الـ HTML تتحفظ في برانش `landing-html`، والشغل الجديد يكمل على `main` في نفس الريبو.
- اتعمل برانش `landing-html` على `10e72ef` واترفع على GitHub.
- Cloudflare Workers Builds اتحوّل من `main` لـ `landing-html`. الموقع على `smart-invoice-reader.islambndq.workers.dev` شغال (200).
- GitHub Pages اتحوّل لـ `landing-html`، و `bndq69.github.io/smart-invoice-reader` شغال (200). نسخة الـ HTML اتقفلت.
- اتمسح البرانش الغريب `333...333` من GitHub.
- `main` اتنضّف: كود Clerk القديم اتشال، وملفات الـ agents و`PROGRESS.md` اتعملهم commit.
- مشروع `my-clerk-next-app/` طلع لأول الريبو بدل `index.html`. الصور اتنقلت لـ `public/assets/`، واسم الـ package بقى `smart-invoice-reader`، و README اتكتب من جديد للمشروع الجديد.

### 2026-10-28
- الصفحة اتظبطت على التطبيق: أسعار، أيقونة التطبيق الحقيقية، صورة الشاشة الرئيسية، و og:image لمعاينة اللينكات.
- اتعمل مشروع `my-clerk-next-app/` بـ `clerk init` واتربط بـ Clerk.
- اتجرب كود Clerk جوه `index.html` (من غير commit).
- retro للجلسة: اقتراحات فحص قبل النشر و GitHub Action، وتقرر إنها تتعمل في مشروع Next.js مش في الـ HTML.
- اتقرر: الموقع القديم يتقفل على `10e72ef`، والجديد Next.js على Render مع Clerk.

### 2026-10-26
- أول نسخة من صفحة الـ landing لـ Smart Invoice Reader.
- فورم التواصل اتربط بـ Supabase.
