let timers = []; // Array to store timer values

function updateTime() {
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  hours = String(hours).padStart(2, "0");
  document.getElementById(
    "time"
  ).textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
}

function setAlarm() {
  const alarmTimeInput = document.getElementById("alarm").value;
  const alarmTime = new Date();
  const [hours, minutes] = alarmTimeInput.split(":");
  alarmTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  const alarmHours = alarmTime.getHours() % 12 || 12; // Convert hours to 12-hour format
  const amPM = alarmTime.getHours() >= 12 ? "PM" : "AM"; // Determine AM or PM

  // const formattedAlarmTime = `${String(alarmHours).padStart(2, "0")}:${String(
  //   minutes
  // ).padStart(2, "0")} ${amPM}`;

  const now = new Date();
  let timeToAlarm = alarmTime - now;

  if (timeToAlarm <= 0) {
    alarmTime.setDate(alarmTime.getDate() + 1);
    timeToAlarm = alarmTime - now;
    // alert("Invalid alarm time!");
  }
  let timer = {
    date: alarmTime,
  };
  timer.alarm = setTimeout(() => {
    document.getElementById("alarmSound").play();
  }, timeToAlarm);
  timers.push(timer);
  console.log("Timer added:", timer);
  updateTimers(timers);
  document.getElementById("alarm").value = "";
}

function updateTimers(timers) {
  const timersDiv = document.getElementById("timers");
  timersDiv.innerHTML = "<h3>Alarms:</h3>";
  timers.forEach((timer, index) => {
    // Convert milliseconds to hours, minutes, and seconds
    const hours = timer.date.getHours();
    const minutes = timer.date.getMinutes();
    const seconds = timer.date.getSeconds();
    // Determine AM or PM
    const amPM = hours >= 12 ? "PM" : "AM";
    // Convert hours to 12-hour format
    const displayHours = hours % 12 || 12;
    // Format the timer string
    const timerString = `${String(timer.date.getDate()).padStart(
      2,
      "0"
    )}:${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${amPM}`;
    // Create a delete button with an onclick event to remove the alarm
    const deleteButton = `<button onclick="deleteAlarm(${index})">Delete</button>`;
    // Display the timer string along with the delete button
    timersDiv.innerHTML += `<p>${timerString} ${deleteButton}</p>`;
  });
}

// Function to delete an alarm from the timers array
function deleteAlarm(index) {
  // Clear the timeout for the alarm being deleted
  clearTimeout(timers[index].alarm);

  // Remove the alarm from the timers array
  timers.splice(index, 1);

  // Update the displayed alarms
  updateTimers(timers);
}

updateTime();
setInterval(updateTime, 1000);
