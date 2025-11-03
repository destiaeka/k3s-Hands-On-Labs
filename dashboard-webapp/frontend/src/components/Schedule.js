import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/schedule')
      .then(res => setSchedule(res.data));
  }, []);

  return (
    <div className="bg-purple-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
      <h2 className="font-bold text-xl mb-2">Today's Schedule</h2>
      <ul className="list-disc pl-5 text-gray-800">
        {schedule.map((item, idx) => (
          <li key={idx}>{item.time} - {item.task}</li>
        ))}
      </ul>
    </div>
  );
}
