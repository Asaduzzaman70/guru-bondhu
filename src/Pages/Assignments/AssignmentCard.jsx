import React from 'react';
import { Link } from 'react-router-dom';

const AssignmentCard = ({ singleData, handleDelete, loader, user }) => {
    const { title, marks, photoUrl, diffLevel, _id, emailGitHubId } = singleData;

    return (
        <div className="p-6 bg-myColor-default dark:bg-base-200 rounded-xl h-full shadow-lg" data-aos="fade-up">
            <div className="bg-no-repeat bg-cover bg-center h-96 rounded-lg" style={{ backgroundImage: `URL(${photoUrl})` }}></div>
            <h1 className="text-2xl text-myPurple dark:text-myYellow font-poetsen mt-12">{title}</h1>
            <div className="my-7 flex justify-between">
                <div className="flex items-center space-x-3">
                    <h1 className="text-xl text-myPurple dark:text-myYellow font-light">Level :</h1>
                    <p className="text-xl text-myPurple dark:text-myYellow font-light text-justify">
                        {
                            diffLevel
                        }
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <h1 className="text-xl text-myPurple dark:text-myYellow font-light">Marks:</h1>
                    <p className="text-xl text-myPurple dark:text-myYellow font-light text-justify">
                        {
                            marks
                        }
                    </p>
                </div>
            </div>
            <div className='space-x-3'>
                {/* {
                    user ? user.uid === emailGitHubId ?
                        <>
                            <button
                                onClick={() => handleDelete(_id)}
                                className='uppercase btn bg-red-800 text-myText-light border-white dark:border-base-200 tracking-widest text-base'>
                                delete
                            </button>
                        </>
                        : ''
                        : ''
                } */}
                <button
                    onClick={() => handleDelete(_id, emailGitHubId)}
                    className='uppercase btn bg-red-800 text-myText-light border-white dark:border-base-200 tracking-widest text-base'>
                    delete
                </button>
                <Link to={`/update/${_id}`}>
                    <button
                        className='btn uppercase bg-green-800 text-myText-light border-white dark:border-base-200 tracking-widest text-base'>
                        update
                    </button>
                </Link>
                <Link to={`/viewDetails/${_id}`}>
                    <button
                        className='uppercase btn bg-myColor-dark text-myText-light border-myText-default dark:border-base-200 tracking-widest text-base'>
                        view
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AssignmentCard;