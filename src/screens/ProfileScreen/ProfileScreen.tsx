import Text from 'components/atoms/Text'
import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { AuthContextInstance } from 'Contexts/Auth'

const ProfileScreen: React.FunctionComponent = () => {
  const { id } = useParams()
  const authContext = useContext(AuthContextInstance)

  return (
    <div>
      <Text>{id}</Text>
      <button onClick={() => authContext.signOut()}>logout</button>
    </div>
  )
}

export default ProfileScreen
