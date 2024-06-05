import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaRegWindowClose } from 'react-icons/fa';
import { useContext } from 'react';
import swal from 'sweetalert';
import { CreateContext } from '../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    maxHeight: '90vh',
    overflow: 'auto',
};

const GiveMarks = ({ documents, marks, quickNote, examinerPhotoUrl, examinerDisplayName, attemptId, userId, pendingData, setPendingData, _id }) => {
    const { user } = useContext(CreateContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleMyClose = () => setOpen(false);

    // const { title, marks, photoUrl } = formData;

    const handleSubmitAssignments = async (e) => {
        e.preventDefault();
        const form = e.target;
        const obtainedMarks = form.obtainedMarks.value;
        const feedBack = form.feedBack.value;
        const status = 'Complete'
        const submitAssignmentData = { obtainedMarks, feedBack, examinerPhotoUrl, examinerDisplayName, status };
        console.log(submitAssignmentData);

        // Implement the submission logic here
        // Example: sending data to the backend
        try {
            const response = await fetch(`https://guru-bondhu-server.vercel.app/submitDoc?attemptId=${attemptId}&&userId=${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitAssignmentData),
            });
            if (response.ok) {
                // Handle successful submission
                swal({
                    title: "You Assignments Is Submitted",
                    text: "Congratulations to attempt this assignments",
                    icon: "success",
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            setOpen(false);
                            // setPendingData
                            const remaining = pendingData.filter(dataPen => dataPen._id !== _id);
                            setPendingData(remaining);
                        }
                    })
            } else {
                // Handle submission error
                // alert('Failed to submit assignment.');
                const result = await response.json();
                swal({
                    title: "Failed to submit assignment.",
                    text: result.error || "Unknown error.",
                    icon: "warning",
                });
            }
        } catch (error) {
            // Handle network error
            // console.error('Error submitting assignment:', error);
            // alert('An error occurred. Please try again.');
            swal({
                title: "An error occurred. Please try again.",
                text: `Error submitting assignment: ${error}`,
                icon: "warning",
            })
        }
    };

    return (
        <div>
            <button onClick={handleOpen} className='uppercase btn bg-myColor-dark text-myText-light border-myText-default dark:border-base-200 tracking-widest text-base'>Give Marks</button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='bg-myColor-light dark:bg-myDark-default rounded-md py-3 px-7 w-screen md:w-[650px] lg:w-[900px]'>
                        <div className='text-right'>
                            <button onClick={handleMyClose} className='text-4xl hover:text-myPurple hover:dark:text-myYellow'><FaRegWindowClose /></button>
                        </div>
                        <div>
                            <h1>
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold"> PDF/doc Link :</span>
                            </h1>
                            <Link className='break-words dark:text-myText-default' target='_blank' to={`${documents}`}>{documents}</Link>
                            <br />
                            <code className='text-myPurple dark:text-myYellow font-bold'>PDF Preview:-</code>
                            <iframe className='p-2 rounded-xl bg-myPurple dark:bg-myYellow mt-2' src={documents} width='100%' height='500px' />
                            <p className='dark:text-myText-default mt-4'>
                                <span className='text-myPurple dark:text-myYellow font-bold'>Examinee Message: - </span>{quickNote}
                            </p>
                        </div>
                        <form onSubmit={handleSubmitAssignments} className='flex flex-col'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Give Marks : 0 - {marks}</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter Assignment Marks"
                                    className="input input-bordered bg-myColor-default dark:bg-myDark-light text-xl capitalize text-myText-dark dark:text-myText-light py-7 px-6"
                                    min="0"
                                    max={marks}
                                    name='obtainedMarks'
                                    // onChange={handleMarksChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Quick Note :</span>
                                </label>
                                <textarea
                                    placeholder="Enter Your Message"
                                    className="h-40 input-bordered bg-myColor-default dark:bg-myDark-light text-xl text-myText-dark dark:text-myText-light px-6 pt-5 rounded-xl"
                                    name="feedBack"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6 mb-6">
                                <input className="input input-bordered mx-auto bg-myYellow text-myPurple font-bold uppercase tracking-wider text-xl btn hover:opacity-85 dark:bg-myPurple dark:text-myYellow dark:hover:opacity-85 inline-block" type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}


export default GiveMarks;