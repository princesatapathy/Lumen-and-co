// Responsive version of the Lumen & Co. page (same copy/tokens as gen.mjs). One HTML, three layouts via media queries.
// node gen-responsive.mjs -> ../responsive.html ; render with: node render-responsive.mjs
import { writeFileSync } from 'fs';

const star = (c = 'var(--color-primary)', s = 12) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 0l2.6 7.4L22 4.6l-2.8 7.4L22 19.4l-7.4-2.8L12 24l-2.6-7.4L2 19.4 4.8 12 2 4.6l7.4 2.8z" fill="${c}"/></svg>`;
const eyebrow = (t, cls = '') => `<div class="eyebrow ${cls}">${star(cls ? '#fff' : undefined)}<span>${t}</span></div>`;
const acc = (t, cls = '') => `<span class="acc ${cls}">${t}</span>`;
const head = (e, h, sub) => `<div class="head">${eyebrow(e)}<h2>${h}</h2>${sub ? `<p class="lead">${sub}</p>` : ''}</div>`;
const btnP = (t, cls = '') => `<div class="btn btn-p ${cls}" tabindex="0">${t}</div>`;
const btnS = (t, cls = '') => `<div class="btn btn-s ${cls}" tabindex="0">${t}</div>`;
const person = `<svg viewBox="0 0 220 290" fill="none" preserveAspectRatio="xMidYMax slice"><circle cx="110" cy="108" r="44" fill="#8E98CF"/><path d="M20 290C20 215 62 172 110 172C158 172 200 215 200 290Z" fill="#8E98CF"/></svg>`;

const tile = (t) => `<div class="tile"><div class="tile-t">${t}</div><div class="tile-tag">Passed by</div></div>`;
const col = (a) => `<div class="rcol">${a.map(tile).join('')}${a.map(t => tile(t).replace('class="tile"', 'class="tile rdup"')).join('')}</div>`;
const hero = `<section class="hero"><div class="hero-copy"><div class="pill-live rise" style="--d:0s"><i></i><span>PERSONAL BRANDING STUDIO</span></div><h1 class="rise" style="--d:.09s">Stand out.<br/>Stay<br/><span class="known acc">known.<svg viewBox="0 0 300 14" fill="none"><path class="scribble" pathLength="1" d="M3 9C65 3 165 12 297 5" stroke="#2D3FA6" stroke-width="4" stroke-linecap="round"/></svg></span></h1><p class="hero-sub rise" style="--d:.18s">We shape the story, script the content and film it alongside you, so the right people recognise your name before you ever say hello.</p><div class="btnrow rise" style="--d:.27s">${btnP('Book intro call →')}${btnS('See the work')}</div></div><div class="reel">${col(['3 tools I swear by', 'Day 12 of filming', 'Wait for the end…', 'Plain advice, once'])}${col(['POV: you are the expert', 'Quick tip for you', 'Same hook, new day', 'What I would redo'])}${col(['5 habits that stuck', 'Mistakes worth making', 'Behind the scenes', 'One honest take'])}<div class="fade fade-t"></div><div class="fade fade-b"></div><div class="fadeside"></div><div class="reel-photo">${person}</div><div class="reel-known">known.</div><div class="reel-tip">Most clips get skipped.</div></div></section>`;

const mrow = (items, cls) => { const set = () => items.map(t => `<div class="mi"><span>${t}</span>${star('#fff', 16)}</div>`).join(''); return `<div class="mrow ${cls}">${set()}${set()}</div>`; };
const marquee = `<section class="marquee">${mrow(['edits', 'Based in Lisbon', 'personal branding', 'strategy', 'scripts', 'shoots'], 'm-bold')}${mrow(['built for the long run', 'people, not just clicks', 'known, not just seen', 'real stories'], 'm-ital')}</section>`;

const statement = `<section class="sec bg-w statement"><div class="head">${eyebrow('OUR TAKE')}<h2>Reach doesn’t open doors. ${acc('Recall')} does.</h2></div><div class="stack24"><p class="lead">Most content chases impressions. We build yours around one idea: that a stranger should be able to describe you after a single scroll. Your voice, your point of view, the one thing you stand for.</p><p class="lead">Numbers follow once people remember you. What we care about is what comes next: real conversations, new clients, and the kind of work you actually want to be doing.</p></div></section>`;

const vid = (t, c) => `<div class="vid"><div class="post"><div class="post-h"><i class="av"></i><div class="post-n"><b></b><b class="s"></b></div><span class="post-b">View profile</span></div><div class="vid-box" style="background:${c}"><svg width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.85)"/><path d="M26 20l20 12-20 12z" fill="#12130F"/></svg></div><div class="post-f"><span></span><span></span><span></span></div></div><div class="vid-t" tabindex="0">${t}</div></div>`;
const work = `<section class="sec bg-p work">${head('01 — WORK', `Recent ${acc('work.')}`, 'A few pieces from clients across coaching, health and tech. Placeholder clips for now; real ones land here later.')}<div class="vids">${vid('Watch clip 01 →', '#C9CFE8')}${vid('Watch clip 02 →', '#D8CDBD')}${vid('Watch clip 03 →', '#BFD3C8')}</div></section>`;

const li = ([b, t]) => `<div class="li">${star()}<p><b>${b}</b> ${t}</p></div>`;
const L = [['Brand story and positioning:', 'what makes you different, in your own words'], ['A look at your space:', 'who else is talking, and how you stand apart'], ['Scripts for every clip:', 'hook, story and one clear message'], ['Shoots in Lisbon', ''], ['A weekly call', 'to review, plan and improve']];
const R = [['Profile setup:', 'bio, grid, highlights, pinned posts and the full page, ready to welcome visitors'], ['A clear content plan:', 'what to post, when, and why'], ['Help on camera:', 'how to speak, pause and feel natural'], ['Professional editing:', 'pacing, sound, colour and captions'], ['Monthly check-ins', 'on what is working, what is not, and what to change next']];
const deliv = `<section class="sec bg-w">${head('02 — WHAT YOU GET', `Everything your brand ${acc('needs.')}`)}<div class="lists"><div class="list">${L.map(li).join('')}</div><div class="list">${R.map(li).join('')}</div></div></section>`;

const step = (n, t, b) => `<div class="step"><div class="step-n">STEP ${n}</div><h3>${t}</h3><p class="body">${b}</p></div>`;
const process = `<section class="sec bg-p">${head('03 — HOW IT WORKS', `From first call to a brand people ${acc('recall.')}`, 'A clear system, step by step. No guesswork.')}<div class="steps">${step('01', 'Intro call', 'We learn about you, your work and your goals, review your current profile and tell you honestly what we see.')}${step('02', 'Story and positioning', 'We find the story only you can tell, decide how you want to be remembered, then set up your profile around it.')}${step('03', 'Plan and system', 'We build your content pillars and a monthly calendar, so every post has a reason to exist.')}${step('04', 'Scripts and shoot', 'We write and refine scripts each week, then shoot together in Lisbon and help you feel at ease on camera.')}${step('05', 'Edit, post and review', 'We edit, schedule and look at how each piece did. Every week we keep what works and plan the next batch.')}</div></section>`;

const chk = (t, dark) => `<div class="chk"><svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="${dark ? '#fff' : 'var(--color-primary)'}"/><path d="M6 11.5l3.2 3.2L16 8" stroke="${dark ? 'var(--color-primary)' : '#fff'}" stroke-width="2" fill="none"/></svg><p>${t}</p></div>`;
const plan = (dark, name, tag, items) => `<div class="plan ${dark ? 'plan-d' : ''}">${dark ? '<div class="plan-tab">MOST PICKED</div>' : ''}<h3>${name}</h3><p class="body plan-tag">${tag}</p><div class="chks">${items.map(t => chk(t, dark)).join('')}</div>${dark ? btnP('Book intro call →', 'btn-w') : btnS('Book intro call →')}</div>`;
const plans = `<section class="sec bg-w">${head('04 — PLANS', `Guidance, or ${acc('done for you.')}`, 'Two ways to work together. We will work out which one fits you best on a call, with no pressure at all.')}<div class="plans">${plan(false, 'Guided', 'We steer. You create.', ['Brand story and positioning', 'Content plan and pillars', 'Weekly hook and script review', 'On-camera coaching', 'Weekly strategy call', 'For people who already have a camera and an editor'])}${plan(true, 'Done for you', 'We handle it, start to finish.', ['Everything in Guided', 'Scripts written and refined for you', 'Shoots in Lisbon', 'Professional editing for every clip', 'Posting support and weekly review', 'Monthly progress check-ins'])}</div></section>`;

const band = `<section class="band"><div class="stack22"><div class="band-pill">a fair warning →</div><h2>Give it ${acc('a season.', 'w')}</h2></div><p class="band-p">A personal brand does not form in a fortnight. People need time to notice you, recall you and begin to trust you. That is why we ask for three months. By then there is enough work and enough data to see what is landing, and to do more of it.</p></section>`;

const about = `<section class="sec bg-p about"><div class="about-copy">${eyebrow('05 — WHO RUNS THIS')}<div class="quote">“I began by sharing everything I knew, and slowly learned that people don’t follow content. They ${acc('remember people.', 'q')}”</div><p class="body">I started out explaining ideas in plain pictures, a few minutes at a time. Years on, people still bring up one clip they saw and remember. That is when I understood what a personal brand really is.</p><p class="body">Later I changed direction and started again from zero. It taught me how a brand is built: a real story, a clear message and a simple system.</p><p class="body">Now the studio does the same for others.</p><div class="btnrow">${btnP('Book intro call →')}${btnS('Say hello on LinkedIn')}</div></div><div class="about-photo"><div class="photo">${person}</div><p class="cap">Founder, Lumen &amp; Co.</p></div></section>`;

const faqA = ['No. You can begin with no followers at all. Once your brand identity is settled, we help you set the account up properly.', 'Most clients see steady movement within the first month and a clear pattern by the end of the third.', 'That is common. We coach you on camera and write scripts that sound like you.', 'Yes. Strategy-only work is part of the Guided plan.', 'We work mostly with Instagram and short video, then adapt the system to wherever your audience is.', 'We are based in Lisbon and work with clients remotely or on location.', 'Yes. We take extra care with positioning and wording for regulated professions.'];
const faqQs = ['Do I need a big audience to start?', 'How soon will I see results?', 'I am not comfortable on camera. Is that okay?', 'Can I take just the strategy?', 'Which platform do you work on?', 'Where are you based?', 'I am a doctor, lawyer or therapist. Does this fit me?'];
const faq = (q, a, open) => `<div class="faq${open ? ' open' : ''}"><div class="faq-q" tabindex="0"><span>${q}</span><i>+</i></div><div class="faq-a"><div><p class="body">${a}</p></div></div></div>`;
const faqs = `<section class="sec bg-w"><div class="head">${eyebrow('06 — FAQ')}<h2>Questions you might ${acc('have.')}</h2></div><div class="faqs">${faqQs.map((q, i) => faq(q, faqA[i], i === 0)).join('')}<div class="faq-end"></div></div></section>`;

const cta = `<section class="sec bg-p cta-sec"><div class="cta">${eyebrow('07 — BOOK A CALL', 'on-dark')}<h2>20 minutes. No pitch.<br/>${acc('Just clarity.', 'w')}</h2><p class="lead cta-p">A relaxed conversation about how we could build your personal brand together.</p>${btnP('Book a free call →', 'btn-w')}</div></section>`;

const fcol = (h, a) => `<div class="fcol"><div class="fh">${h}</div>${a.map(t => `<div class="fl">${t}</div>`).join('')}</div>`;
const footer = `<footer><div class="ftop"><div class="fbrand"><div class="brand brand-w">Lumen &amp; Co.</div><p>A personal branding studio helping people get remembered.</p></div>${fcol('STUDIO', ['Work', 'Process', 'Plans', 'About', 'FAQ'])}${fcol('CONNECT', ['hello@example.com', 'Book a call', 'Instagram', 'YouTube', 'LinkedIn'])}</div><div class="fcopy">© 2026 Lumen &amp; Co. All rights reserved.</div></footer>`;

const header = `<header><div class="brand" tabindex="0">Lumen &amp; Co.</div><nav>${['Work', 'Process', 'Plans', 'About', 'FAQ'].map(t => `<span tabindex="0">${t}</span>`).join('')}</nav><div class="hright"><div class="btn btn-p btn-sm" tabindex="0">Book intro call →</div><svg class="burger" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="#12130F" stroke-width="2" stroke-linecap="round"/></svg></div></header>`;

const hov = (sel, body) => `@media(hover:hover){${sel}:hover{${body}}}${sel}.is-hover{${body}}`;
const css = `
:root{--color-paper:#F3F1EA;--color-card:#FAF9F5;--color-line:#DEDACE;--color-ink:#12130F;--color-muted:#55524A;--color-primary:#2D3FA6;--color-white:#FFFFFF;--font-display:"Bricolage Grotesque";--font-body:Inter;--font-accent:"Instrument Serif";--g:20px;--secpad:80px;--h1:71px;--h1lh:64px;--h2:40px;--h3:24px;--h3lh:30px}
@media(min-width:768px){:root{--g:32px;--secpad:112px;--h1:96px;--h1lh:86px;--h2:50px;--h3:28px;--h3lh:35px}}
@media(min-width:1024px){:root{--g:max(48px,calc((100vw - 1180px)/2));--h1:123px;--h1lh:111px;--h2:64px}}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--color-paper);font-family:var(--font-body);color:var(--color-ink);overflow-x:hidden}
p{font-size:17px;line-height:27px;color:var(--color-muted)}
.lead{font-size:18px;line-height:29.25px}.body{line-height:27.6px}
.acc{font-family:var(--font-accent);font-style:italic;font-weight:800;letter-spacing:-0.02em;color:var(--color-primary)}.acc.w{color:#fff}.acc.q{font-weight:400;letter-spacing:-0.01em}
h2{font-family:var(--font-display);font-weight:800;font-size:var(--h2);line-height:var(--h2);letter-spacing:-0.045em}
h2 .acc{font-size:1em}
h3{font-family:var(--font-display);font-weight:700;font-size:var(--h3);line-height:var(--h3lh);letter-spacing:-0.03em}
.eyebrow{display:flex;align-items:center;gap:10px;font-weight:600;font-size:12px;letter-spacing:.14em;color:var(--color-muted)}.eyebrow.on-dark{color:rgba(255,255,255,.85)}
.head{display:flex;flex-direction:column;gap:24px}
.btn{display:flex;align-items:center;justify-content:center;height:54px;padding:0 20px;border-radius:9999px;font-weight:600;font-size:15px;white-space:nowrap}@media(min-width:768px){.btn{padding:0 28px;font-size:16px}}
.btn-p{background:var(--color-primary);color:#fff}.btn-w{background:#fff;color:var(--color-primary)}.btn-s{border:1px solid var(--color-ink);color:var(--color-ink)}.btn-sm{display:none;height:36px;padding:0 20px;font-size:15px}@media(min-width:768px){.btn-sm{display:flex}}
.btnrow{display:flex;flex-wrap:wrap;gap:12px}
.sec{padding:var(--secpad) var(--g);display:flex;flex-direction:column;gap:48px}.bg-w{background:#fff}.bg-p{background:var(--color-paper)}
header{display:flex;align-items:center;justify-content:space-between;height:65px;padding:0 var(--g);background:rgba(243,241,234,.9);border-bottom:1px solid var(--color-line)}
.brand{font-family:var(--font-display);font-weight:800;font-size:18px;line-height:28px;letter-spacing:-0.03em}.brand-w{color:#fff}
nav{display:none;gap:40px}nav span{font-weight:500;font-size:15px;line-height:24px}
.menu{display:flex;flex-direction:column;padding:8px var(--g) 28px;background:var(--color-paper);border-bottom:1px solid var(--color-line)}.menu span{font-weight:600;font-size:19px;line-height:52px}.menu .btn-full{margin-top:14px;width:100%}.hright{display:flex;align-items:center;gap:16px}
@media(min-width:768px){header{height:73px}}
@media(min-width:1024px){nav{display:flex}.burger{display:none}}
.hero{display:flex;flex-direction:column;gap:36px;padding:40px var(--g) 48px;background:var(--color-paper);overflow:hidden}
.hero-copy{display:flex;flex-direction:column;gap:24px;align-items:flex-start}
.pill-live{display:flex;align-items:center;gap:10px;padding:9px 18px;border-radius:9999px;background:#EBE6D8;border:1px solid #DDD5C0;box-shadow:0 0 28px rgba(47,180,90,.16);font-weight:600;font-size:12px;letter-spacing:.08em}.pill-live i{width:9px;height:9px;border-radius:9999px;background:#2FB45A}
h1{font-family:var(--font-display);font-weight:800;font-size:var(--h1);line-height:var(--h1lh);letter-spacing:-0.075em}
.known{position:relative;display:inline-block;font-size:1em;line-height:1}.known svg{position:absolute;left:0;top:.96em;width:2.44em;height:.12em}
.hero-sub{font-size:18px;line-height:28px}
.reel{position:relative;display:flex;gap:10px;height:380px;overflow:hidden}
.rcol{flex:1;display:flex;flex-direction:column;gap:10px}.rcol:nth-child(1){margin-top:-70px}.rcol:nth-child(2){margin-top:-10px}.rcol:nth-child(3){margin-top:-120px}
.tile{display:flex;flex-direction:column;justify-content:space-between;height:170px;padding:12px;border-radius:16px;background:#D8D1C2}
.tile-t{font-family:var(--font-display);font-weight:700;font-size:17px;line-height:19px;letter-spacing:-0.02em;color:var(--color-muted)}
.tile-tag{align-self:flex-start;padding:3px 10px;border-radius:9999px;background:rgba(255,255,255,.55);font-weight:600;font-size:12px;line-height:16px;color:var(--color-muted)}
.fade{position:absolute;left:0;right:0;height:90px}.fade-t{top:0;background:linear-gradient(180deg,#F3F1EA 10%,rgba(243,241,234,0))}.fade-b{bottom:0;background:linear-gradient(0deg,#F3F1EA 10%,rgba(243,241,234,0))}
.fadeside{position:absolute;top:0;bottom:0;left:0;width:56px;background:linear-gradient(90deg,#F3F1EA 5%,rgba(243,241,234,0))}.reel-photo{position:absolute;left:50%;top:70px;width:54%;aspect-ratio:284/366;margin-left:-27%;display:flex;align-items:flex-end;border-radius:22px;border:5px solid #fff;overflow:hidden;background:#C9CFE8;transform:rotate(3deg);box-shadow:0 0 70px 10px rgba(45,63,166,.35),0 18px 40px rgba(18,19,15,.18)}.reel-photo svg{width:100%;height:100%}
.reel-known{position:absolute;left:50%;bottom:44px;margin-left:-28px;padding:6px 18px;border-radius:9999px;background:var(--color-primary);font-family:var(--font-accent);font-style:italic;font-size:22px;color:#fff;transform:rotate(-3deg)}
.reel-tip{position:absolute;left:50%;top:10px;margin-left:-60px;padding:8px 14px;border-radius:9999px;background:var(--color-ink);font-weight:600;font-size:13px;line-height:18px;color:#fff;white-space:nowrap}
@media(min-width:768px){.reel{height:340px}.tile{height:170px}.reel-photo{top:36px;width:34%;margin-left:-17%}.reel-known{bottom:22px}.hero-copy{max-width:640px}}
@media(min-width:1024px){.hero{flex-direction:row;align-items:center;justify-content:space-between;height:713px;padding:0 11px 0 var(--g)}.hero-copy{width:600px;gap:28px}.hero-sub{font-size:20px;line-height:31px;width:540px}.reel{width:515px;height:640px;flex-shrink:0;gap:13px}.rcol{gap:12px}.rcol:nth-child(1){margin-top:-120px}.rcol:nth-child(2){margin-top:-20px}.rcol:nth-child(3){margin-top:-200px}.tile{height:254px;padding:14px}.tile-t{font-size:20px;line-height:22px}.fade{height:120px}.reel-photo{top:190px;width:284px;margin-left:-142px}.reel-known{bottom:62px;font-size:26px;margin-left:-45px}}
.marquee{display:flex;flex-direction:column;gap:12px;padding:20px 0;height:112px;overflow:hidden;background:var(--color-ink)}
.mrow{display:flex;align-items:center;width:max-content;flex-shrink:0;margin-left:-20px}.mi{display:flex;align-items:center;gap:34px;padding-right:34px;flex-shrink:0;color:#fff}
.m-bold .mi span{font-family:var(--font-display);font-weight:800;font-size:22px;line-height:30px;letter-spacing:-0.02em}.m-ital .mi span{font-family:var(--font-accent);font-style:italic;font-size:26px;line-height:30px}
@media(min-width:1024px){.marquee{height:125px;padding:22px 0}}
.statement{gap:32px}.stack24{display:flex;flex-direction:column;gap:24px}.stack22{display:flex;flex-direction:column;gap:22px}
@media(min-width:1024px){.statement{flex-direction:row;justify-content:space-between;align-items:flex-start}.statement .head{width:560px}.statement .stack24{width:474px;padding-top:44px}}
.work{overflow:hidden}.vids{display:flex;gap:16px;margin-right:calc(var(--g) * -1)}
.vid{display:flex;flex-direction:column;gap:14px;width:291px;flex-shrink:0}.post{display:flex;flex-direction:column;gap:10px;padding:12px;border-radius:20px;background:#fff;border:1px solid var(--color-line)}.post-h{display:flex;align-items:center;gap:10px}.av{width:32px;height:32px;border-radius:9999px;background:#C9CFE8;flex-shrink:0}.post-n{display:flex;flex-direction:column;gap:5px;flex:1}.post-n b{display:block;height:8px;width:90px;border-radius:4px;background:#DEDACE}.post-n b.s{width:56px;height:6px;background:#EBE6D8}.post-b{padding:5px 12px;border-radius:6px;background:#4C5FE0;color:#fff;font-size:12px;font-weight:600}.post-f{display:flex;gap:10px;padding:2px 0 4px}.post-f span{width:18px;height:18px;border-radius:9999px;border:2px solid #C9C4B6}.vid-box{display:flex;align-items:center;justify-content:center;width:100%;height:430px;border-radius:12px}.vid-t{font-weight:600;font-size:15px;color:var(--color-primary)}
@media(min-width:1024px){.vids{margin-right:0;gap:24px}.vid{width:auto;flex:1}.vid-box{height:520px}}
.lists{display:flex;flex-direction:column}.list{display:flex;flex-direction:column;flex:1}
.li{display:flex;align-items:flex-start;gap:14px;padding:20px 0;border-top:1px solid var(--color-line)}.li svg{margin-top:6px;flex-shrink:0}.li p{line-height:23.4px;font-size:17px}.li b{font-weight:600;color:var(--color-ink)}
@media(min-width:768px){.lists{flex-direction:row;gap:48px}}
.steps{display:flex;flex-direction:column;gap:16px}
.step{display:flex;flex-direction:column;gap:14px;padding:32px 24px;min-height:250px;border-radius:20px;background:#fff;border:1px solid var(--color-line)}.step-n{font-weight:600;font-size:12px;letter-spacing:.14em;color:var(--color-primary)}
@media(min-width:768px){.steps{display:grid;grid-template-columns:1fr 1fr;gap:20px}.step{padding:32px;min-height:236px}.step:last-child{grid-column:span 2}}
@media(min-width:1024px){.steps{grid-template-columns:repeat(6,1fr)}.step{grid-column:span 2;min-height:283px}.step:nth-child(n+4){grid-column:span 3;min-height:228px}.step:last-child{grid-column:span 3}}
.plans{display:flex;flex-direction:column;gap:28px}
.plan{position:relative;display:flex;flex-direction:column;gap:20px;flex:1;min-height:503px;padding:32px 24px;border-radius:20px;background:var(--color-card);border:1px solid var(--color-line)}.plan h3{font-size:30px;line-height:36px}.plan-d{background:var(--color-primary);border-color:var(--color-primary)}.plan-d h3,.plan-d p{color:#fff}.plan-d .plan-tag,.plan-d .chk p{color:rgba(255,255,255,.9)}
.plan-tab{position:absolute;right:24px;top:-12px;padding:5px 14px;border-radius:9999px;background:#fff;border:1px solid var(--color-primary);font-weight:600;font-size:12px;letter-spacing:.1em;color:var(--color-primary)}
.chks{display:flex;flex-direction:column;gap:14px;padding:6px 0 10px;flex:1}.chk{display:flex;align-items:flex-start;gap:12px}.chk svg{flex-shrink:0}.chk p{line-height:23.4px;font-size:16px}
.plan .btn{margin-top:auto}
@media(min-width:768px){.plans{flex-direction:row;gap:20px}.plan{padding:40px 28px}}
@media(min-width:1024px){.plans{gap:28px}.plan{padding:40px}}
.band{display:flex;flex-direction:column;gap:28px;padding:80px var(--g);background:var(--color-primary)}.band h2{color:#fff}.band-pill{align-self:flex-start;padding:7px 16px;border-radius:9999px;border:1px solid rgba(255,255,255,.6);font-weight:600;font-size:13px;color:#fff}.band-p{font-size:18px;line-height:30px;color:rgba(255,255,255,.9)}
@media(min-width:768px){.band{padding:112px var(--g)}}
@media(min-width:1024px){.band{flex-direction:row;align-items:center;justify-content:space-between;padding:96px var(--g)}.band .stack22{width:420px}.band-p{width:490px;font-size:20px;line-height:32.5px}}
.about{gap:40px}.about-copy{display:flex;flex-direction:column;gap:24px;align-items:flex-start}
.quote{font-family:var(--font-accent);font-style:italic;font-size:34px;line-height:38px;letter-spacing:-0.01em}.quote .acc{font-size:1em}
.about-photo{display:flex;flex-direction:column;gap:12px}.photo{display:flex;align-items:flex-end;aspect-ratio:437/546;border-radius:20px;overflow:hidden;background:#C9CFE8}.photo svg{width:100%;height:100%}.cap{font-size:14px;line-height:20px}
@media(min-width:768px){.about{flex-direction:row;justify-content:space-between;align-items:flex-start}.about-copy{flex:1}.about-photo{width:260px;flex-shrink:0}.quote{font-size:38px;line-height:42px}}
@media(min-width:1024px){.about-copy{width:560px;flex:none}.about-photo{width:437px}.quote{font-size:52px;line-height:57.2px}}
.faqs{display:flex;flex-direction:column}.faq{display:flex;flex-direction:column;gap:0;padding:25px 0;border-top:1px solid var(--color-line)}.faq-q{display:flex;align-items:center;justify-content:space-between;gap:16px}.faq-q span{font-family:var(--font-display);font-weight:700;font-size:19px;line-height:25px;letter-spacing:-0.02em}.faq-q i{font-style:normal;font-size:26px;line-height:26px;color:var(--color-primary)}.faq-end{height:1px;background:var(--color-line)}
@media(min-width:768px){.faq-q span{font-size:22px;line-height:28px}}
.cta{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;min-height:520px;padding:64px 24px;border-radius:28px;background:var(--color-primary);text-align:center}.cta h2{color:#fff}.cta-p{color:rgba(255,255,255,.88);max-width:520px}
@media(min-width:768px){.cta{padding:96px 48px}}
@media(min-width:1024px){.cta{min-height:535px}}
footer{display:flex;flex-direction:column;gap:48px;padding:72px var(--g) 56px;background:var(--color-ink)}.ftop{display:grid;grid-template-columns:1fr;gap:32px}.fbrand{display:flex;flex-direction:column;gap:14px}.fbrand p{font-size:15px;line-height:22px;color:rgba(255,255,255,.7);max-width:260px}
.fcol{display:flex;flex-direction:column;gap:4px}.fh{margin-bottom:8px}.fh{font-weight:600;font-size:12px;letter-spacing:.14em;color:rgba(255,255,255,.6)}.fl{font-size:15px;line-height:24px;color:rgba(255,255,255,.88)}.fcopy{border-top:1px solid rgba(255,255,255,.18);padding-top:24px;font-size:14px;color:rgba(255,255,255,.6)}
@media(min-width:768px){footer{min-height:437px;justify-content:space-between}.ftop{grid-template-columns:1.4fr 1fr 1fr}.fbrand{grid-column:auto}}
@media(min-width:1024px){footer{padding:64px var(--g) 40px;min-height:437px;justify-content:space-between}.fcol{gap:13px}.ftop{grid-template-columns:464px 308px 308px;gap:0}}
@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes scribble{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes feed{from{transform:none}to{transform:translateY(-50%)}}
@keyframes marquee{from{transform:none}to{transform:translateX(-50%)}}
@keyframes float{0%,100%{transform:rotate(3deg) translateY(0)}50%{transform:rotate(2deg) translateY(-10px)}}
@keyframes glow{0%,100%{box-shadow:0 0 0 3px rgba(46,189,89,.2),0 0 8px 1px rgba(46,189,89,.4)}50%{box-shadow:0 0 0 6px rgba(46,189,89,.12),0 0 18px 5px rgba(46,189,89,.6)}}
.rise{animation:rise .8s cubic-bezier(.22,1,.36,1) both;animation-delay:calc(var(--d,0s) - var(--t,0s))}
.scribble{stroke-dasharray:1;stroke-dashoffset:0;animation:scribble .9s cubic-bezier(.65,0,.35,1) both;animation-delay:calc(.75s - var(--t,0s))}
.pill-live i{animation:glow 2.4s ease-in-out infinite;animation-delay:calc(0s - var(--t,0s))}
.rcol{padding-bottom:10px;animation:feed 34s linear infinite;animation-delay:calc(0s - var(--t,0s))}.rcol:nth-child(2){animation-duration:41s;animation-direction:reverse}.rcol:nth-child(3){animation-duration:48s}
@media(min-width:1024px){.rcol{padding-bottom:12px}}
.reel-photo{animation:float 7s ease-in-out infinite;animation-delay:calc(0s - var(--t,0s))}
.m-bold,.m-ital{animation:marquee 60s linear infinite;animation-delay:calc(0s - var(--t,0s))}.m-ital{animation-direction:reverse}
.reveal{opacity:0;transform:translateY(22px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1)}.reveal.in{opacity:1;transform:none}
.btn{transition:color .2s cubic-bezier(.4,0,.2,1),background-color .2s cubic-bezier(.4,0,.2,1),border-color .2s cubic-bezier(.4,0,.2,1),transform .2s cubic-bezier(.4,0,.2,1)}
.btn,.faq-q,.vid-t,nav span{cursor:pointer}nav span,.faq-q{transition:color .15s cubic-bezier(.4,0,.2,1)}
${hov('.btn-p', 'background:#222F85;transform:translateY(-2px)')}
${hov('.btn-w', 'background:#F3F1EA;transform:translateY(-2px)')}
${hov('.btn-s', 'color:var(--color-primary);border-color:var(--color-primary);transform:translateY(-2px)')}
${hov('nav span', 'color:var(--color-primary)')}
${hov('.faq-q', 'color:var(--color-primary)')}
${hov('.vid-t', 'text-decoration:underline')}
:focus-visible{outline:2px solid var(--color-ink);outline-offset:3px}.is-focus{box-shadow:0 0 0 3px var(--ringbg,#fff),0 0 0 5px var(--ring,var(--color-ink))}.brand:focus-visible{outline-color:var(--color-primary)}.st-blue .is-focus{--ringbg:var(--color-primary);--ring:#fff}.band :focus-visible,.cta :focus-visible,.plan-d :focus-visible{outline-color:#fff}
.faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s ease}.faq.open .faq-a{grid-template-rows:1fr}.faq-a>div{overflow:hidden}.faq-a p{padding-top:12px}.faq-q i{transition:transform .3s ease}.faq.open .faq-q i{transform:rotate(45deg)}
.freeze,.freeze *{animation-play-state:paused!important}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.rdup{display:none}.reveal{opacity:1!important;transform:none!important}}
`;

const script = `<script>(function(){var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;document.querySelectorAll('.faq-q').forEach(function(q){var t=function(){var f=q.parentElement;var open=!f.classList.contains('open');document.querySelectorAll('.faq.open').forEach(function(x){x.classList.remove('open')});if(open)f.classList.add('open')};q.addEventListener('click',t);q.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})});if(reduce||!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});document.querySelectorAll('.sec>*,.band>*,.about-copy,.about-photo').forEach(function(el){el.classList.add('reveal');io.observe(el)})})();</script>`;

const build = (hdr) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lumen &amp; Co. responsive</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:wght@100..900&family=Instrument+Serif:ital@0;1&display=swap"><style>${css}</style></head><body>${hdr}${hero}${marquee}${statement}${work}${deliv}${process}${plans}${band}${about}${faqs}${cta}${footer}${script}</body></html>`;
const menu = `<div class="menu">${['Work', 'Process', 'Plans', 'About', 'FAQ'].map(t => `<span>${t}</span>`).join('')}${btnP('Book intro call →', 'btn-full')}</div>`;
const headerOpen = header.replace('M4 7h16M4 12h16M4 17h16', 'M5 5l14 14M19 5L5 19') + menu;
writeFileSync('../responsive.html', build(header));
writeFileSync('../responsive-menu-open.html', build(headerOpen));
console.log('wrote responsive.html + responsive-menu-open.html');

// ---- states sheet: hover/focus/open + motion frozen at fixed times (captured to Figma with MOTION=on) ----
const heroCopy = hero.match(/<div class="hero-copy">.*?<\/div><\/div>(?=<div class="reel">)/s)[0];
const reelHtml = hero.match(/<div class="reel">.*<\/div>(?=<\/section>)/s)[0];
const frozen = (t, inner) => `<div class="freeze" style="--t:${t}s">${inner}</div>`;
const cell = (label, inner) => `<div class="st"><div class="st-l">${label}</div>${inner}</div>`;
const block = (title, body) => `<section class="st-sec"><h3 class="st-h">${title}</h3>${body}</section>`;
const row = (...cells) => `<div class="st-row">${cells.join('')}</div>`;
const btnT = 'Book intro call →';
const stCss = `.st-page{width:1280px;padding:48px;display:flex;flex-direction:column;gap:64px;background:#fff}.st-sec{display:flex;flex-direction:column;gap:24px}.st-h{font-family:var(--font-display);font-weight:800;font-size:32px;line-height:36px;letter-spacing:-0.03em}.st-row{display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start}.st-l{font-weight:600;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-muted);margin-bottom:12px}.st-blue{background:var(--color-primary);border-radius:20px;padding:24px}.st-blue .st-l{color:rgba(255,255,255,.85)}.st-box{background:var(--color-paper);border-radius:20px;padding:16px;overflow:hidden}.st-box .hero-copy{width:552px}.st-faq{width:560px}.st-note{font-size:14px;line-height:20px;color:var(--color-muted);max-width:640px}`;
const states = `<div class="st-page">
${block('Buttons: default, hover, focus', row(
  cell('Primary', btnP(btnT)), cell('Primary hover', btnP(btnT, 'is-hover')), cell('Primary focus', btnP(btnT, 'is-focus')),
  cell('Secondary', btnS('See the work')), cell('Secondary hover', btnS('See the work', 'is-hover')), cell('Secondary focus', btnS('See the work', 'is-focus'))))}
${block('Buttons on blue', `<div class="st-blue">${row(
  cell('White', btnP('Book a free call →', 'btn-w')), cell('White hover', btnP('Book a free call →', 'btn-w is-hover')), cell('White focus', btnP('Book a free call →', 'btn-w is-focus')))}</div>`)}
${block('Nav, links, FAQ rows', `${row(
  cell('Nav link', `<nav style="display:flex"><span tabindex="0">Work</span></nav>`), cell('Nav hover', `<nav style="display:flex"><span class="is-hover" tabindex="0">Work</span></nav>`), cell('Nav focus', `<nav style="display:flex"><span class="is-focus" tabindex="0">Work</span></nav>`),
  cell('Watch link', `<div class="vid-t" tabindex="0">Watch clip 01 →</div>`), cell('Watch hover', `<div class="vid-t is-hover" tabindex="0">Watch clip 01 →</div>`), cell('Watch focus', `<div class="vid-t is-focus" tabindex="0">Watch clip 01 →</div>`))}
${row(
  cell('FAQ closed', `<div class="faqs st-faq">${faq(faqQs[1], faqA[1], false)}</div>`),
  cell('FAQ hover', `<div class="faqs st-faq">${faq(faqQs[1], faqA[1], false).replace('class="faq-q"', 'class="faq-q is-hover"')}</div>`),
  cell('FAQ open', `<div class="faqs st-faq">${faq(faqQs[0], faqA[0], true)}</div>`))}
<p class="st-note">Cards (steps, plans, post cards) have no hover change on the reference; they stay static.</p>`)}
${block('Hero entrance: t = 0.15 s, 0.45 s, 0.9 s, 1.5 s', row(
  ...[0.15, 0.45, 0.9, 1.5].map(t => cell(`t = ${t} s`, `<div class="st-box">${frozen(t, heroCopy)}</div>`))))}
${block('Hero reel and floating card: t = 0 s, 8 s, 17 s, 26 s', row(
  ...[0, 8, 17, 26].map(t => cell(`t = ${t} s`, `<div class="st-box">${frozen(t, reelHtml)}</div>`))))}
${block('Marquee: t = 0 s, 20 s, 40 s', row(...[0, 20, 40].map(t => `<div style="width:1184px">${cell(`t = ${t} s`, frozen(t, marquee))}</div>`)))}
${block('Scroll reveal: before and after entering the viewport', row(
  cell('Before (opacity 0.35, 22 px down)', `<div style="width:560px;opacity:.35;transform:translateY(22px)">${head('01 — WORK', `Recent ${acc('work.')}`)}</div>`),
  cell('After', `<div style="width:560px">${head('01 — WORK', `Recent ${acc('work.')}`)}</div>`)))}
</div>`;
const statesHtml = build('').replace('</style>', stCss + '</style>').replace(/<body>.*<\/body>/s, '<body>' + states + '</body>');
writeFileSync('../states.html', statesHtml);
console.log('wrote states.html');
