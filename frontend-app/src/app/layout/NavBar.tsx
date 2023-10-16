
import { Container, Menu } from "semantic-ui-react";

export default function NavBar()
{
    return(
        <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
               The Duse Cafe
            </Menu.Item>
            <Menu.Item name='Menu'/>
            <Menu.Item name="VIP Room"/>
            <Menu.Item name="Om Os"/>
                
        </Container>
        </Menu>
    )
}