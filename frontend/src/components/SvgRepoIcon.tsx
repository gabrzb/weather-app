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

type SvgRepoIconProps = {
  className?: string
  name: SvgRepoIconName
}

const iconUrls: Record<SvgRepoIconName, string> = {
  air: 'https://www.svgrepo.com/show/427024/weather-icons-53.svg',
  alert: 'https://www.svgrepo.com/show/447830/warning.svg',
  calendar: 'https://www.svgrepo.com/show/533389/calendar-days.svg',
  cloud: 'https://www.svgrepo.com/show/426999/weather-icons-29.svg',
  compass: 'https://www.svgrepo.com/show/475326/compass.svg',
  droplets: 'https://www.svgrepo.com/show/427024/weather-icons-53.svg',
  fog: 'https://www.svgrepo.com/show/427024/weather-icons-53.svg',
  loader: 'https://www.svgrepo.com/show/533667/loader.svg',
  location: 'https://www.svgrepo.com/show/152351/location.svg',
  moon: 'https://www.svgrepo.com/show/427004/weather-icons-31.svg',
  navigation: 'https://www.svgrepo.com/show/475326/compass.svg',
  partlyCloudy: 'https://www.svgrepo.com/show/427002/weather-icons-30.svg',
  rain: 'https://www.svgrepo.com/show/427024/weather-icons-53.svg',
  search: 'https://www.svgrepo.com/show/522266/search.svg',
  snow: 'https://www.svgrepo.com/show/427024/weather-icons-53.svg',
  storm: 'https://www.svgrepo.com/show/427024/weather-icons-53.svg',
  sun: 'https://www.svgrepo.com/show/427042/weather-icons-01.svg',
  thermometer: 'https://www.svgrepo.com/show/133415/thermometer.svg',
  umbrella: 'https://www.svgrepo.com/show/427024/weather-icons-53.svg',
  wifi: 'https://www.svgrepo.com/show/61220/wifi.svg',
  wifiOff: 'https://www.svgrepo.com/show/61220/wifi.svg',
  wind: 'https://www.svgrepo.com/show/426999/weather-icons-29.svg',
}

export function SvgRepoIcon({ className = 'h-5 w-5', name }: SvgRepoIconProps) {
  return <img alt="" aria-hidden="true" className={`object-contain ${className}`} src={iconUrls[name]} />
}
