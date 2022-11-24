import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // HOC
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
