import React, { useEffect, useState } from 'react';
import { fetchStudentClasses } from '../utils/api';

function formatDateTime(datetime) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(datetime).toLocaleDateString('en-US', options);
  const formattedTime = new Date(datetime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  return `${formattedDate}, ${formattedTime}`;
}

const StudentSchedule = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const classesResponse = await fetchStudentClasses();
        setClasses(classesResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      {classes.map((classItem) => (
        <div key={classItem.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-lg font-bold">{classItem.class_name}</h3>
          <p>Date: {formatDateTime(classItem.datetime)}</p>
          {/* If you want to include additional information, you can add them here */}
        </div>
      ))}
    </div>
  );
};

export default StudentSchedule;
