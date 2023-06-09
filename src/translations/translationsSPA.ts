export const translationsSPA = {
  language: {
    fra: "Francés",
    en: "Inglés",
    spa: "Español",
  },

  settings: {
    themes: {
      flags: "Banderas",
      capitals: "Capitales",
      demography: "Demografía",
      borders: "Fronteras",
      areas: "Áreas",
    },
    regions: {
      world: "Mundo",
      africa: "África",
      americas: "Américas",
      asia: "Asia",
      europe: "Europa",
      oceania: "Oceanía",
    },
    difficulties: {
      kid: "Niño",
      easy: "Fácil",
      medium: "Medio",
      hard: "Difícil",
      expert: "Experto",
    },
    lengths: {
      short: "Corto",
      normal: "Normal",
      long: "Largo",
    },
  },

  menu: {
    home: "Inicio",
    study: "Estudiar",
    quiz: "Quiz",
  },

  home: {
    catchPhrase: "El quiz que te permite probar tus conocimientos sobre las naciones del mundo.",
  },

  didYouKnow: {
    title: "¿Sabías que?",

    sentence: {
      capital: "La capital de {{country}} es {{capital}}.",
      population_country: "La población de {{country}} es {{population}} habitantes.",
      population_country_biggest:
        "El país con más habitantes es {{country}} con {{population}} habitantes.",
      population_continent:
        "{{population_continent}} personas viven en {{continent}}, que es {{population_continent_calc}}% de la población mundial.",
      area_biggest: "El país más grande es {{country}} con {{area_biggest}} km².",
      independent:
        "En el mundo, {{independent}} territorios aún no han reclamado su independencia, que es {{independent_calc}}% de ellos.",
      unMember:
        "{{unMember_sum}} países del mundo son miembros de la ONU, que es {{unMember_calc}}% de los países.",
      default: "Hay {{countries}} territorios en el mundo.",
    },

    nextInfo: "¡Enséñame algo más!",
  },

  goToStudy: {
    title: "¡Estudia el mundo!",
    description:
      "Aprende las banderas, las capitales, la demografía, y mucha otra información de los países del mundo.",
    button: "¡Quiero estudiar!",
  },

  study: {
    infoSheet: "Ficha informativa",
    noResult: "Ningún país coincide con tus criterios de búsqueda.",

    infos: {
      rows: {
        geography: "Geografía",
        status: "Estado",
        economy: "Economía",
        miscellaneous: "Diverso",
      },
      labels: {
        continent: "Continente",
        subregion: "Subregión",
        capital: "Capital",
        area: "Área",
        borders: "Fronteras",
        landlocked: "País sin salida al mar",
        population: "Población",
        languages: "Idiomas",
        independent: "Independiente",
        unmember: "Miembro de la ONU",
        currency: "Moneda",
        gini: "Gini",
        callingcode: "Prefijo telefónico",
        timezones: "Zonas horarias",
        car: "Conducción",
      },
      values: {
        yes: "Sí",
        no: "No",
        population: "{{population}} habitantes",
        car: '"{{sign}}", lado {{side}} de la carretera',
      },
    },
  },

  searchBar: {
    results: {
      none: "Ningún país encontrado",
      one: "1 país encontrado",
      many: "{{results}} países encontrados",
    },
    sort: {
      label: "Ordenar por",
      options: {
        default: "Seleccionar",
        name_ascending: "Nombre (A-Z)",
        name_descending: "Nombre (Z-A)",
        population_ascending: "Población (1-9)",
        population_descending: "Población (9-1)",
      },
    },
    region: {
      label: "Continente",
      options: {
        default: "Todos",
        africa: "África",
        americas: "Américas",
        asia: "Asia",
        europe: "Europa",
        oceania: "Oceanía",
      },
    },
    population: {
      label: "Población",
      options: {
        default: "Todas",
        more100m: "> 100 millones",
        less100m: "< 100 millones",
        more10m: "> 10 millones",
        less10m: "< 10 millones",
        more1m: "> 1 millón",
        less1m: "< 1 millón",
        more100k: "> 100 000",
        less100k: "< 100 000",
        more10k: "> 10 000",
        less10k: "< 10 000",
      },
    },
    placeholder: "Buscar un país",
  },

  quizList: {
    title: "Elige tu quiz",

    flags: {
      title: "Banderas",
      description: "Encuentra las banderas de los países",
    },
    capitals: {
      title: "Capitales",
      description: "Encuentra las capitales de los países",
    },
    demography: {
      title: "Demografía",
      description: "Encuentra el país más poblado",
    },
    borders: {
      title: "Fronteras",
      description: "Encuentra el país fronterizo",
    },
    areas: {
      title: "Áreas",
      description: "Encuentra el país más grande",
    },

    start: "JUGAR",
  },

  game: {
    restart: "Reiniciar",
    leave: "Abandonar la partida",

    questions: {
      flags: "¿De qué país es esta bandera?",
      capitals: "¿Cuál es la capital de este país?",
      demography: "¿Qué país tiene más habitantes?",
      borders: "¿Qué país limita con este?",
      areas: "¿Qué país es el más grande?",
    },

    response: {
      population: "habitantes",
      areas: "km²",
    },

    result: {
      description: {
        zeroPoints: "No tienes ningún punto.",
        onePoint: "Tienes un punto.",
        manyPoints: "Tienes {{score}} puntos.",
      },

      restart: "Repetir",
      another: "Otro quiz",
    },
  },

  submitScore: {
    description: {
      onePoint:
        "Con un punto en {{time}} segundos, acabas de establecer un nuevo récord, ¡felicidades!",
      manyPoints:
        "Con {{score}} puntos en {{time}} segundos, acabas de establecer un nuevo récord, ¡felicidades!",
    },
    saveScore: "Guárdalo ahora:",

    placeholder: "Tu nombre de usuario",
    pseudoMissing: "Por favor, introduce un nombre de usuario",
    selectCountry: "Selecciona tu país",

    btn: "Guardar",

    newRecord: "Tu puntuación ha sido añadida a los récords.",
    notNewRecord: "Tu puntuación no entra en los récords.",
  },

  rankings: {
    title: "Récords",
    playThisQuiz: "Jugar a este quiz",

    filters: {
      theme: {
        title: "Tema",
        flags: "Banderas",
        capitals: "Capitales",
        demography: "Demografía",
        borders: "Fronteras",
        areas: "Áreas",
      },
      region: {
        title: "Region del mundo",
        world: "Mundo",
        africa: "África",
        americas: "Américas",
        asia: "Asia",
        europe: "Europa",
        oceania: "Oceanía",
      },
      difficulty: {
        title: "Dificultad",
        kid: "Niño",
        easy: "Fácil",
        medium: "Medio",
        hard: "Difícil",
        expert: "Experto",
      },
      length: {
        title: "Preguntas",
        short: "Corto",
        normal: "Normal",
        long: "Largo",
      },
    },

    sentence: {
      main: "{{theme}} de {{region}}",
      second: "({{difficulty}}, {{length}})",
    },

    loading: "Cargando los rankings...",
    noRankings: "Este quiz no tiene récords todavía... ¡Sé el primero!",
    lastRankings: "Récords más recientes",
  },

  ranking: {
    scoreAndTime: {
      one: "<span>{{score}}</span> punto en <span>{{time}}</span> segundos",
      many: "<span>{{score}}</span> puntos en <span>{{time}}</span> segundos",
    },
  },

  modale: {
    settings: {
      title: "Ajustes",

      difficulty: {
        title: "Dificultad",
        kid: "Niño",
        easy: "Fácil",
        medium: "Medio",
        hard: "Difícil",
        expert: "Experto",
      },

      length: {
        title: "Preguntas",
        short: "Corto",
        normal: "Normal",
        long: "Largo",
      },

      region: {
        title: "Continentes",
        world: "Todos",
        africa: "África",
        americas: "Américas",
        asia: "Asia",
        europe: "Europa",
        oceania: "Oceanía",
      },

      start: "Comienzo la partida",
    },
    game: {
      description: {
        restart: "¿Estás seguro de querer reiniciar el quiz?<br>(Tu progreso se perderá)",
        leave: "¿Estás seguro de querer dejar el quiz?<br>(Tu progreso se perderá)",
      },
      accept: "Sí",
      decline: "No",
    },
  },
};
