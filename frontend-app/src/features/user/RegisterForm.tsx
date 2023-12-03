import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header, Label } from "semantic-ui-react";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^[A-Z]+$/, "Skal være med stort")
      .required(),
    firstname: Yup.string().required("ForNavn må ikke være tom!"),
    lastname: Yup.string().required("EfterNavn må ikke være tom!"),
    adresse: Yup.string().required("Adresse må ikke være tom!"),
    city: Yup.string().required("By må ikke være tom!"),
    zipcode: Yup.string().required("PostNr må ikke være tom!"),
    country: Yup.string().required("Land må ikke være tom!"),
    birthdate: Yup.string().required("Fødselsdags Dato må ikke være tom!"),
    password: Yup.string()
      .min(8, "Adgangskoden skal være på mindst 8 tegn")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Adgangkoden skal minimum indeholde et stort bogstav, samt lille og special tegn"
      )
      .required("Der Skal indtastes en kodeord!"),
  });
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        username: "",
        firstname: "",
        lastname: "",
        adresse: "",
        city: "",
        zipcode: "",
        country: "",
        birthdate: "",
        password: "",
        created: new Date(),
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error: error }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header content="Opret Konto" color="teal" textAlign="center" />
          <MyTextInput
            placeholder="Username"
            name="username"
            label="BrugerNavn:"
          />
          <MyTextInput
            name="firstname"
            placeholder="firstname"
            label="ForNavn:"
          />
          <MyTextInput
            name="lastname"
            placeholder="lastName"
            label="EfterNan:"
          />
          <MyTextInput name="adresse" placeholder="adresse" label="Adresse:" />
          <MyTextInput name="city" placeholder="city" label="By:" />
          <MyTextInput name="zipcode" placeholder="zipCode" label="PostNr.:" />
          <MyTextInput name="country" placeholder="country" label="Land:" />
          <MyTextInput
            name="birthdate"
            placeholder="birthDate"
            type="date"
            label="FødselsDato:"
          />
          <MyTextInput
            name="password"
            placeholder="Password"
            type="password"
            label="KodeOrd:"
          />
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
            disabled={isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
