import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CubeSpinner } from 'react-spinners-kit'
import { CssBaseline } from '@material-ui/core'
import Slider from './components/molecules/Slider'
import NavBar from './components/molecules/NavBar'
const IndexScreen = lazy(() => import('./screens/IndexScreen/IndexScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen/AboutScreen'))

const App: React.FunctionComponent = () => {
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
      </Switch>
    </Suspense>
  )
}

export default App
