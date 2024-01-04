# Twitter-Clone-MERN

[![Project Status: WIP](https://img.shields.io/badge/Project%20Status-WIP-yellow.svg)](https://yourprojectlink)


This project is a work-in-progress Twitter clone built using the MERN stack with TypeScript for the frontend.

## Table of Contents

- [Twitter-Clone-MERN](#twitter-clone-mern)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)

## Features

- [x] User registration
- [x] Password hashing
- [x] User login
- [x] User authentication
- [x] User logout
- [x] Timed user sessions using cookies
- [x] File upload for profile pictures
- [x] View posts by other users
- [x] Create posts
- [ ] Like posts
- [ ] Comment on posts
- [ ] Delete posts
- [ ] Edit user profile
- [ ] Delete user

## Tech Stack

- **Frontend:**
  - React.js
  - TypeScript
  - Tailwind
  - Axios

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - JsonWebToken
  - Cookie-Parser
  - Bcrypt

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DylanAlmond/Twitter-Clone-MERN.git
   ```

2. **Create MongoDB database:**
   - Install MongoDB + MongoDBCompass locally
   - Create a new database following instructions provided in MongoDB documentation.

3. **Update enviroment variable for MongoDB:**
   - Open the .env file located in /backend directory and locate the MONGOURL variable.
   - Change the value of MONGOURL to the url of your MongoDB database 
      `MONGOURL=your-mongo-url`

4. **Install backend dependencies:**
   - Open your terminal and navigate to the /backend directory:
      ```bash
      cd backend
      ```
    - The following command will install any dependencies:
      ```bash
      yarn install
      ```

5. **Run the backend server:**
   - Whilst in /backend, run the following command to start the server:
      ```bash
      yarn run dev
      ```
      If all works, you should see the line `Api is listening on port: 5555` in the terminal window.

6. **Install frontend dependencies:**
   - Open a new terminal window and navigate to the /frontend directory:
      ```bash
      cd frontend
      ```
    - The following command will install any dependencies:
      ```bash
      yarn install
      ```

7. **Run the frontend server:**
   - Whilst in /frontend, run the following command to start the server:
      ```bash
      yarn run dev
      ```

      You should now be able to access the website on http://localhost:5173/