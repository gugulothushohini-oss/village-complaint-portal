# To-Do List Application

A beautiful, feature-rich to-do list application with persistent local storage. Manage your daily tasks with priorities, filtering, sorting, and more!

## Features

✅ **Add Tasks** - Quickly add new tasks with priority levels
✅ **Task Priorities** - Set Low, Medium, or High priority for each task
✅ **Mark Complete** - Check off tasks as you complete them
✅ **Edit Tasks** - Modify existing tasks inline
✅ **Delete Tasks** - Remove tasks you no longer need
✅ **Filter Tasks** - View All, Active, or Completed tasks
✅ **Sort Tasks** - Sort by date, priority, or alphabetically
✅ **Statistics** - Track total, active, completed tasks and completion rate
✅ **Local Storage** - All data saved automatically in browser
✅ **Export Tasks** - Download tasks as JSON file
✅ **Import Tasks** - Upload previously exported JSON file
✅ **Reset All** - Clear all tasks at once
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Beautiful UI** - Modern gradient design with smooth animations

## Files Included

- **todo.html** - Main HTML structure
- **todo-style.css** - Complete styling with animations
- **todo-script.js** - Application logic and local storage

## How to Use

### 1. **Open the Application**
```
http://localhost/village-complaint-portal/todo.html
```

### 2. **Add a Task**
- Type your task in the input field
- Select priority (Low, Medium, High)
- Click "Add Task" or press Enter

### 3. **Manage Tasks**

**Mark Complete:**
- Check the checkbox next to a task
- Completed tasks appear faded with strikethrough

**Edit Task:**
- Click the "Edit" button
- Modify the text
- Click "Save" or "Cancel"

**Delete Task:**
- Click the "Delete" button
- Confirm the deletion

### 4. **Filter Tasks**
Use the filter buttons to view:
- **All** - All tasks
- **Active** - Incomplete tasks only
- **Completed** - Finished tasks only

### 5. **Sort Tasks**
Choose sorting options:
- **Newest First** - Recently added tasks first
- **Oldest First** - Previously added tasks first
- **Priority (High to Low)** - Organize by importance
- **Alphabetical** - Sort A-Z

### 6. **Clear Completed**
- Click "Clear Completed" to remove all finished tasks
- Useful for keeping the list clean

### 7. **Statistics**
Track your progress:
- **Total Tasks** - Number of all tasks
- **Active** - Number of incomplete tasks
- **Completed** - Number of finished tasks
- **Completion Rate** - Percentage of completed tasks

### 8. **Export Tasks**
- Click "📥 Export Tasks"
- Tasks are downloaded as a JSON file
- Great for backup or sharing

### 9. **Import Tasks**
- Click "📤 Import Tasks"
- Select a previously exported JSON file
- Choose to replace current tasks

### 10. **Reset All**
- Click "🔄 Reset All"
- Deletes all tasks permanently
- Requires confirmation

## Local Storage

All tasks are automatically saved to browser's local storage:
- Data persists across browser sessions
- No server required
- Stored locally on your device
- Works offline

**Storage Location:**
```javascript
localStorage.getItem('todoList')
```

## Priority Levels

### Low Priority
- Background color: Light Green
- Use for: Optional tasks, future planning

### Medium Priority
- Background color: Light Yellow
- Use for: Regular tasks, standard deadlines

### High Priority
- Background color: Light Red
- Use for: Urgent tasks, important deadlines

## Task Information

Each task displays:
- **Task Text** - The description of your task
- **Date Created** - When the task was added (📅)
- **Priority Badge** - Visual priority indicator
- **Completion Status** - Checked if completed

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Add task (when input focused) |
| Click Checkbox | Toggle completion |
| Click Edit | Start editing task |
| Click Save | Save edited task |

## Data Backup

### How to Backup:
1. Click "📥 Export Tasks"
2. Save the JSON file safely

### How to Restore:
1. Click "📤 Import Tasks"
2. Select your backup file
3. Confirm replacement

## Customization

### Change Colors
Edit `todo-style.css`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modify Priority Labels
Edit `todo-script.js`:

```javascript
const priorityOrder = { high: 1, medium: 2, low: 3 };
```

### Change Storage Key
Edit `todo-script.js`:

```javascript
localStorage.setItem('todoList', JSON.stringify(this.todos));
// Change 'todoList' to your custom key
```

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers
✅ Requires JavaScript enabled
✅ Requires localStorage support

## Tips & Tricks

1. **Organize by Priority** - Sort by priority to focus on important tasks
2. **Use Regular Exports** - Backup your tasks periodically
3. **Filter Active** - Focus on incomplete tasks to stay productive
4. **Check Stats** - Monitor completion rate for motivation
5. **Clear Completed** - Keep your list clean and manageable

## Use Cases

- 📚 Daily to-do list
- 🎯 Project tasks management
- 📋 Shopping list
- 🏃 Workout routines
- 📖 Reading list
- 🎓 Study tasks
- 🏠 Household chores
- 💼 Work assignments
- 🎨 Creative projects
- 🧹 Spring cleaning

## Troubleshooting

### Tasks Not Saving
- Check if localStorage is enabled
- Clear browser cache and try again
- Check browser storage limits

### Import Not Working
- Ensure file is valid JSON
- Check file format is `.json`
- Verify file structure matches export format

### Display Issues
- Clear browser cache
- Use latest browser version
- Check JavaScript is enabled

### Lost Tasks
- Check browser storage isn't cleared
- Tasks may be in "Completed" filter
- Try exporting from DevTools localStorage

## Browser Storage Info

- **Storage Type:** LocalStorage
- **Size Limit:** Usually 5-10MB per domain
- **Persistence:** Until manually cleared
- **Privacy:** Private per origin/domain
- **Sync:** Not synced across devices

## Performance

- **Lightweight** - Only 20KB total size
- **Fast** - Instant updates
- **Efficient** - Minimal resource usage
- **Responsive** - Smooth animations

## Accessibility

✅ Semantic HTML
✅ Keyboard navigation
✅ Clear labels
✅ High contrast colors
✅ Mobile-friendly touch targets
✅ Descriptive buttons

## Future Enhancements

- 📱 Mobile app version
- ☁️ Cloud sync across devices
- 🔔 Notifications and reminders
- 🏷️ Custom categories/tags
- 📅 Due date scheduling
- ⏰ Time-based reminders
- 🌙 Dark mode
- 🔐 Password protection
- 📊 Advanced statistics
- 🎵 Sound notifications

## Integration with Village Portal

Add to main navigation in `index.html`:

```html
<a href="todo.html">📝 To-Do List</a>
```

Or embed in iframe:

```html
<iframe src="todo.html" width="100%" height="800"></iframe>
```

## Support & Resources

- **GitHub:** https://github.com/gugulothushohini-oss/village-complaint-portal
- **LocalStorage API:** https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **JSON Guide:** https://www.json.org/

## License

Free to use for personal and educational purposes.

---

**Get organized and stay productive! 📝✨**