import get from 'lodash/get'

const sv = {
  SUBMIT: 'Submit',
  USERNAME: 'User name',
  PASSWORD: 'Password',
  FORGOT_PASSWORD: 'Forgot your password?',
  SIGN_UP: 'Sign up!',
  TAGLINE: 'Datadriven hälsoanalys',
  TAGLINE_DESC:
    'Samla all din information från Runkeeper, Strava, Samsung Health och Apple Health på ett och samma ställe',
}

const strings = {
  get: (key: string): string => get(sv, key),
}

export default strings
