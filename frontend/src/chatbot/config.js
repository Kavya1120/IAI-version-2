// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import Options from './Options';
import LinkList from "./LinkList";


const config = {
    botName: "IAI chatbot",
    initialMessages: [createChatBotMessage("Hi, How can I help you ?",{
    widget: "Options",
  }),
],
// ...,
widgets:[
    {
        widgetName: "Options",
        widgetFunc:(props)=> <Options {...props}/>,
    },
    {
        widgetName:"links",
        widgetFunc:(props)=> <LinkList {...props} />,
        props:{
            options:[
                {
                    text:"ICCICBE",
                    url:"https://iccicbe.in/",
                    id: 1,
                },
                {
                    text:"ICCICBE Latest Event",
                    url:"https://www.youtube.com/watch?v=MDf7UR0mPGQ",
                    id: 2,
                },
            ],
        },
    },
],
  

  
}

export default config