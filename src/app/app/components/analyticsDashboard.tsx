"use client";

import React, { useState } from "react";
import { TrendingUp, AlertCircle, BookOpen, Zap, Target } from "lucide-react";
import type { CoursePerformance, PerformanceInsight, AtRiskAlert } from "@/Types/analytics";

interface AnalyticsDashboardProps {
  performance?: CoursePerformance[];
  insights?: PerformanceInsight[];
  alerts?: AtRiskAlert[];
}

export default function AnalyticsDashboard({
  performance = [],
  insights = [],
  alerts = [],
}: AnalyticsDashboardProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
        <p className="text-gray-400">
          AI-ready insights and performance tracking across your courses
        </p>
      </div>

      {/* At-Risk Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            At-Risk Alerts
          </h2>
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}

      {/* Performance Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Course Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performance.length > 0 ? (
            performance.map((course) => (
              <PerformanceCard
                key={course.courseId}
                course={course}
                selected={selectedCourse === course.courseId}
                onSelect={() => setSelectedCourse(course.courseId)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white/5 border border-white/10 rounded-lg">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-2 opacity-50" />
              <p className="text-gray-400">No performance data available</p>
            </div>
          )}
        </div>
      </div>

      {/* AI-Ready Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Performance Insights
        </h2>

        <div className="space-y-3">
          {insights.length > 0 ? (
            insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))
          ) : (
            <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-2 opacity-50" />
              <p className="text-gray-400">No insights generated yet</p>
              <p className="text-gray-500 text-sm">
                Insights will appear as you complete assessments
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI-Ready Features Info */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg space-y-3">
        <h3 className="font-semibold text-blue-400 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          AI-Ready Foundation
        </h3>
        <p className="text-sm text-gray-300">
          This analytics system is built with an AI-ready data pipeline. Future updates will include:
        </p>
        <ul className="text-sm text-gray-400 space-y-1 ml-4">
          <li>✓ Advanced ML-powered performance predictions</li>
          <li>✓ Intelligent study recommendations</li>
          <li>✓ Pattern-based academic insights</li>
          <li>✓ Proactive intervention alerts</li>
        </ul>
      </div>
    </div>
  );
}

function AlertCard({ alert }: { alert: AtRiskAlert }) {
  const severityColors = {
    warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    critical: "bg-red-500/20 border-red-500/30 text-red-400",
  };

  return (
    <div className={`p-4 border rounded-lg space-y-2 ${severityColors[alert.severity]}`}>
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{alert.courseName}</h3>
        <span className="text-xs font-bold uppercase">{alert.severity}</span>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Risk Factors:</p>
        <ul className="text-sm space-y-1">
          {alert.riskFactors.map((factor, idx) => (
            <li key={idx}>• {factor}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Recommendations:</p>
        <ul className="text-sm space-y-1">
          {alert.recommendations.map((rec, idx) => (
            <li key={idx}>→ {rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PerformanceCard({
  course,
  selected,
  onSelect,
}: {
  course: CoursePerformance;
  selected: boolean;
  onSelect: () => void;
}) {
  const trendColor =
    course.trend === "improving"
      ? "text-green-400"
      : course.trend === "declining"
        ? "text-red-400"
        : "text-gray-400";

  const trendIcon =
    course.trend === "improving"
      ? "↗"
      : course.trend === "declining"
        ? "↘"
        : "→";

  return (
    <div
      onClick={onSelect}
      className={`p-4 border rounded-lg cursor-pointer transition space-y-3 ${
        selected
          ? "bg-blue-500/20 border-blue-500/50"
          : "bg-white/5 border-white/10 hover:border-white/30"
      }`}
    >
      <h3 className="font-semibold text-white">{course.courseName}</h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Current Score</span>
          <span className="font-bold text-lg text-blue-400">{course.averageScore.toFixed(1)}%</span>
        </div>

        {course.currentGPA && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">GPA</span>
            <span className="font-bold text-purple-400">{course.currentGPA.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Trend</span>
          <span className={`font-semibold ${trendColor}`}>
            {trendIcon} {course.trend}
          </span>
        </div>
      </div>

      {course.predictions && (
        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-gray-500 mb-1">Predicted Final Score</p>
          <p className="text-lg font-bold text-green-400">
            {course.predictions.predictedFinalScore.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Confidence: {(course.predictions.confidence * 100).toFixed(0)}%
          </p>
        </div>
      )}
    </div>
  );
}

function InsightCard({ insight }: { insight: PerformanceInsight }) {
  const typeIcons: Record<string, React.ReactNode> = {
    strength: "💪",
    weakness: "⚠️",
    trend: "📈",
    prediction: "🔮",
    recommendation: "💡",
  };

  const typeColors = {
    strength: "bg-green-500/10 border-green-500/30 text-green-400",
    weakness: "bg-red-500/10 border-red-500/30 text-red-400",
    trend: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    prediction: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    recommendation: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
  };

  return (
    <div className={`p-4 border rounded-lg space-y-2 ${typeColors[insight.type]}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <span className="text-lg">{typeIcons[insight.type]}</span>
            {insight.title}
          </h3>
          <p className="text-sm mt-1 opacity-90">{insight.description}</p>
        </div>
        <span className="text-xs font-bold uppercase whitespace-nowrap">{insight.priority}</span>
      </div>

      {insight.suggestedActions && insight.suggestedActions.length > 0 && (
        <div className="pt-2 border-t border-current/20">
          <p className="text-xs font-semibold mb-1">Suggested Actions:</p>
          <ul className="text-sm space-y-0.5">
            {insight.suggestedActions.map((action, idx) => (
              <li key={idx}>• {action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
