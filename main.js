// import { addTodo } from "./JS/addTodo";
// import { saveToLs } from "./JS/saveToLs";

const refs = {
    form: document.querySelector("#form"),
    input: document.querySelector("#input"),
    list: document.querySelector("#todos"),
};

function renderTodos() {
    const saveTodos = localStorage.getItem("todos");

    if (saveTodos) {
        const parsedTodos = JSON.parse(saveTodos);
        parsedTodos.forEach((todo) => addTodo(todo));
        return;
    }
    refs.form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const data = {
            text: refs.input.value,
            completed: false,
        };
        // -------------------
        if (!data.text) {
            return;
        }
        // guard close
        addTodo(data);
        saveToLs();
        evt.target.reset();
    });
}

renderTodos();

function addTodo({ text, completed }) {
    const li = document.createElement("li");
    li.innerText = text;
    if (completed) {
        li.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.innerHTML = `<svg class="icon">
            <use href="/img-svg/bin.svg#icon-bin2"></use>
        </svg>`;
    deleteButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        li.remove();
        saveToLs();
    });
    li.append(deleteButton);

    refs.list.append(li);
    saveToLs();

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveToLs();
    });
}
function saveToLs() {
    const todos = refs.list.querySelectorAll("li");
    const dataArr = [];
    todos.forEach((item) => {
        dataArr.push({
            text: item.textContent,
            completed: item.classList.contains("completed"),
        });
    });
    localStorage.setItem("todos", JSON.stringify(dataArr));
}
