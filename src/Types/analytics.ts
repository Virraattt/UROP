// Types for Predictive Analytics & Performance Insights

export interface PerformanceMetric {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  assessmentType: 'assignment' | 'quiz' | 'midterm' | 'endterm' | 'project';
  score: number;
  maxScore: number;
  percentage: number;
  date: Date;
  weight?: number;
}

export interface CoursePerformance {
  courseId: string;
  courseName: string;
  currentGPA?: number;
  averageScore: number;
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: Date;
  metrics: PerformanceMetric[];
  predictions?: PerformancePrediction;
}

export interface PerformancePrediction {
  predictedFinalScore: number;
  confidence: number; // 0-1
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  areasOfConcern: string[];
}

export interface PerformanceInsight {
  id: string;
  studentId: string;
  title: string;
  description: string;
  type: 'strength' | 'weakness' | 'trend' | 'prediction' | 'recommendation';
  courses?: string[];
  priority: 'low' | 'medium' | 'high';
  generatedAt: Date;
  actionable: boolean;
  suggestedActions?: string[];
}

export interface AtRiskAlert {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  riskFactors: string[];
  severity: 'warning' | 'critical';
  generatedAt: Date;
  recommendations: string[];
}

export interface AnalyticsData {
  studentId: string;
  overallPerformance: CoursePerformance[];
  insights: PerformanceInsight[];
  atRiskAlerts: AtRiskAlert[];
  lastAnalyzedAt: Date;
}
