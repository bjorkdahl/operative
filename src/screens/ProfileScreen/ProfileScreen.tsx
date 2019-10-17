import { Button } from '@material-ui/core'
import { AuthContextInstance } from 'actions/Auth'
import Strava from 'actions/Strava'
import React, { useContext } from 'react'
import strings from 'strings'

const ProfileScreen: React.FunctionComponent = () => {
  const authContext = useContext(AuthContextInstance)
  return (
    <React.Fragment>
      <Strava />
      <Button onClick={() => authContext.signOut()}>
        {strings.get('LOG_OUT')}
      </Button>
    </React.Fragment>
  )
}

export default ProfileScreen
