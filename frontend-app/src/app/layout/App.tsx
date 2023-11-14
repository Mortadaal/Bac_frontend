import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import Homepage from '../../features/home/Homepage';
import { ShoppingCartProvider } from '../../features/shopping/ShoppingCartContext';


function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? <Homepage /> : (
        <ShoppingCartProvider>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>

        </ShoppingCartProvider>
      )}

    </>
  )
}
export default observer(App);
