import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Analytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [chartDataCategory, setChartDataCategory] = useState([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosSecure.get("/analytics");
        setTotalUsers(res.data.totalUsers);
        setTotalFees(res.data.totalFees);
        setTotalScholarships(res.data.totalScholarships);
        setChartData(res.data.chartData);           
        setChartDataCategory(res.data.chartDataCategory); 
      } catch (err) {
        console.log("Error fetching analytics:", err);
      }
    };

    fetchAnalytics();
  }, [axiosSecure]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF0055"];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
        Platform Analytics
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          <p className="text-2xl font-bold text-indigo-600">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Fees Collected</h2>
          <p className="text-2xl font-bold text-indigo-600">${totalFees}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Scholarships</h2>
          <p className="text-2xl font-bold text-indigo-600">{totalScholarships}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bar Chart*/}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Applications per University
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart*/}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Applications per Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartDataCategory}
                dataKey="applications"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#4F46E5"
                label
              >
                {chartDataCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
