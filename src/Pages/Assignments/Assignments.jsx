import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AssignmentCard from './AssignmentCard';
import swal from 'sweetalert';
import { FaDownLong } from 'react-icons/fa6';
import { useContext } from "react";
import { CreateContext } from '../../contexts/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const Assignments = () => {
    const { user, loader } = useContext(CreateContext);
    const [level, setLevel] = useState('');
    const [assignment, setAssignment] = useState([]);
    const [leading, setLoading] = useState(false);


    const { assignmentsCount } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(6);
    const numberOfPages = Math.ceil(assignmentsCount / itemPerPage);

    // const pages = [];
    // for(let i = 0; i < numberOfPages; i++){
    //     pages.push(i);
    // }
    const pages = [...Array(numberOfPages).keys()]
    console.log(pages);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/assignments?diffLevel=${level}&page=${currentPage}&size=${itemPerPage}`, { withCredentials: true });
                // console.log(response.data);
                setAssignment(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [level, currentPage, itemPerPage]);


    if (leading || loader) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars w-20 bg-myYellow dark:bg-myPurple"></span>
            </div>
        );
    }

    // handleDelete
    const handleDelete = (_id, emailGitHubId, uid) => {
        if (user?.uid === emailGitHubId) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        fetch(`http://localhost:5000/assignments?deleteAssignments=${_id}&&userUid=${uid}`, {
                            method: 'DELETE',
                            credentials: 'include'
                        })
                            .then(res => res.json())
                            .then(data => {
                                // Handle response
                                // console.log(data);
                                if (data.deletedCount > 0) {
                                    swal("Poof! Your imaginary file has been deleted!", {
                                        icon: "success",
                                    });
                                    const remaining = assignment.filter(art => art._id !== _id);
                                    setAssignment(remaining);
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        } else {
            swal({
                title: "WARNING YOU",
                text: "It's not your property",
                icon: "warning",
                button: "My Apologies",
            });
        }
    }

    // console.log(assignment);

    const handleEasy = (arg) => {
        if (arg === 'Easy') {
            setLevel('Easy');
        }
        else if (arg === 'Medium') {
            setLevel('Medium');
        }
        else if (arg === 'Hard') {
            setLevel('Hard');
        }
        else if (arg === 'All') {
            setLevel('');
        }
    }

    const handleItemPerPage = (e) => {
        // console.log('The Item Page:-', e.target.value);
        const val = parseInt(e.target.value);
        setItemPerPage(val);
        setCurrentPage(0);
    }
    console.log('Pagination button', currentPage);


    return (
        <div className='container mx-auto my-24'>
            <div className='text-right'>
                <details className="dropdown dropdown-end">
                    <summary className="m-1 btn bg-myPurple dark:bg-myText-dark border-none dark:text-myYellow text-myText-light text-xl">Difficult Level <FaDownLong /></summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-myPurple dark:bg-myText-dark rounded-box w-52">
                        <li><button onClick={() => handleEasy('All')} className='btn bg-transparent border-none text-myText-light text-lg'>ALL</button></li>
                        <li><button onClick={() => handleEasy('Easy')} className='btn bg-transparent border-none text-myText-light text-lg'>Easy</button></li>
                        <li><button onClick={() => handleEasy('Medium')} className='btn bg-transparent border-none text-myText-light text-lg'>Medium</button></li>
                        <li><button onClick={() => handleEasy('Hard')} className='btn bg-transparent border-none text-myText-light text-lg'>Hard</button></li>
                    </ul>
                </details>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 md:px-0 mt-10'>
                {
                    assignment.map(singleData => <AssignmentCard
                        handleDelete={handleDelete}
                        key={singleData._id}
                        singleData={singleData}
                        user={user}
                        loader={loader}
                        setLoading={setLoading}
                    />)
                }
            </div>
            <div className={`space-x-6 text-center mt-12 ${level && 'hidden'} flex md:flex-row items-center justify-center`}>
                {/* <p>{currentPage}</p> */}
                <div className='space-x-2 flex flex-row items-center flex-wrap' data-aos="fade-up">
                    <button
                        className='btn text-myText-dark text-2xl border-myText-default hover:text-myColor-light bg-transparent'
                        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)}
                    >
                        <FaArrowAltCircleLeft />
                    </button>
                    {
                        pages.map(page => <button
                            key={page}
                            className={`btn btn-square text-myText-dark text-2xl border-myText-default hover:text-myColor-dark
                            ${currentPage === page ? 'bg-myPurple text-myText-light' : 'bg-transparent'}
                            `}
                            onClick={() => setCurrentPage(page)}
                        >{page}</button>)
                    }
                    <button
                        className='btn text-myText-dark text-2xl border-myText-default hover:text-myColor-light bg-transparent'
                        onClick={() => setCurrentPage(currentPage < pages.length - 1 ? currentPage + 1 : currentPage)}
                    >
                        <FaArrowAltCircleRight/>
                    </button>
                </div>
                <select value={itemPerPage} onChange={handleItemPerPage} data-aos="fade-up" className="btn bg-transparent text-myPurple text-2xl border-myYellow hover:text-myColor-dark">
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                </select>
            </div>
        </div>
    );
};

export default Assignments;
