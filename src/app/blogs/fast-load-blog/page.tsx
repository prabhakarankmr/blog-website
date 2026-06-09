
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './blog.css';

export default function FastLoadBlogPage() {
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
    <div className="blog-container font-sans selection:bg-[var(--blog-accent2)] selection:text-[var(--blog-bg)]">
      <div className="progress-bar" style={{ width: `${scrollWidth}%` }} id="progress"></div>

      <nav className="fixed top-0 left-0 w-full z-40 bg-[var(--blog-bg)]/80 backdrop-blur-md border-b border-[var(--blog-border)] py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xs font-mono tracking-widest uppercase text-[var(--blog-muted)] hover:text-[var(--blog-accent2)] transition-colors">
            ← Back to Home
          </Link>
          <div className="text-[10px] font-mono text-[var(--blog-muted)] uppercase tracking-tighter">
            Reading: The Kitchen Strategy
          </div>
        </div>
      </nav>

      <header className="blog-header pt-40">
        <div className="header-grid"></div>
        <div className="header-glow"></div>
        <div className="header-inner">
          <div className="tag-row">
            <span className="tag tag-cyan">Performance</span>
            <span className="tag tag-yellow">Architecture</span>
            <span className="tag tag-muted">Frontend</span>
          </div>
          <h1 className="blog-title font-heading">The Kitchen Strategy: How Modern Apps Serve Data <em>Instantly</em></h1>
          <p className="subtitle font-serif">A layered data-fetching strategy that makes apps feel instant — explained through a kitchen analogy anyone can follow.</p>
          <div className="meta font-mono">
            <span>By Prabha</span>
            <span className="meta-dot"></span>
            <span>June 2026</span>
            <span className="meta-dot"></span>
            <span>8 min read</span>
          </div>
        </div>
      </header>

      <main className="blog-main">
        <p className="blog-p font-serif">
          We&apos;ve all been there — you tap a button in an app and stare at a spinning loader for three full seconds. The data was right there on the server. So why the wait?
        </p>

        <p className="blog-p font-serif">
          This post breaks down a layered data-fetching strategy that makes apps feel <em>instant</em> — using a simple kitchen analogy anyone can follow.
        </p>

        <h2 className="section-h2 font-heading" data-num="01 —">The Problem With &ldquo;On-Demand&rdquo; Fetching</h2>

        <p className="blog-p font-serif">
          Imagine a restaurant where the chef only starts cooking <em>after</em> you sit down, read the menu, and place your order. Every customer waits. Every time. No prep, no anticipation — just a cold kitchen that springs to life the moment you ask.
        </p>

        <p className="blog-p font-serif">
          That&apos;s how most basic apps work:
        </p>

        <pre className="blog-pre font-mono" data-lang="sequence">
          <code className="blog-code">
            <span className="c">{'// naive on-demand pattern'}</span>{'\n'}
            <span className="t">User</span> clicks button{'\n'}
            {'  → '}<span className="f">fetch</span>(<span className="s">&apos;/api/data&apos;</span>)   <span className="c">{'// request leaves NOW'}</span>{'\n'}
            {'  → '}network round-trip  <span className="c">{'// 200–800ms'}</span>{'\n'}
            {'  → '}server queries DB   <span className="c">{'// 50–300ms'}</span>{'\n'}
            {'  → '}response arrives{'\n'}
            {'  → '}<span className="t">UI</span> finally renders  <span className="c">{'// user waited the whole time'}</span>
          </code>
        </pre>

        <div className="callout callout-warn animate-fade-in">
          <div className="callout-label font-mono">The real cost</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            On a fast connection this might be 300ms. On mobile 3G it&apos;s easily 2 seconds. Every millisecond of perceived wait <strong>costs engagement</strong> — Google found a 0.5s slowdown reduced searches by 20%.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="02 —">Meet the Kitchen Strategy</h2>

        <p className="blog-p font-serif">
          A real restaurant kitchen doesn&apos;t work like that. It has <strong>three layers of readiness</strong> that let it serve dishes fast even during a dinner rush. Modern high-performance apps mirror this almost exactly.
        </p>

        <div className="layer-stack font-mono">
          <div className="layer-item">
            <div className="layer-num layer-num-1">1</div>
            <div className="layer-name">Prefetching</div>
            <div className="layer-desc">The prep cook — work done before the user even asks</div>
          </div>
          <div className="layer-item">
            <div className="layer-num layer-num-2">2</div>
            <div className="layer-name">Caching</div>
            <div className="layer-desc">The walk-in fridge — ready ingredients that skip the farm</div>
          </div>
          <div className="layer-item">
            <div className="layer-num layer-num-3">3</div>
            <div className="layer-name">Optimistic UI</div>
            <div className="layer-desc">The pass window — plate goes out before the kitchen confirms</div>
          </div>
        </div>

        <h2 className="section-h2 font-heading" data-num="03 —">Layer 1: The Prep Cook (Prefetching)</h2>

        <p className="blog-p font-serif">
          A prep cook arrives hours before service. They chop vegetables, portion proteins, reduce sauces. When a ticket comes in, the line cook isn&apos;t starting from raw ingredients — most of the work is done.
        </p>

        <div className="kitchen-card">
          <div className="kitchen-icon">👨‍🍳</div>
          <div>
            <div className="kitchen-title font-mono">Kitchen Analogy</div>
            <div className="kitchen-body">Prep cook = your app fetching the next page&apos;s data while the user is still reading the current one.</div>
          </div>
        </div>

        <p className="blog-p font-serif">
          In practice, this means starting data requests <em>before</em> the user explicitly triggers them. Common patterns:
        </p>

        <ul className="blog-ul font-serif">
          <li className="blog-li"><strong>Route prefetching.</strong> Next.js prefetches linked pages when <code className="inline-code">&lt;Link&gt;</code> enters the viewport. By the time the user clicks, the JS bundle and data are already loading.</li>
          <li className="blog-li"><strong>Hover prefetch.</strong> Start fetching on <code className="inline-code">mouseenter</code> — you typically get 100–300ms of head start before the click fires.</li>
          <li className="blog-li"><strong>Predictive prefetch.</strong> If 80% of users who visit page A next go to page B, prefetch B proactively for all page-A visitors.</li>
        </ul>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="c">{'// hover prefetch pattern'}</span>{'\n'}
            <span className="k">function</span> <span className="f">ProductCard</span>({'{'} id {'}'}: {'{'} id: <span className="t">string</span> {'}'}) {'{'}{'\n'}
            {'  '}<span className="k">const</span> queryClient = <span className="f">useQueryClient</span>();{'\n\n'}
            {'  '}<span className="k">const</span> prefetch = () =&gt; {'{'}{'\n'}
            {'    '}queryClient.<span className="f">prefetchQuery</span>({'{'}{'\n'}
            {'      '}queryKey: [<span className="s">&apos;product&apos;</span>, id],{'\n'}
            {'      '}queryFn: () =&gt; <span className="f">fetchProduct</span>(id),{'\n'}
            {'      '}staleTime: <span className="n">30_000</span>,{'\n'}
            {'    '}{'}'});{'\n'}
            {'  '}{'}'};{'\n\n'}
            {'  '}<span className="k">return</span> &lt;<span className="t">div</span> onMouseEnter={'{'}prefetch{'}'}&gt;...&lt;/<span className="t">div</span>&gt;;{'\n'}
            {'}'}
          </code>
        </pre>

        <h2 className="section-h2 font-heading" data-num="04 —">Layer 2: The Walk-In Fridge (Caching)</h2>

        <p className="blog-p font-serif">
          The walk-in fridge stores prepped ingredients. When a ticket comes in for a dish you&apos;ve made twenty times today, you pull from the fridge — you don&apos;t call the supplier every single time.
        </p>

        <div className="kitchen-card">
          <div className="kitchen-icon">🧊</div>
          <div>
            <div className="kitchen-title font-mono">Kitchen Analogy</div>
            <div className="kitchen-body">Walk-in fridge = cached API responses. Fresh enough to serve, fast enough to skip the round-trip.</div>
          </div>
        </div>

        <p className="blog-p font-serif">
          Caching is about answering the question: <em>how fresh does this data actually need to be?</em> Most data in most apps can tolerate a few seconds — or minutes — of staleness. The key insight is to serve stale data <strong>immediately</strong> while revalidating in the background.
        </p>

        <table className="compare-table font-mono">
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Reasonable Stale Time</th>
              <th>Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User profile</td>
              <td>5 minutes</td>
              <td>stale-while-revalidate</td>
            </tr>
            <tr>
              <td>Product catalog</td>
              <td>10 minutes</td>
              <td>cache + background refetch</td>
            </tr>
            <tr>
              <td>Live stock price</td>
              <td>0 seconds</td>
              <td>real-time subscription</td>
            </tr>
            <tr>
              <td>Static content</td>
              <td>24 hours+</td>
              <td>CDN edge cache</td>
            </tr>
            <tr>
              <td>Search results</td>
              <td>30 seconds</td>
              <td>deduplicated in-flight</td>
            </tr>
          </tbody>
        </table>

        <div className="callout callout-info animate-fade-in">
          <div className="callout-label font-mono">💡 Stale-While-Revalidate</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            Serve the cached (stale) response immediately so the user sees content at once, then fetch fresh data in the background. When the new data arrives, swap it in — no visible loading state at all. React Query and SWR implement this out of the box.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="05 —">Layer 3: The Pass Window (Optimistic UI)</h2>

        <p className="blog-p font-serif">
          In a fast kitchen, the expeditor calls out a dish at the pass window the moment it&apos;s plated — before every garnish is technically confirmed. The assumption is it&apos;s correct. If something&apos;s wrong, they pull it back. But 95% of the time, it goes straight to the customer.
        </p>

        <div className="kitchen-card">
          <div className="kitchen-icon">🪟</div>
          <div>
            <div className="kitchen-title font-mono">Kitchen Analogy</div>
            <div className="kitchen-body">Pass window = optimistic UI. Show the result immediately, roll back if the server disagrees.</div>
          </div>
        </div>

        <p className="blog-p font-serif">
          Optimistic updates apply the change to the UI <em>instantly</em> — before the server has even acknowledged the request. If the server returns an error, you roll back. This pattern is most effective for:
        </p>

        <ul className="blog-ul font-serif">
          <li className="blog-li"><strong>Likes / reactions</strong> — the heart fills immediately on click.</li>
          <li className="blog-li"><strong>Todo toggles</strong> — the checkbox flips before the PATCH lands.</li>
          <li className="blog-li"><strong>Message send</strong> — the message appears in the thread while the POST is in-flight.</li>
        </ul>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="c">{'// optimistic mutation with React Query'}</span>{'\n'}
            <span className="k">const</span> mutation = <span className="f">useMutation</span>({'{'}{'\n'}
            {'  '}mutationFn: (id: <span className="t">string</span>) =&gt; <span className="f">likePost</span>(id),{'\n\n'}
            {'  '}<span className="f">onMutate</span>: <span className="k">async</span> (id) =&gt; {'{'}{'\n'}
            {'    '}<span className="k">await</span> queryClient.<span className="f">cancelQueries</span>({'{'} queryKey: [<span className="s">&apos;posts&apos;</span>] {'}'});{'\n'}
            {'    '}<span className="k">const</span> prev = queryClient.<span className="f">getQueryData</span>([<span className="s">&apos;posts&apos;</span>]);{'\n'}
            {'    '}queryClient.<span className="f">setQueryData</span>([<span className="s">&apos;posts&apos;</span>], (old) =&gt; {'\n'}
            {'      '}old.<span className="f">map</span>(p =&gt; p.id === id ? {'{'} ...p, likes: p.likes + <span className="n">1</span> {'}'} : p){'\n'}
            {'    '});{'\n'}
            {'    '}<span className="k">return</span> {'{'} prev {'}'};  <span className="c">{'// snapshot for rollback'}</span>{'\n'}
            {'  '}{'}'},{'\n\n'}
            {'  '}<span className="f">onError</span>: (err, id, ctx) =&gt; {'{'}{'\n'}
            {'    '}queryClient.<span className="f">setQueryData</span>([<span className="s">&apos;posts&apos;</span>], ctx?.prev);  <span className="c">{'// rollback'}</span>{'\n'}
            {'  '}{'}'},{'\n'}
            {'}'});
          </code>
        </pre>

        <h2 className="section-h2 font-heading" data-num="06 —">Putting It All Together</h2>

        <p className="blog-p font-serif">
          These three layers aren&apos;t mutually exclusive — a real app uses all three simultaneously, each handling a different scenario:
        </p>

        <ul className="blog-ul font-serif">
          <li className="blog-li"><strong>Prefetching</strong> eliminates wait when the user navigates. They arrive at a page with data already there.</li>
          <li className="blog-li"><strong>Caching</strong> eliminates redundant requests. Revisiting a page or switching tabs feels instantaneous.</li>
          <li className="blog-li"><strong>Optimistic UI</strong> eliminates perceived latency on mutations. Actions feel local even when they hit a remote server.</li>
        </ul>

        <div className="highlight-block animate-fade-in">
          <p className="blog-p font-serif"><strong>The kitchen insight:</strong> a great restaurant kitchen is fast not because the chefs move faster — it&apos;s because the work is distributed across time. Prep happens early. Stock sits ready. The pass window moves without waiting for a full audit.</p>
          <p className="blog-p font-serif">
            Fast apps work the same way. The goal isn&apos;t a faster network — it&apos;s <em>doing less work at the moment the user is watching</em>.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="07 —">When Each Layer Falls Short</h2>

        <p className="blog-p font-serif">No strategy is free. Knowing the failure modes helps you apply them correctly:</p>

        <table className="compare-table font-serif">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Works Well When</th>
              <th>Breaks Down When</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Prefetching</td>
              <td>Navigation patterns are predictable</td>
              <td>Data is user-specific or expensive to compute</td>
            </tr>
            <tr>
              <td>Caching</td>
              <td>Data is shared or slow-changing</td>
              <td>Real-time accuracy is required (inventory, prices)</td>
            </tr>
            <tr>
              <td>Optimistic UI</td>
              <td>Success rate of mutations is very high</td>
              <td>Rollback causes jarring visual state jumps</td>
            </tr>
          </tbody>
        </table>

        <p className="blog-p font-serif">
          The most common mistake is applying optimistic UI to destructive operations (delete, payment) where an error leaves the user in a confusing state. Reserve it for low-stakes, high-frequency actions where a rollback would be a minor annoyance, not a crisis.
        </p>

        <hr className="divider" />

        <p className="blog-p font-serif">
          Speed isn&apos;t just a technical metric — it&apos;s the primary UX of any data-heavy app. A spinner is a broken promise. The kitchen strategy is about making promises you can keep: data that&apos;s there before the user reaches for it, interactions that feel local, and fetches that happen in the margin, not in the critical path.
        </p>

        <p className="font-serif italic text-[var(--blog-muted)]" style={{ opacity: 0.8 }}>The next time you open an app and it feels like a native tool rather than a website, look closer — there&apos;s a well-run kitchen behind the counter.</p>
      </main>

      <footer className="border-t border-[var(--blog-border)] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="footer-left font-mono">
            Written from hands-on implementation experience &nbsp;·&nbsp; 2026
          </div>
          <div className="flex gap-4">
            <span className="footer-tag font-mono text-[var(--blog-accent2)] text-[10px] tracking-widest uppercase">Performance · Caching · Prefetch · UX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
