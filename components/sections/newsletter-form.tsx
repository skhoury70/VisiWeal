"use client";

import { useState } from "react";
import SubscribeModal from "@/components/sections/subscribe-modal";

type Props = {
  title: string;
  sub: string;
  placeholder: string;
  cta: string;
  privacy: string;
};

export default function NewsletterForm({ title, sub, cta }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-28 md:py-36">
        <div className="container-base">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-4 text-3xl font-display font-light text-white md:text-4xl">
              {title}
            </h2>
            <p className="mb-8 text-gray-400">
              {sub}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full bg-gradient-to-r from-teal-600 to-teal-400 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition-all hover:shadow-teal-500/40 hover:scale-[1.02] cursor-pointer"
            >
              {cta}
            </button>
          </div>
        </div>
      </section>

      <SubscribeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => { }}
      />
    </>
  );
}
