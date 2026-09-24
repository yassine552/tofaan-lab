# مِرصاد · MIRSAD

> أطلس تفاعلي يُشرّح أشهر الهجمات السيبرانية **من مقعد المدافع** — مختبرات حية تشغّلها بيدك في متصفحك.

<div dir="rtl">

## ما هو مِرصاد؟

**مِرصاد** موقع تعليمي تفاعلي يُشرّح خمسة عشر هجوماً سيبرانياً شهيراً، منظّمة في خمسة مجالات:

| المجال | الوحدات |
|---|---|
| 🌐 هجمات الويب | حقن SQL · XSS · CSRF · سرقة الكوكيز |
| 🦠 البرمجيات الخبيثة | الفدية · الديدان · سلسلة التوريد |
| 🔌 هجمات الشبكة | DDoS · MITM · ARP Spoofing |
| 👤 طبقة البشر | التصيّد · التخمين · Vishing |
| 🛡️ الفريق الأزرق | الهندسة العكسية · صيد الأثر |

كل وحدة فيها **مختبر حي** تشغّله بنفسك: تطلق الهجوم، ترى الهدف يسقط، ثم تفعّل الدفاع الصحيح وتُعيده للحياة.

**لا أدوات هجوم · لا كود استغلال · لا خوادم** — ملف واحد يعمل في متصفحك.

---

## المزايا

- 🎯 **15 وحدة تشريحية** عبر 5 مجالات
- 🎬 **رسوم SVG حيّة** مع تحريك سلس
- 🌙 **تصميم داكن** مُريح للعين
- 📱 **متجاوب بالكامل** مع الجوال
- 🇸🇦 **عربي بالكامل** مع RTL
- ⚡ **يعمل دون اتصال** بعد أول زيارة (Service Worker)
- 🔍 **محسّن لمحركات البحث** (Open Graph · Schema.org · Sitemap)
- 🚀 **جاهز لـ GitHub Pages** بلا أي إعداد

---

## التشغيل محلياً

لا تحتاج أي خادم. افتح `index.html` مباشرة في المتصفح:

```bash
# اختياري: تشغيل خادم محلي بسيط
python3 -m http.server 8000
# ثم افتح http://localhost:8000
```

---

## النشر على GitHub Pages

### الطريقة 1 — النشر التلقائي (مُوصى به)

المستودع يحتوي على GitHub Action يُنشِر الموقع تلقائياً عند كل `push` على فرع `main`:

1. ارفع الكود إلى مستودع GitHub
2. اذهب إلى **Settings → Pages**
3. تحت **Build and deployment → Source** اختر **GitHub Actions**
4. سيُنشَر الموقع على: `https://<username>.github.io/<repo>/`

### الطريقة 2 — النشر من فرع `gh-pages` (الطريقة الكلاسيكية)

```bash
# إنشاء فرع gh-pages يحتوي على الملفات فقط
git checkout -b gh-pages
git rm -rf .github
git commit -m "deploy: static site for GitHub Pages"
git push origin gh-pages
```

ثم في **Settings → Pages → Source** اختر **Deploy from a branch** وحدد فرع `gh-pages` والمجلد `/ (root)`.

### الطريقة 3 — نشر من مجلد `docs`

إذا أردت إبقاء الكود المصدري خارج الموقع المنشور، انقل `index.html` و`assets/` و`sw.js` إلى مجلد `docs/`، ثم اختر فرع `main` والمجلد `/docs` في إعدادات Pages.

---

## بنية المشروع

```
mirsad/
├── index.html              # الملف الرئيسي (مكتفي ذاتياً)
├── sw.js                   # Service Worker للعمل دون اتصال
├── robots.txt              # قواعد الفهرسة
├── sitemap.xml             # خريطة الموقع
├── .nojekyll               # تخطّي معالجة Jekyll
├── .gitignore
├── LICENSE                 # رخصة MIT
├── README.md               # هذا الملف
├── assets/
│   ├── favicon.svg         # أيقونة SVG
│   ├── manifest.webmanifest # بيانات PWA
│   └── apple-touch-icon.png
└── .github/
    └── workflows/
        └── deploy.yml      # النشر التلقائي
```

---

## تخصيص النطاق (Custom Domain)

1. اشترِ نطاقاً (مثل `mirsad.dev`)
2. أضف ملف `CNAME` في جذر المستودع يحتوي على اسم النطاق فقط:
   ```
   mirsad.dev
   ```
3. في مزوّد النطاق، أضف سجلّات DNS:
   - `A` record → IPs GitHub Pages
   - `CNAME` record لـ `www` → `<username>.github.io`
4. فعّل **Enforce HTTPS** في إعدادات Pages

---

## تحديث المحتوى

الموقع مبني حول **بيانات مركزية** في `index.html`:

```js
const CATS = [
  {id:'web', name:'هجمات الويب', en:'WEB ATTACKS', d:'...'},
  // ...
];
```

- لإضافة وحدة جديدة: انسخ قالب `<section class="module">` موجود، بدّل المنطق، ثم أضف إدخالاً في مصفوفة `CATS`.
- المُحرّك (محاكاة، سجلات، رسوم) مُعاد الاستخدام عبر كل الوحدات.

---

## التقنيات

| | |
|---|---|
| **HTML** | عادي — بلا أي إطار عمل |
| **CSS** | متغيرات + Grid + RTL |
| **JavaScript** | Vanilla JS (IIFE) |
| **الخطوط** | IBM Plex Sans Arabic · IBM Plex Mono |
| **الرسوم** | SVG حيّ (يُحرَّك بـ requestAnimationFrame) |
| **PWA** | Service Worker + Manifest |
| **النشر** | GitHub Pages + GitHub Actions |

---

## الترخيص

راجع ملف [LICENSE](./LICENSE) — **MIT License**. أنت حر في الاستخدام والتعديل والنشر مع الإسناد.

---

## إقرار

هذا المحتوى **تعليمي بحت**. لا يحتوي على أي كود استغلال فعلي أو أدوات هجوم. كل المحاكاة في المتصفح، والهدف تعليم المدافع — لا تزويد المهاجم.

---

**صُنع بعناية للمدافع العربي** 🛡️

</div>
