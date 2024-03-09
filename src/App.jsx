import React from 'react'
import './App.css'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore/lite';
import {v4 as uuidv4} from "uuid";
import {addUser,editUserInfo,deleteUser,getUserData} from "./firebase.jsx"
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { BrowserRouter,HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';

import { ProtectedBookmarksRoute } from './pages/ProtectedBookmarksRoute.jsx';
import ProtectedBookmarksPage from './pages/ProtectedBookmarksPage.jsx';
import { ProtectedAccountRoute } from './pages/ProtectedAccountRoute.jsx';

import Howto from './pages/Howto.jsx';
import HomePageShimmer from './pages/HomePageShimmer.jsx';
import ForgotPasswordReset from './pages/ForgotPasswordReset.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';

export default function App() {

  /* addUser({email:"emailtest2@gmail.com",password:"1234",itemsList:["item1","item2","item3"],username:"Test name 3"}) */

  /* editUserInfo("emailtest3@gmail.com",["111","222","333"]) */

  /* getUserData("emailtest2@gmail.com") */

  /* deleteUser("emailtest3@gmail.com") */



  return (
    <HashRouter>
      <Routes>
        
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/bookmarks" element={<ProtectedBookmarksRoute />}></Route>
        <Route path="/account" element={<ProtectedAccountRoute />}></Route>
        <Route path='/howto' element={<Howto />}/>
        <Route path="/shimmy" element={<HomePageShimmer />} />

        <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
        <Route path='/resetpassword/:id' element ={<ForgotPasswordReset />} />
        

      </Routes>
    </HashRouter>
  )
}

