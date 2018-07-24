
import React, { Component } from 'react';


const endpoint = 'http://localhost:3001/api/message/';

class Message extends Component{
    constructor(props) {
      super(props);
      this.state = {hasError: false, };
      //this.onReturnMessage = this.onReturnMessage.bind(this);
    }
  
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
        console.log("Erro", error);
        console.log("Info", info);
    }

    componentDidUpdate() {
        //console.log("Componente MESSAGE Atualizado!!!", this.state);    
      }
             
    async componentDidMount(){
        console.log("Componente MESSAGE Construido!!!", this.props);    

        const { workspace, onReturn, context, message } = this.props;
                        
        this.usermessage = message();
        this.context = context();

        console.log("Teste Context", this.context);     

        let fetchData = { 
            method : 'POST', 
            body: JSON.stringify({
                usermessage : this.usermessage,
                workspace : workspace,
                context : this.context,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',                 
            },            
        }

        console.log("Header", fetchData);

        // Chamando a CIA via POST
        fetch(endpoint,fetchData)
        .then((res) => res.json())
        .then((findresponse) => {

            var texto = '';
            for(var i=0; i<findresponse.output.text.length; i++){
                texto += findresponse.output.text[i] + " ";
            }
            this.setState({messages : texto});
            this.setState({context: findresponse.context});
        
            /* console.log("Step atual", step.id);
            console.log("Message", message);
            console.log("Context", context);
            console.log("Intents Return", findresponse.intents);
            console.log("Context Return", findresponse.context);
            console.log("Message Return", findresponse.output.text); //this.state.messages);
            */
            onReturn(findresponse);
        
        })
    } 
    
    render() {

        if (this.state.hasError) {
          // You can render any custom fallback UI
          return <h1>Algo foi errado</h1>;
        }
    
        return (   
            <div>   
                {this.state.messages}
            </div>
        );
    }
}
    
  
export default Message;
