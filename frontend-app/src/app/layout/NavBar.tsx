
import { Button} from "semantic-ui-react";
import './styles.css';
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";




export default observer(function NavBar() {
    const {shopCartStore}=useStore()
    const{cartQuantity}=shopCartStore
   
    return (
        <div className="ui secondary pointing menu nav-background" >
            <NavLink to='/' className="item active">
                The Duse Cafe
            </NavLink>
            <NavLink to='/menu' className="item">
                Menu
            </NavLink>
            <NavLink to='/bookingVip' className="item">
                VIP Room
            </NavLink>
            <a className="item">
                Om Os
            </a>
            <Button as={Link} to={'/qrcode'} 
                  className="ui circular custom-icon-button item">
                   <i className="qrcode icon"></i>
                </Button>
            <div className="right menu">
                <NavLink to='/addProduct' className="ui item">
                    Add new Product
                </NavLink>
                <NavLink to='/addCategory' className="ui item">
                    Tilføj Kategori
                </NavLink>
                <NavLink to='/deleteCategory' className="ui item">
                    Slet Kategori
                </NavLink>
                <a className="ui item">
                    Logout
                </a>
                {cartQuantity > 0 && (<Button as={Link} to={'/cart'} 
                  className="ui circular custom-icon-button item">
                    <i className="shopping basket icon"></i>
                    {cartQuantity}
                </Button>)}

               
               

            </div>
        </div>

    )
})