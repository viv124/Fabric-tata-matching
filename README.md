# Tata Matching Center - Visual Fabric Gallery

A premium fabric boutique website showcasing exquisite textiles with social media integration and admin management capabilities.

## About

Tata Matching Center is Bilimora's premier fabric boutique, offering a curated collection of premium textiles with an integrated social media showcase on Instagram, Pinterest, and YouTube.

## Features

- **Visual Fabric Gallery**: Browse and filter fabrics by color, pattern, material, and occasion
- **Social Media Integration**: Share fabrics directly to Instagram, Pinterest, and YouTube
- **Admin Panel**: Manage fabric collections, banners, and featured items
- **Mobile Responsive**: Optimized for all devices with mobile-specific navigation
- **Festival Banners**: Seasonal promotional displays
- **Advanced Filtering**: Enhanced search and filter capabilities

## Technologies Used

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Supabase (PostgreSQL database)
- **Authentication**: Supabase Auth
- **Build Tool**: Vite
- **Deployment**: Static site hosting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd visual-fabric-gallery
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── AdminPanel.tsx  # Admin management interface
│   ├── FabricGallery.tsx # Main fabric display
│   └── ...
├── pages/              # Page components
├── contexts/           # React contexts (Auth)
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
└── lib/                # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database Schema

The project uses Supabase with the following main tables:
- `fabric_items` - Fabric inventory
- `collections` - Fabric collections/categories
- `banners` - Promotional banners
- `users` - User authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Tata Matching Center.

## Contact

For inquiries about Tata Matching Center, please visit our store in Bilimora or contact us through our social media channels.