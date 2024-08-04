import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { addTask, fetchTasks, updateTask } from './features/taskSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const TaskManager = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const add = () => {
    if (inputRef.current.value.trim() === "") {
      toast.error("please enter the details",{autoClose:1000})
      return;
  }else{
    const id = new Date().toISOString();
    dispatch(addTask({ task: inputRef.current.value, stage: 'new', id }));
    inputRef.current.value = ''; // Clear the input after adding the task
  }
   
  };

  const logout = ()=>{
    localStorage.removeItem('token')
    return navigate('/login')
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    dispatch(updateTask({
      id: result.draggableId,
      stage: destination.droppableId,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container vh-100 mt-4">
        <h3 className=' mb-4'>Welcome : {localStorage.getItem('email')}</h3>
        <form className="form-floating input-group">
          <input
            type="text"
            className="form-control rounded-start p-2"
            id="floatingInput"
            placeholder="Enter your task"
            ref={inputRef}
          />
          <label htmlFor="floatingInput">Enter Your Task ...</label>
          <button
            type="button"
            className="input-group-text btn btn-outline-warning text-dark rounded-end text-white"
            onClick={add}>

            ADD TASK <i className="bi bi-bookmark-check-fill"></i>
          </button>
          <button
            type="button"
            className="input-group-text btn btn-success btn-outline-danger text-dark rounded-3 ms-2 text-white"
            onClick={logout}
            >Logout</button>
            <ToastContainer/>
        </form>

        <section className="row text-center mt-5">
          {['new', 'pending', 'completed'].map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided) => (
                <div
                  className="col-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{stage.charAt(0).toUpperCase() + stage.slice(1)}</h2>
                  <div className=""> {/*card border rounded-3*/}
                    <div className="">{/*card-body*/}
                      {tasks[stage].map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <blockquote
                              className={`blockquote mb-3 p-3 border rounded-4 ${stage=='new'?"bg-primary text-white":"" } ${stage=='pending'?"bg-warning":"" } ${stage=='completed'?"bg-success text-white":"" }`}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <p>{item.task}</p>
                            </blockquote>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </section>
      </div>
    </DragDropContext>
  );
};

export default TaskManager;
