import React, { useState , useEffect} from "react";
import ReactDOM from "react-dom";
import Axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "./Modal.css";

 const Modal = ({ closeModal, onSubmit, defaultValue, tableHead , 
  rowToEdit,urlEndPointOfSequence,urlEndPointOfInsert,tableHeadData,urlEndPointOfUpdate }) => {
  
  const{col1,col2,col3} =tableHeadData
  const [formState, setFormState] = useState(
    defaultValue || {
      [col1]: "",
      [col2]: "",
      [col3]: "",
     
    }
  );
  const [errors, setErrors] = useState("");
  // useEffect(() => {
  //   console.log('rowToEdit:', rowToEdit);
  // }, [rowToEdit]);
 

  const validateForm = () => {
    if (formState[col2] && formState[col3]) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  try {
      if (rowToEdit === null) {
  console.log("inside add row");
  try {
    console.log("insideee try block")
    const response = await Axios.post(`http://localhost:6080/${urlEndPointOfSequence}`).then((response)=>{
      console.log("Checking Len: ", response.data.len);
       Axios.post(`http://localhost:6080/${urlEndPointOfInsert}`, {
        [col1]: response.data.len + 1,
        [col2]: formState[col2],
        [col3]: formState[col3]
      }).then((res)=>{
        toast.success(`${col2} added successfully`);
        window.location.reload();
      });
  
      
    });
  } catch (error) {
    toast.error(`Unable to add ${col2}`);
    console.error("Error: ", error);
  }
}
 else {
        console.log("inside update", formState, rowToEdit);
        console.log("checking columns", col1,col2,col3)//${urlEndPointOfUpdate}
        const response = await Axios.put("http://localhost:6080/editdomain", {
          [col1]: formState[col1],
          [col2]: formState[col2],
          [col3]: formState[col3]
        });
        
        alert("Updated successfully");
        window.location.reload();
      }
  
      onSubmit(formState);
      closeModal();
    } catch (error) {
      console.error(error);
      setErrors("Error adding data to the database");
    }
  };
  

  return (
    
   
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      {console.log("Modal component is rendered")}
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor={col2}>{tableHead?.col2}</label>
            <input name={col2} onChange={handleChange} value={formState[col2]} className="inputmodal"/>
          </div>
          <div className="form-group">
            <label htmlFor={col3}>{tableHead?.col3}</label>
            <input
              name={col3}
              onChange={handleChange}
              value={formState[col3]}
              className="inputmodal"
            />
          </div>
          
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
    )
};

export default Modal