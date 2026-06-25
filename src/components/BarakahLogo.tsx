import barakahLogoIcon from '@/assets/barakah-logo-icon.png';

interface BarakahLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BarakahLogo = ({ className = '', size = 'md' }: BarakahLogoProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
  };

  return (
    <div className={`${sizeClasses[size]} ${className} float flex items-center justify-center`}>
      <img 
        src={barakahLogoIcon} 
        alt="Barakah Logo" 
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(163,83,52,0.3)]"
      />
    </div>
  );
};
