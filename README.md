# 🎮 Pokémon Team Manager

A modern web application built with Next.js, React, TypeScript, and Tailwind CSS that allows users to search for Pokémon and build their dream team using real data from the PokéAPI.

## ✨ Features

### 🔍 Pokémon Search
- Search Pokémon by name (e.g., "pikachu", "charizard")
- Real-time search with loading states
- Error handling for invalid searches
- Beautiful Pokémon cards with official artwork

### 🏆 Team Management
- Add Pokémon to your team (maximum 6 Pokémon)
- Prevent duplicate Pokémon in the team
- Remove Pokémon from the team
- Persistent team storage using localStorage

### 📊 Team Statistics
- Total number of unique types covered
- Average base experience of team members
- Visual display of all types in the team
- Real-time statistics updates

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Type-based color coding for Pokémon types
- Intuitive user interface

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **API**: PokéAPI (https://pokeapi.co/)
- **Icons**: Next.js Image component with optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon-team-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── PokemonCard.tsx # Pokémon display card
│   ├── PokemonSearch.tsx # Search functionality
│   └── TeamSidebar.tsx # Team management sidebar
├── hooks/             # Custom React hooks
│   ├── useTeam.ts     # Team state management
│   └── usePokemonSearch.ts # Search state management
├── types/             # TypeScript type definitions
│   └── pokemon.ts     # Pokémon data types
└── utils/             # Utility functions
    ├── pokemonApi.ts  # PokéAPI integration
    └── teamUtils.ts   # Team management utilities
```

## 🎯 Core Functionality

### Pokémon Search
- Uses the PokéAPI to fetch real Pokémon data
- Supports search by name with error handling
- Displays comprehensive Pokémon information including:
  - Official artwork
  - Name and ID
  - Types with color coding
  - Height, weight, and base experience
  - Stats

### Team Management
- Maximum team size of 6 Pokémon
- Duplicate prevention
- Add/remove functionality
- Persistent storage using localStorage
- Real-time team statistics

### Team Statistics
- **Total Types**: Count of unique Pokémon types in the team
- **Average Base Experience**: Mean base experience of all team members
- **Types Covered**: Visual display of all types with color coding

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Type Colors**: Each Pokémon type has its own color scheme
- **Gradient Backgrounds**: Beautiful visual appeal
- **Smooth Animations**: Loading states and transitions
- **Modern UI**: Clean, intuitive interface

## 🔧 Customization

### Adding New Features
- Easy to extend with new Pokémon data fields
- Modular component architecture
- Type-safe development with TypeScript

### Styling
- Tailwind CSS for rapid styling
- Custom color palette for Pokémon types
- Responsive design utilities

## 🚀 Deployment

The app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Self-hosted**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling utilities
- The Pokémon Company for the Pokémon franchise

---

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS 