import React, {useEffect, useState } from 'react'
import Todo from './Todo'
import {Context} from "./Context"

let App = () =>  {

const [todos, setTodos] = useState([])
const [todosTitle, setTodosTitle] = useState('')

useEffect(() => {
  const raw = localStorage.getItem('todos') || [] 
  setTodos(JSON.parse(raw))
}, [])

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])

  const removeTodo = id => {
  setTodos(todos.filter(todo => {
    return todo.id !== id
    })) 
  }

  const toggleTodo = id => {
  setTodos(todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo
  }))
}

const addTodo = event => {
  if (event.key === 'Enter') {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: todosTitle,
        completed: false
      }
    ])
    setTodosTitle('')
  }
}

    return (
      <Context.Provider value={{
        removeTodo, toggleTodo
      }}>
      <div className="container">
        <h1>Todo app</h1>

          <div className="input-field">
            <input 
            type="text"
            value={todosTitle}
            onChange={event => setTodosTitle(event.target.value)}
            onKeyPress={addTodo}/>
         
            <label>Todo name</label>
          </div>
          <Todo todos={todos} />
      </div>
      </Context.Provider>
    );
  }

  export default App