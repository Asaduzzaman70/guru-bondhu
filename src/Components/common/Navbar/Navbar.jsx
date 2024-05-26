import React from 'react';
import DarkModeToggle from '../../../DarkModeToggle';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    console.log(location.pathname);
    const navLi = <>
        <li className={`${location?.pathname === '/' ? 'text-base-300 dark:text-myColor-dark' : ''} border-b-2 border-base-300 dark:border-myColor-dark lg:border-b-0`}>
            <NavLink to={'/'}>Home</NavLink>
        </li>
        <li className={`${location?.pathname === '/assignments' ? 'text-base-300 dark:text-myColor-dark' : ''} border-b-2 border-base-300 dark:border-myColor-dark lg:border-b-0`}>
            <NavLink to={'/assignments'}>Assignments</NavLink>
        </li>
        <li className={`${location?.pathname === '/createAssignments' ? 'text-base-300 dark:text-myColor-dark' : ''} border-b-2 border-base-300 dark:border-myColor-dark lg:border-b-0`}>
            <NavLink to={'/createAssignments'}>Create Assignments</NavLink>
        </li>
        <li className={`${location?.pathname === '/myAssignments' ? 'text-base-300 dark:text-myColor-dark' : ''} border-b-2 border-base-300 dark:border-myColor-dark lg:border-b-0`}>
            <NavLink to={'/myAssignments'}>My Assignments</NavLink>
        </li>
        <li className={`${location?.pathname === '/submittedAssignments' ? 'text-base-300 dark:text-myColor-dark' : ''} border-b-2 border-base-300 dark:border-myColor-dark lg:border-b-0`}>
            <NavLink to={'/submittedAssignments'}>Submitted Assignments</NavLink>
        </li>
    </>

    return (
        <div className='bg-myColor-default dark:bg-base-300 w-full shadow-lg'>
            <div className="navbar justify-between container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-myPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu bg-myColor-default dark:bg-base-300 dropdown-content mt-7 -ml-2 z-[1] text-2xl p-2 shadow rounded-md w-60 text-myPurple dark:text-myYellow font-bold uppercase">
                            {navLi}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost h-full text-xl text-black dark:text-white">
                        <img className='w-44' src="https://i.ibb.co/7pGqnFb/logo-3.png" alt="" />
                    </Link>
                </div>
                <div className="hidden lg:flex w-full">
                    <ul className="flex flex-wrap px-1 text-myPurple dark:text-myYellow font-bold uppercase space-x-4">
                        {navLi}
                    </ul>
                </div>
                <div className="space-x-3 mr-4">
                    <DarkModeToggle />
                    <div className='flex flex-col'>
                        <Link to={'/login'}>
                            <button className="
                        hover:text-base-300
                        dark:hover:text-myColor-dark text-myPurple dark:text-myYellow font-bold mb-1">Login</button>
                        </Link>
                        <span className='border-t-2 border-base-300 dark:border-gray-200' />
                        <Link to={'/register'}>
                            <button className="                        
                        hover:text-base-300
                        dark:hover:text-myColor-dark text-myPurple dark:text-myYellow font-bold mt-1">Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;