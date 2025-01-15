import React from "react";

const MeetingTimeSelector = ({ meetingDetails, onTimeSlotChange }) => {
  const handleTimeSlotChange = (timeSlot) => {
    onTimeSlotChange(timeSlot);
  };

  return (
    <div>
      <h2>{meetingDetails.topic}</h2>
      <p>Duration: {meetingDetails.duration} minutes</p>
      <h3>Select a Time Slot</h3>
      {meetingDetails.timeSlots.map((timeSlot, index) => (
        <div key={index}>
          <input
            type="radio"
            name="timeSlot"
            value={index}
            onChange={() => handleTimeSlotChange(timeSlot)}
          />
          <label>
            {new Date(timeSlot.startTime).toLocaleString()} -{" "}
            {new Date(timeSlot.endTime).toLocaleString()}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MeetingTimeSelector;
