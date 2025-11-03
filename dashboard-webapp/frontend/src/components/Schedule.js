import { useEffect, useState } from "react";
import axios from "axios";

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get("http://103.160.37.103:5000/api/schedule")
      .then(res => setSchedule(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Today's Schedule</h2>
      <ul className="list-disc pl-5">
        {schedule.map((s, i) => (
          <li key={i}>{s.time} - {s.task}</li>
        ))}
      </ul>
    </div>
  );
}
