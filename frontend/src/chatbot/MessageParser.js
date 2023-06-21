// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
        const lowerCaseMessage = message.toLowerCase()

        if(lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") ){
            this.actionProvider.greet()
        }

        else if(lowerCaseMessage.includes("link")){
            this.actionProvider.handleList();
        }

        else if(lowerCaseMessage.includes("do")){
            this.actionProvider.do();
        }
        else if(lowerCaseMessage.includes("thank")){
            this.actionProvider.thankyou();
        }
        else{
            this.actionProvider.default();
        }
    }
  }
  
  export default MessageParser;