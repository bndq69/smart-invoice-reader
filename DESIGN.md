---
name: Smart Invoice Reader
description: قارئ الفواتير الذكي - نظام إدارة المحل والمخزن والديون وقراءة الفواتير
colors:
  primary: "#1d4ed8"
  primary-strong: "#1e40af"
  primary-soft: "#dbe7ff"
  bg: "#f7f8fb"
  bg-elev: "#ffffff"
  bg-soft: "#eef2f8"
  text: "#0f172a"
  text-muted: "#55627a"
  border: "#e3e8f0"
  whatsapp: "#22c55e"
  whatsapp-strong: "#16a34a"
  green: "#16a34a"
  green-soft: "#dcfce7"
  red: "#dc2626"
  red-soft: "#fee2e2"
  amber: "#d97706"
  amber-soft: "#fef3c7"
typography:
  display:
    fontFamily: "Cairo, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: "Cairo, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Cairo, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Cairo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Cairo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "12px"
  md: "18px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "12px 24px"
---

# Design System: Smart Invoice Reader

## Overview

**Creative North Star: "The Confident Merchant Desk"**

نظام بصري حديث ومريح ومبني ليعكس بيئة التاجر العملي؛ واجهة تجمع بين الرصانة، الثقة، ووضوح المعلومات الفوري. الموقع يعتمد على تباين عالي ومريح للعين، مع خط Cairo العربي الأصيل وتوزيع فضائي منظم يسهل القراءة السريعة على شاشات الموبايل.

**Key Characteristics:**
- تباين صريح وألوان واضحة تعبر عن الثقة والإنتاجية (الأزرق المؤسسي مع لمسات الأخضر للواتساب).
- دعم كامل ومتكافئ للوضعين الفاتح والداكن (Light/Dark mode) بدون أي تشويش أو فقدان للتباين.
- تجاوب كامل ومرونة مع اتجاهي القراءة: العربي (`rtl`) والإنجليزي (`ltr`).
- حواف مستديرة ناعمة (12px / 18px) تعطي طابعاً عصرياً وسلساً.

## Colors

لوحة ألوان متوازنة تعتمد على الأزرق كرمز للاعتمادية والأخضر للتحفيز والتواصل المباشر.

### Primary
- **Royal Cobalt Blue** (#1d4ed8 / #3b82f6): اللون الرئيسي للأزرار، الروابط الفعالة، والعناوين البارزة.
- **Deep Cobalt** (#1e40af): حالة التفاعل والـ Hover على الأزرار الأساسية.
- **Soft Ice Blue** (#dbe7ff / #1a2a4a): خلفيات الكروت المميزة وشارات التنبيه الخفيفة.

### Secondary
- **WhatsApp Green** (#22c55e): أزرار التحويل المباشر للتواصل والاشتراك عبر الواتساب.
- **WhatsApp Dark** (#16a34a): حالة التفاعل مع أزرار الواتساب.

### Neutral
- **Base Background** (#f7f8fb / #0b1220): خلفية الصفحة الأساسية المريحة للعين.
- **Surface Elevated** (#ffffff / #111a2d): كروت المحتوى، الباقات، والقوائم المنسدلة.
- **Surface Soft** (#eef2f8 / #16213a): خلفيات الأشرطة الجانبية والعناصر الثانوية.
- **Text Main** (#0f172a / #eef2f8): النصوص الأساسية والعناوين لضمان وضوح كامل.
- **Text Muted** (#55627a / #9fb0c8): النصوص الفرعية والوصف التوضيحي.
- **Border Subtle** (#e3e8f0 / #233149): الفواصل وحدود الكروت الخفيفة.

### Named Rules
**The WhatsApp Priority Rule.** اللون الأخضر للواتساب مخصص فقط لإجراءات التحويل المباشر والتواصل (CTAs). لا يستخدم كخلفية لبطاقات عامة.

## Typography

**Display Font:** Cairo (Google Font, sans-serif)
**Body Font:** Cairo (Google Font, sans-serif)

**Character:** خط هندسي حديث وواضح، يتميز بوضوح الحروف العربية في المقاسات الصغيرة وقوة الحضور في العناوين الكبيرة.

### Hierarchy
- **Display** (Bold 700, 2.5rem - 3.5rem, line-height: 1.2): عنوان الهيرو الرئيسي.
- **Headline** (Bold 700, 1.75rem - 2rem, line-height: 1.3): عناوين الأقسام الرئيسية (المميزات، الباقات، الأسئلة).
- **Title** (SemiBold 600, 1.25rem - 1.5rem, line-height: 1.4): عناوين الكروت والبطاقات الفردية.
- **Body** (Regular 400, 1rem, line-height: 1.6): نصوص الفقرات والمحتوى العام والشرح.
- **Label** (Medium 500, 0.875rem, line-height: 1.4): الشارات (Badges)، أسماء الخانات في الفورم، والفوتر.

## Layout

- **Spatial Grid:** شبكة تعتمد على مضاعفات 8px (8px / 16px / 24px / 32px / 48px).
- **Container Width:** حد أقصى بعرض 1200px للمحتوى المركزي مع هوامش أمان للموبايل (16px).
- **Directional Adaptation:** دعم كامل للـ Logical Properties في الـ CSS (`margin-inline`, `padding-inline`, `start`, `end`) ليعمل التصميم تلقائياً بنفس الدقة في العربي والإنجليزي.

## Elevation & Depth

يعتمد النظام على العمق الطبقي الهادئ (Tonal Layering) مع ظلال محيطية ناعمة جداً:
- **Shadow Resting** (`box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06)`): كروت المحتوى في الوضع الطبيعي.
- **Shadow Floating** (`box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08)`): كروت الباقات والزرار العايم.

## Shapes

- **Card Radius:** زوايا دائرية ناعمة بمقاس 18px (`--radius`).
- **Button / Input Radius:** زوايا بمقاس 12px (`--radius-sm`).
- **Pill / Floating:** أزرار وشارات دائرية بالكامل 9999px.

## Components

### Buttons
- **Shape:** زوايا ناعمة (12px / 18px).
- **Primary:** أزرق بكتابة بيضاء مع ظل خفيف وتفاعل رفع بسيط عند الـ hover.
- **WhatsApp CTA:** أخضر صريح مع أيقونة واتساب واضحة.

### Cards / Containers
- **Corner Style:** 18px.
- **Background:** `--bg-elev` مع حد خفيف `--border`.
- **Hover:** انتقال سلس في الظل (Shadow elevation).

### Inputs / Form
- **Style:** حدود رفيعة 1px بلون `--border`، خلفية مريحة، وزوايا 12px.
- **Focus:** حلقة تركيز خفيفة باللون الأزرق الأساسي.

## Do's and Don'ts

### Do:
- **Do** الحفاظ على تباين كافي بين النصوص والخلفيات في الوضعين الفاتح والداكن (WCAG AA).
- **Do** استخدام خصائص الاتجاه المنطقية (Logical CSS properties) لضمان اتساق اللغتين العربي والإنجليزي.
- **Do** الحفاظ على رسائل الواتساب الجاهزة واضحة ومباشرة.

### Don't:
- **Don't** استخدام ظلال حادة أو داكنة مبالغ فيها تشوه المظهر العصري.
- **Don't** كسر هرمية الخطوط أو استخدام خطوط غير خط Cairo المعتمد.
- **Don't** وضع نصوص معقدة محاسبياً لا يفهمها التاجر البسيط.
