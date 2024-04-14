import "@/styles/globals.css"; 
import type { AppProps } from "next/app";
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import * as gtag from '../lib/gtag'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <title>쿠석쿠석</title>
        <meta name="description" content="건대의 모든 장소!
                                          건대생들이 구석구석 만들어 가는 지도 나만의 장소를 공유해 보세요." />
        <meta name="robots" content="index,nofollow"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://www.kusukmap.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="쿠석쿠석" />
        <meta property="og:description" content="건대의 모든 장소!
        건대생들이 구석구석 만들어 가는 지도
        나만의 장소를 공유해 보세요." />
        <meta property="og:image" content="https://www.kusukmap.com/_next/image?url=/images/mainPage.png&w=1920&q=75" />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script id="beusable-init" strategy="afterInteractive">
        {`
          (function(w, d, a){
            w.__beusablerumclient__ = {
              load : function(src){
                var b = d.createElement("script");
                b.src = src; b.async=true; b.type = "text/javascript";
                d.getElementsByTagName("head")[0].appendChild(b);
              }
            };w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
          })(window, document, "//rum.beusable.net/load/`+process.env.NEXT_PUBLIC_BEUSABLE_ID+`");
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
