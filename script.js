document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const allBtn = document.getElementById('all-btn');
    const completedBtn = document.getElementById('completed-btn');
    const activeBtn = document.getElementById('active-btn');

    let tasks = [];

    // Function to add a new task
    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            const task = {
                id: Date.now(),
                name: taskName,
                completed: false,
            };
            tasks.push(task);
            taskInput.value = '';
            renderTasks(tasks);
        }
    });

    // Function to render tasks
    function renderTasks(tasksToRender) {
        taskList.innerHTML = '';
        tasksToRender.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            taskItem.setAttribute('data-id', task.id);

            const taskCheckbox = document.createElement('input');
            taskCheckbox.type = 'checkbox';
            taskCheckbox.classList.add('task-checkbox');
            taskCheckbox.checked = task.completed;
            taskCheckbox.addEventListener('click', () => toggleTaskStatus(task.id));

            const taskName = document.createElement('span');
            taskName.classList.add('task-name');
            taskName.textContent = task.name;
            if (task.completed) {
                taskName.style.textDecoration = 'line-through';
            }

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editTask(task.id));

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            taskItem.appendChild(taskCheckbox);
            taskItem.appendChild(taskName);
            taskItem.appendChild(editBtn);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }

    // Function to toggle task status (complete/incomplete)
    function toggleTaskStatus(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        renderTasks(tasks);
    }

    // Function to edit a task
    function editTask(id) {
        const newTaskName = prompt('Edit task name:');
        if (newTaskName) {
            tasks = tasks.map(task => {
                if (task.id === id) {
                    task.name = newTaskName;
                }
                return task;
            });
            renderTasks(tasks);
        }
    }

    // Function to delete a task
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks(tasks);
    }

    // Filter buttons event listeners
    allBtn.addEventListener('click', () => renderTasks(tasks));
    completedBtn.addEventListener('click', () => {
        const completedTasks = tasks.filter(task => task.completed);
        renderTasks(completedTasks);
    });
    activeBtn.addEventListener('click', () => {
        const activeTasks = tasks.filter(task => !task.completed);
        renderTasks(activeTasks);
    });
});
