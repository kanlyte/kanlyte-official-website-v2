import Image from "next/image";
import { Monitor, Headphones, Tags, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ServiceContent() {
  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <div className="space-y-6">
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-[#6EBE45]">
          <div className="absolute inset-0 flex items-center p-8 md:p-12">
            <div className="z-10 w-full max-w-md space-y-4">
              <h1 className="text-4xl font-black tracking-tighter text-white md:text-6xl">
                CLASSIC <br /> WEBSITES
              </h1>
              <p className="text-2xl font-bold text-yellow-400">
                @ CHEAP PRICE
              </p>
              <div className="inline-block rounded-md bg-white px-4 py-1 text-xs font-bold uppercase text-zinc-900">
                Website Design @Kanlyte UG
              </div>
            </div>
            <div className="absolute right-0 top-0 hidden h-full w-1/2 md:block">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#6EBE45] to-transparent" />
                <Image
                  src="/images/image2.jpg"
                  alt="Website Design"
                  fill
                  className="object-cover"
                />
                <div className="absolute right-4 bottom-4 z-20 h-48 w-48 overflow-hidden rounded-full border-4 border-green-500">
                  <Image
                    src="/images/website-image.webp"
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
          <h2 className="text-2xl font-bold text-zinc-900">Website Design</h2>
          <div className="space-y-6 text-zinc-600 leading-relaxed">
            <section>
              <h3 className="font-bold text-zinc-900">Site Architecture</h3>
              <p>
                We start with creating a user centric site architecture. This
                maximises the long term marketing and SEO potential of your
                website.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-zinc-900">Design & Content</h3>
              <p>
                We go into the depths of your business, your brand story, your
                products/ services and then translate them into compelling
                content with smart design.
              </p>
            </section>
            <section>
              <h3 className="font-bold text-zinc-900">Development</h3>
              <p>
                To maximise the RoI on your future marketing efforts, we create
                responsive websites with clean code. It keeps your website fast
                and improves uptime.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Why Need A Website Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-zinc-900">
          So, Why Do You Really Need A Website?
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Driving Conversations – Lead Gen",
              desc: "You want your website visitors to know all about you and be convinced about your capabilities to the extent that they want to talk to you further.",
              icon: Monitor,
            },
            {
              title: "Driving Conversations – eCommerce",
              desc: "You want your website visitors to be truly impressed by your products and complete their purchase process there and then.",
              icon: Tags,
            },
            {
              title: "Fast Support 24/7",
              desc: "We are available 24x7, to provide you the necessary support you need.",
              icon: Headphones,
            },
            {
              title: "Best Pricing",
              desc: "Our pricing is friendly and negotiable.",
              icon: Wrench,
            },
          ].map((benefit, i) => (
            <Card
              key={i}
              className="group border-zinc-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <CardContent className="flex gap-4 p-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-orange-100 opacity-50 group-hover:opacity-100" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-600 shadow-sm border border-green-50">
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

      {/* Quote Form Section */}
      <div className="space-y-8 rounded-2xl bg-zinc-50 p-8">
        <h2 className="text-2xl font-bold text-zinc-900">Contact Us Now</h2>
        <form className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Your Name
            </label>
            <Input className="bg-white" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Your Email
            </label>
            <Input
              className="bg-white"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Subject
            </label>
            <Input
              className="bg-white"
              placeholder="What can we help you with?"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Message
            </label>
            <Textarea
              className="min-h-[120px] bg-white"
              placeholder="Tell us more about your project"
            />
          </div>
          <div className="md:col-span-2">
            <Button className="w-full bg-[#6EBE45] hover:bg-orange-700">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
