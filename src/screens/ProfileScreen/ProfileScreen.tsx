import Text from 'components/atoms/Text'
import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { AuthContextInstance } from 'Contexts/Auth'
import strings from 'strings'

const ProfileScreen: React.FunctionComponent = () => {
  const { id } = useParams()
  const authContext = useContext(AuthContextInstance)

  return (
    <div>
      <Text>{id}</Text>
      <button onClick={() => authContext.signOut()}>
        {strings.get('LOG_OUT')}
      </button>
      <a href="/connect/strava/auth/">connect to strava</a>
    </div>
  )
}

export default ProfileScreen
