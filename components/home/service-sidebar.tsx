import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DynamicIcon } from "@/components/admin/shared/icon-picker";

const FALLBACK_SOCIAL = [
  { id: "1", platform: "Facebook", icon: "Facebook", url: "#", color: "#1877F2" },
  { id: "2", platform: "Twitter", icon: "X", url: "#", color: "#000000" },
  { id: "3", platform: "Youtube", icon: "Youtube", url: "#", color: "#FF0000" },
  { id: "4", platform: "Linkedin", icon: "Linkedin", url: "#", color: "#0A66C2" },
];

const services = [
  { id: "01", name: "Website Design", active: true },
  { id: "02", name: "Odoo Implementation", active: false },
  { id: "03", name: "Software Development", active: false },
  { id: "04", name: "Web Hosting", active: false },
  { id: "05", name: "Email Hosting", active: false },
  { id: "06", name: "Mobile Apps Development", active: false },
  { id: "07", name: "IT Training", active: false },
];

export function ServiceSidebar() {
  return (
    <div className="space-y-6">
      {/* Our Services List */}
      <Card className="overflow-hidden border-zinc-200 shadow-sm">
        <CardHeader className="border-b bg-zinc-50/50 py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 bg-[#6EBE45]" />
            <CardTitle className="text-lg font-bold">Our Services</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.id}>
                <button
                  className={`flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors ${
                    service.active
                      ? "border-[#6EBE45] bg-[#6EBE45] text-white"
                      : "border-zinc-100 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <span className="text-sm font-medium">
                    {service.id}. {service.name}
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 ${
                      service.active ? "text-white" : "text-zinc-400"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Contact Info Widget */}
      <Card className="border-zinc-200 shadow-sm">
        <CardHeader className="py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 bg-[#6EBE45]" />
            <CardTitle className="text-lg font-bold">Contact Info</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="rounded bg-[#6EBE45] p-2 text-white">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-zinc-900">Email Address</p>
              <p className="text-zinc-500">kanlyteug@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="rounded bg-[#6EBE45] p-2 text-white">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-zinc-900">Phone Number</p>
              <p className="text-zinc-500">(+256) 0200 929 550</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="rounded bg-[#6EBE45] p-2 text-white">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-zinc-900">Location</p>
              <p className="text-zinc-500">Kampala (UG)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="rounded bg-[#6EBE45] p-2 text-white">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-zinc-900">Schedule</p>
              <p className="text-zinc-500">Mon to Sat - 08:00am to 06:00pm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Card */}
      <div className="relative overflow-hidden rounded-xl bg-zinc-900 p-8 text-center text-white">
        <div className="absolute inset-0 bg-[url('/working-office-overlay.jpg')] opacity-20" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white/20">
            <Image
              src="/team-images/devine.jpg"
              alt="Support person"
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold">Have Any Questions?</h3>
          <div className="space-y-1">
            <p className="flex items-center justify-center gap-2 text-sm font-medium">
              <Phone className="h-3 w-3" /> (+256) 0200 929 550
            </p>
            <p className="flex items-center justify-center gap-2 text-sm font-medium">
              <Mail className="h-3 w-3" /> kanlyteug@gmail.com
            </p>
          </div>
          <div className="flex gap-2">
            {FALLBACK_SOCIAL.map((social) => (
              <Button
                key={social.id}
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white hover:bg-[#6EBE45] hover:text-white"
                asChild
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <DynamicIcon name={social.icon} className="h-4 w-4" style={{ color: social.color }} />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
