// Types for Community Contribution System

export interface Contribution {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  type: 'notes' | 'summary' | 'study_guide' | 'question_bank' | 'cheatsheet' | 'other';
  resourceId?: string;
  content?: string;
  fileUrl?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  credits: number;
  views: number;
  downloads: number;
  upvotes: number;
  downvotes: number;
}

export interface ContributorProfile {
  userId: string;
  userName: string;
  userEmail: string;
  totalContributions: number;
  totalCredits: number;
  averageRating: number;
  contributions: Contribution[];
  badges: Badge[];
  joinedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteriaType: 'contributions' | 'credits' | 'downloads' | 'community_help';
  criteriaValue: number;
  earnedAt: Date;
}

export interface ContributionStats {
  thisWeek: number;
  thisMonth: number;
  allTime: number;
  pendingApproval: number;
  totalCreditsEarned: number;
}
