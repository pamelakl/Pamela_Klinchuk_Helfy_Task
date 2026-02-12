import { useState } from "react";
import "../styles/TaskList.css";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, markTaskAsCompleted, deleteTask, updateTask }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsToShow = 3; 
  const maxSlide = Math.max(0, tasks.length - itemsToShow);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  if (tasks.length === 0){
    return <p>No tasks found</p>;
  } 
  return (
    <div className="carousel-container">
      <button className="slide-button prev" onClick={prevSlide}>&lt;</button>
      
      <div className="slide">
        <div 
          className="carousel" 
          style={{ 
            transform: `translateX(-${currentSlide * (100 / itemsToShow)}%)`
          }}
        >
          {tasks.map((task) => (
            <div key={task.id} className="carousel-item" style={{ flex: `0 0 ${100 / itemsToShow}%` }}>
              <TaskItem
                task={task}
                markTaskAsCompleted={markTaskAsCompleted}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="slide-button next" onClick={nextSlide}>&gt;</button>
    </div>
  );
}