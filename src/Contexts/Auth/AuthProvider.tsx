import React, { useState } from 'react'

interface ModalContext {
  authenticated: boolean
  signIn: { (auth: boolean, username: string, token: string): void }
  signOut: { (): void }
  token: string
  username: string
}

interface ModalState {
  authenticated: boolean
  token: string
  username: string
}

export const AuthContextInstance = React.createContext<ModalContext>({
  authenticated: false,
  signIn: () => {},
  signOut: () => {},
  token: '',
  username: '',
})

const AuthProvider: React.FunctionComponent<{}> = ({ children }) => {
  const [state, setState] = useState<ModalState>({
    authenticated: false,
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

    localStorage.clear()

    setState({
      authenticated: false,
      username: '',
      token: '',
    })
  }

  const modalValues: ModalContext = {
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
