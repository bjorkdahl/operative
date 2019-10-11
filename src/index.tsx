import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-boost'
import MomentUtils from '@date-io/moment'

interface ModalContext {
  modal: string
  openModal: {(args: any): void}
  isOpen: boolean
}

interface ModalState {
  modal: string
  isOpen: boolean
}

export const ModalContextInstance = React.createContext<ModalContext>({ modal: '', openModal: () => {}, isOpen: false })

const ModalProvider:React.FunctionComponent<{}> = ({ children }) => {
  const [state, setState] = useState<ModalState>({
    modal: '',
    isOpen: false
  })

  const openModal = (title: string) => {
    if (state.isOpen) {
      return
    }
    setState({...state, isOpen: true, modal: title })
  }

  const modalValues: ModalContext = {
    modal: state.modal,
    isOpen: state.isOpen,
    openModal,
  }

  return (
    <ModalContextInstance.Provider value={modalValues}>
      {children}
    </ModalContextInstance.Provider>
  )
}

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  request: operation => {
    const token = localStorage.getItem('operativeToken')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
})

ReactDOM.render(
  <ModalProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </ApolloProvider>
  </ModalProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
