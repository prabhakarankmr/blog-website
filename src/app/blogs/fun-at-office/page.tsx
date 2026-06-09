
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './blog.css';

export default function FunAtOfficeBlogPage() {
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
    <div className="blog-container font-sans selection:bg-[#fb923c] selection:text-[var(--blog-bg)]">
      <div className="progress-bar" style={{ width: `${scrollWidth}%` }} id="progress"></div>

      <nav className="fixed top-0 left-0 w-full z-40 bg-[var(--blog-bg)]/80 backdrop-blur-md border-b border-[var(--blog-border)] py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xs font-mono tracking-widest uppercase text-[var(--blog-muted)] hover:text-[#fb923c] transition-colors">
            ← Back to Home
          </Link>
          <div className="text-[10px] font-mono text-[var(--blog-muted)] uppercase tracking-tighter">
            Reading: Fun at Work
          </div>
        </div>
      </nav>

      <header className="blog-header pt-40">
        <div className="header-grid"></div>
        <div className="header-glow"></div>
        <div className="header-inner">
          <div className="tag-row">
            <span className="tag tag-orange">Culture</span>
            <span className="tag tag-yellow">People</span>
            <span className="tag tag-muted">Opinion</span>
          </div>
          <h1 className="blog-title font-heading">Your Laptop Is Not Your Best Friend: The Case for Actually Having <em>Fun</em> at Work</h1>
          <p className="subtitle font-serif">On burnout, the 3 PM slump, and why fifteen minutes of something silly is one of the highest-leverage things a team can do together.</p>
          <div className="meta font-mono">
            <span>By Prabha</span>
            <span className="meta-dot"></span>
            <span>June 2026</span>
            <span className="meta-dot"></span>
            <span>12 min read</span>
          </div>
        </div>
      </header>

      <main className="blog-main">

        <h2 className="section-h2 font-heading" data-num="01 —">A Monday Morning, Somewhere in Every Office</h2>

        <p className="blog-p font-serif">
          It is 9:03 AM.
        </p>

        <p className="blog-p font-serif">
          Raj walks in, sits down, opens his laptop, and stares at the same dashboard he has been staring at for eleven months. He types. He clicks. He opens a spreadsheet. He closes the spreadsheet. He opens it again as if something magically changed in the last four seconds.
        </p>

        <p className="blog-p font-serif">It did not.</p>

        <p className="blog-p font-serif">
          By 11 AM he has sent six emails, attended two meetings that could have been one email, and consumed enough coffee to make his keyboard nervous.
        </p>

        <p className="blog-p font-serif">
          By 3 PM his brain has the processing power of a slow internet connection on a rainy day.
        </p>

        <p className="blog-p font-serif">
          By 5 PM he submits work that is — and this is the technical term — <em>fine</em>. Not great. Not inspired. Just fine.
        </p>

        <p className="blog-p font-serif">
          Nobody planned for this. Nobody wanted this. It just happened. Because nobody planned for the opposite either.
        </p>

        <h2 className="section-h2 font-heading" data-num="02 —">The Myth of the Productive Zombie</h2>

        <p className="blog-p font-serif">
          There is a very old and very incorrect belief that floats around most offices like a bad smell from the pantry.
        </p>

        <p className="blog-p font-serif">
          It goes like this: <strong>the more hours someone sits at their desk, the more work they produce.</strong>
        </p>

        <p className="blog-p font-serif">
          By this logic, a person chained to their chair for fourteen hours should be twice as productive as someone who worked seven. Let us test this theory.
        </p>

        <p className="blog-p font-serif">
          Have you ever tried to write an important email at hour nine of staring at a screen? You read the same sentence four times. You forget what you were about to type mid-sentence. You accidentally sign off with <em>&ldquo;Regards, Best&rdquo;</em> because your brain gave up choosing between the two.
        </p>

        <div className="callout callout-orange animate-fade-in">
          <div className="callout-label font-mono">The battery problem</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            The human brain is not a machine that runs at full speed until the power cuts. It is more like a phone battery — it drains, it heats up, and after a certain point it just shows a red percentage and starts making poor decisions. A drained brain does not produce great work. It produces <em>technically completed</em> work. There is a difference.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="03 —">What Actually Happens Without Any Fun</h2>

        <p className="blog-p font-serif">
          Let us be honest about what an entertainment-free office looks like from the inside.
        </p>

        <h3 className="section-h3 font-heading">The Silence That Eats Creativity</h3>

        <p className="blog-p font-serif">
          Picture a room where twelve people sit in complete silence for eight hours, each staring into their own screen, communicating exclusively through Slack messages and passive-aggressive email threads with <em>&ldquo;As per my last email&rdquo;</em> buried somewhere in paragraph three.
        </p>

        <p className="blog-p font-serif">
          Nobody knows who anybody is. Priya from finance does not know that Dev from engineering is hilarious. Dev does not know that Priya solved the exact problem he spent three hours Googling last Tuesday. They never spoke. They never will.
        </p>

        <p className="blog-p font-serif">The knowledge dies with the silence.</p>

        <h3 className="section-h3 font-heading">The 3 PM Slump That Runs the Company</h3>

        <p className="blog-p font-serif">
          Every office has a 3 PM slump. It is as reliable as Monday morning meetings and as welcome as a surprise audit.
        </p>

        <p className="blog-p font-serif">
          Productivity drops. Typos multiply. Someone approves something they should not have approved because their brain was in screensaver mode and they just pressed yes to make the notification go away.
        </p>

        <p className="blog-p font-serif">
          It is not laziness. It is biology. The human brain after a long unbroken stretch of focused work is essentially a browser with forty-seven tabs open, three of which are frozen, and nobody can remember which ones.
        </p>

        <h3 className="section-h3 font-heading">The Person Who Quit Without Quitting</h3>

        <p className="blog-p font-serif">
          There is a phenomenon where an employee is physically present, technically employed, and completely emotionally absent.
        </p>

        <p className="blog-p font-serif">
          They show up. They do the minimum. They do not volunteer ideas. They do not go beyond what is asked. They are waiting — for 5 PM, for Friday, for the weekend — not because they are bad at their job but because nothing about their daily experience gives them any reason to bring their best self to it.
        </p>

        <p className="blog-p font-serif">
          This person is invisible on a spreadsheet. The company still pays them a full salary. They still occupy a seat. But somewhere between month three and month eight, the spark went out and nobody brought a lighter.
        </p>

        <h2 className="section-h2 font-heading" data-num="04 —">The Short Break — The Most Underrated Tool in the Office</h2>

        <p className="blog-p font-serif">
          Here is a fact that sounds counterintuitive but is absolutely true: <strong>stepping away from work for ten minutes makes you better at work.</strong>
        </p>

        <p className="blog-p font-serif">
          Imagine you are trying to untangle a pair of earphones. The more you stare intensely at the knot and pull aggressively at random strings, the tighter it gets. You put it down for five minutes. You come back. You see the solution in eleven seconds.
        </p>

        <p className="blog-p font-serif">That is your brain on a short break.</p>

        <p className="blog-p font-serif">
          Walking away from the screen, making a cup of tea, throwing a paper ball into a bin and celebrating like you scored the winning goal — these are not distractions. They are the mental equivalent of a page refresh.
        </p>

        <p className="blog-p font-serif">
          The work will still be there when you get back. It will just look slightly less impossible.
        </p>

        <h2 className="section-h2 font-heading" data-num="05 —">Games in the Office — Hear Me Out</h2>

        <p className="blog-p font-serif">
          <em>&ldquo;We cannot play games at work, this is a professional environment.&rdquo;</em>
        </p>

        <p className="blog-p font-serif">
          Okay. Let us talk about what happens in a professional environment at 2:30 PM on a Wednesday when three people are in a meeting that was scheduled as thirty minutes but is now heading into its fifty-eighth minute with no resolution in sight.
        </p>

        <p className="blog-p font-serif">
          Now compare that to a team that spent fifteen minutes playing a quick round of something — anything — earlier in the day. They laughed. They argued in a friendly way about the rules. Someone called someone else a cheat and everyone laughed harder. They walked back to their desks remembering that their colleagues are actual human beings and not just names on a chat platform.
        </p>

        <div className="callout callout-info animate-fade-in">
          <div className="callout-label font-mono">What the research says</div>
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            Play improves problem-solving. It reduces stress. It builds the kind of easy familiarity between teammates that means when someone has a difficult question at 4 PM they actually ask it instead of sitting alone with it for three days. The return on fifteen minutes of silly fun is not measurable in a spreadsheet — but you will feel it in every meeting that runs smoother and every idea that gets shared instead of swallowed.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="06 —">The Team Lunch — A Table That Does More Than Feed People</h2>

        <p className="blog-p font-serif">
          A team lunch sounds like a simple thing. Food. People. A table.
        </p>

        <p className="blog-p font-serif">
          But consider what actually happens at a team lunch that does not happen at a desk.
        </p>

        <p className="blog-p font-serif">
          Arun, who always seems slightly unapproachable in meetings, turns out to be absolutely obsessed with bad reality television and has opinions about it that are deeply researched and passionately held. This is the funniest thing anyone has heard in weeks.
        </p>

        <p className="blog-p font-serif">Now Arun is approachable.</p>

        <p className="blog-p font-serif">
          Now when Arun raises a concern in the next sprint review, people listen differently — because they know Arun, not just Arun&apos;s job title.
        </p>

        <p className="blog-p font-serif">
          Relationships built around food are ancient and universal. Every culture on earth figured out long ago that sharing a meal changes something between people. The office is not an exception to this rule. It just forgot it.
        </p>

        <div className="highlight-block animate-fade-in">
          <p className="blog-p font-serif" style={{ marginBottom: 0 }}>
            A team that eats together once a month does not just have a full stomach. It has <strong>trust in the bank</strong>. And trust is the currency that makes everything else in an office work faster and with far less friction.
          </p>
        </div>

        <h2 className="section-h2 font-heading" data-num="07 —">The Team Outing — Getting People Out of the Building</h2>

        <p className="blog-p font-serif">
          There is something remarkable that happens when you take a group of people who only know each other as job functions and put them somewhere that is not the office.
        </p>

        <p className="blog-p font-serif">
          The finance person who is always busy becomes the one who organises the group and turns out to be brilliant at logistics. The quiet developer who barely speaks in standups turns out to be the funniest person on a hiking trail. The manager who always seems stressed in the building is completely relaxed and suddenly very easy to talk to.
        </p>

        <p className="blog-p font-serif">
          The building changes people. Or rather — the building shows only one version of each person. The version that is managing deadlines and responding to pressure and performing competence at all times.
        </p>

        <p className="blog-p font-serif">
          Outside the building, you meet the actual person. And it turns out — predictably, consistently, every single time — that the actual person is someone worth knowing. Someone worth working hard for. Someone whose success you now care about in a way that no KPI target ever quite managed to achieve.
        </p>

        <p className="blog-p font-serif">
          You come back to the office on Monday and something is different. The emails are slightly warmer. The meetings are slightly more honest. The problems get solved a little faster because the people solving them actually like each other.
        </p>

        <p className="blog-p font-serif">One afternoon outside did that.</p>

        <h2 className="section-h2 font-heading" data-num="08 —">The Maths Nobody Does</h2>

        <p className="blog-p font-serif">
          Companies carefully calculate the cost of a team lunch, a half-day outing, or a small budget for office activities. The number looks like an expense.
        </p>

        <p className="blog-p font-serif">Here is the number they rarely calculate:</p>

        <div className="cost-box font-serif">
          <div className="cost-item">
            <div className="cost-icon">💸</div>
            <div>
              <span className="cost-label font-mono">Cost of replacing one burned-out employee</span>
              Six to nine months of their salary — in recruitment, onboarding, and the productivity gap while the new person finds their feet.
            </div>
          </div>
          <div className="cost-item">
            <div className="cost-icon">🔁</div>
            <div>
              <span className="cost-label font-mono">Cost of a team that does not communicate well</span>
              Every duplicated effort, every missed handoff, every meeting held to fix the misunderstanding that happened because two people never built enough rapport to be direct with each other.
            </div>
          </div>
          <div className="cost-item">
            <div className="cost-icon">📉</div>
            <div>
              <span className="cost-label font-mono">Cost of the 3 PM slump × 12 people × 250 working days</span>
              Do that maths. It is a large number.
            </div>
          </div>
        </div>

        <p className="blog-p font-serif">
          Now compare that to the cost of a team lunch once a month and a team outing twice a year.
        </p>

        <p className="blog-p font-serif">
          The fun is not the expense. The fun is the investment. The burnout, the silence, the quiet resignation — those are the expenses.
        </p>

        <h2 className="section-h2 font-heading" data-num="09 —">What a Healthy Team Actually Looks Like</h2>

        <p className="blog-p font-serif">
          It does not mean games all day and zero work. That is not what anyone is suggesting and that is not what works.
        </p>

        <p className="blog-p font-serif">It means:</p>

        <ul className="blog-ul font-serif">
          <li className="blog-li">A ten-minute break in the afternoon that is actually <strong>encouraged</strong>, not silently judged</li>
          <li className="blog-li">A team lunch that happens on purpose, not only when someone is leaving</li>
          <li className="blog-li">A small budget for activities that exist for no reason except that the team deserves to have fun together</li>
          <li className="blog-li">An outing that happens <em>before</em> people are tired, not as a desperate attempt to save a team that is already halfway gone</li>
          <li className="blog-li">Games or light activities that remind people they are on the same side</li>
        </ul>

        <p className="blog-p font-serif">
          These are small things. They take small amounts of time and small amounts of money. But they compound.
        </p>

        <p className="blog-p font-serif">
          A team that laughs together on Tuesday solves problems better on Wednesday. A team that went on an outing together in March handles a tough project together in May. A team that genuinely likes each other does not need a motivational poster on the wall telling them to <em>collaborate and innovate</em>.
        </p>

        <p className="blog-p font-serif">They just do it. Because they want to.</p>

        <h2 className="section-h2 font-heading" data-num="10 —">The Last Thing</h2>

        <div className="scene-block font-serif">
          <p className="blog-p" style={{ marginBottom: '16px' }}>
            Raj is still at his desk. It is 3 PM on a Thursday.
          </p>
          <p className="blog-p" style={{ marginBottom: '16px' }}>
            In one version of his life, nothing changes. He stares at the screen. He produces fine work. He waits for the weekend. Somewhere around month fourteen he updates his resume.
          </p>
          <p className="blog-p" style={{ marginBottom: 0 }}>
            In another version, at 3 PM someone said <em>&ldquo;fifteen minute break, courtyard, right now&rdquo;</em> and twelve people stood in the sun for a few minutes being human beings together. Raj laughed at something. He came back to his desk, looked at the problem he had been staring at for two hours, and solved it in twenty minutes.
          </p>
        </div>

        <p className="blog-p font-serif">
          Same Raj. Same laptop. Same job.
        </p>

        <p className="blog-p font-serif">
          Just a slightly less empty battery.
        </p>

        <hr className="divider" />

        <p className="font-serif italic text-[var(--blog-muted)]" style={{ opacity: 0.8, fontSize: '1.05rem', lineHeight: '1.8' }}>
          Because great work does not come from people who are exhausted. It comes from people who are energised, connected, and — occasionally — very entertained.
        </p>

      </main>

      <footer className="border-t border-[var(--blog-border)] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="footer-left font-mono">
            Written with strong opinions and weak coffee &nbsp;·&nbsp; 2026
          </div>
          <div className="flex gap-4">
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#fb923c' }}>Culture · People · Burnout · Teams</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
