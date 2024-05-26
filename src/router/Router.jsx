import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Register from "../Components/auth/Register/Register";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/register',
                element: <Register/>
            }
        ]
    },
]);

export default router;