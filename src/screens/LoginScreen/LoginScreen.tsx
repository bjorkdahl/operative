import React, { useState, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import colors from 'strings/colors'

import { useTransition, animated } from 'react-spring'
import SignInForm from './SignInForm/SignInForm'
import SignUpForm from './SignUpForm/SignUpForm'

const useStyles = makeStyles({
  box: {
    display: 'grid',
    justifyContent: 'center',
    backgroundColor: colors.colorWhite,
    padding: '20px',
    boxShadow: '0px 0px 33px 17px rgba(0,0,0,0.1)',
  },
  background: {
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${colors.colorPrimary} 0%, ${colors.colorBackground} 100%)`,
  },
})

const LoginScreen: React.FunctionComponent = () => {
  const classes = useStyles()
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % 3), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: {
      position: 'absolute',
      opacity: 0,
      transform: 'translate3d(-100%,0,0)',
    },
  })

  const pages = [
    ({ style }: any) => (
      <animated.div style={{ ...style }}>
        <SignInForm onClick={onClick} />
      </animated.div>
    ),
    ({ style }: any) => (
      <animated.div style={{ ...style }}>
        <SignUpForm onClick={onClick} />
      </animated.div>
    ),
  ]

  return (
    <Grid container className={classes.background}>
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.box}>
        {transitions.map(({ item, props, key }) => {
          const CurrentPage = pages[item]
          return <CurrentPage key={key} style={props} />
        })}
      </Grid>
    </Grid>
  )
}

export default LoginScreen
