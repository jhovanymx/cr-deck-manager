import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import client from '../utils/nextjs-client'
import store from 'redux/store';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionProvider>
    </Provider>
  )
}

export default MyApp