import bgFeat from '../../../assets/images/feature_bg.svg'
import feat1 from '../../../assets/images/feat-1.svg'
import feat2 from '../../../assets/images/secure-payment.svg'
import feat3 from '../../../assets/images/on-time-results.svg'
import feat4 from '../../../assets/images/customer-care.svg'

const Feature = () => {
    const title1 = 'Unmatched quality';
    const des1 = 'We always provide high-quality original papers to your requirements';

    const title2 = 'Secure payment';
    const des2 = 'No prepayment! Release the money only after you approve the order';

    const title3 = 'On-time Results';
    const des3 = 'Your paper will be delivered with the smallest time frames';

    const title4 = 'Customer Care';
    const des4 = 'Our 24/7 friendly customer support team is always there to answer your questions';

    const feature = (img, title, des) => {
        return (
            < div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6 text-center md:text-left' >
                <div className='mx-auto md:mx-0'>
                    <img className='w-52 md:w-full' src={img} alt="" />
                </div>
                <div>
                    <h2 className='text-2xl text-base-300 font-poetsen mb-6'>{title}</h2>
                    <p className='text-lg text-base-100 font-light'>
                        {des}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className=' my-24'>
            <div className='hidden dark:inline'>
                <h1 className='font-poetsen text-5xl text-center text-myPurple dark:text-myYellow animate__animated animate__fadeInUp uppercase drop-shadow-2xl'>Discover Our Key Features</h1>
            </div>
            <div className='bg-no-repeat bg-cover py-24 dark:py-12 bg-center dark:my-0' style={{ backgroundImage: `URL(${bgFeat})` }} data-aos="fade-up" data-aos-duration="2000">
                <div className='container mx-auto my-6'>
                    <div className='dark:hidden'>
                        <h1 className='font-poetsen text-5xl text-center text-myPurple dark:text-myYellow animate__animated animate__fadeInUp uppercase mb-12 drop-shadow-2xl'>Discover Our Key Features</h1>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 px-11 lg:px-56 gap-20'>
                        {/* Card 1 */}
                        {feature(feat1, title1, des1)}
                        {feature(feat2, title2, des2)}
                        {feature(feat3, title3, des3)}
                        {feature(feat4, title4, des4)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;