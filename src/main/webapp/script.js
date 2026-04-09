let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isDark = JSON.parse(localStorage.getItem("darkMode")) || false;

/* SAVE TASKS */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* SAVE THEME */
function saveTheme() {
  localStorage.setItem("darkMode", JSON.stringify(isDark));
}

/* RENDER TASKS */
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<p style='text-align:center;opacity:0.6'>No tasks yet 🚀</p>";
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.className = `${task.priority} ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

/* ADD TASK */
function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    priority: priority,
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

/* DELETE TASK */
function deleteTask(index) {
  if (!confirm("Delete this task?")) return;

  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

/* TOGGLE COMPLETE */
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

/* EDIT TASK */
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);

  if (newText && newText.trim() !== "") {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

/* DARK MODE */
function toggleDarkMode() {
  isDark = !isDark;
  document.body.classList.toggle("dark", isDark);
  saveTheme();
}

/* LOAD THEME */
function loadTheme() {
  if (isDark) {
    document.body.classList.add("dark");
  }
}

/* INIT */
loadTheme();
renderTasks();