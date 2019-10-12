import { ApolloProvider } from '@apollo/react-hooks'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ApolloClient from 'apollo-boost'
import AuthProvider from 'Contexts/Auth'
import ModalProvider from 'Contexts/Modal'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

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
  <AuthProvider>
    <ModalProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </BrowserRouter>
      </ApolloProvider>
    </ModalProvider>
  </AuthProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
