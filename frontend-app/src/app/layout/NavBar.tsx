
import { Button, Container, Item, Menu } from "semantic-ui-react";


export default function NavBar() {
    return (

        <Menu inverted fixed='top'>
              <img  src='assets/smoke.png'  width="100px" height= "50px"></img>  
              <text fontSize={100}  >The Duse Cafe</text>
            <Menu.Item header style={{ marginRight: '100px' }}> 
          
            </Menu.Item>
            <Container>


                <Menu.Item name='Menu' />
                <Menu.Item name="VIP Room" />
                <Menu.Item name="Om Os" />
                <Menu.Menu position="right">
                    <Button circular className="custom-icon-button" style={{ width: "50px", height: "50px" }} icon="shopping basket"
                    >
                    </Button>
                </Menu.Menu>



            </Container>
        </Menu>
    )
}