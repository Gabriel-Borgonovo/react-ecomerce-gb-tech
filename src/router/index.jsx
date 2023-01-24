import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layout/LayoutPublic";

import Cart from "../pages/cart/Cart";
import Detail from "../pages/details/Details";
import FinalProcess from "../pages/final-process/FinalProcess";
import Home from "../pages/home/Home";
import NotFound from "../pages/not-found/NotFound";
import OrderForm from "../pages/order-form/OrderForm";
import Thanks from "../pages/thanks/Thanks";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPublic />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />, 
            },
            {
                path:"/cart",
                element: <Cart />,
            },
            {
                path:"/product/:id",
                element: <Detail />,
            },
            {
                path:"/order-form",
                element: <OrderForm />
            },
            {
                path:"/final-process",
                element: <FinalProcess />
            },
            {
                path:"/thanks",
                element: <Thanks />
            }

        ]
    } 
])