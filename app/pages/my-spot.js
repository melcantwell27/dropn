import StudentSchedule from '../components/StudentSchedule';

const MySpot = ({ username }) => {
  return (
    <div className="bg-gradient-to-b from-purple-600 to-lime-500 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to My Spot!</h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">My Schedule</h2>
        <StudentSchedule username={username} />
      </div>
    </div>
  );
};

export default MySpot;
