import React, {useState} from "react";
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterButtonType = 'All' | 'Active' | 'Completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterButtonType
}
type TasksStateType = {
    [todoListId: string]: Array<TasksType>
}

export function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'All'},
        {id: todoListId_2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "RestAPI", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Paper", isDone: false},
            {id: v1(), title: "Buckwheat", isDone: false},
            {id: v1(), title: "Meet", isDone: false},
        ]
    })
    const removeTask = (taskId: string, todoListId: string) => {
        /*const copyTasks = {...tasks}
        copyTasks[todoListId] = copyTasks[todoListId].filter(el => el.id !== taskId)
        setTasks(copyTasks);*/

        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TasksType = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    const changeTodoListFilter = (filter: FilterButtonType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }


    const getFilteredTasks = (tasks: TasksType[], filterValue: FilterButtonType) => {
        let filteredTasks = tasks;

        if (filterValue === 'Active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === 'Completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks;
    }


    const todoListComponents = todoLists.length
        ? todoLists.map(tl => {
                const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)

                return (
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}

                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListFilter={changeTodoListFilter}
                    />
                )
            }
        )
        : <span>Create your first todoList!</span>

    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}
