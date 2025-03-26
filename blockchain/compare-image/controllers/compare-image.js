import { PNG } from "pngjs";
import pkg from "jimp";
import pixelmatch from "pixelmatch";
const { read, MIME_PNG } = pkg;

const getBufferData = async (url) => {
  try {
    return new Promise(async (resolve, reject) => {
      await read(url, async (err, image) => {
        if (err) {
          console.log(`error reading image in jimp: ${err}`);
          reject(err);
          return;
        }
        image.resize(400, 400);
        return image.getBuffer(MIME_PNG, (err, buffer) => {
          if (err) {
            console.log(`error converting image url to buffer: ${err}`);
            reject(err);
          }
          resolve(buffer);
        });
      });
    });
  } catch (error) {
    throw Error("Failed to process Image");
  }
};

const compareLandImages = async (twitterProfilePicURL, assetCDNURL) => {
  try {
    console.log("> Started comparing two images");
    const img1Buffer = await getBufferData(twitterProfilePicURL);
    const img2Buffer = await getBufferData(assetCDNURL);
    const img1 = PNG.sync.read(img1Buffer);
    const img2 = PNG.sync.read(img2Buffer);
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const difference = pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      width,
      height,
      {
        threshold: 0.1,
      }
    );

    const compatibility = 100 - (difference * 100) / (width * height);
    console.log(`${difference} pixels differences`);
    console.log(`Compatibility: ${compatibility}%`);
    console.log("< Completed comparing two images");
    return compatibility;
  } catch (error) {
    console.log(`error comparing images: ${error}`);
    throw error;
  }
};

const compareLandImageService = async (req, res) => {
  try {
    console.log("Compare Image request is comming");
    const { image1, image2 } = req.body;
    console.log({ image1, image2 });
    const compatibility = await compareLandImages(image1, image2);
    console.log({ compatibility });
    return res.status(200).json({ compatibility });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default compareLandImageService;
