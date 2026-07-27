const taskInput = document.getElementById('task-input')
const taskDate = document.getElementById('task-date')
const addTaskBtn = document.getElementById('add-task-btn')
const taskList = document.getElementById('task-list')

let tasks = JSON.parse(localStorage.getItem('plannerTasks') || '[]')

function saveTasks() {
  localStorage.setItem('plannerTasks', JSON.stringify(tasks))
}

function formatGroupLabel(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = Math.round((date - today) / 86400000)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'

  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}

function checkIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
}

function trashIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`
}

function emptyStateIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>`
}


function calcDaysLeft(dateStr) {
  const due = new Date(dateStr + 'T23:59:59')
  const now = new Date()
  return Math.floor((due - now) / 86400000)
}

function renderHomeUpcoming() {
  const homeList = document.getElementById('home-upcoming-list')
  if (!homeList) return

  const upcoming = tasks
    .filter(t => t.date && !t.done && calcDaysLeft(t.date) > 0)
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 3)

  homeList.innerHTML = upcoming.length ? '' :
    `<div class="planner-empty-sub" style="padding:16px;">No upcoming plans yet.</div>`

  upcoming.forEach(task => {
    const diff = calcDaysLeft(task.date)
    const item = document.createElement('div')
    item.className = 'upcoming-item'
    item.innerHTML = `
      <div class="up-icon blue">${emptyStateIcon()}</div>
      <div class="up-text">
        <div class="up-title">${task.text}</div>
        <div class="up-sub">Due: ${formatGroupLabel(task.date)}</div>
      </div>
      <div class="up-days blue">${diff} day${diff === 1 ? '' : 's'} left</div>
    `
    homeList.appendChild(item)
  })
}

function renderTasks() {
  taskList.innerHTML = ''

  if (!tasks.length) {
    taskList.innerHTML = `
      <div class="planner-empty">
        <div class="planner-empty-icon">${emptyStateIcon()}</div>
        <div class="planner-empty-title">No tasks yet</div>
        <div class="planner-empty-sub">Add a task above to start planning your study schedule.</div>
      </div>
    `
    return
  }


  // sort by date ascending
  const sorted = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date))

  // group by date
  const groups = {}
  sorted.forEach(task => {
    const key = task.date || 'No date'
    if (!groups[key]) groups[key] = []
    groups[key].push(task)
  })

  Object.keys(groups).forEach(dateKey => {
    const groupDiv = document.createElement('div')
    groupDiv.className = 'task-group'

    const label = document.createElement('div')
    label.className = 'task-group-label'
    label.textContent = dateKey === 'No date' ? 'No date' : formatGroupLabel(dateKey)
    groupDiv.appendChild(label)

    groups[dateKey].forEach(task => {
      const item = document.createElement('div')
      item.className = 'task-item' + (task.done ? ' done' : '')
      item.dataset.id = task.id

      item.innerHTML = `
        <div class="task-check">${checkIcon()}</div>
        <div class="task-text">
          <div class="task-title">${task.text}</div>
        </div>
        <div class="task-delete">${trashIcon()}</div>
      `

      item.querySelector('.task-check').addEventListener('click', () => {
        task.done = !task.done
        saveTasks()
        renderTasks()
        renderHomeUpcoming()
      })

      item.querySelector('.task-delete').addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id)
        saveTasks()
        renderTasks()
        renderHomeUpcoming()
      })

      groupDiv.appendChild(item)
    })

    taskList.appendChild(groupDiv)
  })
}

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim()
  const date = taskDate.value

  if (!text) {
    taskInput.focus()
    return
  }

  tasks.push({
    id: Date.now().toString(),
    text,
    date: date || null,
    done: false
  })

  saveTasks()
  renderTasks()
 renderHomeUpcoming()
  taskInput.value = ''
  taskDate.value = ''
})

renderTasks()
renderHomeUpcoming()
