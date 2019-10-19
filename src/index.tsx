import { ApolloProvider } from '@apollo/react-hooks'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import AuthProvider from 'actions/Auth'
import ModalProvider from 'actions/Modal'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import ApolloClient from 'apollo-boost'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import colors from 'strings/colors'
import { createMuiTheme } from '@material-ui/core'

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

const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.colorPrimary,
      main: colors.colorPrimary,
      dark: colors.colorPrimary,
    },
    secondary: {
      light: colors.colorSecondary,
      main: colors.colorSecondary,
      dark: colors.colorSecondary,
    },
    background: {
      paper: colors.colorWhite
    },
    text: {
      primary: colors.colorText,
    },
  },
})

ReactDOM.render(
  <AuthProvider>
    <MuiThemeProvider theme={theme}>
      <ModalProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <App />
            </MuiPickersUtilsProvider>
          </BrowserRouter>
        </ApolloProvider>
      </ModalProvider >
    </MuiThemeProvider>
  </AuthProvider >,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
