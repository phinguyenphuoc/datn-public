const CronJob = require("cron").CronJob;
const { query } = require("./config");

const STEP = 100;
let shouldStart = true; // Should start new cron job

const jobChargeMoneyStudent = () => {
  shouldStart = false;
  const crawl = new CronJob(
    '*/10 * * * * *',
    async function () {
      console.log('You will see this message every 10 second - UPDATE MISSING PRICE', new Date());
      if (0) {
        crawl.stop();
      }
    },
    null,
    true,
    'America/Los_Angeles'
  );
};

module.exports = { jobChargeMoneyStudent }