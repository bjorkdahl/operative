import React from 'react'
import HeroHeader from 'components/molecules/HeroHeader'
import { Grid } from '@material-ui/core'

const IndexScreen: React.FunctionComponent = () => {
  return (
    <Grid container>
      <HeroHeader />
    </Grid>
  )
}

export default IndexScreen
