import "../styles/TaskFilter.css";

export default function TaskFilter({ filter, setFilter}) {
  const filterOptions = ["all", "uncompleted", "completed"];

  return (
    <div className="task-filter-container">
        <div className="filter-group">
            {filterOptions.map((f) => (
            <button
                key={f}
                className={`filter-btn ${filter === f ? "uncompleted" : ""}`}
                onClick={() => setFilter(f)}
            >
                {f}
            </button>
            ))}
        </div>
    </div>
  );
}