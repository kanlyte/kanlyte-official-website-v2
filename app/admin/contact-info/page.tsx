"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useContactInfo, useUpsertContactInfo } from "@/content-manager/hooks/useContactInfo";
import { ContactInfoSchema, type ContactInfoInput } from "@/content-manager/dtos/contact-info.dto";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactInfoPage() {
  const { data, isLoading } = useContactInfo();
  const { mutate: upsert, isPending } = useUpsertContactInfo();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ContactInfoInput>({
    resolver: zodResolver(ContactInfoSchema),
    defaultValues: { phone: "", email: "", address: "", schedule: "" },
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  function onSubmit(values: ContactInfoInput) {
    upsert(values);
  }

  if (isLoading) return <div className="p-6 text-muted-foreground">Loading...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Contact Info</h1>
        <p className="text-sm text-muted-foreground">Manage company contact details displayed across the website.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Company Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="phone" className="flex items-center gap-2 text-xs">
                <Phone className="h-3 w-3" /> Phone
              </Label>
              <Input id="phone" placeholder="(+256) 200 929 550" {...register("phone")} />
              {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="flex items-center gap-2 text-xs">
                <Mail className="h-3 w-3" /> Email
              </Label>
              <Input id="email" type="email" placeholder="info@kanlyte.com" {...register("email")} />
              {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="address" className="flex items-center gap-2 text-xs">
                <MapPin className="h-3 w-3" /> Address
              </Label>
              <Input id="address" placeholder="Kampala (UG)" {...register("address")} />
              {errors.address && <p className="text-destructive text-xs">{errors.address.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="schedule" className="flex items-center gap-2 text-xs">
                <Clock className="h-3 w-3" /> Schedule
              </Label>
              <Input id="schedule" placeholder="Mon to Sat - 08:00am to 06:00pm" {...register("schedule")} />
              {errors.schedule && <p className="text-destructive text-xs">{errors.schedule.message}</p>}
            </div>

            <Button type="submit" disabled={isPending || !isDirty}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
