import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useAppDispatch } from 'context/AppContext'

export default function TaskInput() {
  const { addTask } = useAppDispatch()
  const inputRef = React.useRef(null)
  const [task, setTask] = React.useState('')

  React.useEffect(() => {
    inputRef.current?.focus()
  })

  const onSubmit = e => {
    e.preventDefault()
    addTask(task)
    setTask('')
  }

  const onChange = e => {
    setTask(e.target.value)
  }

  return (
    <Form className='row my-3' onSubmit={onSubmit} autoComplete="off">
      <div className='col-5'>
        <Form.Label htmlFor='inputTodoName' className='visually-hidden'>
          Task Name
        </Form.Label>
        <Form.Control
          ref={element => { inputRef.current = element }}
          id='inputTodoName'
          type='text'
          placeholder='Add a task'
          onChange={onChange}
          value={task}
        />
      </div>
      <div className='col-2 g-0'>
        <Button
          variant='info'
          className='text-white'
          type='submit'
          disabled={!task.length}
        >
          Add Task
        </Button>
      </div>
    </Form>
  );
}