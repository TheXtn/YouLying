import '../styles/globals.css'
import '../styles/Custom.module.scss'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
function MyApp({ Component, pageProps:{ session, ...pageProps }, }) {

  return (
    
<SessionProvider session={session}>
<ChakraProvider>
  <Component {...pageProps} /></ChakraProvider></SessionProvider>
  )
}

export default MyApp
