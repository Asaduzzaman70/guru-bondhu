import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CreateContext } from "../contexts/AuthProvider";


const PrivateRouter = ({ children }) => {
    const { user, loader } = useContext(CreateContext);
    const location = useLocation();
    console.log(loader);
    console.log(user);

    if (loader) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars w-20 bg-myYellow dark:bg-myPurple"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default PrivateRouter;