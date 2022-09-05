import React from 'react'
import {useState} from 'react'
import {BsBook} from 'react-icons/bs'
import {AiOutlinePlusCircle, AiOutlineCloseCircle} from 'react-icons/ai'
function App() {
const [tasks, setTasks] = useState([]);
const [input, setInput] = useState('')






const handleSumbit=(e)=>{
  e.preventDefault()
  const addTask = {
    id: Math.floor(Math.random()* 10000),
    text: input,
    completed: false
  }
  setTasks([...tasks, addTask]);
  setInput('')
}





//delete task
const deleteTask=(id)=>{
  let filteredTasks=[...tasks].filter((tasks)=>tasks.id !==id)
  setTasks(filteredTasks)
  console.log('deleted ok')
}


//toggle completed task
const toggleComplete= (id)=>{
  setTasks(tasks.map(task=>task.id===id?{...task, completed: !task.completed} : task))
}


const date = new Date()
console.log(date)
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]



  return (
    <div className="App">
      <div className>
        <h1><BsBook></BsBook>  List</h1>


      <div className='date'>
        <p>{days[date.getDay()]},</p>
        <p>{date.getDate()},</p>
        <p>{months[date.getMonth()]}</p>
        <p>{date.getFullYear()}</p>
        </div>




        <form onSubmit={handleSumbit}>
          <div className='form-input'>
        <AiOutlinePlusCircle className='icon-add' onClick={handleSumbit}/>
          <input 
          placeholder='Enter a task..'
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)} />
        </div>

        </form>{tasks.length==1?(<div className='popup-task-row'><p className='popup-textline'>double-tap to complete
            </p></div>):<></>}
        {tasks.map(task=>(
          <div className={`${task.completed? 'completed' : 'task-row'}`} key={task.id} onDoubleClick={() => toggleComplete(task.id)}>
          
          <p className='textline'>{task.text}
            </p>
            
            <AiOutlineCloseCircle className='icon-delete' onClick={()=>deleteTask(task.id)}/>
            </div>
        )).reverse()}
      </div>
      <p className='length'>{(tasks<1 ? 'You have no tasks' : `Tasks: ${tasks.length}`)}</p>
    </div>
  );
}

export default App;
