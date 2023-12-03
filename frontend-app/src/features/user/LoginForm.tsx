import { ErrorMessage, Form, Formik } from "formik";
import { Button, Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from "yup";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  const validationSchema = Yup.object({
    username: Yup.string().required("BrugerNavn må ikke være tom!"),
    password: Yup.string().required("Der Skal indtastes en kodeord!"),
    role: Yup.string(),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ username: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore.login(values).catch((error) => setErrors({ error: error }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput placeholder="UserName" name="username" />
          <MyTextInput placeholder="Password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            positive
            loading={isSubmitting}
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
