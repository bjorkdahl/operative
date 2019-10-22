import {
  AppBar,
  Badge,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SettingsIcon from '@material-ui/icons/Settings'
import { AuthContextInstance } from 'actions/Auth'
import cx from 'classnames'
import Heading from 'components/atoms/Heading/'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import strings from 'strings'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#fafafa',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    opacity: 0,
    cursor: 'initial',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}))

const NavBar: React.FunctionComponent = () => {
  const authContext = useContext(AuthContextInstance)
  const history = useHistory()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = (): void => {
    setOpen(true)
  }
  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  const mainListItems = (
    <div>
      <ListItem button>
        <ListItemIcon>
          <AccountCircleIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary={strings.get('ACCOUNT')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary={strings.get('SETTINGS')} />
      </ListItem>
      {authContext.authenticated ? (
        <ListItem button onClick={(): void => authContext.signOut()}>
          <ListItemIcon>
            <ExitToAppRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={strings.get('LOG_OUT')} />
        </ListItem>
      ) : (
        <ListItem button onClick={(): void => history.push('/login')}>
          <ListItemIcon>
            <ExitToAppRoundedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={strings.get('LOG_IN')} />
        </ListItem>
      )}
    </div>
  )

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        className={cx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={cx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Heading center uppercase light className={classes.title}>
            Operative
          </Heading>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon color="primary" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        onBackdropClick={(): void => setOpen(!open)}
        classes={{
          paper: cx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
    </React.Fragment>
  )
}

export default NavBar
