import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'
import { StoreContext, store } from './app/stores/store.ts'
import {  RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'
import { createBrowserHistory } from 'history'


export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <StoreContext.Provider value={store}>
       <RouterProvider router={router} />
    </StoreContext.Provider>
);
