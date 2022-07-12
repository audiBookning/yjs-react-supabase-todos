import { v4 as uuidv4 } from 'uuid'

// TODO: for such a small mock data, we can use a simple object instead of a Map
export const todosMockDataHash = {
    '9305b573-57f2-4cfc-bdd3-ac14664804d9': {
        id: '9305b573-57f2-4cfc-bdd3-ac14664804d9',
        title: 'todo01',
        state: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        editing: false,
    },
    '039a6186-a69f-45cc-a57b-de8b3e5a8ca3': {
        id: '039a6186-a69f-45cc-a57b-de8b3e5a8ca3',
        title: 'todo02',
        state: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        editing: false,
    },
    '3e1eb13e-2f35-4ea3-a054-4fdd9fa17b79': {
        id: '3e1eb13e-2f35-4ea3-a054-4fdd9fa17b79',
        title: 'todo03',
        state: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        editing: false,
    },
    'ad8991b0-c834-47b5-9e88-4c4e686931b3': {
        id: 'ad8991b0-c834-47b5-9e88-4c4e686931b3',
        title: 'todo04',
        state: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        editing: false,
    },
}

// INFO: put here just to clean the component a little more
export const getNewTodo = (title) => ({
    title: title,
    state: false,
    id: uuidv4(),
    editing: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
})
