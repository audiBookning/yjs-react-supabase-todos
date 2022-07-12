import { useEffect, useState } from 'react'

const AddItem = ({ onClick, editTodo }) => {
    const [inputValue, setInputValue] = useState({
        title: '',
    })
    useEffect(() => {
        if (editTodo && editTodo.title) {
            const clone = editTodo
            setInputValue(clone)
        }
    }, [editTodo])

    const onChangeHandler = (event) => {
        setInputValue({ ...inputValue, title: event.target.value })
    }

    return (
        <>
            <input
                type="text"
                placeholder="Add or update item"
                value={inputValue.title}
                onChange={onChangeHandler}
            />
            <button
                className="btn btn-primary"
                onClick={() => {
                    onClick(inputValue)
                    setInputValue({
                        title: '',
                    })
                }}
            >
                Add Item
            </button>
        </>
    )
}

export default AddItem
