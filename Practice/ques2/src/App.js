import React from 'react';
import ContactCard from './ContactCard';

function App(){
  return(
    <div className= "contacts">
    <ContactCard 
     contact= {{name:"Mr. White", imgUrl: "http://placekitten.com/300/200", email: "asddw" }}/>
    <ContactCard
     contact= {{name:"Mr. ads", imgUrl: "http://placekitten.com/400/200", email: "asddw" }}/>
    <ContactCard 
     contact= {{name:"Mr. rat", imgUrl: "http://placekitten.com/400/300", email: "asddw" }}/>
    <ContactCard
     contact= {{name:"Mr. cat", imgUrl: "http://placekitten.com/200/100", email: "asddw" }}/>

      
    </div>
  )
}

export default App;
