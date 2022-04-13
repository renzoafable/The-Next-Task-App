import 'styles/globals.scss'
import { AppProvider } from 'context/AppContext'
import Container from 'layout/Container'

function TaskApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Container>
        <Component {...pageProps} />
      </Container>
    </AppProvider>
  )
}

export default TaskApp
