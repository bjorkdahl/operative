import get from 'lodash/get'

const sv = {
  SUBMIT: 'Submit',
  FULL_NAME: 'Full name',
  EMAIL: 'Email',
  USERNAME: 'User name',
  CONFIRMATION_CODE: 'Confirmation code',
  PASSWORD: 'Password',
  PASSWORD_CONFIRM: 'Confirm password',
  FORGOT_PASSWORD: 'Forgot your password?',
  SIGN_UP: 'Sign up!',
  LOG_OUT: 'Log out',
  CONNECT_STRAVA: 'Connect your Strava account',
  LOG_IN: 'Log in!',
  LOADING: 'Loading...',
  NEED_STRAVA_PERMISSION: 'We need your permission to sync your Strava activity.',
  TAGLINE: 'Datadriven hälsoanalys',
  TAGLINE_DESC:
    'Samla all din information från Runkeeper, Strava, Samsung Health och Apple Health på ett och samma ställe',
}

const strings = {
  get: (key: string): string => get(sv, key),
}

export default strings
