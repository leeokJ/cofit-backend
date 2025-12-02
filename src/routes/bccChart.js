// src/routes/bccChart.js

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bccChartController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * BCC 차트 라우트
 * 모든 엔드포인트는 인증 필요
 */

/**
 * GET /api/bccChart/:userId/chart
 * Query params:
 *   - pastHours: 과거 시간 (기본: 12)
 *   - futureHours: 미래 시간 (기본: 6)
 *   - intervalMinutes: 데이터 간격 (기본: 60)
 * 
 * Response: {
 *   success: true,
 *   userId: string,
 *   baseTime: ISO string,
 *   pastHours: number,
 *   futureHours: number,
 *   chartData: Array,
 *   maxBCC: number,
 *   minBCC: number,
 *   currentBCC: number
 * }
 */
router.get('/:userId/chart', authMiddleware, ctrl.getBCCChart);

/**
 * GET /api/bccChart/:userId/intakes
 * 개별 섭취 기록별 BCC 데이터 조회
 * 
 * Response: {
 *   success: true,
 *   userId: string,
 *   baseTime: ISO string,
 *   intakeDetails: Array
 * }
 */
router.get('/:userId/intakes', authMiddleware, ctrl.getIntakeDetails);

module.exports = router;
