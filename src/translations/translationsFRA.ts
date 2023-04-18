export const translationsFRA = {
  language: {
    fra: "Français",
    en: "Anglais",
    spa: "Espagnol",
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
    reset: "Réinitialiser les filtres",
  },

  quizList: {
    title: "Choisissez votre quiz",
    flags: {
      title: "Drapeaux",
      description: "Trouver les drapeaux des pays",
      question: "De quel pays est ce drapeau ?",
    },
    capitals: {
      title: "Capitales",
      description: "Trouver les capitales des pays",
      question: "Quelle est la capitale de ce pays ?",
    },
    demography: {
      title: "Démographie",
      description: "Trouvez le pays le plus peuplé",
      question: "Quel pays à le plus d'habitants ?",
    },
    borders: {
      title: "Frontières",
      description: "Trouver les pays frontaliers d'un pays",
      question: "Quels sont les pays frontaliers de ce pays ?",
    },
    start: "Jouer",
  },

  game: {
    restart: "Recommencer",
    leave: "Quitter la partie",

    response: {
      population: "habitants",
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

      questions: {
        title: "Questions",
      },

      regions: {
        title: "Continents",
        all: "Tous",
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
