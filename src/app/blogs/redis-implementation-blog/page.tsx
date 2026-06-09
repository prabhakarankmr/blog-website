
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './blog.css';

export default function RedisImplementationBlogPage() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const width = (scrolled / total) * 100;
      setScrollWidth(width);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="blog-container font-sans selection:bg-[#ff6b6b] selection:text-[var(--blog-bg)]">
      <div className="progress-bar" style={{ width: `${scrollWidth}%` }} id="progress"></div>

      <nav className="fixed top-0 left-0 w-full z-40 bg-[var(--blog-bg)]/80 backdrop-blur-md border-b border-[var(--blog-border)] py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xs font-mono tracking-widest uppercase text-[var(--blog-muted)] hover:text-[#ff6b6b] transition-colors">
            ← Back to Home
          </Link>
          <div className="text-[10px] font-mono text-[var(--blog-muted)] uppercase tracking-tighter">
            Reading: Redis Caching Strategy
          </div>
        </div>
      </nav>

      <header className="blog-header pt-40">
        <div className="header-grid"></div>
        <div className="header-glow"></div>
        <div className="header-inner">
          <div className="tag-row">
            <span className="tag tag-red">Redis</span>
            <span className="tag tag-cyan">Caching</span>
            <span className="tag tag-muted">Backend</span>
          </div>
          <h1 className="blog-title font-heading">The Sticky Note Strategy: How We Use <em>Redis</em> to Make Our API Blazing Fast</h1>
          <p className="subtitle font-serif">A practical walkthrough of the Cache-Aside pattern — what it is, how to implement it in NestJS, and the tradeoffs nobody tells you about upfront.</p>
          <div className="meta font-mono">
            <span>By Prabha</span>
            <span className="meta-dot"></span>
            <span>June 2026</span>
            <span className="meta-dot"></span>
            <span>9 min read</span>
          </div>
        </div>
      </header>

      <main className="blog-main">

        <h2 className="section-h2 font-heading" data-num="01 —">The Problem with Going to the Filing Cabinet Every Time</h2>

        <p className="blog-p font-serif">
          Imagine you work in a busy office. Every time someone asks you <em>&ldquo;What&apos;s on today&apos;s lunch menu?&rdquo;</em> you walk to the basement, unlock the filing cabinet, flip through hundreds of folders, find the answer, walk back upstairs — and give it to them.
        </p>

        <p className="blog-p font-serif">
          Now imagine 500 people asking the same question, one after another.
        </p>

        <p className="blog-p font-serif">
          That&apos;s exactly what happens when every API request hits the database directly. The database is powerful, but it lives in the basement. Every trip takes time.
        </p>

        <div className="callout callout-warn animate-fade-in">
          <div className="callout-label font-mono">The real numbers</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            A typical PostgreSQL query with joins takes <strong>20–200ms</strong>. A Redis read takes <strong>under 1ms</strong>. For a popular endpoint hit thousands of times per minute, that gap compounds into real infrastructure cost and user-perceived slowness.
          </p>
        </div>

        <p className="blog-p font-serif">We needed a sticky note on the desk.</p>

        <h2 className="section-h2 font-heading" data-num="02 —">Enter Redis — The Sticky Note on Your Desk</h2>

        <p className="blog-p font-serif">
          <strong>Redis</strong> is an in-memory data store. Unlike a database that reads from disk, Redis keeps everything in <strong>RAM</strong> — the fastest storage a computer has.
        </p>

        <p className="blog-p font-serif">
          If the database is a filing cabinet in the basement, Redis is a sticky note pinned right on your monitor.
        </p>

        <div className="analogy-card">
          <div className="analogy-icon">🗄️</div>
          <div>
            <div className="analogy-title font-mono">Filing Cabinet (Database)</div>
            <div className="analogy-body">Accurate, complete, durable — but <strong>slow to reach</strong>. Every query walks to the basement and back.</div>
          </div>
        </div>

        <div className="analogy-card">
          <div className="analogy-icon">📝</div>
          <div>
            <div className="analogy-title font-mono">Sticky Note (Redis)</div>
            <div className="analogy-body">Limited space, not permanent — but <strong>instantly readable</strong>. The answer is right there on your desk.</div>
          </div>
        </div>

        <p className="blog-p font-serif">
          When someone asks for data, we check the sticky note first. If it has the answer — done. If it doesn&apos;t — we walk to the filing cabinet, get the answer, and <strong>write it on a new sticky note</strong> for next time.
        </p>

        <p className="blog-p font-serif">
          This pattern is called <strong>Cache-Aside</strong>, and it is the backbone of how our system works.
        </p>

        <h2 className="section-h2 font-heading" data-num="03 —">Cache-Aside: The Pattern in Action</h2>

        <p className="blog-p font-serif">
          Cache-Aside (also called <em>lazy loading</em>) has a simple decision tree on every read request:
        </p>

        <div className="flow font-mono">
          <div className="flow-title">Cache-Aside Read Path</div>
          <div className="flow-step flow-hit">
            <div className="flow-num">1</div>
            <div className="flow-desc"><strong>Check Redis</strong> — does a value exist for this key?</div>
          </div>
          <div className="flow-step flow-hit">
            <div className="flow-num">2</div>
            <div className="flow-desc"><strong>Cache HIT</strong> — return the cached value immediately. Done in &lt;1ms.</div>
          </div>
          <div className="flow-step flow-miss">
            <div className="flow-num">3</div>
            <div className="flow-desc"><strong>Cache MISS</strong> — query the database as normal.</div>
          </div>
          <div className="flow-step flow-miss">
            <div className="flow-num">4</div>
            <div className="flow-desc"><strong>Populate cache</strong> — write the DB result to Redis with a TTL (time-to-live).</div>
          </div>
          <div className="flow-step flow-miss">
            <div className="flow-num">5</div>
            <div className="flow-desc"><strong>Return the result</strong> — same response as a cache hit, just a little slower this first time.</div>
          </div>
        </div>

        <p className="blog-p font-serif">
          Here&apos;s what this looks like in a NestJS service, using <code className="inline-code">ioredis</code>:
        </p>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="k">async</span> <span className="f">getUserProfile</span>(userId: <span className="t">string</span>): <span className="t">Promise</span>&lt;<span className="t">UserProfile</span>&gt; {'{'}{'\n'}
            {'  '}<span className="k">const</span> cacheKey = <span className="s">`user:profile:{'{'}userId{'}'}`</span>;{'\n\n'}
            {'  '}<span className="c">{'// 1. check the sticky note'}</span>{'\n'}
            {'  '}<span className="k">const</span> cached = <span className="k">await</span> this.redis.<span className="f">get</span>(cacheKey);{'\n'}
            {'  '}<span className="k">if</span> (cached) {'{'}{'\n'}
            {'    '}<span className="k">return</span> <span className="t">JSON</span>.<span className="f">parse</span>(cached); <span className="c">{'// cache HIT — instant'}</span>{'\n'}
            {'  '}{'}'}{'\n\n'}
            {'  '}<span className="c">{'// 2. walk to the filing cabinet'}</span>{'\n'}
            {'  '}<span className="k">const</span> user = <span className="k">await</span> this.prisma.user.<span className="f">findUnique</span>({'{'}{'\n'}
            {'    '}where: {'{'} id: userId {'}'},{'\n'}
            {'    '}include: {'{'} profile: <span className="k">true</span>, preferences: <span className="k">true</span> {'}'},{'\n'}
            {'  '}{'}'});{'\n\n'}
            {'  '}<span className="k">if</span> (!user) <span className="k">throw new</span> <span className="t">NotFoundException</span>();{'\n\n'}
            {'  '}<span className="c">{'// 3. write a new sticky note (TTL = 5 minutes)'}</span>{'\n'}
            {'  '}<span className="k">await</span> this.redis.<span className="f">setex</span>(cacheKey, <span className="n">300</span>, <span className="t">JSON</span>.<span className="f">stringify</span>(user));{'\n\n'}
            {'  '}<span className="k">return</span> user;{'\n'}
            {'}'}
          </code>
        </pre>

        <h2 className="section-h2 font-heading" data-num="04 —">Setting an Expiry — When the Sticky Note Goes Stale</h2>

        <p className="blog-p font-serif">
          A sticky note from last Tuesday about today&apos;s lunch menu is worse than useless — it&apos;s wrong. Cached data has the same problem. The fix is a <strong>TTL (Time-To-Live)</strong>: Redis automatically deletes the key after a set number of seconds.
        </p>

        <p className="blog-p font-serif">
          Choosing the right TTL is a judgment call, not a formula. Ask: <em>how bad is it if this data is stale?</em>
        </p>

        <table className="compare-table font-mono">
          <thead>
            <tr>
              <th>Data</th>
              <th>TTL</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User profile</td>
              <td>5 min</td>
              <td>Changes rarely; slight staleness acceptable</td>
            </tr>
            <tr>
              <td>Public blog posts</td>
              <td>10 min</td>
              <td>Content rarely changes mid-session</td>
            </tr>
            <tr>
              <td>Product inventory count</td>
              <td>30 sec</td>
              <td>Showing slightly stale stock is okay; showing -1 is not</td>
            </tr>
            <tr>
              <td>Leaderboard / rankings</td>
              <td>60 sec</td>
              <td>Near-real-time expected; exact real-time not required</td>
            </tr>
            <tr>
              <td>User&apos;s own cart</td>
              <td>No cache</td>
              <td>Must always be fresh — stale cart = wrong order</td>
            </tr>
          </tbody>
        </table>

        <div className="callout callout-red animate-fade-in">
          <div className="callout-label font-mono">⚠ The TTL trap</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            Setting TTL too high means users see stale data long after it changed. Setting it too low means your cache hit rate collapses — you&apos;re back to hammering the database. Start conservative (shorter), measure your cache hit ratio, and extend TTLs for data where staleness hasn&apos;t caused problems.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="05 —">What We Cache and What We Don&apos;t</h2>

        <p className="blog-p font-serif">
          Not every piece of data belongs on the sticky note. After running this in production, here&apos;s the rough split:
        </p>

        <ul className="blog-ul font-serif">
          <li className="blog-li"><strong>Good cache candidates:</strong> shared data read by many users (public profiles, catalog items, config values, computed aggregates). High read frequency, low write frequency.</li>
          <li className="blog-li"><strong>Bad cache candidates:</strong> user-specific transactional data (cart contents, payment status, unread count). Stale state here causes real bugs.</li>
          <li className="blog-li"><strong>Never cache:</strong> authentication tokens (they have their own lifecycle), passwords, anything where a stale read has security implications.</li>
        </ul>

        <div className="analogy-card">
          <div className="analogy-icon">🗒️</div>
          <div>
            <div className="analogy-title font-mono">The Sticky Note Rule</div>
            <div className="analogy-body">You&apos;d write &ldquo;Today&apos;s lunch menu&rdquo; on a sticky note. You wouldn&apos;t write &ldquo;Current bank balance&rdquo; on one. Same principle.</div>
          </div>
        </div>

        <h2 className="section-h2 font-heading" data-num="06 —">Cache Invalidation — The Hard Part</h2>

        <p className="blog-p font-serif">
          There are only two hard things in computer science: naming things and <strong>cache invalidation</strong>. The joke is old because the problem is real.
        </p>

        <p className="blog-p font-serif">
          When a user updates their profile, the cached version is now wrong. You have two options:
        </p>

        <h3 className="section-h3 font-heading">Option A: Delete on Write (Active Invalidation)</h3>
        <p className="blog-p font-serif">
          When the user writes new data, delete the corresponding cache key immediately. The next read will miss the cache, hit the DB, and repopulate with fresh data.
        </p>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="k">async</span> <span className="f">updateUserProfile</span>(userId: <span className="t">string</span>, dto: <span className="t">UpdateProfileDto</span>) {'{'}{'\n'}
            {'  '}<span className="k">const</span> updated = <span className="k">await</span> this.prisma.user.<span className="f">update</span>({'{'}{'\n'}
            {'    '}where: {'{'} id: userId {'}'},{'\n'}
            {'    '}data: dto,{'\n'}
            {'  '}{'}'});{'\n\n'}
            {'  '}<span className="c">{'// tear the sticky note off the board'}</span>{'\n'}
            {'  '}<span className="k">await</span> this.redis.<span className="f">del</span>(<span className="s">`user:profile:{'{'}userId{'}'}`</span>);{'\n\n'}
            {'  '}<span className="k">return</span> updated;{'\n'}
            {'}'}
          </code>
        </pre>

        <h3 className="section-h3 font-heading">Option B: Let TTL Handle It (Passive Expiry)</h3>
        <p className="blog-p font-serif">
          Do nothing on write. The cache key will expire naturally after its TTL. Until then, some users see stale data. This is simpler but only works when eventual consistency is acceptable.
        </p>

        <p className="blog-p font-serif">
          In practice, we use <strong>both</strong>: active deletion for data the user just changed (they expect to see their own update immediately), TTL expiry for everything else.
        </p>

        <h2 className="section-h2 font-heading" data-num="07 —">Structuring Redis Keys</h2>

        <p className="blog-p font-serif">
          Redis has no schema, no tables, no enforced structure. The key is literally just a string. This is powerful and dangerous — without a naming convention, a large codebase becomes impossible to reason about.
        </p>

        <p className="blog-p font-serif">
          We use a colon-delimited namespace pattern:
        </p>

        <pre className="blog-pre font-mono" data-lang="convention">
          <code className="blog-code">
            <span className="c">{'// {resource}:{identifier}:{optional-variant}'}</span>{'\n\n'}
            <span className="s">user:profile:42</span>           <span className="c">{'// user profile, id=42'}</span>{'\n'}
            <span className="s">post:detail:slug-abc</span>      <span className="c">{'// post by slug'}</span>{'\n'}
            <span className="s">post:list:page:1</span>          <span className="c">{'// paginated list, page 1'}</span>{'\n'}
            <span className="s">leaderboard:weekly</span>        <span className="c">{'// weekly leaderboard aggregate'}</span>{'\n'}
            <span className="s">config:feature-flags</span>      <span className="c">{'// app-wide feature flags'}</span>
          </code>
        </pre>

        <p className="blog-p font-serif">
          Consistent naming lets you do pattern-based operations. For example, when a post is updated you can delete all cached variants: <code className="inline-code">DEL post:detail:slug-abc</code> and any list pages that might include it.
        </p>

        <h2 className="section-h2 font-heading" data-num="08 —">What This Looks Like in Production</h2>

        <p className="blog-p font-serif">
          After rolling out Cache-Aside on our most-hit endpoints, here&apos;s what changed:
        </p>

        <table className="compare-table font-serif">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Before Redis</th>
              <th>After Redis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Avg. response time (p50)</td>
              <td className="no">~180ms</td>
              <td className="yes">~12ms</td>
            </tr>
            <tr>
              <td>DB queries / minute</td>
              <td className="no">~4,200</td>
              <td className="yes">~680</td>
            </tr>
            <tr>
              <td>Cache hit rate</td>
              <td className="no">—</td>
              <td className="yes">~84%</td>
            </tr>
            <tr>
              <td>DB CPU usage (peak)</td>
              <td className="no">78%</td>
              <td className="yes">21%</td>
            </tr>
          </tbody>
        </table>

        <div className="callout callout-info animate-fade-in">
          <div className="callout-label font-mono">💡 The 84% hit rate</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            84% of reads never touched the database at all. That&apos;s 84% of your queries answered in under 1ms instead of 180ms. The remaining 16% — cache misses and write paths — hit the DB as normal. The database got dramatically easier to run as a result.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="09 —">What I&apos;d Do Differently</h2>

        <p className="blog-p font-serif">Things I learned the hard way:</p>

        <ul className="blog-ul font-serif">
          <li className="blog-li"><strong>Serialize carefully.</strong> We had a bug where <code className="inline-code">Date</code> objects came back from Redis as strings. JSON doesn&apos;t have a date type — always deserialize and validate the shape coming out of cache, not just going in.</li>
          <li className="blog-li"><strong>Handle Redis being down.</strong> Redis is fast and reliable, but it can go down. Your cache layer should fail open: if Redis throws an error, log it and fall through to the database rather than crashing the whole request.</li>
          <li className="blog-li"><strong>Watch for cache stampede.</strong> If a popular key expires and 500 requests arrive simultaneously, they all miss the cache and all hit the DB at once. A mutex or probabilistic early revalidation prevents this.</li>
          <li className="blog-li"><strong>Don&apos;t cache errors.</strong> If the database returns an error (user not found, timeout), don&apos;t cache that result. The error might be transient — caching it means every subsequent request gets a wrong answer for the full TTL.</li>
        </ul>

        <div className="highlight-block animate-fade-in">
          <p className="blog-p font-serif">
            <strong>The main lesson:</strong> Redis doesn&apos;t make your database faster. It makes your application ask the database <em>less often</em>. That distinction matters — it means Redis is a layer on top of your existing data layer, not a replacement for it. The database stays the source of truth; Redis is just the very fast first stop on the way there.
          </p>
          <p className="blog-p font-serif">
            Once you internalize that, the whole design becomes obvious: keep the sticky note in sync with the filing cabinet, and your office runs like it has ten employees instead of two.
          </p>
        </div>

        <hr className="divider" />

        <p className="blog-p font-serif">
          Caching is one of those things that feels like premature optimization until the day you actually need it — and then it feels like the most obvious thing in the world. The Cache-Aside pattern is a good default starting point: lazy, simple, composable, and easy to reason about even months later when you&apos;ve forgotten why you wrote the code.
        </p>

        <p className="font-serif italic text-[var(--blog-muted)]" style={{ opacity: 0.8 }}>If you&apos;re seeing slow API responses and your database query times look fine, the answer is probably a cache layer. Start small — one endpoint, one key pattern — and measure before expanding.</p>

      </main>

      <footer className="border-t border-[var(--blog-border)] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="footer-left font-mono">
            Written from hands-on implementation experience &nbsp;·&nbsp; 2026
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#ff6b6b' }}>Redis · NestJS · Caching · Performance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
