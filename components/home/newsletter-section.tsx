"use client";

import { useState } from "react";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useSubscribeNewsletter } from "@/content-manager/hooks/useNewsletterSubscribers";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    subscribe(
      { email },
      {
        onSuccess: () => {
          toast.success("You're subscribed! Thanks for joining our mailing list.");
          setEmail("");
        },
        onError: (err: Error) => {
          toast.error(err.message || "Something went wrong. Please try again.");
        },
      }
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6EBE45] to-[#3E8E24] px-6 py-16 md:px-16 md:py-20 text-center shadow-xl">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:28px_28px]" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm mb-6">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Stay Up To Date With Kanlyte
            </h2>
            <p className="text-white/85 mb-8 max-w-xl mx-auto">
              Subscribe to our mailing list for the latest news, product updates,
              and opportunities from Kanlyte Uganda.
            </p>
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white border-transparent text-gray-900 placeholder:text-gray-400 rounded-full px-6 shadow-sm focus-visible:ring-white/50"
              />
              <button
                type="submit"
                disabled={isPending}
                className="h-12 px-6 shrink-0 inline-flex items-center justify-center gap-2 bg-[#050816] text-white rounded-full font-semibold hover:bg-[#0b1226] transition-colors disabled:opacity-60"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
