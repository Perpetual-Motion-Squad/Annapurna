import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AuthProvider } from '~/context/auth-provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Polygon} >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThirdwebProvider>
  )
}

export default MyApp;
