function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    li.innerText = task;

    // Mark as completed
    li.onclick = function() {
        li.style.textDecoration = "line-through";
    };

    // Delete button
    let btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.onclick = function() {
        li.remove();
    };

    li.appendChild(btn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}