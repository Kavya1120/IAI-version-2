import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Academy from './academyhome';
import ModalForm from './ProfileModal';
import {Container} from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
function NewProfile() {
    const[modalOpen,setModalOpen] = useState(false);
    const [rowToEdit , setRowToEdit] = useState(null);

    useEffect(() => {
      console.log("inside use effect setModalOpen(true)")
      setModalOpen(true);
    },[])
  return (
    <div className='App-new'>
        <Academy></Academy>
        <ToastContainer></ToastContainer>
        {modalOpen && <ModalForm closeModal={() => {
     setModalOpen(false); 
     setRowToEdit(null);
    }} rowToEdit={rowToEdit}/>}
        
    </div> 
  );
}

export default NewProfile;
