import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Home Stuff",
  description: "A VitePress Site",
  base: "/my-home-stuff/",
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
          { text: 'Nginx Proxy Manager', link: '/docker_nginx_proxy_manager' },
          { text: 'Docker Proxy',        link: '/docker_docker_proxy' },
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
        text: 'Services',
        items: [
          { text: 'Redis',               link: '/docker_redis' },
          { text: 'Mosquitto',           link: '/docker_mosquitto' },
          { text: 'RabbitMQ',            link: '/docker_rabbitmq' },
          { text: 'Postgres',            link: '/docker_postgres' },
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
          { text: 'Zigbee2MQTT',         link: '/docker_zigbee2mqtt' },
          { text: 'Matter',              link: '/docker_matter' },
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
      },
      {
        text: 'Divers',
        items: [
          { text: 'Dawarich',            link: '/docker_dawarich' },
          { text: 'Mealie',              link: '/docker_mealie' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/leahpar/my-home-stuff' },
    ]
  }
})
