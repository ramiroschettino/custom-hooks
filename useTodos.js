import { useEffect, useReducer } from "react"
import { TodoReducer } from "../08-useReducer"

const init = () => {
    return JSON.parse( localStorage.getItem("todos")) || [] ;
}



export const useTodos = () => {

    const [ todos , dispatch] = useReducer( TodoReducer , [], init )

    const handleNewTodo = ( todo ) => {
        const action = {
            type: "[TODO] add todo",
            payload: todo,
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
    
        dispatch({
            type: "[TODO] delete todo",
            payload: id
        })
 
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: "[TODO] toggle todo",
            payload: id,
        })
    }

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify( todos ) )
    }, [todos])


    return { 
        handleToggleTodo, 
        handleDeleteTodo, 
        handleNewTodo, 
        todos, 
        pendingTodosCount: todos.filter( todo => todo.done === false).length, 
        todosCount: todos.length,
    }
}
