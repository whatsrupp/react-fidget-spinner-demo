export const spinnerConfigs = [
  {
    name: "Space Explorer",
    spinner: {
      emoji: "🚀",
      size: 2,
    },
    bubbles: {
      emoji: "✨ whoosh",
      emoji2: "zoom zoom",
      emoji3: "to infinity",
    },
    sparks: {
      emoji: "🌎",
      emoji2: "🌑",
      emoji3: "⭐",
    },
    vibes: {
      background: "#e6e6ff",
      showAuthor: true,
      author: "Rick",
    },
  },
  {
    name: "Chef's Special",
    spinner: {
      emoji: "👨‍🍳",
      size: 2,
    },
    bubbles: {
      emoji: "bon appetit",
      emoji2: "delicious",
      emoji3: "chef's kiss",
    },
    sparks: {
      emoji: "🍕",
      emoji2: "🍝",
      emoji3: "🥘",
    },
    vibes: {
      background: "#fff5e6",
      showAuthor: true,
      author: "Rick",
    },
  },
  {
    name: "Garden Party",
    spinner: {
      emoji: "🦋",
      size: 2,
    },
    bubbles: {
      emoji: "flutter",
      emoji2: "dance",
      emoji3: "soar high",
    },
    sparks: {
      emoji: "🌸",
      emoji2: "🌺",
      emoji3: "🌼",
    },
    vibes: {
      background: "#e6ffe6",
      showAuthor: true,
      author: "Rick",
    },
  },
  {
    name: "Music Mania",
    spinner: {
      emoji: "🎸",
      size: 2,
    },
    bubbles: {
      emoji: "rock on",
      emoji2: "let's jam",
      emoji3: "feel it",
    },
    sparks: {
      emoji: "🎵",
      emoji2: "🎼",
      emoji3: "🎹",
    },
    vibes: {
      background: "#f2e6ff",
      showAuthor: true,
      author: "Rick",
    },
  },
  {
    name: "Ocean Adventure",
    spinner: {
      emoji: "🐋",
      size: 2,
    },
    bubbles: {
      emoji: "splash",
      emoji2: "bubble",
      emoji3: "swoosh",
    },
    sparks: {
      emoji: "🐠",
      emoji2: "🐡",
      emoji3: "🦈",
    },
    vibes: {
      background: "#e6f9ff",
      showAuthor: true,
      author: "Rick",
    },
  },
  {
    name: "Dad Jokes",
    spinner: {
      emoji: "hi hungry",
      size: 2,
    },
    bubbles: {
      emoji: "i'm dad",
      emoji2: "*sigh*",
      emoji3: "ba dum tss",
    },
    sparks: {
      emoji: "😅",
      emoji2: "🤦",
      emoji3: "😭",
    },
    vibes: {
      background: "#ffd9b3",
      showAuthor: true,
      author: "Rick",
    },
  },
  {
    name: "Existential Crisis",
    spinner: {
      emoji: "why am i",
      size: 2,
    },
    bubbles: {
      emoji: "spinning?",
      emoji2: "what is life",
      emoji3: "help pls",
    },
    sparks: {
      emoji: "🤔",
      emoji2: "😵‍💫",
      emoji3: "🫠",
    },
    vibes: {
      background: "#d9d9d9",
      showAuthor: true,
      author: "Rick",
    },
  },
  {
    name: "Coffee Addict",
    spinner: {
      emoji: "need more",
      size: 2,
    },
    bubbles: {
      emoji: "caffeine",
      emoji2: "must spin",
      emoji3: "faster!!!",
    },
    sparks: {
      emoji: "☕",
      emoji2: "⚡",
      emoji3: "💫",
    },
    vibes: {
      background: "#f2e6d9",
      showAuthor: true,
      author: "Rick",
    },
  },
  {
    spinner: {
      emoji: "🦧",
      size: 2,
    },
    bubbles: {
      emoji: "oo oo",
      emoji2: "oo oo",
      emoji3: "oo oo",
    },
    sparks: {
      emoji: "🥜",
      emoji2: "🍌",
      emoji3: "",
    },
    vibes: {
      background: "#f3d173",
      showAuthor: true,
      author: "Rick",
    },
  },
] as const;

// const spinner = useControls(
//     ControlName.Spinner,
//     {
//       emoji: { value: "🦧", label: "Text/Emoji" },
//       size: { value: 2, min: 0, max: 5, label: "Size" },
//     },
//     { color: colours[0].value }
//   );

//   const bubbles = useControls(
//     ControlName.Bubbles,
//     {
//       emoji: { value: "oo oo ", label: "Text/Emoji" },
//       emoji2: { value: "ee ee", label: "Text/Emoji" },
//       emoji3: { value: "ah ah", label: "Text/Emoji" },
//     },
//     { color: colours[2].value }
//   );

//   const sparks = useControls(
//     ControlName.Sparks,
//     {
//       emoji: { value: "🥜", label: "Text/Emoji" },
//       emoji2: {
//         value: "🍌",
//         label: "Text/Emoji",
//       },
//       emoji3: {
//         value: "",
//         label: "Text/Emoji",
//       },
//     },
//     { color: colours[6].value }
//   );

//   const vibes = useControls(
//     ControlName.Vibes,
//     {
//       background: { value: colours[5].value, label: "Background" },
//       branding: { value: true, label: "Branding" },
//     },
//     { color: colours[3].value }
//   );

/**
 * The above is an example configuration for a fidget spinner.
 *
 * The main spinner is a monkey emoji
 *
 * When you click on the emoji it starts spinning and speeds up as you click it
 *
 * When it spins it shoots out two types of particles
 * sparks and bubbles
 *
 * Bubbles float upwards
 * and sparks shoot out radially
 *
 * The spinner can be an emoji or a short bit of text
 *
 * Bubbles can be an emoji or one or two words
 *
 * Spraks can be an emoji or one or two words
 *
 *
 * The background vibes is the colour of the screen
 *
 * The idea of this app is that people create their own fidget spinners and share them with the world
 *
 * However, we want to make it easy for people to get some ideas and inspiration so we need to provide lots of defaults
 *
 * These defaults will be randomised
 *
 * In this example all the config is centred around the monkey emoji - it spins out bananas and nuts and it's bubbles are monkey noises
 *
 * Ie it is making a statment with its bubbles and sparks
 *
 *
 * Please create 5 different input configurations for the figet spinner that also express something unique
 *
 */
