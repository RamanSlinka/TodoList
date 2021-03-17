import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type  FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>

}


export default function App() {
//BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to bye', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'RedBull', isDone: false}
        ],
    })


    function removeTask(taskID: string, todoListID: string) {
        const todolistTasks = tasks[todoListID]
        const filteredTasks = todolistTasks.filter(t => t.id !== taskID) //true
        tasks[todoListID] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})

    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTodolist(todoListID: string) {
       setTodoLists( todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]

    }

    function addTodoList(title:string) {
        const newTodoListID = v1()
        const newTodoList: TodolistType = {id: newTodoListID, title: title, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
     }


    //UI:

    const todoListComponents = todoLists.map(tl => {
            let tasksForTodoList = tasks[tl.id]
            if (tl.filter === 'active') {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
            }
            if (tl.filter === 'completed') {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
            }
            return (
                <Todolist
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodoList}
                    removeTodolist={removeTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            )
        }
    )
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListComponents}
        </div>
    )}






