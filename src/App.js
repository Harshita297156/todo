import React, { useState ,useEffect} from 'react';
import ToDoLists from './ToDoLists';

const App=()=>{
    const[inputList, setInputList]= useState("");
    const [Items, setItems] = useState([]);

    useEffect(() => {
      const storedItems = JSON.parse(localStorage.getItem("todoItems"));
      if (storedItems) {
          setItems(storedItems);
      }
      }, []);

    const itemEvent=(event)=>{
        console.log(event.target.value);
        setInputList(event.target.value);
    };

    const listOfItems=()=>{
      setItems((oldItems)=>{
        const updatedItems= [ ...oldItems, inputList];
        localStorage.setItem("todoItems", JSON.stringify(updatedItems));
        return updatedItems;
      });
      setInputList("");
    };

    const deleteItems =(id)=>{
      console.log("deleted");

      setItems((oldItems)=>{
        const updatedItems = oldItems.filter((arrElem, index) => index !== id);
      // Update localStorage after deletion
      localStorage.setItem("todoItems", JSON.stringify(updatedItems));
      return updatedItems;
        });
      };
    

    return (
    <>
    <div className='main-div'>
      <div className='center-div'>
           <br/>
           <h1> To Do List </h1>
           <br/>
           <input
            type='text' 
            placeholder='Add Items' 
            onChange={itemEvent}
            />
           <button onClick={listOfItems}> + </button>

           <ol>
            {/* <li> {inputList} </li> */}
            {Items.map((itemval,index) => {
               return(
                <ToDoLists
                key={index} 
               id={index}
               text={itemval}
              onSelect={deleteItems}
               />
               );
            })}
           </ol>
      </div>
    </div>
   </>
  );
};

 export default App;