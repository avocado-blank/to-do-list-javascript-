const toDoInput = document.querySelector('.todo-input')
const toDoButton = document.querySelector('.todo-button')
const toDoList = document.querySelector('.todo-list')
const filterList = document.querySelector('.filter-todo')
// console.log(toDoButton)
const addToDo = (e) => {
  e.preventDefault()

  // console.log('click')
  // console.log(toDoInput.value)

  const toDoDiv = document.createElement('div')
  toDoDiv.classList.add('todo')

  const newToDo = document.createElement('li')
  newToDo.innerText = toDoInput.value

  toDoDiv.appendChild(newToDo)

  storeLocal(toDoInput.value)

  const completeButton = document.createElement('button')
  completeButton.innerHTML = '<i class="fas fa-check"></i>'
  completeButton.classList.add('complete-btn')

  toDoDiv.appendChild(completeButton)

  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')

  toDoDiv.appendChild(trashButton)

  toDoList.appendChild(toDoDiv)

  toDoInput.value = ''
}

const deleteCheck = (e) => {
  // console.log(e.target)
  const item = e.target
  // console.log(item.parentElement)
  // console.log(item.classList)
  // console.log(item.classList[0])
  // console.log(item.classList.value)

  const data = item.classList.value
  if (data === 'trash-btn') {
    item.parentElement.classList.add('fall')
    const todo = item.parentElement
    // console.log(item.parentElement)
    // console.log(todo)
    deleteLocalData(todo)
    todo.addEventListener('transitionend', () => {
      todo.remove()
      // console.log('deleted')
    })
    // item.parentElement.remove()
  }
  // if (item.classList[0] === 'trash-btn') {
  //   console.log(item.parentElement)
  //   item.parentElement.remove()
  // }

  if (data === 'complete-btn') {
    item.parentElement.classList.toggle('completed')
  }
}

const filterTodo = (e) => {
  const todos = toDoList.childNodes
  console.log(todos)
  console.log(e.target)
  console.log(e.target.value)

  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break

      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break

      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}
let todos
const checkLocal = (todo) => {
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
}

const storeLocal = (todo) => {
  checkLocal(todo)
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

const getLocalData = () => {
  checkLocal()
  todos.forEach((todo) => {
    // console.log(todo)
    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('todo')

    const newToDo = document.createElement('li')
    newToDo.innerText = todo

    toDoDiv.appendChild(newToDo)

    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn')

    toDoDiv.appendChild(completeButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')

    toDoDiv.appendChild(trashButton)

    toDoList.appendChild(toDoDiv)
  })
}

const deleteLocalData = (todo) => {
  checkLocal()
  console.log(todo.children[0].innerText)
  todos.splice(todos.indexOf(todo.children[0].innerText), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}

document.addEventListener('DOMContentLoaded', getLocalData)
toDoButton.addEventListener('click', addToDo)
toDoList.addEventListener('click', deleteCheck)
filterList.addEventListener('click', filterTodo)

// when we reload the page completed tasks go normally
// we will find the way
