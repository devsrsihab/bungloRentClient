import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../Pages/Home/Home";
import CreateShop from "../pages/Create-Shop/CreateShop";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import BuildingManaging from "../components/Dashboard/Building-Managing/buildingManaging";
import SaleCollection from "../components/Dashboard/Sales-Collection/SaleCollection";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Subscription from "../pages/Subscription/Subscription";
import SalesCount from "../components/Dashboard/Sales Count/SalesCount";
import SaleHistory from "../components/Dashboard/Sale-History/SaleHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "create-shop",
       element: <PrivateRoute><CreateShop /></PrivateRoute> 
      
      },
      { path: "carts/",
        element: <PrivateRoute> <Cart /></PrivateRoute>,
      },
      { path: "checkout/:email",
        element: <PrivateRoute> <Checkout /></PrivateRoute>,
        loader: ({params}) => fetch(`https://bunglorent.vercel.app/carts/${params.email}`)
      },
      { path: "subscription",
        element:  <Subscription />,    
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute> ,
    errorElement: <ErrorPage />,

    children: [
      {
        path: 'building-managing',
        element: <BuildingManaging/>
      },
      {
        path: 'sales-collection',
        element: <SaleCollection/>
      },
      {
        path: 'sales-count',
        element: <SalesCount/>
      },
      {
        path: 'sales-history',
        element: <SaleHistory/>
      },
    ]
    
  }
]);
