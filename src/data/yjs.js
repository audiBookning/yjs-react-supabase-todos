import { WebrtcProvider } from 'y-webrtc'
import { v4 as uuidv4 } from 'uuid'
import { todosMockDataHash } from './data'

export function initWebrtcProvider(ydoc) {
    // Example of a static room name.
    // const roomName = 'testTodo01'
    const roomName = uuidv4()
    new WebrtcProvider(roomName, ydoc)
}

// INFO: util function to insert mock data in yjs
export const initMockData = (ymap) => {
    for (const [key, value] of Object.entries(todosMockDataHash)) {
        ymap.set(key, value)
    }
}

// INFO: util function to convert the yjs map itens to an array
export function getAllTodos(todosMap) {
    const tododoArray = []
    for (const value of todosMap.values()) {
        tododoArray.push(value)
    }
    return tododoArray
}
