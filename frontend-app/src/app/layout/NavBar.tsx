
import { Button, Container, Menu } from "semantic-ui-react";
import './styles.css';
import { NavLink } from "react-router-dom";




export default function NavBar() {

   
    return (
        <Menu inverted fixed='top'>
            <Menu.Item as={NavLink} to='/'> <div className="div-Text">The Duse Cafe</div></Menu.Item>
            <Menu.Item header style={{ marginRight: '100px' }}>
            </Menu.Item>
            <Container>
                <Menu.Item as={NavLink} to='/menu' name='Menu' />
                <Menu.Item as={NavLink} to='/bookingVip' name="VIP Room" />
                <Menu.Item name="Om Os" />
                
                <Menu.Menu position="right">
                <Button positive as={NavLink} to='/addProduct'  content="Add new Product" />
                <Button positive as={NavLink} to='/addCategory'  content="Tilføj Kategori" />
                <Button negative as={NavLink} to='/deleteCategory'  content="Slet Kategori" />
                    <Button
                        circular className="custom-icon-button"
                        style={{ width: "50px", height: "50px" }}
                        icon="shopping basket"
                    />            
                </Menu.Menu>



            </Container>
        </Menu>
    )
}