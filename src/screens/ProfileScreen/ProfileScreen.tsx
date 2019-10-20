import { Container, Grid, Paper, Avatar } from '@material-ui/core'
import FiberNewOutlinedIcon from '@material-ui/icons/FiberNewOutlined'
import { makeStyles } from '@material-ui/core/styles'
import Strava from 'actions/Strava'
import clsx from 'clsx'
import AnimateCards from 'components/molecules/AnimateCards'
import React from 'react'
import colors from 'strings/colors'
import Heading from 'components/atoms/Heading/'
import Text from 'components/atoms/Text'

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
    position: 'relative',
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    boxShadow: `0px 5px 15px ${colors.boxShadow}`,
  },
  avatar: {
    position: 'absolute',
    right: '0',
    top: '0',
    margin: 10,
    width: 60,
    height: 60,
  },
}))

const ProfileScreen: React.FunctionComponent = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <AnimateCards delay={{ initial: 100, trailing: 100 }}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={classes.paper}>
                  <FiberNewOutlinedIcon color="secondary" fontSize="large" />
                  <Avatar
                    src="https://source.unsplash.com/random/300x306"
                    className={classes.avatar}
                  />
                  <Heading center>
                    New functionality! Strava integration
                  </Heading>
                  <Text ellipsis>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum, aliquam. Tenetur maiores sequi culpa. Suscipit
                    quaerat maxime perferendis perspiciatis, veritatis soluta at
                    voluptatibus sunt, optio accusamus sit, esse est ad?
                  </Text>
                  <Strava />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={classes.paper}>
                  <FiberNewOutlinedIcon color="secondary" fontSize="large" />
                  <Avatar
                    src="https://source.unsplash.com/random/300x305"
                    className={classes.avatar}
                  />
                  <Heading center>2nd</Heading>
                  <Text ellipsis>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis vero doloremque doloribus reprehenderit dolor.
                  </Text>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FiberNewOutlinedIcon color="secondary" fontSize="large" />
                  <Avatar
                    src="https://source.unsplash.com/random/300x304"
                    className={classes.avatar}
                  />
                  <Heading center>3rd title</Heading>
                  <Text ellipsis>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis vero doloremque doloribus reprehenderit dolor. Lorem
                    ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                    vero doloremque doloribus reprehenderit dolor.
                  </Text>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <FiberNewOutlinedIcon color="secondary" fontSize="large" />
                  <Avatar
                    src="https://source.unsplash.com/random/300x303"
                    className={classes.avatar}
                  />
                  <Heading center uppercase>
                    4th title
                  </Heading>
                  <Text ellipsis>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis vero doloremque doloribus reprehenderit dolor.
                  </Text>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <FiberNewOutlinedIcon color="secondary" fontSize="large" />
                  <Avatar
                    src="https://source.unsplash.com/random/300x302"
                    className={classes.avatar}
                  />
                  <Heading center uppercase>
                    5th title
                  </Heading>
                  <Text ellipsis>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis vero doloremque doloribus reprehenderit dolor.
                  </Text>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <FiberNewOutlinedIcon color="secondary" fontSize="large" />
                  <Avatar
                    src="https://source.unsplash.com/random/300x301"
                    className={classes.avatar}
                  />
                  <Heading center uppercase>
                    6th title
                  </Heading>
                  <Text ellipsis>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis vero doloremque doloribus reprehenderit dolor.
                  </Text>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <FiberNewOutlinedIcon color="secondary" fontSize="large" />
                  <Avatar
                    src="https://source.unsplash.com/random/300x300"
                    className={classes.avatar}
                  />
                  <Heading center uppercase>
                    7th title
                  </Heading>
                  <Text ellipsis>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nobis vero doloremque doloribus reprehenderit dolor.
                  </Text>
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
