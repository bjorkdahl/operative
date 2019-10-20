import { Container, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Strava from 'actions/Strava'
import clsx from 'clsx'
import AnimateCards from 'components/atoms/AnimateCards'
import React from 'react'
import colors from 'strings/colors'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    boxShadow: `0px 5px 15px ${colors.boxShadow}`,
  },
  fixedHeight: {
    height: 240,
  },
}))

const ProfileScreen: React.FunctionComponent = () => {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <AnimateCards delay={{ initial: 100, trailing: 100 }}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper elevation={1} className={fixedHeightPaper}>
                  <Strava />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper elevation={2} className={fixedHeightPaper}>
                  2nd
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={20} className={classes.paper}>
                  3rd
                </Paper>
              </Grid>
            </AnimateCards>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default ProfileScreen
