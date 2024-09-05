import todoStore, { Filters } from "../../store/todo-store";


let element;

/**
 * 
 * @param {String} elementId 
 */
export const renderPending = (elementId ) =>{

    if(!element){
        element =document.querySelector(elementId);
    }

    if(!element){
        throw new Error (`Element ${elementId} not Found`);
    }

    element.innerHtml =todoStore.getTodos(Filters.Pending).length;

}