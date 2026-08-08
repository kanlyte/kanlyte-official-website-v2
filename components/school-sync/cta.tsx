import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SchoolSyncCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6EBE45]/10 mb-6">
          <MessageCircle className="w-7 h-7 text-[#6EBE45]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
        <p className="text-slate-500 text-lg mb-8 max-w-xl mx-auto">
          Pricing is based on your school&apos;s size and needs. Contact us and we&apos;ll put together the right plan for your institution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact-us">
            <Button className="bg-[#6EBE45] hover:bg-[#5a9e3a] text-white px-8 py-5 text-base font-semibold">
              Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button variant="outline" className="px-8 py-5 text-base border-slate-200 text-slate-700 hover:border-[#6EBE45] hover:text-[#6EBE45]">
              Talk to Our Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
