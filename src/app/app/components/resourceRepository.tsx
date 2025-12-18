"use client";

import React, { useState } from "react";
import { Search, Filter, Download, FileUp } from "lucide-react";
import { useResourcesStore } from "@/hooks/featuresStore";
import type { Resource } from "@/Types/resources";

interface ResourceRepositoryProps {
  initialResources?: Resource[];
}

export default function ResourceRepository({ initialResources = [] }: ResourceRepositoryProps) {
  const { resources, filteredResources, setResources, searchResources, setFilter } =
    useResourcesStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  React.useEffect(() => {
    if (initialResources.length > 0) {
      setResources(initialResources);
    }
  }, [initialResources, setResources]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchResources(query);
  };

  const handleFilterChange = () => {
    setFilter({
      searchQuery,
      type: (selectedType as any) || undefined,
      courseId: selectedCourse || undefined,
    });
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [selectedType, selectedCourse]);

  const displayResources = filteredResources.length > 0 ? filteredResources : resources;

  const resourceTypeColors: Record<string, string> = {
    lecture_material: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    notes: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    summary: "bg-green-500/20 text-green-400 border-green-500/30",
    pyq: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    study_resource: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Resource Repository</h1>
        <p className="text-gray-400">
          Access course materials, notes, PYQs, and study resources
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30"
            />
          </div>
          <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition flex items-center gap-2">
            <Filter className="w-5 h-5" />
            More Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
          >
            <option value="">All Types</option>
            <option value="lecture_material">Lecture Materials</option>
            <option value="notes">Notes</option>
            <option value="summary">Summaries</option>
            <option value="pyq">Previous Year Questions</option>
            <option value="study_resource">Study Resources</option>
          </select>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30"
          >
            <option value="">All Courses</option>
            <option value="cs101">Data Structures</option>
            <option value="cs102">Algorithms</option>
            <option value="cs103">DBMS</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayResources.length > 0 ? (
          displayResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No resources found</p>
            <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const resourceTypeColors: Record<string, string> = {
    lecture_material: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    notes: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    summary: "bg-green-500/20 text-green-400 border-green-500/30",
    pyq: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    study_resource: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    other: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition group cursor-pointer space-y-3">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold line-clamp-2 flex-1 group-hover:text-blue-400 transition">
            {resource.title}
          </h3>
          <span
            className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap border ${
              resourceTypeColors[resource.type] || resourceTypeColors.other
            }`}
          >
            {resource.type.replace(/_/g, " ")}
          </span>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">{resource.description}</p>
      </div>

      {/* Course Info */}
      <div>
        <p className="text-sm">
          <span className="text-gray-500">Course: </span>
          <span className="text-blue-400">{resource.courseName}</span>
        </p>
        <p className="text-sm">
          <span className="text-gray-500">By: </span>
          <span className="text-gray-300">{resource.uploadedBy}</span>
        </p>
      </div>

      {/* Tags */}
      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400">
              #{tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-gray-400">+{resource.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-400 pt-2 border-t border-white/10">
        <span>📊 {resource.downloads || 0} downloads</span>
        <span>⭐ {(resource.rating || 0).toFixed(1)}</span>
      </div>

      {/* Action Button */}
      <button className="w-full mt-2 px-3 py-2 bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-600/50 transition flex items-center justify-center gap-2 text-sm">
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
}
