// List of all available time zones
const timeZones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Madrid',
    'Europe/Rome',
    'Europe/Amsterdam',
    'Europe/Brussels',
    'Europe/Vienna',
    'Europe/Prague',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Hong_Kong',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Asia/Seoul',
    'Asia/Singapore',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Brisbane',
    'Australia/Perth',
    'Pacific/Auckland',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Africa/Lagos',
    'America/Mexico_City',
    'America/Toronto',
    'America/Vancouver',
    'America/São_Paulo',
    'America/Buenos_Aires',
];

let is24HourFormat = false;
let selectedTimeZones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];

// DOM Elements
const clocksContainer = document.getElementById('clocksContainer');
const toggleFormatBtn = document.getElementById('toggleFormat');
const addTimeZoneBtn = document.getElementById('addTimeZone');
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');
const searchInput = document.getElementById('searchInput');
const timeZoneList = document.getElementById('timeZoneList');

// Initialize
function init() {
    populateTimeZoneList();
    updateClocks();
    setInterval(updateClocks, 1000);
}

// Toggle 12/24 hour format
toggleFormatBtn.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    toggleFormatBtn.textContent = is24HourFormat ? '24-Hour Format' : '12-Hour Format';
    updateClocks();
});

// Add time zone button
addTimeZoneBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    searchInput.focus();
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Search time zones
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterTimeZones(searchTerm);
});

// Populate time zone list
function populateTimeZoneList(filter = '') {
    timeZoneList.innerHTML = '';
    
    const filteredZones = timeZones.filter(tz => 
        !selectedTimeZones.includes(tz) && 
        tz.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredZones.length === 0) {
        timeZoneList.innerHTML = '<p style="text-align: center; color: #999;">No time zones found</p>';
        return;
    }

    filteredZones.forEach(tz => {
        const option = document.createElement('div');
        option.className = 'timezone-option';
        option.textContent = tz.replace(/_/g, ' ');
        option.addEventListener('click', () => {
            addTimeZone(tz);
        });
        timeZoneList.appendChild(option);
    });
}

// Filter time zones
function filterTimeZones(filter) {
    populateTimeZoneList(filter);
}

// Add time zone
function addTimeZone(tz) {
    if (!selectedTimeZones.includes(tz)) {
        selectedTimeZones.push(tz);
        updateClocks();
        modal.classList.add('hidden');
        searchInput.value = '';
        populateTimeZoneList();
    }
}

// Remove time zone
function removeTimeZone(tz) {
    selectedTimeZones = selectedTimeZones.filter(t => t !== tz);
    updateClocks();
}

// Get current time in specific timezone
function getTimeInTimeZone(timeZone) {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24HourFormat
    });
    
    return formatter.format(date);
}

// Get timezone offset
function getTimeZoneOffset(timeZone) {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timeZone }));
    
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    const sign = offset >= 0 ? '+' : '';
    const hours = Math.floor(Math.abs(offset));
    const minutes = (Math.abs(offset) % 1) * 60;
    
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Update all clocks
function updateClocks() {
    clocksContainer.innerHTML = '';
    
    selectedTimeZones.forEach(tz => {
        const timeString = getTimeInTimeZone(tz);
        const [date, time] = timeString.split(', ');
        const offset = getTimeZoneOffset(tz);
        const displayName = tz.replace(/_/g, ' ');
        
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.innerHTML = `
            <div class="timezone-name">
                <span>${displayName}</span>
                <button class="remove-btn" onclick="removeTimeZone('${tz}')">Remove</button>
            </div>
            <div class="date-display">${date}</div>
            <div class="time-display">${time}</div>
            <div class="offset">${offset}</div>
        `;
        
        clocksContainer.appendChild(card);
    });
}

// Initialize the app
init();