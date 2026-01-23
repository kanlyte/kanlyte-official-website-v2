"use client";

import { X, Mail, Linkedin, Twitter, MessageCircle, Music } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvisorModal({ isOpen, onClose }: AdvisorModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content */}
        <div className="pt-8 pb-6 px-6 flex flex-col items-center text-center">
          {/* Profile picture - round */}
          <div className="mb-8">
            <div className="relative w-48 h-48">
              <Image
                src="/team-images/aggi.jpg"
                alt="Odoo Expert Aggi Peter"
                fill
                className="rounded-full object-cover border-4 border-[#6EBE45]/20"
                sizes="(max-width: 192px) 100vw, 192px"
              />
            </div>
          </div>

          {/* Name and title */}
          <h2 className="text-2xl font-bold text-[#212529] mb-1">Aggi Peter</h2>
          <p className="text-sm text-[#6EBE45] font-semibold mb-4">
            Odoo Expert
          </p>

          {/* Brief description */}
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Expert in Odoo implementation and business process optimization.
            Ready to help your business thrive with the right solutions.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200 mb-6"></div>

          {/* Contact information */}
          <div className="w-full space-y-4">
            {/* Email */}
            <a
              href="mailto:aggipeter25@gmail.com"
              className="flex items-center justify-center gap-3 text-gray-700 hover:text-[#6EBE45] transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">aggipeter25@gmail.com</span>
            </a>

            {/* WhatsApp - Added */}
            <a
              href="https://wa.me/256778089708" // Replace with actual WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 text-gray-700 hover:text-[#6EBE45] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">+ (256) 778 089 708</span>{" "}
              {/* Replace with actual number */}
            </a>

            {/* Social media handles - Updated with TikTok */}
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/aggi-peter-817921219/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6EBE45] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/aggipeters"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6EBE45] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              {/* TikTok - Added */}
              <a
                href="https://tiktok.com/@apwebdeveloper" // Replace with actual TikTok URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#6EBE45] transition-colors"
                aria-label="TikTok"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-6 w-full bg-[#6EBE45] hover:bg-[#5a9e3a] text-white font-semibold py-2 px-4 rounded-md transition-colors">
            Call Odoo Expert Now
          </button>
        </div>
      </div>
    </div>
  );
}
