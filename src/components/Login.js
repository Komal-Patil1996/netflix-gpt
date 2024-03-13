import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import  {auth } from "../utils/firbase"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BACKGROUND_URL, USER_AVATAR } from '../utils/Constant';


const Login = () => {

  const dispatch = useDispatch();


  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const [isSignInForm, setIsSignInForm] = useState(true)

  const toggleSignInForm = () => {
   setIsSignInForm(!isSignInForm);
  }

  const onSignInClick = () => {
  const errorMessage =   checkValidData(email.current.value, password.current.value);
  setErrorMessage(errorMessage);

  if(errorMessage) return;

  if(!isSignInForm){
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
    
      const user = userCredential.user;

      updateProfile(user, {
        displayName: name.current.value, photoURL: USER_AVATAR
      }).then(() => {
        const {uid, email, displayName, photoURL} = auth.currentUser;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
      }).catch((error) => {
      setErrorMessage(error)
      });
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      setErrorMessage(errorCode+ "-" + errorMessage);
    });
  }else{
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + errorMessage);

    });
  }

}

  return (
    <div>
      <Header/>
      <div className='absolute'>
      <img src={BACKGROUND_URL}
      alt="background"/>
      </div>

      <form onSubmit={(e) => e.preventDefault() } className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In": "Sign Up"}</h1>

       {!isSignInForm && 
       (<input ref={name} type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />)}

        <input ref={email} type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />

        <input ref={password} type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />

        <p className='text-red-600 text-lg py-2'>{errorMessage}</p>

        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={onSignInClick}>{isSignInForm ? "Sign In": "Sign Up"}</button>

        <p className='p-2 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up now": "Already registered? Sign In now"}</p>
      </form>
    </div>
  );
};

export default Login;