document.addEventListener('DOMContentLoaded', function () {
    displayTasks();


    document.getElementById("input").addEventListener("keypress", function (event) {

        if (event.key === "Enter") {
            addTask();
            event.preventDefault();
        }
    });
});

function toggleImage(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let task = tasks.find(task => task.id === id);
    if (task.completed === true) {
        task.completed = false;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        task.completed = true;
        localStorage.setItem("tasks", JSON.stringify(tasks));

    }
    displayTasks();
}

function toggleSearch() {
    const searchImage = document.getElementById('search-image');
    const searchInput = document.getElementById('search-input');
    const closeSearch = document.getElementById('close-search');

    if (searchInput.style.display === 'none') {

        searchInput.style.display = 'block';
        searchInput.classList.add('open');
        closeSearch.style.display = 'block';


        searchImage.style.transform = 'rotate(450deg)';


        document.getElementById('search-container').style.zIndex = 11;
        document.getElementById('search-container').style.borderRadius = '40px 40px 40px 40px';
        document.getElementById('search-image').style.paddingLeft = '20px';

    } else {

        searchInput.style.display = 'none';
        searchInput.classList.remove('open');
        closeSearch.style.display = 'none';

        document.getElementById('search-container').style.zIndex = 1;
        document.getElementById('search-container').style.borderRadius = '0px 40px 40px 0px';
        document.getElementById('search-image').style.paddingBottom = '11px';
        document.getElementById('search-image').style.paddingLeft = '40px';
        searchImage.style.transform = 'rotate(0deg)';
    }
}

function closeSearch() {
    const searchImage = document.getElementById('search-image');
    const searchInput = document.getElementById('search-input');
    const closeSearch = document.getElementById('close-search');
    document.getElementById('search-container').style.zIndex = 1;
    document.getElementById('search-container').style.borderRadius = '0px 40px 40px 0px';
    document.getElementById('search-image').style.paddingBottom = '11px';
    document.getElementById('search-image').style.paddingLeft = '40px';

    searchInput.style.display = 'none';
    searchInput.classList.remove('open');
    closeSearch.style.display = 'none';

    searchImage.style.transform = 'rotate(0deg)';
}

function searchTasks() {
    let searchQuery = document.getElementById("search-input").value.toLowerCase();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery));

    displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(filteredTasks) {
    let tasksList = document.getElementById("Tasks-list");
    tasksList.innerHTML = '';

    filteredTasks.forEach(task => {
        let imgSrc = task.completed ? 'images/checked.png' : 'images/unchecked.png';
        let completedClass = task.completed ? 'completed-task' : '';

        let taskItem = `
            <li id="task-${task.id}">
                <ul class="list">
                    <li>
                        <button class="image-button" onclick="toggleImage(${task.id})">
                            <img src="${imgSrc}" alt="check-box" class="imag" data-id="${task.id}">
                        </button>
                    </li>
                    <li class="task">
                        <span class="task-title ${completedClass}">${task.title}</span>
                        <div class="edit-input-div" style="display: none;">
                            <input type="text" class="edit-input" placeholder="Enter a task" value="${task.title}">
                            <button class="save-btn" onclick="saveTask(${task.id})">Save</button>
                        </div>
                    </li>
                    <li class="edit">
                        <button class="image-button" onclick="edit(${task.id})">
                            <img src="images/editing.png" alt="edit" class="imag">
                        </button>
                    </li>
                    <li class="delete">
                        <button class="image-button" onclick="Delete(${task.id})">
                            <img src="images/recycle-bin.png" alt="delete" class="imag">
                        </button>
                    </li>
                </ul>
            </li>
        `;
        tasksList.insertAdjacentHTML('beforeend', taskItem);
    });
}


function Delete(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let newTasks = [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== id) {
            newTasks.push(tasks[i]);
        }
    }

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    displayTasks();
}
function edit(id) {
    let taskItem = document.getElementById(`task-${id}`);
    let taskTitle = taskItem.querySelector('.task-title');
    let editInputDiv = taskItem.querySelector('.edit-input-div');

    taskTitle.style.display = 'none';
    editInputDiv.style.display = 'block';
}

function saveTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskItem = document.getElementById(`task-${id}`);
    let editInput = taskItem.querySelector('.edit-input').value;

    if (editInput.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    let taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].title = editInput;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function clearTasks() {
    localStorage.removeItem("tasks");

    document.getElementById("Tasks-list").innerHTML = '';
}

function addTask() {
    let taskInput = document.getElementById("input").value;

    if (taskInput.trim() === "") {
        alert("Please write something first.");
        return; // Exit the function if the input is empty
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the highest existing task ID
    let maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);

    // Generate a new unique ID
    let newId = maxId + 1;

    // Create a new task with the unique ID
    let newTask = {
        id: newId,
        title: taskInput,
        completed: false
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    document.getElementById("input").value = '';
}

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let tasksList = document.getElementById("Tasks-list");
    tasksList.innerHTML = '';

    tasks.forEach(task => {
        let imgSrc = task.completed ? 'images/checked.png' : 'images/unchecked.png';
        let completedClass = task.completed ? 'completed-task' : '';

        let taskItem = `
            <li id="task-${task.id}">
                <ul class="list">
                    <li>
                        <button class="image-button" onclick="toggleImage(${task.id})">
                            <img src="${imgSrc}" alt="check-box" class="imag" data-id="${task.id}">
                        </button>
                    </li>
                    <li class="task">
                        <span class="task-title ${completedClass}">${task.title}</span>
                        <div class="edit-input-div" style="display: none;">
                            <input type="text" class="edit-input" placeholder="Enter a task" value="${task.title}">
                            <button class="save-btn" onclick="saveTask(${task.id})">Save</button>
                        </div>
                    </li>
                    <li class="edit">
                        <button class="image-button" onclick="edit(${task.id})">
                            <img src="images/editing.png" alt="edit" class="imag">
                        </button>
                    </li>
                    <li class="delete">
                        <button class="image-button" onclick="Delete(${task.id})">
                            <img src="images/recycle-bin.png" alt="delete" class="imag">
                        </button>
                    </li>
                </ul>
            </li>
        `;
        tasksList.insertAdjacentHTML('beforeend', taskItem);
    });
}