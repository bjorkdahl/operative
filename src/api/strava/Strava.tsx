import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Text from 'components/atoms/Text'
import * as params from 'react-route-params'
import { Redirect } from 'react-router'
import strings from 'strings'

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
    variables: { callbackUrl: 'http://localhost:3000/profile/connect/strava/success/' },
  })
  if (loading) return <Text>Loading...</Text>
  if (error) return <Redirect to='/profile' />
  data && (window.location.href = data.getStravaOAuthUrl)
  return <></>
}

const StravaSuccess: React.FunctionComponent = () => {
  const query = params.get()
  const [setStravaOAuthToken, { data }] = useMutation(SET_STRAVA_OAUTH_TOKEN)

  useEffect(() => {
    query.code && setStravaOAuthToken({
      variables: { token: query.code },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (data) return <Redirect to='/profile' />
  return <Text>{query.error ? strings.get('NEED_STRAVA_PERMISSION') : strings.get('LOADING')}</Text>
}

const Strava: React.FunctionComponent<Props> = ({ success = false }) => {
  return success ? <StravaSuccess /> : <StravaAuth />
}
export default Strava
