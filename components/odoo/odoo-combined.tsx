"use client";
import React, { useState } from "react";
import { OdooHero } from "./hero";
import { AdvisorModal } from "./adviser-modal";

export default function OdooCombined() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <OdooHero onMeetAdvisor={() => setIsModalOpen(true)} />
      <AdvisorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
