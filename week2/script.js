const input = document.querySelector("#input");
const list = document.querySelector(".list");
const add = document.querySelector("#add");

function addTask() {
  if (input.value === "") {
    return;
  }
  const task = document.createElement("li");
  task.innerHTML = `
    <input type="checkbox" id="checkbox">
    <label>${input.value}</label>
    <button id="delete">🗑️</button>
  `;
  const deletebutton = task.querySelector("#delete");
  deletebutton.addEventListener("click", function () {
    task.remove();
  });
  const checkbox = task.querySelector("#checkbox");
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      task.style.textDecoration = "line-through";
      task.style.color = "grey";
      list.append(task);
    } else {
      task.style.textDecoration = "none";
      task.style.color = "black";
      list.prepend(task);
    }
  });
  list.append(task);
  input.value = "";
}

add.addEventListener("click", addTask);

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
