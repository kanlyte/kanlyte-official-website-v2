import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const faqs = [
  {
    id: "01",
    question: "How Feasible is my Idea?",
    answer:
      "One of the most common app development questions is whether or not the app that is soon going to be designed, devised, and developed even feasible. Well, the only way to get an answer to this question is to test the idea in the field of real prospects. You will have to take your idea, create a working prototype and then make it open in the public to then see if it is something they would be interested in. Until you take your idea to the prospects or at least see how app similar as yours have performed in the market, there is no way to know if yours would succeed.",
  },
  {
    id: "02",
    question: "Who are my Target Customers?",
    answer:
      "Identifying your target audience is crucial for the success of your application.",
  },
  {
    id: "03",
    question: "What is the Mobile App category?",
    answer:
      "Choosing the right category helps in better visibility and user reach.",
  },
  {
    id: "04",
    question: "How Would I protect my App Idea?",
    answer:
      "There are several legal ways to protect your intellectual property, including NDAs and patents.",
  },
];

// Social media links configuration
const socialLinks = [
  {
    icon: Facebook,
    color: "text-[#1877F2]",
    url: "https://www.facebook.com/kanlyte/",
    label: "Facebook",
  },
  {
    icon: Twitter,
    color: "text-[#1DA1F2]",
    url: "https://x.com/KanlyteUganda",
    label: "Twitter",
  },
  {
    icon: Youtube,
    color: "text-[#FF0000]",
    url: "https://www.youtube.com/@kanlyteug",
    label: "YouTube",
  },
  {
    icon: Linkedin,
    color: "text-[#0A66C2]",
    url: "https://www.linkedin.com/company/kanlyte/",
    label: "LinkedIn",
  },
];

export function FAQContactSection() {
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

              {/* Social Icons with individual links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.label} page`}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform hover:shadow-lg"
                  >
                    <social.icon
                      className={`w-5 h-5 ${social.color} fill-current`}
                    />
                  </a>
                ))}
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
            defaultValue="01"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border rounded-lg overflow-hidden data-[state=open]:border-primary"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline data-[state=open]:bg-primary data-[state=open]:text-primary-foreground [&[data-state=open]>div>svg]:rotate-180 transition-all">
                  <div className="flex items-center gap-4 text-left font-semibold text-lg">
                    <span className="opacity-80">{faq.id}.</span>
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
