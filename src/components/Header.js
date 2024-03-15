import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firbase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LNGS } from '../utils/Constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
     }).catch((error) => {
      navigate("/error")
    });
  }


  useEffect(() =>{
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
   if (user) {
     const {uid, email, displayName, photoURL} = user;
     dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
     navigate("/browse");
   } else {
     dispatch(removeUser());
     navigate("/");
   }
 });
 // unsubscribe when component unmounts
   return () => unsubscribe();

   }, [])

  const handleGptSearchClick = () => {
   dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (event) => {
    
    dispatch(changeLanguage(event.target.value))
  }

  return (
    <div className='w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
      <img className="mx-auto  md:mx-0 w-44" src={LOGO}
      alt="logo"/>
      
    { user && <div className='flex p-2 justify-between'>
     { showGptSearch &&
      ( <select className='m-2 p-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
      {SUPPORTED_LNGS.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
      </select>)
      }
      <button className='m-0 py-2 px-4 md:mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>
       {!showGptSearch? "GPT search": "Home Page"}
        </button>
      <img className="hidden md:inline-block w-12 h-12" alt="usericon" src={user?.photoURL}/>
      <button className='font-bold text-white p-2' onClick={handleSignOut}>Sign out</button>
    </div>}
    </div>
  );
};

export default Header;