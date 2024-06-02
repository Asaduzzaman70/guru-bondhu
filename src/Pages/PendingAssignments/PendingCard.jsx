import { useContext } from "react";
import GiveMarks from "../../Components/common/GiveMarks/GiveMarks";
import { CreateContext } from "../../contexts/AuthProvider";

const PendingCard = ({ data, setPendingData, pendingData }) => {
    const {user} = useContext(CreateContext);
    const { examineeName, documents, quickNote, status, title, marks, photoUrl, _id, attemptId, userId } = data;
    return (
        <div className="p-6 bg-myColor-default dark:bg-myDark-light rounded-xl h-full shadow-lg flex flex-col lg:flex-row gap-8" data-aos="fade-up">
            <div className="bg-no-repeat bg-cover bg-center h-96 rounded-lg w-full lg:w-96" style={{ backgroundImage: `URL(${photoUrl})` }}></div>
            <div className="flex flex-col justify-around">
                <h1 className="text-2xl text-myPurple dark:text-myYellow font-poetsen mt-12">{title}</h1>
                <div className="my-7">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-xl text-myText-dark dark:text-myColor-light font-bold">Marks:-</h1>
                        <p className="text-xl text-myPurple dark:text-myYellow font-light text-justify">
                            {
                                marks
                            }
                        </p>
                    </div>
                    <div className="mt-3">
                        <h1 className="text-xl text-myText-dark dark:text-myColor-light font-bold">Examinee Name:-</h1>
                        <p className="text-lg text-myPurple dark:text-myYellow font-light">
                            {
                                examineeName
                            }
                        </p>
                    </div>
                </div>
                <div className="">
                    <GiveMarks key={_id} documents={documents} marks={marks} quickNote={quickNote} examinerPhotoUrl={user?.photoURL} examinerDisplayName={user?.displayName} attemptId={attemptId} userId={userId} pendingData={pendingData} setPendingData={setPendingData} _id={_id}/>
                </div>
            </div>
        </div>
    );
};

export default PendingCard;