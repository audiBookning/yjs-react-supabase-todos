import './App.css'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import * as Y from 'yjs'

import AddItem from './components/AddItem'

import { SupabaseProvider } from './data/supabase-provider'
import { getAllTodos, initMockData, initWebrtcProvider } from './data/yjs'
import { getNewTodo } from './data/data'

// INFO: used to indentify the map type in the yjs Doc
const mapName = 'my map type'

function App() {
    const doc = useRef(new Y.Doc())
    const [todos, setTodos] = useState([])
    const [editTodo, setEditTodo] = useState()
    let ymap = doc.current.getMap(mapName)
    // flag to avoid the double useEffect call
    const flag = useRef(true)

    useEffect(() => {
        /*
        Yjs doesn't return a reference to the yjs observe handle,
        so we need a flag for the unsubscribe function.
        Note that ymap has a property _eH which maps the subscriptions 
        and might be the prefered approach in this case
        */
        let observer = false

        if (flag.current) {
            SupabaseProvider(ymap, (bool) => {
                observer = false
                const tododoArray = getAllTodos(ymap)
                setTodos(tododoArray)
            })
            initWebrtcProvider(doc.current)
            initMockData(ymap)
            flag.current = false
        }

        return () => {
            console.log('useEffect return observer: ', observer)
            if (observer) ymap.unobserve()
        }
    }, [ymap])

    const addOrUpdateItemOnClick = async (item) => {
        let newTodo
        if (item.id) {
            try {
                const editedTodo = {
                    ...item,
                    editing: false,
                    updatedAt: new Date().toISOString(),
                }
                ymap.set(item.id, editedTodo)
            } catch (error) {
                console.log('error ', error)
            }
        } else if (item.title) {
            newTodo = getNewTodo(item.title)
            ymap.set(newTodo.id, newTodo)
        }
    }

    const toggleItem = (todo) => {
        const toggledTodo = {
            ...todo,
            state: !todo.state,
            updatedAt: new Date().toISOString(),
        }
        ymap.set(toggledTodo.id, toggledTodo)
    }

    const removeItem = (id) => {
        ymap.delete(id)
    }

    const editItem = (todo) => {
        const editedTodo = {
            ...todo,
            editing: true,
            updatedAt: new Date().toISOString(),
        }
        ymap.set(todo.id, editedTodo)
        setEditTodo(todo)
    }

    return (
        <>
            <ul>
                {todos.map(function (item) {
                    return (
                        <li key={item.id}>
                            <span className={item.state ? 'completed' : ''}>
                                <input
                                    type="checkbox"
                                    id={item.id}
                                    checked={item.state}
                                    onChange={() => toggleItem(item)}
                                />
                                <label htmlFor={item.id}> {item.title}</label>
                            </span>
                            <label>
                                <input
                                    type="button"
                                    className="delete"
                                    onClick={() => removeItem(item.id)}
                                />
                                <span className="label icon"></span>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    className="edit"
                                    checked={item.editing}
                                    onChange={() => editItem(item)}
                                />
                                <span className="label icon"></span>
                            </label>
                        </li>
                    )
                })}
            </ul>
            <br />
            <AddItem onClick={addOrUpdateItemOnClick} editTodo={editTodo} />
        </>
    )
}

export default App
