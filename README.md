# Dine Craft - Restaurant Management Website 🍽️

## Live Site

[Visit Dine Craft](https://fast-art-409718.web.app/)

---

## Project Overview

Dine Craft is a full-stack Restaurant Management website designed to enhance the restaurant's online presence, streamline internal management processes, and improve customer interaction. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the website features responsive design, secure authentication, and user-friendly functionalities.

---

## Key Features

### Public Pages

1. **Home Page**
   - **Banner Section**: Displays a meaningful section with a heading, description, and button linking to the All Foods page.
   - **Top Foods Section**: Highlights the 6 best-selling food items.
   - **Extra Sections**: Includes two relevant and attractive sections.

2. **All Foods Page**
   - Showcases all food items stored in the database.
   - Includes a search functionality to filter foods by name.

3. **Single Food Page**
   - Provides detailed information about a specific food item.
   - Displays purchase count and includes a purchase button.

4. **Gallery Page**
   - Features at least 10 static images in a lightbox-enabled gallery.

### Private Pages

1. **Food Purchase Page**
   - Displays a purchase form pre-filled with logged-in user's details.
   - Validates food quantity availability before purchase.

2. **My Foods Page**
   - Lists all food items added by the logged-in user.
   - Allows users to update their added items.

3. **Add Food Page**
   - Provides a form for users to add new food items.

4. **My Orders Page**
   - Displays all orders made by the logged-in user with purchase details and delete functionality.

### Authentication

- Email/password-based authentication.
- Google login.
- Secure JWT authentication for private routes.

### Additional Features

- Theme toggling between light and dark modes.
- Profile dropdown with quick access to **My Foods**, **Add Food**, and **My Orders**.
- Pagination for All Foods page.
- Infinite scrolling in the Gallery section.
- Toast notifications for success and error messages.
- Animations for enhanced user experience.

---

## Tech Stack Used

### Client-Side
- React
- React Router
- Tailwind CSS
- Material UI
- DaisyUI
- GSAP
- Framer Motion
- React Hook Form
- Firebase Authentication
- Lottie Files
- React Toastify
- Swiper
- React Scroll
- Lightbox Gallery

### Server-Side & Security
- Express.js
- MongoDB
- JSON Web Token (JWT)
- Firebase Authentication
- Dotenv

### Development Tools
- Vite
- ESLint
- PostCSS
- Autoprefixer

---

## Deployment

- **Frontend**: Deployed on Firebase ([Live Link](https://fast-art-409718.web.app/)).
- **Backend**: Ensure the server is deployed and working without CORS/404/504 errors.

---

## Notes

- Secure Firebase and MongoDB credentials using environment variables.
- Ensure JWT tokens are implemented and verified for all private routes.
- Handle edge cases such as unavailable food quantities during purchase.
- Test all features thoroughly to ensure a seamless user experience.