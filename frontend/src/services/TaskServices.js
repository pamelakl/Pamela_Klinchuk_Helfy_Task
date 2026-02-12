const BACKEND_URL = "http://localhost:4000/api/tasks";

const handleResponse = async (response) => {
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const getAll = async () => {
    const data = await handleResponse(await fetch(BACKEND_URL));
    return data.data.tasks;
}

const create = async (title, description, priority) => {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority }),
    });
    const data = await handleResponse(response);
    return data.data.task;
}

const toggleComplete = async (taskId) => {
    const response = await fetch(`${BACKEND_URL}/${taskId}/toggle`, {
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await handleResponse(response);
    return data.data.task;
}

const remove = async (taskId) => {
    const response = await fetch(`${BACKEND_URL}/${taskId}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
}

const update = async (taskId, updatedFields) => {
    const response = await fetch(`${BACKEND_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
    })
    const data = await response.json();
    return data.data.task
}

export {
    getAll,
    create,
    toggleComplete,
    remove,
    update
}