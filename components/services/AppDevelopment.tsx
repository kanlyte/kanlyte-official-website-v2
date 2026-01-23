import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Code,
  Shield,
  Zap,
  Palette,
  Users,
  Headphones,
  Wrench,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AppDevelopmentContent() {
  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <div className="space-y-6">
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#6EBE45] to-emerald-500">
          <div className="absolute inset-0 flex items-center p-8 md:p-12">
            <div className="z-10 w-full max-w-md space-y-4">
              <h1 className="text-4xl font-black tracking-tighter text-white md:text-6xl">
                MOBILE APP <br /> DEVELOPMENT
              </h1>
              <p className="text-2xl font-bold text-yellow-400">
                @ INNOVATIVE SOLUTIONS
              </p>
              <div className="inline-block rounded-md bg-white px-4 py-1 text-xs font-bold uppercase text-[#6EBE45]">
                iOS & Android @Kanlyte UG
              </div>
            </div>
            <div className="absolute right-0 top-0 hidden h-full w-1/2 md:block">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#6EBE45] to-transparent" />
                <Image
                  src="/images/appdev-bg.avif"
                  alt="App Development"
                  fill
                  className="object-cover"
                />
                <div className="absolute right-4 bottom-4 z-20 h-48 w-48 overflow-hidden rounded-full border-4 border-green-500">
                  <Image
                    src="/images/app-dev.jpg"
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
            Mobile App Development
          </h2>
          <div className="space-y-6 text-zinc-600 leading-relaxed">
            <section>
              <h3 className="font-bold text-zinc-900">
                Strategic Planning & Analysis
              </h3>
              <p>
                We begin with comprehensive market research and user analysis to
                create a strategic roadmap for your app. Our goal is to ensure
                your app solves real problems and delivers exceptional value.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-zinc-900">
                UI/UX Design Excellence
              </h3>
              <p>
                Our design team creates intuitive, beautiful interfaces that
                provide seamless user experiences. We focus on user-centered
                design principles to ensure high engagement and satisfaction.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-zinc-900">
                Native & Cross-Platform Development
              </h3>
              <p>
                We build high-performance apps using native technologies (Swift,
                Kotlin) and cross-platform solutions (React Native, Flutter).
                Our code is clean, scalable, and follows best practices.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-zinc-900">
          Why Choose Our App Development Services?
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Native iOS & Android Development",
              desc: "High-performance native apps using Swift for iOS and Kotlin for Android. Optimal speed and device integration.",
              icon: Smartphone,
            },
            {
              title: "Cross-Platform Solutions",
              desc: "Build once, deploy everywhere with React Native and Flutter. Cost-effective without compromising quality.",
              icon: Code,
            },
            {
              title: "Enterprise Security",
              desc: "Bank-level security protocols, data encryption, and secure authentication systems to protect user data.",
              icon: Shield,
            },
            {
              title: "High Performance & Scalability",
              desc: "Optimized apps that load quickly and perform smoothly. Architecture designed for future growth.",
              icon: Zap,
            },
            {
              title: "Custom UI/UX Design",
              desc: "Unique, brand-aligned interfaces that provide intuitive user experiences and drive engagement.",
              icon: Palette,
            },
            {
              title: "Team Augmentation",
              desc: "Augment your existing team with our expert developers, designers, and QA specialists.",
              icon: Users,
            },
            {
              title: "Maintenance & Support",
              desc: "Ongoing maintenance, updates, and 24/7 support to keep your app running smoothly.",
              icon: Headphones,
            },
            {
              title: "API Integration",
              desc: "Seamless integration with third-party services, payment gateways, and enterprise systems.",
              icon: Wrench,
            },
            {
              title: "App Store Optimization",
              desc: "Expert guidance on App Store and Google Play Store submission, optimization, and marketing.",
              icon: Globe,
            },
            {
              title: "Agile Development Process",
              desc: "Transparent development with regular updates, sprints, and opportunities for feedback.",
              icon: Code,
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
          Ready to Build Your App?
        </h3>
        <p className="text-zinc-600 max-w-md mx-auto">
          Get a custom quote for your mobile application project
        </p>
        <Link href="/pricing">
          <Button className="bg-[#6EBE45] hover:bg-green-600 text-white px-8 py-6 text-lg">
            View App Development Pricing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
