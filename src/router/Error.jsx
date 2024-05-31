import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center flex-col'>
            <h1 className='text-6xl font-bold mb-8 uppercase'>Page Not Found!!</h1>
            <Link to={'/'}>
                <button className='btn text-2xl'>-Home-</button>
            </Link>
        </div>
    );
};

export default Error;