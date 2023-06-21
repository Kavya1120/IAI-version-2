import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar1 from '../components/Navbar1';
import ReactDOM from "react-dom";
// import "./adminHome.css"
import Jobstest from './jobtest';
import Uploadpdf from './uploadmodal';
import {Container} from 'react-bootstrap'


function Newupload() {
    const[modalOpen,setModalOpen] = useState(false);
    
    // useEffect(() => {
    //   console.log("inside use effect setModalOpen(true)")
    //   setModalOpen(true);
    // },[])
    const openModal = () => {
        setModalOpen(true);
      };
  return (
    <div className='App-new'>
        <Jobstest openModal={openModal}></Jobstest> 
        {modalOpen && ReactDOM.createPortal( <Uploadpdf closeModal={() => {
     setModalOpen(false); 
    }} />, document.querySelector("#modal-root"))
}
        
    </div> 
  );
}

export default Newupload;