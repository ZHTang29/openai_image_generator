const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI(apiKey);

const generateImage = async (req, res) => {
    const { prompt = 'swimming donkey', n = 1, size } = req.body;

    if (!prompt) {
        return res.status(400).json({
            error: 'A prompt is required to proceed'
        });
    }

    const imageSize = size === 'small' ? '256x256' : 'size' === 'medium' ? '512x512' : '1024x1024'

    try {
        const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: n,
        size: imageSize,
      });
      const image_url = response.data[0].url

      res.status(200).json({
        success: true,
        data: image_url
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }

      res.status(400).json({
        success: false,
        error: 'The image could not be generated'
      });
    }
};

module.exports = { generateImage };