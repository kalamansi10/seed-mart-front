# Seed-Mart - React.js Frontend

This repository contains the React.js frontend for Seed-Mart.

## Getting Started

After cloning the repository, ensure the backend API is running. Then, run the following commands:

```bash
npm install
npm run dev
```

## React.js Frontend Features

### Single Page Application

The React.js frontend is a single-page application (SPA) ensuring responsive interaction. It utilizes the react-router library to combine the benefits of multi-page and single-page applications, allowing dynamic routing without full-page reloads.

### Non-GET Requests

The application includes the CSRF token in the HTTP header when making fetch requests that perform CRUD operations or any non-GET requests.

### Product Item Filter

The app dynamically generates interactable filters for product item categories and options from the item fields of the model allowing flexibility. The filters, along with other search options, are included in the query string during fetch requests, with the query string reflecting on the page URL.

### Item Page

The item page showcases an image slider for the fetched item, providing a visual representation. Also, it displays the item's rating, number of ratings, and units sold, along with comprehensive item details. Users can seamlessly purchase the item or add it to their cart directly from the page.

### Promo Banner

The home page features a clickable image carousel that dynamically showcases current promotions fetched from the database.

### Session and Registration Dialog

The application has sign-in and sign-up buttons accessible on all pages. Clicking these buttons opens a dialog box that allows users to conveniently sign in or create an account from anywhere within the app.

## Issues

### React strict mode and passport-remember-me

The remember-me strategy for Passport in Node.js encounters issues when React strict mode is enabled. In React, strict mode executes code within useEffect twice to check for errors, which poses a problem for the implementation of remember-me sessions.

# About Seed-Mart

Seed-Mart is a personal project of mine designed to showcase my current proficiency in web development. It is an e-commerce website that focuses on modularity and scalability. Every component of the application was made with flexibility in mind.

My vision for the project was to create different versions of the frontend app using various frameworks, along with multiple versions of the backend server, each deployed separately. The aim was to seamlessly integrate them, allowing any frontend version to function with any backend version.

But as I continue my web development journey, I've come to realize that separating the frontend and backend isn't always practical, especially for websites handling forms, user sessions, and authentication. Opting for a framework that integrates both, following the MVC pattern, would save considerable time compared to building them separately, thanks to the well-supported libraries in this kind of implementation.

I'm determined to achieve my goal, even though this project will primarily serve as practice. Being bilingual (English and Tagalog), I often hear a phrase: "If you can translate a foreign language to your native language, you're proficient in that language." I believe the same applies to coding. If I can translate an app I've built into a different framework or language, it indicates a solid understanding of the new framework or language I'm learning.

## Seed-Mart Versions

- [seed-mart-front-reactjs](https://github.com/kalamansi10/seed-mart-front-reactjs)
- [seed-mart-api-rails](https://github.com/kalamansi10/seed-mart-api-rails)
- [seed-mart-api-nodejs](https://github.com/kalamansi10/seed-mart-api-nodejs)
