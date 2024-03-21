// ClassListPage.js

import React, { useEffect, useState } from 'react';
import { fetchClassList, fetchStudentClasses, enrollUserInClass, unenrollUserFromClass } from '../utils/api';
import ClassCard from './ClassCard.js';

function ClassListPage({ searchDate }) {
  const [classList, setClassList] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const classListData = await fetchClassList();
      const studentClassesData = await fetchStudentClasses();
      classListData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
      setClassList(classListData);
      setEnrolledClasses(studentClassesData.map(classObj => classObj.id));
    }
    fetchData();
  }, []);

  const handleEnroll = async (classId) => {
    try {
      const success = await enrollUserInClass(classId);
      if (success) {
        setEnrolledClasses([...enrolledClasses, classId]);
        console.log(`Successfully enrolled user in class ${classId}`);
      } else {
        console.error(`Failed to enroll user in class ${classId}`);
      }
    } catch (error) {
      console.error('Error enrolling user:', error);
    }
  };

  const handleUnenroll = async (classId) => {
    try {
      const success = await unenrollUserFromClass(classId);
      if (success) {
        setEnrolledClasses(enrolledClasses.filter(id => id !== classId));
        console.log(`Successfully unenrolled user from class ${classId}`);
      } else {
        console.error(`Failed to unenroll user from class ${classId}`);
      }
    } catch (error) {
      console.error('Error unenrolling user:', error);
    }
  };

  const filteredClassList = searchDate
    ? classList.filter((lesson) => {
        const lessonDate = new Date(lesson.datetime).toISOString().split('T')[0];
        return lessonDate === searchDate;
      })
    : classList;

  return (
    <div className="container mx-auto p-4 bg-yellow-300">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Class List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClassList.map((lesson) => (
          <ClassCard
            key={lesson.id}
            lesson={lesson}
            enrolled={enrolledClasses.includes(lesson.id)}
            onEnroll={() => handleEnroll(lesson.id)}
            onUnenroll={() => handleUnenroll(lesson.id)}
            className="bg-white rounded-lg shadow-md p-4"
          />
        ))}
      </div>
    </div>
  );
}

export default ClassListPage;
