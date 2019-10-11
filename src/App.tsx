import React, { Suspense, lazy, useState, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CubeSpinner } from 'react-spinners-kit'
import { CssBaseline } from '@material-ui/core'
import Slider from './components/molecules/FullPageScroll'
import NavBar from './components/molecules/NavBar'
import { ModalContextInstance } from 'index'

const IndexScreen = lazy(() => import('./screens/IndexScreen/IndexScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen/AboutScreen'))
const LoginScreen = lazy(() => import('./screens/LoginScreen/LoginScreen'))



const App: React.FunctionComponent = () => {
  const modal = useContext(ModalContextInstance)

  return (
    <Suspense fallback={<CubeSpinner />}>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <NavBar />
          <Slider />
        </Route>
        <Route exact path="/">
          <IndexScreen />
        </Route>
        <Route path="/about">
          <AboutScreen />
        </Route>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
      </Switch>
      {modal.isOpen && <div>{modal.modal}</div>}
    </Suspense>
  )
}

export default App
