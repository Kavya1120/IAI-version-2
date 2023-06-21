// ActionProvider starter code
class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }

   handleList = () =>{
    const message = this.createChatBotMessage(
        "These are some of the links you may want to see",
        {
            widget: "links"
        }
    )

    this.updateChatbotState(message);
   }

   greet(){
    const greetingMessage = this.createChatBotMessage("Hi, Friend")
    this.updateChatbotState(greetingMessage)
   }

   do(){
    const Message = this.createChatBotMessage("I can assist you with the information regarding this website")
    this.updateChatbotState(Message)
   }

   thankyou(){
    const Message = this.createChatBotMessage("Thank you, Have a great day!")
    this.updateChatbotState(Message)
   }

   default(){
    const Message = this.createChatBotMessage("Sorry! I can't understand.")
    this.updateChatbotState(Message)
   }
   updateChatbotState(message){
    this.setState(prevState =>({
        ...prevState, messages:[...prevState.messages, message]
    }))
   }
 }
 
 export default ActionProvider;