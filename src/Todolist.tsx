import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
                <Checkbox
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                    color={'primary'}
                />

               {/* <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}/>*/}

                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>


                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    return (
        <div>
            <h3>

            <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />

               <IconButton onClick={removeTodoList}>
                   <Delete/>
               </IconButton>

            </h3>

            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', paddingLeft: '0' }}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={'contained'}
                    color={props.filter === 'all' ? "secondary" : 'primary'}
                    size={'small'}
                    onClick={setAllFilter}>All
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'active' ? "secondary" : 'primary'}
                    size={'small'}
                    onClick={setActiveFilter}>Active
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'completed' ? "secondary" : 'primary'}
                    size={'small'}
                    onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    );
}