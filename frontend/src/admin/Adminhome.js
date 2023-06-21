import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import Navbar1 from '../components/Navbar1';
import AdminNav from './AdminNav';
import ReactDOM from "react-dom";
import Footer from '../components/footer';
import "./adminHome.css"
import Table from './DataTable';
import Modal from './Modal';
import {Container} from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
function AdminPage() {
 
  const[modalOpen,setModalOpen] = useState(false);
  const[modalOpen1,setModalOpen1] = useState(false);
  const[modalOpen2,setModalOpen2] = useState(false);
  const [rowToEdit , setRowToEdit] = useState(null);
  const [rowToEdit1 , setRowToEdit1] = useState(null);
  const [rowToEdit2 , setRowToEdit2] = useState(null);

  const urlEndPointOfDomainSequence = "sequencedomain"
  const urlEndPointOfYoutubeSequence = "sequenceurl"
  const urlEndPointOfFeedSequence = "sequencenews"

  const urlEndPointOfInsertDomain = "createdomain"
  const urlEndPointOfInsertYoutubeURL = "createurl"
  const urlEndPointOfInsertNewsfeed = "createnews"

  const urlEndPointOfUpdateDomain = "editdomain"
  const urlEndPointOfUpdateUrl = "editurl"
  const urlEndPointOfUpdateFeed = "editnews"
 
  const tableHead = {
    col1: 'S.No',
    col2: 'University Name',
    col3: 'Domain',
    col4: 'Actions'
  };

  const tableHeadData = {
    col1: 'seq',
    col2: 'universityname',
    col3: 'domain'
  }

  const tableHead2 = {
    col1: 'S.No',
    col2: 'Youtube URL',
    col3: 'Title',
    col4: 'Actions'
  };
  const tableHead2Data = {
    col1: 'seq',
    col2: 'url',
    col3: 'title'
  }
  const tableHead3 = {
    col1: 'S.No',
    col2: 'Newsfeed URL',
    col3: 'Title',
    col4: 'Actions'
  };

  const tableHead3Data = {
    col1: 'seq',
    col2: 'newsfeedurl',
    col3: 'title'
  }


  const [rows, setRows] = useState([]);
 const [youtubeUrlRow, setYoutubeURL] = useState([]);
const [newsFeedUrlRow, setnewsFeedURL] = useState([]);

useEffect(() => {
  console.log("row========>",rows)
  Axios.get('http://localhost:6080/fetchalldomain').then((response) => {
    console.log("res==========>",response.data.data)
    setRows(response.data.data)
  })
},[])

useEffect(() => {
  Axios.get('http://localhost:6080/fetchallurls').then((response) => {
    console.log("res==========>",response.data.data)
    setYoutubeURL(response.data.data)
  })
},[])

useEffect(() => {
  Axios.get('http://localhost:6080/fetchallfeed').then((response) => {
    console.log("res==========>",response.data.data)
    setnewsFeedURL(response.data.data)
  })
},[])

 const handleDeleteRow = (targetIndex) => {
   setRows(rows.filter((_,idx) => idx !== targetIndex))
 }
 const handleDeleteRow1 = (targetIndex) => {
  setYoutubeURL(rows.filter((_,idx) => idx !== targetIndex))
}
const handleDeleteRow2 = (targetIndex) => {
  setnewsFeedURL(rows.filter((_,idx) => idx !== targetIndex))
}
 
 const handleSubmit = (newRow) =>{
   rowToEdit === null ?
   setRows([...rows,newRow]):
   setRows(rows?.map((currRow,idx) => {
     if(idx !== rowToEdit){
       return currRow;
     }
     else{
       return newRow;
     }
   }) )
 }

 const handleYoutubeUrlSubmit = (newRow) =>{
  rowToEdit1 === null ?
  setYoutubeURL([...youtubeUrlRow,newRow]):
  setYoutubeURL(youtubeUrlRow?.map((currRow,idx) => {
    if(idx !== rowToEdit1){
      return currRow;
    }
    else{
      return newRow;
    }
  }) )
}

const handleNewsFeedUrl = (newRow) =>{
  rowToEdit2 === null ?
  setnewsFeedURL([...newsFeedUrlRow,newRow]):
  setnewsFeedURL(newsFeedUrlRow?.map((currRow,idx) => {
    if(idx !== rowToEdit2){
      return currRow;
    }
    else{
      return newRow;
    }
  }) )
}
 
 const handleEditRow = (idx) =>{
  console.log("inside handle edit adminhome")
   setRowToEdit(idx);
 
   setModalOpen(true);
 }
 const handleEditRow1 = (idx) =>{
  setRowToEdit1(idx);

  setModalOpen1(true);
}
const handleEditRow2 = (idx) =>{
  setRowToEdit2(idx);

  setModalOpen2(true);
}
  return (
  
    // ReactDOM.createPortal(
    
    <div className='App-admin'>
      <ToastContainer></ToastContainer>
    <header>
  <nav>
   <AdminNav></AdminNav>
  </nav>
</header>
     <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} tableHead={tableHead} tableHeadData={tableHeadData}></Table>
     <button className='btn admin-btn' onClick={() => setModalOpen(true)}>Add</button>
     {modalOpen && ReactDOM.createPortal( <Modal closeModal={() => {
     setModalOpen(false); 
     setRowToEdit(null);
    }} 
     onSubmit={handleSubmit} defaultValue={rowToEdit !== null && rows[rowToEdit] ? 
      {
      seq: rows[rowToEdit].seq,
      universityname: rows[rowToEdit].universityname,
      domain:rows[rowToEdit].domain
     }:{}} 
     tableHead={tableHead} urlEndPointOfSequence={urlEndPointOfDomainSequence}  
     urlEndPointOfInsert={urlEndPointOfInsertDomain} urlEndPointOfUpdate={urlEndPointOfUpdateDomain} 
     rowToEdit={rowToEdit} tableHeadData={tableHeadData}/>, document.querySelector("#modal-root"))}
    
    <Table rows={youtubeUrlRow} deleteRow={handleDeleteRow1} editRow={handleEditRow1} tableHead={tableHead2} tableHeadData={tableHead2Data}></Table>
     <button className='btn admin-btn' onClick={() => setModalOpen1(true)}>Add</button>
     {modalOpen1 && ReactDOM.createPortal( <Modal closeModal={() => {
     setModalOpen1(false); 
     setRowToEdit1(null);
     
    }} 
     onSubmit={handleYoutubeUrlSubmit}  defaultValue={rowToEdit1 !== null && youtubeUrlRow[rowToEdit1] ? 
      {
      seq: youtubeUrlRow[rowToEdit1].seq,
      url: youtubeUrlRow[rowToEdit1].url,
      title:youtubeUrlRow[rowToEdit1].title
     }:{}}
     tableHead={tableHead2} urlEndPointOfSequence={urlEndPointOfYoutubeSequence} 
     urlEndPointOfInsert={urlEndPointOfInsertYoutubeURL} urlEndPointOfUpdate={urlEndPointOfUpdateUrl}
     rowToEdit={rowToEdit1} tableHeadData={tableHead2Data}/>, document.querySelector("#modal-root"))}

<Table rows={newsFeedUrlRow} deleteRow={handleDeleteRow2} editRow={handleEditRow2} tableHead={tableHead3} tableHeadData={tableHead3Data}></Table>
     <button className='btn admin-btn' onClick={() => setModalOpen2(true)}>Add</button>
     {modalOpen2 && ReactDOM.createPortal( <Modal closeModal={() => {
     setModalOpen2(false); 
     setRowToEdit2(null);
    }} 
     onSubmit={handleNewsFeedUrl} defaultValue={rowToEdit2 !== null && newsFeedUrlRow[rowToEdit2] ? 
      {
      seq: newsFeedUrlRow[rowToEdit2].seq,
      newsfeedurl: newsFeedUrlRow[rowToEdit2].newsfeedurl,
      title:newsFeedUrlRow[rowToEdit2].title
     }:{}}
      tableHead={tableHead3} urlEndPointOfSequence={urlEndPointOfFeedSequence} 
      urlEndPointOfInsert={urlEndPointOfInsertNewsfeed} urlEndPointOfUpdate={urlEndPointOfUpdateFeed}
      rowToEdit={rowToEdit2} tableHeadData={tableHead3Data}/>, document.querySelector("#modal-root"))}
    </div> 
  //   ,document.querySelector("#modal"))
    
  );
}

export default AdminPage;
