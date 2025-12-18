"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  BookOpen,
  Clock,
} from "lucide-react";
import type { StudentDashboard } from "@/Types/dashboard";

interface EnhancedDashboardProps {
  dashboard?: StudentDashboard;
}

export default function EnhancedDashboard({ dashboard }: EnhancedDashboardProps) {
  if (!dashboard) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Academic Dashboard</h1>
        <p className="text-gray-400">
          Your personalized academic overview and recommendations
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          label="Overall GPA"
          value={dashboard.metrics.overallGPA.toFixed(2)}
          icon={<TrendingUp className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          label="Attendance"
          value={`${dashboard.metrics.averageAttendance.toFixed(0)}%`}
          icon={<Calendar className="w-5 h-5" />}
          color="green"
        />
        <MetricCard
          label="Courses"
          value={dashboard.metrics.coursesEnrolled}
          icon={<BookOpen className="w-5 h-5" />}
          color="purple"
        />
        <MetricCard
          label="Active Reminders"
          value={dashboard.metrics.activeReminders}
          icon={<Clock className="w-5 h-5" />}
          color="yellow"
        />
        <MetricCard
          label="Due Soon"
          value={dashboard.metrics.upcomingDeadlines}
          icon={<AlertCircle className="w-5 h-5" />}
          color="red"
        />
        <MetricCard
          label="Completion"
          value={`${dashboard.metrics.completionRate.toFixed(0)}%`}
          icon={<CheckCircle className="w-5 h-5" />}
          color="emerald"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Course Overview & Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Overview */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Course Overview
            </h2>

            <div className="space-y-3">
              {dashboard.courseOverviews.length > 0 ? (
                dashboard.courseOverviews.slice(0, 3).map((course) => (
                  <CourseCard key={course.courseId} course={course} />
                ))
              ) : (
                <div className="text-center py-8 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-gray-400">No courses enrolled</p>
                </div>
              )}
            </div>
          </div>

          {/* Performance Trends */}
          {dashboard.performanceTrends.length > 0 && (
            <div className="space-y-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Performance Trends
              </h2>

              <div className="space-y-4">
                {dashboard.performanceTrends.map((trend) => (
                  <TrendCard key={trend.courseId} trend={trend} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Recommendations & Alerts */}
        <div className="space-y-6">
          {/* Quick Alerts */}
          {dashboard.upcomingDeadlines.length > 0 && (
            <div className="space-y-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h3 className="font-bold text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Upcoming Deadlines
              </h3>
              <div className="space-y-2">
                {dashboard.upcomingDeadlines.slice(0, 3).map((deadline) => (
                  <div key={deadline.id} className="p-2 bg-red-500/20 rounded border border-red-500/20">
                    <p className="text-sm font-semibold text-white">{deadline.title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(deadline.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {dashboard.recommendations.length > 0 && (
            <div className="space-y-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h3 className="font-bold text-blue-400 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Recommendations
              </h3>
              <div className="space-y-2">
                {dashboard.recommendations.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="p-2 bg-blue-500/20 rounded border border-blue-500/20">
                    <p className="text-xs font-semibold text-blue-300">{rec.title}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {rec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Summary */}
          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <h3 className="font-bold text-purple-400 mb-3">Notifications</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Total</span>
                <span className="font-bold text-white">{dashboard.notificationCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Unread</span>
                <span className="font-bold text-yellow-400">
                  {dashboard.unreadNotifications}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    green: "bg-green-500/20 border-green-500/30 text-green-400",
    purple: "bg-purple-500/20 border-purple-500/30 text-purple-400",
    yellow: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    red: "bg-red-500/20 border-red-500/30 text-red-400",
    emerald: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
  };

  return (
    <div
      className={`p-3 border rounded-lg space-y-1 ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      <div className="flex items-center justify-between">
        {icon}
      </div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

function CourseCard({ course }: { course: any }) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3 hover:bg-white/10 transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-white">{course.courseName}</h3>
          <p className="text-xs text-gray-400">{course.instructor}</p>
        </div>
        <div className="text-right">
          {course.currentGrade && (
            <p className="text-lg font-bold text-blue-400">{course.currentGrade}</p>
          )}
          {course.currentGPA && (
            <p className="text-xs text-gray-400">{course.currentGPA.toFixed(2)} GPA</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Average Score</span>
          <span className="text-white font-semibold">{course.averageScore.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            style={{ width: `${Math.min(course.averageScore, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
        <span>📚 {course.assessments.length} assessments</span>
        <span>🎯 {course.attendancePercentage.toFixed(0)}% attendance</span>
      </div>
    </div>
  );
}

function TrendCard({ trend }: { trend: any }) {
  const chartData = trend.data.slice(-5).map((d: any) => ({
    name: d.assessment,
    score: d.percentage,
  }));

  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-white text-sm">{trend.courseName}</h4>
      <div className="h-32 bg-black/20 rounded p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
            <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              formatter={(value) => `${value}%`}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>Avg: {trend.averageScore.toFixed(1)}%</span>
        {trend.projection && <span>Projected: {trend.projection.toFixed(1)}%</span>}
      </div>
    </div>
  );
}
