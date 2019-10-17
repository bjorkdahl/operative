import { CssBaseline } from '@material-ui/core'
import Modal from 'components/Modal'
import { ModalContextInstance } from 'actions/Modal'
import React, { lazy, Suspense, useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { CubeSpinner } from 'react-spinners-kit'
import Slider from './components/molecules/FullPageScroll'
import NavBar from './components/molecules/NavBar'
import { ProtectedRoute } from './actions/Auth/'

const IndexScreen = lazy(() => import('./screens/IndexScreen/IndexScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen/AboutScreen'))
const LoginScreen = lazy(() => import('./screens/LoginScreen/LoginScreen'))
const ProfileScreen = lazy(() =>
  import('./screens/ProfileScreen/ProfileScreen'),
)

const App: React.FunctionComponent = () => {
  const modalContext = useContext(ModalContextInstance)

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
