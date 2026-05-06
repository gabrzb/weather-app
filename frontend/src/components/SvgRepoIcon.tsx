import type { ReactNode, SVGProps } from 'react'
import { cn } from '../lib/utils'

export type SvgRepoIconName =
  | 'air'
  | 'alert'
  | 'calendar'
  | 'cloud'
  | 'compass'
  | 'droplets'
  | 'fog'
  | 'loader'
  | 'location'
  | 'moon'
  | 'navigation'
  | 'partlyCloudy'
  | 'rain'
  | 'search'
  | 'snow'
  | 'storm'
  | 'sun'
  | 'thermometer'
  | 'umbrella'
  | 'wifi'
  | 'wifiOff'
  | 'wind'

type SvgRepoIconProps = SVGProps<SVGSVGElement> & {
  name: SvgRepoIconName
}

const iconPaths: Record<SvgRepoIconName, ReactNode> = {
  air: (
    <>
      <path d="M4 8h9.5a2.5 2.5 0 1 0-2.2-3.7" />
      <path d="M3 12h13a2 2 0 1 1-1.7 3" />
      <path d="M5 16h5" />
    </>
  ),
  alert: (
    <>
      <path d="m12 4 9 16H3L12 4Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>
  ),
  calendar: (
    <>
      <path d="M7 3v4" />
      <path d="M17 3v4" />
      <path d="M4 8h16" />
      <path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
    </>
  ),
  cloud: <path d="M7 18h10.5a4.5 4.5 0 0 0 .3-9A6.5 6.5 0 0 0 5.4 11 3.5 3.5 0 0 0 7 18Z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  droplets: (
    <>
      <path d="M8 14.5a3 3 0 0 1-6 0c0-1.9 3-5.5 3-5.5s3 3.6 3 5.5Z" />
      <path d="M22 14.5a3 3 0 0 1-6 0c0-1.9 3-5.5 3-5.5s3 3.6 3 5.5Z" />
      <path d="M15 7.5a3 3 0 0 1-6 0C9 5.6 12 2 12 2s3 3.6 3 5.5Z" />
    </>
  ),
  fog: (
    <>
      <path d="M7 14h10.5a4.5 4.5 0 0 0 .3-9A6.5 6.5 0 0 0 5.4 7 3.5 3.5 0 0 0 7 14Z" />
      <path d="M4 18h16" />
      <path d="M7 21h10" />
    </>
  ),
  loader: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M21 3v6h-6" />
    </>
  ),
  location: (
    <>
      <path d="M12 21s7-4.7 7-11a7 7 0 1 0-14 0c0 6.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.6 8.6 0 1 0 20.5 14.5Z" />,
  navigation: (
    <>
      <path d="m12 3 7 18-7-4-7 4 7-18Z" />
      <path d="M12 3v14" />
    </>
  ),
  partlyCloudy: (
    <>
      <path d="M5 10a4 4 0 0 1 7.5-2" />
      <path d="M4 4v1.5" />
      <path d="M2 8h1.5" />
      <path d="M7.5 2.5 6.5 4" />
      <path d="M8 19h9.5a4 4 0 0 0 .2-8 5.5 5.5 0 0 0-10.4 1.7A3.2 3.2 0 0 0 8 19Z" />
    </>
  ),
  rain: (
    <>
      <path d="M7 14h10.5a4.5 4.5 0 0 0 .3-9A6.5 6.5 0 0 0 5.4 7 3.5 3.5 0 0 0 7 14Z" />
      <path d="m8 18-1 2" />
      <path d="m12 18-1 2" />
      <path d="m16 18-1 2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  snow: (
    <>
      <path d="M7 14h10.5a4.5 4.5 0 0 0 .3-9A6.5 6.5 0 0 0 5.4 7 3.5 3.5 0 0 0 7 14Z" />
      <path d="M8 19h.01" />
      <path d="M12 21h.01" />
      <path d="M16 19h.01" />
    </>
  ),
  storm: (
    <>
      <path d="M7 14h10.5a4.5 4.5 0 0 0 .3-9A6.5 6.5 0 0 0 5.4 7 3.5 3.5 0 0 0 7 14Z" />
      <path d="m13 14-3 5h4l-2 3" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.9 19.1 1.4-1.4" />
      <path d="m17.7 6.3 1.4-1.4" />
    </>
  ),
  thermometer: (
    <>
      <path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" />
      <path d="M12 8v8" />
    </>
  ),
  umbrella: (
    <>
      <path d="M3 12a9 9 0 0 1 18 0Z" />
      <path d="M12 12v6a2 2 0 1 0 4 0" />
      <path d="M12 3v2" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.5a10 10 0 0 1 14 0" />
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      <path d="M12 20h.01" />
    </>
  ),
  wifiOff: (
    <>
      <path d="m3 3 18 18" />
      <path d="M9.5 9.5a10 10 0 0 1 9.5 3" />
      <path d="M5 12.5a10 10 0 0 1 2.2-1.6" />
      <path d="M8.5 16a5 5 0 0 1 6.5-.5" />
      <path d="M12 20h.01" />
    </>
  ),
  wind: (
    <>
      <path d="M4 8h10a2 2 0 1 0-1.7-3" />
      <path d="M3 12h15" />
      <path d="M4 16h9a2 2 0 1 1-1.7 3" />
    </>
  ),
}

export function SvgRepoIcon({ className = 'h-5 w-5', name, ...props }: SvgRepoIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0 text-current', className)}
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  )
}
