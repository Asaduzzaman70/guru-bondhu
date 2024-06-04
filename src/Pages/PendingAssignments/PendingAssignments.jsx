import { useLoaderData } from "react-router-dom";
import PendingCard from "./PendingCard";
import { useState } from "react";

const PendingAssignments = () => {
    const data = useLoaderData();
    const [pendingData, setPendingData] = useState(data);
    console.log('I am Pending', pendingData);



    return (
        <div className="container mx-auto my-20">
            <div>
                <h1 className="text-4xl text-center font-poetsen text-myPurple dark:text-myYellow tracking-wider mb-10">Pending Assignments</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {
                    pendingData.map(data => <PendingCard key={data._id} data={data} setPendingData={setPendingData} pendingData={pendingData} />)
                }
            </div>
        </div>
    );
};

export default PendingAssignments;