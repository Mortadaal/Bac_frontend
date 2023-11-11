import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Homepage from "../../features/home/Homepage";
import ProductDashboard from "../../features/dashboard/ProductDashboard";
import BookingForm from "../../features/booking/BookingForm";
import ProductsForm from "../../features/products/forms/ProductsForm";
import CategoryForm from "../../features/categorys/forms/CategoryForm";
import DeleteCategoryForm from "../../features/categorys/forms/DeleteCategoryForm";




export const routes: RouteObject[] = [
    {
        path: "/",
        element:<App/>,
        children:[
            {path:'',element:<Homepage/>},
            {path:'menu',element:<ProductDashboard/>},
            {path:'bookingVip',element:<BookingForm/>},
            {path:'addProduct',element:<ProductsForm key='add'/>},
            {path:'edit/:id',element:<ProductsForm key='edit'/>},
            {path:'deleteCategory',element:<DeleteCategoryForm/>},
            {path:'addCategory',element:<CategoryForm/>},
          
        
        ]
    }
]

export const router = createBrowserRouter(routes);