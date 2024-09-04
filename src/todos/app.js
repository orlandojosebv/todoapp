import html from "./app.html?raw";
import todoStore from "../store/todo-store.js";
import { renderTodos } from "./useCases/renderTodos.js";

const ElementIds = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIds.TodoList, todos);
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
    console.log(event.target.className);

    const isDestroyElement =event.target.className === 'destroy';
    const element = event.target.closest("[data-id]"); 

    if(isDestroyElement){
      todoStore.deleteTodo(element.getAttribute("data-id"));
      displayTodos();

    }else{
      return;
    }
    
  });

};
