import { Router } from "express";
import { nanoid } from "nanoid";
import { validateRequrest, validateUrl } from "../utils/utils.js";
import Url from "../models/url.js";

const router = Router();
/**
 * @swagger
 * /short:
 *   post:
 *     summary: Post request to shorten your url.
 *     description: You enter a long url address and you go to your page through the given short url address.
 *     requestBody:
 *       required: true
 *       description: Enter a long url address.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origUrl:
 *                 type: string
 *                 description: long url.
 *                 example: https://your-web-site/.../index.html
 *     responses:
 *       200:
 *         description: get short url address.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urlId:
 *                   type: string
 *                   description: short url id
 *                   example: 'TxDRmK92sV8mE-BksCV_7'
 *                 origUrl:
 *                   type: string
 *                   description: long url.
 *                   example: https://your-web-site/.../index.html
 *                 shortUrl:
 *                   type: string
 *                   description: short url.
 *                   example: http://localhost:5000/TxDRmK92sV8mE-BksCV_7
 *                 clicks:
 *                   type: integer
 *                   description: clicks count.
 *                   example: 0
 *                 date:
 *                   type: date
 *                   description: created date.
 *                   example: Tue Aug 29 2023 22:48:30
 *                 _id:
 *                   type: string
 *                   description: id for db.
 *                   example: 64ee2f6e04befbdbebd98c42
 *
 */
router.post("/short", async (req, res) => {
  const {error} = validateRequrest(req.body);
  if(error)
    return res.send(error.details[0].message);
  
  const { origUrl } = req.body;
  const base = process.env.BASE;

  const urlId = nanoid();
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) return res.json(url);
      else {
        const shortUrl = `${base}/${urlId}`;
        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(404).json("URL is invalid");
  }
});

/**
 * @swagger
 * /api/{urlId}:
 *   get:
 *     summary: get request to go to your site via short url.
 *     description: get request to go to your site via short url.
 *     parameters:
 *       - in: path
 *         name: url id
 *         required: true
 *         description: url id
 *         schema:
 *           type: string
 */
router.get("/api/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else {
      res.status(404).json("Not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
});

export default router;
