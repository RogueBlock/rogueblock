import 'styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import { GlobalStoreProvider } from '@/store/index'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import Header from '@/components/header'
import { GoogleAnalytics } from 'nextjs-google-analytics'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Footer from '@/components/footer'

config.autoAddCss = false

export default function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json())
        }}
      >
        <GlobalStoreProvider>
          <Head>
            <title>RogueBlock - Algo Scam Database</title>
          </Head>

          <div className="page-container">
            <div className="max-w-3xl mx-auto px-4">
              <Header />
            </div>
            <main style={{ flexGrow: 1 }}>
              <GoogleAnalytics />
              <Component {...pageProps} />
            </main>
          </div>

          <div className="footer-container">
            <Footer />
          </div>

          <ToastContainer
            autoClose={10000}
            position="bottom-center"
            hideProgressBar
            draggable={false}
            theme={'dark'}
          />
        </GlobalStoreProvider>
      </SWRConfig>
    </ThemeProvider>
  )
}
