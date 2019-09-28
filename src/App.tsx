import React, { Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { CubeSpinner } from 'react-spinners-kit'
import { CssBaseline, Container } from '@material-ui/core'

const IndexScreen = lazy(() => import('./screens/IndexScreen/IndexScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen/AboutScreen'))

const App: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<CubeSpinner />}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/">
            <IndexScreen />
          </Route>
          <Route path="/about">
            <AboutScreen />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    </Suspense>
  )
}

export default App
