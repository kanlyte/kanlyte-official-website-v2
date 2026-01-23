"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageSquare,
  Calendar,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/actions/contact-submission";

// Define the form schema with Zod (matching server schema) - REMOVED agreeToTerms
const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  subscribe: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

// Define error type for validation errors
interface ValidationError {
  message: string;
  path?: string[];
}

// Service options based on Kanlyte's services
const serviceOptions = [
  "Software & Systems Development",
  "Mobile App Development",
  "Website Design & Development",
  "UI/UX Design",
  "Graphics Design & Branding",
  "Cloud Hosting & Domain Services",
  "AI & Data Analytics",
  "Business Automation",
  "Internet of Things (IoT)",
  "ICT Training & Skilling",
  "IT Consulting",
  "Other Services",
];

export function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      service: "",
      message: "",
      subscribe: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result = await submitContactForm({
        ...data,
        service: selectedService || data.service,
      });

      if (result.success) {
        toast.success("Message sent successfully!", {
          description:
            "We&apos;ll get back to you within 24 hours. Check your email for confirmation.",
          duration: 5000,
        });

        // Reset form
        reset();
        setSelectedService("");
      } else {
        if (result.errors) {
          result.errors.forEach((error: ValidationError) => {
            toast.error(`Validation Error: ${error.message}`);
          });
        } else {
          toast.error(
            result.message || "Failed to send message. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6EBE45]/5 via-white to-[#6EBE45]/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#6EBE45]/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6EBE45]/5 rounded-full -translate-x-48 translate-y-48" />

        <div className="container relative mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#6EBE45]/10 mb-6">
              <MessageSquare className="h-10 w-10 text-[#6EBE45]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get in <span className="text-[#6EBE45]">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss how we can bring your
              vision to life with our digital solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="relative px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Send us a message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and our team will contact you within
                    24 hours.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  aria-disabled={isSubmitting}
                >
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="fullName"
                        className="text-gray-700 font-medium"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Your name"
                        disabled={isSubmitting}
                        className={`h-12 transition-all ${
                          errors.fullName ? "border-red-500" : "border-gray-300"
                        } ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                        {...register("fullName")}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1 animate-in fade-in">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-medium"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        disabled={isSubmitting}
                        className={`h-12 transition-all ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1 animate-in fade-in">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="phone"
                        className="text-gray-700 font-medium"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+256 700 123 456"
                        disabled={isSubmitting}
                        className={`h-12 transition-all ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1 animate-in fade-in">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="company"
                        className="text-gray-700 font-medium"
                      >
                        Company (Optional)
                      </Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        disabled={isSubmitting}
                        className={`h-12 transition-all border-gray-300 ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                        {...register("company")}
                      />
                    </div>
                  </div>

                  {/* Subject & Service */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="subject"
                        className="text-gray-700 font-medium"
                      >
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        placeholder="What are you looking for?"
                        disabled={isSubmitting}
                        className={`h-12 transition-all ${
                          errors.subject ? "border-red-500" : "border-gray-300"
                        } ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                        {...register("subject")}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500 mt-1 animate-in fade-in">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="service"
                        className="text-gray-700 font-medium"
                      >
                        Service Interested In *
                      </Label>
                      <select
                        id="service"
                        disabled={isSubmitting}
                        className={`w-full h-12 px-3 rounded-md border transition-all ${
                          errors.service ? "border-red-500" : "border-gray-300"
                        } bg-white focus:outline-none focus:ring-2 focus:ring-[#6EBE45]/50 focus:border-[#6EBE45] ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                        value={selectedService}
                        onChange={(e) => {
                          setSelectedService(e.target.value);
                          setValue("service", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-sm text-red-500 mt-1 animate-in fade-in">
                          {errors.service.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="message"
                      className="text-gray-700 font-medium"
                    >
                      Your Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, requirements, and goals..."
                      disabled={isSubmitting}
                      className={`min-h-[150px] resize-none transition-all ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1 animate-in fade-in">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Newsletter Subscription */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="subscribe"
                        disabled={isSubmitting}
                        className={`mt-1 transition-all data-[state=checked]:bg-[#6EBE45] data-[state=checked]:border-[#6EBE45] ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                        {...register("subscribe")}
                      />
                      <Label
                        htmlFor="subscribe"
                        className={`text-sm text-gray-600 cursor-pointer transition-all ${
                          isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                      >
                        Subscribe to our newsletter for tech insights, updates,
                        and exclusive offers
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button with Enhanced Loading */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full h-14 
                        bg-[#6EBE45] 
                        hover:bg-[#5EA83A] 
                        text-white 
                        text-lg 
                        font-semibold 
                        rounded-xl 
                        shadow-lg 
                        hover:shadow-xl 
                        transition-all 
                        duration-300
                        flex items-center justify-center
                        ${isSubmitting ? "cursor-not-allowed opacity-90" : ""}
                      `}
                      aria-live="polite"
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>

                    {/* Progress indicator */}
                    {isSubmitting && (
                      <div className="mt-3 animate-in fade-in">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-[#6EBE45] h-1.5 rounded-full animate-pulse transition-all duration-1000"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">
                          Processing your submission...
                        </p>
                      </div>
                    )}

                    {!isSubmitting && isDirty && (
                      <p className="text-xs text-gray-500 text-center mt-3">
                        Ready to submit your message
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Phone Card */}
                <div className="bg-gradient-to-br from-[#6EBE45]/10 to-[#6EBE45]/5 rounded-2xl p-6 border border-[#6EBE45]/20 hover:border-[#6EBE45]/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#6EBE45]/20 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-[#6EBE45]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Call Us
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Speak directly with our team
                  </p>
                  <a
                    href="tel:+256762534356"
                    className="text-xl font-bold text-gray-900 hover:text-[#6EBE45] transition-colors inline-flex items-center gap-2 group"
                  >
                    +256 200 929 550
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-sm text-gray-500 mt-2">
                    Mon-Fri, 8am-6pm EAT
                  </p>
                </div>

                {/* Email Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-600 mb-3">Send us an email anytime</p>
                  <a
                    href="mailto:kanlyteug@gmail.com"
                    className="text-lg font-medium text-gray-900 hover:text-[#6EBE45] transition-colors break-all"
                  >
                    kanlyteug@gmail.com
                  </a>
                  <p className="text-sm text-gray-500 mt-2">
                    Typically reply within 24h
                  </p>
                </div>

                {/* Location Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 mb-3">Our office location</p>
                  <div className="text-gray-900">
                    <p className="font-medium">Kanlyte Uganda Limited</p>
                    <p className="text-sm mt-1">P.O.Box 160188 Kampala</p>
                    <p className="text-sm">Kampala, Uganda</p>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        Mon - Fri
                      </p>
                      <p className="text-sm text-gray-600">8:00 AM - 6:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        Saturday
                      </p>
                      <p className="text-sm text-gray-600">9:00 AM - 1:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 font-medium">
                        Sunday
                      </p>
                      <p className="text-sm text-gray-600">Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Our Location
                    </h3>
                    <p className="text-gray-600">Kampala, Uganda</p>
                  </div>
                  <Button
                    className="bg-[#6EBE45] hover:bg-[#5EA83A] rounded-xl transition-all"
                    asChild
                  >
                    <a
                      href="https://maps.google.com/?q=Kampala,Uganda"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                  </Button>
                </div>

                {/* Map Placeholder */}
                <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#6EBE45]/20 flex items-center justify-center mx-auto mb-4">
                        <MapPin className="h-6 w-6 text-[#6EBE45]" />
                      </div>
                      <p className="font-medium text-gray-900">
                        Kampala Office
                      </p>
                      <p className="text-sm text-gray-600">
                        Interactive map would display here
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact CTA */}
              <div className="bg-gradient-to-r from-[#6EBE45] to-[#5EA83A] rounded-2xl p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Need Immediate Assistance?
                    </h3>
                    <p className="opacity-90">
                      Contact us now for urgent inquiries
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button
                    className="flex-1 h-12 bg-white text-[#6EBE45] hover:bg-gray-100 rounded-lg font-semibold"
                    asChild
                  >
                    <a href="tel:+256778089708">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button
                    className="flex-1 h-12 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg font-semibold"
                    asChild
                  >
                    <a
                      href="https://wa.me/256778089708"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Clients Choose Kanlyte
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We&apos;re committed to delivering exceptional digital solutions
                with transparency and expertise
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "24/7", label: "Support Available" },
                { number: "90%+", label: "Client Satisfaction" },
                { number: "50+", label: "Projects Completed" },
                { number: "100%", label: "Custom Solutions" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-200 text-center hover:border-[#6EBE45]/30 hover:shadow-md transition-all"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#6EBE45] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
