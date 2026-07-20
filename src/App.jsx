import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VideoLanding } from './components/ui/VideoLanding';
import { RSVPForm } from './components/ui/RSVPForm';
import { AudioController } from './components/ui/AudioController';
import { Heart, MapPin, Clock, Calendar, BookOpen, Shirt, ChevronDown, ChevronUp } from 'lucide-react';
import { audioEngine } from './utils/audioEngine';
import eventData from './event_data.json';

gsap.registerPlugin(ScrollTrigger);

// Custom Timeline Vine component matching Screenshot 1
const TimelineVine = () => (
  <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 pointer-events-none z-0">
    <svg className="w-full h-full" viewBox="0 0 40 500" preserveAspectRatio="none" fill="none">
      <path
        d="M 20 0 Q 30 100, 10 200 T 20 400 T 20 500"
        stroke="#6E846E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Sprouting green leaves */}
      <path d="M 20 40 Q 32 30, 30 20 Q 20 30, 20 40" fill="#7D987D" />
      <path d="M 20 90 Q 8 80, 10 70 Q 20 80, 20 90" fill="#7D987D" />
      <path d="M 20 150 Q 32 140, 30 130 Q 20 140, 20 150" fill="#7D987D" />
      <path d="M 20 220 Q 8 210, 10 200 Q 20 210, 20 220" fill="#7D987D" />
      <path d="M 20 290 Q 32 280, 30 270 Q 20 280, 20 290" fill="#7D987D" />
      <path d="M 20 370 Q 8 360, 10 350 Q 20 360, 20 370" fill="#7D987D" />
      <path d="M 20 440 Q 32 430, 30 420 Q 20 430, 20 440" fill="#7D987D" />
    </svg>
  </div>
);

// Ribbon boundary component for the Menu Frame matching Screenshot 4
const MenuFrame = ({ children }) => (
  <div className="relative py-14 px-8 my-6 bg-transparent flex flex-col justify-center items-center min-h-[300px]">
    {/* Frame Image overlay */}
    <img
      src="/fraem.png"
      alt="Menu Frame"
      className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
    />
    {/* Menu content */}
    <div className="relative z-10 w-full text-center px-6 py-8">
      {children}
    </div>
  </div>
);

// Islamic Crescent and Star Divider
const CrescentDivider = () => (
  <div className="flex justify-center items-center gap-4 text-[#9B734B] py-2 select-none pointer-events-none">
    <div className="w-16 h-[1px] bg-[#CBB494]/30" />
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3a9 9 0 1 0 9 9 9.005 9.005 0 0 1-9-9Z" />
      <polygon points="17,6 18,8 20,8.5 18.5,10 19,12 17,11 15,12 15.5,10 14,8.5 16,8" />
    </svg>
    <div className="w-16 h-[1px] bg-[#CBB494]/30" />
  </div>
);

// Islamic Geometric Eight-pointed Star Divider
const IslamicStarDivider = () => (
  <div className="flex justify-center items-center gap-4 text-[#9B734B] py-2 select-none pointer-events-none">
    <div className="w-20 h-[1px] bg-[#CBB494]/30" />
    <svg className="w-6 h-6 rotate-45" viewBox="0 0 24 24" fill="currentColor">
      <rect x="5" y="5" width="14" height="14" rx="0.5" />
      <rect x="5" y="5" width="14" height="14" rx="0.5" className="rotate-45 origin-center" />
      <circle cx="12" cy="12" r="3" fill="#F8F5F2" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
    <div className="w-20 h-[1px] bg-[#CBB494]/30" />
  </div>
);

export default function App() {
  const [entered, setEntered] = useState(true);
  const [sealOpened, setSealOpened] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeFaq, setActiveFaq] = useState(null);

  // Load configuration from event_data.json
  const data = eventData.block_content;
  const timelineDays = data.timelineDays || [];
  const dressCodeDays = data.dressCodeDays || [];
  const menuCategories = data.menu?.categories || [];
  const faqs = data.faq || [];
  const venueDays = data.venueDays || [];

  // Countdown timer using date in JSON
  useEffect(() => {
    const weddingDate = new Date(`${eventData.event_date}T16:00:00`).getTime();
    const updateCountdown = () => {
      const now = Date.now();
      const diff = weddingDate - now;
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll setup with Lenis
  useEffect(() => {
    if (!entered || !sealOpened) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      document.body.style.overflow = 'auto';
    };
  }, [entered, sealOpened]);

  const handleSealOpened = () => {
    audioEngine.start();
    setSealOpened(true);
    document.body.style.overflow = 'auto';
  };

  const getTimelineIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('lunch') || t.includes('dinner') || t.includes('food')) {
      return 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/icons/98032531-8029-42fd-8ba2-3f50d3ab7f3a/icon-dinner.png';
    }
    if (t.includes('ceremony') || t.includes('wedding') || t.includes('nikah')) {
      return 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/icons/98032531-8029-42fd-8ba2-3f50d3ab7f3a/icon-ceremony.png';
    }
    return 'https://kdcyugwruypwrmtllswt.supabase.co/storage/v1/object/public/invitation-assets/icons/98032531-8029-42fd-8ba2-3f50d3ab7f3a/icon-party.png';
  };

  return (
    <div
      id="main-scroll-container"
      className="relative w-full max-w-[56.25vh] min-h-screen mx-auto bg-[#F8F5F2] text-[#3E251C] font-sans selection:bg-[#EADAC5] selection:text-[#3E251C] shadow-2xl border-x border-[#CBB494]/40"
    >
      {/* Video Landing */}
      {!sealOpened && <VideoLanding onOpenComplete={handleSealOpened} />}

      <AudioController />
      <RSVPForm isOpen={showRSVPModal} onClose={() => setShowRSVPModal(false)} />

      {sealOpened && (
        <div className="w-full flex flex-col">

          {/* ===== 1st VIDEO HERO WITH SUBTLE TEXT SHADOW OVERLAY ===== */}
          <div className="w-full h-screen relative overflow-hidden bg-[#EDE3D4] z-10">
            <video
              src="/shining-light-theme-HpLqBRD3.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle soft golden-amber overlay gradient for high readability */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0C0805]/45">
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wider uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                Doha Salah
              </h2>
              <span className="font-script text-2xl md:text-3xl text-amber-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] my-2">
                &
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wider uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                Mahtan Mohammed
              </h2>
              <span className="font-script text-2xl md:text-3xl text-amber-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mt-4">
                we are getting married
              </span>
            </div>
          </div>

          {/* ===== QURAN VERSE (Replaces Couple Image Screen - Optimized for Mobile spacing) ===== */}
          <div className="w-full py-16 px-8 bg-[#F8F5F2] text-[#3E251C] text-center z-10 border-b border-[#CBB494]/20 flex items-center justify-center">
            <div className="max-w-md mx-auto space-y-6">
              <div className="font-serif text-lg tracking-[0.25em] text-[#9B734B] uppercase">Bismillah</div>
              
              <div className="font-arabic text-2xl md:text-3xl leading-loose font-medium select-none text-[#3E251C]">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
              </div>

              <div className="h-[1.5px] w-24 bg-[#CBB494] mx-auto" />

              <p className="text-sm md:text-base leading-relaxed font-serif italic text-[#3E251C]/90 px-4">
                "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
              </p>

              <div className="text-[10px] tracking-widest uppercase font-bold text-[#9B734B]">
                — Surah Ar-Rum, 30:21
              </div>
            </div>
          </div>

          {/* ===== SECTIONS CONTAINER WITH LIGHT SAND STYLE ===== */}
          <div className="w-full px-6 py-12 flex flex-col gap-12 bg-[#F8F5F2] relative z-10">

            {/* ===== COUNTDOWN SECTION ===== */}
            <div
              className="text-center relative py-10 px-6 rounded-3xl bg-cover bg-center overflow-hidden border border-[#CBB494]"
              style={{ backgroundImage: "url('/embroidery-beige-bg-DRgV_0KT.png')" }}
            >
              <div className="absolute inset-0 bg-[#F8F5F2]/45 pointer-events-none" />
              <div className="relative z-10">
                <div className="mb-2 text-[#9B734B] font-serif text-sm">✦ ✦ ✦</div>
                <h2 className="font-serif italic text-2xl tracking-widest text-[#3E251C] uppercase">Countdown</h2>
                <p className="text-xs italic text-[#3E251C]/80 mt-1 mb-6">{data.countdown?.message}</p>
                
                <div className="flex justify-center gap-3">
                  {[
                    { label: 'DAYS', val: countdown.days },
                    { label: 'HOURS', val: countdown.hours },
                    { label: 'MINUTES', val: countdown.minutes },
                    { label: 'SECONDS', val: countdown.seconds }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-[62px] h-[62px] rounded-2xl flex items-center justify-center bg-[#F1EADF] border border-[#CBB494] shadow-inner">
                        <span className="font-serif text-xl font-bold text-[#3E251C]">
                          {String(item.val).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-[9px] mt-2 uppercase tracking-widest font-semibold text-[#3E251C]/70">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Star Divider to fill space */}
            <IslamicStarDivider />

            {/* ===== SCHEDULE SECTION ===== */}
            <div className="w-full">
              <div className="text-center mb-8">
                <div className="w-10 h-10 mx-auto mb-2 text-[#3E251C]/85 flex items-center justify-center">
                  <Clock className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h2 className="font-serif italic text-3xl tracking-widest text-[#3E251C] uppercase">Schedule</h2>
                <p className="text-xs italic text-[#3E251C]/70 mt-1">What we have planned for you</p>
              </div>

              {/* Timeline Container (Day 1 Only) */}
              {timelineDays[0] && (
                <div className="relative py-4">
                  <TimelineVine />
                  <div className="space-y-10">
                    {timelineDays[0].items.map((item, idx) => {
                      const isLeft = idx % 2 === 1;
                      return (
                        <div key={idx} className={`relative flex items-center justify-between min-h-[90px] w-full ${isLeft ? 'flex-row-reverse' : ''}`}>
                          {/* Text Block */}
                          <div className={`w-[42%] text-[#3E251C] ${isLeft ? 'text-left pl-2' : 'text-right pr-2'}`}>
                            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#3E251C]">{item.title}</h3>
                            <p className="text-[11px] font-semibold text-[#3E251C]/70 mt-0.5">{item.time}</p>
                          </div>
                          
                          {/* Center Node Spacer */}
                          <div className="w-[16%] flex justify-center z-10" />

                          {/* Watercolor Icon Block */}
                          <div className={`w-[42%] flex ${isLeft ? 'justify-end pr-3' : 'justify-start pl-3'}`}>
                            <img
                              src={getTimelineIcon(item.title)}
                              alt={item.title}
                              className="w-10 h-10 object-contain hover:scale-105 transition-transform"
                              onError={(e) => { e.target.style.display = 'none' }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Crescent Divider to fill space */}
            <CrescentDivider />

            {/* ===== VENUES SECTION (DAY 1 ONLY & PREVIOUS LOCATION) ===== */}
            <div className="w-full">
              <div className="text-center mb-8">
                <div className="w-10 h-10 mx-auto mb-2 text-[#3E251C]/85 flex items-center justify-center">
                  <MapPin className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h2 className="font-serif italic text-3xl tracking-widest text-[#3E251C] uppercase">Venues</h2>
              </div>

              <div className="bg-white border border-[#CBB494]/50 rounded-3xl p-5 shadow-sm overflow-hidden flex flex-col">
                {/* Day 1 Image */}
                {venueDays[0] && (
                  <img
                    src={venueDays[0].imageUrl}
                    alt="Resham Event Centre"
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}

                {/* Google Maps Embed iframe with Fremont, CA */}
                <div className="w-full h-36 rounded-2xl overflow-hidden border border-[#CBB494]/40 mb-4">
                  <iframe
                    src="https://maps.google.com/maps?q=Resham+Event+Center+Fremont+CA&output=embed"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    title="Resham Event Centre Map"
                    style={{ border: 0 }}
                  />
                </div>

                {/* Venue details matching previous code */}
                <div className="text-center px-2 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#EDE3D4] flex items-center justify-center text-[#3E251C] mb-2 border border-[#CBB494]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif italic text-base font-bold uppercase tracking-widest text-[#3E251C]">
                    Resham Event Centre
                  </h3>
                  <p className="text-xs text-[#3E251C]/80 leading-relaxed mt-2 max-w-xs">
                    Fremont, California, USA
                  </p>

                  <a
                    href="https://maps.app.goo.gl/a9uBZg4u3rnDupwAA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#EDE3D4] hover:bg-[#F1EADF] border border-[#CBB494] text-[#3E251C] font-serif text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm transition-all"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    <span>Get directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Star Divider to fill space */}
            <IslamicStarDivider />

            {/* ===== SECOND QURANIC VERSE IN BETWEEN ===== */}
            <div className="text-center py-8 my-2 border-y border-[#CBB494]/45">
              <div className="max-w-sm mx-auto space-y-3">
                <div className="font-arabic text-xl md:text-2xl text-[#3E251C] leading-relaxed">
                  وَخَلَقْنَاكُمْ أَزْوَاجًا
                </div>
                <p className="text-xs md:text-sm font-serif italic text-[#3E251C]/85 px-6">
                  "And We created you in pairs."
                </p>
                <div className="text-[9px] tracking-widest uppercase font-bold text-[#9B734B]">
                  — Surah An-Naba, 78:8
                </div>
              </div>
            </div>

            {/* ===== DRESS CODE SECTION ===== */}
            <div className="w-full">
              <div className="text-center mb-8">
                <div className="w-10 h-10 mx-auto mb-2 text-[#3E251C]/85 flex items-center justify-center">
                  <Shirt className="w-6 h-6 stroke-[1.2]" />
                </div>
                <h2 className="font-serif italic text-3xl tracking-widest text-[#3E251C] uppercase">Dress Code</h2>
              </div>

              {dressCodeDays[0] && (
                <div className="bg-[#FAF8F5] border border-[#CBB494]/60 rounded-3xl p-6 text-center shadow-sm">
                  <img
                    src={dressCodeDays[0].imageUrl}
                    alt="Suggested Attire Sketch"
                    className="w-full max-w-[260px] mx-auto rounded-xl object-contain mb-4"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-[#3E251C] mb-4">
                    {dressCodeDays[0].code}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#CBB494]/40">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#3E251C]/50 mb-1">Women</p>
                      <p className="text-xs font-semibold text-[#3E251C]">{dressCodeDays[0].codeWomen}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#3E251C]/50 mb-1">Men</p>
                      <p className="text-xs font-semibold text-[#3E251C]">{dressCodeDays[0].codeMen}</p>
                    </div>
                  </div>

                  {dressCodeDays[0].colors && (
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-wider text-[#3E251C]/50 mb-2.5">Suggested colors:</p>
                      <div className="flex justify-center gap-3">
                        {dressCodeDays[0].colors.map((color, cIdx) => (
                          <div
                            key={cIdx}
                            className="w-7 h-7 rounded-full border border-[#CBB494]/50 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ===== OUR STORY SECTION ===== */}
            <div className="w-full text-center">
              <div className="w-10 h-10 mx-auto mb-2 text-[#3E251C]/85 flex items-center justify-center">
                <BookOpen className="w-6 h-6 stroke-[1.2]" />
              </div>
              <h2 className="font-serif italic text-3xl tracking-widest text-[#3E251C] uppercase">Our Story</h2>
              <p className="text-xs leading-relaxed font-serif text-[#3E251C]/80 mt-6 max-w-sm mx-auto font-medium">
                {data.ourStory?.description}
              </p>
              <div className="mt-8 flex justify-center items-center gap-4 text-[#CBB494]">
                <div className="w-16 h-[1px] bg-current" />
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                <div className="w-16 h-[1px] bg-current" />
              </div>
            </div>

            {/* ===== MENU SECTION ===== */}
            <div className="w-full">
              <MenuFrame>
                <h2 className="font-serif italic text-2xl tracking-widest text-[#3E251C] uppercase mb-8">Menu</h2>
                <div className="space-y-6">
                  {menuCategories.map((cat, catIdx) => (
                    <div key={catIdx} className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#5C3D2E]">
                        — {cat.title} —
                      </p>
                      {cat.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="px-2">
                          <h4 className="font-serif text-sm font-semibold text-[#3E251C]">{item.name}</h4>
                          <p className="text-[11px] italic text-[#3E251C]/75 mt-0.5 max-w-xs mx-auto leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </MenuFrame>
            </div>

            {/* Crescent Divider to fill space */}
            <CrescentDivider />

            {/* ===== HADITH IN BETWEEN ===== */}
            <div className="text-center py-8 my-2 border-y border-[#CBB494]/45">
              <div className="max-w-sm mx-auto space-y-3">
                <div className="w-8 h-8 rounded-full bg-[#EDE3D4] flex items-center justify-center text-[#3E251C] mx-auto border border-[#CBB494]">
                  <Heart className="w-4 h-4 fill-current text-[#3E251C]" />
                </div>
                <p className="text-xs md:text-sm font-serif italic text-[#3E251C]/90 px-6 leading-relaxed">
                  "When a man marries, he has fulfilled half of his religion; so let him fear Allah regarding the remaining half."
                </p>
                <div className="text-[9px] tracking-widest uppercase font-bold text-[#9B734B]">
                  — Prophet Mohammed (ﷺ) [Al-Tirmidhi]
                </div>
              </div>
            </div>

            {/* ===== FAQ SECTION ===== */}
            <div className="w-full">
              <div className="text-center mb-8">
                <h2 className="font-serif italic text-3xl tracking-widest text-[#3E251C] uppercase">FAQ</h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white border border-[#CBB494]/50 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                      className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs text-[#3E251C]"
                    >
                      <span>{faq.question}</span>
                      {activeFaq === fIdx ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                    </button>
                    {activeFaq === fIdx && (
                      <div className="p-4 pt-0 border-t border-[#EDE3D4] text-[11px] text-[#3E251C]/80 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ===== RSVP CTA BOTTOM SECTION ===== */}
            <div className="text-center py-6 border-t border-[#CBB494]/40 mt-6">
              <span className="text-[10px] uppercase tracking-widest text-[#3E251C]/50 block mb-2">Scroll to RSVP</span>
              <div className="w-5 h-8 border-2 border-[#3E251C]/30 rounded-full mx-auto flex items-start justify-center p-1 mb-6">
                <div className="w-1.5 h-2 bg-[#3E251C]/60 rounded-full animate-bounce" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#3E251C]/50">You're invited to</p>
              <h3 className="font-serif italic text-2xl font-bold text-[#3E251C] mt-3 mb-6">Doha & Mahtan</h3>
              <button
                onClick={() => setShowRSVPModal(true)}
                className="px-10 py-3.5 bg-[#5C3D2E] hover:bg-[#3E251C] text-white font-serif text-xs font-bold tracking-widest uppercase rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                RSVP Now
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}