import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Register from "../Components/auth/Register/Register";
import Login from "../Components/auth/Login/Login";
import Home from "../Pages/Home";
import CreateAssignments from "../Pages/CreateAssignments";
import PrivateRouter from "./PrivateRouter";
import Assignments from "../Pages/Assignments/Assignments";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />,
                loader: () => fetch('http://localhost:5000/users')
            },
            {
                path: '/createAssignments',
                element: <PrivateRouter><CreateAssignments /></PrivateRouter>,
            },
            {
                path: '/assignments',
                element: <Assignments/>
            }
        ]
    },
]);

export default router;