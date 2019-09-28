import get from 'lodash/get'

const en = {
  HERO_HEADING: 'Datadriven hälsoanalys',
  HERO_TEXT:
    'Samla all din information från Runkeeper, Strava, Samsung Health och Apple Health på ett och samma ställe',
}

const strings = {
  get: (key: string): string => get(en, key),
}

export default strings
