import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from "next-auth/react"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import client from 'utils/nextjs-client'
import store from 'redux/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={client}>
          <DndProvider backend={HTML5Backend}>
            <Component {...pageProps} />
          </DndProvider>
        </ApolloProvider>
      </SessionProvider>
    </Provider>
  )
}

export default appWithTranslation(MyApp)