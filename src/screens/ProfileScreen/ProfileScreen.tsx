import React, { useContext } from 'react'
import { Route } from 'react-router'
import { AuthContextInstance } from 'Contexts/Auth'
import strings from 'strings'
import Strava from 'api/strava'

const ProfileScreen: React.FunctionComponent = () => {
  const authContext = useContext(AuthContextInstance)
  return (
    <div>
      <Route path={`/profile/connect/strava/auth`}>
        <Strava />
      </Route>
      <Route path={`/profile/connect/strava/success/`}>
        <Strava success />
      </Route>
      <button onClick={() => authContext.signOut()}>
        {strings.get('LOG_OUT')}
      </button>
      <a href="/profile/connect/strava/auth">connect to strava</a>
    </div >
  )
}

export default ProfileScreen
