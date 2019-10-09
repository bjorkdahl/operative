import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { Formik, Form, Field, FormikValues, FormikProps } from 'formik'
import { TextField } from 'formik-material-ui'
import { useMutation } from '@apollo/react-hooks'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import * as Yup from 'yup'
import Heading from 'components/atoms/Heading/Heading'
import Text from 'components/atoms/Text'
import strings from 'strings'
import colors from 'strings/colors'

import gql from 'graphql-tag'
import moment from 'moment'
import { useHistory } from 'react-router'

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $name: String!
    $birthdate: String!
  ) {
    register(
      data: {
        username: $username
        password: $password
        name: $name
        birthdate: $birthdate
      }
    )
  }
`

const SignupSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Too short!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
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
  datepicker: {
    marginTop: '20px',
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
    marginRight: '50px',
  },
})

interface Props {
  onClick: () => void
}

interface FormValues {
  fullName: string
  password: string
  passwordConfirmation: string
  dateofbirth: string
  email: string
}

const SignUpForm: React.FunctionComponent<Props> = ({ onClick }) => {
  const classes = useStyles()
  const [registerUser] = useMutation(REGISTER_USER)
  const history = useHistory()
  const initialValues = {
    fullName: '',
    password: '',
    passwordConfirmation: '',
    dateofbirth: moment()
      .subtract({ years: 30 })
      .format(),
    email: '',
  }
  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: any,
  ): Promise<any> => {
    try {
      console.log(values)
      registerUser({
        variables: {
          name: values.fullName,
          username: values.email,
          password: values.password,
          dateofbirth: values.dateofbirth,
        },
      })
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
        <Heading>{strings.get('SIGN_UP')}</Heading>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<FormValues>): React.ReactElement => {
          const { values } = props
          return (
            <Form className={classes.form}>
              <Field
                className={classes.field}
                component={TextField}
                label={strings.get('FULL_NAME')}
                name="fullName"
                type="text"
              />

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

              <Field
                className={classes.field}
                component={TextField}
                label={strings.get('PASSWORD_CONFIRM')}
                name="passwordConfirmation"
                type="password"
              />

              <KeyboardDatePicker
                name="dateofbirth"
                className={classes.datepicker}
                placeholder={values.dateofbirth}
                value={values.dateofbirth}
                onChange={(date): void =>
                  date !== null
                    ? props.setFieldValue(
                        'dateofbirth',
                        date.format('YYYY-MM-DD'),
                        true,
                      )
                    : props.setFieldValue('dateofbirth', date, false)
                }
                format="YYYY/MM/DD"
              />

              <Button
                size="small"
                className={classes.button}
                type="submit"
                disabled={props.isSubmitting}
              >
                <Text bold>{strings.get('SUBMIT')}</Text>
              </Button>
              <Button size="small" onChange={(): void => history.push('/')}>
                Back
              </Button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default SignUpForm
