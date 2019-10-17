import React, { useEffect } from 'react'
import { useLazyQuery, useQuery , useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Text from 'components/atoms/Text'
import * as params from 'react-route-params'
import { Redirect, Route } from 'react-router'
import strings from 'strings'
import { Button } from '@material-ui/core'

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

const StravaAuth: React.FunctionComponent = () => {
  
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
  }, [data, query.code, setStravaOAuthToken])

  if (data) return <Redirect to='/profile' />
  return <Text>{query.error ? strings.get('NEED_STRAVA_PERMISSION') : strings.get('LOADING')}</Text>
}

interface Props {
  baseRoute: string
}


const Strava: React.FunctionComponent<Props> = ({ baseRoute }) => {
  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: any,
  ): Promise<void> => {
    try {
      const { loading, error, data } = useQuery(GET_STRAVA_OAUTH_URL, {
    variables: { callbackUrl: 'http://localhost:3000/profile/connect/strava/success/' },
  })

      const handler: any = {
        UserNotConfirmedException: handleNeedsConfirmation,
        NotAuthorizedException: handleInvalidCredentials,
        UserNotFoundException: handleUserNotFound,
        DisabledUserException: handleUserDisabled,
      }

      console.log(errorCode)

      errorCode
        ? handler[errorCode](values.email)
        : authenticated && handleAuthenticated(user)

      setSubmitting(false)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <React.Fragment>
      <Button onClick={onSubmit}>Connect to Strava</Button>
      <Route path={`${baseRoute}/stravaConnected/`}>
        <StravaSuccess />
      </Route>
    </React.Fragment>
  )
}

export default Strava
