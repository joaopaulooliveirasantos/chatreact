import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import ChatBot from 'react-simple-chatbot';
import Message from './components/Message';
import logoBot from './images/vivi.png';


// all available props
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Calibri',
  headerBgColor: '#0a8a77',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#00335c',
  botFontColor: '#fff',
  userBubbleColor: '#0a8a77',
  userFontColor: '#fff',
};


class App extends Component { 
  constructor(props) {
    super(props);
    this.state = { hasError: false, };
    this.prepareWatsonMessage = this.prepareWatsonMessage.bind(this);
    this.onReturnMessage = this.onReturnMessage.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.getContext = this.getContext.bind(this);
  }

  onReturnMessage(returnMessage){
    this.setState({context: returnMessage.context});
    this.setState({option: returnMessage.output.botoes})
    console.log("Callback Context", this.state.context);
  }

  prepareWatsonMessage(value, steps){  
    this.setState({message: value.value});
    console.log("Usuario NextMessage", this.message);
    return 'watsonmessage';
  }

  nextStep(value, steps){
    
    if (this.state.option===' '){
      return 'usermessage'
    }


    return 'watsonoptions'

  }

  getMessage(){
    return this.state.message;
  }

  getContext(){
    return this.state.context;
  }

  componentDidUpdate() {
    //console.log("Componente APP Atualizado!!!", this.state)    
  }
       
  render() {

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Algo foi errado</h1>;
    }

    this.steps = [
      {
        id: 'iniciowatson',               
        component: (<Message message   = {this.getMessage} // todo: passar mensagem  
                             context   = {this.getContext} 
                             onReturn  = {this.onReturnMessage} />),    
        asMessage: true,         
        trigger: 'usermessage'      
      },    
      {
        id: 'usermessage',
        user: true,
        trigger: (this.prepareWatsonMessage),             
      },
      {
        id: 'watsonmessage',               
        component: (<Message message   = {this.getMessage}   
                             context   = {this.getContext} 
                             onReturn  = {this.onReturnMessage} />),    
        asMessage: true,         
        trigger: 'watsonoptions'        
      },            
      {
        id: 'watsonoptions',
        options: [{value: this.state.option, label: this.state.option, trigger: 'watsonmessage'}],
      }     
    ]
    
    //this.steps.push();

    return (        
    
      <ThemeProvider theme={theme}>
      <ChatBot
          headerTitle="Previ Chatbot"
          botAvatar= {logoBot}
          hideUserAvatar="true"
          floating= "true"
          placeholder = "Digite sua mensagem..."
          steps = {this.steps}
      />
      </ThemeProvider>
             
    );
  }
}

export default App;
