export const translationsFRA = {
  language: {
    fra: "Français",
    en: "Anglais",
    spa: "Espagnol",
  },

  settings: {
    themes: {
      flags: "Drapeaux",
      capitals: "Capitales",
      demography: "Démographie",
      borders: "Frontières",
      areas: "Superficies",
    },
    regions: {
      world: "Monde",
      africa: "Afrique",
      americas: "Amériques",
      asia: "Asie",
      europe: "Europe",
      oceania: "Océanie",
    },
    difficulties: {
      kid: "Bac à sable",
      easy: "Facile",
      medium: "Moyen",
      hard: "Difficile",
      expert: "Expert",
    },
    lengths: {
      short: "Court",
      normal: "Normal",
      long: "Long",
    },
  },

  menu: {
    home: "Accueil",
    study: "Étudier",
    quiz: "Quiz",
  },

  home: {
    catchPhrase: "Le quiz qui vous permet de tester vos connaissances sur les nations du monde.",
  },

  didYouKnow: {
    title: "Le saviez-vous ?",

    sentence: {
      capital: "La capitale de {{country}} est {{capital}}.",
      population_country: "La population de {{country}} est de {{population}} habitants.",
      population_country_biggest:
        "Le pays qui a le plus d'habitants est {{country}} avec {{population}} habitants.",
      population_continent:
        "{{population_continent}} personnes vivent en {{continent}}, soit {{population_continent_calc}}% de la population mondiale.",
      area_biggest: "Le pays le plus étandu est {{country}} avec {{area_biggest}} km².",
      independent:
        "Dans le monde, {{independent}} territoires n'ont pas encore revendiqué leur indépendance, soit {{independent_calc}}% d'entre eux.",
      unMember:
        "{{unMember_sum}} pays dans le monde sont membres de l'ONU, soit {{unMember_calc}}% des pays.",
      default: "Il existe {{countries}} territoires dans le monde.",
    },

    nextInfo: "Apprends moi autre chose !",
  },

  goToStudy: {
    title: "Étudiez le monde !",
    description:
      "Apprenez les drapeaux, les capitales, la démographie, et plein d'autres informations des pays du monde.",
    button: "Je veux étudier !",
  },

  study: {
    infoSheet: "Fiche info",
    noResult: "Aucun pays ne corréspond à vos critères de recherche.",

    infos: {
      rows: {
        geography: "Géographie",
        status: "Statut",
        economy: "Économie",
        miscellaneous: "Divers",
      },
      labels: {
        continent: "Continent",
        subregion: "Sous-région",
        capital: "Capitale",
        area: "Superficie",
        borders: "Frontières",
        landlocked: "Pays sans littoral",
        population: "Population",
        languages: "Langues",
        independent: "Indépendant",
        unmember: "Membre de l'ONU",
        currency: "Devise",
        gini: "Gini",
        callingcode: "Indicatif téléphonique",
        timezones: "Fuseaux horaires",
        car: "Conduite",
      },
      values: {
        yes: "Oui",
        no: "Non",
        population: "{{population}} habitants",
        car: '"{{sign}}", circulation à {{side}}',
      },
    },
  },

  searchBar: {
    results: {
      none: "Aucun pays trouvé",
      one: "1 pays trouvé",
      many: "{{results}} pays trouvés",
    },
    sort: {
      label: "Trier par",
      options: {
        default: "Sélectionner",
        name_ascending: "Nom (A-Z)",
        name_descending: "Nom (Z-A)",
        population_ascending: "Population (1-9)",
        population_descending: "Population (9-1)",
      },
    },
    region: {
      label: "Continent",
      options: {
        default: "Tous",
        africa: "Afrique",
        americas: "Amériques",
        asia: "Asie",
        europe: "Europe",
        oceania: "Océanie",
      },
    },
    population: {
      label: "Population",
      options: {
        default: "Toutes",
        more100m: "> 100 millions",
        less100m: "< 100 millions",
        more10m: "> 10 millions",
        less10m: "< 10 millions",
        more1m: "> 1 million",
        less1m: "< 1 million",
        more100k: "> 100 000",
        less100k: "< 100 000",
        more10k: "> 10 000",
        less10k: "< 10 000",
      },
    },
    placeholder: "Rechercher un pays",
  },

  quizList: {
    title: "Choisissez votre quiz",

    flags: {
      title: "Drapeaux",
      description: "Trouver les drapeaux des pays",
    },
    capitals: {
      title: "Capitales",
      description: "Trouver les capitales des pays",
    },
    demography: {
      title: "Démographie",
      description: "Trouver le pays le plus peuplé",
    },
    borders: {
      title: "Frontières",
      description: "Trouver le pays frontalier",
    },
    areas: {
      title: "Superficies",
      description: "Trouver le pays le plus étendu",
    },

    start: "JOUER",
  },

  game: {
    restart: "Recommencer",
    leave: "Quitter la partie",

    questions: {
      flags: "De quel pays est ce drapeau ?",
      capitals: "Quelle est la capitale de ce pays ?",
      demography: "Quel pays à le plus d'habitants ?",
      borders: "Quels pays est frontalier avec celui-ci ?",
      areas: "Quel pays est le plus étendu ?",
    },

    response: {
      population: "habitants",
      area: "km²",
    },

    result: {
      description: {
        zeroPoints: "Vous n'avez aucun point.",
        onePoint: "Vous avez un point.",
        manyPoints: "Vous avez {{score}} points.",
      },

      restart: "Rejouer",
      another: "Autre quiz",
    },
  },

  submitScore: {
    description: {
      onePoint:
        "Avec un score de 1 point en {{time}} secondes, vous venez d'établir un nouveau record, félicitations !",
      manyPoints:
        "Avec un score de {{score}} points en {{time}} secondes, vous venez d'établir un nouveau record, félicitations !",
    },
    saveScore: "Enregistrez le dès maintenant :",

    placeholder: "Votre pseudo",
    pseudoMissing: "Veuillez entrer un pseudo",
    selectCountry: "Sélectionnez votre pays",

    btn: "Sauvegarder",

    newRecord: "Votre score à été ajouté dans la liste des records.",
    notNewRecord: "Votre score n'entre pas dans la table des records.",
  },

  rankings: {
    title: "Classements",
    playThisQuiz: "Jouer à ce quiz",

    filters: {
      theme: {
        title: "Thème",
        flags: "Drapeaux",
        capitals: "Capitales",
        demography: "Démographie",
        borders: "Frontières",
        areas: "Superficies",
      },
      region: {
        title: "Region",
        world: "Monde",
        africa: "Afrique",
        americas: "Amériques",
        asia: "Asie",
        europe: "Europe",
        oceania: "Océanie",
      },
      difficulty: {
        title: "Difficulté",
        kid: "Bac à sable",
        easy: "Facile",
        medium: "Moyen",
        hard: "Difficile",
        expert: "Expert",
      },
      length: {
        title: "Questions",
        short: "Court",
        normal: "Normal",
        long: "Long",
      },
    },

    sentence: {
      main: "{{theme}} de {{region}}",
      second: "({{difficulty}}, {{length}})",
    },

    loading: "Chargement des classements en cours...",
    noRankings: "Ce quiz n'a pas encore de records... Soyez le premier !",
    lastRankings: "Records les plus récents",
  },

  ranking: {
    scoreAndTime: {
      one: "<span>{{score}}</span> point en <span>{{time}}</span> secondes",
      many: "<span>{{score}}</span> points en <span>{{time}}</span> secondes",
    },
  },

  modale: {
    settings: {
      title: "Paramètres",

      difficulty: {
        title: "Difficulté",
        kid: "Bac à sable",
        easy: "Facile",
        medium: "Moyen",
        hard: "Difficile",
        expert: "Expert",
      },

      length: {
        title: "Questions",
        short: "Court",
        normal: "Normal",
        long: "Long",
      },

      region: {
        title: "Continents",
        world: "Tous",
        africa: "Afrique",
        americas: "Amériques",
        asia: "Asie",
        europe: "Europe",
        oceania: "Océanie",
      },

      start: "Commencer la partie",
    },

    game: {
      description: {
        restart:
          "Êtes-vous sûr de vouloir recommencer le quiz ?<br>(Votre progression sera perdue)",
        leave: "Êtes-vous sûr de vouloir quitter le quiz ?<br>(Votre progression sera perdue)",
      },
      accept: "Oui",
      decline: "Non",
    },
  },
};
