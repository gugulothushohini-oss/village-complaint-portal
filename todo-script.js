// Todo List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.currentSort = 'date-desc';
        this.editingId = null;
        
        this.initElements();
        this.initEventListeners();
        this.render();
    }

    initElements() {
        this.todoInput = document.getElementById('todoInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.sortSelect = document.getElementById('sortSelect');
        
        this.totalTasksEl = document.getElementById('totalTasks');
        this.activeTasksEl = document.getElementById('activeTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.completionRateEl = document.getElementById('completionRate');
        
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.importFile = document.getElementById('importFile');
        this.resetBtn = document.getElementById('resetBtn');
    }

    initEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.id));
        });
        
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.render();
        });
        
        this.exportBtn.addEventListener('click', () => this.exportTodos());
        this.importBtn.addEventListener('click', () => this.importFile.click());
        this.importFile.addEventListener('change', (e) => this.importTodos(e));
        this.resetBtn.addEventListener('click', () => this.resetAll());
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) {
            alert('Please enter a task!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: this.prioritySelect.value,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.todoInput.value = '';
        this.render();
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
            this.render();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    startEdit(id) {
        this.editingId = id;
        this.render();
        const input = document.querySelector(`#edit-input-${id}`);
        if (input) input.focus();
    }

    saveEdit(id) {
        const input = document.querySelector(`#edit-input-${id}`);
        const newText = input.value.trim();
        
        if (!newText) {
            alert('Task cannot be empty!');
            return;
        }
        
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.text = newText;
            this.saveTodos();
            this.editingId = null;
            this.render();
        }
    }

    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }
        
        if (confirm(`Clear ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.render();
        }
    }

    setFilter(filterId) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        document.getElementById(filterId).classList.add('active');
        
        this.currentFilter = filterId.replace('filter', '').toLowerCase();
        this.render();
    }

    getFilteredTodos() {
        let filtered = this.todos;
        
        if (this.currentFilter === 'active') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        }
        
        return this.sortTodos(filtered);
    }

    sortTodos(todos) {
        const copy = [...todos];
        
        switch (this.currentSort) {
            case 'date-desc':
                return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'date-asc':
                return copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'priority':
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                return copy.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            case 'name':
                return copy.sort((a, b) => a.text.localeCompare(b.text));
            default:
                return copy;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
        
        this.totalTasksEl.textContent = total;
        this.activeTasksEl.textContent = active;
        this.completedTasksEl.textContent = completed;
        this.completionRateEl.textContent = rate + '%';
    }

    render() {
        const filtered = this.getFilteredTodos();
        
        // Update stats
        this.updateStats();
        
        // Update empty state
        if (this.todos.length === 0) {
            this.emptyState.classList.remove('hidden');
            this.todoList.innerHTML = '';
            return;
        } else {
            this.emptyState.classList.add('hidden');
        }
        
        // Render todos
        this.todoList.innerHTML = filtered.map(todo => this.createTodoElement(todo)).join('');
        
        // Attach event listeners
        this.attachTodoListeners();
    }

    createTodoElement(todo) {
        const isEditing = this.editingId === todo.id;
        const date = new Date(todo.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        if (isEditing) {
            return `
                <div class="todo-item editing">
                    <input 
                        type="text" 
                        id="edit-input-${todo.id}" 
                        class="edit-input" 
                        value="${this.escapeHtml(todo.text)}"
                    >
                    <div class="edit-actions">
                        <button class="save-btn" data-id="${todo.id}" data-action="save">Save</button>
                        <button class="cancel-btn" data-action="cancel">Cancel</button>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    data-id="${todo.id}"
                    data-action="toggle"
                >
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-meta">
                        <span class="todo-date">📅 ${date}</span>
                        <span class="priority-badge ${todo.priority}">
                            ${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        </span>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="todo-btn edit-btn" data-id="${todo.id}" data-action="edit">Edit</button>
                    <button class="todo-btn delete-btn" data-id="${todo.id}" data-action="delete">Delete</button>
                </div>
            </div>
        `;
    }

    attachTodoListeners() {
        // Checkbox listeners
        document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTodo(parseInt(e.target.dataset.id));
            });
        });
        
        // Button listeners
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const id = parseInt(e.target.dataset.id);
                
                if (action === 'delete') this.deleteTodo(id);
                else if (action === 'edit') this.startEdit(id);
                else if (action === 'save') this.saveEdit(id);
                else if (action === 'cancel') this.cancelEdit();
                else if (action === 'toggle') this.toggleTodo(id);
            });
        });
    }

    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    importTodos(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    if (confirm('Replace current tasks with imported tasks?')) {
                        this.todos = imported;
                        this.saveTodos();
                        this.render();
                        alert('Tasks imported successfully!');
                    }
                } else {
                    alert('Invalid file format!');
                }
            } catch (error) {
                alert('Error reading file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    resetAll() {
        if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone!')) {
            this.todos = [];
            this.saveTodos();
            this.render();
            alert('All tasks have been deleted!');
        }
    }

    saveTodos() {
        localStorage.setItem('todoList', JSON.stringify(this.todos));
    }

    loadTodos() {
        const stored = localStorage.getItem('todoList');
        return stored ? JSON.parse(stored) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new TodoApp();