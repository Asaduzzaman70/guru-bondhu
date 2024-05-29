import { TypeAnimation } from 'react-type-animation';
import imgBanner from '../../../assets/images/banner.svg'
import 'animate.css';
import '../Banner/Banner.css';

const Banner = () => {
    return (
        <div className="container mx-auto my-40" id='home'>
            <div className='flex flex-col-reverse lg:flex-row my-9 md:my-16 lg:my-28 justify-center items-center'>
                <div className='lg:w-2/3 lg:px-28 text-center lg:text-left'>
                    <h1 className='font-poetsen text-6xl lg:text-8xl text-myPurple dark:text-myYellow animate__animated animate__fadeInUp mb-8'>
                        <span className='text-myYellow dark:text-myPurple'>Guru Bondhu -</span> <br />
                        Where Study <br className='md:hidden' />
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed once, initially
                                'Meets Fun!',
                                1000,
                            ]}
                            speed={250}
                            wrapper="h1"
                            cursor={false}
                            className='font-poetsen lg:text-8xl text-myPurple dark:text-myYellow type md:inline-block'
                        />
                    </h1>
                    <p data-aos="fade-up" data-aos-duration="3000">
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed once, initially
                                'Supercharge your study sessions with Guru Bondhu! Effortlessly create, submit, and grade assignments while having a blast. Dive into a collaborative adventure with secure access, a sleek design, and fun theme customizations. Transform your group study into a powerhouse of productivity and laughs!',
                                1000,
                            ]}
                            speed={100}
                            className='text-sm lg:text-base text-myText-default dark:text-myText-light mt-8'
                        />
                    </p>
                </div>
                <div className='lg:w-2/6 lg:pr-10'>
                    <img data-aos="fade-up" className='w-full' src={imgBanner} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;