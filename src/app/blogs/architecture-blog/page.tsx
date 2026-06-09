
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './blog.css';

export default function ArchitectureBlogPage() {
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
    <div className="blog-container font-sans selection:bg-[#a78bfa] selection:text-[var(--blog-bg)]">
      <div className="progress-bar" style={{ width: `${scrollWidth}%` }} id="progress"></div>

      <nav className="fixed top-0 left-0 w-full z-40 bg-[var(--blog-bg)]/80 backdrop-blur-md border-b border-[var(--blog-border)] py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xs font-mono tracking-widest uppercase text-[var(--blog-muted)] hover:text-[#a78bfa] transition-colors">
            ← Back to Home
          </Link>
          <div className="text-[10px] font-mono text-[var(--blog-muted)] uppercase tracking-tighter">
            Reading: Multi-Tenant Architecture
          </div>
        </div>
      </nav>

      <header className="blog-header pt-40">
        <div className="header-grid"></div>
        <div className="header-glow"></div>
        <div className="header-inner">
          <div className="tag-row">
            <span className="tag tag-purple">Architecture</span>
            <span className="tag tag-cyan">Multi-Tenancy</span>
            <span className="tag tag-muted">NestJS</span>
          </div>
          <h1 className="blog-title font-heading">One Airport, Many Airlines: The Architecture Behind a <em>Multi-Tenant</em> Backend</h1>
          <p className="subtitle font-serif">How one deployed server serves hundreds of isolated tenants — the design decisions, the code patterns, and the traps we navigated along the way.</p>
          <div className="meta font-mono">
            <span>By Prabha</span>
            <span className="meta-dot"></span>
            <span>June 2026</span>
            <span className="meta-dot"></span>
            <span>11 min read</span>
          </div>
        </div>
      </header>

      <main className="blog-main">

        <h2 className="section-h2 font-heading" data-num="01 —">The Problem We Set Out to Solve</h2>

        <p className="blog-p font-serif">
          Picture a major international airport. Thousands of passengers arrive every hour. Some are flying Emirates, some are on Singapore Airlines, some are on budget carriers. They all walk through the same entrance, breathe the same air-conditioned air, use the same runways — yet an Emirates passenger never accidentally boards a Singapore Airlines flight. Their luggage never ends up on the wrong conveyor belt.
        </p>

        <p className="blog-p font-serif">
          How does one building serve hundreds of airlines and thousands of passengers without a single mix-up?
        </p>

        <p className="blog-p font-serif">
          That is the exact problem a multi-tenant backend solves. One deployed server. One database. Hundreds of schools, each completely isolated from the others, each feeling like they have their own private system.
        </p>

        <p className="blog-p font-serif">This is how we built that airport.</p>

        <h2 className="section-h2 font-heading" data-num="02 —">The Framework — The Airport Building Itself</h2>

        <p className="blog-p font-serif">
          The entire backend is built on <strong>NestJS</strong>, a Node.js framework that enforces structure through <strong>modules, controllers, and services</strong>.
        </p>

        <p className="blog-p font-serif">If the backend is an airport:</p>

        <div className="analogy-row">
          <div className="analogy-card">
            <div className="analogy-icon">🏢</div>
            <div>
              <div className="analogy-title font-mono">Modules</div>
              <div className="analogy-body">Terminals and departments — each self-contained, each with its own purpose. Nothing bleeds between them.</div>
            </div>
          </div>
          <div className="analogy-card">
            <div className="analogy-icon">🎫</div>
            <div>
              <div className="analogy-title font-mono">Controllers</div>
              <div className="analogy-body">Check-in counters — they receive the HTTP request, read the ticket, and route it to the right gate.</div>
            </div>
          </div>
          <div className="analogy-card">
            <div className="analogy-icon">👷</div>
            <div>
              <div className="analogy-title font-mono">Services</div>
              <div className="analogy-body">Ground crew — invisible to passengers, doing the actual work: querying the DB, processing data, returning results.</div>
            </div>
          </div>
          <div className="analogy-card">
            <div className="analogy-icon">🛃</div>
            <div>
              <div className="analogy-title font-mono">Guards &amp; Interceptors</div>
              <div className="analogy-body">Airport security and automated gate scanners — credentials checked before anyone steps through.</div>
            </div>
          </div>
        </div>

        <p className="blog-p font-serif">
          Every piece of logic lives in exactly the right terminal. Nothing bleeds into somewhere it does not belong.
        </p>

        <h2 className="section-h2 font-heading" data-num="03 —">The Terminal Map — How the Modules Are Organised</h2>

        <p className="blog-p font-serif">
          The application has <strong>three passenger terminals</strong> and <strong>one operations centre</strong>, each with a separate entrance and completely independent staff:
        </p>

        <div className="terminal-grid font-mono">
          <div className="terminal-card">
            <div className="terminal-label">Terminal A</div>
            <div className="terminal-name">Auth Module</div>
            <div className="terminal-desc">Registration, login, JWT issuance, password reset. Every journey starts here — no boarding pass, no entry.</div>
          </div>
          <div className="terminal-card">
            <div className="terminal-label">Terminal B</div>
            <div className="terminal-name">Admin Module</div>
            <div className="terminal-desc">School administrators manage their own school — students, staff, timetables, settings. Scoped to one tenant only.</div>
          </div>
          <div className="terminal-card">
            <div className="terminal-label">Terminal C</div>
            <div className="terminal-name">Student Module</div>
            <div className="terminal-desc">Student-facing routes — grades, schedule, attendance, notices. Read-heavy, tenant-scoped, permission-guarded.</div>
          </div>
          <div className="terminal-card">
            <div className="terminal-label">Operations Centre</div>
            <div className="terminal-name">Super Admin Module</div>
            <div className="terminal-desc">Platform-level management across all tenants — provision schools, monitor health, handle billing. Restricted to platform staff.</div>
          </div>
        </div>

        <p className="blog-p font-serif">
          Each module is imported into the root <code className="inline-code">AppModule</code> exactly once. They share a database connection through a global <code className="inline-code">PrismaModule</code>, but their routes, guards, and services never directly call into each other.
        </p>

        <h2 className="section-h2 font-heading" data-num="04 —">The Boarding Pass — Tenant Identity in the JWT</h2>

        <p className="blog-p font-serif">
          Every airline passenger carries a boarding pass. It contains their name, their destination, their airline — and crucially, it cannot be forged. In our system, the JWT is the boarding pass.
        </p>

        <p className="blog-p font-serif">
          When a user logs in, the token payload includes not just their user ID and role, but their <strong>tenant ID</strong> — the unique identifier of the school they belong to:
        </p>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="c">{'// auth.service.ts — signing the boarding pass'}</span>{'\n'}
            <span className="k">async</span> <span className="f">signIn</span>(dto: <span className="t">SignInDto</span>): <span className="t">Promise</span>&lt;<span className="t">AuthResponse</span>&gt; {'{'}{'\n'}
            {'  '}<span className="k">const</span> user = <span className="k">await</span> this.<span className="f">validateUser</span>(dto.email, dto.password);{'\n\n'}
            {'  '}<span className="k">const</span> payload: <span className="t">JwtPayload</span> = {'{'}{'\n'}
            {'    '}sub: user.id,{'\n'}
            {'    '}email: user.email,{'\n'}
            {'    '}role: user.role,{'\n'}
            {'    '}tenantId: user.school_id,  <span className="c">{'// ← the airline code on the boarding pass'}</span>{'\n'}
            {'  '}{'}'};{'\n\n'}
            {'  '}<span className="k">return</span> {'{'} access_token: <span className="k">await</span> this.jwt.<span className="f">signAsync</span>(payload) {'}'};{'\n'}
            {'}'}
          </code>
        </pre>

        <div className="callout callout-purple animate-fade-in">
          <div className="callout-label font-mono">Why embed tenantId in the token?</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            Every request is stateless — no session lookup, no extra DB call to figure out which school this user belongs to. The tenant identity travels with the request, verified by the JWT signature. Fast, tamper-proof, and zero extra round trips.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="05 —">The Security Scanner — The Tenant Guard</h2>

        <p className="blog-p font-serif">
          Knowing a passenger&apos;s airline code is not enough. The gate scanner must actively verify that they are <em>only trying to board their own flight</em>. Our equivalent is the <strong>Tenant Guard</strong> — a NestJS guard that runs after JWT verification on every protected route.
        </p>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="c">{'// tenant.guard.ts'}</span>{'\n'}
            <span className="k">@Injectable</span>(){'\n'}
            <span className="k">export class</span> <span className="t">TenantGuard</span> <span className="k">implements</span> <span className="t">CanActivate</span> {'{'}{'\n'}
            {'  '}<span className="f">canActivate</span>(ctx: <span className="t">ExecutionContext</span>): <span className="t">boolean</span> {'{'}{'\n'}
            {'    '}<span className="k">const</span> req = ctx.<span className="f">switchToHttp</span>().<span className="f">getRequest</span>();{'\n'}
            {'    '}<span className="k">const</span> user: <span className="t">JwtPayload</span> = req.user; <span className="c">{'// set by JwtAuthGuard'}</span>{'\n\n'}
            {'    '}<span className="c">{'// URL param: /schools/:schoolId/students'}</span>{'\n'}
            {'    '}<span className="k">const</span> urlTenantId = req.params.schoolId;{'\n\n'}
            {'    '}<span className="k">if</span> (urlTenantId && urlTenantId !== user.tenantId) {'{'}{'\n'}
            {'      '}<span className="k">throw new</span> <span className="t">ForbiddenException</span>(<span className="s">&apos;Wrong terminal.&apos;</span>);{'\n'}
            {'    '}{'}'}{'\n\n'}
            {'    '}<span className="k">return true</span>;{'\n'}
            {'  '}{'}'}{'\n'}
            {'}'}
          </code>
        </pre>

        <p className="blog-p font-serif">
          This guard runs on every admin and student route. An admin from School A who somehow crafts a request to School B&apos;s endpoint gets a <code className="inline-code">403 Forbidden</code> — they tried to walk through the wrong gate.
        </p>

        <h2 className="section-h2 font-heading" data-num="06 —">The Conveyor Belt — Tenant-Scoped Database Queries</h2>

        <p className="blog-p font-serif">
          The guard stops cross-tenant <em>access</em>. But we need a second layer: the database queries themselves must always be scoped to the correct tenant. If the guard is the gate scanner, the database layer is the conveyor belt — luggage must only reach the right carousel.
        </p>

        <p className="blog-p font-serif">
          Every service method that reads data takes <code className="inline-code">tenantId</code> as an explicit parameter, extracted from the JWT payload and passed down from the controller:
        </p>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="c">{'// students.service.ts'}</span>{'\n'}
            <span className="k">async</span> <span className="f">findAll</span>(tenantId: <span className="t">string</span>, page: <span className="n">number</span>) {'{'}{'\n'}
            {'  '}<span className="k">return</span> this.prisma.student.<span className="f">findMany</span>({'{'}{'\n'}
            {'    '}where: {'{'}{'\n'}
            {'      '}school_id: tenantId,  <span className="c">{'// ← always scoped'}</span>{'\n'}
            {'      '}is_active: <span className="k">true</span>,{'\n'}
            {'    '}{'}'},{'\n'}
            {'    '}skip: (page - <span className="n">1</span>) * <span className="n">20</span>,{'\n'}
            {'    '}take: <span className="n">20</span>,{'\n'}
            {'    '}orderBy: {'{'} created_at: <span className="s">&apos;desc&apos;</span> {'}'},{'\n'}
            {'  '}{'}'});{'\n'}
            {'}'}
          </code>
        </pre>

        <div className="callout callout-warn animate-fade-in">
          <div className="callout-label font-mono">Defence in depth</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            The guard and the DB-level scope are both needed. The guard catches bad URLs. The DB scope catches any code path that forgets to check — a background job, an admin shortcut, a future developer who skips the guard. Never rely on a single layer for tenant isolation.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="07 —">The Full Request Journey</h2>

        <p className="blog-p font-serif">
          Here is what happens from the moment a teacher at School A sends a request to fetch her students, to the moment she gets the list back:
        </p>

        <div className="flow font-mono">
          <div className="flow-title">Request Lifecycle — Tenant-Scoped Read</div>
          <div className="flow-step">
            <div className="flow-num">1</div>
            <div className="flow-desc"><strong>Teacher</strong> sends <code className="inline-code">GET /schools/school-a/students</code> with JWT in header</div>
          </div>
          <div className="flow-step">
            <div className="flow-num">2</div>
            <div className="flow-desc"><strong>JwtAuthGuard</strong> verifies token signature — extracts payload <code className="inline-code">{'{'} tenantId: "school-a", role: "teacher" {'}'}</code></div>
          </div>
          <div className="flow-step">
            <div className="flow-num">3</div>
            <div className="flow-desc"><strong>TenantGuard</strong> checks URL <code className="inline-code">schoolId</code> matches <code className="inline-code">tenantId</code> in token — passes</div>
          </div>
          <div className="flow-step">
            <div className="flow-num">4</div>
            <div className="flow-desc"><strong>RoleGuard</strong> checks <code className="inline-code">role === "teacher"</code> is allowed on this route — passes</div>
          </div>
          <div className="flow-step">
            <div className="flow-num">5</div>
            <div className="flow-desc"><strong>StudentsController</strong> calls <code className="inline-code">studentsService.findAll(tenantId, page)</code></div>
          </div>
          <div className="flow-step">
            <div className="flow-num">6</div>
            <div className="flow-desc"><strong>Prisma query</strong> runs with <code className="inline-code">WHERE school_id = 'school-a'</code> — zero leakage possible</div>
          </div>
          <div className="flow-step">
            <div className="flow-num">7</div>
            <div className="flow-desc"><strong>Response</strong> returns only School A&apos;s students. School B is unreachable from here.</div>
          </div>
        </div>

        <h2 className="section-h2 font-heading" data-num="08 —">Shared vs Isolated Data</h2>

        <p className="blog-p font-serif">
          Not everything belongs to a single tenant. Some data is shared across the whole platform — think currency lists, country codes, global feature flags. In airport terms: the duty-free shops and the runways are shared infrastructure that serves all airlines.
        </p>

        <table className="compare-table font-serif">
          <thead>
            <tr>
              <th>Data</th>
              <th>Scoped?</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Students, Teachers, Timetables</td>
              <td className="yes">Tenant-scoped</td>
              <td>Belongs to one school only</td>
            </tr>
            <tr>
              <td>Grades, Attendance records</td>
              <td className="yes">Tenant-scoped</td>
              <td>Private school data — strong isolation required</td>
            </tr>
            <tr>
              <td>Subject catalogue (standard)</td>
              <td className="partial">Shared + overridable</td>
              <td>Platform provides defaults; tenant can customise</td>
            </tr>
            <tr>
              <td>Country / Currency lists</td>
              <td className="no">Shared (global)</td>
              <td>Same for everyone; no tenant variation</td>
            </tr>
            <tr>
              <td>Feature flags</td>
              <td className="partial">Per-tenant config</td>
              <td>Different schools on different plan tiers</td>
            </tr>
          </tbody>
        </table>

        <h2 className="section-h2 font-heading" data-num="09 —">The Tradeoffs We Accepted</h2>

        <p className="blog-p font-serif">
          Row-level multi-tenancy (one database, <code className="inline-code">school_id</code> on every table) is the simplest approach but not the only one. We chose it deliberately:
        </p>

        <ul className="blog-ul font-serif">
          <li className="blog-li"><strong>Schema-per-tenant</strong> gives stronger isolation and easier backup per tenant — but migrations become a nightmare at scale. Running one migration across 500 Postgres schemas in sequence is a 2 AM incident waiting to happen.</li>
          <li className="blog-li"><strong>Database-per-tenant</strong> is the gold standard for isolation — but the infrastructure cost is proportional to tenant count. Fine for enterprise; impractical for hundreds of small schools.</li>
          <li className="blog-li"><strong>Row-level (our approach)</strong> is operationally simple — one DB, one migration, shared connection pool — but requires discipline at the query layer. One missing <code className="inline-code">WHERE school_id = ?</code> is a data leak. The two-layer defence (guard + DB scope) is what makes this safe.</li>
        </ul>

        <div className="highlight-block animate-fade-in">
          <p className="blog-p font-serif">
            <strong>The airport insight:</strong> the building itself doesn&apos;t guarantee that Emirates passengers don&apos;t board Singapore flights. The signs, the gate agents, the boarding pass scanners — the <em>process</em> does. Architecture is the same. The framework gives you the structure; the guards and query patterns are what actually enforce the rules.
          </p>
          <p className="blog-p font-serif">
            A multi-tenant system is only as isolated as its least-careful query. Write it once, enforce it everywhere, and trust the pipeline — not individual developers remembering to filter correctly.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="10 —">What I&apos;d Do Differently</h2>

        <ul className="blog-ul font-serif">
          <li className="blog-li"><strong>Centralise tenant extraction early.</strong> We initially extracted <code className="inline-code">tenantId</code> manually in each controller. Pulling it into a shared decorator (<code className="inline-code">@TenantId()</code> as a param decorator) eliminated the repetition and made it impossible to forget.</li>
          <li className="blog-li"><strong>Add a Prisma middleware for safety.</strong> A Prisma middleware that automatically injects <code className="inline-code">school_id</code> into every <code className="inline-code">findMany</code> / <code className="inline-code">findFirst</code> call — via a request-scoped context — is a stronger guarantee than trusting every service author to remember the filter.</li>
          <li className="blog-li"><strong>Test cross-tenant access explicitly.</strong> Write integration tests that log in as a user from Tenant A and attempt to read Tenant B&apos;s data. If those tests exist and pass, you have proof the isolation holds. If they don&apos;t exist, you have hope.</li>
          <li className="blog-li"><strong>Log tenantId on every request.</strong> Correlating logs across a multi-tenant system is painful without a consistent tenant identifier on every log line. Add it to your logging interceptor from day one.</li>
        </ul>

        <hr className="divider" />

        <p className="blog-p font-serif">
          Multi-tenancy is less about any single clever trick and more about consistent discipline across hundreds of small decisions. The framework enforces structure. The guards enforce identity. The query layer enforces scope. All three have to hold — and when they do, one server really can serve a thousand schools without any of them knowing the others exist.
        </p>

        <p className="font-serif italic text-[var(--blog-muted)]" style={{ opacity: 0.8 }}>
          Every passenger lands at the right gate. Every bag reaches the right carousel. One airport, many airlines — one backend, many tenants.
        </p>

      </main>

      <footer className="border-t border-[var(--blog-border)] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="footer-left font-mono">
            Written from hands-on implementation experience &nbsp;·&nbsp; 2026
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#a78bfa' }}>NestJS · Multi-Tenancy · Architecture · Prisma</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
