import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Text from 'components/atoms/Text'
import * as params from 'react-route-params'

const GET_STRAVA_OAUTH_URL = gql`
  query GetStravaOAuthUrl($callbackUrl: String!) {
    getStravaOAuthUrl(callbackUrl: $callbackUrl)
  }
`

const SET_STRAVA_OAUTH_TOKEN = gql`
  mutation SetStravaOAuthToken($token: String!) {
    setStravaOAuthToken(token: $token)
  }
`

interface Props {
  success?: boolean
}

const StravaAuth: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_STRAVA_OAUTH_URL, {
    variables: { callbackUrl: 'http://localhost:3000/connect/strava/success/' },
  })
  if (loading) return <Text>Loading...</Text>
  if (error) console.log(error)
  const { getStravaOAuthUrl } = data
  window.location.href = getStravaOAuthUrl
  return <></>
}

const StravaSuccess: React.FunctionComponent = () => {
  const query = params.get()
  const { code } = query
  const [setStravaOAuthToken, { data }] = useMutation(SET_STRAVA_OAUTH_TOKEN)
  console.log(code)
  return (
    <Text
      onClick={() =>
        setStravaOAuthToken({
          variables: { token: code },
        })
      }
    >
      {!data ? 'SEND IT' : 'SENT'}
    </Text>
  )
}

const Strava: React.FunctionComponent<Props> = ({ success = false }) => {
  return success ? <StravaSuccess /> : <StravaAuth />
}
export default Strava
