import {
  emojis,
  companies,
  cryptoTerms,
  cryptoTokens,
  healthcare,
  healthWellness,
  biotech,
  finance,
  legal,
  realEstate,
  construction,
  automotive,
  transportation,
  manufacturing,
  food,
  shipping,
  software,
  hardware,
  gaming,
  pharma,
  travel,
  media,
  materials,
  fashion,
  holidays,
  writingMoods,
  writingStyles,
  writingGenres,
  writingTopics,
  actionVerbs,
  linkingVerbs,
  engineeringVerbs,
  impactVerbs,
  industries,
  adjectives,
  progLanguagues,
  productCategories,
  buzzVerbs,
  techAdjectives,
  buzzAdjectives,
  buzzNouns,
  fortune100,
  popularApps,
  strategyAdjectives,
} from "./ListsAll";

export const allOptions = [
  {
    value: "Popular",
    label: "⭐️ Popular",
    children: [
      {
        value: industries,
        label: "🏭 Industries",
      },
      {
        value: companies,
        label: "🏢 Companies",
      },
      {
        value: cryptoTerms,
        label: "⛓ Crypto Terms",
      },
      {
        value: software,
        label: "💿 Software",
      },
      {
        value: hardware,
        label: "💻 Hardware",
      },
      {
        value: emojis,
        label: "😀 Emojis",
      },
      {
        value: productCategories,
        label: "🛍️ Product Categories",
      },
    ],
  },
  {
    value: "Nouns",
    label: "🔵 Nouns",
    children: [
      {
        value: "Web3/Crypto",
        label: "⛓ Web3/Crypto",
        children: [
          {
            value: cryptoTerms,
            label: "⛓ Crypto Terms",
          },
          {
            value: cryptoTokens,
            label: "₿ Crypto Projects/Tokens",
          },
        ],
      },
      {
        value: "Tech",
        label: "👨🏻‍💻 Tech",
        children: [
          {
            value: software,
            label: "💿 Software",
          },
          {
            value: hardware,
            label: "💻 Hardware",
          },
          {
            value: gaming,
            label: "🎮 Gaming",
          },
          {
            value: progLanguagues,
            label: "💬 Programming Languages",
          },
        ],
      },
      {
        value: "Companies",
        label: "🏢 Companies",
        children: [
          {
            value: companies,
            label: "🏢 Popular Companies ",
          },
          {
            value: fortune100,
            label: "💯 Fortune 100",
          },
          {
            value: popularApps,
            label: "📱 Popular Apps ",
          },
          {
            value: buzzNouns,
            label: "🐝 Corporate Buzzword nouns",
          },
        ],
      },
      {
        value: "Writing",
        label: "✏️ Writing",
        children: [
          {
            value: writingGenres,
            label: "🎭 Writing Genres",
          },
          {
            value: writingMoods,
            label: "😋 Writing Moods",
          },
          {
            value: writingStyles,
            label: "🎨 Writing Styles",
          },
          {
            value: writingTopics,
            label: "📖 Writing Topics",
          },
        ],
      },
      {
        value: "Health",
        label: "🏥 Health",
        children: [
          {
            value: healthcare,
            label: "🏥 Healthcare",
          },
          {
            value: healthWellness,
            label: "🧘 Health/Wellness",
          },
          {
            value: pharma,
            label: "💊 Pharmaceuticals",
          },
        ],
      },
      {
        value: biotech,
        label: "🔬 BioTech",
      },
      {
        value: finance,
        label: "💸 Finance",
      },
      {
        value: shipping,
        label: " 📦 Logistics/Supply Chain",
      },
      {
        value: construction,
        label: "🏗️ Construction",
      },
      {
        value: manufacturing,
        label: "🏭 Manufacturing",
      },
      {
        value: materials,
        label: "🛢 Materials",
      },
      {
        value: realEstate,
        label: "🏘️ Real Estate",
      },
      {
        value: automotive,
        label: "🚗 Automotive",
      },
      {
        value: transportation,
        label: "🚂 Transportation",
      },
      {
        value: legal,
        label: "⚖️ Legal",
      },
      {
        value: food,
        label: "🍔 Food and Beverage",
      },
      {
        value: travel,
        label: "✈️ Travel/Hospitality",
      },
      {
        value: fashion,
        label: "👠 Fashion",
      },
      {
        value: media,
        label: "🎬 Media/Entertainment",
      },
      {
        value: holidays,
        label: "🎄 Holidays",
      },
    ],
  },
  {
    value: "Verbs",
    label: "🟢 Verbs",
    children: [
      {
        value: actionVerbs,
        label: "🏃 Action Verbs",
      },
      {
        value: impactVerbs,
        label: "💥 High Impact Verbs",
      },
      {
        value: buzzVerbs,
        label: "🐝 Corporate Buzzword Verbs",
      },
      {
        value: engineeringVerbs,
        label: "⌨️ Engineering Verbs",
      },
      {
        value: linkingVerbs,
        label: "🔗 Linking Verbs",
      },
    ],
  },
  {
    value: "Adjectives",
    label: "🟠 Adjectives",
    children: [
      {
        value: adjectives,
        label: "💪 Descriptive Adjectives",
      },
      {
        value: techAdjectives,
        label: "👨🏻‍💻 Tech Adjectives",
      },
      {
        value: strategyAdjectives,
        label: "🗺️ Strategic Adjectives",
      },
      {
        value: buzzAdjectives,
        label: "🐝 Corporate Buzzword Adjectives",
      },
    ],
  },
];
