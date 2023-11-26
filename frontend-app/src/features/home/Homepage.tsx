import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

const urlParams = new URLSearchParams(window.location.search);
const tableNumberParam = urlParams.get("tableNumber");

if (tableNumberParam) {
  const tableNumber = parseInt(tableNumberParam, 10);
  localStorage.setItem("tableNumber", tableNumberParam);
  console.log(tableNumber);
}

export default observer(function Homepage() {
  const { userStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            src="/assets/logo.jpg"
            style={{ width: "400px", height: "400px", marginBottom: 12 }}
          />
        </Header>
        {!userStore.isLoggedIn ? (
          <Header inverted>
            <Button as={Link} to="menu" content="Gå Til Menu" />
          </Header>
        ) : null}
        {userStore.isLoggedIn ? (
          <>
            <Button as={Link} to="/frontPage" size="huge" inverted>
              Gå til forsiden
            </Button>
          </>
        ) : (
          <Button.Group>
            <Button
              positive
              as={Link}
              to="/login"
              size="huge"
              content="Login"
            />
            <Button.Or />
            <Button as={Link} to="register" size="huge" content="Register" />
          </Button.Group>
        )}
      </Container>
    </Segment>
  );
});
