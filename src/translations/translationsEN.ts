export const translationsEN = {
  language: {
    fra: "French",
    en: "English",
    spa: "Spanish",
  },

  menu: {
    home: "Home",
    study: "Study",
    quiz: "Quiz",
  },

  home: {
    catchPhrase: "The quiz that allows you to test your knowledge of the nations of the world.",
  },

  didYouKnow: {
    title: "Did you know?",

    sentence: {
      capital: "The capital of {{country}} is {{capital}}.",
      population_country: "The population of {{country}} is {{population}} inhabitants.",
      population_country_biggest:
        "The country with the most inhabitants is {{country}} with {{population}} inhabitants.",
      population_continent:
        "{{population_continent}} people live in {{continent}}, which is {{population_continent_calc}}% of the world population.",
      area_biggest: "The largest country is {{country}} with {{area_biggest}} km².",
      independent:
        "In the world, {{independent}} territories have not yet claimed their independence, which is {{independent_calc}}% of them.",
      unMember:
        "{{unMember_sum}} countries in the world are members of the UN, which is {{unMember_calc}}% of the countries.",
      default: "There are {{countries}} territories in the world.",
    },

    nextInfo: "Teach me something else!",
  },

  goToStudy: {
    title: "Study the world!",
    description:
      "Learn the flags, capitals, demography, and many other information about the countries of the world.",
    button: "I want to study!",
  },

  study: {
    infoSheet: "Info sheet",
    noResult: "No country matches your search criteria.",
  },

  searchBar: {
    results: {
      none: "No country found",
      one: "1 country found",
      many: "{{results}} countries found",
    },
    sort: {
      label: "Sort by",
      options: {
        default: "Select",
        name_ascending: "Name (A-Z)",
        name_descending: "Name (Z-A)",
        population_ascending: "Population (1-9)",
        population_descending: "Population (9-1)",
      },
    },
    region: {
      label: "Continent",
      options: {
        default: "All",
        africa: "Africa",
        americas: "Americas",
        asia: "Asia",
        europe: "Europe",
        oceania: "Oceania",
      },
    },
    population: {
      label: "Population",
      options: {
        default: "All",
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
    placeholder: "Search a country",
    reset: "Reset filters",
  },

  quizList: {
    title: "Choose your quiz",

    flags: {
      title: "Flags",
      description: "Find the flags of the countries",
    },
    capitals: {
      title: "Capitals",
      description: "Find the capitals of the countries",
    },
    demography: {
      title: "Demography",
      description: "Find the most populated country",
    },
    borders: {
      title: "Borders",
      description: "Find the bordering country",
    },
    areas: {
      title: "Areas",
      description: "Find the largest country",
    },

    start: "Play",
  },

  game: {
    restart: "Restart",
    leave: "Leave the game",

    questions: {
      flags: "Which country is this flag from?",
      capitals: "What is the capital of this country?",
      demography: "Which country has the most inhabitants?",
      borders: "Which country is bordering this one?",
      areas: "Which country is the largest?",
    },

    response: {
      population: "inhabitants",
      area: "km²",
    },

    result: {
      description: {
        zeroPoints: "You have no points.",
        onePoint: "You have one point.",
        manyPoints: "You have {{score}} points.",
      },

      restart: "Play again",
      another: "Other quiz",
    },
  },

  modale: {
    settings: {
      title: "Settings",

      difficulty: {
        title: "Difficulty",
        kid: "Kid",
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
        expert: "Expert",
      },

      length: {
        title: "Questions",
      },

      region: {
        title: "Continents",
        all: "All",
        africa: "Africa",
        americas: "Americas",
        asia: "Asia",
        europe: "Europe",
        oceania: "Oceania",
      },

      start: "Start the game",
    },

    game: {
      description: {
        restart: "Are you sure you want to restart the quiz ?<br>(Your progress will be lost)",
        leave: "Are you sure you want to leave the quiz ?<br>(Your progress will be lost)",
      },
      accept: "Yes",
      decline: "No",
    },
  },
};
