import { useState, useEffect, useMemo } from 'react';
import './styles/App.css'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { create, getAll, remove, toggleComplete, update } from './services/TaskServices';

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const [filter, setFilter] = useState("all");

  useEffect(()=>{
    fetchTasks();
  },[])

  const visibleTasks = useMemo(() => {
    let list = [...tasks];
    if(filter === "uncompleted"){
      list = list.filter(t => !t.completed);
    } 
    if(filter === "completed"){
      list = list.filter(t => t.completed);
    } 

    return list;
  }, [tasks, filter])

  async function fetchTasks(){
      try{
          const tasksData = await getAll() ;
          setTasks(tasksData);
      }
      catch(error){
          console.error("Error fetching tasks:", error);
      }
  }

  const markTaskAsCompleted = async (taskId) => {
    try{
      const updatedTask = await toggleComplete(taskId);
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updatedTask : t)) 
      );
    }catch(error){
      console.error('Error:', error);
    }
  }

  const deleteTask = async (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    try{
      await remove(taskId);
    }catch(error){
      console.error('Error:', error);
      fetchTasks();
    }
  }

  const updateTask = async (taskId, updatedFields) => {
      try {
        const updatedTask = await update(taskId, updatedFields); 
        setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
      } catch (error) {
        console.error('Update error:', error);
      }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const newTask = await create(title, description, priority)
      setTasks((prev) => [newTask, ...prev]);
      setTitle("");
      setDescription("");
      setPriority("low");
    }catch(error){
      console.error('Error:', error);
    }
  }


  return (
    <div className="App">
      <h1>Tasks List</h1>
      <TaskFilter 
        filter={filter}
        setFilter={setFilter}
      />
      {visibleTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
      <TaskList 
        tasks={visibleTasks}
        markTaskAsCompleted = {markTaskAsCompleted}
        deleteTask = {deleteTask}
        updateTask = {updateTask}
        className="carousel-object"
      /> )}
      <TaskForm 
        title = {title}
        description={description}
        priority={priority}
        setTitle={setTitle}
        setDescription = {setDescription}
        setPriority = {setPriority}
        onSubmit = {handleSubmit}
      /> 
    </div>
  );
}

export default App;
