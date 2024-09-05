import { Todo } from "../todos/models/todo-model.js";

export const Filters = {
  All: "all",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
    new Todo("Piedra del poder"),
    new Todo("Piedra de la realidad"),
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("Init Store 👀");
};

const loadStore = () => {
  if (!localStorage.getItem("state")) return;

  const {todos = [], filter = filter.All} = JSON.parse(localStorage.getItem("state"));
  state.todos =todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem("state", JSON.stringify(state));
};

const getTodos = (filter) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];

    case Filters.Completed:
      return state.todos.filter((todo) => todo.done); //Va a regresar un nuevo array

    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done); //Va a regresar un nuevo array

    default:
      throw new Error(`Option ${filter} is not valid.`);
  }
};

/**
 *
 * @param {String} description
 */
const addTodo = (description) => {
  if (!description) throw new Error("Description is required");
  state.todos.push(new Todo(description));
  saveStateToLocalStorage();
};

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocalStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  //Lo que se está haciendo es devolver el arreglo sin el id que se pasó como parámetro.
  saveStateToLocalStorage();
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done); //Elimina todos los que esté completados
  saveStateToLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filter.All) => {
  state.filter = newFilter;
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
