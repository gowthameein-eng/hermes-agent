/**
 * Claude-inspired desktop appearance for Hermes.
 * This is a visual theme only; it does not claim to be Anthropic's app.
 */

import { requestTheme, THEMES_AREA } from '@hermes/plugin-sdk'

const ID = 'claude-inspired-theme'
const THEME_NAME = 'claude-desktop-inspired'
const STYLE_ID = `${ID}-overrides`

function installThemeOverrides() {
  const style = document.getElementById(STYLE_ID) ?? document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    :root[data-hermes-theme="${THEME_NAME}"] {
      --claude-session-description: #5b5851;
      --ui-text-secondary: #4f4b44 !important;
      --ui-text-tertiary: #68635b !important;
      --ui-text-quaternary: #817b72 !important;
    }

    :root[data-hermes-theme="${THEME_NAME}"][data-hermes-mode="dark"] {
      --claude-session-description: #c5c1bb;
      --ui-text-secondary: #c9c6c0 !important;
      --ui-text-tertiary: #b0aca6 !important;
      --ui-text-quaternary: #928e87 !important;
    }

    /* Session metadata stays secondary, but no longer reads as disabled. */
    :root[data-hermes-theme="${THEME_NAME}"]
      .row-hover [class~="mt-0.5"][class~="text-(--ui-text-tertiary)"] {
      color: var(--claude-session-description) !important;
    }

    /* Keep session descriptions/metadata only on the active row. */
    :root[data-hermes-theme="${THEME_NAME}"]
      .row-hover [class~="mt-0.5"][class~="text-(--ui-text-tertiary)"],
    :root[data-hermes-theme="${THEME_NAME}"]
      .row-hover .hover-marquee + [class~="text-(--ui-text-quaternary)"] {
      display: none !important;
    }

    :root[data-hermes-theme="${THEME_NAME}"]
      .row-hover[class~="bg-(--ui-row-active-background)"]
      [class~="mt-0.5"][class~="text-(--ui-text-tertiary)"],
    :root[data-hermes-theme="${THEME_NAME}"]
      .row-hover[class~="bg-(--ui-row-active-background)"]
      .hover-marquee + [class~="text-(--ui-text-quaternary)"] {
      display: block !important;
    }

    /* All-uppercase labels use one restrained tracking value and Lato Medium. */
    :root[data-hermes-theme="${THEME_NAME}"] .uppercase {
      font-family: Lato, sans-serif !important;
      font-weight: 500 !important;
      letter-spacing: 0.07em !important;
    }

    /* Hermes uses font-mono for technical labels and code; the requested
       typeface applies there too, while preserving the app's size tokens. */
    :root[data-hermes-theme="${THEME_NAME}"] .font-mono,
    :root[data-hermes-theme="${THEME_NAME}"] code,
    :root[data-hermes-theme="${THEME_NAME}"] pre {
      font-family: Lato, sans-serif !important;
    }
  `

  if (!style.isConnected) document.head.appendChild(style)
}

const theme = {
  name: THEME_NAME,
  label: 'Claude-inspired',
  description: 'Claude-like warm paper in light mode and crisp neutral charcoal in dark mode',
  colors: {
    background: '#f5f3ed',
    foreground: '#24221f',
    card: '#fffdf8',
    cardForeground: '#24221f',
    muted: '#e9e6de',
    mutedForeground: '#625e57',
    popover: '#fffdf8',
    popoverForeground: '#24221f',
    primary: '#d46b47',
    primaryForeground: '#ffffff',
    secondary: '#f2ddd4',
    secondaryForeground: '#463a34',
    accent: '#f4e4dc',
    accentForeground: '#4c382f',
    border: '#d4d0c6',
    input: '#fffdf8',
    ring: '#d46b47',
    midground: '#d46b47',
    midgroundForeground: '#ffffff',
    composerRing: '#d46b47',
    destructive: '#b9473b',
    destructiveForeground: '#ffffff',
    sidebarBackground: '#eae7df',
    sidebarBorder: '#d0cbc1',
    userBubble: '#f0ddd4',
    userBubbleBorder: '#dec8bd'
  },
  darkColors: {
    background: '#151515',
    foreground: '#efeeeb',
    card: '#212120',
    cardForeground: '#efeeeb',
    muted: '#2b2b2a',
    mutedForeground: '#aaa8a3',
    popover: '#242423',
    popoverForeground: '#efeeeb',
    primary: '#d97757',
    primaryForeground: '#1b1210',
    secondary: '#30302f',
    secondaryForeground: '#e2e0dc',
    accent: '#343432',
    accentForeground: '#f0efec',
    border: '#444441',
    input: '#212120',
    ring: '#e18462',
    midground: '#e18462',
    midgroundForeground: '#1b1210',
    composerRing: '#4b4b47',
    destructive: '#ef7f7f',
    destructiveForeground: '#1b1210',
    sidebarBackground: '#101010',
    sidebarBorder: '#30302f',
    userBubble: '#2b2927',
    userBubbleBorder: '#46413d'
  },
  typography: {
    fontSans: 'Lato, sans-serif',
    fontMono: 'Lato, sans-serif'
  }
}

export default {
  id: ID,
  name: 'Claude-inspired theme',
  register(ctx) {
    ctx.register({ id: 'theme', area: THEMES_AREA, data: theme })
    installThemeOverrides()
    requestTheme(THEME_NAME)
  }
}
