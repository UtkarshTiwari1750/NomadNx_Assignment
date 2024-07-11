import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEyeSlash, HiMiniEye } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../firebase/Auth';
import { setLoading, setToken, setUser } from '../slices/authSlice';
import {toast} from "react-hot-toast";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

const SignupForm = ({Heading}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmitHandle = async(data) => {
        try{
            console.log("SIGNUP FORM DATA BEFORE...", data);
            dispatch(setLoading(true));
            const response = await createUserWithEmailAndPassword(auth, data?.email, data?.password, {displayName: data?.firstName + " " + data?.lastName});
            await sendEmailVerification(auth.currentUser);
            const user = {
                token: response.user.accessToken,
                email: response.user.email,
            }
            sessionStorage.setItem("user", JSON.stringify(user));
            toast.success("Email Verification Link Sent to your Email Address");
            dispatch(setUser(data));
            dispatch(setLoading(false));
        }
        catch(error) {
            console.log("Signup Error", error.message);
            if(error.message === "Firebase: Error (auth/invalid-email).") {
                toast.error("Invalid Email");
            }
            if(error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                toast.error("Password should have at least 6 characters");
            }
            if(error.message === "Firebase: Error (auth/email-already-in-use).") {
                toast.error("Email already in use");
            }
            dispatch(setLoading(false));
        }
    }

  return (
    <div className='grid min-h-[calc(100vh - 3.5rem)] place-items-center'>
        {
            loading 
            ? (
                <div className=''>
                    <div className='spinner'></div>
                </div>
            ) 
            : (
                <div className='flex flex-col gap-y-6 '>
                    
                    <h2 className='text-3xl lg:text-4xl font-bold text-wrap '>
                        {Heading}
                    </h2>
            
                    <form
                    className="flex flex-col gap-7"
                    onSubmit={handleSubmit(onSubmitHandle)}
                    >
            
                        <div className='relative'>
                            <input 
                                type="email" 
                                id='email'
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                {...register("email", {required: true})}
                            />
                            <label htmlFor="email"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                                dark:bg-neonBlack px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                                rtl:peer-focus:left-auto start-1"
                            >
                                Email <sup>*</sup>
                            </label>
                            
                            {errors.email && (
                                <span className='text-red-500 text-xs absolute'>
                                    Email is required
                                </span>
                            )}
                        </div>
            
                        <div className='relative'>
                            <input 
                                type={showPassword ? "text" : "password"}
                                id='password' 
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                {...register("password", {required: true})}
                            />
                            <label htmlFor="password"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                                dark:bg-neonBlack px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                                rtl:peer-focus:left-auto start-1"
                            >
                                Password <sup>*</sup>
                            </label>
                            <div 
                                className='text-gray-300 absolute cursor-pointer right-5 text-2xl bottom-2'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? (<HiMiniEye />) : (<HiEyeSlash />) }
                            </div>
                            {errors.password && (
                                <span className='text-red-500 text-xs absolute'>
                                    Password is required
                                </span>
                            )}
                        </div>
            
                        <div className='relative'>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                id='confirmPassword'
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg 
                                border border-gray-300 appearance-none dark:text-black dark:border-gray-600 
                                dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                {...register("confirmPassword", {required: true})}
                            />
                            <label htmlFor="confirmPassword"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform 
                                -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white bg-transparent 
                                dark:bg-neonBlack px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                                peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 
                                rtl:peer-focus:left-auto start-1"
                            >
                                Confirm Password <sup>*</sup>
                            </label>
                            <div 
                                className='text-gray-300 absolute cursor-pointer right-5 text-2xl bottom-2'
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? (<HiMiniEye />) : (<HiEyeSlash />) }
                            </div>
                            {errors.confirmPassword && (
                                <span className='text-red-500 text-xs absolute'>
                                    Confirm Password is required
                                </span>
                            )}
                        </div>
                        
                        <div>
                            <button type="submit" 
                                className="bg-purple-600 text-white py-2 px-4 rounded-lg font-bold font-Lato mt-3 w-full hover:bg-opacity-95 hover:scale-95 transition-all duration-300"
                            >
                                Sign Up
                            </button>
                            <button onClick={() => navigate('/login')} 
                                className="text-gray-500 py-2 px-4 rounded-lg font-bold font-Lato mt-3 w-full hover:bg-opacity-95 hover:scale-95 transition-all duration-300"
                            >
                                Alread have an account? {" "}
                                <span 
                                    className='text-blue-700 font-bold hover:underline transition-all duration-200'
                                >
                                    Login
                                </span>
                            </button>
                        </div>
                    </form>
            
                </div>
            )
        }
    </div>

  );
}

export default SignupForm;
