# تطور المشروع

سجل بيتحدث في آخر كل جلسة. الأحدث فوق.

## الوضع الحالي

- **الموقع المنشور:** صفحة `index.html` ثابتة (HTML + Supabase للفورم + زراير واتساب). نسختها النهائية محفوظة في برانش `landing-html` على commit `10e72ef`، ومحدش يعدّل فيها.
- **`main`:** هنكمل عليه المرحلة الجديدة: الصفحة بـ Next.js، وتسجيل دخول بـ Clerk، والنشر على Render.
- **أول خطوة في Next.js:** مشروع `my-clerk-next-app/` (Next.js 16 + Clerk + Tailwind). شغال على `localhost:3000` والـ build بيعدّي. الصفحة الرئيسية لسه الافتراضية.

## حاجات مفتوحة

- [x] برانش `landing-html` اترفع على GitHub.
- [x] Cloudflare (Worker `smart-invoice-reader`، Workers Builds) بقى بيبني من `landing-html` بس.
- [x] GitHub Pages اتحوّل لـ `landing-html`. كده النسختين المنشورتين بيبنوا من `landing-html` بس، و`main` بقى حر للشغل الجديد.
- [x] البرانش الغريب `333...333` اتمسح من GitHub.
- [x] كود Clerk المكتوب JavaScript عادي اتشال من `index.html` و`README.md`.
- [x] `AGENTS.md` و`PROGRESS.md` و`docs/` و`.agents/` و`skills-lock.json` اتعملهم commit على `main`.
- [ ] `my-clerk-next-app/` لسه من غير commit. محتاج قرار: يفضل فولدر جوه الريبو، ولا محتواه يطلع لأول الريبو بدل `index.html`.
- [ ] نقل محتوى الـ landing لصفحة Next.js.
- [ ] Clerk فيه development instance بس. قبل النشر الحقيقي: `clerk deploy`.
- [ ] hook إضافة Render بيطلع error بسبب المسافة في `C:\Users\NEW LAP`.

## السجل

### 2026-10-29
- اتعمل الملف ده، وتعليمة في `AGENTS.md` إنه يتحدث آخر كل جلسة.
- القرار اتغير: بدل ريبو جديد، النسخة النهائية من الـ HTML تتحفظ في برانش `landing-html`، والشغل الجديد يكمل على `main` في نفس الريبو.
- اتعمل برانش `landing-html` على `10e72ef` واترفع على GitHub.
- Cloudflare Workers Builds اتحوّل من `main` لـ `landing-html`. الموقع على `smart-invoice-reader.islambndq.workers.dev` شغال (200).
- GitHub Pages اتحوّل لـ `landing-html`، و `bndq69.github.io/smart-invoice-reader` شغال (200). نسخة الـ HTML اتقفلت.
- `main` اتنضّف: كود Clerk القديم اتشال، وملفات الـ agents و`PROGRESS.md` اتعملهم commit.

### 2026-10-28
- الصفحة اتظبطت على التطبيق: أسعار، أيقونة التطبيق الحقيقية، صورة الشاشة الرئيسية، و og:image لمعاينة اللينكات.
- اتعمل مشروع `my-clerk-next-app/` بـ `clerk init` واتربط بـ Clerk.
- اتجرب كود Clerk جوه `index.html` (من غير commit).
- retro للجلسة: اقتراحات فحص قبل النشر و GitHub Action، وتقرر إنها تتعمل في مشروع Next.js مش في الـ HTML.
- اتقرر: الموقع القديم يتقفل على `10e72ef`، والجديد Next.js على Render مع Clerk.

### 2026-10-26
- أول نسخة من صفحة الـ landing لـ Smart Invoice Reader.
- فورم التواصل اتربط بـ Supabase.
