import imgSide from '../../../assets/images/customer-care-1.svg'

const Faq = ({ data }) => {

    const faq_Tag = (question, answer) => {
        return (
            <div tabIndex={0} className="collapse collapse-arrow border border-myPurple dark:border-myYellow animate__animated animate__fadeInUp">
                <div className="collapse-title text-xl font-medium text-myPurple dark:text-myYellow">
                    {question}
                </div>
                <div className="collapse-content">
                    <p className='text-myText-dark dark:text-myText-light'>{answer}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-40" data-aos="fade-up" data-aos-duration="2000" id='faq'>
            <div className='flex flex-col-reverse md:flex-col lg:flex-row-reverse gap-12 px-6'>
                <div className='px-16 lg:w-3/5'>
                    <h1 className="font-poetsen text-5xl text-right text-myPurple dark:text-myYellow animate__animated animate__fadeInUp uppercase drop-shadow-2xl">FAQ</h1>
                    <div className='space-y-4 mt-12'>
                        {
                            data.map(faq => <div key={faq._id}>{faq_Tag(faq.question, faq.answer)}</div>)
                        }
                    </div>
                </div>
                <div className='space-y-6'>
                    <img src={imgSide} alt="" />
                    <h3 className='text-4xl font-poetsen text-myPurple dark:text-myYellow text-center'>
                        Any questions left? <br />You must not hesitate. <br />
                        <span className='text-myYellow dark:text-myColor-dark'>
                            Just contact us!
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Faq;