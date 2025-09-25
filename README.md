# MarketApp - A Manifest-Powered Marketplace

This is a fully functional marketplace application built with a React frontend and a Manifest backend. It allows users to sign up, log in, and list products for sale. The public can view all products currently for sale.

## Core Features

- **User Authentication**: Secure sign-up and login powered by Manifest's built-in auth.
- **Product Management**: Authenticated users can create, view, and delete their product listings.
- **Image Uploads**: Product images are handled seamlessly by Manifest's file storage feature.
- **Public Marketplace**: A landing page that displays all products available for sale to any visitor.
- **Role-Based Access Control**: Strict ownership rules ensure users can only manage their own listings.
- **Automatic Admin Panel**: A complete admin dashboard is available at `/admin` for managing all users and products.

## Getting Started

### Prerequisites

- Node.js and npm
- A Manifest account and the Manifest CLI

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

### Backend Setup (with Manifest)

1. **Save the `manifest.yml` file** provided in this project.

2. **Deploy the backend:**
   ```bash
   mnfst deploy
   ```

Manifest will provide you with an API URL. You may need to configure this in the frontend's environment variables if it differs from the default.

## Admin Panel

Access the full-featured admin panel by navigating to `/admin` on your deployed application's URL.

- **Default Admin Credentials:**
  - **Email:** `admin@manifest.build`
  - **Password:** `admin`

You can use the admin panel to manage users, view all products, and oversee the entire application.

## Default User Account

For quick testing, a sample user can be created via the admin panel. For example:
- **Email:** `user@example.com`
- **Password:** `password`
