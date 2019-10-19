import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Text from 'components/atoms/Text'
import gql from 'graphql-tag'
import React, { useEffect } from 'react'
import * as params from 'react-route-params'
import { Redirect, Route } from 'react-router'
import { BallSpinner } from 'react-spinners-kit'
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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    marginRight: '20px',
  }
})

const StravaSuccess: React.FunctionComponent = () => {
  const query = params.get()
  const [setStravaOAuthToken, { data }] = useMutation(SET_STRAVA_OAUTH_TOKEN)

  useEffect(() => {
    query.code && setStravaOAuthToken({
      variables: { token: query.code },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStravaOAuthToken])

  if (data) return <Redirect to='/profile' />
  return query.error ? <Text>{strings.get('NEED_STRAVA_PERMISSION')}</Text> : <BallSpinner />
}

const Strava: React.FunctionComponent = () => {
  const classes = useStyles()
  const [getStravaURL, { error, data }] = useLazyQuery(GET_STRAVA_OAUTH_URL, {
    variables: {
      callbackUrl: `http://localhost:3000/profile/stravaAuth`
    },
  })
  const onSubmit = async (): Promise<void> => {
    try {
      await getStravaURL()
    } catch (e) {
      console.log(e)
    }
  }

  if (error) return <Redirect to='/profile' />
  data && (window.location.href = data.getStravaOAuthUrl)

  return (
    <div className={classes.container}>
      <Button onClick={onSubmit}>Connect to Strava</Button>
      <Route path={`/profile/stravaAuth`}>
        <StravaSuccess />
      </Route>
    </div>
  )
}

export default Strava