import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Resource, ResourceFilter } from "@/Types/resources";
import type { Contribution } from "@/Types/contributions";
import type { Notification, Reminder } from "@/Types/notifications";
import type { StudentDashboard } from "@/Types/dashboard";

// Resources Store
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
};

export const useResourcesStore = create<ResourcesStore>((set: any, get: any) => ({
  resources: [],
  filteredResources: [],
  filter: {},
  setResources: (resources: Resource[]) => set({ resources }),
  setFilter: (filter: ResourceFilter) => {
    set({ filter });
    const filtered = get().resources.filter((resource: Resource) => {
      if (filter.courseId && resource.courseId !== filter.courseId) return false;
      if (filter.type && resource.type !== filter.type) return false;
      if (filter.tags && !filter.tags.some((tag: string) => resource.tags.includes(tag)))
        return false;
      if (
        filter.searchQuery &&
        !resource.title
          .toLowerCase()
          .includes(filter.searchQuery.toLowerCase()) &&
        !resource.description
          .toLowerCase()
          .includes(filter.searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
    set({ filteredResources: filtered });
  },
  addResource: (resource: Resource) =>
    set((state: any) => ({
      resources: [...state.resources, resource],
    })),
  updateResource: (id: string, resource: Partial<Resource>) =>
    set((state: any) => ({
      resources: state.resources.map((r: Resource) => (r.id === id ? { ...r, ...resource } : r)),
    })),
  deleteResource: (id: string) =>
    set((state: any) => ({
      resources: state.resources.filter((r: Resource) => r.id !== id),
    })),
  searchResources: (query: string) => {
    set({ filter: { searchQuery: query } });
    const filtered = get().resources.filter(
      (resource: Resource) =>
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        resource.description.toLowerCase().includes(query.toLowerCase())
    );
    set({ filteredResources: filtered });
  },
}));

// Contributions Store
export type ContributionsStore = {
  contributions: Contribution[];
  myContributions: Contribution[];
  setContributions: (contributions: Contribution[]) => void;
  setMyContributions: (contributions: Contribution[]) => void;
  addContribution: (contribution: Contribution) => void;
  updateContribution: (id: string, contribution: Partial<Contribution>) => void;
  deleteContribution: (id: string) => void;
};

export const useContributionsStore = create<ContributionsStore>((set: any) => ({
  contributions: [],
  myContributions: [],
  setContributions: (contributions: Contribution[]) => set({ contributions }),
  setMyContributions: (contributions: Contribution[]) => set({ myContributions: contributions }),
  addContribution: (contribution: Contribution) =>
    set((state: any) => ({
      contributions: [...state.contributions, contribution],
    })),
  updateContribution: (id: string, contribution: Partial<Contribution>) =>
    set((state: any) => ({
      contributions: state.contributions.map((c: Contribution) =>
        c.id === id ? { ...c, ...contribution } : c
      ),
    })),
  deleteContribution: (id: string) =>
    set((state: any) => ({
      contributions: state.contributions.filter((c: Contribution) => c.id !== id),
    })),
}));

// Notifications Store
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
};

export const useNotificationsStore = create<NotificationsStore>(
  persist(
    (set: any, get: any) => ({
      notifications: [],
      reminders: [],
      unreadCount: 0,
      setNotifications: (notifications: Notification[]) => {
        const unreadCount = notifications.filter((n: Notification) => !n.read).length;
        set({ notifications, unreadCount });
      },
      setReminders: (reminders: Reminder[]) => set({ reminders }),
      addNotification: (notification: Notification) =>
        set((state: any) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        })),
      markAsRead: (id: string) =>
        set((state: any) => ({
          notifications: state.notifications.map((n: Notification) =>
            n.id === id ? { ...n, read: true, readAt: new Date() } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),
      deleteNotification: (id: string) =>
        set((state: any) => ({
          notifications: state.notifications.filter((n: Notification) => n.id !== id),
        })),
      addReminder: (reminder: Reminder) =>
        set((state: any) => ({
          reminders: [...state.reminders, reminder],
        })),
      completeReminder: (id: string) =>
        set((state: any) => ({
          reminders: state.reminders.map((r: Reminder) =>
            r.id === id ? { ...r, completed: true, completedAt: new Date() } : r
          ),
        })),
      deleteReminder: (id: string) =>
        set((state: any) => ({
          reminders: state.reminders.filter((r: Reminder) => r.id !== id),
        })),
    }),
    {
      name: "notifications-storage",
    }
  )
);

// Dashboard Store
export type DashboardStore = {
  dashboard: StudentDashboard | null;
  setDashboard: (dashboard: StudentDashboard) => void;
  updateDashboard: (partial: Partial<StudentDashboard>) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useDashboardStore = create<DashboardStore>((set: any) => ({
  dashboard: null,
  setDashboard: (dashboard: StudentDashboard) => set({ dashboard }),
  updateDashboard: (partial: Partial<StudentDashboard>) =>
    set((state: any) => ({
      dashboard: state.dashboard ? { ...state.dashboard, ...partial } : null,
    })),
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
