import React, { useState, useEffect } from "react";

const MeetingSelector = ({ onMeetingChange }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [topic, setTopic] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    onMeetingChange({ topic, timeSlots, duration });
  }, [timeSlots, duration, topic, onMeetingChange]);

  const handleAddTimeRange = () => {
    if (startTime && endTime) {
      console.log("timeSlots", timeSlots);
      setTimeSlots([...timeSlots, { startTime, endTime }]);
      setStartTime("");
      setEndTime("");
    }
  };

  const handleDeleteTimeRange = (index) => {
    const updatedTimes = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedTimes);
  };

  return (
    <div>
      <h2>Schedule Meeting</h2>
      <div>
        <label>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Meeting Duration (minutes):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <button onClick={handleAddTimeRange}>Add Time Range</button>
      </div>
      <ul>
        {timeSlots.map((time, index) => (
          <li key={index}>
            {time.startTime} - {time.endTime}
            <button onClick={() => handleDeleteTimeRange(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetingSelector;
