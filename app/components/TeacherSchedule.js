import { useEffect, useState } from 'react';
import { fetchStudentClasses } from '../utils/api';

const TeacherSchedule = () => {
  // State variables to store classes and username
  const [classes, setClasses] = useState([]);
  const [username, setUsername] = useState('');
  

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Function to fetch user data including username and student classes
    async function fetchData() {
      try {
        // Fetch student classes
        const classesResponse = await fetchStudentClasses();
        // Set the fetched classes in state
        setClasses(classesResponse);
        
        // Assuming the username is also fetched along with classesResponse
        // Set the username in state
        setUsername(classesResponse.username);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Call fetchData function when component mounts
    fetchData();
  }, []);

  // Render UI with fetched data
  return (
    <div>
      <ul>
        {/* Map over classes array and render class details */}
        {classes.map((classItem) => (
          <li key={classItem.id}>
            {classItem.class_name} - {classItem.datetime} - 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherSchedule;
