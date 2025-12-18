"use client";

import React, { useState } from "react";
import { Upload, Award, TrendingUp } from "lucide-react";
import { useContributionsStore } from "@/hooks/featuresStore";
import type { Contribution } from "@/Types/contributions";
import { submitContribution } from "@/server/features";

export default function ContributionPanel() {
  const { myContributions, setMyContributions, addContribution } = useContributionsStore();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "notes" as const,
    courseId: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await submitContribution({
        title: formData.title,
        description: formData.description,
        type: formData.type,
        courseId: formData.courseId,
        courseName: "Selected Course",
        content: "",
        tags: formData.tags.split(",").map((t) => t.trim()),
        userId: "current-user",
        userName: "Current User",
        userEmail: "user@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        credits: 10,
        views: 0,
        downloads: 0,
        upvotes: 0,
        downvotes: 0,
      });

      if (result.success) {
        addContribution(result.data);
        setFormData({
          title: "",
          description: "",
          type: "notes",
          courseId: "",
          tags: "",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Failed to submit contribution:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Share Your Knowledge</h1>
        <p className="text-gray-400">
          Contribute notes, summaries, and resources to help fellow students
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Upload className="w-6 h-6" />}
          label="Your Contributions"
          value={myContributions.length}
          color="blue"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Total Credits Earned"
          value={myContributions.reduce((sum, c) => sum + c.credits, 0)}
          color="purple"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Total Downloads"
          value={myContributions.reduce((sum, c) => sum + c.downloads, 0)}
          color="green"
        />
      </div>

      {/* Upload Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30 rounded-lg hover:from-blue-600/40 hover:to-purple-600/40 transition flex items-center justify-center gap-3 text-white font-semibold"
        >
          <Upload className="w-5 h-5" />
          Upload New Contribution
        </button>
      ) : (
        <div className="p-6 bg-white/5 border border-white/10 rounded-lg space-y-4">
          <h2 className="text-xl font-bold text-white">New Contribution</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g., DSA Important Questions"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Description *</label>
              <textarea
                required
                placeholder="Describe what you're sharing..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
                >
                  <option value="notes">Notes</option>
                  <option value="summary">Summary</option>
                  <option value="study_guide">Study Guide</option>
                  <option value="question_bank">Question Bank</option>
                  <option value="cheatsheet">Cheatsheet</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Course *</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
                >
                  <option value="">Select Course</option>
                  <option value="cs101">Data Structures</option>
                  <option value="cs102">Algorithms</option>
                  <option value="cs103">DBMS</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="e.g., dsa, arrays, recursion"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-semibold"
              >
                {loading ? "Uploading..." : "Submit Contribution"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Contributions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Contributions</h2>
        {myContributions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myContributions.map((contribution) => (
              <ContributionCard key={contribution.id} contribution={contribution} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
            <p className="text-gray-400">No contributions yet</p>
            <p className="text-gray-500 text-sm">Start by uploading your first resource!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "blue" | "purple" | "green";
}) {
  const colorClasses = {
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    purple: "bg-purple-500/20 border-purple-500/30 text-purple-400",
    green: "bg-green-500/20 border-green-500/30 text-green-400",
  };

  return (
    <div className={`p-4 ${colorClasses[color]} border rounded-lg space-y-2`}>
      <div className="flex items-center justify-between">
        {icon}
        <p className="text-sm text-gray-400">{label}</p>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ContributionCard({ contribution }: { contribution: Contribution }) {
  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    approved: "bg-green-500/20 text-green-400 border-green-500/30",
    rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-white font-semibold flex-1">{contribution.title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium border whitespace-nowrap ${statusColors[contribution.status]}`}>
          {contribution.status}
        </span>
      </div>

      <p className="text-gray-400 text-sm line-clamp-2">{contribution.description}</p>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">{contribution.upvotes}</p>
          <p className="text-gray-500 text-xs">Upvotes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-400">{contribution.downloads}</p>
          <p className="text-gray-500 text-xs">Downloads</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">{contribution.credits}</p>
          <p className="text-gray-500 text-xs">Credits</p>
        </div>
      </div>
    </div>
  );
}
