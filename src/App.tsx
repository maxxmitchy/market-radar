import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Clock3, HeartPulse, Instagram, Menu, Package, ShieldCheck, ShoppingBag, Sparkles, Star, Stethoscope, Truck, Users, X, Zap } from "lucide-react";

const programs = [
  { days: 7, label: "TRY IT", price: "₦4,500", note: "Low commitment", featured: false },
  { days: 14, label: "MOST POPULAR", price: "₦8,000", note: "The introductory program", featured: true },
  { days: 30, label: "BEST VALUE", price: "₦15,000", note: "Built for the full month", featured: false },
];

const dailyPack = [
  { name: "Daily Essentials", detail: "Pharmacist-curated baseline support", icon: HeartPulse },
  { name: "Study Support", detail: "Evidence-led nutritional support", icon: Zap },
  { name: "Simple Routine", detail: "One clearly labelled daily pack", icon: Clock3 },
];

export default function App() {
  const [days, setDays] = useState(14);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111827]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-white"><PlusMark /></div>
            <div className="leading-none"><div className="text-sm font-black tracking-[.18em]">CAREFLUX</div><div className="text-[10px] font-bold tracking-[.25em] text-indigo-600">STUDENT</div></div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#how" className="hover:text-indigo-600">How it works</a>
            <a href="#programs" className="hover:text-indigo-600">Programs</a>
            <a href="#evidence" className="hover:text-indigo-600">Why Careflux</a>
            <a href="#campus" className="hover:text-indigo-600">Campus</a>
          </nav>
          <button onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })} className="hidden rounded-full bg-[#111827] px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 sm:block">Get your days</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl p-2 md:hidden" aria-label="Menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="border-t border-black/5 px-5 py-4 md:hidden"><div className="grid gap-3 text-sm font-semibold"><a href="#how" onClick={() => setMenuOpen(false)}>How it works</a><a href="#programs" onClick={() => setMenuOpen(false)}>Programs</a><a href="#evidence" onClick={() => setMenuOpen(false)}>Why Careflux</a><a href="#campus" onClick={() => setMenuOpen(false)}>Campus</a></div></nav>}
      </header>

      <main id="top">
        <section className="overflow-hidden px-5 pb-16 pt-12 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700"><Sparkles size={14} /> BUILT FOR NIGERIAN STUDENTS</div>
              <h1 className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.04em] sm:text-6xl lg:text-7xl">You don't need four bottles.<br /><span className="text-indigo-600">Buy the days you need.</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Pharmacist-curated daily wellness packs designed around the reality of university life: tight budgets, busy schedules and no room for complicated routines.</p>
              <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-3.5 font-bold text-white shadow-lg shadow-slate-900/10 hover:bg-indigo-700">Choose your days <ArrowRight size={18} /></button><button onClick={() => setShowDetails(true)} className="rounded-full border border-slate-300 bg-white px-6 py-3.5 font-bold hover:border-slate-400">See what's inside</button></div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500"><span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-600" /> Pharmacist-led</span><span className="inline-flex items-center gap-2"><Package size={17} className="text-indigo-600" /> Clearly labelled daily packs</span><span className="inline-flex items-center gap-2"><HeartPulse size={17} className="text-rose-500" /> Evidence first</span></div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-indigo-100 blur-2xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">
                <div className="rounded-[1.5rem] bg-[#111827] p-6 text-white"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-300">Your next</p><h2 className="mt-1 text-3xl font-black">14 days</h2></div><div className="rounded-2xl bg-white/10 p-3"><Package size={28} /></div></div><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/10 p-4"><div className="text-xs text-white/60">Daily format</div><div className="mt-1 font-bold">1 labelled pack</div></div><div className="rounded-2xl bg-white/10 p-4"><div className="text-xs text-white/60">Routine</div><div className="mt-1 font-bold">OPEN → TAKE → CONTINUE</div></div></div></div>
                <div className="grid gap-3 p-2 pt-5">{dailyPack.map(({ name, detail, icon: Icon }, i) => <div key={name} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white shadow-sm"><Icon size={20} className="text-indigo-600" /></div><div className="min-w-0"><div className="font-bold">{name}</div><div className="text-sm text-slate-500">{detail}</div></div><div className="ml-auto text-xs font-bold text-slate-300">DAY {String(i + 1).padStart(2, "0")}</div></div>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="border-y border-black/5 bg-white px-5 py-16 lg:px-8"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">The core experience</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Simple enough for the busiest student.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[["01","Choose your days","Start with 7, 14 or 30 days. No need to commit to several full bottles."],["02","Receive your packs","Your order arrives as clearly identified daily packs, prepared through a pharmacist-led process."],["03","Take one day at a time","No juggling bottles. Find your day, follow the approved instructions and continue."]].map(([num,title,copy]) => <div key={num} className="rounded-3xl border border-slate-200 p-7"><div className="text-sm font-black text-indigo-600">{num}</div><h3 className="mt-8 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-500">{copy}</p></div>)}</div></div></section>

        <section id="programs" className="px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">Pick your commitment</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Buy days, not bottles.</h2></div><p className="max-w-md text-sm leading-6 text-slate-500">Start small. Learn the experience. Come back when it works for you.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{programs.map((program) => <button key={program.days} onClick={() => setDays(program.days)} className={`relative text-left rounded-[2rem] border p-7 transition hover:-translate-y-1 hover:shadow-xl ${days === program.days ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100" : "border-slate-200 bg-white"}`}>{program.featured && <span className="absolute -top-3 left-7 rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-black tracking-wider text-white">MOST POPULAR</span>}<div className="flex items-start justify-between"><div><div className="text-5xl font-black tracking-tight">{program.days}<span className="ml-1 text-lg text-slate-400">days</span></div><p className="mt-2 text-sm font-semibold text-slate-500">{program.note}</p></div>{days === program.days ? <div className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 text-white"><Check size={17} /></div> : <ChevronDown className="text-slate-300" />}</div><div className="mt-10 border-t border-slate-200/80 pt-5"><div className="text-2xl font-black">{program.price}</div><div className="mt-1 text-xs font-semibold text-slate-400">Illustrative launch price — final pricing follows product and regulatory validation.</div></div></button>)}</div><div className="mt-7 rounded-3xl bg-[#111827] p-6 text-white sm:flex sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-300">Selected</p><p className="mt-1 text-xl font-black">Your {days}-day Careflux Student program</p></div><button onClick={() => setShowDetails(true)} className="mt-4 rounded-full bg-white px-5 py-3 text-sm font-black text-[#111827] sm:mt-0">Review pack <ArrowRight size={16} className="ml-1 inline" /></button></div></div></section>

        <section id="evidence" className="bg-[#eef2ff] px-5 py-16 lg:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">Not a brain pill</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Evidence first.<br />Marketing second.</h2><p className="mt-5 max-w-xl leading-7 text-slate-600">Careflux Student will not promise to make you smarter, cure stress or replace sleep, food or medical care. Every formulation is intended to go through structured review before commercial launch.</p><button onClick={() => setShowDetails(true)} className="mt-7 inline-flex items-center gap-2 font-bold text-indigo-700">What does pharmacist-curated mean? <ArrowRight size={17} /></button></div><div className="grid gap-3 sm:grid-cols-2">{["Evidence","Dose","Safety & interactions","Contraindications","Duplication","Student suitability","Product quality","Regulatory requirements"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white p-4 font-bold"><div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600"><Check size={16} /></div>{item}</div>)}</div></div></section>

        <section id="campus" className="px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto max-w-7xl rounded-[2rem] bg-[#111827] p-8 text-white sm:p-12"><div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-300">Careflux Student Campus</p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Your campus. Your people. Your health.</h2><p className="mt-5 max-w-2xl leading-7 text-slate-300">Student representatives will help us understand what students actually need, create useful campus content and make Careflux easier to access.</p><div className="mt-7 flex flex-wrap gap-3 text-sm font-bold"><span className="rounded-full bg-white/10 px-4 py-2">UNILAG</span><span className="rounded-full bg-white/10 px-4 py-2">LASU</span><span className="rounded-full bg-white/10 px-4 py-2">OAU</span><span className="rounded-full bg-white/10 px-4 py-2">UNIBEN</span><span className="rounded-full bg-white/10 px-4 py-2">UI</span><span className="rounded-full bg-white/10 px-4 py-2">UNN</span></div></div><div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"><CampusStat icon={Users} label="Student reps" /><CampusStat icon={Truck} label="Campus delivery" /><CampusStat icon={Stethoscope} label="Pharmacist education" /></div></div></div></section>

        <section className="border-t border-black/5 bg-white px-5 py-14 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 md:grid-cols-3"><div><div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#111827] text-white"><PlusMark /></div><span className="font-black tracking-[.15em]">CAREFLUX STUDENT</span></div><p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">Affordable, convenient, pharmacist-curated daily wellness for Nigerian university students.</p></div><div><h3 className="font-black">The promise</h3><p className="mt-3 text-sm leading-6 text-slate-500">Clinical integrity. Regulatory compliance. Product quality. Honest marketing. Affordability.</p></div><div><h3 className="font-black">One sentence</h3><p className="mt-3 text-sm leading-6 text-slate-500">Your health. Your campus. Your day.</p></div></div><div className="mt-12 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Careflux Student</span><span>Product formulations and final launch model subject to applicable Nigerian regulatory review.</span></div></div></section>
      </main>

      {showDetails && <DetailsModal onClose={() => setShowDetails(false)} />}
    </div>
  );
}

function CampusStat({ icon: Icon, label }: { icon: typeof Users; label: string }) { return <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"><Icon size={20} className="text-indigo-300" /><span className="text-sm font-bold">{label}</span></div>; }
function PlusMark() { return <span className="text-xl font-black">+</span>; }
function DetailsModal({ onClose }: { onClose: () => void }) { return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-5 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">Inside Careflux Student</p><h2 className="mt-2 text-2xl font-black">Designed around one daily moment.</h2></div><button onClick={onClose} className="rounded-xl p-2 hover:bg-slate-100" aria-label="Close"><X size={20} /></button></div><div className="mt-6 grid gap-3">{["Every daily pack is clearly identified and traceable.","Instructions, warnings, storage, batch/lot and expiry information will follow the applicable framework.","Formulations are reviewed for evidence, dose, safety, interactions and student suitability.","No ingredient enters simply because it sells.","The goal is convenience without compromising professional standards."].map((text) => <div key={text} className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600"><Check size={18} className="mt-1 shrink-0 text-emerald-600" />{text}</div>)}</div><button onClick={onClose} className="mt-7 w-full rounded-full bg-[#111827] py-3.5 font-bold text-white">Got it</button></div></div>; }
