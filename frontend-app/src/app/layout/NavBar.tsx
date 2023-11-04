
import { Button, Container, Menu } from "semantic-ui-react";
import './styles.css';


interface Props {
    openForm: () => void;
}
export default function NavBar({ openForm }: Props) {
    return (

        <Menu inverted fixed='top'>     
            <Menu.Item> <div className="div-Text">The Duse Cafe</div></Menu.Item>
            <Menu.Item header style={{ marginRight: '100px' }}>

            </Menu.Item>
            <Container>


                <Menu.Item name='Menu' />
                <Menu.Item name="VIP Room" />
                <Menu.Item name="Om Os" />
                <Menu.Item>
                    <Button onClick={openForm} positive content="Add new Product" />
                </Menu.Item>

                <Menu.Menu position="right">

                    <Button circular className="custom-icon-button" style={{ width: "50px", height: "50px" }} icon="shopping basket"
                    >
                    </Button>
                </Menu.Menu>



            </Container>
        </Menu>
    )
}