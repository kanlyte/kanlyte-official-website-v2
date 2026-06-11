import Link from "next/link";
import { Images, BarChart2, Briefcase, FolderKanban, ListOrdered, HelpCircle, Handshake, Users, MessageSquareQuote, Milestone, Tag, AppWindow } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RESOURCES = [
  { label: "Hero Slides", href: "/admin/hero-slides", icon: Images },
  { label: "Stats", href: "/admin/stats", icon: BarChart2 },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Process Steps", href: "/admin/process-steps", icon: ListOrdered },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Partners", href: "/admin/partners", icon: Handshake },
  { label: "Team Members", href: "/admin/team-members", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Milestones", href: "/admin/milestones", icon: Milestone },
  { label: "Pricing Plans", href: "/admin/pricing-plans", icon: Tag },
  { label: "Odoo Apps", href: "/admin/odoo-apps", icon: AppWindow },
];

export function QuickLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-none">Content Sections</CardTitle>
        <CardDescription>Jump to any content section to manage it.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {RESOURCES.map(({ label, href, icon: Icon }) => (
          <Button key={href} variant="outline" className="h-auto flex-col gap-1.5 py-3" asChild>
            <Link href={href}>
              <Icon className="size-4" />
              <span className="text-xs">{label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
