import { Todo } from "../todos/models/todo-model.js";

const Filters = {
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
  console.log(state);
  console.log("Init Store 👀");
};

const loadStore = () => {
  throw new Error("Not implemented");
};

const getTodos = (filter) => {
    switch (filter){
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done); //Va a regresar un nuevo array
        
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done); //Va a regresar un nuevo array
                
        default:
            throw new Error(`Option ${filter} is not valid.`);    
        }

};


/**
 *
 * @param {String} description
 */
const addTodo = (description) => {
    if(!description) throw new Error('Description is required');
    state.todos.push(new Todo(description));
};

/**
 *
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {

  state.todos=state.todos.map(todo => {
    if(todo.id === todoId){
      todo.done = !todo.done;
    }
    return todo;
  });

};

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    //Lo que se está haciendo es devolver el arreglo sin el id que se pasó como parámetro.
};

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done); //Elimina todos los que esté completados
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
