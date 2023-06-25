import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ReactDOM from "react-dom";
import ModalForm from './ProfileModal';
import {Container} from 'react-bootstrap'
import ProfilePage from './profilepage';
function MainProfile() {
    const[modalOpen,setModalOpen] = useState(false);
    const [rowToEdit , setRowToEdit] = useState(null);

    const openModal = () => {
        setModalOpen(true);
      };

      useEffect(() => {
        const fetchProfileData = async () => {
          const userEmail = localStorage.getItem('userMail');
          console.log('USEREMAIL=========>', userEmail);
          try {
            const response = await Axios.post('http://localhost:6080/fetchProfileData', { email: userEmail });
            const data = response.data;
            setRowToEdit(data);
            console.log('DATA======>', data);
          } catch (error) {
            console.error('An error occurred while fetching the profile:', error);
          }
        };
        fetchProfileData();
      }, []);

  return (
    // ReactDOM.createPortal(
    
    <div className='App-new'>
        <ProfilePage openModal={openModal}></ProfilePage>
        {modalOpen && <ModalForm closeModal={() => {
        setModalOpen(false); 
        setRowToEdit(null);
    }} rowToEdit={rowToEdit}/>}
        
    </div> 
  //   ,document.querySelector("#modal"))
    
  );
}

export default MainProfile;
