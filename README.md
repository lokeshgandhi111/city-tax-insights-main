# Property Tax Analytics Dashboard — UPYOG Multi-Tenant Platform

A modern, responsive Property Tax Analytics Dashboard built for the UPYOG multi-tenant platform serving 10 Indian cities. The platform displays comprehensive KPIs, interactive visualizations, and an AI-powered chat assistant for data insights.



---

##  Features

###  Task 1: KPI Dashboard 
- **4 Interactive KPI Cards**: Total Properties, Approved, Rejected, and Total Collection
- **Live Tenant Filter**: Select from 10 cities or view all data at once
- **Real-time Updates**: All metrics update instantly on filter change
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

###  Task 2: Comparison Charts 
- **Bar Chart**: Total collection per city with gradient styling
- **Donut Chart**: Property distribution across cities
- **Stacked Bar Chart**: Approved vs Rejected vs Pending breakdown per city
- **Horizontal Ranking**: Top cities by collection value

###  Task 3: AI Chat Assistant 
- **Google Gemini Integration**: Real AI-powered responses to natural language queries
- **Context-Aware**: Answers are based on live dashboard data
- **Smart Suggestions**: Pre-filled questions for quick queries
- **Error Handling**: Graceful fallbacks for API issues

###  Additional Quality
- **Type-Safe TypeScript**: Full end-to-end type safety
- **Modern UI/UX**: TailwindCSS + shadcn/ui components
- **Performance Optimized**: React hooks, memoization, efficient rendering
- **Production Ready**: ESLint, Prettier, and best practices

---

##  Quick Start

### Prerequisites
- Node.js 18+ 
- npm or bun package manager
- Google Gemini API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lokeshgandhi111/city-tax-insights.git
   cd city-tax-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   **How to get a free Gemini API key:**
   - Go to [Google AI Studio](https://aistudio.google.com)
   - Click "Get API Key"
   - Create a new API key for free
   - Copy and paste it into your `.env` file
   
    **Important**: `.env` is automatically ignored by Git (see `.gitignore`). Never commit this file.

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:8080) in your browser.

---

##  Dataset

The dashboard loads **1,000 property records** from `src/data/properties.json`. The data includes:

| Field | Type | Example |
|-------|------|---------|
| `property_id` | string | UPYOG-DEL-0001 |
| `tenant` | string | Delhi |
| `owner_name` | string | Ramesh Kumar |
| `property_type` | string | Residential |
| `ward` | string | Ward A |
| `area_sqft` | number | 2400 |
| `status` | string | Approved/Rejected/Pending |
| `annual_tax_inr` | number | 18450.50 |
| `collection_inr` | number | 18450.50 |
| `registration_date` | string | 2022-03-15 |
| `floor_count` | number | 2 |
| `address` | string | 42, Sector 12, Delhi |

**Cities Covered** (10 tenants):
Delhi, Mumbai, Pune, Bengaluru, Chennai, Hyderabad, Ahmedabad, Kolkata, Jaipur, Lucknow

---

##  Project Structure

```
src/
├── components/          # React components
│   ├── ChatAssistant.tsx    # AI chat interface
│   ├── Charts.tsx           # Data visualizations
│   ├── ChatMessage.tsx      # Message display
│   ├── KPICard.tsx          # KPI card component
│   ├── Navbar.tsx           # Header
│   ├── TenantFilter.tsx     # City selector
│   └── ui/                  # shadcn/ui components
├── data/                # Static data
│   └── properties.json      # 1000 property records
├── lib/                 # Utilities
│   ├── error-capture.ts
│   ├── error-page.ts
│   ├── gemini.ts            # Gemini API integration 
│   └── utils.ts
├── utils/               # Helpers
│   ├── analytics.ts         # KPI calculations
│   ├── helpers.ts           # Format utilities
│   └── use-mobile.tsx
├── routes/              # Page routes
│   ├── __root.tsx
│   └── index.tsx            # Dashboard page
├── router.tsx           # Route configuration
└── styles.css           # Global styles
```

---

##  Available Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:5173

# Build
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # ESLint check
npm run format       # Format with Prettier

# Package Manager
npm install          # Install dependencies
```

---

##  AI Chat Assistant

The chat assistant is powered by **Google Gemini 1.5 Flash**, a free and powerful AI model.

### Example Questions

The assistant can answer questions like:
- "Which city has the highest total collection?"
- "How many properties are rejected in Mumbai?"
- "What percentage of Delhi properties are approved?"
- "Which city has the most pending properties?"
- "Compare total registrations between Pune and Jaipur."
- "Show me the status breakdown for Bengaluru."

### How It Works

1. **Data Contextualization**: Dashboard data is summarized and sent to the API
2. **Natural Language Query**: User question is sent to Gemini
3. **AI Response**: Model generates accurate, data-informed answer
4. **Display**: Response appears in chat interface with streaming effect

### API Configuration

```typescript
// src/lib/gemini.ts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

The implementation includes:
-  Error handling for rate limits and network issues
-  API key validation at startup
-  Graceful fallbacks
-  Response caching (future enhancement)

---



---


##  Tech Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: TanStack Router
- **Styling**: TailwindCSS + shadcn/ui
- **Charts**: Recharts
- **AI**: Google Gemini API
- **Build**: Vite + Cloudflare Wrangler
- **Package Manager**: Bun / npm
- **Code Quality**: ESLint + Prettier

---

##  Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | `AIza...` |

**Note**: All `VITE_*` prefixed variables are accessible in the browser. Avoid putting sensitive data here.

---

##  Troubleshooting

### Chat Assistant Not Working

**Problem**: "API key not configured"
- **Solution**: Ensure `.env` file exists and has `VITE_GEMINI_API_KEY=your_key`
- Restart dev server: `npm run dev`

**Problem**: "Rate limit reached"
- **Solution**: Gemini free tier has rate limits. Wait a moment and retry.

**Problem**: Network error
- **Solution**: Check internet connection and API key validity

### Properties Not Loading

- Verify `src/data/properties.json` exists
- Check browser console for errors
- Ensure React dev server is running

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run build
```

---

##  Resources

- [Google Gemini API Docs](https://ai.google.dev)
- [TanStack Router Docs](https://tanstack.com/router)
- [Recharts Documentation](https://recharts.org)
- [TailwindCSS Docs](https://tailwindcss.com)

---

##  License

This project is created for NUDM UPYOG Platform Assessment 2026.

---

##  Author

**Lokesh Gandhi Modalavalasa**  
NUDM Intern Assessment 2026

---

##  Support

For questions or issues:
- Check the [Troubleshooting](#-troubleshooting) section
- Review environment variable setup
- Verify API key is valid and has quota remaining

---

**Last Updated**: May 22, 2026  
**Version**: 1.0.0
