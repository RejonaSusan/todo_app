var options = { weekday: 'long', day: 'numeric',  month: 'short' };
let today = new Date();
let currentDay = today.toLocaleDateString("en-US", options);
document.getElementById('today').textContent = currentDay; 