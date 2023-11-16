import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function Homepage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image
                        src='/assets/logo.jpg'
                        style={{ width: '400px', height: '400px', marginBottom: 12 }}
                    />
                </Header>
                <Header as='h2' inverted content='Velkommen' />
                
                <Button.Group>
                    <Button positive as={Link} to='/login' content="Login"/>
                    <Button.Or/>
                    <Button as={Link} to='register' content="Register"/>
                </Button.Group>
                
                {/* <Button as={Link} to='/qrcode' size="huge" inverted>
                    Kom til QR-code
                </Button> */}
            </Container>
        </Segment>
    )
}