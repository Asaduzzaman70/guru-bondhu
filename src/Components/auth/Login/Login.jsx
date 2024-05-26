import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CreateContext } from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
    const [showPass, setShowPass] = useState(true);
    const { logIn, logInWithMedia } = useContext(CreateContext)

    const location = useLocation();
    const navigate = useNavigate();

    // Login form on Submit
    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        if (password.length < 6) {
            return toast.error('Your Password must 6 character or more!')
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return toast.error('One special character please!')
        }

        logIn(email, password)
            .then(() => {
                toast.success('Successful login');

                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                toast.error('Something Wrong!')
                console.log(error);
            })
    }

    // Media login 
    const handleMedia = (arg) => {
        logInWithMedia(arg)
            .then(() => {
                toast.success('Successful login');

                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                alert(error.message);
            })
    }

    return (
        <div className="my-12">
            <div className="container mx-auto">
                <div className="flex lg:flex-row-reverse items-center">
                    <div className="hidden lg:inline-block w-1/3">
                        <img className="w-full" src="https://i.ibb.co/vx5T4K6/logo-4.png" alt="Logo" />
                    </div>
                    <div className="card-body p-10 lg:px-40 flex-1">
                        <h1 className="text-5xl font-poetsen text-myYellow dark:text-myPurple mb-6">
                            Happy To See You!!
                        </h1>
                        <form onSubmit={handleLogin} className="">
                            <div className="form-control mb-6">
                                <input type="email" name="email" placeholder="Type Your Email" className="input input-bordered bg-myColor-default text-myText-dark font-medium tracking-wider text-xl py-7 dark:bg-base-200 dark:text-myColor-light" required />
                            </div>
                            <div className="form-control relative mb-6">
                                <input type={showPass ? "password" : "text"} name="password" placeholder="Password" className="input input-bordered bg-myColor-default text-myText-dark font-medium tracking-wider text-xl py-7 dark:bg-base-200 dark:text-myColor-light" required />
                                <div className="absolute right-5 bottom-5 cursor-pointer" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <div className="form-control mt-12 mb-6">
                                <input className="input input-bordered bg-myYellow text-myPurple font-bold uppercase tracking-wider text-xl btn hover:opacity-85 dark:bg-myPurple dark:text-myYellow dark:hover:opacity-85" type="submit" value="Login" />
                            </div>
                        </form>
                        {/* Media login */}
                        <div className="text-center mb-10 mt-5">
                            <p className="divider text-myText-default italic">Login with</p>
                            <button 
                            onClick={()=> handleMedia('google')}
                            className="btn bg-transparent text-myPurple border-none hover:bg-transparent hover:text-myText-dark text-4xl
                            dark:hover:text-myYellow dark:text-myText-light
                            ">
                                <FaGoogle />
                            </button>
                            <button 
                            onClick={()=> handleMedia('gitHub')}
                            className="btn bg-transparent text-myPurple border-none hover:bg-transparent hover:text-myText-dark text-4xl
                            dark:hover:text-myYellow dark:text-myText-light
                            ">
                                <FaGithub />
                            </button>
                        </div>
                        <div className="divider text-myText-default italic">If you don't have an account, Don't be late</div>
                        <div className="text-center text-base">
                            <Link to="/register" className="text-myText-default hover:underline hover:text-myText-dark dark:text-myColor-dark dark:hover:text-myColor-default">I want to join you / Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;