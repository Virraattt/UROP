// Types for Dashboard Enhancements

export interface DashboardCard {
  id: string;
  title: string;
  description: string;
  type: 'summary' | 'chart' | 'alerts' | 'quick_stats' | 'recommendations';
  position: number;
  visible: boolean;
}

export interface CourseOverview {
  courseId: string;
  courseName: string;
  instructor: string;
  credits: number;
  currentGrade?: string;
  currentGPA?: number;
  attendancePercentage: number;
  averageScore: number;
  assessments: AssessmentSummary[];
  nextDeadline?: {
    title: string;
    dueDate: Date;
  };
}

export interface AssessmentSummary {
  id: string;
  name: string;
  type: 'assignment' | 'quiz' | 'midterm' | 'endterm' | 'project';
  score: number;
  maxScore: number;
  percentage: number;
  date: Date;
  weight: number;
  feedback?: string;
}

export interface PerformanceTrend {
  courseId: string;
  courseName: string;
  data: {
    date: Date;
    score: number;
    assessment: string;
  }[];
  trend: 'improving' | 'stable' | 'declining';
  averageScore: number;
  projection?: number; // Predicted final score
}

export interface StudentRecommendation {
  id: string;
  type: 'study_focus' | 'resource_utilization' | 'exam_prep' | 'improvement_area';
  title: string;
  description: string;
  courses: string[]; // course IDs
  priority: 'low' | 'medium' | 'high';
  suggestedResources?: string[]; // resource IDs
  basedOn: string; // What this recommendation is based on
  createdAt: Date;
}

export interface DashboardMetrics {
  overallGPA: number;
  averageAttendance: number;
  coursesEnrolled: number;
  activeReminders: number;
  upcomingDeadlines: number;
  completionRate: number;
}

export interface StudentDashboard {
  studentId: string;
  lastUpdated: Date;
  metrics: DashboardMetrics;
  courseOverviews: CourseOverview[];
  performanceTrends: PerformanceTrend[];
  recommendations: StudentRecommendation[];
  upcomingDeadlines: DueItem[];
  notificationCount: number;
  unreadNotifications: number;
}

export interface DueItem {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  dueDate: Date;
  type: string;
  priority: string;
}
