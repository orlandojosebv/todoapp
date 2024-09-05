import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo-store.js";
import { renderTodos, renderPending } from "./useCases/index.js";

const ElementIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompleted: ".clear-completed",
  TodoFilters: ".filtro",
  PendingCount: "#pending-count",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(ElementIds.PendingCount);
  };

  //Cuando la función App() se llama

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })(); //Hasta que se llame a esta función es que se va a buscar en DOM, porque si lo coloco antes no va a encontrar nada.

  //referencias HTML
  const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
  const todoListUl = document.querySelector(ElementIds.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIds.ClearCompleted
  );
  const filtersLi = document.querySelectorAll(ElementIds.TodoFilters); //Devuelve un arreglo

  //Listeners

  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return; //Signifique que cualquier tecla lo saca, es decir no va a continuar con la función.
    if (event.target.value.trim().length === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });

  todoListUl.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]"); //Busca el elemento padre más cercano que tenga el id "data-id"
    todoStore.toggleTodo(element.getAttribute("data-id"));
    displayTodos();
  });

  todoListUl.addEventListener("click", (event) => {
    const isDestroyElement = event.target.className === "destroy";
    const element = event.target.closest("[data-id]");

    if (isDestroyElement) {
      todoStore.deleteTodo(element.getAttribute("data-id"));
      displayTodos();
    } else {
      return;
    }
  });

  clearCompletedButton.addEventListener("click", (event) => {
    const element = event.target.className;

    if (element !== "clear-completed") return;

    todoStore.deleteCompleted();
    displayTodos();
  });

  filtersLi.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersLi.forEach((el) => el.classList.remove("selected"));
      element.target.classList.add("selected");
      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });
};
