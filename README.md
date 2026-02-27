# Mise en Place — Your AI Chef

A Next.js 14 application that converts the original single-page HTML "Mise en Place — Your AI Chef" into a modern, deployable web application with authentication, database storage, and API routes.

## Features

- **Chef's Table**: Generate Michelin-level recipes based on skill level, occasion, and cuisine
- **Voice Chef**: AI-powered voice assistant for cooking guidance with Web Speech API
- **Course Pairing**: Complete dinner menu generation with AI analysis of flavor progression
- **Recipe Cards**: Beautiful, shareable recipe cards that can be downloaded as PNG
- **Authentication**: Google OAuth integration with NextAuth.js
- **Database**: PostgreSQL with Prisma ORM for storing user recipes
- **API Routes**: Secure backend for Claude AI integration and speech-to-text processing
- **Vercel Ready**: Optimized for deployment on Vercel

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling (maintaining original dark culinary aesthetic)
- **NextAuth.js** for authentication
- **Prisma** with PostgreSQL for database
- **Claude AI API** for recipe generation
- **Web Speech API** for voice functionality

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cheftable-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/cheftable?schema=public"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Claude AI
   CLAUDE_API_KEY="your-claude-api-key"
   ```

4. **Set up database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Base URL for your application
- `NEXTAUTH_SECRET`: Secret key for NextAuth (generate with `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `CLAUDE_API_KEY`: Anthropic Claude API key

### Optional
- `NODE_ENV`: Set to "production" for production builds

## Database Schema

The application uses Prisma ORM with the following models:

- **User**: Stores user information from Google OAuth
- **Account**: Stores OAuth account details
- **Session**: Manages user sessions
- **Recipe**: Stores user-generated recipes with full recipe data

## API Routes

- `POST /api/generate`: Proxy to Claude AI for recipe generation
- `POST /api/speech-to-text`: Speech-to-text processing (currently client-side fallback)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── generate/      # Claude AI proxy
│   │   └── speech-to-text/ # Speech processing
│   ├── globals.css        # Global styles
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── chef-table.tsx     # Chef's Table section
│   ├── voice-chef.tsx     # Voice Chef section
│   ├── course-pairing.tsx # Course Pairing section
│   ├── recipe-cards.tsx   # Recipe Cards section
│   └── ui/               # UI components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client
└── pages/                # API routes (legacy)

prisma/
└── schema.prisma         # Database schema

public/                   # Static assets
```

## Deployment

### Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

- Set all required environment variables in Vercel dashboard
- Configure PostgreSQL database (e.g., from Supabase, Railway, or Neon)
- Update `NEXTAUTH_URL` to your production URL

## Development

### Running Locally

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

### Database Migrations

```bash
# Create new migration
npx prisma migrate dev

# Push to database (for production)
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## Security

- API keys are kept server-side and never exposed to the client
- NextAuth.js handles secure authentication
- Input validation and sanitization for all API endpoints
- CORS protection enabled

## Browser Support

- Modern browsers with Web Speech API support (Chrome recommended for voice features)
- Fallback to text input for browsers without speech recognition

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the [Issues](https://github.com/your-repo/issues) section
- Create a new issue for bugs or feature requests