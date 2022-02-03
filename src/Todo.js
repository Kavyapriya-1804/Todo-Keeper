import React from 'react'

export default function Todo({todo, toggleTodo }){
    function handleComplete(){
     toggleTodo(todo.id)
    }
    return (
        <div>
         <label>
         <input type="checkbox" checked={todo.complete} onChange={handleComplete}/>
         {todo.name}
         </label>

        </div>
    )
}