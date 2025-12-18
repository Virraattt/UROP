// Types for Notification & Reminder System

export interface Notification {
  id: string;
  studentId: string;
  type: 'deadline' | 'attendance' | 'exam' | 'study_suggestion' | 'course_update' | 'achievement';
  title: string;
  message: string;
  details?: Record<string, any>;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  readAt?: Date;
  createdAt: Date;
  actionUrl?: string;
}

export interface NotificationPreference {
  id: string;
  studentId: string;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  deadlineReminders: {
    enabled: boolean;
    daysBefore: number; // 1, 3, 7
    time: string; // HH:mm
  };
  attendanceAlerts: {
    enabled: boolean;
    threshold: number; // percentage
  };
  examNotifications: {
    enabled: boolean;
    daysBefore: number;
  };
  studySuggestions: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'never';
    day?: number; // for weekly
    time: string;
  };
  pushNotifications: boolean;
}

export interface Reminder {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: Date;
  reminderDate: Date;
  type: 'assignment' | 'exam' | 'study' | 'attendance' | 'custom';
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface DueItem {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  dueDate: Date;
  type: 'assignment' | 'exam' | 'quiz' | 'project';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'submitted' | 'completed';
  daysRemaining: number;
}

export interface StudySuggestion {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  rationale: string; // Why this suggestion
  resources?: string[]; // Resource IDs
  timeEstimate?: number; // minutes
  createdAt: Date;
  dismissed: boolean;
}
