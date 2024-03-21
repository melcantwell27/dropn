import React from 'react';

function ClassCard({ lesson, enrolled, onEnroll, onUnenroll }) {
  // Convert datetime string to a more readable format for a dance class website
  const formattedDate = new Date(lesson.datetime).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(lesson.datetime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const handleToggleEnroll = (classId) => {
    if (enrolled) {
      onUnenroll(classId);
    } else {
      onEnroll(classId);
    }
  };

  return (
    <div className="border-4 border-pink-800 rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{lesson.class_name}</h2>
      <p>Date: {formattedDate}</p>
      <p>Time: {formattedTime}</p>
      <button
        className={`font-bold py-2 px-4 rounded mt-2 ${enrolled ? 'bg-purple-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
        onClick={() => handleToggleEnroll(lesson.id)}
      >
        {enrolled ? 'Unenroll' : 'Enroll'}
      </button>
    </div>
  );
}

export default ClassCard;
