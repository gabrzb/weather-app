import type { SvgRepoIconName } from '../components/SvgRepoIcon'

export type WeatherDescription = {
  label: string
  icon: SvgRepoIconName
  color: string
  surface: string
}

export function weatherDescription(code: number, isDay = true): WeatherDescription {
  const clearIcon = isDay ? 'sun' : 'moon'

  if (code === 0) {
    return {
      label: isDay ? 'Céu limpo' : 'Noite limpa',
      icon: clearIcon,
      color: isDay ? 'text-amber-400' : 'text-indigo-300',
      surface: isDay ? 'border-amber-200/20 bg-amber-200/10' : 'border-indigo-200/20 bg-indigo-200/10',
    }
  }

  if ([1, 2].includes(code)) {
    return {
      label: 'Parcialmente nublado',
      icon: 'partlyCloudy',
      color: 'text-sky-400',
      surface: 'border-sky-200/20 bg-sky-300/10',
    }
  }

  if (code === 3) {
    return {
      label: 'Nublado',
      icon: 'cloud',
      color: 'text-slate-400',
      surface: 'border-slate-200/15 bg-white/10',
    }
  }

  if ([45, 48].includes(code)) {
    return {
      label: 'Névoa',
      icon: 'fog',
      color: 'text-stone-400',
      surface: 'border-stone-200/15 bg-stone-200/10',
    }
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      label: 'Neve',
      icon: 'snow',
      color: 'text-cyan-400',
      surface: 'border-cyan-100/20 bg-cyan-100/10',
    }
  }

  if ([95, 96, 99].includes(code)) {
    return {
      label: 'Tempestade',
      icon: 'storm',
      color: 'text-violet-400',
      surface: 'border-violet-200/20 bg-violet-300/10',
    }
  }

  return {
    label: [51, 53, 55, 56, 57].includes(code) ? 'Garoa' : 'Chuva',
    icon: 'rain',
    color: 'text-blue-400',
    surface: 'border-blue-200/20 bg-blue-300/10',
  }
}
