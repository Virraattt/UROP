# 🎯 AcademiaX Features - Component & Export Reference

## Quick Reference Guide

This document provides a quick reference for all new components, hooks, types, and server actions added to AcademiaX.

---

## 📦 Type Definitions

### Resource Types (`src/Types/resources.ts`)
```typescript
export interface Resource { ... }
export interface ResourceReview { ... }
export interface ResourceFilter { ... }
export interface ResourceStats { ... }
```

### Contribution Types (`src/Types/contributions.ts`)
```typescript
export interface Contribution { ... }
export interface ContributorProfile { ... }
export interface Badge { ... }
export interface ContributionStats { ... }
```

### Notification Types (`src/Types/notifications.ts`)
```typescript
export interface Notification { ... }
export interface NotificationPreference { ... }
export interface Reminder { ... }
export interface DueItem { ... }
export interface StudySuggestion { ... }
```

### Analytics Types (`src/Types/analytics.ts`)
```typescript
export interface PerformanceMetric { ... }
export interface CoursePerformance { ... }
export interface PerformancePrediction { ... }
export interface PerformanceInsight { ... }
export interface AtRiskAlert { ... }
export interface AnalyticsData { ... }
```

### Dashboard Types (`src/Types/dashboard.ts`)
```typescript
export interface DashboardCard { ... }
export interface CourseOverview { ... }
export interface AssessmentSummary { ... }
export interface PerformanceTrend { ... }
export interface StudentRecommendation { ... }
export interface DashboardMetrics { ... }
export interface StudentDashboard { ... }
```

---

## 🪝 Zustand Stores (`src/hooks/featuresStore.ts`)

### useResourcesStore
```typescript
// Type
export type ResourcesStore = {
  resources: Resource[];
  filteredResources: Resource[];
  filter: ResourceFilter;
  setResources: (resources: Resource[]) => void;
  setFilter: (filter: ResourceFilter) => void;
  addResource: (resource: Resource) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  searchResources: (query: string) => void;
}

// Usage
import { useResourcesStore } from '@/hooks/featuresStore';
const { resources, setResources, addResource } = useResourcesStore();
```

### useContributionsStore
```typescript
// Type
export type ContributionsStore = {
  contributions: Contribution[];
  myContributions: Contribution[];
  setContributions: (contributions: Contribution[]) => void;
  setMyContributions: (contributions: Contribution[]) => void;
  addContribution: (contribution: Contribution) => void;
  updateContribution: (id: string, contribution: Partial<Contribution>) => void;
  deleteContribution: (id: string) => void;
}

// Usage
import { useContributionsStore } from '@/hooks/featuresStore';
const { myContributions, addContribution } = useContributionsStore();
```

### useNotificationsStore
```typescript
// Type
export type NotificationsStore = {
  notifications: Notification[];
  reminders: Reminder[];
  unreadCount: number;
  setNotifications: (notifications: Notification[]) => void;
  setReminders: (reminders: Reminder[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  addReminder: (reminder: Reminder) => void;
  completeReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
}

// Usage
import { useNotificationsStore } from '@/hooks/featuresStore';
const { notifications, reminders, markAsRead } = useNotificationsStore();
```

### useDashboardStore
```typescript
// Type
export type DashboardStore = {
  dashboard: StudentDashboard | null;
  setDashboard: (dashboard: StudentDashboard) => void;
  updateDashboard: (partial: Partial<StudentDashboard>) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

// Usage
import { useDashboardStore } from '@/hooks/featuresStore';
const { dashboard, setDashboard } = useDashboardStore();
```

---

## ⚡ Server Actions (`src/server/features.ts`)

### Resource Operations
```typescript
// Fetch resources with optional filtering
export async function fetchResources(filter?: ResourceFilter)

// Upload a new resource
export async function uploadResource(resource: Omit<Resource, "id">)

// Delete a resource
export async function deleteResource(resourceId: string)

// Rate a resource
export async function rateResource(
  resourceId: string, 
  rating: number, 
  comment?: string
)
```

### Contribution Operations
```typescript
// Submit a new contribution
export async function submitContribution(
  contribution: Omit<Contribution, "id" | "status">
)

// Fetch user's contributions
export async function fetchMyContributions(userId: string)

// Update a contribution
export async function updateContribution(
  contributionId: string, 
  updates: Partial<Contribution>
)

// Upvote a contribution
export async function upvoteContribution(contributionId: string)
```

### Notification Operations
```typescript
// Fetch notifications
export async function fetchNotifications(studentId: string)

// Mark notification as read
export async function markNotificationAsRead(notificationId: string)

// Delete a notification
export async function deleteNotification(notificationId: string)

// Create a reminder
export async function createReminder(
  reminder: Omit<Reminder, "id" | "createdAt">
)

// Fetch reminders
export async function fetchReminders(studentId: string)

// Complete a reminder
export async function completeReminder(reminderId: string)
```

### Analytics Operations
```typescript
// Fetch performance data
export async function fetchPerformanceData(studentId: string)

// Generate performance insights
export async function generatePerformanceInsights(studentId: string)

// Get study suggestions
export async function getStudySuggestions(
  studentId: string, 
  courseId?: string
)
```

### Dashboard Operations
```typescript
// Fetch complete student dashboard
export async function fetchStudentDashboard(studentId: string)

// Update dashboard preferences
export async function updateDashboardPreferences(
  studentId: string, 
  preferences: Record<string, any>
)
```

---

## 🎨 UI Components

### ResourceRepository
**Path**: `src/app/app/components/resourceRepository.tsx`

```typescript
interface ResourceRepositoryProps {
  initialResources?: Resource[];
}

export default function ResourceRepository(
  props: ResourceRepositoryProps
): JSX.Element

// Sub-components
function ResourceCard(props: { resource: Resource }): JSX.Element
```

**Usage**:
```tsx
import ResourceRepository from '@/app/app/components/resourceRepository';

<ResourceRepository initialResources={resources} />
```

---

### ContributionPanel
**Path**: `src/app/app/components/contributionPanel.tsx`

```typescript
export default function ContributionPanel(): JSX.Element

// Sub-components
function StatCard(props: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "blue" | "purple" | "green";
}): JSX.Element

function ContributionCard(props: {
  contribution: Contribution;
}): JSX.Element
```

**Usage**:
```tsx
import ContributionPanel from '@/app/app/components/contributionPanel';

<ContributionPanel />
```

---

### NotificationCenter
**Path**: `src/app/app/components/notificationCenter.tsx`

```typescript
export default function NotificationCenter(): JSX.Element

// Sub-components
function NotificationItem(props: {
  notification: Notification;
  onMarkAsRead: () => void;
  onDelete: () => void;
}): JSX.Element

function ReminderItem(props: {
  reminder: Reminder;
  onComplete: () => void;
  onDelete: () => void;
}): JSX.Element
```

**Usage**:
```tsx
import NotificationCenter from '@/app/app/components/notificationCenter';

<NotificationCenter />
```

---

### AnalyticsDashboard
**Path**: `src/app/app/components/analyticsDashboard.tsx`

```typescript
interface AnalyticsDashboardProps {
  performance?: CoursePerformance[];
  insights?: PerformanceInsight[];
  alerts?: AtRiskAlert[];
}

export default function AnalyticsDashboard(
  props: AnalyticsDashboardProps
): JSX.Element

// Sub-components
function AlertCard(props: { alert: AtRiskAlert }): JSX.Element
function PerformanceCard(props: {
  course: CoursePerformance;
  selected: boolean;
  onSelect: () => void;
}): JSX.Element
function InsightCard(props: { insight: PerformanceInsight }): JSX.Element
```

**Usage**:
```tsx
import AnalyticsDashboard from '@/app/app/components/analyticsDashboard';

<AnalyticsDashboard 
  performance={performance}
  insights={insights}
  alerts={alerts}
/>
```

---

### EnhancedDashboard
**Path**: `src/app/app/components/enhancedDashboard.tsx`

```typescript
interface EnhancedDashboardProps {
  dashboard?: StudentDashboard;
}

export default function EnhancedDashboard(
  props: EnhancedDashboardProps
): JSX.Element

// Sub-components
function MetricCard(props: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}): JSX.Element

function CourseCard(props: { course: any }): JSX.Element
function TrendCard(props: { trend: any }): JSX.Element
```

**Usage**:
```tsx
import EnhancedDashboard from '@/app/app/components/enhancedDashboard';

<EnhancedDashboard dashboard={dashboard} />
```

---

## 📄 Pages & Layouts

### Resource Pages
**Path**: `src/app/app/resources/`

```
resources/
├── page.tsx        # Main resource repository page
├── layout.tsx      # Resource layout wrapper
```

**Route**: `/app/resources`

### Contribution Pages
**Path**: `src/app/app/contribute/`

```
contribute/
├── page.tsx        # Contribution submission page
├── layout.tsx      # Contribution layout wrapper
```

**Route**: `/app/contribute`

### Notification Pages
**Path**: `src/app/app/notifications/`

```
notifications/
├── page.tsx        # Notification center page
├── layout.tsx      # Notification layout wrapper
```

**Route**: `/app/notifications`

### Analytics Pages
**Path**: `src/app/app/analytics/`

```
analytics/
├── page.tsx        # Analytics dashboard page
├── layout.tsx      # Analytics layout wrapper
```

**Route**: `/app/analytics`

---

## 🔗 Navigation Integration

### Sidebar Updates
**File**: `src/app/app/components/sidebar.tsx`

**New Menu Items Added**:
```typescript
{
  name: "resources",
  url: "/app/resources",
  icon: <BookOpenText className="w-5 h-5" />,
},
{
  name: "contribute",
  url: "/app/contribute",
  icon: <CiShare1 className="w-5 h-5" />,
},
{
  name: "notifications",
  url: "/app/notifications",
  icon: <Bell className="w-5 h-5" />,
},
{
  name: "analytics",
  url: "/app/analytics",
  icon: <TrendingUp className="w-5 h-5" />,
},
```

---

## 📊 Dependencies Added

```json
{
  "dependencies": {
    "recharts": "^2.13.0"  // For performance charts
  }
}
```

---

## 🔍 Import Examples

### Importing Types
```typescript
import type { Resource } from '@/Types/resources';
import type { Contribution } from '@/Types/contributions';
import type { Notification, Reminder } from '@/Types/notifications';
import type { CoursePerformance } from '@/Types/analytics';
import type { StudentDashboard } from '@/Types/dashboard';
```

### Importing Stores
```typescript
import { 
  useResourcesStore,
  useContributionsStore,
  useNotificationsStore,
  useDashboardStore 
} from '@/hooks/featuresStore';
```

### Importing Components
```typescript
import ResourceRepository from '@/app/app/components/resourceRepository';
import ContributionPanel from '@/app/app/components/contributionPanel';
import NotificationCenter from '@/app/app/components/notificationCenter';
import AnalyticsDashboard from '@/app/app/components/analyticsDashboard';
import EnhancedDashboard from '@/app/app/components/enhancedDashboard';
```

### Importing Server Actions
```typescript
import {
  fetchResources,
  uploadResource,
  submitContribution,
  fetchNotifications,
  fetchPerformanceData,
  fetchStudentDashboard
} from '@/server/features';
```

---

## 🎯 Common Usage Patterns

### Loading Resources
```typescript
'use client';
import { useResourcesStore } from '@/hooks/featuresStore';
import { fetchResources } from '@/server/features';
import { useEffect } from 'react';

export default function MyPage() {
  const { setResources } = useResourcesStore();

  useEffect(() => {
    fetchResources().then(result => {
      if (result.success) {
        setResources(result.data);
      }
    });
  }, []);
}
```

### Adding Notifications
```typescript
'use client';
import { useNotificationsStore } from '@/hooks/featuresStore';
import type { Notification } from '@/Types/notifications';

export default function MyComponent() {
  const { addNotification } = useNotificationsStore();

  const handleEvent = () => {
    addNotification({
      id: 'notif_' + Date.now(),
      studentId: 'user123',
      type: 'deadline',
      title: 'Assignment Due',
      message: 'Your assignment is due in 3 days',
      priority: 'high',
      read: false,
      createdAt: new Date(),
    });
  };
}
```

### Accessing Dashboard
```typescript
'use client';
import { useDashboardStore } from '@/hooks/featuresStore';
import { fetchStudentDashboard } from '@/server/features';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { dashboard, setDashboard } = useDashboardStore();

  useEffect(() => {
    fetchStudentDashboard('student123').then(result => {
      if (result.success) {
        setDashboard(result.data);
      }
    });
  }, []);

  if (!dashboard) return <div>Loading...</div>;
  return <div>{dashboard.metrics.overallGPA}</div>;
}
```

---

## ✨ Features Checklist

- [x] Resource Repository - Full search and filter
- [x] Community Contributions - Upload and moderation
- [x] Notifications - Multiple types with preferences
- [x] Analytics - Performance tracking and insights
- [x] Dashboard - Comprehensive academic overview
- [x] Zustand State - Persistent storage
- [x] Server Actions - API-ready
- [x] TypeScript Types - Full coverage
- [x] UI Components - Responsive design
- [x] Navigation - Sidebar integration

---

## 📞 Support

For questions or issues regarding specific components:
1. Check FEATURES_DOCUMENTATION.md for feature details
2. Check INTEGRATION_GUIDE.md for integration help
3. Review IMPLEMENTATION_SUMMARY.md for overview

---

*Last Updated: December 18, 2025*
*All exports and APIs are production-ready*
