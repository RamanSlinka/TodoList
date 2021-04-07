import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

type ChangeTodoListTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListFilterType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

let initialState: Array<TodolistType> = []

export type ActionType =
    RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleType | ChangeTodoListFilterType


export const todolistsReducer = (todoLists: Array<TodolistType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST' :

            const newTodoList: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE' :
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...todoLists]
            }
            return todoLists

        case 'CHANGE-TODOLIST-FILTER' : {
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
            return todoLists
        }
        default:
            return todoLists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: id}
}
export const  AddTodoListAC = ( title: string): AddTodoListActionType => {
     return { type: 'ADD-TODOLIST', title: title,todolistId: v1()}
}

export const  ChangeTodoListTitleAC = ( title: string, id: string): ChangeTodoListTitleType => {
     return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: id }
}

export const  ChangeTodoListFilterAC = ( id: string, filter: FilterValuesType): ChangeTodoListFilterType => {
     return {  type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id }
}



