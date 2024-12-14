import { SessionProvider } from "next-auth/react"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Provider } from 'react-redux'
import { ConfirmDialogProvider } from "components/ConfirmDialog"
import { appWithTranslation } from 'next-i18next'
import store from 'redux/store'
import 'styles/globals.css'
import "styles/overlay-loader.css"

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <DndProvider backend={HTML5Backend}>
          <ConfirmDialogProvider>
            <Component {...pageProps} />
          </ConfirmDialogProvider>
        </DndProvider>
      </SessionProvider>
    </Provider>
  )
}

export default appWithTranslation(MyApp)