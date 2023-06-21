import React from 'react'
import ReactModal from 'react-modal'
import {useState} from 'react'
import './child.css'
import Chatb from './chatbot/chatbot'

function Child() {
    const [isOpen, setIsOpen] = useState(false)
  const theme={
    background:'#c9FF8F',
    headerBgColor:"#197B22",
    headerFontSize:"20px",
    botBubbleColor:'0F3789',
    headerFontColor:"white",
    userBubbleColor:"#FF5733",
    userFontColor:"white"
  }
    return (

    <div className='child-div'>
        <button className='chat-button' onClick={()=>setIsOpen(true)}> 
            <i class="fas fa-comment-dots"></i>
        </button>
        
        <ReactModal
            isOpen={isOpen}
            contentLable = "Example"
            onRequestClose={()=> setIsOpen(false)}
            className="chat-window">
            <Chatb/>
       </ReactModal>
        </div>
  )
}

export default Child