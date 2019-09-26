import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

interface Action {
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any
}

interface Props {
  title: string
  bodyText: string
  actions: Action[]
}

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  },
)

const Modal: React.FunctionComponent<Props> = ({
  children,
  title,
  bodyText,
  actions,
}) => {
  const [open, setOpen] = React.useState(false)
  const toggleModal = (): void => setOpen(!open)
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={toggleModal}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onExit={actions[0].onClick}
        onClose={actions[0].onClick}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {bodyText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {actions &&
            actions.map(action => {
              return (
                <Button
                  key={action.label}
                  onClick={toggleModal}
                  color="primary"
                >
                  {action.label}
                </Button>
              )
            })}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Modal
