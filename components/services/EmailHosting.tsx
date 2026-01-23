import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Shield,
  Server,
  Zap,
  Globe,
  Users,
  Lock,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function EmailHostingContent() {
  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <div className="space-y-6">
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#6EBE45] to-emerald-500">
          <div className="absolute inset-0 flex items-center p-8 md:p-12">
            <div className="z-10 w-full max-w-md space-y-4">
              <h1 className="text-4xl font-black tracking-tighter text-white md:text-6xl">
                PROFESSIONAL <br /> EMAIL HOSTING
              </h1>
              <p className="text-2xl font-bold text-yellow-400">
                @ COMPETITIVE RATES
              </p>
              <div className="inline-block rounded-md bg-white px-4 py-1 text-xs font-bold uppercase text-[#6EBE45]">
                Secure & Reliable @Kanlyte UG
              </div>
            </div>
            <div className="absolute right-0 top-0 hidden h-full w-1/2 md:block">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#6EBE45] to-transparent" />
                <Image
                  src="/images/email-pricing.jpg"
                  alt="Email Hosting"
                  fill
                  className="object-cover"
                />
                <div className="absolute right-4 bottom-4 z-20 h-48 w-48 overflow-hidden rounded-full border-4 border-green-500">
                  <Image
                    src="/images/email-pricing.jpg"
                    alt="Details"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Decorative dots/shapes */}
          <div className="absolute left-4 bottom-4 flex gap-1">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-yellow-400/50" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900">
            Professional Email Hosting
          </h2>
          <div className="space-y-6 text-zinc-600 leading-relaxed">
            <section>
              <h3 className="font-bold text-zinc-900">
                Secure & Reliable Infrastructure
              </h3>
              <p>
                Our email hosting runs on enterprise-grade servers with 99.9%
                uptime guarantee. Advanced spam filtering and virus protection
                keep your communications safe and secure.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-zinc-900">Custom Domain Email</h3>
              <p>
                Create professional email addresses with your own domain
                (you@yourbusiness.com). Build trust with clients and establish
                your brand identity with every email you send.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-zinc-900">Seamless Integration</h3>
              <p>
                Access your emails from anywhere using webmail, or sync with
                Outlook, Thunderbird, and mobile devices. Generous storage
                ensures you never run out of space.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-zinc-900">
          Why Choose Our Email Hosting?
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Enhanced Security & Spam Protection",
              desc: "Multi-layered security with advanced spam filtering, virus scanning, and DDoS protection to keep your communications safe.",
              icon: Shield,
            },
            {
              title: "High Performance Servers",
              desc: "Lightning-fast email delivery with 99.9% uptime guarantee. Enterprise-grade infrastructure ensures reliability.",
              icon: Server,
            },
            {
              title: "Generous Storage Space",
              desc: "Ample storage for all your emails and attachments. Never worry about running out of space with our scalable solutions.",
              icon: Zap,
            },
            {
              title: "Custom Domain & Branding",
              desc: "Professional email addresses with your domain name. Multiple mailbox options for teams of all sizes.",
              icon: Globe,
            },
            {
              title: "Team Collaboration Tools",
              desc: "Shared calendars, contacts, and tasks. Perfect for businesses that need seamless team coordination.",
              icon: Users,
            },
            {
              title: "Data Encryption & Backup",
              desc: "End-to-end encryption and regular backups ensure your important emails and data are always protected.",
              icon: Lock,
            },
            {
              title: "24/7 Technical Support",
              desc: "Round-the-clock expert support via phone, email, and chat. We're here whenever you need assistance.",
              icon: Headphones,
            },
            {
              title: "Easy Migration",
              desc: "Seamless migration from your current provider. We handle everything – no downtime, no data loss.",
              icon: Mail,
            },
          ].map((benefit, i) => (
            <Card
              key={i}
              className="group border-zinc-100 bg-white shadow-sm transition-all hover:shadow-md hover:border-green-200"
            >
              <CardContent className="flex gap-4 p-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-green-100 opacity-50 group-hover:opacity-100" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#6EBE45] shadow-sm border border-green-50">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-zinc-900">{benefit.title}</h4>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {benefit.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Button for Pricing */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-zinc-900">
          Ready to Get Started?
        </h3>
        <p className="text-zinc-600 max-w-md mx-auto">
          Choose the perfect email hosting plan for your business needs
        </p>
        <Link href="/pricing">
          <Button className="bg-[#6EBE45] hover:bg-green-600 text-white px-8 py-6 text-lg">
            View Pricing Plans
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
