import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Optimize Google Fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL(`https://hsproperty.ae/`),
  title:
    "H&S – NO.1 REAL ESTATE COMPANY IN U.A.E – MAKING YOUR DREAMS A REALITY",
  description:
    "H&S – NO.1 REAL ESTATE COMPANY IN U.A.E – MAKING YOUR DREAMS A REALITY",
  alternates: {
    canonical: "./",
  },
  other: {
    "google-site-verification": "b7pZNRcvMjG2ZXsc9Xg9XrEgoNTTxUmZr0oCWrEasxI",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* DNS Prefetch - faster than preconnect for third parties */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Only preconnect to Google Fonts (most critical) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload custom fonts — must match the URLs used in globals.css */}
        <link rel="preload" as="font" type="font/woff2" href="/tenor-sans/TenorSans-Regular.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/urbanist/Urbanist.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/satoshi/Satoshi-Regular.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/WindSong/WindSong-Regular.woff2" crossOrigin="anonymous" />
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KSWQ785"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {/*
          GTM: official snippet; `id` ensures Next injects once per page (no duplicate gtm.js).
          GA4 below: if GTM container also sends GA4, you may get double page_view — confirm in GTM vs GA4.
        */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-KSWQ785');`,
          }}
        />

        {/* Clarity: mark stylesheets so heatmaps/CSS record correctly; observer catches Next.js chunks after client navigations */}
        <Script
          id="clarity-unmask-stylesheets"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              function unmask(){
                try{
                  document.querySelectorAll('head link[rel="stylesheet"][href]').forEach(function(link){
                    if(link.href && !link.hasAttribute('data-clarity-unmask')) link.setAttribute('data-clarity-unmask','true');
                  });
                }catch(e){}
              }
              unmask();
              if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',unmask);
              window.addEventListener('load',unmask,{once:true});
              var h=document.head;
              if(h&&typeof MutationObserver!=='undefined'){
                var t=null;
                var mo=new MutationObserver(function(){
                  if(t)cancelAnimationFrame(t);
                  t=requestAnimationFrame(function(){t=null;unmask();});
                });
                mo.observe(h,{childList:true,subtree:true});
              }
            })();`,
          }}
        />

        {children}

        {/* BrightCall / Convolo Widget - loaded on all pages */}
        <Script
          id="convolo-widget"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var s = document.createElement('script');
              s.src = 'https://app.convolo.ai/js/icallback.js?v=' + Math.random() + '&key=ddebf0c0228dbef737c1ada981aebc77&uri=' + encodeURIComponent(window.location.href);
              s.async = true;
              document.body.appendChild(s);
            })();`,
          }}
        />


        {/* Clarity project script — afterInteractive so sessions aren’t missed before window "load" */}
        <Script
          id="microsoft-clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "p50nvho38y");`,
          }}
        />

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-P5ZY314G86" />

        {/* Meta Pixel - Global PageView Tracking */}
        {process.env.FB_PIXEL_ID && (
          <>
            <Script
              id="meta-pixel-global"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${process.env.FB_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
