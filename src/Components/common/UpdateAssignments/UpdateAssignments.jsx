import axios from "axios";
import React, { useState, forwardRef, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import { CreateContext } from "../../../contexts/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateAssignments = () => {
    const { user } = useContext(CreateContext);
    const singleAssignment = useLoaderData();
    const navigate = useNavigate();

    // Ensure dueDate is a Date object
    const initializeFormData = (data) => ({
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
    });

    const [formData, setFormData] = useState(initializeFormData(singleAssignment));

    useEffect(() => {
        setFormData(initializeFormData(singleAssignment));
    }, [singleAssignment]);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="bg-myColor-default dark:bg-base-200 text-xl capitalize text-myText-dark dark:text-myText-light w-full py-4 px-4 rounded-xl" onClick={onClick} ref={ref}>
            {value}
        </div>
    ));

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMarksChange = (event) => {
        const value = event.target.value;
        if (value >= 0 && value <= 60) {
            setFormData(prevData => ({
                ...prevData,
                marks: value,
            }));
        }
    };

    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            dueDate: date,
        }));
    };

    const handleCreateAssignment = e => {
        e.preventDefault();
        const form = formData;
        const emailGitHubId = user?.uid;
        const name = user?.displayName;

        swal({
            title: "Are you sure to Update this assignments?",
            text: "Clicked okay then update this assignments",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.put(`http://localhost:5000/assignments?_id=${singleAssignment._id}`, { formData })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.acknowledged) {
                                swal("Your Assignments Is Updated", {
                                    icon: "success",
                                });
                                navigate('/assignments');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    swal("Your Input field is safe!");
                }
            });
    }

    return (
        <div className="container mx-auto my-28">
            <div>
                <div className="text-center space-y-6">
                    <h3 className="text-4xl font-poetsen text-myPurple dark:text-myYellow animate__animated animate__fadeInUp">Update Assignment</h3>
                    <p className="text-xl text-myText-default font-light px-6 lg:px-0 lg:w-3/5 mx-auto animate__animated animate__fadeInUp">
                        Easily update existing assignments with our intuitive form. Modify titles, descriptions, due dates, and other details to keep your group projects current and organized efficiently.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 px-5 mt-9 lg:mt-24 gap-8" data-aos="fade-up">
                <div>
                    <form onSubmit={handleCreateAssignment} className="space-y-8">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Title :</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Assignment Title"
                                className="input input-bordered bg-myColor-default dark:bg-base-200 text-xl capitalize text-myText-dark dark:text-myText-light py-7 px-6"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Description :</span>
                            </label>
                            <textarea
                                placeholder="Enter Assignment Description"
                                className="h-80 input-bordered bg-myColor-default dark:bg-base-200 text-xl text-myText-dark dark:text-myText-light px-6 pt-5 rounded-xl"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Marks :</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter Assignment Marks"
                                className="input input-bordered bg-myColor-default dark:bg-base-200 text-xl capitalize text-myText-dark dark:text-myText-light py-7 px-6"
                                min="0"
                                max="60"
                                value={formData.marks}
                                onChange={handleMarksChange}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Difficulty Level :</span>
                            </label>
                            <select
                                className="select select-bordered bg-myColor-default dark:bg-base-200 text-xl capitalize text-myText-dark dark:text-myText-light px-6"
                                name="diffLevel"
                                value={formData.diffLevel}
                                onChange={handleInputChange}
                            >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-2xl text-myPurple dark:text-myYellow font-bold">Photo URL :</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Assignment Photo URL"
                                className="input input-bordered bg-myColor-default dark:bg-base-200 text-xl text-myText-dark dark:text-myText-light py-7 px-6"
                                name="photoUrl"
                                value={formData.photoUrl}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-control mt-12 mb-6">
                            <input className="input input-bordered bg-myYellow text-myPurple font-bold uppercase tracking-wider text-xl btn hover:opacity-85 dark:bg-myPurple dark:text-myYellow dark:hover:opacity-85" type="submit" value="Update" />
                        </div>
                    </form>
                </div>
                <div className="p-8 bg-myColor-default dark:bg-base-200 rounded-xl" data-aos="fade-up">
                    <div className="bg-no-repeat bg-cover bg-center h-96 rounded-lg" style={{ backgroundImage: `URL(${formData.photoUrl.length !== 0 ? formData.photoUrl : 'https://i.ibb.co/Zx9bTkt/logo-2.png'})` }}></div>
                    <h1 className="text-5xl text-myPurple dark:text-myYellow font-poetsen mt-12">{formData.title.length !== 0 ? formData.title :
                        <p className="text-myText-default font-poetsen">
                            Assignment Title
                        </p>}
                    </h1>
                    <p className="text-xl text-myText-default font-light mt-6 text-justify">
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
                                formData.dueDate ?
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

export default UpdateAssignments;
