import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar1 from '../components/Navbar1';
import ReactDOM from "react-dom";
// import "./adminHome.css"
import ModalForm from './ProfileModal';
import {Container} from 'react-bootstrap'
import ProfilePage from './profilepage';
function MainProfile() {
    const[modalOpen,setModalOpen] = useState(false);
    const [rowToEdit , setRowToEdit] = useState(null);

    const openModal = () => {
        setModalOpen(true);
      };

  return (
    // ReactDOM.createPortal(
    
    <div className='App-new'>
        <ProfilePage openModal={openModal}></ProfilePage>
        {modalOpen && <ModalForm closeModal={() => {
     setModalOpen(false); 
     setRowToEdit(null);
    }}/>}
        
    </div> 
  //   ,document.querySelector("#modal"))
    
  );
}

export default MainProfile;
