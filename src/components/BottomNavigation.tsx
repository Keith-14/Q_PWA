import { Home, ShoppingBasket, ScanLine, MessageSquare } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const MosqueIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2c-2 2-4 4-4 7v2h8V9c0-3-2-5-4-7z" />
    <path d="M6 11h12v3H6z" />
    <path d="M4 14h16v8H4z" />
    <path d="M8 14v8M16 14v8M12 14v8" />
    <path d="M10 5c1-1 3-1 4 0" />
  </svg>
);

const PILL_BG = '#3A1E12';
const ACTIVE_BG = '#5C3A2A';
const CHAT_BG = '#B54A22';
const TEXT_ACTIVE = '#FFFFFF';
const TEXT_INACTIVE = 'rgba(255, 255, 255, 0.6)';

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, labelKey: 'nav.home', path: '/' },
    { icon: ShoppingBasket, labelKey: 'nav.store', path: '/shop' },
    { icon: MosqueIcon, labelKey: 'nav.prayer', path: '/prayer-times' },
    { icon: ScanLine, labelKey: 'nav.halalScan', path: '/halal-scanner' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md z-30 px-4 pb-4 font-arabic">
      <div className="flex items-center gap-3">
        {/* Main pill nav */}
        <div
          className="flex-1 rounded-full flex items-center justify-between py-2.5 px-3"
          style={{ backgroundColor: PILL_BG }}
        >
          {navItems.map(({ icon: Icon, labelKey, path }) => {
            const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-full transition-all duration-200 min-w-[60px]",
                  isActive && "shadow-sm"
                )}
                style={{
                  backgroundColor: isActive ? ACTIVE_BG : 'transparent',
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{ color: isActive ? TEXT_ACTIVE : TEXT_INACTIVE }}
                />
                <span
                  className="text-[10px] font-medium leading-none"
                  style={{ color: isActive ? TEXT_ACTIVE : TEXT_INACTIVE }}
                >
                  {t(labelKey)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chat / Guftagu button */}
        <button
          onClick={() => navigate('/forum')}
          className="h-14 w-14 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-transform duration-200 active:scale-95"
          style={{ backgroundColor: CHAT_BG }}
          aria-label="Guftagu"
        >
          <MessageSquare className="h-6 w-6 text-white" strokeWidth={2} />
        </button>
      </div>
    </nav>
  );
};
