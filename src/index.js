// src/index.js
require('./config/env');
console.log('Loaded ENV:', process.env.NODE_ENV, process.env.FIRESTORE_PROJECT_ID);


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/firebase');
//파일 없애도 됨. const errorHandler = require('./middlewares/errorHandler');

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

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터
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

app.get('/', (req, res) => {
  res.send('Caffeine Tracker API');
});

// 에러 핸들러 (반드시 라우터 등록 뒤)
//app.use(errorHandler);

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
