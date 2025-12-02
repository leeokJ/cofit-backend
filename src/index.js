// src/index.js
require('./config/env');
console.log('Loaded ENV:', process.env.NODE_ENV, process.env.FIRESTORE_PROJECT_ID);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/firebase');

const authRouter = require('./routes/auth');
const drinkRouter = require('./routes/drinks');
const usersRouter = require('./routes/users');
const drinkLogsRouter = require('./routes/drinkLogs');
const caffeineLevelRouter = require('./routes/caffeineLevels');
const notificationRouter = require('./routes/notifications');
const userDetailRouter = require('./routes/userDetails');
const coffeeDetailRouter = require('./routes/coffeeDetails');
const energyDetailRouter = require('./routes/energyDetails');
const customDetailRouter = require('./routes/customDetails');
const fcmRouter = require('./routes/fcm');
const bloodCaffeineRouter = require('./routes/bloodCaffeine');
const customCoffeeRouter = require('./routes/customCoffee');
const intakesRouter = require('./routes/intakes');
const sleepRoutes = require('./routes/sleeps');
const bccChartRoutes = require('./routes/bccChart');
const notificationSettingRouter = require('./routes/notificationSettings');

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터
app.use('/auth', authRouter);
app.use('/drinks', drinkRouter);
app.use('/users', usersRouter);
app.use('/drinkLogs', drinkLogsRouter);
app.use('/caffeineLevels', caffeineLevelRouter);
app.use('/notifications', notificationRouter);
app.use('/userDetails', userDetailRouter);
app.use('/coffeeDetails', coffeeDetailRouter);
app.use('/energyDetails', energyDetailRouter);
app.use('/customDetails', customDetailRouter);
app.use('/fcm', fcmRouter);
app.use('/bloodCaffeine', bloodCaffeineRouter);
app.use('/customCoffee', customCoffeeRouter);
app.use('/intakes', intakesRouter);
app.use('/sleep', sleepRoutes);
app.use('/bccChart', bccChartRoutes);
app.use('/notificationSettings', notificationSettingRouter);


app.get('/', (req, res) => {
  res.send('Caffeine Tracker API');
});

// 서버 시작
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 

