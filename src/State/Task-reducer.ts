import {TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";


type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string

}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean

}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string

}


export type ActionType = removeTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodoListActionType | RemoveTodoListActionType


export const taskReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] =
                copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK' : {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }

        case 'CHANGE-TASK-STATUS' : {

            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(task => {
                        if (task.id === action.taskId) {
                            return {...task, isDone: action.isDone}
                        } else {
                            return task
                        }
                    })
            }
        }
        case 'CHANGE-TASK-TITLE' : {

            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(task => {
                        if (task.id === action.taskId) {
                            return {...task, title: action.title}
                        } else {
                            return task
                        }
                    })
            }
        }

        case 'ADD-TODOLIST' :
         let todolistId = action.todolistId
            return {...state, [todolistId]: []}

        case 'REMOVE-TODOLIST':
        {
            let copyState ={...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string,): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC =
    (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
        return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC =
    (taskId: string, title: string,  todolistId: string): ChangeTaskTitleActionType => {
        return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
    }



