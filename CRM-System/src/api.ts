const baseURL = 'https://easydev.club/api/v1';

export const getTasks = async (filter: string) => {
  try {
    const response = await fetch(`${baseURL}/todos?filter=${filter}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('getTaskError is', error);
  }
};

export const createTask = async (title: string) => {
  try {
    const response = await fetch(`${baseURL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDone: false, title: title }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('createTaskError is', error);
  }
};

export const removeTask = async (id: number) => {
  try {
    const response = await fetch(`${baseURL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log('removeTaskError is', error);
  }
};

export const changeTask = async (
  id: number,
  isDone: boolean,
  newTitle: string,
) => {
  try {
    const response = await fetch(`${baseURL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDone: isDone, title: newTitle }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('changeTaskError is', error);
  }
};
