const Urls = require('./models/url');

const redis = require('./config/redisConnection');

const makeShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const cachedShort = await redis.get(`long:${url}`);
    if (cachedShort) {
      return res.json({ shortUrl: `http://localhost:4001/${cachedShort}` });
    }


    // Generate unique short code
    let shortUrl;
    let exists;
    do {
      shortUrl = Math.random().toString(36).substring(2, 7);
      exists = await Urls.findOne({ where: { short_url: shortUrl } });
    } while (exists);

    const data = await Urls.create({
      long_url: url,
      short_url: shortUrl,
      is_active: true,
    });
    await redis.set(`short:${shortUrl}`, url); // short → long
    await redis.set(`long:${url}`, shortUrl); // long → short
    res.json({ shortUrl: `http://localhost:4001/${data.short_url}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { short } = req.params;
    const cachedUrl = await redis.get(`short:${short}`);
    if (cachedUrl) {
      console.log('⚡ Cache hit!');
      return res.redirect(cachedUrl);
    }
    const record = await Urls.findOne({ where: { short_url: short, is_active: true } });
    if (!record) return res.status(404).json({ error: 'URL not found' });
    await redis.set(`short:${short}`, record.long_url);
    res.redirect(record.long_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { makeShortUrl, redirectUrl };
