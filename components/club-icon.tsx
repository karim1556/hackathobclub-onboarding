export type ClubIconName =
  | 'arrow-down'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'brain-circuit'
  | 'code'
  | 'gamepad'
  | 'message'
  | 'pause'
  | 'play'
  | 'sparkles'
  | 'trophy'
  | 'users'
  | 'zap';

type ClubIconProps = {
  name: ClubIconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function ClubIcon({
  name,
  size = 24,
  strokeWidth = 1.5,
  className,
}: ClubIconProps) {
  const drawing = {
    'arrow-down': <path d="M12 3v18m-6-6 6 6 6-6" />,
    'arrow-right': <path d="M3 12h18m-6-6 6 6-6 6" />,
    'arrow-up-right': <path d="M5 19 19 5M8 5h11v11" />,
    'brain-circuit': (
      <>
        <path d="M9.2 4.4A3.3 3.3 0 0 0 4.8 8a3.5 3.5 0 0 0 .2 6.4A3.6 3.6 0 0 0 9.3 19M14.8 4.4A3.3 3.3 0 0 1 19.2 8a3.5 3.5 0 0 1-.2 6.4 3.6 3.6 0 0 1-4.3 4.6M9.3 5v14M14.7 5v14M9.3 9H7.5M14.7 12h2M9.3 15H7.8" />
        <circle cx="6.2" cy="9" r="1.2" />
        <circle cx="17.8" cy="12" r="1.2" />
        <circle cx="6.5" cy="15" r="1.2" />
      </>
    ),
    code: (
      <>
        <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4l-3 16" />
        <circle cx="12" cy="12" r="10" opacity=".28" />
      </>
    ),
    gamepad: (
      <>
        <path d="M7.2 8.2h9.6c2.2 0 3.7 2 4.1 5.6l.3 2.7a2.1 2.1 0 0 1-3.6 1.7l-2.2-2.3H8.6l-2.2 2.3a2.1 2.1 0 0 1-3.6-1.7l.3-2.7c.4-3.6 1.9-5.6 4.1-5.6Z" />
        <path d="M7 11v4M5 13h4" />
        <circle cx="16.2" cy="12" r=".8" fill="currentColor" stroke="none" />
        <circle cx="18" cy="14" r=".8" fill="currentColor" stroke="none" />
        <path d="M9 8.2 10.5 5h3L15 8.2" />
      </>
    ),
    message: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5 5 16.2a8.5 8.5 0 1 1 15.5-4.7Z" />
        <path d="M8 10h8M8 13.5h5.5" />
      </>
    ),
    pause: (
      <>
        <path d="M8.5 5v14M15.5 5v14" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    sparkles: (
      <>
        <path d="M12 2.5c.4 4.7 2.8 7.1 7.5 7.5-4.7.4-7.1 2.8-7.5 7.5-.4-4.7-2.8-7.1-7.5-7.5 4.7-.4 7.1-2.8 7.5-7.5Z" />
        <path d="M19 16.5c.1 1.7 1 2.6 2.7 2.7-1.7.1-2.6 1-2.7 2.7-.1-1.7-1-2.6-2.7-2.7 1.7-.1 2.6-1 2.7-2.7Z" />
      </>
    ),
    trophy: (
      <>
        <path d="M7 3.5h10V8c0 4-2 6.5-5 6.5S7 12 7 8V3.5ZM9 20.5h6M12 14.5v6M8.5 17.5h7" />
        <path d="M7 6H3.5v1.5A4.5 4.5 0 0 0 8 12M17 6h3.5v1.5A4.5 4.5 0 0 1 16 12" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-1.7A5.5 5.5 0 0 1 9 12.8a5.5 5.5 0 0 1 5.5 5.5V20" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M16.2 14.2a4.5 4.5 0 0 1 4.3 4.5V20" />
      </>
    ),
    zap: <path d="m13.2 2-8 12h6L10.8 22l8-12h-6l.4-8Z" />,
  }[name];

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {drawing}
    </svg>
  );
}
