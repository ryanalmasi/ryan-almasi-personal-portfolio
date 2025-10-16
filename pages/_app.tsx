import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '../src/components/ThemeProvider'
import { GlobalStyles } from '../src/styles/GlobalStyles'
import { theme } from '../src/styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Ryan Almasi - Software Engineering Student</title>
        <meta name="description" content="Portfolio website of Ryan Almasi, a passionate 4th year Software Engineering student graduating in May 2026." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
