import { Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";


export default function LoginForm(){

    return(
<Formik initialValues={{username:'',password:''}} onSubmit={values=>console.log(values)}>

{({handleSubmit})=>(
    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
        <MyTextInput placeholder="UserName" name='username'/>
        <MyTextInput placeholder="Password" name='password' type="password"/>
        <Button positive content='Login' type="submit" fluid/>
    </Form>
)}

</Formik>)}