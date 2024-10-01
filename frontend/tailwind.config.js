/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		colors: {
			primary: '#BC002D',        // Deep red (inspired by the Japanese flag)
			secondary: '#D4AF37',      // Goldish yellow (symbolizing honor and achievement)
			background: '#F5F5DC',     // Beige (neutral, calming background like tatami mats)
			cardBg: '#FFFFFF',         // White (clean, minimal background for cards)
			primaryText: '#2C1B18',    // Dark brown (evoking wood and tradition)
			secondaryText: '#704214',  // Medium brown (for subtitles or secondary text)
			border: '#D9C3A3',         // Light brown (soft borders, resembling wood or paper screens)
			hoverPrimary: '#A3001E',   // Darker red (for hover states on primary elements)
			muted: '#A89988',          // Muted brown (for disabled text or subtle highlights)
			accent: '#FFDB58',         // Light gold (for special accents or buttons)
		},
		
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
