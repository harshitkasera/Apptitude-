import React, { useEffect, useState } from "react";
import "./Style/dash.css";
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
  const [examHistory, setExamHistory] = useState([]);

useEffect(() => {
  const history = JSON.parse(localStorage.getItem("examHistory")) || [];
  console.log("🔎 Exam History:", history);
  setExamHistory(history);
}, []);
////////////////////


  




  // 📊 Calculate Stats
const totalTests = examHistory.length;

const bestScore =
  totalTests > 0
    ? Math.max(...examHistory.map((t) => parseFloat(t.percentage) || 0))
    : 0;

const avgScore =
  totalTests > 0
    ? (
        examHistory.reduce(
          (acc, t) => acc + (parseFloat(t.percentage) || 0),
          0
        ) / totalTests
      ).toFixed(2)
    : 0;


  // 📈 Line chart data from history
  const progressData = examHistory.map((t) => ({
    date: t.date.split(",")[0], // only date part
    score: parseFloat(t.percentage),
  }));

  // 📊 Dummy topic data (future use - can replace with real data)
  const topicData = [
    { name: "Quant", value: 85 },
    { name: "Reasoning", value: 78 },
    { name: "Verbal", value: 91 },
  ];
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="dash-box">
      <div className="dd">
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
            {console.log(bestScore)}
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <h3 className="text-lg text-gray-500">Average Score</h3>
            <p className="text-3xl font-bold text-purple-600">{avgScore}%</p>
          </div>
        </div>

        {/* 📈 Progress Graph */}
        <div className="progres">
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

          {examHistory.length === 0 ? (
            <p>No tests attempted yet 🚀</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2">Date</th>
                  <th className="p-2">Score</th>
                  <th className="p-2">Percentage</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...examHistory].reverse().map((test, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{test.date}</td>
                    <td className="p-2">
                      {test.score} / {test.total}
                    </td>
                    <td className="p-2">{test.percentage}%</td>
                    <td className="p-2">{test.isPass ? "✅ Pass" : "❌ Fail"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
