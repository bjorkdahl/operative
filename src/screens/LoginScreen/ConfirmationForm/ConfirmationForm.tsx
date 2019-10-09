import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Formik, Form, Field, FormikValues } from 'formik'
import { TextField } from 'formik-material-ui'
import colors from 'strings/colors'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Heading from 'components/atoms/Heading/Heading'
import Text from 'components/atoms/Text'
import * as Yup from 'yup'
import gql from 'graphql-tag'
import strings from 'strings'

const CONFIRM_REGISTRATION = gql`
  mutation ConfirmRegistration($username: String!, $code: String!) {
    confirmRegistration(data: { username: $username, code: $code }) {
      id
      username
      token
    }
  }
`

const RESEND_CONFIRMATION_CODE = gql`
  mutation ResendConfirmationCode($username: String!) {
    resendConfirmationCode(data: { username: $username })
  }
`

const ConfirmationSchema = Yup.object().shape({
  code: Yup.number().required('Required'),
})

const useStyles = makeStyles({
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
})

const initialValues = { code: '' }

interface Props {
  user: string
}

const ConfirmationForm: React.FunctionComponent<Props> = ({ user }) => {
  const [resendConfirmationCode] = useMutation(RESEND_CONFIRMATION_CODE)
  const [confirmRegistration] = useMutation(CONFIRM_REGISTRATION)
  const [message, setMessage] = useState('')
  const classes = useStyles()

  const onSubmit = async (values: FormikValues): Promise<any> => {
    try {
      const {
        data: { id, username, token },
      } = await confirmRegistration({
        variables: { username: user, code: values.code },
      })
      console.log('id: ' + id + ' username: ' + username + ' token: ' + token)
      await localStorage.set('operativeToken', token)
      console.log(localStorage.get('operativeToken'))
    } catch (e) {
      console.log(e)
    }
  }

  const onResendCode = async (values: FormikValues): Promise<any> => {
    try {
      const response = await resendConfirmationCode({
        variables: { username: user, code: values.code },
      })
      response && setMessage('A new code has been sent to you!')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ConfirmationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }): any => (
        <React.Fragment>
          <Heading>Account confirmation</Heading>
          {!message ? (
            <Text>
              Hey! Before you are good to go, your account just needs to be
              confirmed. You should have a confirmation code on the email you
              submitted. If you need a new one,{' '}
              <div onClick={onResendCode}>
                <Text inline bold>
                  click here!
                </Text>
              </div>
            </Text>
          ) : (
            <Text>{message}</Text>
          )}
          <Form className={classes.form}>
            <Field
              className={classes.field}
              component={TextField}
              label={strings.get('CONFIRMATION_CODE')}
              name="code"
              type="text"
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
        </React.Fragment>
      )}
    </Formik>
  )
}

export default ConfirmationForm
