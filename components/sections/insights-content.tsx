"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";
import { Badge } from "@/components/ui/badge";

type Article = {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  slug: string;
  image: string;
};

type Props = {
  categories: Record<string, string>;
  featured: Article;
  articles: Article[];
};

export default function InsightsContent({ categories, featured, articles }: Props) {
  const params = useParams();
  const locale = params.locale as string;
  const [active, setActive] = useState("all");

  const catMap = Object.entries(categories);

  const filtered = active === "all"
    ? articles
    : articles.filter((a) => a.category === categories[active]);

  const showFeatured = active === "all" || featured.category === categories[active];

  return (
    <>
      <div className="container-base">
        <div className="mt-12 flex flex-wrap justify-center gap-2" suppressHydrationWarning>
          {catMap.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                active === key
                  ? "border-teal-500/40 bg-teal-500/10 text-teal-400"
                  : "border-white/10 text-gray-400 hover:border-teal-500/30 hover:text-teal-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative my-16">
        <div className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      </div>

      <section className="pb-28 md:pb-36">
        <div className="container-base">
          {showFeatured && (
            <ScrollReveal>
              <div className="mb-16">
                <p className="mb-2 text-xs font-semibold tracking-widest text-teal-400 uppercase">
                  Featured
                </p>
                <Link href={`/${locale}/insights/${featured.slug}`}>
                  <GlassCard className="group relative overflow-hidden p-0">
                    <div className="absolute inset-0">
                      <Image
                        src={featured.image}
                        alt=""
                        fill
                        className="object-cover object-center opacity-60 transition-opacity duration-700 group-hover:opacity-70"
                        sizes="100vw"
                        loading="lazy"
                        quality={80}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0C1820] via-[#0C1820]/50 to-[#0C1820]/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent mix-blend-overlay" />
                    <div className="relative p-8 md:p-12">
                      <Badge className="mb-4 inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400 backdrop-blur-sm">
                        {featured.category}
                      </Badge>
                      <h2 className="mb-4 text-2xl font-display font-medium text-white md:text-3xl">
                        {featured.title}
                      </h2>
                      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-gray-400">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{featured.author}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-600" />
                        <span>{featured.readTime}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </div>
            </ScrollReveal>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {filtered.length > 0 ? (
              filtered.map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 0.06}>
                  <Link href={`/${locale}/insights/${article.slug}`}>
                    <GlassCard className="group h-full overflow-hidden">
                      <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-t-xl">
                        <Image
                          src={article.image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                          loading="lazy"
                          quality={80}
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,24,32,0.3) 0%, rgba(12,24,32,0.7) 100%)' }} />
                        <Badge className="absolute bottom-3 left-3 inline-flex rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400 backdrop-blur-sm">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="px-4 pb-4">
                        <h3 className="mb-3 text-lg font-display font-medium text-white transition-colors group-hover:text-teal-400">
                          {article.title}
                        </h3>
                        <p className="mb-4 text-sm leading-relaxed text-gray-400">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{article.author}</span>
                          <span className="h-1 w-1 rounded-full bg-gray-600" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-sm text-gray-500">No articles in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
