import React, { useContext } from 'react'
import { AuthContextInstance } from 'actions/Auth'
import strings from 'strings'
import Strava from 'actions/Strava'
import { useLocation } from 'react-router'
import { Button } from '@material-ui/core'

const ProfileScreen: React.FunctionComponent = () => {
  const authContext = useContext(AuthContextInstance)
  const { pathname } = useLocation()
  return (
    <div>

      <Strava baseRoute={pathname} />

      <Button onClick={() => authContext.signOut()}>
        {strings.get('LOG_OUT')}
      </Button>
    </div >
  )
}

export default ProfileScreen
