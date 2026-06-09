import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--blog-bg)] text-[var(--blog-text)]">
      {/* HERO SECTION */}
      <header className="relative pt-32 pb-20 overflow-hidden border-b border-[var(--blog-border)]">
        <div className="absolute inset-0 z-0 opacity-40" 
             style={{ 
               backgroundImage: `linear-gradient(var(--blog-border) 1px, transparent 1px), linear-gradient(90deg, var(--blog-border) 1px, transparent 1px)`,
               backgroundSize: '60px 60px',
               maskImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6) 40%, transparent)'
             }}>
        </div>
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(232,255,71,0.05),transparent_70%)] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono tracking-[0.2em] uppercase border border-[var(--blog-accent)] text-[var(--blog-accent)] animate-fade-in">
            Available for Projects
          </div>
          <h1 className="text-5xl md:text-7xl font-heading mb-6 leading-[1.1] animate-fade-up">
            Architecting <em className="italic text-[var(--blog-accent)] not-italic">Digital</em> <br />
            Experiences.
          </h1>
          <p className="max-w-xl text-lg text-[var(--blog-text-dim)] font-serif italic animate-fade-up [animation-delay:0.2s]">
            A collection of deep-dives into software engineering, security, and the art of building scalable systems.
          </p>
        </div>
      </header>

      {/* ARTICLES SECTION */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-sm font-mono tracking-widest uppercase text-[var(--blog-muted)]">
            Latest Writing
          </h2>
          <div className="h-[1px] flex-grow mx-8 bg-[var(--blog-border)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* FUN AT OFFICE — NEW */}
          <Link href="/blogs/fun-at-office" className="group block col-span-1 md:col-span-2">
            <article className="relative bg-[var(--blog-surface)] border border-[#fb923c] p-8 md:p-12 rounded-lg transition-all duration-500 hover:border-[var(--blog-accent)] hover:translate-y-[-4px]">
              <div className="flex flex-wrap gap-3 mb-6 items-center">
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[#fb923c] text-[#fb923c]">Culture</span>
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-accent)] text-[var(--blog-accent)]">People</span>
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-muted)] text-[var(--blog-muted)]">Opinion</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-heading mb-4 group-hover:text-[#fb923c] transition-colors flex flex-wrap items-center gap-4">
                Your Laptop Is Not Your Best Friend: The Case for Actually Having Fun at Work
                <span className="inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-[#fb923c] text-[var(--blog-bg)] rounded-sm align-middle leading-none">NEW</span>
              </h3>
              <p className="text-[var(--blog-text-dim)] mb-8 max-w-2xl text-lg font-serif italic">
                On burnout, the 3 PM slump, and why fifteen minutes of something silly is one of the highest-leverage things a team can do together.
              </p>
              <div className="flex items-center text-sm font-mono text-[var(--blog-muted)]">
                <span>June 2026</span>
                <span className="mx-3 text-[var(--blog-border)]">|</span>
                <span>12 min read</span>
                <span className="ml-auto flex items-center text-[#fb923c] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <span className="ml-2">→</span>
                </span>
              </div>
            </article>
          </Link>

          {/* ARCHITECTURE BLOG — NEW */}
          <Link href="/blogs/architecture-blog" className="group block col-span-1 md:col-span-2">
            <article className="relative bg-[var(--blog-surface)] border border-[#a78bfa] p-8 md:p-12 rounded-lg transition-all duration-500 hover:border-[var(--blog-accent)] hover:translate-y-[-4px]">
              <div className="flex flex-wrap gap-3 mb-6 items-center">
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[#a78bfa] text-[#a78bfa]">Architecture</span>
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-accent2)] text-[var(--blog-accent2)]">Multi-Tenancy</span>
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-muted)] text-[var(--blog-muted)]">NestJS</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-heading mb-4 group-hover:text-[#a78bfa] transition-colors flex flex-wrap items-center gap-4">
                One Airport, Many Airlines: The Architecture Behind a Multi-Tenant Backend
                <span className="inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-[#a78bfa] text-[var(--blog-bg)] rounded-sm align-middle leading-none">NEW</span>
              </h3>
              <p className="text-[var(--blog-text-dim)] mb-8 max-w-2xl text-lg font-serif italic">
                How one deployed server serves hundreds of isolated tenants — the design decisions, the code patterns, and the traps we navigated along the way.
              </p>
              <div className="flex items-center text-sm font-mono text-[var(--blog-muted)]">
                <span>June 2026</span>
                <span className="mx-3 text-[var(--blog-border)]">|</span>
                <span>11 min read</span>
                <span className="ml-auto flex items-center text-[#a78bfa] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <span className="ml-2">→</span>
                </span>
              </div>
            </article>
          </Link>

          {/* REDIS BLOG — NEW */}
          <Link href="/blogs/redis-implementation-blog" className="group block col-span-1 md:col-span-2">
            <article className="relative bg-[var(--blog-surface)] border border-[#ff6b6b] p-8 md:p-12 rounded-lg transition-all duration-500 hover:border-[var(--blog-accent)] hover:translate-y-[-4px]">
              <div className="flex flex-wrap gap-3 mb-6 items-center">
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[#ff6b6b] text-[#ff6b6b]">Redis</span>
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-accent2)] text-[var(--blog-accent2)]">Caching</span>
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-muted)] text-[var(--blog-muted)]">Backend</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-heading mb-4 group-hover:text-[#ff6b6b] transition-colors flex flex-wrap items-center gap-4">
                The Sticky Note Strategy: How We Use Redis to Make Our API Blazing Fast
                <span className="inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-[#ff6b6b] text-[var(--blog-bg)] rounded-sm align-middle leading-none">NEW</span>
              </h3>
              <p className="text-[var(--blog-text-dim)] mb-8 max-w-2xl text-lg font-serif italic">
                A practical walkthrough of the Cache-Aside pattern — what it is, how to implement it in NestJS, and the tradeoffs nobody tells you about upfront.
              </p>
              <div className="flex items-center text-sm font-mono text-[var(--blog-muted)]">
                <span>June 2026</span>
                <span className="mx-3 text-[var(--blog-border)]">|</span>
                <span>9 min read</span>
                <span className="ml-auto flex items-center text-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <span className="ml-2">→</span>
                </span>
              </div>
            </article>
          </Link>

          {/* FAST LOAD BLOG — NEW */}
          <Link href="/blogs/fast-load-blog" className="group block col-span-1 md:col-span-2">
            <article className="relative bg-[var(--blog-surface)] border border-[var(--blog-accent2)] p-8 md:p-12 rounded-lg transition-all duration-500 hover:border-[var(--blog-accent)] hover:translate-y-[-4px]">
              <div className="flex flex-wrap gap-3 mb-6 items-center">
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-accent2)] text-[var(--blog-accent2)]">Performance</span>
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-accent)] text-[var(--blog-accent)]">Architecture</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-heading mb-4 group-hover:text-[var(--blog-accent2)] transition-colors flex flex-wrap items-center gap-4">
                The Kitchen Strategy: How Modern Apps Serve Data Instantly
                <span className="inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-1 bg-[var(--blog-accent2)] text-[var(--blog-bg)] rounded-sm align-middle leading-none">NEW</span>
              </h3>
              <p className="text-[var(--blog-text-dim)] mb-8 max-w-2xl text-lg font-serif italic">
                A layered data-fetching strategy that makes apps feel instant — explained through a simple kitchen analogy anyone can follow.
              </p>
              <div className="flex items-center text-sm font-mono text-[var(--blog-muted)]">
                <span>June 2026</span>
                <span className="mx-3 text-[var(--blog-border)]">|</span>
                <span>8 min read</span>
                <span className="ml-auto flex items-center text-[var(--blog-accent2)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <span className="ml-2">→</span>
                </span>
              </div>
            </article>
          </Link>

          {/* FEATURED POST */}
          <Link href="/blogs/auth-blog" className="group block col-span-1 md:col-span-2">
            <article className="relative bg-[var(--blog-surface)] border border-[var(--blog-border)] p-8 md:p-12 rounded-lg transition-all duration-500 hover:border-[var(--blog-accent)] hover:translate-y-[-4px]">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-accent)] text-[var(--blog-accent)]">Security</span>
                <span className="text-[10px] font-mono tracking-tighter uppercase px-2 py-1 border border-[var(--blog-accent2)] text-[var(--blog-accent2)]">Authentication</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-heading mb-4 group-hover:text-[var(--blog-accent)] transition-colors">
                Securing APIs with JWT & Session Management
              </h3>
              <p className="text-[var(--blog-text-dim)] mb-8 max-w-2xl text-lg font-serif italic">
                A practical deep-dive into token-based authentication and remote session control — what I learned building it from scratch.
              </p>
              <div className="flex items-center text-sm font-mono text-[var(--blog-muted)]">
                <span>March 2026</span>
                <span className="mx-3 text-[var(--blog-border)]">|</span>
                <span>10 min read</span>
                <span className="ml-auto flex items-center text-[var(--blog-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <span className="ml-2">→</span>
                </span>
              </div>
            </article>
          </Link>

          {/* PLACEHOLDER POST 1 */}
          <article className="border-t border-[var(--blog-border)] pt-8 group cursor-pointer">
            <div className="text-[10px] font-mono text-[var(--blog-accent2)] mb-3 uppercase tracking-widest">Performance</div>
            <h3 className="text-xl font-heading mb-3 group-hover:text-[var(--blog-accent2)] transition-colors">
              Optimizing React Server Components for Scale
            </h3>
            <p className="text-sm text-[var(--blog-text-dim)] mb-6 line-clamp-2">
              How we reduced our bundle size by 40% and improved TTFB by offloading heavy logic to the edge.
            </p>
            <div className="flex items-center text-[10px] font-mono text-[var(--blog-muted)]">
              <span>Coming Soon</span>
            </div>
          </article>

          {/* PLACEHOLDER POST 2 */}
          <article className="border-t border-[var(--blog-border)] pt-8 group cursor-pointer">
            <div className="text-[10px] font-mono text-[var(--blog-accent2)] mb-3 uppercase tracking-widest">Infrastructure</div>
            <h3 className="text-xl font-heading mb-3 group-hover:text-[var(--blog-accent2)] transition-colors">
              The Case for Distributed SQLite in 2026
            </h3>
            <p className="text-sm text-[var(--blog-text-dim)] mb-6 line-clamp-2">
              Exploring the evolution of edge databases and why regional latency is finally a solved problem.
            </p>
            <div className="flex items-center text-[10px] font-mono text-[var(--blog-muted)]">
              <span>Coming Soon</span>
            </div>
          </article>
        </div>
      </main>

      <footer className="border-t border-[var(--blog-border)] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm font-mono text-[var(--blog-muted)]">
            © 2026 DEV_BLOG // BUILD_042
          </div>
          <div className="flex gap-8 text-[11px] font-mono tracking-widest uppercase text-[var(--blog-text-dim)]">
            <a href="#" className="hover:text-[var(--blog-accent)] transition-colors">Twitter</a>
            <a href="#" className="hover:text-[var(--blog-accent)] transition-colors">GitHub</a>
            <a href="#" className="hover:text-[var(--blog-accent)] transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
