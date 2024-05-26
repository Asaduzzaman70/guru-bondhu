import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Register from "../Components/auth/Register/Register";
import Login from "../Components/auth/Login/Login";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/login',
                element: <Login/>,
                loader: () => fetch('http://localhost:5000/users')
            }
        ]
    },
]);

export default router;