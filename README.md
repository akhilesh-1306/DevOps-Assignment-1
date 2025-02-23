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
📁 microservices-app/
 ├── 📁 web-service/        # Web Service (Express.js)
 │    ├── Dockerfile
 │    ├── index.js
 │    ├── package.json
 │    └── .dockerignore
 ├── 📁 worker-service/     # Worker Service (Node.js)
 │    ├── Dockerfile
 │    ├── worker.js
 │    ├── package.json
 │    └── .dockerignore
 ├── docker-compose.yml    # Docker Compose Configuration
 ├── README.md             # Project Documentation
```

---

## 🚀 **How to Run the Application**

### **Step 1: Clone the Repository**
```sh
git clone <repository_url>
cd microservices-app
```

### **Step 2: Set Up Environment Variables**
In `docker-compose.yml`, we've already set up environment variables for MongoDB authentication.

### **Step 3: Build & Run the Containers**
Run the following command to **build and start** all services:
```sh
docker-compose up --build -d
```

This will start:
- **Web Service** on `http://localhost:8080`
- **Mongo Express** on `http://localhost:8082`

---

## 🛠️ **Services Overview & Configurations**

### **1️⃣ Web Service (Express.js)**
- Runs in a **container** with the name: `your_register_number_web`
- Exposes port **8081** (mapped to **8080** on localhost)
- Connects to MongoDB

#### **Dockerfile (web-service/Dockerfile)**
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8081
CMD ["node", "index.js"]
```

#### **index.js (Web Service Entry Point)**
```javascript
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:password123@mongo:27017/microserviceDB?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
app.get('/', (req, res) => res.send("Hello from Web Service!"));
app.listen(8081, () => console.log("Web Service running on port 8081"));
```

---

### **2️⃣ Worker Service (Node.js)**
- Runs in a **container** with the name: `your_register_number_worker`
- Performs background tasks (e.g., fetching data from MongoDB)

#### **Dockerfile (worker-service/Dockerfile)**
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "worker.js"]
```

#### **worker.js (Worker Service Entry Point)**
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:password123@mongo:27017/microserviceDB?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

console.log("Worker Service is running and connected to MongoDB!");
```

---

### **3️⃣ MongoDB (Database Service)**
- Runs in a **container** with the name: `your_register_number_mongo`
- Uses **Docker volume** for data persistence
- Authentication enabled (**root:password123**)

---

### **4️⃣ Mongo Express (Database UI)**
- Runs in a **container** with the name: `your_register_number_mongo_express`
- Accessible at: `http://localhost:8082`

---

## 📝 **docker-compose.yml** (Full Setup)
```yaml
version: '3.8'

services:
  web-service:
    build: ./web-service
    container_name: your_register_number_web
    ports:
      - "8080:8081"
    depends_on:
      - mongo
    networks:
      - microservice-net
    environment:
      MONGO_URI: mongodb://mongo:27017/microserviceDB

  worker-service:
    build: ./worker-service
    container_name: your_register_number_worker
    depends_on:
      - mongo
    networks:
      - microservice-net
    environment:
      MONGO_URI: mongodb://mongo:27017/microserviceDB

  mongo:
    image: mongo:latest
    container_name: your_register_number_mongo
    restart: always
    volumes:
      - mongo-data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: microserviceDB
    networks:
      - microservice-net

  mongo-express:
    image: mongo-express
    container_name: your_register_number_mongo_express
    restart: always
    ports:
      - "8082:8081"
    depends_on:
      - mongo
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: password123
      ME_CONFIG_MONGODB_SERVER: mongo
      ME_CONFIG_MONGODB_PORT: 27017
    networks:
      - microservice-net

networks:
  microservice-net:

volumes:
  mongo-data:
```

---

## 🔍 **Verifying Everything Works**

### ✅ **Check Running Containers**
```sh
docker ps
```

### ✅ **Check Logs for Web & Worker Services**
```sh
docker logs your_register_number_web

docker logs your_register_number_worker
```

### ✅ **Check MongoDB Connection**
```sh
docker exec -it your_register_number_mongo mongosh -u root -p password123 --authenticationDatabase admin
```
Then run:
```sh
use microserviceDB;
db.createCollection("test");
db.test.insertOne({"message": "Hello from MongoDB"});
db.test.find();
```

### ✅ **Access Mongo Express UI**
Open `http://localhost:8082` in your browser.

---

## 🎯 **Conclusion**
This setup demonstrates a **microservices architecture** with Docker, **ensuring modular services, secure networking, and persistent storage**. 🚀 Let me know if you have any questions! 🤝

