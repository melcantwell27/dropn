import TeacherSchedule from '../components/TeacherSchedule.js';

const TeacherSpot = ({ username }) => {
  return (
    <div className="bg-gradient-to-b from-purple-600 to-lime-500 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">My Teacher Spot</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">My Teaching Schedule</h2>
        <TeacherSchedule username={username} />
      </div>
    </div>
  );
};

export default TeacherSpot ;
