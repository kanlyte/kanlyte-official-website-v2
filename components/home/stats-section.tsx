import {
  GraduationCap,
  HeartHandshake,
  Building2,
  Landmark,
  Users,
  Banknote,
  PersonStanding,
} from "lucide-react";

type Stat = { id: string; value: string; label: string };

const FALLBACK_STATS: Stat[] = [
  { id: "1", label: "Happy Customers", value: "10+" },
  { id: "2", label: "Projects Completed", value: "6+" },
  { id: "3", label: "Years of Experience", value: "2+" },
  { id: "4", label: "Team Members", value: "8+" },
];

const SECTORS_SERVED = [
  { id: "1", name: "Education Institutions", icon: GraduationCap },
  { id: "2", name: "NGOs", icon: HeartHandshake },
  { id: "3", name: "Private Companies", icon: Building2 },
  { id: "4", name: "Public / Government", icon: Landmark },
  { id: "5", name: "Communities", icon: Users },
  { id: "6", name: "Financial Institutions", icon: Banknote },
  { id: "7", name: "People", icon: PersonStanding },
];

export function StatsSection({ stats: dbStats }: { stats?: Stat[] }) {
  const stats = dbStats?.length ? dbStats : FALLBACK_STATS;

  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="mx-8 md:mx-14 lg:mx-20 xl:mx-28 2xl:mx-auto 2xl:max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat: { id: string; value: string; label: string }) => (
              <div
                key={stat.id}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/50 p-8 group"
              >
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="relative">
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div>
            <div className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold text-green-600 mb-4">
              Corporate & Professional
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
              Our commitment is to deliver our services seamlessly to you.
            </h2>
            <div className="space-y-4">
              <p className="text-gray-500 font-medium">Sectors We Serve</p>
              <div className="flex flex-wrap gap-3">
                {SECTORS_SERVED.map((sector) => {
                  const Icon = sector.icon;
                  return (
                    <div
                      key={sector.id}
                      title={sector.name}
                      className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-xs font-bold text-gray-500 hover:text-white hover:bg-primary hover:border-primary transition-colors cursor-default"
                    >
                      <Icon className="h-4 w-4" />
                      {sector.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
