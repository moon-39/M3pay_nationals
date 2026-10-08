# مونس پرداخت — اپلیکیشن جامع کیف پول دیجیتال

## نکته مهم درباره این پروژه
این پروژه در واقع یک فرانت‌اند کاملاً استاتیک است — تمام داده‌ها (موجودی، تراکنش‌ها،
فروشگاه‌ها و...) از فایل `src/data/mockData.ts` خوانده می‌شوند و **هیچ فراخوانی واقعی
به Gemini API در کد وجود ندارد**. وابستگی `@google/genai` و متغیر `GEMINI_API_KEY`
فقط بخشی از قالب پیش‌فرض Google AI Studio بودند و برای اجرای این اپ خاص لازم نیستند؛
در این نسخه حذف شده‌اند.

به همین دلیل نیازی به Cloudflare Worker یا هیچ پروکسی دیگری نیست — کافی است
خروجی استاتیک را روی هر CDN (مثل Cloudflare Pages) هاست کنید.

## اجرای محلی

**پیش‌نیاز:** Node.js

۱. نصب وابستگی‌ها:
   `npm install`
۲. اجرای نسخه توسعه:
   `npm run dev`

## ساخت نسخه نهایی برای هاست

```bash
npm install
npm run build
```

خروجی در پوشه `dist/` ساخته می‌شود.

## دیپلوی روی Cloudflare Pages (پیشنهادی برای دسترسی بدون فیلترشکن از ایران)

**روش ۱ — از طریق داشبورد Cloudflare:**
۱. وارد dash.cloudflare.com شوید → Workers & Pages → Create → Pages → Upload assets
۲. محتوای پوشه `dist/` را آپلود کنید (یا پروژه را از GitHub متصل کنید و
   Build command را `npm run build` و Output directory را `dist` بگذارید)

**روش ۲ — با Wrangler CLI:**
```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist
```

هیچ متغیر محیطی یا Secret لازم نیست، چون اپ کاملاً استاتیک است و به هیچ API
خارجی متصل نمی‌شود.
