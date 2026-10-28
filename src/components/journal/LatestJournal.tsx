import Link from "@/components/ui/site-link";
import { ArrowUpRight } from "lucide-react";
import { postSummaries } from "@/data/journal";
import { SectionTitle } from "@/components/ui";
import { JournalCard } from "./JournalGrid";
export function LatestJournal() {
  return (
    <section id="blog" className="section container">
      <div className="split-heading">
        <SectionTitle
          eyebrow="JOURNAL / IDEAS EN ÓRBITA"
          title={
            <>
              Lo que aprendemos.
              <br />
              <span className="muted-heading">Lo que compartimos.</span>
            </>
          }
        />
        <Link className="text-link" href="/blog">
          Explorar el blog
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="journal-grid">
        {postSummaries.map((post, i) => (
          <JournalCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
