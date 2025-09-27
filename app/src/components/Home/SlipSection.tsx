// components/SlipSection.tsx
import React from "react";
import SlipCard from "./SlipCard";

export default function SlipSection() {
  const slips = [
    { title: "Slip 1", description: "Ini adalah slip pertama." },
    { title: "Slip 2", description: "Ini adalah slip kedua." },
    { title: "Slip 3", description: "Ini adalah slip ketiga." },
  ];

  return (
    <section className="bg-[#DEF3FF] py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {slips.map((slip, idx) => (
          <SlipCard key={idx} title={slip.title} />
        ))}
      </div>
    </section>
  );
}
