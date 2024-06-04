import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateContext } from "../contexts/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://car-doctor-server-main-five.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useContext(CreateContext);
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('Interceptor', error);
            if (error.response.status === 401 || error.response.status === 403 || error.response.status === 404) {
                console.log('Log out user');
                logOut()
                    .then(() => {
                        navigate('/login')
                    })
                    .catch(error => console.log(error))
            }
        }
        )
    }, []);
    return axiosSecure;
};

export default useAxiosSecure;