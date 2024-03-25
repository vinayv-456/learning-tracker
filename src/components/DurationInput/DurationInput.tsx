import React, { useState, ChangeEvent, forwardRef } from "react";
import { Duration } from "../../types";
interface Props {
  duration: Duration;
  getDuration: (hours: string, minutes: string) => void;
}

const TimeInput: React.FC<Props> = (props) => {
  const { duration, getDuration } = props;
  const [hours, setHours] = useState<string>(duration.hours.toString());
  const [minutes, setMinutes] = useState<string>(duration.minutes.toString());

  const handleHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    // Validate input to ensure it's a valid hour (0-23)
    if (/^\d{0,2}$/.test(value) && parseInt(value, 10) <= 23) {
      setHours(value);
      getDuration(hours, minutes);
    }
  };

  const handleMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    // Validate input to ensure it's a valid minute (0-59)
    if (/^\d{0,2}$/.test(value) && parseInt(value, 10) <= 59) {
      setMinutes(value);
      getDuration(hours, minutes);
    }
  };

  return (
    <div>
      <label htmlFor="label">Duration:</label>
      <input
        type="text"
        value={hours}
        onChange={handleHoursChange}
        placeholder="Hours"
      />
      <span>:</span>
      <input
        type="text"
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="Minutes"
      />
    </div>
  );
};

export default TimeInput;
