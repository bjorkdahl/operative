import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import _pickBy from 'lodash/pickBy'
import _keys from 'lodash/keys'
import ConfirmationForm from '../ConfirmationForm'
import { Formik, Form, Field, FormikValues } from 'formik'
import { TextField } from 'formik-material-ui'
import { useMutation } from '@apollo/react-hooks'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'
import Heading from 'components/atoms/Heading/Heading'
import Text from 'components/atoms/Text'
import strings from 'strings'
import colors from 'strings/colors'
import gql from 'graphql-tag'

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

const SignInForm: React.FunctionComponent<Props> = ({ onClick }) => {
  const [signInUser] = useMutation(SIGNIN_USER)
  const [errors, setErrors] = useState()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState('')
  const classes = useStyles()
  const toggleModal = (): void => setOpen(!open)

  useEffect(() => errors && toggleModal(), [errors])

  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: any,
  ): Promise<any> => {
    setUser(values.email)
    try {
      const {
        data: {
          signIn: { authenticated, user, ...rest },
        },
      } = await signInUser({
        variables: { username: values.email, password: values.password },
      })
      const error = _keys(_pickBy(rest))[0]
      error ? setErrors(error) : console.log(authenticated, user)
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
              label={strings.get('USERNAME')}
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
