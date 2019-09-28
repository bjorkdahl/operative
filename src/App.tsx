import React, { Suspense, lazy } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { CubeSpinner } from 'react-spinners-kit'
import { CssBaseline, Container } from '@material-ui/core'
import HeroHeader from './components/molecules/HeroHeader/HeroHeader'
import strings from 'strings'
const IndexScreen = lazy(() => import('./screens/IndexScreen/IndexScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen/AboutScreen'))

const App: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<CubeSpinner />}>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <HeroHeader
            heading={strings.get('HERO_HEADING')}
            text={strings.get('HERO_TEXT')}
          />
        </Route>
        <Container maxWidth="lg">
          <Route exact path="/">
            <IndexScreen />
          </Route>
          <Route path="/about">
            <AboutScreen />
          </Route>
          <Redirect to="/" />
        </Container>
      </Switch>
    </Suspense>
  )
}

export default App
