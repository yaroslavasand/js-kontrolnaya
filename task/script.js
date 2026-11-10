/* ============================================================
   СПИСОК ЗАДАЧ

   Код запускается, в консоли чисто. Но четыре кнопки работают
   не так, как обещает их название.

   Найдите четыре ошибки, почините их и опишите каждую
   в файле ОТВЕТЫ.md, часть B.
   ============================================================ */

let tasks = [
  { id: 1, text: "Напечатать раздаточные материалы", priority: 10 },
  { id: 2, text: "Проверить звук в аудитории", priority: 2 },
  { id: 3, text: "Собрать стенд", priority: 3 },
  { id: 4, text: "Договориться о кофе-брейке", priority: 9 },
];

const listEl = document.querySelector("#list");
const actionsEl = document.querySelector("#actions");
const sortBtn = document.querySelector("#sortBtn");
const filterBtn = document.querySelector("#filterBtn");

/* ---------- счётчик действий ---------- */

function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

/* ---------- отрисовка ---------- */

function render() {
  listEl.textContent = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "item";
    item.dataset.id = task.id;

    const text = document.createElement("span");
    text.className = "item__text";
    text.textContent = task.text;

    const priority = document.createElement("span");
    priority.className = "item__priority";
    priority.textContent = "важность " + task.priority;

    const removeBtn = document.createElement("button");
    removeBtn.className = "item__remove";
    removeBtn.type = "button";
    removeBtn.textContent = "Удалить";
    removeBtn.addEventListener("click", () => removeTask(item.dataset.id));

    item.append(text, priority, removeBtn);
    listEl.append(item);
  });
}

/* ---------- удаление ---------- */

function removeTask(id) {
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  render();
}

/* ---------- сортировка по важности ---------- */

sortBtn.addEventListener("click", function () {
    tasks.sort((a, b) => b.priority - a.priority);
  render();
});

/* ---------- фильтр: только важные ---------- */

filterBtn.addEventListener("click", function () {
  tasks = tasks.filter((task) => task.priority >= 5);
  render();
});

/* ---------- счётчик нажатий ---------- */

const countActions = createCounter();

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    actionsEl.textContent = countActions();
  });
});

render();
