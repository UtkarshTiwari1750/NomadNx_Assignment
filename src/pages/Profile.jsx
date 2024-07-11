import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { setLoading, setToken, setUser } from '../slices/authSlice';
import toast from 'react-hot-toast';

const Profile = () => {
  const {user, token, loading} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async() => {
    try{
      dispatch(setLoading(true));
      await auth.signOut();
      console.log("Logged out");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(setLoading(false));
      toast.success("Logged out successfully");
      navigate("/login");
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className='grid min-h-[calc(100vh)] h-full place-items-center'>
      {
        loading ? (
          <div>
            <div className='spinner'></div>
          </div>
        )
        : (
          <div className='flex flex-col items-center gap-y-2'>
            <h1 className='text-2xl font-semibold font-serif'>Profile</h1>
            <h2 className='text-lg'>
              Hi👋👋 {" "}
              <span className='text-blue-700 text-lg'>
                {user?.email}
              </span>
            </h2>
            <button
              className='mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 font-semibold'
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )
      }
       

    </div>
  );
}

export default Profile;
