import React, { useEffect, useState } from "react";
import { uid } from "../utils/uid";
import { scheduleReminderForTask } from "../utils/reminders";

const blank = {
  title: "",
  subject: "",
  notes: "",
  date: "",
  time: "",
  duration: "",
  remindMinutesBefore: 10,
  done: false
};

export default function AddTask({ onSave, editing, onClearEdit }) {
  const [form, setForm] = useState(blank);

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function submit(e) {
    e?.preventDefault();
    if (!form.title || !form.date) {
      alert("Please provide a title and a date.");
      return;
    }
    const task = { ...form, id: form.id || uid() };
    onSave(task);
    scheduleReminderForTask(task);
    setForm(blank);
    onClearEdit?.();
  }

  function setToday() {
    const d = new Date();
    setForm(f => ({ ...f, date: d.toISOString().slice(0,10) }));
  }

  function cancelEdit() {
    setForm(blank);
    onClearEdit?.();
  }

  return (
    <form className="card add-task" onSubmit={submit}>
      <h2>{editing ? "Edit Task" : "Add Study Task"}</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title (required)" />
      <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject (optional)" />
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)"></textarea>

      <div className="row">
        <label>
          Date
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </label>
        <label>
          Time
          <input type="time" name="time" value={form.time} onChange={handleChange} />
        </label>
        <label>
          Duration
          <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g., 1h 30m" />
        </label>
      </div>

      <label className="small">
        Reminder (minutes before)
        <input type="number" min="0" name="remindMinutesBefore" value={form.remindMinutesBefore} onChange={handleChange} />
      </label>

      <div className="row actions">
        <button className="btn" type="submit">{editing ? "Save changes" : "Save Task"}</button>
        <button type="button" className="btn ghost" onClick={setToday}>Set Today</button>
        {editing && <button type="button" className="btn ghost" onClick={cancelEdit}>Cancel</button>}
      </div>
    </form>
  );
}
