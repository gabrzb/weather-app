import type { SvgRepoIconName } from '../components/SvgRepoIcon'

export type WeatherDescription = {
  icon: SvgRepoIconName
  label: string
}

export function weatherDescription(code: number, isDay = true): WeatherDescription {
  const clearIcon = isDay ? 'sun' : 'moon'

  if (code === 0) {
    return {
      icon: clearIcon,
      label: isDay ? 'Céu limpo' : 'Noite limpa',
    }
  }

  if ([1, 2].includes(code)) {
    return {
      icon: 'partlyCloudy',
      label: 'Parcialmente nublado',
    }
  }

  if (code === 3) {
    return {
      icon: 'cloud',
      label: 'Nublado',
    }
  }

  if ([45, 48].includes(code)) {
    return {
      icon: 'fog',
      label: 'Névoa',
    }
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      icon: 'snow',
      label: 'Neve',
    }
  }

  if ([95, 96, 99].includes(code)) {
    return {
      icon: 'storm',
      label: 'Tempestade',
    }
  }

  return {
    icon: 'rain',
    label: [51, 53, 55, 56, 57].includes(code) ? 'Garoa' : 'Chuva',
  }
}
