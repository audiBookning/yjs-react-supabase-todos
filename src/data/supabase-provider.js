import { createClient } from '@supabase/supabase-js'

let supabaseClient

function newClient(config) {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY
    return createClient(supabaseUrl, supabaseKey)
}

// INFO: util function to get the difference between 2 objects properties
function diffTwoObjects(object1, object2) {
    const difference = {}
    for (const _key of Object.keys(object1)) {
        if (object2[_key] && object2[_key] !== object1[_key]) {
            difference[_key] = object2[_key]
        }
    }
    return difference
}

// INFO: Main function to linkk supabase with yjs
export const SupabaseProvider = (ymap, callback) => {
    if (supabaseClient) return supabaseClient

    supabaseClient = newClient()

    ymap.observe((YEvent, transaction) => {
        // get the changed key and its old value
        const changedKey = YEvent.changes.keys.entries() //.get('action')
        for (const [key, value] of changedKey) {
            // {action: "add" | "update" | "delete"; oldValue: any;}
            switch (value.action) {
                case 'add':
                    const formated = renameKeys(
                        { createdAt: 'created_at', updatedAt: 'updated_at' },
                        ymap.get(key)
                    )
                    supabaseInsert(formated)
                    break
                case 'update':
                    // Todo: use supabaseUpsert for add and update?

                    const changedValues = diffTwoObjects(
                        value.oldValue,
                        ymap.get(key)
                    )

                    const updatedFormated = renameKeys(
                        { createdAt: 'created_at', updatedAt: 'updated_at' },
                        changedValues
                    )

                    supabaseUpdate(key, updatedFormated)
                    break
                case 'delete':
                    supabaseDelete(key)
                    break
                default:
            }
        }

        callback(true)
    })
}

// INFO: util function used here to rename the keys createdAt and updatedAt for compatibility with Supabase
function renameKeys(newKeys, obj) {
    const keyValues = Object.keys(obj)
        // TODO: filter editing key until schema is corrected to not use it
        .filter((f) => f !== 'editing')
        .map((key) => {
            const newKey = newKeys[key] || key
            return { [newKey]: obj[key] }
        })
    return Object.assign({}, ...keyValues)
}

async function supabaseUpdate(id, newValues) {
    const { data, error } = await supabaseClient
        .from('todos')
        .update(newValues)
        .match({ id })
    if (error) console.log('supabaseUpdate error', error)
}

async function supabaseInsert(newValues) {
    const { data, error } = await supabaseClient
        .from('todos')
        .insert([newValues], { upsert: true })
    if (error) console.log('supabaseInsert error', error)
}

async function supabaseDelete(id) {
    const { data, error } = await supabaseClient
        .from('todos')
        .delete()
        .match({ id })
    if (error) console.log('supabaseDelete error', error)
}
