import { Container, Header, Segment } from "semantic-ui-react";

export default function FrontPage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted content='Velkommen Til TheDusCafe' />
            </Container>
        </Segment>
    )
}