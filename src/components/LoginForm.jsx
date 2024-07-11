import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiEyeSlash, HiMiniEye } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../firebase/Auth';
import { setLoading, setToken, setUser } from '../slices/authSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
const LoginForm = ({Heading}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm()
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOnSubmit = async(data) => {
        try{
            const {email, password} = data;
            dispatch(setLoading(true));
            const response = await login(email, password);
            if(response?.user?.emailVerified === false){
                toast.error("Please verify your email to login");
                dispatch(setLoading(false));
                return;
            }
            const user = {
                token: response.user.accessToken,
                email: response.user.email,
            }
            
            // const res = await axios.post("http://localhost:5000/api/auth/login", user);
            
            sessionStorage.setItem("user", JSON.stringify(data));
            console.log("Response", response);
            toast.success("Login Successful");
            sessionStorage.setItem("token", response.user.accessToken);
            dispatch(setLoading(false));
            dispatch(setToken(response.user.accessToken));
            dispatch(setUser(user));
            navigate("/profile");
        }
        catch(error){
            console.log(error.message)
            if(error.message === "Firebase: Error (auth/invalid-credential)."){
                toast.error("Incorrect Email or Password");
                dispatch(setLoading(false));
            }
        }
    }    

  return (
    <div className='grid min-h-[calc(100vh - 3.5rem)] place-items-center'>
        {
            loading ? (
                <div>
                    <div className='spinner'></div>
                </div>
            )
            : (
                <div className='flex flex-col sm:items-start items-center gap-y-6 w-11/12'>
                    <div className='flex flex-col gap-y-1'>
                        <h2 className='text-4xl sm:text-left text-center font-bold text-wrap w-full'>
                            {Heading}
                        </h2>
                        <h3 className='text-gray-500'>
                            Welcome back! Login using your email and password
                        </h3>
                    </div>

                    <form
                        className="flex flex-col gap-7 w-full"
                        onSubmit={handleSubmit(handleOnSubmit)}
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

                        <div>
                            <button 
                                type="submit" 
                                className="bg-purple-600 text-white py-2 px-4 rounded-lg font-bold font-Lato mt-3 w-full hover:bg-opacity-95 hover:scale-95 transition-all duration-300"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="text-gray-500 py-2 px-4 rounded-lg font-semibold font-Lato mt-3 w-full"
                            >
                                Don't have an account? {" "}
                                <span className='text-blue-700 font-bold hover:underline transition-all duration-200'>
                                    Create an account
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

export default LoginForm;
