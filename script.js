const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');

// Array to store tasks
let tasks = [];

// LOAD TASKS FROM LOCALSTORAGE ON PAGE REFRESH
function loadTasks() {
    const savedTasks = localStorage.getItem('todos');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// SAVE TASKS TO LOCALSTORAGE
function saveTasks() {
    // Convert array to JSON string because localStorage only stores strings
    localStorage.setItem('todos', JSON.stringify(tasks));
}

// RENDER TASKS ON DOM
function renderTasks() {
    list.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span onclick="toggleComplete(${index})" style="cursor: pointer; flex: 1;">${task.text}</span>
            <div class="actions">
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// ADD TASK
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    tasks.push({ text: text, completed: false });
    saveTasks();
    renderTasks();
    input.value = '';
});

// MARK COMPLETE / INCOMPLETE
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// EDIT Task
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// DELETE task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Initial load when page opens
loadTasks();
renderTasks();