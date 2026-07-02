# Maca Coffee - Order Landing Page

Next.js 15 + Tailwind CSS দিয়ে বানানো single-product landing page, order details Google Sheet এ জমা হয় (কোনো backend/database ছাড়া)।

## প্রজেক্ট স্ট্রাকচার

```
maca-order-app/
├── app/
│   ├── page.tsx          ← মূল landing page + order form (এখানেই সব এডিট করবে)
│   ├── layout.tsx        ← মেটাডেটা, ফন্ট সেটআপ
│   └── globals.css       ← Tailwind + ফন্ট ভ্যারিয়েবল
├── google-apps-script/
│   └── Code.gs           ← Google Sheet এ order সেভ করার স্ক্রিপ্ট
└── package.json
```

## সেটআপ - ধাপে ধাপে

### ১. প্যাকেজ ইনস্টল করো
```bash
npm install
```

### ২. Google Sheet বানাও
- নতুন Google Sheet খোলো
- প্রথম row এ header বসাও: `Timestamp | Name | Phone | Address | Product | Quantity | Total`

### ৩. Apps Script যুক্ত করো
- Sheet এ **Extensions → Apps Script**
- `google-apps-script/Code.gs` এর পুরো কোড কপি-পেস্ট করো
- **Deploy → New deployment → Web app**
  - Execute as: **Me**
  - Who has access: **Anyone**
- Deploy করলে একটা URL পাবে (`https://script.google.com/macros/s/.../exec`)

### ৪. URL বসাও
`app/page.tsx` ফাইলের একদম উপরে:
```ts
const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
```
এখানে তোমার Apps Script URL বসাও।

### ৫. লোকালি রান করো
```bash
npm run dev
```
তারপর ব্রাউজারে `http://localhost:3000` ওপেন করো।

### ৬. ডেপ্লয় করো (Vercel - ফ্রি)
```bash
npx vercel
```
অথবা GitHub এ পুশ করে Vercel এ কানেক্ট করো (vercel.com)।

## কাস্টমাইজ করতে যা এডিট করবে (`app/page.tsx`)
- `PRODUCTS` — প্রোডাক্ট নাম ও দাম
- `FAQS` — প্রশ্ন-উত্তর
- হিরো সেকশনের টেক্সট (`<h1>`, `<p>`)
- চাইলে প্রোডাক্ট ইমেজ যোগ করতে `public/` ফোল্ডারে ছবি রেখে `<Image>` কম্পোনেন্ট ব্যবহার করো

## নোট
- SCRIPT_URL ব্রাউজারে visible থাকবে — এটা normal, কারণ Apps Script শুধু `appendRow` করে, ডাটা delete/edit করতে পারবে না
- পেমেন্ট শুধু Cash on Delivery (COD) — কোনো পেমেন্ট গেটওয়ে যুক্ত করা নেই
