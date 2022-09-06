import React from 'react'
import {useState,useEffect} from 'react'
import {BsBook,BsEye,BsEyeSlash} from 'react-icons/bs'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {HiOutlinePlus} from 'react-icons/hi'
function App() {




const [tasks, setTasks] = useState(()=>{
  const localData = localStorage.getItem('tasks');
  return localData ? JSON.parse(localData) : [];
});







const [input, setInput] = useState('')
const [popped, setPopped] = useState(false)
const showOneTimeThenDont=(e)=>{
  setTimeout(()=>{setPopped(true); console.log('just popped or double clicked')}, 2500)}
const [hideCompleted, setHideCompleted] = useState(false);
const toggleHideCompleted =()=>{
  setHideCompleted(current=>!current)
  console.log("switched hideCompleted to "+ hideCompleted)
}

useEffect(() =>{localStorage.setItem('tasks', JSON.stringify(tasks))}, [tasks])


const HandleSumbit=(e)=>{
  e.preventDefault()
  const addTask = {
    id: Math.floor(Math.random()* 10000),
    text: input,
    completed: false
  }
  setTasks([...tasks, addTask],);
  setInput('');
}





//delete task
const deleteTask=(id)=>{
  let filteredTasks=[...tasks].filter((tasks)=>tasks.id !==id);
  // useEffect((tasks) =>{localStorage.setItem('tasks', JSON.stringify(tasks))}, [tasks])
  setTasks(filteredTasks)
  console.log('deleted ok')
}
//toggle completed task
const toggleComplete= (id,e)=>{showOneTimeThenDont(e); 
  setTasks(tasks.map(task=>task.id===id?{...task, completed: !task.completed} : task))
}




const date = new Date()
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
















  return (
    <div className="App">
      <div className='app-title'>
        <h1><BsBook  className='book-icon'
         ></BsBook>  List</h1>


      <div className='date'>
            <p>{!hideCompleted?<BsEye className='hide-completed' onClick={toggleHideCompleted}/>:<BsEyeSlash className='hide-completed' color='gray' onClick={toggleHideCompleted}/>}</p>   
      </div>
      <form onSubmit={HandleSumbit}>
            <div className='form-input'>
          <HiOutlinePlus className='icon-add' onClick={HandleSumbit}/>
            <input 
            placeholder='Enter a task..'
            type='text'
            value={input}
            maxLength="33"
            onChange={e => setInput(e.target.value)} />
            </div>
      </form>
    {(tasks.length==1)&&!popped?(<div className='popup-task-row' ><p className='popup-textline' onLoad={showOneTimeThenDont()}>double tap to complete</p></div>):<></>}
    
    {tasks.map(task=>{
      if(hideCompleted){
        if(!task.completed)return (
          <div className={`${task.completed? 'completed' : 'task-row'}`} key={task.id} onDoubleClick={(e) => {toggleComplete(task.id)}}><p className='textline'>{task.text}</p>
            <AiOutlineCloseCircle className='icon-delete' onClick={()=>deleteTask(task.id)}/>
          </div>)}
        else{return (<div className={`${task.completed? 'completed' : 'task-row'}`} key={task.id} onDoubleClick={(e) =>{toggleComplete(task.id)}}><p className='textline'>{task.text}</p>
          <AiOutlineCloseCircle className='icon-delete' onClick={()=>deleteTask(task.id)}/></div>)

            }}).reverse()}


      </div>
      <p className='length'>{(tasks<1 ? 'You have no tasks for ' : `You have: ${tasks.length} tasks for `)} {days[date.getDay()]} {date.getDate()}, {months[date.getMonth()]}</p>
    </div>
  );
}

export default App;
