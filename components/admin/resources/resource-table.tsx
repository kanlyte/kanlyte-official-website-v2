"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Search } from "lucide-react";
import { useModalStore } from "@/store/modal.store";
import { useTableStore } from "@/store/table.store";
import { Skeleton } from "@/components/ui/skeleton";

export interface ResourceColumn {
  key: string;
  label: string;
  // Column values come from heterogeneous resource shapes (string, number,
  // boolean, Date) across ~15 admin pages — a precise union isn't practical here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: any) => React.ReactNode;
}

interface ResourceTableProps {
  resource: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ResourceColumn[];
  isLoading?: boolean;
  searchPlaceholder?: string;
}

export function ResourceTable({ resource, data, columns, isLoading, searchPlaceholder }: ResourceTableProps) {
  const open = useModalStore((s) => s.open);
  const { search, setSearch } = useTableStore();

  const filtered = data.filter((row) =>
    Object.values(row).some((v) =>
      String(v ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Card>
      <CardContent className="pt-4 space-y-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder ?? "Search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key}>{col.label}</TableHead>
                ))}
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                    ))}
                    <TableCell><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground py-8">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((col) => (
                      <TableCell key={col.key}>
                        {col.render ? col.render(row[col.key], row) : (
                          <span className="text-sm">{String(row[col.key] ?? "—")}</span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="size-7" onClick={() => open("edit", resource, row)}>
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-7 text-destructive hover:text-destructive" onClick={() => open("delete", resource, row)}>
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {!isLoading && filtered.length > 0 && (
          <p className="text-muted-foreground text-xs">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function ActiveBadge({ value }: { value: boolean }) {
  return <Badge variant={value ? "default" : "secondary"}>{value ? "Active" : "Inactive"}</Badge>;
}

export function OrderBadge({ value }: { value: number }) {
  return <span className="text-muted-foreground text-xs tabular-nums">#{value}</span>;
}
