import React from 'react'
import './Style/dash.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  
  // 📊 Dummy Stats
  const totalTests = 25;
  const bestScore = 96;
  const avgScore = 82;
  const userId = "USR12345";

  // 📈 Progress Data (Line Chart)
  const progressData = [
    { date: "Aug 15", score: 65 },
    { date: "Aug 25", score: 72 },
    { date: "Sep 05", score: 81 },
    { date: "Sep 20", score: 96 },
  ];

  // 📊 Topic Analysis Data (Pie Chart)
  const topicData = [
    { name: "Quant", value: 85 },
    { name: "Reasoning", value: 78 },
    { name: "Verbal", value: 91 },
  ];
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  // 📄 Recent Tests
  const testHistory = [
    { date: "25 Sep 2025", test: "Quant Test", score: "82%", status: "✅ Pass" },
    { date: "18 Sep 2025", test: "Reasoning Test", score: "70%", status: "✅ Pass" },
    { date: "05 Sep 2025", test: "Verbal Test", score: "96%", status: "✅ Pass" },
  ];
  return (
    <div className='dash-box'>
      <div className='dd'>
         {/* 📊 Stats Cards */}
      <div className="grid">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg text-gray-500">Total Tests</h3>
          <p className="text-3xl font-bold text-blue-600">{totalTests}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg text-gray-500">Best Score</h3>
          <p className="text-3xl font-bold text-green-600">{bestScore}%</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg text-gray-500">Average Score</h3>
          <p className="text-3xl font-bold text-purple-600">{avgScore}%</p>
        </div>
      </div>

      {/* 📈 Progress Graph */}
      <div className="bg-white shadow rounded-xl p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">📈 Progress Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Topic Analysis */}
      <div className="bg-white shadow rounded-xl p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">📊 Topic-wise Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topicData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {topicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📜 Recent Tests Table */}
      <div className="bg-white shadow rounded-xl p-6 my-6">
        <h3 className="text-xl font-semibold mb-4">📜 Recent Test History</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Date</th>
              <th className="p-2">Test Name</th>
              <th className="p-2">Score</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {testHistory.map((test, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{test.date}</td>
                <td className="p-2">{test.test}</td>
                <td className="p-2">{test.score}</td>
                <td className="p-2">{test.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
