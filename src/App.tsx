import { CssBaseline } from '@material-ui/core'
import { ModalContextInstance } from 'actions/Modal'
import Modal from 'components/Modal'
import React, { lazy, Suspense, useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { BallSpinner } from 'react-spinners-kit'
import { ProtectedRoute } from './actions/Auth/'
import Slider from './components/molecules/FullPageScroll'
import NavBar from './components/molecules/NavBar'

const IndexScreen = lazy(() => import('./screens/IndexScreen/IndexScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen/AboutScreen'))
const LoginScreen = lazy(() => import('./screens/LoginScreen/LoginScreen'))
const ProfileScreen = lazy(() =>
  import('./screens/ProfileScreen/ProfileScreen'),
)

const App: React.FunctionComponent = () => {
  const modalContext = useContext(ModalContextInstance)

  return (
    <Suspense fallback={<BallSpinner />}>
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
        <ProtectedRoute path="/profile">
          <ProfileScreen />
        </ProtectedRoute>
        <Redirect to="/login" />
      </Switch>
      {modalContext.isOpen && (
        <Modal isOpen={modalContext.isOpen}>{modalContext.component}</Modal>
      )}
    </Suspense>
  )
}

export default App
