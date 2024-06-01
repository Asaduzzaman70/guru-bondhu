import { Link, useLoaderData } from "react-router-dom";
import TakeSubmition from "../TakeSubmition/TakeSubmition";

const ViewAssignments = () => {
    const formData = useLoaderData();
    
    console.log(formData);
    return (
        <div className="container mx-auto p-6 md:p-0">
            <div className="p-8 bg-myColor-default dark:bg-base-200 rounded-xl w-full md:w-4/5 lg:w-3/4 mx-auto my-12" data-aos="fade-up">
                <div className="bg-no-repeat bg-cover bg-center h-96 md:h-[500px] rounded-lg" style={{ backgroundImage: `URL(${formData.photoUrl})` }}></div>
                <h1 className="text-5xl text-myPurple dark:text-myYellow font-poetsen mt-12">{formData.title}
                </h1>
                <p className="text-xl text-myText-default font-light mt-6 text-justify">
                    {
                        formData.description
                    }
                </p>
                <div className="my-7">
                    <div className="flex items-center space-x-3 mb-6">
                        <h1 className="text-2xl text-myPurple dark:text-myYellow font-bold">Level :</h1>
                        <p className="text-2xl text-myPurple dark:text-myYellow font-light text-justify">
                            {
                                formData.diffLevel
                            }
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <h1 className="text-2xl text-myPurple dark:text-myYellow font-bold">Marks:</h1>
                        <p className="text-2xl text-myPurple dark:text-myYellow font-light text-justify">
                            {
                                formData.marks
                            }
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 my-7">
                    <h1 className="text-2xl text-myPurple dark:text-myYellow font-bold">Assignment Date:</h1>
                    <div className="text-2xl text-myPurple dark:text-myYellow font-light text-justify">
                        <p className="text-myText-default">
                            {new Date(formData.dueDate).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
                <div>
                    <TakeSubmition key={formData._id} attemptId={formData._id} formData={formData}/>
                </div>
            </div>
        </div>
    );
};

export default ViewAssignments;