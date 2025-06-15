
# Momentum - Gamified Productivity Platform

A modern, gamified productivity platform built with React, TypeScript, and Tailwind CSS. Transform your goals into an engaging, game-like experience with beautiful UI and comprehensive tracking features.

## 🚀 Features

### Core Functionality
- **Goal Management**: Set, track, and achieve personal and professional goals
- **Project Organization**: Organize tasks and projects with intuitive boards
- **Personal Goals**: Dedicated space for personal development tracking
- **Investment Tracking**: Monitor financial goals and investments with multi-currency support (USD, EUR, INR)
- **Calendar Integration**: Schedule and track goal-related activities
- **Settings Management**: Customize your productivity experience with currency preferences

### Gamification Elements
- **Achievement System**: Unlock rewards and celebrate milestones
- **Progress Tracking**: Visual progress indicators with animations
- **Quest-like Goals**: Transform objectives into engaging quests
- **Badge System**: Earn badges for completing objectives
- **Level Progression**: Advance through productivity levels

### User Interface
- **Modern Landing Page**: Stunning night sky theme with animated elements
- **Responsive Design**: Optimized for all device sizes
- **Dark Theme**: Premium dark theme with glass morphism effects
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Premium Typography**: Multiple font families for enhanced readability

## 🎨 Design System

### Color Palette

#### Primary Colors
```css
/* Night Sky Theme */
--background: 26 26 46 (pixel-dark)
--foreground: 255 255 255 (white)
--card: 22 33 62 (pixel-darker)
--primary: 255 255 255 (white)
--secondary: 107 114 142 (gray)
```

#### Accent Colors
```css
/* Neon Gaming Colors */
--neon-green: #00FF41
--neon-blue: #00D4FF
--neon-pink: #FF0080
--neon-yellow: #FFFF00
--neon-purple: #8000FF
--arcade-orange: #FF6B35
--retro-cyan: #00FFFF
```

#### Semantic Colors
```css
--destructive: 239 68 68 (red-500)
--muted: 22 33 62
--accent: 107 114 142
--border: 107 114 142
```

### Typography

#### Font Families
- **Primary**: Inter - Clean, modern sans-serif for body text
- **Display**: Playfair Display - Elegant serif for headings
- **Brand**: Mooxy - Unique serif for brand elements
- **Code**: Monaco, Consolas - Monospace for technical content

#### Font Sizes
- **Hero**: text-9xl (144px) - Main landing page titles
- **Display**: text-6xl to text-7xl (60-72px) - Section headings
- **Heading**: text-3xl to text-4xl (30-36px) - Component titles
- **Body**: text-lg to text-xl (18-20px) - Main content
- **Caption**: text-base (16px) - Supporting text

### Layout System

#### Container Sizes
- **Max Width**: 1400px (2xl breakpoint)
- **Padding**: 2rem default container padding
- **Responsive Breakpoints**: sm, md, lg, xl, 2xl

#### Spacing Scale
- **Micro**: 0.25rem to 1rem (1-4)
- **Small**: 1.5rem to 3rem (6-12)
- **Medium**: 4rem to 6rem (16-24)
- **Large**: 8rem to 12rem (32-48)
- **XL**: 16rem to 20rem (64-80)

### Visual Effects

#### Glass Morphism
```css
.glass-morphism {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

#### Gradients
- **Text Gradient**: white → gray-100 → white
- **Background**: Radial and linear gradients for depth
- **Hover Effects**: Subtle color transitions

#### Animations
- **Pixel Glow**: Pulsing neon effects
- **Fade Transitions**: Smooth content transitions
- **Scale Effects**: Interactive hover animations
- **Progress Fill**: Animated progress indicators
- **Badge Bounce**: Playful achievement animations

## 🛠 Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript**: Full type safety and developer experience
- **Vite**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality React components
- **Tailwind Animate**: Advanced animation utilities
- **Lucide React**: Beautiful SVG icons

### State Management & Data
- **React Query (TanStack)**: Server state management
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation
- **Date-fns**: Date manipulation utilities
- **Zustand**: Lightweight state management

### Navigation & Routing
- **React Router DOM**: Client-side routing
- **React Resizable Panels**: Flexible layouts

### Charts & Visualization
- **Recharts**: Responsive chart library
- **Embla Carousel**: Touch-friendly carousels

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Class Variance Authority**: Component variant handling

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   ├── Dashboard.tsx    # Landing page component
│   ├── AppLayout.tsx    # Main app layout
│   ├── AppSidebar.tsx   # Navigation sidebar
│   └── ...
├── pages/               # Route components
│   ├── Index.tsx        # Home page
│   ├── App.tsx          # Main app page
│   ├── Goals.tsx        # Goals management
│   ├── Projects.tsx     # Project boards
│   ├── Investment.tsx   # Investment tracking
│   └── ...
├── stores/              # Zustand state stores
│   ├── dashboardStore.ts # Global dashboard state
│   ├── investmentStore.ts # Investment data management
│   └── ...
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── styles/              # Global styles
└── types/               # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd momentum-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🎯 Usage

### Navigation
- **Landing Page**: Welcome screen with feature overview
- **Dashboard**: Main productivity hub
- **Goals**: Personal and professional goal tracking
- **Projects**: Task and project management
- **Investment**: Financial goal and investment tracking with multi-currency support
- **Calendar**: Schedule and timeline view
- **Settings**: Customize your experience including currency preferences

### Key Features Usage

#### Setting Goals
1. Navigate to Goals page
2. Click "Add Goal" button
3. Fill in goal details and metrics
4. Track progress with visual indicators

#### Managing Projects
1. Go to Projects page
2. Create new project boards
3. Add tasks and organize workflows
4. Monitor project completion

#### Investment Tracking
1. Access Investment dashboard
2. Add investments and set financial goals
3. Monitor portfolio performance
4. Switch between currencies (USD, EUR, INR) in Settings

#### Currency Management
1. Go to Settings page
2. Select preferred currency (USD, EUR, INR)
3. Save preferences to apply across all financial displays

## 🎨 Customization

### Theme Customization
The design system uses CSS custom properties for easy theming:

```css
:root {
  --background: 26 26 46;
  --foreground: 255 255 255;
  --primary: 255 255 255;
  /* Modify these values to customize colors */
}
```

### Component Styling
All components use Tailwind CSS classes and can be customized by modifying the utility classes or extending the Tailwind configuration.

### Animation Customization
Animations can be customized in `tailwind.config.ts`:

```typescript
keyframes: {
  'custom-animation': {
    '0%': { /* initial state */ },
    '100%': { /* final state */ }
  }
}
```

## 🔧 Configuration

### Tailwind Configuration
The `tailwind.config.ts` file contains:
- Custom color palette
- Font family definitions
- Animation keyframes
- Component variants
- Responsive breakpoints

### Vite Configuration
The `vite.config.ts` file handles:
- Build optimization
- Development server settings
- Path aliases
- Plugin configuration

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

## 🚀 Deployment

### Lovable Platform
The easiest way to deploy is using the Lovable platform:
1. Click "Publish" in the Lovable editor
2. Your app will be deployed to a Lovable subdomain
3. Connect a custom domain in project settings (paid plan required)

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure your server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support & Contact

For support, questions, or collaboration:

### Development Resources
- Check the [Lovable Documentation](https://docs.lovable.dev/)
- Join the [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Watch the [Lovable YouTube Tutorials](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)

### Connect with the Developer
- **LinkedIn**: [Madhusudan Patnaik](https://www.linkedin.com/in/madhusudanpatnaik/)
- **X (Twitter)**: [@madhusudan91263](https://x.com/madhusudan91263)

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Mobile application
- [ ] Integration with external tools
- [ ] Advanced gamification features
- [ ] Social features and sharing
- [ ] Offline functionality
- [ ] Advanced security features
- [ ] API for third-party integrations
- [ ] Real-time currency exchange rates
- [ ] Advanced investment analytics

---

Built with ❤️ using [Lovable](https://lovable.dev) - The AI-powered web app builder.
