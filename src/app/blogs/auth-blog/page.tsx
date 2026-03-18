
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './blog.css';

export default function AuthBlogPage() {
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
    <div className="blog-container font-sans selection:bg-[var(--blog-accent)] selection:text-[var(--blog-bg)]">
      <div className="progress-bar" style={{ width: `${scrollWidth}%` }} id="progress"></div>

      <nav className="fixed top-0 left-0 w-full z-40 bg-[var(--blog-bg)]/80 backdrop-blur-md border-b border-[var(--blog-border)] py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xs font-mono tracking-widest uppercase text-[var(--blog-muted)] hover:text-[var(--blog-accent)] transition-colors">
            ← Back to Home
          </Link>
          <div className="text-[10px] font-mono text-[var(--blog-muted)] uppercase tracking-tighter">
            Reading: Securing APIs with JWT
          </div>
        </div>
      </nav>

      <header className="blog-header pt-40">
        <div className="header-grid"></div>
        <div className="header-glow"></div>
        <div className="header-inner">
          <div className="tag-row">
            <span className="tag tag-yellow">Security</span>
            <span className="tag tag-cyan">Authentication</span>
            <span className="tag tag-muted">Backend</span>
          </div>
          <h1 className="blog-title font-heading">Securing APIs with <em>JWT</em> &amp; Session Management</h1>
          <p className="subtitle font-serif">A practical deep-dive into token-based authentication and remote session control — what I learned building it from scratch.</p>
          <div className="meta font-mono">
            <span>By Prabha</span>
            <span className="meta-dot"></span>
            <span>March 2026</span>
            <span className="meta-dot"></span>
            <span>10 min read</span>
          </div>
        </div>
      </header>

      <main className="blog-main">
        <p className="blog-p font-serif">
          Authentication is one of those things that sounds simple until you actually have to implement it correctly. In this post, I&apos;ll walk through two complementary concepts I put into practice: <strong>JWT (JSON Web Token) authentication</strong> to secure API endpoints, and <strong>backend-driven session management</strong> for remote logout capability — something similar to how Google lets you see all your active devices and kick any of them out.
        </p>

        <h2 className="section-h2 font-heading" data-num="01 —">Why JWT?</h2>

        <p className="blog-p font-serif">
          The traditional session model stores session state on the server — a database row or a Redis entry. The server checks it on every request. That works, but it ties every API call to a database lookup. JWTs flip this: the server signs a token and hands it to the client. On subsequent requests, the server just <em>verifies the signature</em> — no database call needed for validation.
        </p>

        <div className="callout callout-info animate-fade-in">
          <div className="callout-label font-mono">💡 Key Insight</div>
          <p className="blog-p font-serif">JWTs are <strong>stateless</strong>. The token itself carries the user&apos;s identity and expiry. As long as the signing secret matches, the server trusts it — making horizontally scaled services much simpler to build.</p>
        </div>

        <p className="blog-p font-serif">
          A JWT is made of three base64-encoded parts separated by dots: <code className="inline-code">header.payload.signature</code>. The payload holds claims — things like the user&apos;s ID, role, and when the token expires. The signature ensures nobody tampered with it.
        </p>

        <h2 className="section-h2 font-heading" data-num="02 —">Implementing JWT in NestJS</h2>

        <p className="blog-p font-serif">NestJS has excellent Passport integration. The implementation breaks down into four clean pieces:</p>

        <h3 className="section-h3 font-heading">1. The JWT Module</h3>
        <p className="blog-p font-serif">A global module that wires up <code className="inline-code">JwtService</code> with your secret and expiry from environment variables. Setting it as global means any service in your app can inject <code className="inline-code">JwtService</code> without re-importing the module.</p>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="c">{'// jwt.module.ts'}</span>{'\n'}
            <span className="k">@Module</span>({'{'}{'\n'}
            {'  '}imports: [{'\n'}
            {'    '}JwtModule.registerAsync({'{'}{'\n'}
            {'      '}useFactory: (config: ConfigService) =&gt; ({'{'}{'\n'}
            {'        '}secret: config.get(<span className="s">&apos;JWT_SECRET&apos;</span>),{'\n'}
            {'        '}signOptions: {'{'} expiresIn: config.get(<span className="s">&apos;JWT_EXPIRES_IN&apos;</span>) {'}'},{'\n'}
            {'      '}{'}'}),{'\n'}
            {'      '}inject: [ConfigService],{'\n'}
            {'    '}{'}'}),{'\n'}
            {'  '}],{'\n'}
            {'  '}exports: [JwtModule],{'\n'}
            {'}'}){'\n'}
            <span className="k">export class</span> <span className="t">SharedJwtModule</span> {'{}'}
          </code>
        </pre>

        <h3 className="section-h3 font-heading">2. The JWT Strategy</h3>
        <p className="blog-p font-serif">Passport strategies define <em>how</em> a token is extracted and verified. The JWT strategy reads the Bearer token from the Authorization header, verifies it against the secret, and returns a payload object that becomes available in controllers.</p>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="c">{'// jwt.strategy.ts'}</span>{'\n'}
            <span className="k">@Injectable</span>(){'\n'}
            <span className="k">export class</span> <span className="t">JwtStrategy</span> <span className="k">extends</span> PassportStrategy(Strategy) {'{'}{'\n'}
            {'  '}constructor(<span className="k">private</span> config: ConfigService) {'{'}{'\n'}
            {'    '}super({'{'}{'\n'}
            {'      '}jwtFromRequest: ExtractJwt.<span className="f">fromAuthHeaderAsBearerToken</span>(),{'\n'}
            {'      '}secretOrKey: config.<span className="f">get</span>(<span className="s">&apos;JWT_SECRET&apos;</span>),{'\n'}
            {'    '}{'}'});{'\n'}
            {'  '}{'}'}{'\n\n'}
            {'  '}<span className="k">async</span> <span className="f">validate</span>(payload: <span className="t">JwtPayload</span>) {'{'}{'\n'}
            {'    '}<span className="k">return</span> payload; <span className="c">{'// attached to req.user'}</span>{'\n'}
            {'  '}{'}'}{'\n'}
            {'}'}
          </code>
        </pre>

        <h3 className="section-h3 font-heading">3. The Auth Guard</h3>
        <p className="blog-p font-serif">A guard intercepts every incoming request before it reaches your controller. The global guard blocks all routes by default — which is exactly what you want. Only routes explicitly decorated with <code className="inline-code">@Public()</code> skip verification.</p>

        <pre className="blog-pre font-mono" data-lang="typescript">
          <code className="blog-code">
            <span className="c">{'// jwt-auth.guard.ts'}</span>{'\n'}
            <span className="k">@Injectable</span>(){'\n'}
            <span className="k">export class</span> <span className="t">JwtAuthGuard</span> <span className="k">extends</span> AuthGuard(<span className="s">&apos;jwt&apos;</span>) {'{'}{'\n'}
            {'  '}canActivate(context: <span className="t">ExecutionContext</span>) {'{'}{'\n'}
            {'    '}<span className="k">const</span> isPublic = this.reflector.<span className="f">get</span>(<span className="n">IS_PUBLIC_KEY</span>, context.<span className="f">getHandler</span>());{'\n'}
            {'    '}<span className="k">if</span> (isPublic) <span className="k">return true</span>;{'\n'}
            {'    '}<span className="k">return super</span>.<span className="f">canActivate</span>(context);{'\n'}
            {'  '}{'}'}{'\n'}
            {'}'}
          </code>
        </pre>

        <h2 className="section-h2 font-heading" data-num="03 —">The Request Flow</h2>

        <div className="sequence font-mono">
          <div className="seq-title">JWT Authentication — Request Lifecycle</div>
          <div className="seq-actors">
            <div className="seq-actor">Client</div>
            <div className="seq-actor">API Guard</div>
            <div className="seq-actor">Controller</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">1</div>
            <div className="seq-desc"><strong>Client</strong> <span className="seq-arrow">→</span> POST /signin — sends credentials</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">2</div>
            <div className="seq-desc"><strong>Auth Service</strong> validates credentials, calls JwtService.sign(payload)</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">3</div>
            <div className="seq-desc"><strong>API</strong> <span className="seq-arrow">→</span> returns <code className="inline-code">{'{'} access_token: &quot;eyJhbG...&quot; {'}'}</code></div>
          </div>
          <div className="seq-step">
            <div className="seq-num">4</div>
            <div className="seq-desc"><strong>Client</strong> stores token, sends on subsequent requests: <code className="inline-code">Authorization: Bearer &lt;token&gt;</code></div>
          </div>
          <div className="seq-step">
            <div className="seq-num">5</div>
            <div className="seq-desc"><strong>JwtAuthGuard</strong> extracts + verifies token signature and expiry</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">6</div>
            <div className="seq-desc"><strong>Controller</strong> receives request with <code className="inline-code">req.user</code> populated — or gets 401 if invalid</div>
          </div>
        </div>

        <h2 className="section-h2 font-heading" data-num="04 —">The Problem JWT Alone Can&apos;t Solve</h2>
        <p className="blog-p font-serif">JWT authentication is elegant, but it has a blind spot: <strong>you cannot revoke a token before it expires</strong>. Once issued, a valid token is valid — there&apos;s no built-in way to say &quot;log this user out from their phone.&quot;</p>

        <h2 className="section-h2 font-heading" data-num="05 —">Backend Session Management</h2>
        <p className="blog-p font-serif">The idea is to combine JWT&apos;s stateless verification with a server-side session record that can be invalidated at any time.</p>

        <pre className="blog-pre font-mono" data-lang="prisma">
          <code className="blog-code">
            <span className="k">model</span> <span className="t">user_sessions</span> {'{'}{'\n'}
            {'  '}id            String   @id @default(uuid()){'\n'}
            {'  '}user_id       Int{'\n'}
            {'  '}session_token String   @unique{'\n'}
            {'  '}device_info   Json?       <span className="c">{'// OS, browser, device name'}</span>{'\n'}
            {'  '}ip_address    String?{'\n'}
            {'  '}is_active     Boolean  @default(true){'\n'}
            {'  '}last_activity DateTime @default(now()){'\n'}
            {'  '}expires_at    DateTime{'\n'}
            {'  '}created_at    DateTime @default(now()){'\n\n'}
            {'  '}@@index([user_id]){'\n'}
            {'  '}@@index([session_token]){'\n'}
            {'}'}
          </code>
        </pre>

        <p className="blog-p font-serif">Key fields: <code className="inline-code">is_active</code> is the kill switch. Setting it to <code className="inline-code">false</code> immediately invalidates that session — the next time that device makes a request, it gets a 401.</p>

        <h3 className="section-h3 font-heading">Session API Endpoints</h3>

        <table className="compare-table font-mono">
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code className="inline-code">POST</code></td>
              <td><code className="inline-code">/auth/sessions</code></td>
              <td>Create session on login</td>
            </tr>
            <tr>
              <td><code className="inline-code">GET</code></td>
              <td><code className="inline-code">/auth/sessions</code></td>
              <td>List all active sessions for user</td>
            </tr>
            <tr>
              <td><code className="inline-code">DELETE</code></td>
              <td><code className="inline-code">/auth/sessions/:id</code></td>
              <td>Log out a specific device</td>
            </tr>
            <tr>
              <td><code className="inline-code">DELETE</code></td>
              <td><code className="inline-code">/auth/sessions/all</code></td>
              <td>Log out from all devices</td>
            </tr>
            <tr>
              <td><code className="inline-code">PUT</code></td>
              <td><code className="inline-code">/auth/sessions/refresh</code></td>
              <td>Update last activity timestamp</td>
            </tr>
          </tbody>
        </table>

        <h2 className="section-h2 font-heading" data-num="06 —">The Remote Logout Flow</h2>

        <div className="sequence font-mono">
          <div className="seq-title">Remote Session Invalidation</div>
          <div className="seq-actors">
            <div className="seq-actor">Device A</div>
            <div className="seq-actor">Backend</div>
            <div className="seq-actor">Database</div>
            <div className="seq-actor">Device B</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">1</div>
            <div className="seq-desc"><strong>Device A</strong> <span className="seq-arrow">→</span> DELETE /auth/sessions/:id (Device B&apos;s session ID)</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">2</div>
            <div className="seq-desc"><strong>Backend</strong> <span className="seq-arrow">→</span> sets <code className="inline-code">is_active = false</code> in DB for that session</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">3</div>
            <div className="seq-desc"><strong>Device B</strong> makes any API request — session check fails</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">4</div>
            <div className="seq-desc"><strong>Backend</strong> <span className="seq-arrow">→</span> returns <code className="inline-code">401 Unauthorized</code> to Device B</div>
          </div>
          <div className="seq-step">
            <div className="seq-num">5</div>
            <div className="seq-desc"><strong>Device B</strong> redirected to login screen</div>
          </div>
        </div>

        <h2 className="section-h2 font-heading" data-num="07 —">Local vs Backend Sessions — The Tradeoffs</h2>

        <table className="compare-table font-serif">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Local Only</th>
              <th>Backend (Hybrid)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Session persistence</td>
              <td className="yes">✓ Yes</td>
              <td className="yes">✓ Yes</td>
            </tr>
            <tr>
              <td>Remote logout</td>
              <td className="no">✗ No</td>
              <td className="yes">✓ Yes</td>
            </tr>
            <tr>
              <td>View active devices</td>
              <td className="no">✗ No</td>
              <td className="yes">✓ Yes</td>
            </tr>
            <tr>
              <td>Server-side validation</td>
              <td className="no">✗ No</td>
              <td className="yes">✓ Yes</td>
            </tr>
            <tr>
              <td>Works offline</td>
              <td className="yes">✓ Yes</td>
              <td className="partial">⚠ Partial</td>
            </tr>
            <tr>
              <td>Security level</td>
              <td className="no">Low</td>
              <td className="yes">High</td>
            </tr>
          </tbody>
        </table>

        <p className="blog-p font-serif">The hybrid approach is what Google, Apple, and most serious platforms use. The JWT handles fast stateless verification on every request; the session record handles the stateful control plane — revocation, device listing, expiry management.</p>

        <h2 className="section-h2 font-heading" data-num="08 —">What I&apos;d Do Differently</h2>

        <p className="blog-p font-serif">Looking back, a few things I&apos;d think about more carefully next time:</p>

        <ul className="blog-ul font-serif">
          <li className="blog-li"><strong>Token refresh flow.</strong> Short-lived access tokens (15 min) paired with long-lived refresh tokens is more secure than a single long-lived JWT. On expiry, the client silently fetches a new access token using the refresh token — unless that session has been revoked.</li>
          <li className="blog-li"><strong>Session fingerprinting.</strong> Storing device info (OS, browser, IP) at session creation and flagging anomalies when they change dramatically can catch session hijacking.</li>
          <li className="blog-li"><strong>Soft delete vs hard delete.</strong> Keeping invalidated sessions in the DB (soft delete with <code className="inline-code">is_active = false</code>) gives you an audit log — who was logged in from where and when.</li>
          <li className="blog-li"><strong>Rate limiting on auth endpoints.</strong> Login routes should be rate-limited. Brute force against a PIN-based auth is trivial without it.</li>
        </ul>

        <div className="highlight-block animate-fade-in">
          <p className="blog-p font-serif"><strong>The main lesson:</strong> authentication and session management aren&apos;t the same thing. JWT solves the first problem — proving identity on each request without hitting the database. Session management solves the second — giving users and admins control over <em>which</em> instances of that identity are currently active.</p>
          <p className="blog-p font-serif">Building both together, even as a learner, changes how you think about what &quot;logged in&quot; actually means.</p>
        </div>

        <h2 className="section-h2 font-heading" data-num="09 —">Testing This Works</h2>

        <p className="blog-p font-serif">The verification steps I used, which I&apos;d recommend for anyone implementing this:</p>

        <ol className="blog-ol font-serif">
          <li className="blog-li"><strong>Login test:</strong> Check the <code className="inline-code">user_sessions</code> table directly after login — confirm a row was created with the correct user ID, device info, and <code className="inline-code">is_active = true</code>.</li>
          <li className="blog-li"><strong>Multi-device test:</strong> Log in from two devices (or two browser tabs with different credentials). <code className="inline-code">GET /auth/sessions</code> should return both.</li>
          <li className="blog-li"><strong>Remote logout test:</strong> From Device A, delete Device B&apos;s session ID. Make any authenticated request from Device B — it must return <code className="inline-code">401</code>.</li>
          <li className="blog-li"><strong>Logout-all test:</strong> Call <code className="inline-code">DELETE /auth/sessions/all</code>. Every other active session should immediately start returning <code className="inline-code">401</code>.</li>
        </ol>

        <hr className="divider" />

        <p className="blog-p font-serif">Authentication feels like solved infrastructure until you have to own it yourself. The moment you need remote logout, device tracking, or token revocation, the gaps become obvious fast. The good news: the patterns are well-established, and NestJS + Passport make the implementation cleaner than you&apos;d expect.</p>

        <p className="font-serif italic text-[var(--blog-muted)]" style={{ opacity: 0.8 }}>If you found this useful or have questions about any part of the implementation, feel free to reach out.</p>
      </main>

      <footer className="border-t border-[var(--blog-border)] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="footer-left font-mono">
            Written from hands-on implementation experience &nbsp;·&nbsp; 2026
          </div>
          <div className="flex gap-4">
            <span className="footer-tag font-mono text-[var(--blog-accent2)] text-[10px] tracking-widest uppercase">JWT · NestJS · Sessions · Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
