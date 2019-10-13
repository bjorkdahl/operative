import { useMutation } from '@apollo/react-hooks'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Heading from 'components/atoms/Heading/Heading'
import Text from 'components/atoms/Text'
import { ModalContextInstance } from 'Contexts/Modal'
import { Field, Form, Formik, FormikProps, FormikValues } from 'formik'
import { TextField } from 'formik-material-ui'
import gql from 'graphql-tag'
import moment from 'moment'
import React, { useContext } from 'react'
import strings from 'strings'
import colors from 'strings/colors'
import * as Yup from 'yup'
import ConfirmationForm from './../ConfirmationForm/ConfirmationForm'

const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $name: String!
    $dateofbirth: String!
  ) {
    register(
      data: {
        username: $username
        password: $password
        name: $name
        birthdate: $dateofbirth
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
    .min(8, 'Too Short!')
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

const SignUpForm: React.FunctionComponent<Props> = () => {
  const classes = useStyles()
  const [registerUser] = useMutation(REGISTER_USER)
  const modalContext = useContext(ModalContextInstance)
  const initialValues = {
    fullName: '',
    password: '',
    passwordConfirmation: '',
    dateofbirth: moment()
      .subtract({ years: 30 })
      .format('YYYY-MM-DD'),
    email: '',
  }

  const handleNeedsConfirmation = (email: string): void => {
    modalContext.openModal(<ConfirmationForm user={email} />)
  }

  const handleSignUpError = (): void => {
    modalContext.openModal(<Text>Woops! Something went wrong!</Text>)
  }

  const onSubmit = async (
    values: FormikValues,
    { setSubmitting }: any,
  ): Promise<any> => {
    try {
      const success = await registerUser({
        variables: {
          name: values.fullName,
          username: values.email,
          password: values.password,
          dateofbirth: values.dateofbirth,
        },
      })

      success ? handleNeedsConfirmation(values.email) : handleSignUpError()

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
                  props.setFieldValue(
                    'dateofbirth',
                    date ? date.format('YYYY-MM-DD') : null,
                    true,
                  )
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
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default SignUpForm
