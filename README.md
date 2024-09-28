## 🏨 Hotel Booking Application
Welcome to the Hotel Booking Application! This project is a comprehensive web application designed to facilitate seamless reservation management for hotels. It leverages modern web technologies to provide a robust and user-friendly experience.
Deployed Site(Might be down since it is running on the trail MongoDB Atlas version):
https://airbnbmock-project.onrender.com/listings

### 🚀 Features
1. Scalable Architecture: Built with Node.js and Express.js to ensure high performance and scalability.
2. Secure Authentication: Utilizes Passport.js with session management for secure user authentication and authorization.
3. RESTful API: Implements RESTful APIs for efficient CRUD operations on hotel listings and customer reviews.
4. Cloud-based Image Management: Integrates Cloudinary for efficient cloud storage and retrieval of images, enhancing media management.
5. Advanced Data Handling: Employs Mongoose for MongoDB interactions, including schema design and middleware for automated data processing.
6. Responsive Front-end: Develops dynamic and responsive views using EJS templates and AJAX for real-time updates.
7. Role-based Access Control: Implements middleware to ensure only authorized users can modify or delete listings and reviews.
8. Data Validation: Utilizes Joi for server-side data validation, ensuring data integrity and security.
9. Error Handling: Custom error handling with Express middleware to manage and log errors efficiently.
10. Session Management: Configured sessions using connect-mongo to store session data in MongoDB, ensuring persistence across server restarts.
11. Review Management: Allows users to add, edit, and delete reviews for hotel listings, with ownership verification.
12. Form Handling: Handles file uploads for listing images using Multer, and processes forms securely and efficiently.

### 📚 Technologies Used
- Backend: Node.js, Express.js
- Authentication: Passport.js
- Database: MongoDB Atlas, Mongoose
- Image Management: Cloudinary
- Templating Engine: EJS
- Front-end: HTML, CSS, JavaScript, AJAX
- Validation: Joi
- Session Management: connect-mongo, express-session
  
### 🛠️ Installation
1. Clone the repository:

```
git clone https://github.com/your-username/hotel-booking-app.git
cd hotel-booking-app
```
2. Install dependencies:

```
npm install
```
3. Set up environment variables:
Create a .env file in the root directory and add the following:
```
PORT=8080
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
```
4. Run the application:
```
node app.js
```
### 📄 Usage
- User Registration and Login: Users can register and log in using secure authentication.
- Hotel Listings: Users can view, create, edit, and delete hotel listings.
- Image Uploads: Users can upload images for their hotel listings.
- Reviews: Users can add and manage reviews for hotel listings, with ownership verification.
- Search and Filter: Users can search and filter hotel listings based on various criteria such as location and price.
- Error Notifications: Users receive clear error messages and feedback through flash messages.
  
### 🧑‍💻 Contributing
I welcome contributions to enhance the functionality and user experience of this application. Please fork the repository and submit a pull request with your changes.

### 📧 Contact
For any questions or feedback, please reach out to me at pranavr753@gmail.com.
