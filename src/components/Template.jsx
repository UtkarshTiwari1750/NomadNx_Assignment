import React from 'react'
import { useSelector } from 'react-redux';
// import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
const Template = ({formType, frameImg}) => {
    const {loading} = useSelector((state) => state.auth)

    return (
    <div className='grid min-h-[calc(98vh)] place-items-center'>
        {
            loading ?
            (<div className='spinner'></div>) :
            (
                <div className='w-full flex justify-between items-center gap-12 md:gap-y-0 mx-auto text-richblack-5 h-full'>
                    {/* Left
                    <div className='relative mx-auto w-11/12 max-w-[550px] md:mx-0 h-full'>
                        <img src={frameImg} alt="frameImg" loading='lazy'
                            className='w-full h-[90%] object-cover object-center rounded-lg shadow-lg'
                        />
                    </div> */}
                    
                    {/* Right */}
                    <div className='max-w-[450px] w-11/12 mx-auto'>
                        {formType === 'signup' ? (<SignupForm Heading="Create an Account" />) :(<LoginForm Heading="Login to your Account"/>)}
                    </div>

                    
                </div>
            )

        }
        
    </div>
  )
}

export default Template