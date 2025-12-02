// src/controllers/bccChartController.js

const bccChartService = require('../services/bccChartService');

/**
 * BCC 차트 데이터 조회
 * GET /api/bccChart/:userId/chart
 */
exports.getBCCChart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { pastHours = 12, futureHours = 6, intervalMinutes = 60 } = req.query;

    const result = await bccChartService.generateBCCChart(userId, {
      pastHours: parseInt(pastHours),
      futureHours: parseInt(futureHours),
      intervalMinutes: parseInt(intervalMinutes)
    });

    res.json(result);
  } catch (err) {
    console.error('Error in getBCCChart:', err);
    next(err);
  }
};

/**
 * 개별 섭취 기록 상세 조회
 * GET /api/bccChart/:userId/intakes
 */
exports.getIntakeDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await bccChartService.getIntakeDetails(userId);

    res.json(result);
  } catch (err) {
    console.error('Error in getIntakeDetails:', err);
    next(err);
  }
};
