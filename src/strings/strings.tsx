import get from 'lodash/get'

const sv = {
  ACCOUNT: 'Account',
  CONFIRMATION_CODE: 'Confirmation code',
  CONNECT_STRAVA: 'Connect your Strava account',
  EMAIL: 'Email',
  FORGOT_PASSWORD: 'Forgot your password?',
  FULL_NAME: 'Full name',
  LOADING: 'Loading...',
  LOG_IN: 'Log in!',
  LOG_OUT: 'Log out',
  NEED_STRAVA_PERMISSION:
    'We need your permission to sync your Strava activity.',
  PASSWORD_CONFIRM: 'Confirm password',
  PASSWORD: 'Password',
  SETTINGS: 'Settings',
  SIGN_UP: 'Sign up!',
  SUBMIT: 'Submit',
  TAGLINE_DESC:
    'Samla all din information från Runkeeper, Strava, Samsung Health och Apple Health på ett och samma ställe',
  TAGLINE: 'Datadriven hälsoanalys',
  USERNAME: 'User name',
}

const strings = {
  get: (key: string): string => get(sv, key),
}

export default strings
