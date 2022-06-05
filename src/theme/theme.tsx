type themeType = {
  [key: string]: { [key: string]: string }
}

export const theme: themeType = {
  dark: {
    bg1: '#3c4455',
    bg2: '#343a45',
    text: '#ffffff',
    textHover: '#b4b4b4',
    border: 'rgb(94, 94, 94)',
  },
  light: {
    bg1: '#dadada',
    bg2: '#a8a8a8',
    text: '#444444',
    textHover: '#6e6e6e',
    border: 'rgb(94, 94, 94)',
  },
}

export const alert: themeType = {
  danger: {
    bg1: '#e95454',
    bg2: '#b93e3e',
    primary: '#641515',
  },
  warning: {
    bg1: '#FFF3CD',
    bg2: '#e7dcb8',
    primary: '#D89D2B',
  },
}
