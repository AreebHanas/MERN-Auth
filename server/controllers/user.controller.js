// import User from "../models/user.model.js";
import puppeteer from "puppeteer";
import fs from "fs";
//Test API
export const scraper = async (req, res) => {
  const Url = req.body.url;
  // console.log(req.body);
  // const normalString = Object.values(test).join(" ");
  // console.log(test);
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(Url, { waitUntil: "domcontentloaded" });
    const users = await page.evaluate(() => {
      const body = document.querySelectorAll("p");
      const paragraphsArray = Array.from(body).map((p) => p.textContent);
      const test = paragraphsArray.join("\n");
      return test;
    });
    // const testContent = await page.content();
    // const test01 = { test, users };
    // const plainTextContent = users.replace(/<[^>]*>/g, "");
    // const writeFiles = fs.writeFile("test.txt", users, (err) => {
    //   if (err) {
    //     console.log(err.message);
    //   } else {
    //     console.log("its work");
    //   }
    // });
    res.status(200).send(users);
    page.close();
  } catch (error) {
    console.log("Cannot scrape data : ", error.message);
  }
};
