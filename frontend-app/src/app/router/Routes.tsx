import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Homepage from "../../features/home/Homepage";
import ProductDashboard from "../../features/dashboard/ProductDashboard";
import BookingForm from "../../features/booking/BookingForm";
import ProductsForm from "../../features/products/forms/ProductsForm";
import CategoryForm from "../../features/categorys/forms/CategoryForm";
import DeleteCategoryForm from "../../features/categorys/forms/DeleteCategoryForm";
import ShoppingCart from "../../features/shopping/ShoppingCart";
import QRCodeList from "../../features/qrcode/QRCodeList";
import LoginForm from "../../features/user/LoginForm";
import RegisterForm from "../../features/user/RegisterForm";
import FrontPage from "../../features/FrontPage";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/:tableNumber", element: <Homepage /> },
      { path: "/frontPage", element: <FrontPage /> },
      { path: "menu/", element: <ProductDashboard /> },
      { path: "bookingVip", element: <BookingForm /> },
      { path: "addProduct", element: <ProductsForm key="add" /> },
      { path: "edit/:id", element: <ProductsForm key="edit" /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "deleteCategory", element: <DeleteCategoryForm /> },
      { path: "addCategory", element: <CategoryForm /> },
      { path: "cart/", element: <ShoppingCart /> },
      { path: "qrcode", element: <QRCodeList initialNumberOfCodes={20} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
