import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Home Stuff",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'Raspberry Pi',
        items: [
          { text: 'Installation', link: '/rpi_installation' },
          { text: 'Docker',       link: '/rpi_docker' }
        ]
      },
      {
        text: 'Système',
        items: [
          { text: 'Authelia',            link: '/docker_authelia' },
          { text: 'Nginx proxy manager', link: '/docker_nginx_proxy_manager' },
          { text: 'Docker proxy',        link: '/docker_docker_proxy' },
        ]
      },
      {
        text: 'Réseau',
        items: [
          { text: 'PiHole',              link: '/docker_pihole' },
          { text: 'Wireguard',           link: '/docker_wireguard' },
        ]
      },
      {
        text: 'Monitoring',
        items: [
          { text: 'Homepage',            link: '/docker_homepage' },
          { text: 'Uptime Kuma',         link: '/docker_uptime_kuma' },
        ]
      },
      {
        text: 'Domotique',
        items: [
          { text: 'Home Assistant',      link: '/docker_homeassistant' },
        ]
      },
      {
        text: 'Medias',
        items: [
          { text: 'Transmission',         link: '/docker_transmission' },
          { text: 'Jackett',              link: '/docker_jackett' },
          { text: 'Radarr',               link: '/docker_radarr' },
          { text: 'Sonarr',               link: '/docker_sonarr' },
          { text: 'Bazarr',               link: '/docker_bazarr' },
          { text: 'Jellyfin',             link: '/docker_jellyfin' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/leahpar' }
    ]
  }
})
