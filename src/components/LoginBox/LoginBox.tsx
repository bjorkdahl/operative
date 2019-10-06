import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import styles from './LoginBox.module.scss'
import * as Yup from 'yup'

const SIGNIN_USER = gql`
  mutation SignInUser($username: String!, $password: String!) {
    signIn(data: { username: $username, password: $password })
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
    <Grid container component="main">
      <Grid item xs={false} sm={4} md={7} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }): any => (
              <Form>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link href="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href="#">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default LoginBox
