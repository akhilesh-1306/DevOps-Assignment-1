const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/microserviceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Worker connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    name: String,
    rollNumber: String,
    bio: String,
});

const User = mongoose.model('User', UserSchema);

const fetchData = async () => {
    const users = await User.find();
    console.log('Fetched Users:', users);
};

// Fetch data every 10 seconds
setInterval(fetchData, 10000);
