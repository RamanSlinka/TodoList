import React, {useState, KeyboardEvent, ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import { Task } from "./State/Task";


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

export const Todolist = React.memo((props: TodolistPropsType) => {
    console.log('Todolist clicked')

    const addTask = useCallback((title: string) =>
        props.addTask(title, props.id), [props.id, props.addTask])

    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle,  props.id])

    const setAllFilter = useCallback(() => {
        props.changeTodoListFilter('all', props.id)}, [props.id])
    const setActiveFilter = useCallback(() => {
            props.changeTodoListFilter('active', props.id)}, [props.id])
    const setCompletedFilter = useCallback(() => {
            props.changeTodoListFilter('completed', props.id)}, [props.id])

    const removeTodoList = () => props.removeTodolist(props.id)


    let allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    const removeTask = useCallback((taskId: string) => {
        props.removeTask(taskId, props.id)
    }, [ props.removeTask, props.id])

    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean ) =>
        props.changeTaskStatus(taskID, newIsDoneValue, props.id), [  props.changeTaskStatus ,props.id])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string) => {
        props.changeTaskTitle(taskID, newTitle, props.id)
    }, [ props.changeTaskTitle ,props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>

                {
                    tasksForTodolist.map(t => {







                        return (
                            <Task
                            key={t.id}
                            task={t}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            />
                        )
                    })
                }
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
})