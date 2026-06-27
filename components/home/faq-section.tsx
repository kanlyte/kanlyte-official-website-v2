"use client";

import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Instagram,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useFAQs } from "@/content-manager/hooks/useFAQs";
import { useSocialLinks } from "@/content-manager/hooks/useSocialLinks";

const FALLBACK_FAQS = [
  { question: "How Feasible is my Idea?", answer: "One of the most common app development questions is whether or not the app that is soon going to be designed, devised, and developed even feasible. Well, the only way to get an answer to this question is to test the idea in the field of real prospects. You will have to take your idea, create a working prototype and then make it open in the public to then see if it is something they would be interested in." },
  { question: "Who are my Target Customers?", answer: "Identifying your target audience is crucial for the success of your application." },
  { question: "What is the Mobile App category?", answer: "Choosing the right category helps in better visibility and user reach." },
  { question: "How Would I protect my App Idea?", answer: "There are several legal ways to protect your intellectual property, including NDAs and patents." },
];

// Social media icon map
const ICON_MAP: Record<string, React.ElementType> = {
  facebook: Facebook,
  twitter: Twitter,
  "twitter / x": Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
  instagram: Instagram,
};

const FALLBACK_SOCIAL = [
  { id: "1", platform: "Facebook", url: "https://www.facebook.com/kanlyte/", color: "#1877F2" },
  { id: "2", platform: "Twitter / X", url: "https://x.com/KanlyteUganda", color: "#1DA1F2" },
  { id: "3", platform: "YouTube", url: "https://www.youtube.com/@kanlyteug", color: "#FF0000" },
  { id: "4", platform: "LinkedIn", url: "https://www.linkedin.com/company/kanlyte/", color: "#0A66C2" },
];

export function FAQContactSection() {
  const { data: dbFAQs } = useFAQs(true);
  const { data: dbSocial } = useSocialLinks(true);
  const faqs = dbFAQs?.length ? dbFAQs : FALLBACK_FAQS;
  const socialLinks = dbSocial?.length ? dbSocial : FALLBACK_SOCIAL;
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Card Left */}
        <div className="lg:col-span-5 relative group">
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* Background Image with Dark Overlay */}
            <Image
              src="/images/about-04.jpg"
              alt="Contact Background"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-8">
              {/* Profile Image */}
              <div className="relative w-32 h-32 rounded-full border-4 border-white/20 mb-6 overflow-hidden">
                <Image
                  src="/team-images/devine.jpg"
                  alt="Support Representative"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Have Any Questions?
              </h3>

              <div className="space-y-4 mb-8">
                <a
                  href="tel:+256200929550"
                  className="flex items-center justify-center gap-3 text-white hover:text-primary transition-colors text-lg"
                >
                  <Phone className="w-5 h-5 fill-primary text-primary" />
                  <span>(+256) 200 929 550</span>
                </a>
                <a
                  href="mailto:info@kanlyte.com"
                  className="flex items-center justify-center gap-3 text-white hover:text-primary transition-colors text-lg"
                >
                  <Mail className="w-5 h-5 fill-primary text-primary" />
                  <span>info@kanlyte.com</span>
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                {socialLinks.map((social: { id: string; platform: string; url: string; color: string }) => {
                  const Icon = ICON_MAP[social.platform.toLowerCase()] ?? Mail;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.platform} page`}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform hover:shadow-lg"
                    >
                      <Icon className="w-5 h-5" style={{ color: social.color }} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Right */}
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue="item-0"
          >
            {faqs.map((faq: { question: string; answer: string }, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg overflow-hidden data-[state=open]:border-primary"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline data-[state=open]:bg-primary data-[state=open]:text-primary-foreground [&[data-state=open]>div>svg]:rotate-180 transition-all">
                  <div className="flex items-center gap-4 text-left font-semibold text-lg">
                    <span className="opacity-80">{String(index + 1).padStart(2, "0")}.</span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-6 text-muted-foreground leading-relaxed bg-white">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
