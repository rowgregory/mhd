export type DashboardStats = {
  inquiries: { total: number; new: number; latest: string | null };
  projects: { total: number; latest: string | null };
  testimonials: { total: number; visible: number; hidden: number };
  admins: { total: number };
  recentInquiries: {
    id: string;
    name: string;
    message: string;
    status: string;
    createdAt: Date;
  }[];
};

export type Result =
  | { success: true; data: DashboardStats }
  | { success: false; error: string };

export type AdminDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};
