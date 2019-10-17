import { useMutation } from '@apollo/react-hooks'
import { Avatar, Button, Grid, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Heading from 'components/atoms/Heading'
import Text from 'components/atoms/Text'
import { AuthContextInstance } from 'actions/Auth'
import { ModalContextInstance } from 'actions/Modal'
import { Field, Form, Formik, FormikValues } from 'formik'
import { TextField } from 'formik-material-ui'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import strings from 'strings'
import colors from 'strings/colors'
import * as Yup from 'yup'
import ConfirmationForm from '../ConfirmationForm'

const SIGNIN_USER = gql`
  mutation SignInUser($username: String!, $password: String!) {
    signIn(data: { username: $username, password: $password }) {
      authenticated
      errorCode
      user {
        id
        token
        username
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
})

const initialValues = { email: '', password: '' }

interface Props {
  onClick: () => void
}

interface User {
  token: string
  username: string
  id: number
}

const SignInForm: React.FunctionComponent<Props> = ({ onClick }) => {
  const [signInUser] = useMutation(SIGNIN_USER)
  const history = useHistory()
  const modalContext = useContext(ModalContextInstance)
  const authContext = useContext(AuthContextInstance)
  const classes = useStyles()

  const handleUserNotFound = (): void => {
    modalContext.openModal(
      <Text>Could not find any users with that email!</Text>,
    )
  }

  const handleNeedsConfirmation = (email: string): void => {
    modalContext.openModal(<ConfirmationForm user={email} />)
  }

  const handleInvalidCredentials = (): void => {
    modalContext.openModal(
      <Text>Invalid email and/or password, please try again!</Text>,
    )
  }

  const handleUserDisabled = (): void => {
    modalContext.openModal(
      <Text>Looks like your account has been disabled.</Text>,
    )
  }

  const handleAuthenticated = (user: User): void => {
    authContext.signIn(true, user.username, user.token)
    history.push('/profile')
  }

  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: any,
  ): Promise<void> => {
    try {
      const {
        data: {
          signIn: { authenticated, user, errorCode },
        },
      } = await signInUser({
        variables: { username: values.email, password: values.password },
      })

      const handler: any = {
        UserNotConfirmedException: handleNeedsConfirmation,
        NotAuthorizedException: handleInvalidCredentials,
        UserNotFoundException: handleUserNotFound,
        DisabledUserException: handleUserDisabled,
      }

      console.log(errorCode)

      errorCode
        ? handler[errorCode](values.email)
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
    </div>
  )
}

export default SignInForm
