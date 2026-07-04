import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const FB_PIXEL_ID = "2520636235071546";

export const metadata: Metadata = {
  title: "Maca Coffee - অর্ডার করুন",
  description: "প্রাকৃতিক শক্তি বৃদ্ধির সমাধান - অর্ডার করুন এখনই",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-bangla">
        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}