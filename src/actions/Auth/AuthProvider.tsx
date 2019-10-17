import React, { useState, useContext } from 'react'
import { Redirect, Route } from 'react-router'

interface AuthContext {
  authenticated: boolean
  signIn: { (auth: boolean, username: string, token: string): void }
  signOut: { (): void }
  token: string
  username: string
}

interface AuthState {
  authenticated: boolean
  token: string
  username: string
}

interface RouteProps {
  exact?: boolean
  path?: string
}

export const ProtectedRoute: React.FunctionComponent<RouteProps> = ({
  children,
  exact,
  path,
}) => {
  const authContent = useContext(AuthContextInstance)
  return (
    <Route exact={exact} path={path}>
      {authContent.authenticated ? children : <Redirect to="/login" />}
    </Route>
  )
}

const checkAuth = (): boolean => {
  const token = localStorage.getItem('operativeToken')
  return token !== null && true
}

export const AuthContextInstance = React.createContext<AuthContext>({
  authenticated: checkAuth(),
  signIn: () => {},
  signOut: () => {},
  token: '',
  username: '',
})

const AuthProvider: React.FunctionComponent<{}> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    authenticated: checkAuth(),
    username: '',
    token: '',
  })

  const signIn = (auth: boolean, username: string, token: string) => {
    if (state.authenticated) {
      return
    }

    localStorage.setItem('operativeToken', token)

    setState({
      ...state,
      authenticated: auth,
      username: username,
      token: token,
    })
  }

  const signOut = () => {
    if (!state.authenticated) {
      return
    }

    localStorage.removeItem('operativeToken')

    setState({
      authenticated: false,
      username: '',
      token: '',
    })
  }

  const modalValues: AuthContext = {
    authenticated: state.authenticated,
    username: state.username,
    token: state.token,
    signIn,
    signOut,
  }

  return (
    <AuthContextInstance.Provider value={modalValues}>
      {children}
    </AuthContextInstance.Provider>
  )
}

export default AuthProvider
