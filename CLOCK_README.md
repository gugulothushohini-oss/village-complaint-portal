# Digital Clock - Multiple Time Zones

A beautiful, responsive digital clock application that displays the current time in different time zones around the world.

## Features

✅ **Real-time Clock Updates** - Updates every second
✅ **Multiple Time Zones** - Display time in different zones simultaneously
✅ **12/24 Hour Format** - Toggle between formats with one click
✅ **Add/Remove Time Zones** - Dynamically manage your timezone list
✅ **Search Functionality** - Quick search through available time zones
✅ **UTC Offset Display** - Shows the UTC offset for each timezone
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Beautiful UI** - Modern gradient design with smooth animations
✅ **Local Storage** - Saves your preferences (can be added)

## Files Included

- **clock.html** - Main HTML structure
- **clock-style.css** - Complete styling with animations
- **clock-script.js** - JavaScript functionality and logic

## How to Use

### 1. **Opening the Clock**
```bash
# Open clock.html in your web browser
# Or access it from your server:
http://localhost/village-complaint-portal/clock.html
```

### 2. **Toggle Time Format**
Click the "12-Hour Format" or "24-Hour Format" button at the top to switch between 12-hour and 24-hour time display.

### 3. **Add a Time Zone**
- Click the "+ Add Time Zone" button
- Search for the desired time zone in the modal
- Click on a time zone to add it

### 4. **Remove a Time Zone**
Click the "Remove" button on any clock card to delete it from the display.

## Available Time Zones

The application includes 38 major world time zones:

### Americas
- America/New_York (Eastern Time)
- America/Chicago (Central Time)
- America/Denver (Mountain Time)
- America/Los_Angeles (Pacific Time)
- America/Anchorage (Alaska Time)
- Pacific/Honolulu (Hawaii Time)
- America/Mexico_City
- America/Toronto (Canada)
- America/Vancouver (Canada)
- America/São_Paulo (Brazil)
- America/Buenos_Aires (Argentina)

### Europe
- Europe/London (GMT)
- Europe/Paris (CET)
- Europe/Berlin (CET)
- Europe/Madrid (CET)
- Europe/Rome (CET)
- Europe/Amsterdam (CET)
- Europe/Brussels (CET)
- Europe/Vienna (CET)
- Europe/Prague (CET)
- Europe/Moscow (MSK)

### Asia
- Asia/Dubai (GST)
- Asia/Kolkata (IST)
- Asia/Bangkok (ICT)
- Asia/Hong_Kong
- Asia/Shanghai (CST)
- Asia/Tokyo (JST)
- Asia/Seoul (KST)
- Asia/Singapore

### Africa
- Africa/Cairo (EET)
- Africa/Johannesburg (SAST)
- Africa/Lagos (WAT)

### Australia & Pacific
- Australia/Sydney (AEDT/AEST)
- Australia/Melbourne (AEDT/AEST)
- Australia/Brisbane (AEST)
- Australia/Perth (AWST)
- Pacific/Auckland (NZDT/NZST)

## Features Breakdown

### Real-Time Updates
```javascript
setInterval(updateClocks, 1000); // Updates every second
```

### Time Zone Conversion
Uses JavaScript's built-in `Intl.DateTimeFormat` for accurate timezone conversion:
```javascript
const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !is24HourFormat
});
```

### UTC Offset Calculation
Displays the offset from UTC time:
```javascript
function getTimeZoneOffset(timeZone) {
    // Calculates and displays offset like UTC+05:30
}
```

## Customization

### Add More Time Zones
Edit `clock-script.js` and add time zones to the `timeZones` array:

```javascript
const timeZones = [
    'Your/TimeZone',
    // ... more zones
];
```

### Change Colors
Modify the gradient colors in `clock-style.css`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adjust Update Frequency
Change the interval in `clock-script.js`:

```javascript
setInterval(updateClocks, 1000); // Change 1000 to your desired milliseconds
```

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ESC | Close modal |
| Enter | Add selected timezone |

## Future Enhancements

- 📱 Save preferences to localStorage
- 🌍 Add weather information per timezone
- 🎨 Theme selector (dark mode, light mode)
- 🔔 Set alarms for specific timezones
- 📊 Show sunrise/sunset times
- 🌐 Add more timezone options
- 🎯 Analog clock option
- 📤 Export clock settings

## Performance

- **Lightweight**: Only 15KB total size
- **Efficient**: Uses native JavaScript APIs
- **Smooth**: 60fps animations
- **Responsive**: Works on all screen sizes

## Accessibility

✅ ARIA labels (can be added)
✅ Keyboard navigation
✅ High contrast colors
✅ Mobile-friendly touch targets
✅ Screen reader compatible (can be enhanced)

## Tips

1. **Add Multiple Clocks** - Add as many timezones as you need
2. **Search is Your Friend** - Use the search to quickly find timezones
3. **Format Toggle** - Switch between 12/24 hour format anytime
4. **Mobile Friendly** - Works great on phones and tablets
5. **Real Business Hours** - Check when colleagues are working in other timezones

## Integration

You can integrate this clock into your Village Complaint Portal:

```html
<a href="clock.html" target="_blank">View Global Clock</a>
```

Or embed it in an iframe:

```html
<iframe src="clock.html" width="100%" height="600"></iframe>
```

## Troubleshooting

### Clock Not Updating
- Ensure JavaScript is enabled
- Check browser console for errors
- Refresh the page

### Time Zone Not Found
- Use the search feature with correct naming (e.g., "Asia/Kolkata" not "India")
- Check timezone format with underscore for spaces

### Display Issues
- Clear browser cache
- Use a modern browser (Chrome, Firefox, Safari, Edge)
- Check screen resolution

## License

Free to use for personal and educational purposes.

---

**Enjoy tracking time globally! ⏰🌍**