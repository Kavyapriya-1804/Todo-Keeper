import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'react-uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos,setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
     const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
     if(storedTodos) setTodos(storedTodos)
  }, [] )
  useEffect( () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]  )

   
  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleTodoAdd(e){
      const name = todoNameRef.current.value
      if(name === '')  return 
      setTodos(prevTodos => {
        return [...prevTodos, {id:uuidv4() ,name:name ,complete:false}]
      })
      todoNameRef.current.value= null
  }
  
  function handleClearTodo(){
    const newTodos = todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <br></br>
    <input ref={todoNameRef} id="field" type="text" />  &ensp;
    <button id="add" onClick={handleTodoAdd}>Add Todos</button>
    <br></br> <br></br>
    <button id="clear" onClick={handleClearTodo}>Clear Todo</button>
    <br></br> <br></br>
    <div>{todos.filter(todo=> !todo.complete).length} items left</div>
    </>
  )
}

export default App;
