const SleepService = require('../services/SleepService');

class SleepController {
  // 수면 영향도 분석
  async getSleepCaffeineImpact(req, res) {
    try {
      const userId = req.user.uid;
      const { sleepTime } = req.body;

      if (!sleepTime) {
        return res.status(400).json({
          success: false,
          message: '수면 예정 시간이 필요합니다',
        });
      }

      const sleepTimeDate = new Date(sleepTime);
      if (isNaN(sleepTimeDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: '유효하지 않은 날짜 형식입니다',
        });
      }

      const result = await SleepService.calculateSleepImpactBCC(userId, sleepTimeDate);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('getSleepCaffeineImpact Error:', error);
      return res.status(500).json({
        success: false,
        message: '수면 영향 분석 중 오류가 발생했습니다',
        error: error.message,
      });
    }
  }
}

module.exports = new SleepController();
