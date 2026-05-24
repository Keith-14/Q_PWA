import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import onboarding1 from '@/assets/onboarding-1.jpg';
import onboarding2 from '@/assets/onboarding-2.jpg';
import onboarding3 from '@/assets/onboarding-3.jpg';

const ONBOARDING_KEY = 'barakah_onboarding_completed';

type Slide = {
  image: string;
  bg: string;
  title: React.ReactNode;
  description: string;
};

const slides: Slide[] = [
  {
    image: onboarding1,
    bg: '#b9573a',
    title: (
      <>
        One <span style={{ color: '#7a2e1a' }}>Ummah</span>
        <br />One App
      </>
    ),
    description:
      'All your essentials in one place—faith, daily life, and what matters most, organized with intention.',
  },
  {
    image: onboarding2,
    bg: '#b9573a',
    title: (
      <>
        <span style={{ color: '#7a2e1a' }}>AI-driven</span> Islamic
        <br />companion
      </>
    ),
    description:
      'Ask anything — prayer guidance, fiqh questions, daily duas. Instant trusted answers powered by AI.',
  },
  {
    image: onboarding3,
    bg: '#d9a23a',
    title: (
      <>
        <span style={{ color: '#7a2e1a' }}>Trusted</span> Hajj &
        <br />Umrah packages
      </>
    ),
    description:
      'Explore trusted Hajj and Umrah packages, plan your pilgrimage and connect with fellow traveller.',
  },
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const isLast = current === slides.length - 1;

  const finish = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    navigate('/login', { replace: true });
  };

  const handleNext = () => {
    if (isLast) finish();
    else setCurrent((c) => c + 1);
  };

  const slide = slides[current];

  return (
    <div
      className="min-h-screen max-w-md mx-auto relative flex flex-col overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: slide.bg }}
    >
      {/* Skip */}
      <div className="flex justify-end px-6 pt-6 relative z-10">
        <button
          onClick={finish}
          className="text-white/95 text-base font-medium"
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-6 pb-4">
        <img
          src={slide.image}
          alt=""
          className="w-full max-h-[55vh] object-contain"
        />
      </div>

      {/* Bottom cream sheet */}
      <div
        className="rounded-t-[32px] px-8 pt-10 pb-8 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]"
        style={{ backgroundColor: '#fbf1dd' }}
      >
        <h1
          className="text-center text-[28px] leading-tight font-bold mb-4"
          style={{ color: '#1a1a1a', fontFamily: 'Reem Kufi, sans-serif' }}
        >
          {slide.title}
        </h1>
        <p
          className="text-center text-sm leading-relaxed mb-6"
          style={{ color: '#6b6b6b' }}
        >
          {slide.description}
        </p>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 16,
                backgroundColor: i === current ? '#5a6a3a' : '#d9c9a8',
              }}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full h-14 rounded-full text-white text-base font-semibold"
          style={{ backgroundColor: '#b9573a' }}
        >
          {isLast ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};