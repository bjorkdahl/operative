import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Formik, Form, Field, ErrorMessage, FormikValues } from 'formik'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import styles from './LoginBox.module.scss'
import * as Yup from 'yup'
import Heading from './../atoms/Heading/Heading'

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
    <div className={styles.container}>
      <Heading large>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        Sign in
      </Heading>
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
  )
}

export default LoginBox
