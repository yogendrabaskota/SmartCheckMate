# Attendance Management System

**SmartCheckMate** is a web based Attendance Management System designed to streamline and manage attendance efficiently. Teachers across the globe can use this platform to record attendance with ease. It provides a simple and intuitive interface, making attendance tracking effortless and error-free.

### Click [Here](https://smart-check-mate.vercel.app/) to visit this site.

---

## Features

- Add a school and view all previously added schools.
- Add multiple classes to a single school and view all classes within a specific school.
- Add students to a class either by entering their names or by specifying the total number of students in a class (which auto-generates roll numbers).
- Record attendance for a class once per day and view the list of present/absent students for that day.
- View attendance records for all previous days.
- Check the total attendance of a specific student.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render

## **Steps to Run**:

#### 1. Clone the repository

```bash
git clone https://github.com/yogendrabaskota/SmartCheckMate.git

```

#### 2. To Run backend

- Install required packages

```https
  npm install
```

- Run Backend server

```https
  npm start
```

### Note

- **Add the environment variable as**

```https

DB_URI= GIVE_YOUR_DATABASE_CONNECTION_LINK

SECRET_KEY= GIVE_YOUR_JWT_SECRET_KEY

PORT= PORT_NUMBER_TO_RUN_YOUR_BACKEND

```

## To Run Frontend

```https
cd Frontend
```

- To install required packages

```https
  npm install
```

- To run project

```https
  npm run dev
```

### Note:

- Don't forget to update the API path in the frontend if needed.

### To get API documentation, click [Here](https://documenter.getpostman.com/view/33322053/2sAYX3qNWL)

### Backend is live [Here](https://smartcheckmate.onrender.com/)

### Frontend is live [Here](https://smart-check-mate.vercel.app/)

## Output :

![Home page](Frontend/public/home.png)
![Register page](Frontend/public/register.png)
![Login Page](Frontend/public/login.png)
![About page](Frontend/public/about.png)
![Contact page](Frontend/public/contact.png)
![Dashboard](Frontend/public/dashboard.png)
![Attendance Details](Frontend/public/attendancedetails.png)
![Class Details](Frontend/public/classdetails.png)
![School Details](Frontend/public/schooldetails.png)
![Student List](Frontend/public/studentlist.png)
![Add School](Frontend/public/addschool.png)
![Add Student](Frontend/public/addstudent.png)

## Feedback

If you have any feedback, please reach out to me at yogendrabaskota18@gmail.com
