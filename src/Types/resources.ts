// Types for Central Resource Repository

export interface Resource {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  type: 'lecture_material' | 'notes' | 'summary' | 'pyq' | 'study_resource' | 'other';
  uploadedBy: string;
  uploadedAt: Date;
  fileUrl?: string;
  fileSize?: number;
  tags: string[];
  downloads: number;
  rating?: number;
  reviews?: ResourceReview[];
  isPublic: boolean;
  credits?: number; // For contributor recognition
}

export interface ResourceReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ResourceFilter {
  courseId?: string;
  type?: Resource['type'];
  searchQuery?: string;
  sortBy?: 'recent' | 'popular' | 'rated' | 'downloads';
  tags?: string[];
}

export interface ResourceStats {
  totalResources: number;
  byType: Record<Resource['type'], number>;
  byCourse: Record<string, number>;
  topContributors: {
    userId: string;
    userName: string;
    contributions: number;
    credits: number;
  }[];
}
