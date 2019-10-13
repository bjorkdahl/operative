import { useMutation } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Heading from 'components/atoms/Heading/Heading'
import Text from 'components/atoms/Text'
import { Field, Form, Formik, FormikValues } from 'formik'
import { TextField } from 'formik-material-ui'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import strings from 'strings'
import colors from 'strings/colors'
import * as Yup from 'yup'

const CONFIRM_REGISTRATION = gql`
  mutation ConfirmRegistration($username: String!, $code: String!) {
    confirmRegistration(data: { username: $username, code: $code }) {
      id
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
  const history = useHistory()
  const classes = useStyles()

  const onSubmit = async (values: FormikValues): Promise<any> => {
    try {
      const {
        data: { id },
      } = await confirmRegistration({
        variables: { username: user, code: values.code },
      })
      id && history.push('/login')
    } catch (e) {
      console.log(e)
    }
  }

  const onResendCode = async (): Promise<any> => {
    try {
      const response = await resendConfirmationCode({
        variables: { username: user },
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
