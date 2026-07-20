import React, { useState } from 'react';
import { Heart, Send, Sparkles, X, User, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export function RSVPForm({ isOpen, onClose }) {
  const [step, setStep] = useState('decision'); // 'decision', 'form', 'thank-yes', 'thank-no'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSelectYes = () => {
    setStep('form');
  };

  const handleSelectNo = () => {
    setStep('thank-no');
    // Save to sessionStorage to prevent showing it again
    sessionStorage.setItem('rsvp_dismissed', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    setStep('thank-yes');
    sessionStorage.setItem('rsvp_dismissed', 'true');

    // Premium confetti trigger
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#E8C39E', '#22000A', '#FDF7F5']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#E8C39E', '#22000A', '#FDF7F5']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleClose = () => {
    sessionStorage.setItem('rsvp_dismissed', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F180E]/80 backdrop-blur-sm transition-opacity duration-700">
      
      {/* Modal Card container */}
      <div className="relative w-full max-w-[400px] bezel-shell animate-fade-in max-h-[90vh] overflow-hidden pointer-events-auto shadow-2xl">
        <div className="bezel-core p-6 md:p-8 text-center overflow-y-auto max-h-[calc(90vh-1rem)] custom-scrollbar">
          
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-sm hover:bg-champagne-50 text-twilight-100/50 hover:text-twilight-50 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* DECISION STEP */}
        {step === 'decision' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-champagne-400 font-serif text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3">
              <Sparkles className="w-4 h-4" />
              We Would Be Honoured
              <Sparkles className="w-4 h-4" />
            </div>
            
            <h2 className="font-arabic text-3xl md:text-5xl text-twilight-50 font-bold tracking-wide leading-relaxed">
              السلام عليكم ورحمة الله وبركاته
            </h2>

            <p className="text-twilight-100/70 text-sm md:text-base max-w-md mx-auto leading-relaxed font-medium">
              We would be delighted to know if you will be joining us on our special day.
            </p>

            <div className="text-twilight-50 font-script font-semibold text-3xl max-w-sm mx-auto leading-relaxed pt-2">
              Will you be attending our wedding, In Sha Allah?
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="button"
                onClick={handleSelectYes}
                className="group relative flex-1 flex items-center justify-between pl-6 pr-2 py-2 rounded-sm bg-champagne-500 text-white font-serif text-sm font-bold uppercase tracking-widest transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-xl shadow-champagne-500/20 hover:shadow-champagne-500/40 hover:bg-champagne-600 active:scale-[0.98]"
              >
                <span>Yes, I will</span>
                <div className="w-10 h-10 rounded-sm bg-white/20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:bg-white/30">
                  <span className="text-lg">✨</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={handleSelectNo}
                className="group relative flex-1 flex items-center justify-between pl-6 pr-2 py-2 rounded-sm bg-twilight-900/50 border border-velvet-200 text-twilight-100/70 hover:text-twilight-50 hover:bg-white/80 font-serif text-sm font-bold uppercase tracking-widest transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-[1.03]"
              >
                <span>Cannot Attend</span>
                <div className="w-10 h-10 rounded-sm bg-velvet-900/5 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:bg-velvet-900/10">
                  <span className="text-lg">🌙</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* FORM DETAILS STEP (For "Yes") */}
        {step === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-5 text-left animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="font-script text-4xl text-twilight-50 drop-shadow-sm">
                Celebration Details
              </h2>
              <p className="text-twilight-100/70 text-xs font-serif font-medium mt-2">
                Kindly fill out the details below to confirm your guest spots.
              </p>
            </div>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-champagne-600">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-champagne-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Fatima Al-Hassan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-twilight-900/50 border border-white focus:border-champagne-400 outline-none rounded-sm text-twilight-50 text-sm font-sans font-medium transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* Guest count */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-champagne-600">
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-4 py-3 bg-twilight-900/50 border border-white focus:border-champagne-400 outline-none rounded-sm text-twilight-50 text-sm font-sans font-medium transition-colors shadow-inner"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
              </select>
            </div>

            {/* Contact Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-champagne-600">
                Contact Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-champagne-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-twilight-900/50 border border-white focus:border-champagne-400 outline-none rounded-sm text-twilight-50 text-sm font-sans font-medium transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-champagne-600">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-champagne-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="fatima@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-twilight-900/50 border border-white focus:border-champagne-400 outline-none rounded-sm text-twilight-50 text-sm font-sans font-medium transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* Special Message/Dua */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-champagne-600">
                Special Message or Du'a
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 pt-3.5 flex items-start text-champagne-400">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <textarea
                  placeholder="Send blessings and prayers for our union..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="w-full pl-11 pr-4 py-3 bg-twilight-900/50 border border-white focus:border-champagne-400 outline-none rounded-sm text-twilight-50 text-sm font-sans font-medium transition-colors shadow-inner resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group relative w-full flex items-center justify-between pl-6 pr-2 py-2 mt-4 rounded-sm bg-champagne-500 text-white font-serif font-bold tracking-widest uppercase text-xs transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shadow-xl shadow-champagne-500/20 hover:shadow-champagne-500/40 hover:bg-champagne-600 active:scale-[0.98]"
            >
              <span>Submit Response</span>
              <div className="w-10 h-10 rounded-sm bg-white/20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 group-hover:bg-white/30">
                <Send className="w-4 h-4" />
              </div>
            </button>
          </form>
        )}

        {/* THANK YOU ACCEPTS STEP */}
        {step === 'thank-yes' && (
          <div className="py-8 space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-champagne-50/50 rounded-sm border border-champagne-200 flex items-center justify-center mx-auto text-champagne-400 shadow-sm">
              <Heart className="w-10 h-10 fill-current" />
            </div>
            
            <h3 className="font-script text-4xl md:text-5xl text-twilight-50 drop-shadow-sm">
              Jazakum Allahu Khairan
            </h3>
            
            <p className="text-twilight-100/70 text-sm md:text-base leading-relaxed max-w-sm mx-auto font-medium">
              Thank you, {name}! Your RSVP has been confirmed. We look forward to celebrating with you under Allah's blessings, In Sha Allah.
            </p>

            <div className="text-xs text-champagne-600 font-serif italic pt-4 max-w-xs mx-auto font-bold">
              "May Allah bless this union with love, mercy, patience, and endless barakah."
            </div>

            <button
              onClick={handleClose}
              className="mt-4 px-8 py-2.5 bg-velvet-900 hover:bg-velvet-800 text-white rounded-sm text-xs font-serif font-bold uppercase tracking-widest transition-colors shadow-xl"
            >
              Close
            </button>
          </div>
        )}

        {/* THANK YOU DECLINES STEP */}
        {step === 'thank-no' && (
          <div className="py-8 space-y-6 animate-fade-in text-center">
            <div className="w-20 h-20 bg-champagne-50/50 rounded-sm border border-champagne-200 flex items-center justify-center mx-auto text-velvet-400 shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <h3 className="font-script text-4xl md:text-5xl text-twilight-50 drop-shadow-sm">
              JazakAllahu Khairan
            </h3>
            
            <p className="text-twilight-100/70 text-sm md:text-base leading-relaxed max-w-sm mx-auto font-medium">
              JazakAllahu Khairan for your response. Please keep us in your du'as. May Allah bless you and your family.
            </p>

            <button
              onClick={handleClose}
              className="mt-4 px-8 py-2.5 bg-velvet-900 hover:bg-velvet-800 text-white rounded-sm text-xs font-serif font-bold uppercase tracking-widest transition-colors shadow-xl"
            >
              Close
            </button>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
