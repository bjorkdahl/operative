import get from 'lodash/get'

const sv = {
  SUBMIT: 'Submit',
  FULL_NAME: 'Full name',
  EMAIL: 'Email',
  USERNAME: 'User name',
  PASSWORD: 'Password',
  PASSWORD_CONFIRM: 'Confirm password',
  FORGOT_PASSWORD: 'Forgot your password?',
  SIGN_UP: 'Sign up!',
  LOG_IN: 'Log in!',
  TAGLINE: 'Datadriven hälsoanalys',
  TAGLINE_DESC:
    'Samla all din information från Runkeeper, Strava, Samsung Health och Apple Health på ett och samma ställe',
}

const strings = {
  get: (key: string): string => get(sv, key),
}

export default strings
