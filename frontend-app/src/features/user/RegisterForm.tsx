import { Button, Form, Header } from "semantic-ui-react"


export default function RegisterForm(){
    return (
    <Form autoComplete="off">
    <Header
      content="Register New User"
      color="teal"
      textAlign="center"
    />
    <Form.Input name="userName" placeholder="userName"  />
    <Form.Input  name="adresse" placeholder="adresse" />
    <Form.Input  name="city" placeholder="city" />
    <Form.Input  name="zipCode" placeholder="zipCode" />
    <Form.Input  name="country" placeholder="country" />
    <Form.Input  name="birthDate" placeholder="birthDate" />
    <Form.Input  name="password" placeholder="Password" type="password" />
    <Button
      positive
      content="Register"
      type="submit"
      fluid
    />
  </Form>
    )
}