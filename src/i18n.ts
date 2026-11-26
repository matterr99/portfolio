export type Lang = 'en' | 'es';

export interface ProjectTranslation {
  tag: string;
  status: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: readonly string[];
  actionText: string;
  openAria: string;
}

export interface SiteCopy {
  header: {
    emailMobile: string;
    emailAria: string;
    githubTitle: string;
    langToggleAria: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    disciplines: string;
    edition: string;
  };
  projectsSectionAria: string;
  projects: Record<'tennis' | 'kairos' | 'webdev', ProjectTranslation>;
  connect: {
    eyebrow: string;
    description: string;
    sendEmail: string;
    copyAddress: string;
    copied: string;
  };
  footer: {
    brand: string;
    copyright: string;
    audioNoticeLabel: string;
    audioNoticePrefix: string;
    audioNoticeSuffix: string;
  };
  music: {
    dialogAria: string;
    badge: string;
    heading: string;
    description: string;
    closeAria: string;
    playMusic: string;
    noThanks: string;
    modalNoticePrefix: string;
    playerAria: string;
    soundtrack: string;
    trackCount: string;
    playing: string;
    muteAria: string;
    unmuteAria: string;
    volumeAria: string;
    drawerNoticePrefix: string;
    removalRequest: string;
    seekTitle: string;
    prevAria: string;
    playAria: string;
    pauseAria: string;
    nextAria: string;
    expandAria: string;
    collapseAria: string;
    featuredTrack: string;
  };
}

export const COPY: Record<Lang, SiteCopy> = {
  en: {
    header: {
      emailMobile: 'Email',
      emailAria: 'Send Email to Gabriel Vasquez',
      githubTitle: 'GitHub Profile',
      langToggleAria: 'Switch language to Spanish',
    },
    hero: {
      badge: 'Selected Works & Research',
      title: 'Projects & Repositories',
      description:
        'Specialized projects across macro intelligence environments, athletic training methodologies, and modern web engineering.',
      disciplines: '03 Core Disciplines',
      edition: '2026 Edition',
    },
    projectsSectionAria: 'Featured Projects',
    projects: {
      tennis: {
        tag: 'Athletic Science',
        status: 'Live Module',
        title: 'Tennis Portfolio',
        subtitle: 'Player Development & Biomechanics',
        description:
          'Player development methodologies, kinetic chain efficiency diagnostics, and modern tennis training insights.',
        highlights: ['Biomechanics', 'Kinetic Chain', 'Match Analytics'],
        actionText: 'Open Tennis Portfolio',
        openAria: 'Open Tennis Portfolio',
      },
      kairos: {
        tag: 'Macro Intelligence',
        status: 'In Progress',
        title: 'Kairos Global Research',
        subtitle: 'Cross-Asset Macro Terminal',
        description:
          'Cross-asset macro research terminal tracking global liquidity conditions, sovereign yield curves, and central bank balance sheets.',
        highlights: ['Global Liquidity', 'Yield Curves', 'FX Regimes'],
        actionText: 'Access Kairos Terminal',
        openAria: 'Open Kairos Global Research',
      },
      webdev: {
        tag: 'Web Engineering',
        status: 'Active Repos',
        title: 'Web Development',
        subtitle: 'UI/UX & Systems Architecture',
        description:
          'Showcase of clean UI/UX architectures, performant reactive state paradigms, custom scripts, and modern web applications.',
        highlights: ['React & TypeScript', 'Design Systems', 'Performance'],
        actionText: 'Explore Repositories',
        openAria: 'Open Web Development Repositories',
      },
    },
    connect: {
      eyebrow: 'Connect & Inquire',
      description:
        'Available for quantitative macro research, athletic coaching, and web development consultations.',
      sendEmail: 'Send Direct Email',
      copyAddress: 'Copy Address',
      copied: 'Copied to Clipboard',
    },
    footer: {
      brand: 'Gabriel Vasquez · Selected Works',
      copyright: '© 2026 Gabriel Vasquez. All Rights Reserved.',
      audioNoticeLabel: 'Audio Notice:',
      audioNoticePrefix:
        'All music featured in the optional site player belongs exclusively to its respective artists, songwriters, and record labels. Tracks are included strictly for personal, non-commercial listening while browsing—no ownership, monetization, or distribution is claimed or intended. Rights holders may contact',
      audioNoticeSuffix: 'for immediate removal.',
    },
    music: {
      dialogAria: 'Audio experience prompt',
      badge: 'Audio Experience · 08 Tracks',
      heading: 'I love music — want to listen while you check out my page?',
      description:
        "I put together a few of my favorite tracks, so I was wondering if you'd like to listen to some while exploring. Pick a song below or hit play — you can control or mute it anytime.",
      closeAria: 'Close prompt',
      playMusic: 'Play Music',
      noThanks: 'No Thanks',
      modalNoticePrefix:
        'All music rights belong to their respective artists & labels. Played strictly for personal, non-commercial enjoyment—no distribution intended. Removal requests:',
      playerAria: 'Music Player',
      soundtrack: 'Portfolio Soundtrack',
      trackCount: '08 Tracks',
      playing: 'Playing',
      muteAria: 'Mute audio',
      unmuteAria: 'Unmute audio',
      volumeAria: 'Volume',
      drawerNoticePrefix:
        'All rights belong to the respective artists & labels. Personal, non-commercial use only—no distribution intended.',
      removalRequest: 'Removal request',
      seekTitle: 'Seek track',
      prevAria: 'Previous track',
      playAria: 'Play',
      pauseAria: 'Pause',
      nextAria: 'Next track',
      expandAria: 'Expand playlist',
      collapseAria: 'Collapse playlist',
      featuredTrack: 'Featured Track',
    },
  },
  es: {
    header: {
      emailMobile: 'Correo',
      emailAria: 'Enviar correo a Gabriel Vasquez',
      githubTitle: 'Perfil de GitHub',
      langToggleAria: 'Cambiar idioma a inglés',
    },
    hero: {
      badge: 'Obras Seleccionadas e Investigación',
      title: 'Proyectos y Repositorios',
      description:
        'Proyectos especializados en inteligencia macroeconómica, metodologías de entrenamiento deportivo e ingeniería web moderna.',
      disciplines: '03 Disciplinas Clave',
      edition: 'Edición 2026',
    },
    projectsSectionAria: 'Proyectos Destacados',
    projects: {
      tennis: {
        tag: 'Ciencia Deportiva',
        status: 'Módulo Activo',
        title: 'Portafolio de Tenis',
        subtitle: 'Desarrollo del Jugador y Biomecánica',
        description:
          'Metodologías de desarrollo del jugador, diagnósticos de eficiencia de la cadena cinética y análisis moderno de entrenamiento de tenis.',
        highlights: ['Biomecánica', 'Cadena Cinética', 'Análisis de Partidos'],
        actionText: 'Abrir Portafolio de Tenis',
        openAria: 'Abrir Portafolio de Tenis',
      },
      kairos: {
        tag: 'Inteligencia Macro',
        status: 'En Desarrollo',
        title: 'Kairos Global Research',
        subtitle: 'Terminal Macro Multi-Activo',
        description:
          'Terminal de investigación macro multi-activo que monitorea liquidez global, curvas de rendimiento soberano y balances de bancos centrales.',
        highlights: ['Liquidez Global', 'Curvas de Rendimiento', 'Regímenes FX'],
        actionText: 'Acceder a Kairos Terminal',
        openAria: 'Abrir Kairos Global Research',
      },
      webdev: {
        tag: 'Ingeniería Web',
        status: 'Repos Activos',
        title: 'Desarrollo Web',
        subtitle: 'UI/UX y Arquitectura de Sistemas',
        description:
          'Muestra de arquitecturas UI/UX limpias, paradigmas de estado reactivo de alto rendimiento, scripts personalizados y aplicaciones web modernas.',
        highlights: ['React y TypeScript', 'Sistemas de Diseño', 'Rendimiento'],
        actionText: 'Explorar Repositorios',
        openAria: 'Abrir Repositorios de Desarrollo Web',
      },
    },
    connect: {
      eyebrow: 'Contacto y Consultas',
      description:
        'Disponible para investigación macro cuantitativa, entrenamiento deportivo y consultorías de desarrollo web.',
      sendEmail: 'Enviar Correo Directo',
      copyAddress: 'Copiar Correo',
      copied: 'Copiado al Portapapeles',
    },
    footer: {
      brand: 'Gabriel Vasquez · Obras Seleccionadas',
      copyright: '© 2026 Gabriel Vasquez. Todos los derechos reservados.',
      audioNoticeLabel: 'Aviso de Audio:',
      audioNoticePrefix:
        'Toda la música incluida en el reproductor opcional pertenece exclusivamente a sus respectivos artistas, compositores y sellos discográficos. Las pistas se reproducen únicamente para disfrute personal y no comercial mientras navegas—no se reclama propiedad, monetización ni distribución. Los titulares de derechos pueden escribir a',
      audioNoticeSuffix: 'para su retiro inmediato.',
    },
    music: {
      dialogAria: 'Aviso de experiencia de audio',
      badge: 'Experiencia de Audio · 08 Pistas',
      heading: 'Me encanta la música — ¿quieres escuchar algo mientras exploras mi página?',
      description:
        'Reuní algunas de mis canciones favoritas por si te gustaría escucharlas mientras recorres el sitio. Elige una canción abajo o dale a reproducir — puedes controlarla o silenciarla en cualquier momento.',
      closeAria: 'Cerrar aviso',
      playMusic: 'Reproducir',
      noThanks: 'No, Gracias',
      modalNoticePrefix:
        'Todos los derechos de la música pertenecen a sus respectivos artistas y sellos. Reproducción estrictamente personal y no comercial—sin fines de distribución. Solicitudes de retiro:',
      playerAria: 'Reproductor de Música',
      soundtrack: 'Banda Sonora',
      trackCount: '08 Pistas',
      playing: 'Sonando',
      muteAria: 'Silenciar audio',
      unmuteAria: 'Activar audio',
      volumeAria: 'Volumen',
      drawerNoticePrefix:
        'Todos los derechos pertenecen a sus respectivos artistas y sellos. Uso personal y no comercial—sin fines de distribución.',
      removalRequest: 'Solicitar retiro',
      seekTitle: 'Adelantar pista',
      prevAria: 'Pista anterior',
      playAria: 'Reproducir',
      pauseAria: 'Pausar',
      nextAria: 'Siguiente pista',
      expandAria: 'Expandir lista',
      collapseAria: 'Contraer lista',
      featuredTrack: 'Pista Destacada',
    },
  },
};
