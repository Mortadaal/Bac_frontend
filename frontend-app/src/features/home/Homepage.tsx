import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";



export default observer(function Homepage() {
    const{userStore}=useStore();
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image
                        src='/assets/logo.jpg'
                        style={{ width: '400px', height: '400px', marginBottom: 12 }}
                    />
                </Header>
                {userStore.isLoggedIn?(
                     <>
                        <Button as={Link} to='/frontPage' size="huge" inverted>
                             Gå til forsiden
                        </Button>
                     </>
                ):( <Button.Group>
                    <Button positive as={Link} to='/login' content="Login"/>
                    <Button.Or/>
                    <Button as={Link} to='register' content="Register"/>
                </Button.Group>)}
            </Container>
        </Segment>
    )
})