import "./App.css";
import { useEffect, useState } from "react";
import FromTodo from "./Components/FormTodo";
import TodoList from "./Components/TodoList";


export default function App() {

  const [todos, setTodos] = useState(()=>{
   const localValue = localStorage.getItem("ITEMS");
   if(localValue == null) return [];
   return JSON.parse(localValue);
  });

  useEffect(()=>{
    localStorage.setItem('ITEMS',JSON.stringify(todos));
  },[todos]);

  function addTodo(newItem){

    setTodos((currTodos) => {
      return [
        ...currTodos,
        { title: newItem, id: crypto.randomUUID(), completed: false },
      ];
    });
  }
  

  function toggleTodo(id,completed){
    setTodos((currTodos)=>{
      return currTodos.map((todo)=>{
        // if(todo.id === id){ 
        //   return{...todo, completed };
        // }
        // return todo;
        return id === todo.id?  {...todo, completed } : todo;
      })
    })
  }

  function deleteTodo(id){
    setTodos((currTodos)=>{
      return currTodos.filter((todo)=>{
        return todo.id !== id;
      });
    });
  }

  // console.log(todos);

  return (
    <>
      <FromTodo addTodo={addTodo}/>
      <h1>ToDo List</h1>
      <TodoList todos={todos} toggleTodo = {toggleTodo} deleteTodo = {deleteTodo}/>
      
    </>
  );
}
