import { BookOpen, Clock } from "lucide-react";
import { Disclaimer } from "@/components/Disclaimer";
import { SectionHeader } from "@/components/SectionHeader";
import { educationArticles } from "@/lib/mock-data";

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Education"
        title="Research primers for tokenized real-world assets"
        description="Neutral educational content to help readers understand tokenized assets, liquidity, securities concepts, and diligence workflows."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {educationArticles.map((article) => (
          <article key={article.title} className="rail-card rounded-lg p-5 transition hover:border-railGold/35">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-railGold/25 bg-railGold/10 text-railGold">
              <BookOpen className="h-5 w-5" aria-hidden />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">{article.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{article.summary}</p>
            <p className="mt-5 flex items-center gap-2 text-sm text-zinc-500">
              <Clock className="h-4 w-4" aria-hidden />
              {article.readTime} read
            </p>
          </article>
        ))}
      </div>
      <div className="mt-8">
        <Disclaimer />
      </div>
    </main>
  );
}
