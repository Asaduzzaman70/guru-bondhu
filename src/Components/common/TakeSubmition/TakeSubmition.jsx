import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaRegWindowClose } from 'react-icons/fa';
import { useContext } from 'react';
import { CreateContext } from '../../../../src/contexts/AuthProvider'; // Adjust the path if necessary
import swal from 'sweetalert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
};

const TakeSubmition = ({ attemptId, formData }) => {
    const { user } = useContext(CreateContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleMyClose = () => setOpen(false);

    const { title, marks, photoUrl } = formData;

    const convertToPreviewLink = (url) => {
        const fileIdMatch = url.match(/\/d\/(.+?)\//);
        if (fileIdMatch) {
            const fileId = fileIdMatch[1];
            return `https://drive.google.com/file/d/${fileId}/preview`;
        }
        return url;
    };

    const handleSubmitAssignments = async (e) => {
        e.preventDefault();
        const form = e.target;

        const documents = convertToPreviewLink(form.pdfLink.value);

        const quickNote = form.description.value;
        const userId = user?.uid;
        const status = 'Pending';
        const examineeName = user?.displayName;
        const submitAssignmentData = { examineeName, documents, quickNote, status, userId, attemptId, title, marks, photoUrl };
        console.log(submitAssignmentData);

        // Implement the submission logic here
        // Example: sending data to the backend
        try {
            const response = await fetch(`http://localhost:5000/submitDoc?attemptId=${attemptId}&&userId=${userId}`, {
                method: 'POST',
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
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            setOpen(false);
                        }
                    })
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
            <button onClick={handleOpen} className='uppercase btn bg-myColor-dark text-myText-light border-myText-default dark:border-base-200 tracking-widest text-base'>Take assignment”</button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='bg-myColor-light dark:bg-myDark-default rounded-md p-7 w-screen md:w-[650px] lg:w-[900px]'>
                        <div className='text-right'>
                            <button onClick={handleMyClose} className='text-4xl hover:text-myPurple dark:text-myText-light hover:dark:text-myYellow'><FaRegWindowClose /></button>
                        </div>
                        <form onSubmit={handleSubmitAssignments} className='flex flex-col'>
                            <div className="form-control">
                                <label className="flex flex-col mb-4">
                                    <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold"> PDF/doc Link Submission :</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="PDF/doc Link"
                                    className="input input-bordered bg-myColor-default dark:bg-myDark-light text-xl text-myText-dark dark:text-myText-light py-7 px-6"
                                    name="pdfLink"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Quick Note :</span>
                                </label>
                                <textarea
                                    placeholder="Enter Your Message"
                                    className="h-80 input-bordered bg-myColor-default dark:bg-myDark-light text-xl text-myText-dark dark:text-myText-light px-6 pt-5 rounded-xl"
                                    name="description"
                                    required
                                />
                            </div>
                            <div className="form-control mt-12 mb-6">
                                <input className="input input-bordered mx-auto bg-myYellow text-myPurple font-bold uppercase tracking-wider text-xl btn hover:opacity-85 dark:bg-myPurple dark:text-myYellow dark:hover:opacity-85 inline-block" type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}


export default TakeSubmition;