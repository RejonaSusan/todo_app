var options = { weekday: 'short',  month: 'long', day: 'numeric' };
let today = new Date();
let currentDay = today.toLocaleDateString("en-US", options);
document.getElementById('today').textContent = currentDay; 