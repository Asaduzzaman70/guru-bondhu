import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { CreateContext } from '../../contexts/AuthProvider';

const MySubmission = () => {
    // const mySubmittedData = useLoaderData();
    // console.log(mySubmittedData);

    const { user } = useContext(CreateContext);
    const [mySubmittedData, setMySubmittedData] = useState([]);
    const axiosSecure = useAxiosSecure();
    console.log(mySubmittedData);
    // const url = `https://car-doctor-server-main-five.vercel.app/bookings?email=${user?.email}`;
    const url = `/submitDoc?userUid=${user.uid}`;
    useEffect(() => {
        // fetch(url, { credentials: 'include' })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('MEeeeeeeeeeeeee',data);
        //         setBookings(data)
        //     })
        axiosSecure.get(url)
            .then(res => { setMySubmittedData(res.data) })

    }, [url, axiosSecure]);

    const tableData = (_id, title, status, marks, obtainedMarks, photoURL, displayName, feedBack) => {
        return (
            <tr key={_id} className='text-myText-dark dark:text-myColor-light'>
                <td className='text-myPurple dark:text-myYellow text-base font-semibold'>
                    {title}
                </td>
                <td className={`text-center ${status === 'Pending' ? 'text-red-900 dark:text-red-500' : 'text-green-900'} font-bold`}>{status}</td>
                <td className='text-center'>{marks}</td>
                <td className='text-center'>{obtainedMarks}</td>
                <td>
                    {
                        photoURL || displayName ?
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={photoURL} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{displayName}</div>
                                </div>
                            </div>
                            : <div className='w-12 h-12'></div>
                    }
                </td>
                <td>
                    {feedBack}
                </td>
            </tr>
        )
    }

    return (
        <div className={`container mx-auto my-20 ${mySubmittedData.length === 0 ? 'h-screen' : ''}`}>
            <div className='text-center text-4xl mb-16 font-poetsen text-myPurple dark:text-myYellow'>
                <h1>Your Submitted Assignments</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-xl text-myPurple dark:text-myYellow'>
                            <th>Assignments Title</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Marks</th>
                            <th className='text-center'>Obtained Marks</th>
                            <th>Examiners</th>
                            <th className='text-center'>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {
                            mySubmittedData.map(myAssignment => tableData(
                                myAssignment._id,
                                myAssignment.title,
                                myAssignment.status,
                                myAssignment.marks,
                                myAssignment.obtainedMarks ? myAssignment.obtainedMarks : '0',
                                myAssignment.examinerPhotoUrl ? myAssignment.examinerPhotoUrl : '',
                                myAssignment.examinerDisplayName ? myAssignment.examinerDisplayName : '',
                                myAssignment.feedBack ? myAssignment.feedBack : ''
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MySubmission;