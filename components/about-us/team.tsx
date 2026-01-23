import Image from "next/image";
import { Instagram, Twitter, Linkedin, Github, Music } from "lucide-react";

const team = [
  {
    name: "Nahurira Gaston",
    role: "Managing Director",
    image: "/team-images/gaston.jpg",
    featured: true,
    social: {
      instagram: "https://www.facebook.com/nahurira.gaston.7",
      twitter: "https://twitter.com/gaston_lyte?t=altqfWvEkAV3kT9kBTJu0Q&s=09",
      linkedin: "https://www.linkedin.com/in/nahurira-gaston-b99210280",
      github: "https://github.com/gastoncodes",
      tiktok: "https://tiktok.com/@gaston",
    },
  },
  {
    name: "Aggi Peter",
    role: "Director of Operations",
    image: "/team-images/aggi.jpg",
    social: {
      instagram: "https://instagram.com/apwebdeveloper",
      twitter: "https://twitter.com/aggipeters",
      linkedin: "https://www.linkedin.com/in/aggi-peter-817921219/",
      github: "https://github.com/peteraggi",
      tiktok: "https://tiktok.com/@apwebdeveloper",
    },
  },
  {
    name: "Obua Jonathan",
    role: "Head of marketing",
    image: "/team-images/placeholder.jpg",
    social: {
      instagram: "https://instagram.com/sashagrey",
      twitter: "https://twitter.com/sashagrey",
      linkedin: "https://linkedin.com/in/sashagrey",
      github: "https://github.com/sashagrey",
      tiktok: "https://tiktok.com/@sashagrey",
    },
  },
  {
    name: "Nakimuli Devine",
    role: "Odoo Sales Lead",
    image: "/team-images/devine.jpg",
    social: {
      instagram: "https://instagram.com/elenarodriguez",
      twitter: "https://twitter.com/elenarodriguez",
      linkedin: "https://linkedin.com/in/elenarodriguez",
      github: "https://github.com/elenarodriguez",
      tiktok: "https://tiktok.com/@elenarodriguez",
    },
  },
  {
    name: "Osuku James",
    role: "Sales Person",
    image: "/team-images/osuku.jpeg",
    social: {
      instagram: "https://instagram.com/marcuschen",
      twitter: "https://twitter.com/marcuschen",
      linkedin: "https://linkedin.com/in/marcuschen",
      github: "https://github.com/marcuschen",
      tiktok: "https://tiktok.com/@marcuschen",
    },
  },
  //   {
  //     name: "Sarah Jenkins",
  //     role: "Operations Manager",
  //     image: "/smiling-professional-woman.png",
  //     social: {
  //       instagram: "https://instagram.com/sarahjenkins",
  //       twitter: "https://twitter.com/sarahjenkins",
  //       linkedin: "https://linkedin.com/in/sarahjenkins",
  //       github: "https://github.com/sarahjenkins",
  //       tiktok: "https://tiktok.com/@sarahjenkins",
  //     },
  //   },
];

export function Team() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Our <span className="text-[#6EBE45]">Team</span>
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto text-sm">
          Meet the creative minds behind our success
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#6EBE45] hover:-translate-y-1"
            >
              {/* Image Container - Smaller */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Featured Badge - Smaller */}
                {member.featured && (
                  <div className="absolute top-3 right-3 bg-[#6EBE45] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    Featured
                  </div>
                )}
              </div>

              {/* Name and Role - More Compact */}
              <div className="mb-3">
                <div className="flex flex-col space-y-1">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">
                    {member.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[#6EBE45] font-medium text-sm bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                      {member.role}
                    </p>
                    {member.featured && (
                      <div className="w-2 h-2 bg-[#6EBE45] rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              </div>

              {/* Social Links - More Compact */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">
                    Connect:
                  </span>
                  <div className="flex gap-1.5">
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:border-transparent transition-all duration-200 hover:scale-105"
                      aria-label={`${member.name} Instagram`}
                    >
                      <Instagram className="w-3.5 h-3.5 text-gray-600 hover:text-white" />
                    </a>
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-[#1DA1F2] hover:border-transparent transition-all duration-200 hover:scale-105"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="w-3.5 h-3.5 text-gray-600 hover:text-white" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-[#0077B5] hover:border-transparent transition-all duration-200 hover:scale-105"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-3.5 h-3.5 text-gray-600 hover:text-white" />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-900 hover:border-transparent transition-all duration-200 hover:scale-105"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-3.5 h-3.5 text-gray-600 hover:text-white" />
                    </a>
                    <a
                      href={member.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white hover:bg-black hover:border-transparent transition-all duration-200 hover:scale-105"
                      aria-label={`${member.name} TikTok`}
                    >
                      <Music className="w-3.5 h-3.5 text-gray-600 hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compact Call to Action */}
        <div className="text-center mt-10 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4 text-sm">
            Interested in joining our team?
          </p>
          <a
            href="/careers"
            className="inline-flex items-center gap-1.5 bg-[#6EBE45] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#5EA83A] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm"
          >
            View Open Positions
            <span className="ml-0.5 text-xs">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
