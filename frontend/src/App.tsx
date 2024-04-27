import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store'

import { GlobalStyle } from './styles'

import PageRoutes from './routes'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <PageRoutes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
