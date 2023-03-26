
const  form =document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList') 
// console.log(form)
// console.log(taskInput)


let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) =>renderTask(task));
}



checkEmptyList()
// Добавление задачи
form.addEventListener('submit', addTask)

// Удаление задачи, весим на весь список задач
tasksList.addEventListener('click', deleteTask) 

// Отмечаю задачу выполненной
tasksList.addEventListener('click',doneTask)

// Функция добавления
function addTask (event) {
    event.preventDefault();
    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask)
    
    renderTask(newTask)
 
 taskInput.value = ''
 taskInput.focus()
 
//  if (tasksList.children.length>1) {
//      emptyList.classList.add('none')
//  }
checkEmptyList()

saveToLocalStorage()
}
// Фунуция удаления задачи из спсика
function deleteTask(event) {
// Как вариант проверить нажат ли то что нам не нужно и выйти
    // if  if (event.target.dataset.action !== 'delete') return

     if (event.target.dataset.action === 'delete') {
        // console.log("DEL ")
        const parentNode = event.target.closest('.list-group-item')

        const id = Number(parentNode.id)
        // Первый метод. Поиск индекса и выризание их массива
        // const index = tasks.findIndex( (task) => task.id === id )
        // tasks.splice(index,1)
        tasks = tasks.filter((task) => task.id !== id )
        parentNode.remove()
        saveToLocalStorage()
       
        // if (tasksList.children.length === 1) {
        //     emptyList.classList.remove('none')
        // }
        checkEmptyList()
    }
     
}

// Функция выполнения задачи
function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-group-item')
        const id = Number(parentNode.id)
        
        const task = tasks.find( (task) => task.id===id)
        // Работа с объектом
        task.done = !task.done

        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
        saveToLocalStorage()
    }

}

function checkEmptyList(){
   if (tasks.length ===0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
    <div class="empty-list__title">Список дел пуст</div>
    </li>`
    tasksList.insertAdjacentHTML('afterbegin',emptyListHTML)
   } else {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove():null
   }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks',JSON.stringify(tasks))
} 

function renderTask(task) {
// Формирую CSS класс
const cssClass = task.done ? "task-title task-title--done" : "task-title"
const taskHTML = `<li id="${task.id}"  class="list-group-item d-flex justify-content-between task-item">
<span class="${cssClass}">${task.text}</span>
<div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
    </button>
    <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
    </button>
</div>
</li>`

tasksList.insertAdjacentHTML('beforeend',taskHTML); 
}