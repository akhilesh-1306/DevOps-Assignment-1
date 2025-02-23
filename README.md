# Microservices-Based Node.js Application with Docker & Docker Compose

This project demonstrates a **microservices-based** application using **Node.js, MongoDB, and Docker Compose**. The application consists of the following components:

- **Web Service**: Serves HTTP requests.
- **Worker Service**: Background process that interacts with the database.
- **MongoDB Database**: Stores application data.
- **Mongo Express**: Web-based UI to manage MongoDB.

The setup ensures **containerized services**, proper **networking**, and **data persistence** using Docker volumes.

---

## 📌 **Project Structure**
```
📁 DevOps - Assignment/
 ├── 📁 web-service/        # Web Service (Express.js)
 │    ├── Dockerfile
 │    ├── index.js
 │    ├── package.json
 ├── 📁 worker-service/     # Worker Service (Node.js)
 │    ├── Dockerfile
 │    ├── worker.js
 │    ├── package.json
 ├── docker-compose.yml    # Docker Compose Configuration
 ├── README.md             # Project Documentation
```

---

## 🚀 **How to Run the Application**

### **Step 1: Clone the Repository**
```sh
git clone <repository_url>
cd DevOps-Assignment
```

### **Step 2: Set Up Environment Variables**
In `docker-compose.yml`, we've already set up environment variables for MongoDB authentication.

### **Step 3: Build & Run the Containers**
Run the following command to **build and start** all services:
```sh
docker-compose up --build
```

This will start:
- **Web Service** on `http://localhost:8080`
- **Mongo Express** on `http://localhost:8082`

---

## 🛠️ **Services Overview & Configurations**

### **1️⃣ Web Service (Express.js)**
- Runs in a **container** with the name: `RollNo_web`
- Exposes port **8081** (mapped to **8080** on localhost)
- Connects to MongoDB

---

### **2️⃣ Worker Service (Node.js)**
- Runs in a **container** with the name: `RollNo_worker`
- Performs background tasks (e.g., fetching data from MongoDB)

---

### **3️⃣ MongoDB (Database Service)**
- Runs in a **container** with the name: `mongo`
- Uses **Docker volume** for data persistence

---

### **4️⃣ Mongo Express (Database UI)**
- Runs in a **container** with the name: `mongo-express`
- Accessible at: `http://localhost:8082`

---

### ✅ **Check Running Containers**
```sh
docker ps
```