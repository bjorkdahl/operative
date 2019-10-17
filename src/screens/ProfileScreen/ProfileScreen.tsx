import React, { useContext } from 'react'
import { AuthContextInstance } from 'actions/Auth'
import strings from 'strings'
import Strava from 'actions/Strava'
import { useLocation } from 'react-router'

const ProfileScreen: React.FunctionComponent = () => {
  const authContext = useContext(AuthContextInstance)
  const { pathname } = useLocation()
  return (
    <div>

      <Strava baseRoute={pathname} />

      <button onClick={() => authContext.signOut()}>
        {strings.get('LOG_OUT')}
      </button>
      <a href="/profile/connect/strava/auth">connect to strava</a>
    </div >
  )
}

export default ProfileScreen
