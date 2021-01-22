
import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'
import cheerio from 'cheerio'


module.exports = async (req: NowRequest, res: NowResponse) => {
  try {

    const response = await fetch('https://www.westlotto.de/')
    const htmlString = await response.text()

    const $ = cheerio.load(htmlString)

    const eurojackpot = $('#gametile > div > div:nth-child(1) > div > div.mod-gametile__content > div.mod-gametile__content__hl-container > p.heading-h3.eur-appx-sup').text()

    const lottojackpot = $('#gametile > div > div:nth-child(2) > div > div.mod-gametile__content > div.mod-gametile__content__hl-container > p.heading-h3.eur-appx-sup').text()

    const spiel77 = $('#gametile > div > div:nth-child(3) > div > div.mod-gametile__content > div.mod-gametile__content__hl-container > p.heading-h3.eur-appx-sup').text()

    const cache = 60 * 5 // 5 minuten
    const cachedSince = new Date()

    res.setHeader('Cache-Control', "s-maxage=" + cache)
    res.status(200).json({ lottojackpot, eurojackpot, spiel77, cachedSince })
  } catch (e) {
    console.log(e)
    res.status(500).send("🤯")
  }
}

