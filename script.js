// script.js

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    // Add task button event
    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task !== '') {
            addTaskToDOM({ text: task, completed: false });
            saveTasks();
            taskInput.value = '';
        }
    });

    // Initial load
    loadTasks();
});