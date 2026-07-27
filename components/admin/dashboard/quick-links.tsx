import Link from "next/link";
import { ArrowUpRight, Briefcase, FilePenLine, FolderKanban, Images, Newspaper, Package, Tags, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RESOURCES = [
  { label: "Services", description: "Hierarchy & offerings", href: "/admin/services", icon: Briefcase },
  { label: "Products", description: "Product catalogue", href: "/admin/products", icon: Package },
  { label: "Projects", description: "Portfolio work", href: "/admin/projects", icon: FolderKanban },
  { label: "Pricing", description: "Plans & visibility", href: "/admin/pricing-plans", icon: Tags },
  { label: "Page Content", description: "Page hero content", href: "/admin/page-content", icon: FilePenLine },
  { label: "Gallery", description: "Photos & categories", href: "/admin/gallery-images", icon: Images },
  { label: "News", description: "Articles & updates", href: "/admin/news-posts", icon: Newspaper },
  { label: "Team", description: "People & profiles", href: "/admin/team-members", icon: Users },
];

export function QuickLinks() {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b px-5 py-5">
        <CardTitle>Quick access</CardTitle>
        <CardDescription>Frequently managed website content.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        {RESOURCES.map(({ label, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-primary/20 hover:bg-primary/5"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <Icon className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{label}</p>
              <p className="truncate text-xs text-muted-foreground">{description}</p>
            </div>
            <ArrowUpRight className="size-3.5 text-muted-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
