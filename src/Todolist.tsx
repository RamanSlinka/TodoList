import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => props.addTask(title, props.id)

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    const setAllFilter = () => {
        props.changeTodoListFilter('all', props.id)
    }
    const setActiveFilter = () => {
        props.changeTodoListFilter('active', props.id)
    }
    const setCompletedFilter = () => {
        props.changeTodoListFilter('completed', props.id)
    }
    const removeTodoList = () => props.removeTodolist(props.id)
    const tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(t.id, newTitle, props.id)

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}/>

                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>

                <button onClick={removeTask}>x
                </button>
            </li>
        )
    })
    return (
        <div>
            <h3>

            <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <button onClick={removeTodoList}>X</button>

            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? "activity" : ''}
                    onClick={setAllFilter}>All
                </button>
                <button
                    className={props.filter === 'active' ? "activity" : ''}
                    onClick={setActiveFilter}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? "activity" : ''}
                    onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>
    );
}