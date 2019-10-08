import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-boost'
import MomentUtils from '@date-io/moment'

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
