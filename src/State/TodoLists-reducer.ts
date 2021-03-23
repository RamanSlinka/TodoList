import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

export type ActionType =
    RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleType | ChangeTodoListFilterType


export const todoListsReducer = (todoLists: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST' :
            const newTodoListID = v1()
            const newTodoList: TodolistType = {id: newTodoListID, title: action.title, filter: 'all'}
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

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: id}
}
export const  AddTodoListAC = ( title: string): AddTodoListActionType => {
     return { type: 'ADD-TODOLIST', title: title}
}

export const  ChangeTodoListTitleAC = ( title: string, id: string): ChangeTodoListTitleType => {
     return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: id }
}

export const  ChangeTodoListFilterAC = ( id: string, filter: FilterValuesType): ChangeTodoListFilterType => {
     return {  type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id }
}


