"use client";

import React, { useState } from "react";
import { Bell, Clock, AlertCircle, CheckCircle, Trash2 } from "lucide-react";
import { useNotificationsStore } from "@/hooks/featuresStore";
import type { Notification, Reminder } from "@/Types/notifications";

export default function NotificationCenter() {
  const { notifications, reminders, setNotifications, setReminders, markAsRead, deleteNotification, completeReminder } =
    useNotificationsStore();
  const [activeTab, setActiveTab] = useState<"notifications" | "reminders">("notifications");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Notifications & Reminders</h1>
        <p className="text-gray-400">Stay updated with your academic progress and deadlines</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-3 font-semibold transition ${
            activeTab === "notifications"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications ({notifications.filter((n) => !n.read).length})
          </div>
        </button>
        <button
          onClick={() => setActiveTab("reminders")}
          className={`px-4 py-3 font-semibold transition ${
            activeTab === "reminders"
              ? "text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Reminders ({reminders.filter((r) => !r.completed).length})
          </div>
        </button>
      </div>

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-4">
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-2 opacity-50" />
              <p className="text-gray-400">No notifications</p>
            </div>
          )}
        </div>
      )}

      {/* Reminders Tab */}
      {activeTab === "reminders" && (
        <div className="space-y-4">
          {reminders.length > 0 ? (
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <ReminderItem
                  key={reminder.id}
                  reminder={reminder}
                  onComplete={() => completeReminder(reminder.id)}
                  onDelete={() => {
                    // Delete logic
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2 opacity-50" />
              <p className="text-gray-400">No reminders</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: {
  notification: Notification;
  onMarkAsRead: () => void;
  onDelete: () => void;
}) {
  const priorityColors = {
    low: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    medium: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    high: "bg-red-500/20 border-red-500/30 text-red-400",
  };

  const typeIcons: Record<string, React.ReactNode> = {
    deadline: <AlertCircle className="w-5 h-5" />,
    attendance: <AlertCircle className="w-5 h-5" />,
    exam: <AlertCircle className="w-5 h-5" />,
    study_suggestion: <CheckCircle className="w-5 h-5" />,
    course_update: <Bell className="w-5 h-5" />,
    achievement: <CheckCircle className="w-5 h-5" />,
  };

  return (
    <div
      className={`p-4 border rounded-lg transition cursor-pointer ${
        notification.read
          ? "bg-white/5 border-white/10 opacity-75"
          : "bg-blue-500/10 border-blue-500/30"
      }`}
      onClick={onMarkAsRead}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          {typeIcons[notification.type] || <Bell className="w-5 h-5" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-white">{notification.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-xs font-medium border whitespace-nowrap ${
                priorityColors[notification.priority]
              }`}
            >
              {notification.priority}
            </span>
          </div>

          <p className="text-gray-500 text-xs mt-2">
            {new Date(notification.createdAt).toLocaleDateString()}{" "}
            {new Date(notification.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-gray-500 hover:text-red-400 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ReminderItem({
  reminder,
  onComplete,
  onDelete,
}: {
  reminder: Reminder;
  onComplete: () => void;
  onDelete: () => void;
}) {
  const daysRemaining = Math.ceil(
    (new Date(reminder.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      className={`p-4 border rounded-lg space-y-2 ${
        reminder.completed
          ? "bg-white/5 border-white/10 opacity-60 line-through"
          : "bg-white/5 border-white/10"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-white">{reminder.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{reminder.description}</p>
          <p className="text-gray-500 text-xs mt-2">{reminder.courseName}</p>
        </div>

        <div className="flex gap-2">
          {!reminder.completed && (
            <button
              onClick={onComplete}
              className="p-2 hover:bg-green-500/20 text-green-400 rounded transition"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-500/20 text-red-400 rounded transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm pt-2 border-t border-white/10">
        <span className="text-gray-400">
          Due: {new Date(reminder.dueDate).toLocaleDateString()}
        </span>
        {daysRemaining >= 0 && (
          <span className={`font-semibold ${daysRemaining <= 3 ? "text-red-400" : "text-gray-300"}`}>
            {daysRemaining} days remaining
          </span>
        )}
      </div>
    </div>
  );
}
