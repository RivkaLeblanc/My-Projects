# Song App

A web application for managing songs, built with Node.js, Express, and EJS.

## Features

- User authentication (register, login)
- Add, edit, and view songs
- Song details page

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/RivkaLeblanc/My-Projects.git
   cd webProject-songApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your MongoDB URI, JWT secret, etc.
     Example:
     ```
     MONGODB_URI=mongodb://localhost:27017/songapp
     JWT_SECRET=your_secret_key
     ```

4. Run the application:
   ```
   npm start
   ```
   Note: You may need to add a "start" script to `package.json` if not present: `"start": "node app.js"`

## Usage

- Navigate to the app in your browser
- Register a new account or login
- Add new songs, edit existing ones, and view song details

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcrypt, JSON Web Tokens (JWT)
- **Frontend**: EJS templating engine
- **Other**: cookie-parser, dotenv

## Project Structure

- `app.js`: Main application file
- `controllers/`: Route handlers for auth and songs
- `models/`: Mongoose models for users and songs
- `routers/`: Express routers
- `views/`: EJS templates
- `middleware/`: Custom middleware
- `db/`: Database configuration

## Contributing

Feel free to contribute by submitting issues or pull requests.

## License

This project is licensed under the ISC License.