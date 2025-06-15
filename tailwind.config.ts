
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced modern color palette
				'glass': {
					50: 'rgba(255, 255, 255, 0.05)',
					100: 'rgba(255, 255, 255, 0.10)',
					200: 'rgba(255, 255, 255, 0.15)',
					300: 'rgba(255, 255, 255, 0.20)',
					400: 'rgba(255, 255, 255, 0.25)',
					500: 'rgba(255, 255, 255, 0.30)',
				},
				'neon-green': '#00FF41',
				'neon-blue': '#00D4FF',
				'neon-pink': '#FF0080',
				'neon-yellow': '#FFFF00',
				'neon-purple': '#8000FF',
				'pixel-dark': '#1a1a2e',
				'pixel-darker': '#16213e',
				'arcade-orange': '#FF6B35',
				'retro-cyan': '#00FFFF'
			},
			fontFamily: {
				'pixel': ['Monaco', 'Consolas', 'Courier New', 'monospace'],
				'retro': ['Orbitron', 'monospace'],
				'premium': ['Playfair Display', 'serif'],
				'mooxy': ['Mooxy', 'serif'],
				'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				'display': ['Space Grotesk', 'Outfit', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				pixel: '0px',
				'xl': '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pixel-glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 15px #00FF41'
					},
					'50%': {
						boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41'
					}
				},
				'progress-fill': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				'badge-bounce': {
					'0%, 20%, 53%, 80%, 100%': {
						transform: 'translateY(0px)'
					},
					'40%, 43%': {
						transform: 'translateY(-15px)'
					},
					'70%': {
						transform: 'translateY(-7px)'
					},
					'90%': {
						transform: 'translateY(-3px)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						opacity: '0.6',
						filter: 'brightness(1)'
					},
					'50%': { 
						opacity: '1',
						filter: 'brightness(1.2)'
					}
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'slide-up': {
					from: {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					from: {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pixel-glow': 'pixel-glow 2s ease-in-out infinite',
				'progress-fill': 'progress-fill 1s ease-out',
				'badge-bounce': 'badge-bounce 1s ease-in-out',
				'float': 'float 8s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 10s ease infinite',
				'slide-up': 'slide-up 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out'
			},
			backgroundImage: {
				'pixel-grid': 'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,255,65,0.1) 1px, rgba(0,255,65,0.1) 2px), repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,65,0.1) 1px, rgba(0,255,65,0.1) 2px)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			backdropBlur: {
				'xs': '2px',
				'3xl': '64px',
				'4xl': '80px'
			},
			boxShadow: {
				'3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
				'glow': '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(99, 102, 241, 0.3), 0 0 80px rgba(147, 51, 234, 0.2)',
				'glow-green': '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(16, 185, 129, 0.3)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
				'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
