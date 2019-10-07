import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { TextField } from 'formik-material-ui'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import styles from './LoginBox.module.scss'
import * as Yup from 'yup'
import Heading from './../atoms/Heading/Heading'
import strings from 'strings'
import Text from 'components/atoms/Text'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: '#9FEDD7',
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
    height: '300px',
  },
  field: {
    padding: '5px',
    margin: '15px 5px',
    color: '#9FEDD7',
  },
})

const SIGNIN_USER = gql`
  mutation SignInUser($username: String!, $password: String!) {
    signIn(data: { username: $username, password: $password }) {
      user {
        token
      }
    }
  }
`

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const LoginBox: React.FunctionComponent = () => {
  const classes = useStyles()
  const [signInUser] = useMutation(SIGNIN_USER)
  const initialValues = { email: '', password: '' }
  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: any,
  ): Promise<any> => {
    try {
      signInUser({
        variables: { username: values.email, password: values.password },
      })
      setSubmitting(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Grid container className={styles.background}>
      <Grid item xs={12} sm={6} md={4} lg={3} className={styles.box}>
        <div className={styles.header}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon className={classes.icon} />
          </Avatar>
          <Heading>Sign in</Heading>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
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
              <button
                className={styles.button}
                type="submit"
                disabled={isSubmitting}
              >
                <Text bold>{strings.get('SUBMIT')}</Text>
              </button>
            </Form>
          )}
        </Formik>
        <Grid container className={classes.field}>
          <Grid item xs>
            <Link href="#">
              <Text>{strings.get('FORGOT_PASSWORD')}</Text>
            </Link>
          </Grid>
          <Grid item>
            <Link href="#">
              <Text>{strings.get('SIGN_UP')}</Text>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LoginBox
