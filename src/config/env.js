// src/config/env.js
const dotenv = require('dotenv');
const path = require('path');

// NODE_ENV에 따라 .env 파일 선택 (default: development)
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;

// 프로젝트 루트 기준 경로 생성 후 로드
const envPath = path.resolve(process.cwd(), envFile);
dotenv.config({ path: envPath });