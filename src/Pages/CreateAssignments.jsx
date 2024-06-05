import axios from "axios";
import React, { useState, forwardRef, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateContext } from "../contexts/AuthProvider";
import swal from "sweetalert";

const CreateAssignments = () => {
    const { user } = useContext(CreateContext);


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        marks: '',
        diffLevel: 'Easy',
        dueDate: new Date(),
        photoUrl: ''
    });


    // Custom Date Picker Input
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="bg-myColor-default dark:bg-myDark-light text-xl capitalize text-myText-dark dark:text-myText-light w-full py-4 px-4 rounded-xl" onClick={onClick} ref={ref}>
            {value}
        </div>
    ));

    // Input Change Handler
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Marks Input Handler
    const handleMarksChange = (event) => {
        const value = event.target.value;
        if (value >= 0 && value <= 60) {
            setFormData(prevData => ({
                ...prevData,
                marks: value,
            }));
        }
    };

    // Date Picker Change Handler
    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            dueDate: date,
        }));
    };

    // For debugging purposes
    // console.log(formData.dueDate);

    const handleCreateAssignment = e => {
        e.preventDefault();
        const form = formData;
        // console.log('This is form', form);
        const emailGitHubId = user?.uid;
        const name = user?.displayName;
        // console.log(emailGitHubId);

        // POST Data - acknowledged
        swal({
            title: "Are you sure to create this assignments?",
            text: "Clicked okay then create this assignments",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.post('https://guru-bondhu-server.vercel.app/assignments', { ...form, emailGitHubId, name })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.acknowledged) {
                                swal("Your Assignments Is Created", {
                                    icon: "success",
                                });
                                // Reset Form
                                setFormData({
                                    title: '',
                                    description: '',
                                    marks: '',
                                    diffLevel: 'Easy',
                                    dueDate: new Date(),
                                    photoUrl: ''
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    swal("Your Input field is safe!");
                }
            });

        // axios.post('https://guru-bondhu-server.vercel.app/assignments', { ...form, emailGitHubId, name })
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }


    return (
        <div className="container mx-auto my-28">
            <div>
                <div className="text-center space-y-6">
                    <h3 className="text-4xl font-poetsen text-myPurple dark:text-myYellow animate__animated animate__fadeInUp">Create New Assignment</h3>
                    <p className="text-xl text-myText-default font-light px-6 lg:px-0 lg:w-3/5 mx-auto animate__animated animate__fadeInUp">
                        Easily create new assignments for your group with our intuitive form. Input the assignment details, set deadlines, and add any necessary resources. Collaborate with your study buddies and keep track of everyone's progress in one convenient place.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 px-5 mt-9 lg:mt-24 gap-8" data-aos="fade-up">
                {/* Form Section */}
                <div>
                    <form onSubmit={handleCreateAssignment} className="space-y-8">
                        {/* Title */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Title :</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Assignment Title"
                                className="input input-bordered bg-myColor-default dark:bg-myDark-light text-xl capitalize text-myText-dark dark:text-myText-light py-7 px-6"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Description :</span>
                            </label>
                            <textarea
                                placeholder="Enter Assignment Description"
                                className="h-80 input-bordered bg-myColor-default dark:bg-myDark-light text-xl text-myText-dark dark:text-myText-light px-6 pt-5 rounded-xl"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Marks */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Marks :</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter Assignment Marks"
                                className="input input-bordered bg-myColor-default dark:bg-myDark-light text-xl capitalize text-myText-dark dark:text-myText-light py-7 px-6"
                                min="0"
                                max="60"
                                value={formData.marks}
                                onChange={handleMarksChange}
                                required
                            />
                        </div>
                        {/* Difficulty Level */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Difficulty Level :</span>
                            </label>
                            <select
                                className="select select-bordered bg-myColor-default dark:bg-myDark-light text-xl capitalize text-myText-dark dark:text-myText-light px-6"
                                name="diffLevel"
                                value={formData.diffLevel}
                                onChange={handleInputChange}
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        {/* Due Date */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Due Date :</span>
                            </label>
                            <DatePicker
                                selected={formData.dueDate}
                                onChange={handleDateChange}
                                customInput={<ExampleCustomInput />}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full"
                            />
                        </div>
                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Photo URL :</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Assignment Photo URL"
                                className="input input-bordered bg-myColor-default dark:bg-myDark-light text-xl text-myText-dark dark:text-myText-light py-7 px-6"
                                name="photoUrl"
                                value={formData.photoUrl}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Submit Button */}
                        <div className="form-control mt-12 mb-6">
                            <input className="input input-bordered bg-myYellow text-myPurple font-bold uppercase tracking-wider text-xl btn hover:opacity-85 dark:bg-myPurple dark:text-myYellow dark:hover:opacity-85" type="submit" value="Create" />
                        </div>
                    </form>
                </div>
                {/* Another Section */}
                <div className="p-8 bg-myColor-default dark:bg-myDark-light rounded-xl" data-aos="fade-up">
                    <div className="bg-no-repeat bg-cover bg-center h-96 rounded-lg" style={{ backgroundImage: `URL(${formData.photoUrl.length !== 0 ? formData.photoUrl : 'https://i.ibb.co/Zx9bTkt/logo-2.png'})` }}></div>
                    <h1 className="text-5xl text-myPurple dark:text-myYellow font-poetsen mt-12 break-words">{formData.title.length !== 0 ? formData.title :
                        <p className="text-myText-default font-poetsen">
                            Assignment Title
                        </p>}
                    </h1>
                    <p className="text-xl text-myText-default font-light mt-6 text-justify break-words">
                        {
                            formData.description.length !== 0 ? formData.description
                                : <span className="text-myText-default">Assignment Description</span>
                        }
                    </p>
                    <div className="my-7">
                        <div className="flex items-center space-x-3 mb-6">
                            <h1 className="text-2xl text-myPurple dark:text-myYellow font-bold">Assignment Difficulty Level :</h1>
                            <p className="text-2xl text-myPurple dark:text-myYellow font-light text-justify">
                                {
                                    formData.diffLevel
                                }
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl text-myPurple dark:text-myYellow font-bold">Assignment Marks:</h1>
                            <p className="text-2xl text-myPurple dark:text-myYellow font-light text-justify">
                                {
                                    formData.marks.length !== 0 ? formData.marks
                                        : <span className="text-myText-default">
                                            00
                                        </span>
                                }
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 my-7">
                        <h1 className="text-2xl text-myPurple dark:text-myYellow font-bold">Assignment Created Date:</h1>
                        <div className="text-2xl text-myPurple dark:text-myYellow font-light text-justify">
                            {
                                formData.dueDate.length !== 0 ?
                                    (
                                        <p className="text-myText-default">
                                            {new Date(formData.dueDate).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    )
                                    : <p className="text-myText-default">
                                        MMMM d, yyyy h:mm aa
                                    </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignments;