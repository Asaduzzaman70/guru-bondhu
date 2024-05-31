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
import UpdateAssignments from "../Components/common/UpdateAssignments/UpdateAssignments";
import ViewAssignments from "../Components/common/ViewAssignments/ViewAssignments";



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
            },
            {
                path: '/update/:_id',
                element: <PrivateRouter><UpdateAssignments/></PrivateRouter>,
                loader: ({params}) => fetch(`http://localhost:5000/assignments?_id=${params._id}`)
            },
            {
                path: '/viewDetails/:_id',
                element: <PrivateRouter><ViewAssignments/></PrivateRouter>,
                loader: ({params}) => fetch(`http://localhost:5000/assignments?_id=${params._id}`)
            }
        ]
    },
]);

export default router;