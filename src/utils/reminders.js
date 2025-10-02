/**
 * Reminder engine:
 * - Requests Notification permission
 * - Schedules setTimeout timers for task reminders
 * - Reschedules all reminders on app load via initReminderEngine
 * 
 * Limitation:
 * - Timers run only while browser/tab is open
 */

let scheduled = {}; // taskId -> timeoutId

function requestPermission() {
  if (!("Notification" in window)) return Promise.resolve(false);
  if (Notification.permission === "granted") return Promise.resolve(true);
  if (Notification.permission === "denied") return Promise.resolve(false);
  return Notification.requestPermission().then(p => p === "granted");
}

function showNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      new Notification(title, { body });
    } catch (e) {
      alert(`${title}\n\n${body}`);
    }
  } else {
    // fallback if notifications not allowed
    alert(`${title}\n\n${body}`);
  }
}

export function scheduleReminderForTask(task) {
  // clear existing timer
  if (scheduled[task.id]) {
    clearTimeout(scheduled[task.id]);
    delete scheduled[task.id];
  }

  if (!task.date) return;

  const dateStr = task.date + (task.time ? " " + task.time : " 00:00");
  const taskTime = new Date(dateStr);
  const reminderMs = (Number(task.remindMinutesBefore || 0) * 60 * 1000);
  const remindAt = new Date(taskTime.getTime() - reminderMs);
  const delay = remindAt.getTime() - Date.now();

  if (delay <= 0) return; // already passed or immediate

  requestPermission().then(() => {
    const id = setTimeout(() => {
      showNotification("Study Reminder", `${task.title}${task.subject ? " — " + task.subject : ""}`);
      delete scheduled[task.id];
    }, delay);
    scheduled[task.id] = id;
  });
}

export function initReminderEngine(tasks = []) {
  // clear all existing timers
  Object.values(scheduled).forEach(id => clearTimeout(id));
  scheduled = {};
  tasks.forEach(scheduleReminderForTask);
}
