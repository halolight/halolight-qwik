import { component$ } from "@builder.io/qwik";
import type { QwikIntrinsicElements } from "@builder.io/qwik";

type IconProps = QwikIntrinsicElements["svg"] & {
  size?: number;
};

const baseSvgProps = (size?: number) => ({
  width: size ?? 20,
  height: size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

export const SparkIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M12 3v4" />
    <path d="M12 17v4" />
    <path d="M3 12h4" />
    <path d="M17 12h4" />
    <path d="M5.6 5.6l2.8 2.8" />
    <path d="M15.6 15.6l2.8 2.8" />
    <path d="M5.6 18.4l2.8-2.8" />
    <path d="M15.6 8.4l2.8-2.8" />
  </svg>
));

export const CheckIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
));

export const XIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
));

export const UsersIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
));

export const ShieldIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
));

export const GrowthIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M3 3v18h18" />
    <path d="m7 14 4-4 3 3 6-6" />
    <path d="m15 7 5 0 0 5" />
  </svg>
));

export const SunIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
));

export const MoonIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
));

export const ArrowUpIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <polyline points="18 9 12 3 6 9" />
    <line x1="12" x2="12" y1="3" y2="21" />
  </svg>
));

export const ArrowDownIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <polyline points="6 15 12 21 18 15" />
    <line x1="12" x2="12" y1="3" y2="21" />
  </svg>
));

export const SearchIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
));

export const BellIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
));

export const MenuIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
));

export const SettingsIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
));

export const UserIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
));

export const LogOutIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
));

export const HelpCircleIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" x2="12" y1="17" y2="17.01" />
  </svg>
));

export const AlertTriangleIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
));

export const HeartIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
));

export const GithubIcon = component$<IconProps>(({ size, ...rest }) => (
  <svg {...baseSvgProps(size)} {...rest}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
));
