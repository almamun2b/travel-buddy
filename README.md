# Travel Buddy

A modern full-stack travel companion matching platform that connects travelers worldwide, enabling them to find compatible travel partners, share experiences, and create unforgettable journeys together.

## 🌟 Summary

Travel Buddy is a comprehensive web application built with Next.js 15, TypeScript, and Tailwind CSS that helps travelers connect with like-minded individuals. The platform features user authentication, profile management, travel plan creation and matching, review systems, and subscription management - all designed to make travel planning and companion finding seamless and enjoyable.

## 📝 Description & Introduction

Travel Buddy addresses the common challenge of finding reliable travel companions. Whether you're planning a solo adventure and want company, or looking to join existing travel plans, our platform makes it easy to connect with verified travelers who share your interests and travel style.

### Key Features:

- **User Authentication**: Secure login, registration, email verification, and password management
- **Profile Management**: Detailed traveler profiles with interests, visited countries, and verification badges
- **Travel Plans**: Create, browse, and join travel plans with detailed information
- **Smart Matching**: AI-powered matching algorithm to find compatible travel partners
- **Review System**: Build trust through community reviews and ratings
- **Admin Dashboard**: Comprehensive admin tools for user and content management
- **Subscription Plans**: Premium features with flexible pricing options

## 🚀 How to Run This Project Locally

### Prerequisites

- Node.js 18+
- npm or pnpm
- Git

### Frontend Setup

1. **Clone the repository**

```bash
git clone https://github.com/almamun2b/travel-buddy.git
cd travel-buddy
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**

```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Clone the backend repository**

```bash
git clone https://github.com/almamun2b/travel-buddy-api.git
cd travel-buddy-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**
   Create a `.env` file:

```env
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
PORT=8000
```

4. **Run the backend server**

```bash
npm run dev
```

## 🎯 Project Aim & Objectives

### Primary Goals:

1. **Connect Travelers**: Create a global community where travelers can find reliable companions
2. **Enhance Safety**: Implement verification systems and reviews to build trust
3. **Simplify Planning**: Make travel planning collaborative and efficient
4. **Build Community**: Foster meaningful connections between travel enthusiasts
5. **Promote Responsible Travel**: Encourage safe and respectful travel practices

### Technical Objectives:

- Modern, responsive UI with excellent user experience
- Scalable architecture supporting global user base
- Real-time features for enhanced interactivity
- Robust security and data protection
- SEO optimization for better discoverability

## 💡 Use Cases & Applications

### For Travelers:

- **Solo Travelers**: Find companions for safer and more enjoyable trips
- **Group Organizers**: Recruit members for group travel plans
- **Adventure Seekers**: Connect with like-minded adventure enthusiasts
- **Cultural Exchange**: Meet locals and travelers from different backgrounds

### For Travel Planning:

- **Trip Collaboration**: Plan trips together with shared itineraries
- **Cost Sharing**: Split expenses and find budget-friendly travel options
- **Skill Sharing**: Find companions with specific skills (languages, photography, etc.)
- **Safety**: Travel with verified and reviewed companions

### For Community Building:

- **Travel Blogging**: Share experiences and build your travel profile
- **Networking**: Connect with travelers in your destination cities
- **Local Insights**: Get authentic travel tips from community members

## 🔗 Live URLs & Repository

### 🌐 Live Applications

- **Frontend**: [https://travel-buddy-mamun.vercel.app/](https://travel-buddy-mamun.vercel.app/)
- **Backend API**: [https://travel-buddy-api-5xvg.onrender.com/](https://travel-buddy-api-5xvg.onrender.com/)

### 📚 Source Code

- **Frontend Repository**: [https://github.com/almamun2b/travel-buddy](https://github.com/almamun2b/travel-buddy)
- **Backend Repository**: [https://github.com/almamun2b/travel-buddy-api](https://github.com/almamun2b/travel-buddy-api)

## 🛠️ Technology Stack

### Frontend:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks and server components
- **Authentication**: NextAuth.js
- **API Integration**: Custom fetch utilities

### Backend:

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **File Upload**: Cloudinary
- **Email Service**: Nodemailer

### Deployment:

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: PostgreSQL (Render)
- **File Storage**: Cloudinary

## 🌟 Key Features in Detail

### User Management

- Email verification and password reset
- Profile customization with travel interests
- Verification badges and trust scores
- Review and rating system

### Travel Planning

- Create detailed travel plans with dates, budget, and activities
- Browse and filter travel plans by destination, dates, and interests
- Request to join existing travel plans
- Manage travel requests and approvals

### Matching Algorithm

- Smart matching based on travel preferences
- Compatibility scoring system
- Interest-based recommendations
- Location and date matching

### Admin Features

- User management and moderation
- Travel plan approval workflow
- Analytics and reporting
- Content moderation tools

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Issues**: Report bugs and request features via GitHub Issues
- **Email**: [Your contact email]
- **Live Chat**: Available on the platform

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this platform
- Special thanks to the travel community for feedback and suggestions
- Built with ❤️ for travelers around the world

---

**Start your travel journey today with Travel Buddy - where adventures meet companions!** 🌍✈️
