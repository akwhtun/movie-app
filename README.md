# Next.js Movie App

This is a Next.js movie application that uses the TMDb API. The application allows users to view, search, and filter movies. Authenticated users can add movies to their favorite list and view or remove them later. Admins can manage users.

## Features

- View all movies with pagination
- Search for movies
- Filter movies by upcoming and top-rated
- Filter movies by genre
- View movie details (rating, cast, etc.)
- Add movies to a favorite list (authentication required)
- Google OAuth for user authentication
- Store user data in MongoDB
- Authenticated users can view and remove favorite movies
- Admin can view and remove users
- Responsive design using Tailwind CSS

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation
- **TMDb API**: API for movie data
- **MongoDB**: NoSQL database for storing user data
- **NextAuth**: Authentication for Next.js
- **Tailwind CSS**: Utility-first CSS framework for styling

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account
- TMDb API key
- Google OAuth credentials

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/akwhtun/movie-app.git
    cd movie-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your environment variables:
    ```env
    NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

