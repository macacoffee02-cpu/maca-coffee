/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzV3uo7_vYHqaYKeuYU7WkYKb7kFLvj2BJ-ROmcJ5iMnBr5JVfTfthBLcvWKJyooi1m/exec";
const PHONE_NUMBER = "+88 01794005151";

const PRODUCTS = [
  {
    id: "pack10",
    label: "Premium Pack (10 Sachets)",
    tag: "Offer",
    price: 1550,
    image: "/tenpack.png",
  },
  {
    id: "pack6",
    label: "Premium Pack (6 Sachets)",
    tag: "Regular",
    price: 1250,
    image: "/sixpack.png",
  },
];

const FAQS = [
  {
    q: "কি ভাবে ব্যাবহার করব?",
    a: "প্রতিদিন ১ প্যাকেট পাউডার ১ কাপ গরম পানি বা দুধের সাথে ভালোভাবে মিশিয়ে পান করুন। ভালো ফলাফলের জন্য নিয়মিত সেবন করুন।",
  },
  {
    q: "কার্যকারিতা গুলো কী কী?",
    a: "হরমোন ব্যালান্স ঠিক রাখতে, স্ট্রেস কমাতে এবং সামগ্রিক এনার্জি ও কর্মক্ষমতা বৃদ্ধিতে সহায়ক ১০০% প্রাকৃতিক উপাদান।",
  },
  {
    q: "আপনাদের সাথে কি ভাবে যোগাযোগ করব?",
    a: `সরাসরি কল করুন ${PHONE_NUMBER} নাম্বারে, অথবা পেজে মেসেজ করতে পারেন।`,
  },
  {
    q: "এটা ব্যাবহারে কি কোনো সাইড-ইফেক্ট আছে?",
    a: "১০০% প্রাকৃতিক ও হারবাল উপাদানে তৈরি, ল্যাব টেস্টে পরীক্ষিত এবং সম্পূর্ণ নিরাপদ। কোনো পার্শ্বপ্রতিক্রিয়া নেই।",
  },
  {
    q: "অগ্রিম টাকা দিতে হবে?",
    a: "না, অগ্রিম কোনো টাকা দিতে হবে না। ক্যাশ অন ডেলিভারিতে পণ্য হাতে পেয়ে মূল্য পরিশোধ করবেন।",
  },
];

export default function OrderLandingPage() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const product = PRODUCTS.find((p) => p.id === selectedProduct)!;
  const total = product.price * quantity;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          note: form.note,
          product: product.label,
          quantity,
          total,
        }),
      });
      const data = await res.json();

      if (data.status === "success") {
        // Facebook Pixel - Purchase event
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Purchase", {
            value: total,
            currency: "BDT",
            content_name: product.label,
            content_type: "product",
            num_items: quantity,
          });
        }

        setStatus("success");
        setForm({ name: "", phone: "", address: "", note: "" });
        setQuantity(1);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 pb-16">
      {/* ---------- TOP CALL BAR ---------- */}
      <div className="bg-emerald-900 text-white text-center text-sm py-2 px-3">
        📞 আমাদের কল করুন{" "}
        <a
          href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
          className="font-semibold underline"
        >
          {PHONE_NUMBER}
        </a>
      </div>

      {/* ---------- HERO BANNER ---------- */}
      <section className="relative">
        <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img
            src="/hero.jpeg"
            alt="Maca Coffee Banner"
            className="w-full h-full"
          />
        </div>

        <div className="text-center -mt-6 relative z-10">
          <a
            href="#order"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-10 py-3 rounded-full shadow-lg transition"
          >
            অর্ডার করতে চাই
          </a>
        </div>
      </section>

      {/* ---------- DESCRIPTION ---------- */}
      <section className="px-5 py-10 max-w-2xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-emerald-900 mb-3">
          Maca Coffee ☕ কী?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          বিশেষভাবে তৈরি একটি হারবাল Premium কফি, যা সেবনের কিছু সময়ের মধ্যেই
          শরীরে এনার্জি ও সতেজতা অনুভব করাতে সাহায্য করে। প্রতিদিনের ক্লান্তি
          দূর করে সারাদিনের কর্মক্ষমতা বৃদ্ধিতে সহায়ক।
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="font-semibold text-emerald-900">🌱 উপাদান</p>
            <p className="text-sm text-gray-600 mt-1">
              প্রিমিয়াম কফি বিন, ম্যাকা রুট পাউডার ও ১০০% প্রাকৃতিক হারবাল
              উপাদান। ল্যাব টেস্টে পরীক্ষিত ও সম্পূর্ণ নিরাপদ।
            </p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <p className="font-semibold text-amber-800">🍵 খাওয়ার নিয়ম</p>
            <p className="text-sm text-gray-600 mt-1">
              প্রতিদিন ১ প্যাকেট পাউডার ১ কাপ গরম পানি বা দুধের সাথে মিশিয়ে পান
              করুন। সকাল বা রাতে গ্রহণ করতে পারেন।
            </p>
          </div>
        </div>
      </section>

      {/* ---------- BADGES ---------- */}
      <section className="bg-emerald-900 text-white py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs md:text-sm px-4">
          <div>⚡ Better Performance</div>
          <div>💯 Greater Satisfaction</div>
          <div>✅ Satisfied Product</div>
          <div>🔥 Improved Endurance</div>
        </div>
        <p className="text-center text-amber-300 text-xs mt-4 px-4">
          ফলাফল না পেলে মূল্য ফেরত দেওয়া হবে। *শর্ত সাপেক্ষে*
        </p>
      </section>

      {/* ---------- ORDER FORM ---------- */}
      <section id="order" className="px-4 py-12 bg-gray-50">
        <h2 className="text-center text-2xl font-bold text-emerald-900 mb-6">
          Buy Original Maca COFFEE
        </h2>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Product selection cards */}
          {/* Product selection cards */}
          <div className="p-5 space-y-3 border-b border-gray-100">
            {PRODUCTS.map((p) => (
              <label
                key={p.id}
                className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition ${
                  selectedProduct === p.id
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="productSelect"
                  checked={selectedProduct === p.id}
                  onChange={() => setSelectedProduct(p.id)}
                  className="w-4 h-4 accent-emerald-700"
                />

                {/* Product Image */}
                <div className="w-16 h-16 rounded-lg bg-white border flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.label}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">{p.label}</p>

                  <span
                    className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full mt-1 ${
                      p.tag === "Offer"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>

                <p className="font-bold text-emerald-800">{p.price}৳</p>
              </label>
            ))}

            <div className="flex items-center justify-center gap-4 pt-2">
              <span className="text-sm font-medium">পরিমাণ</span>

              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
              >
                −
              </button>

              <span className="w-6 text-center font-semibold">{quantity}</span>

              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
              >
                +
              </button>
            </div>
          </div>
          {/* Billing details */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <h3 className="font-bold text-emerald-900">Billing details</h3>

            <div>
              <label className="block text-sm font-medium mb-1">
                আপনার নামঃ *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                আপনার ফোন নাম্বারঃ *
              </label>
              <input
                type="tel"
                name="phone"
                pattern="01[0-9]{9}"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                আপনার ঠিকানাঃ *
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                অর্ডার সম্পর্কে স্পেশাল নোট (optional)
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Order summary */}
            <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
              <div className="flex justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                <span>
                  {product.label} × {quantity}
                </span>
                <span>{total}৳</span>
              </div>
              <div className="flex justify-between px-4 py-2 border-b border-gray-200">
                <span>Shipping</span>
                <span className="text-emerald-700">Free delivery</span>
              </div>
              <div className="flex justify-between px-4 py-2 font-bold bg-gray-50">
                <span>Total</span>
                <span className="text-emerald-800">{total}৳</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-gray-700">
              <p className="font-semibold text-amber-800 mb-1">
                💵 ক্যাশ অন ডেলিভারি
              </p>
              আমরা দিচ্ছি ক্যাশ অন ডেলিভারিতে হোম ডেলিভারি, তাই পণ্য হাতে পেয়ে
              দেখে রিসিভ করবেন। বিশেষ অনুরোধঃ অনুগ্রহ করে অর্ডারকৃত প্রোডাক্টটি
              রিসিভ করবেন।
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
            >
              {status === "loading" ? "পাঠানো হচ্ছে..." : `Order Now ${total}৳`}
            </button>

            {status === "success" && (
              <p className="text-emerald-700 text-center font-medium">
                ✅ অর্ডার সফলভাবে জমা হয়েছে! শীঘ্রই যোগাযোগ করা হবে।
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-center font-medium">
                ❌ সমস্যা হয়েছে, আবার চেষ্টা করুন।
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ---------- CERTIFICATE / TRUST BANNER ---------- */}

      <section className="relative">
        <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img
            src="/certificate.jpeg"
            alt="Maca Coffee Banner"
            className="w-full h-full"
          />
        </div>

        <div className="text-center -mt-6 relative z-10">
          <a
            href="#order"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-10 py-3 rounded-full shadow-lg transition"
          >
            অর্ডার করতে চাই
          </a>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="px-4 py-10 max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center text-emerald-900 mb-6">
          নিচের প্রশ্ন গুলোতে ক্লিক করলে উত্তর পেয়ে যাবেন
        </h2>
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-4 py-3 font-medium bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
              >
                {item.q}
                <span className="text-emerald-700">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-4 py-3 text-sm text-gray-600">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section className="bg-emerald-900 text-white text-center py-10 px-4">
        <p className="text-sm text-emerald-200 mb-1">যোগাযোগ করুন</p>
        <a
          href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
          className="text-2xl font-bold text-amber-300"
        >
          📞 {PHONE_NUMBER}
        </a>
      </section>

      {/* ---------- STICKY ORDER BUTTON (MOBILE) ---------- */}
      <a
        href="#order"
        className="fixed bottom-0 left-0 right-0 md:hidden bg-amber-600 text-white text-center py-3 font-bold shadow-lg z-20"
      >
        এখনই অর্ডার করুন — {product.price}৳
      </a>
    </main>
  );
}
