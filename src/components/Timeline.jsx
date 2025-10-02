import React from "react";

/**
 * Lightweight horizontal timeline grouped by date.
 * Shows each date column with tasks stacked vertically.
 */

function groupByDate(tasks) {
  return tasks.reduce((acc, t) => {
    const d = t.date || "No date";
    (acc[d] = acc[d] || []).push(t);
    return acc;
  }, {});
}

export default function Timeline({ tasks = [], onEdit }) {
  const grouped = groupByDate(tasks);
  const dates = Object.keys(grouped).sort((a,b) => (a==="No date"?1:0) - (b==="No date"?1:0) || new Date(a) - new Date(b));

  return (
    <div className="card timeline-card">
      <h3>Timeline</h3>
      {dates.length === 0 && <div className="muted">No tasks to show</div>}
      <div className="timeline-scroll">
        {dates.map(date => (
          <div className="timeline-col" key={date}>
            <div className="timeline-col-header">{date === "No date" ? "No date" : new Date(date).toLocaleDateString()}</div>
            <div className="timeline-items">
              {grouped[date].map(t => (
                <div className="timeline-item" key={t.id} onDoubleClick={() => onEdit(t)}>
                  <div className="t-time">{t.time || "Anytime"}</div>
                  <div className="t-title">{t.title}</div>
                  <div className="t-sub muted">{t.subject || t.duration || ""}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
