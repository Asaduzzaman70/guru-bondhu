import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CreateContext } from "../../../contexts/AuthProvider";
import { MdOutlineAlternateEmail, MdPhone } from "react-icons/md";

const Footer = () => {
    const { user } = useContext(CreateContext);
    const userUid = user?.uid;
    return (
        <div className="bg-myColor-default dark:bg-myDark-light shadow-success">
            <footer className="footer p-10 text-base-content container mx-auto">
                <aside>
                    <Link to={'/'} className="h-full">
                        <img className='w-72' src="https://i.ibb.co/7pGqnFb/logo-3.png" alt="" />
                    </Link>
                    <p className="text-myText-default text-lg">
                        <a href="https://www.programming-hero.com/" className="hover:underline" target="_blank" rel="noopener noreferrer">
                            Programming Hero LTD
                        </a>
                        <br />by Asaduzzaman Hisam
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title text-2xl text-myText-dark dark:text-myText-light">Services</h6>
                    <a className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" href="#home">Home</a>
                    <a className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" href="#feature">Discover Our Key Features</a>
                    <a className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" href="#faq">FAQ</a>
                    <NavLink className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" to={'/'}>Home</NavLink>
                    <NavLink className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" to={'/assignments'}>Assignments</NavLink>
                    <NavLink className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" to={'/createAssignments'}>Create Assignments</NavLink>
                    <NavLink className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" to={`/myAssignments`}>My Assignments</NavLink>
                    <NavLink className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" to={`/submittedAssignments`}>Submitted Assignments</NavLink>
                </nav>
                <nav>
                    <h6 className="footer-title text-2xl text-myText-dark dark:text-myText-light">Participate with us</h6>
                    <Link className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" to={'/login'}>Login</Link>
                    <Link className="text-xl text-myText-dark dark:text-myText-light hover:text-myPurple dark:hover:text-myYellow" to={'/register'}>Register</Link>
                </nav>
                <nav>
                    <h6 className="footer-title text-2xl text-myText-dark dark:text-myText-light">Customs</h6>
                    <p className="flex items-center text-base space-x-2 text-myText-default dark:text-myText-light"><MdOutlineAlternateEmail/> <span>guru_bondhu@gmail.com</span></p>
                    <p className="flex items-center text-base space-x-2 text-myText-default dark:text-myText-light"><MdPhone/> <span>+8815075*****</span></p>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;