import { Button, Modal, Sans } from "@artsy/palette"
import React from "react"
import { Form, Formik, FormikHelpers, FormikProps } from "formik"
import * as Yup from "yup"
import { ConfirmPassword } from "./Mutation/ConfirmPassword"
import { useSystemContext } from "v2/Artsy"
import PasswordInput from "v2/Components/PasswordInput"

interface ConfirmPasswordPromptProps {
  onComplete: (string) => void
  onClose?: () => void
  show: boolean
  title?: string
  action?: string
}

export interface FormValues {
  password: string
}

const presenceRegex = /.*\S+.*/

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Enter your password")
    .matches(presenceRegex, "Enter your password"),
})

export const ConfirmPasswordPrompt: React.FC<ConfirmPasswordPromptProps> = (
  props
) => {
  const { title, action, onComplete, onClose, show } = props
  const { relayEnvironment } = useSystemContext()

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    actions.setSubmitting(true)

    try {
      const response = await ConfirmPassword(relayEnvironment, {
        password: values.password,
      })

      if (response.confirmPassword.valid) {
        onComplete(values.password)
      } else {
        actions.setFieldError("password", "Password is incorrect.")
      }

      actions.setSubmitting(false)
    } catch (error) {
      actions.setSubmitting(false)
      console.error("Unable to confirm password.")
    }
  }

  return (
    <Modal title={title || "Confirm password"} show={show} onClose={onClose}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ password: "" }}
        onSubmit={handleSubmit}
      >
        {(formikProps: FormikProps<FormValues>) => {
          const {
            touched,
            errors,
            values,
            handleBlur,
            handleChange,
            isSubmitting,
          } = formikProps

          return (
            <Form>
              <Sans mb={2} color="black60" size="3">
                Enter your password to continue.
              </Sans>
              <PasswordInput
                autoComplete="off"
                name="password"
                error={touched.password && errors.password}
                value={values.password}
                onBlur={handleBlur}
                placeholder="Password"
                onChange={handleChange}
                autoFocus
              />
              <Button
                mt={2}
                loading={isSubmitting}
                disabled={isSubmitting}
                width="100%"
                type="submit"
              >
                {action || "Confirm"}
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
