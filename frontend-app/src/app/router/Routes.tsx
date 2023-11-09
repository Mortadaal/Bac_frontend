import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Homepage from "../../features/home/Homepage";

export const routes: RouteObject[] = [
    {
        path: "/",
        element:<App/>,
        children:[
            {path:'',element:<Homepage/>},
            // {path:'products',element:<ProductDashboard/>},
            // {path:'addProduct',element:<ProductsForm/>}
        ]
    }
]

export const router = createBrowserRouter(routes);