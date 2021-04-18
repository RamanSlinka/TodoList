import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../AppWithRedux";

export type TaskPropsType = {
    task:TaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {

    const changeTaskTitle = (e:ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    }
    const changeTaskStatus = (newTitle: string) => {
props.changeTaskTitle(props.task.id, newTitle)
    }
    const removeTask = () => {
props.removeTask(props.task.id)
    }


    return <>
        <li  className={props.task.isDone ? "is-done" : ''}>
            <Checkbox
                checked={props.task.isDone}
                onChange={changeTaskStatus}
                color={'primary'}/>
            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    </>
})
