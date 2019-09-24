import React, { Suspense, lazy } from 'react'
import { Route, Switch, match } from 'react-router-dom'
import Text from './components/atoms/Text'

import { CubeSpinner } from 'react-spinners-kit'
const IndexScreen = lazy(() => import('./screens/IndexScreen'))
const AboutScreen = lazy(() => import('./screens/AboutScreen'))

interface Props {
  match: match
  history: History
}

const App: React.FunctionComponent<Props> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Text>Edit and save to reload.</Text>
        <Suspense fallback={<CubeSpinner />}>
          <Switch>
            <Route exact path="/" component={IndexScreen} />
            <Route path="/about" component={AboutScreen}></Route>
          </Switch>
        </Suspense>
      </header>
    </div>
  )
}

export default App
