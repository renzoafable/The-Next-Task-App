export default function Input() {
  return (
    <form className="row my-3">
      <div className="col-5">
        <label htmlFor="inputTodoName" className="visually-hidden">Password</label>
        <input type="text" className="form-control" id="inputTodoName" placeholder="Add a task" />
      </div>
      <div className="col-2 g-0">
        <button type="submit" className="btn btn-info text-white">Add Task</button>
      </div>
    </form>
  )
}