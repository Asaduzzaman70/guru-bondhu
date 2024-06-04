import { useLoaderData } from "react-router-dom";
import PendingCard from "./PendingCard";
import { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../contexts/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PendingAssignments = () => {
    // const data = useLoaderData();
    const [pendingData, setPendingData] = useState([]);
    console.log('I am Pending', pendingData);

    const { user } = useContext(CreateContext);
    const [mySubmittedData, setMySubmittedData] = useState([]);
    const axiosSecure = useAxiosSecure();
    console.log(mySubmittedData);
    // const url = `https://car-doctor-server-main-five.vercel.app/bookings?email=${user?.email}`;
    const url = `/submitDoc?statusPending=Pending&&userUid2=${user.uid}`;
    useEffect(() => {
        // fetch(url, { credentials: 'include' })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('MEeeeeeeeeeeeee',data);
        //         setBookings(data)
        //     })
        axiosSecure.get(url)
            .then(res => { setPendingData(res.data) })

    }, [url, axiosSecure]);



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