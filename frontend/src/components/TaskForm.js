import "../styles/TaskForm.css";

export default function TaskForm({ title, description, priority, setTitle, setDescription, setPriority, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
        Add new Task: 
        <label>
            Title
            <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
        </label>
        <label>
            Description
            <input
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </label>
        <label>
            Priority
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </label>
        <button type="submit" className="form-submit">Submit</button>
    </form>
  );
}
