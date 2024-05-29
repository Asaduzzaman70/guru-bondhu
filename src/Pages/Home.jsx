import Banner from "../Components/home/Banner/Banner";
import Faq from "../Components/home/Faq/Faq";
import Feature from "../Components/home/Feature/Feature";
import { useQuery } from "@tanstack/react-query";


const Home = () => {
    const { isPending, isError, error, data } = useQuery({
        queryKey: ['faq_info'],
        queryFn: () =>
            fetch('http://localhost:5000/faq_info').then((res) =>
                res.json(),
            ),
    })

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars w-20 bg-myYellow dark:bg-myPurple"></span>
            </div>
        );
    }

    return (
        <>
            <Banner />
            <Feature />
            <Faq key={data._id} data={data} />
        </>
    );
};

export default Home;