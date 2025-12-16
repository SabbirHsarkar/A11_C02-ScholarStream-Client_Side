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
        setChartData(res.data.chartData || []);
        setChartDataCategory(res.data.chartDataCategory || []);
      } catch (err) {
        console.log("Error fetching analytics:", err);
      }
    };
    fetchAnalytics();
  }, [axiosSecure]);

  const COLORS = [
    "#6366F1",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#0EA5E9",
    "#A855F7",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Title */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-600">
          Platform Analytics
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Overview of users, scholarships and application statistics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Users" value={totalUsers} />
        <StatCard title="Total Fees Collected" value={`$${totalFees}`} />
        <StatCard title="Total Scholarships" value={totalScholarships} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            Applications per University
          </h3>

          {chartData.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" radius={[6, 6, 0, 0]} fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            Applications per Category
          </h3>

          {chartDataCategory.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={chartDataCategory}
                  dataKey="applications"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {chartDataCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

/* Reusable Card Component */
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
      <h2 className="text-gray-500 text-sm font-medium mb-2">{title}</h2>
      <p className="text-3xl font-bold text-indigo-600">{value}</p>
    </div>
  );
};

export default Analytics;
