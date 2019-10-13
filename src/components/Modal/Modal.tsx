import { Backdrop, Fade, Grid, Modal as MuiModal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import colors from 'strings/colors'

interface Props {
  isOpen: boolean
}

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    padding: '40px',
    backgroundColor: colors.colorWhite,
  },
})

const Modal: React.FunctionComponent<Props> = ({ children, isOpen }) => {
  const [open, setOpen] = React.useState(isOpen)
  const classes = useStyles()
  const toggleModal = (): void => setOpen(!open)
  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={toggleModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          className={classes.modalContainer}
        >
          {children}
        </Grid>
      </Fade>
    </MuiModal>
  )
}

export default Modal
