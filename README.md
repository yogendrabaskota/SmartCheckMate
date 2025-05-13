# Attendance Management System

**SmartCheckMate** is a web based Attendance Management System designed to streamline and manage attendance efficiently. Teachers across the globe can use this platform to record attendance with ease. It provides a simple and intuitive interface, making attendance tracking effortless and error-free.


### Click [Here](https://smart-check-mate.vercel.app/) to visit this site.

---
## Features 
- **Teacher Can**:  
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
- Login Page:
![Homepage Snapshot](frontend/public/login.png)
- Register Page:
![Register page Snapshot](frontend/public/register.png)
- Teacher Dashboard:
![Teacher Dashboard Snapshot](frontend/public/dashboard.png)
- contact Page:
![Contact page Snapshot](frontend/public/contach.png)
- Forget Password:
![Forget password Snapshot](frontend/public/forgetPW.png)
- Reset Password:
![Reset Password Snapshot](frontend/public/resetPW.png)
- Personal Attendance of students:
![Attendance](frontend/public/personalA)
- Daily Attendance
![Daily Attendance](frontend/public/todayA)










## Feedback
  If you have any feedback, please reach out to me at yogendrabaskota18@gmail.com  





