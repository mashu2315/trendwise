const axios = require('axios');
const cheerio = require('cheerio');

const crawlTrends = async () => {
  try {
    const response = await axios.get('https://trends.google.com/trending/rss');
    const $ = cheerio.load(response.data, { xmlMode: true });
    const trends = [];
    $('item').each((i, elem) => {
      trends.push({
        title: $(elem).find('title').text(),
        link: $(elem).find('link').text(),
      });
    });
    return trends.slice(0, 5);
  } catch (error) {
    console.error('Crawling error:', error);
    return [];
  }
};

module.exports = { crawlTrends };