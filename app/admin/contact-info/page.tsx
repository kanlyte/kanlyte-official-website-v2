"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useContactInfo, useUpsertContactInfo } from "@/content-manager/hooks/useContactInfo";
import { ContactInfoSchema, type ContactInfoInput } from "@/content-manager/dtos/contact-info.dto";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contentSections = [
  {
    title: "Page Header",
    fields: [
      ["heroImage", "Background image", "/images/pricing.webp"],
      ["heroTitle", "Title", "Get In Touch"],
      ["heroHighlight", "Highlighted word", "Touch"],
      ["heroTagline", "Tagline", "We'd Love to Hear From You"],
    ],
  },
  {
    title: "Introduction & Form",
    fields: [
      ["introTitle", "Introduction title", "Get in Touch"],
      ["introHighlight", "Highlighted word", "Touch"],
      ["introDescription", "Introduction description", "Have a project in mind?"],
      ["formTitle", "Form title", "Send us a message"],
      ["formDescription", "Form description", "Fill out the form below..."],
      ["newsletterText", "Newsletter text", "Subscribe to our newsletter..."],
      ["submitButtonText", "Submit button", "Send Message"],
    ],
  },
  {
    title: "Contact Cards",
    fields: [
      ["callTitle", "Phone card title", "Call Us"],
      ["callDescription", "Phone card description", "Speak directly with our team"],
      ["emailTitle", "Email card title", "Email Us"],
      ["emailDescription", "Email card description", "Send us an email anytime"],
      ["emailResponseText", "Email response note", "Typically reply within 24h"],
      ["visitTitle", "Address card title", "Visit Us"],
      ["visitDescription", "Address card description", "Our office location"],
      ["companyName", "Company name", "Kanlyte Uganda Limited"],
      ["hoursTitle", "Hours card title", "Business Hours"],
    ],
  },
  {
    title: "Map & Calls to Action",
    fields: [
      ["locationTitle", "Map title", "Our Location"],
      ["locationSubtitle", "Map subtitle", "Kampala, Uganda"],
      ["directionsUrl", "Directions URL", "https://maps.google.com/..."],
      ["mapEmbedUrl", "Google Maps embed src", "https://www.google.com/maps/embed?..."],
      ["urgentTitle", "Urgent CTA title", "Need Immediate Assistance?"],
      ["urgentDescription", "Urgent CTA description", "Contact us now for urgent inquiries"],
      ["statsTitle", "Statistics title", "Why Clients Choose Kanlyte"],
      ["statsDescription", "Statistics description", "We're committed to delivering..."],
    ],
  },
] as const;

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
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Contact Info</h1>
        <p className="text-sm text-muted-foreground">Manage every editable section of the Contact Us page.</p>
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

            {contentSections.map((section) => (
              <div key={section.title} className="space-y-4 border-t pt-6">
                <h2 className="font-semibold">{section.title}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {section.fields.map(([name, label, placeholder]) => {
                    const multiline = name.toLowerCase().includes("description") ||
                      name === "newsletterText" || name === "mapEmbedUrl";
                    return (
                      <div key={name} className={`space-y-1 ${multiline ? "md:col-span-2" : ""}`}>
                        <Label htmlFor={name} className="text-xs">{label}</Label>
                        {multiline ? (
                          <Textarea id={name} placeholder={placeholder} {...register(name)} />
                        ) : (
                          <Input id={name} placeholder={placeholder} {...register(name)} />
                        )}
                        {errors[name] && <p className="text-destructive text-xs">{errors[name]?.message}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <Button type="submit" disabled={isPending || !isDirty}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
