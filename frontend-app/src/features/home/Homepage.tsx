import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { router } from "../../app/router/Routes";

const urlParams = new URLSearchParams(window.location.search);
const tableNumberParam = urlParams.get("tablenumber");

if (tableNumberParam) {
  const tableNumber = parseInt(tableNumberParam, 10);
  localStorage.setItem("tablenumber", tableNumberParam);
  console.log(tableNumber);
}

const handleGoToForsiden=()=>{
  router.navigate("/frontpage");
  window.location.reload();
}
const handleGoToMenu=()=>{
  router.navigate("/menu");
  window.location.reload();
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
            <Button onClick={handleGoToMenu} content="Gå Til Menu" />
          </Header>
        ) : null}
        {userStore.isLoggedIn ? (
          <>
            <Button onClick={handleGoToForsiden} size="huge" inverted>
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
