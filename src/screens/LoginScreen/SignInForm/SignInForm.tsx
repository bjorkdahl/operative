import { useMutation } from '@apollo/react-hooks'
import {
  Avatar,
  Backdrop,
  Button,
  Fade,
  Grid,
  Link,
  Modal,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Heading from 'components/atoms/Heading'
import Text from 'components/atoms/Text'
import { ModalContextInstance } from 'Contexts/Modal'
import { Field, Form, Formik, FormikValues } from 'formik'
import { TextField } from 'formik-material-ui'
import gql from 'graphql-tag'
import React, { useContext, useEffect, useState } from 'react'
import strings from 'strings'
import colors from 'strings/colors'
import * as Yup from 'yup'
import ConfirmationForm from '../ConfirmationForm'

const SIGNIN_USER = gql`
  mutation SignInUser($username: String!, $password: String!) {
    signIn(data: { username: $username, password: $password }) {
      authenticated
      invalidCredentials
      userDisabled
      needsConfirmation
      invalidUsername
      user {
        token
      }
    }
  }
`

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const useStyles = makeStyles({
  container: {
    padding: '30px 0px',
  },
  avatar: {
    backgroundColor: colors.colorSecondary,
    width: '60px',
    height: '60px',
  },
  icon: {
    width: '35px',
    height: '35px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '100%',
  },
  field: {
    marginBottom: '10px',
    color: '#9FEDD7',
  },
  button: {
    marginTop: '20px',
    backgroundColor: colors.colorAccent,
  },
  header: {
    display: 'grid',
    justifyContent: 'center',
  },
  options: {
    marginRight: '20px',
  },
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

const initialValues = { email: '', password: '' }

interface Props {
  onClick: () => void
}

interface User {
  token: string
}

const SignInForm: React.FunctionComponent<Props> = ({ onClick }) => {
  const [signInUser] = useMutation(SIGNIN_USER)
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState('')
  const toggleModal = (): void => setOpen(!open)
  const modalContext = useContext(ModalContextInstance)
  const classes = useStyles()

  const handleInvalidUsername = (): void => {}
  const handleNeedsConfirmation = (): void => {}
  const handleInvalidCredentials = (): void => {}
  const handleUserDisabled = (): void => {}
  const handleAuthenticated = (user: User): void => {
    localStorage.setItem('operativeToken', user.token)
    console.log('LOGGED IN')
  }

  useEffect(() => {
    modalContext.openModal('hello')
  })

  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: any,
  ): Promise<void> => {
    setUser(values.email)
    try {
      const {
        data: {
          signIn: { authenticated, user, errorCode },
        },
      } = await signInUser({
        variables: { username: values.email, password: values.password },
      })

      const handler: any = {
        invalidUsername: handleInvalidUsername,
        needsConfirmation: handleNeedsConfirmation,
        invalidCredentials: handleInvalidCredentials,
        userDisabled: handleUserDisabled,
      }

      errorCode
        ? handler[errorCode]()
        : authenticated && handleAuthenticated(user)

      setSubmitting(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.icon} />
        </Avatar>
        <Heading>Sign in</Heading>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }): any => (
          <Form className={classes.form}>
            <Field
              className={classes.field}
              component={TextField}
              label={strings.get('EMAIL')}
              name="email"
              type="email"
            />
            <Field
              className={classes.field}
              component={TextField}
              label={strings.get('PASSWORD')}
              name="password"
              type="password"
            />
            <Button
              size="small"
              className={classes.button}
              type="submit"
              disabled={isSubmitting}
            >
              <Text bold>{strings.get('SUBMIT')}</Text>
            </Button>
          </Form>
        )}
      </Formik>
      <Grid container className={classes.field}>
        <Grid item className={classes.options}>
          <Link href="#">
            <Text>{strings.get('FORGOT_PASSWORD')}</Text>
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={onClick} href="#">
            <Text>{strings.get('SIGN_UP')}</Text>
          </Link>
        </Grid>
      </Grid>
      <Modal
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
            <ConfirmationForm user={user} />
          </Grid>
        </Fade>
      </Modal>
    </div>
  )
}

export default SignInForm
