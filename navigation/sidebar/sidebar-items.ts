import {
  type LucideIcon,
  LayoutDashboard,
  Images,
  BarChart2,
  Briefcase,
  FolderKanban,
  ListOrdered,
  HelpCircle,
  Handshake,
  Users,
  MessageSquareQuote,
  Milestone,
  Tag,
  AppWindow,
  Mail,
  Share2,
  Phone,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    id: 2,
    label: "Homepage Content",
    items: [
      { title: "Hero Slides", url: "/admin/hero-slides", icon: Images },
      { title: "Stats", url: "/admin/stats", icon: BarChart2 },
      { title: "Services", url: "/admin/services", icon: Briefcase },
      { title: "Projects", url: "/admin/projects", icon: FolderKanban },
      { title: "Process Steps", url: "/admin/process-steps", icon: ListOrdered },
      { title: "FAQs", url: "/admin/faqs", icon: HelpCircle },
      { title: "Partners", url: "/admin/partners", icon: Handshake },
      { title: "Social Links", url: "/admin/social-links", icon: Share2 },
    ],
  },
  {
    id: 3,
    label: "About & Team",
    items: [
      { title: "Team Members", url: "/admin/team-members", icon: Users },
      { title: "Testimonials", url: "/admin/testimonials", icon: MessageSquareQuote },
      { title: "Milestones", url: "/admin/milestones", icon: Milestone },
    ],
  },
  {
    id: 4,
    label: "Pricing & Products",
    items: [
      { title: "Pricing Plans", url: "/admin/pricing-plans", icon: Tag },
      { title: "Odoo Apps", url: "/admin/odoo-apps", icon: AppWindow },
    ],
  },
  {
    id: 5,
    label: "Settings",
    items: [
      { title: "Contact Info", url: "/admin/contact-info", icon: Phone },
    ],
  },
  {
    id: 6,
    label: "Inquiries",
    items: [
      { title: "Contact Submissions", url: "/admin/contact-submissions", icon: Mail },
    ],
  },
];
