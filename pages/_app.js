import '../styles/globals.css'
import '../styles/Home.module.scss'
import { ChakraProvider } from '@chakra-ui/react'
function MyApp({ Component, pageProps }) {

  return (
    

<ChakraProvider>
  <Component {...pageProps} /></ChakraProvider>
  )
}

export default MyApp
