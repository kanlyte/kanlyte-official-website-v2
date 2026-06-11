"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useContactSubmissions } from "@/content-manager/hooks/useContactSubmissions";
import { format } from "date-fns";
import Link from "next/link";

const STATUS_VARIANT: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  pending: "destructive",
  contacted: "default",
  resolved: "secondary",
};

export function RecentSubmissions() {
  const { data: submissions = [], isLoading } = useContactSubmissions();
  const recent = submissions.slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="leading-none">Recent Submissions</CardTitle>
        <CardDescription>Latest contact form inquiries from the website.</CardDescription>
        <div className="ml-auto">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/contact-submissions">View all</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <p className="text-muted-foreground text-sm py-4 text-center">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((s: any) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">{s.service}</TableCell>
                  <TableCell className="max-w-48 truncate text-muted-foreground">{s.subject}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_VARIANT[s.status] ?? "outline"} className="capitalize">
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {format(new Date(s.createdAt), "dd MMM yyyy")}
                  </TableCell>
                </TableRow>
              ))}
              {recent.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    No submissions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
