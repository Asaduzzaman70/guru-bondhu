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
import Error from "./Error";
import MySubmission from "../Pages/MySubmission/MySubmission";
import PendingAssignments from "../Pages/PendingAssignments/PendingAssignments";



const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error />,
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
                loader: () => fetch('https://guru-bondhu-server.vercel.app/users')
            },
            {
                path: '/createAssignments',
                element: <PrivateRouter><CreateAssignments /></PrivateRouter>,
            },
            {
                path: '/assignments',
                element: <Assignments />,
                loader: () => fetch(`https://guru-bondhu-server.vercel.app/assignmentsCount`)
            },
            {
                path: '/update/:_id/:userUid',
                element: <PrivateRouter><UpdateAssignments /></PrivateRouter>,
                loader: ({ params }) => fetch(`https://guru-bondhu-server.vercel.app/assignments?_id=${params._id}&&userUid=${params.userUid}`, {credentials: 'include'})
            },
            {
                path: '/viewDetails/:_id/:userUid',
                element: <PrivateRouter><ViewAssignments /></PrivateRouter>,
                loader: ({ params }) => fetch(`https://guru-bondhu-server.vercel.app/assignments?_id=${params._id}&&userUid=${params.userUid}`, {credentials: 'include'})
            },
            {
                path: '/myAssignments',
                element: <PrivateRouter><MySubmission /></PrivateRouter>,
                // loader: ({ params }) => fetch(`https://guru-bondhu-server.vercel.app/submitDoc?userUid=${params.userUid}`, { credentials: 'include' })
            },
            {
                path: '/submittedAssignments',
                element: <PrivateRouter><PendingAssignments /></PrivateRouter>,
                // loader: ({ params }) => fetch(`https://guru-bondhu-server.vercel.app/submitDoc?statusPending=${params.statusPending}&&userUid2=${params.userUid}`, { credentials: 'include' })
            }
        ]
    },
]);

export default router;