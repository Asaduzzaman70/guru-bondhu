import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CreateContext } from "../../../contexts/AuthProvider";
import swal from "sweetalert";

const Register = () => {
    const { register, namePhotoUrl } = useContext(CreateContext);
    const [showPass, setShowPass] = useState(true);
    const navigate = useNavigate();

    // handleSubmit
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        if (password.length < 6) {
            return swal("Password Must Be 6 Characters", "Your password must be 6 characters or more!", "warning");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return swal("One Special Character Required", "Your password must contain at least one special character!", "warning");
        }

        const user = { name, email, photoURL, password };
        console.log(user);

        // Login method with password and email
        register(email, password)
            .then(() => {
                namePhotoUrl(name, photoURL)
                    .then((result) => {
                        console.log(result);
                        // Save user information in the database
                        const emailAndUid = { email };
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(emailAndUid)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log('User Information', data);
                                if (data.insertedId) {
                                    swal("Registration Successful", "Welcome To Our Community", "success");
                                    navigate('/');
                                }
                            });
                    })
                    .catch(() => {
                        swal("Error", "Please recheck your name and photo URL.", "warning");
                    });
            })
            .catch(() => {
                swal("Error", "This email is already registered.", "error");
            });
    };

    return (
        <div className="">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="w-full">
                        <img className="w-full" src="https://i.ibb.co/vx5T4K6/logo-4.png" alt="Logo" />
                    </div>
                    <div className="card-body p-10 lg:p-20">
                        <h1 className="text-5xl font-poetsen text-myYellow dark:text-myPurple mb-6">Register Now</h1>
                        <form onSubmit={handleRegister} className="h-full">
                            <div className="form-control mb-6">
                                <input type="text" name="name" placeholder="Type Your Name" className="input input-bordered bg-myColor-default text-myText-dark font-medium tracking-wider capitalize text-xl py-7 dark:bg-base-200 dark:text-myColor-light" required />
                            </div>
                            <div className="form-control mb-6">
                                <input type="text" name="photoURL" placeholder="Your Photo URL" className="input input-bordered bg-myColor-default text-myText-dark font-medium tracking-wider text-xl py-7 dark:bg-base-200 dark:text-myColor-light" required />
                            </div>
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
                                <input className="input input-bordered bg-myYellow text-myPurple font-bold uppercase tracking-wider text-xl btn hover:opacity-85 dark:bg-myPurple dark:text-myYellow dark:hover:opacity-85" type="submit" value="Join Us" />
                            </div>
                        </form>
                        <div className="divider text-myText-default italic">If you already joined us, please log in.</div>
                        <div className="text-center text-base">
                            <Link to="/login" className="text-myText-default hover:underline hover:text-myText-dark dark:text-myColor-dark dark:hover:text-myColor-default">I'm Back / Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;