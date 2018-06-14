const Discord = require("discord.js")
const puppeteer = require('puppeteer');

const url = "http://www.somethinglovely.net/bdo/";

module.exports.run = async (bot) => {
  let timersChannel = bot.channels.find(`name`, "timers");
  if (!timersChannel)
  {
    return;
  }

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let untilNight = "";
    let untilDaytime = "";
    await page.goto(url);

    const currentTime = await page.evaluate(() => {
      let ampm = document.querySelector('#clock-unit .currentTime .ampm').textContent;
      let hour = document.querySelector('#clock-unit .currentTime .h').textContent;
      let minute = document.querySelector('#clock-unit .currentTime .m').textContent;

      return (ampm + " " + hour + ":" + minute);
    });

    var isDay = await page.evaluate(() => {
      if (document.querySelector('#clock-unit').className === "isDay")
      {
        return true;
      }
      else
      {
        return false;
      }
    });

    if (isDay)
    {
      untilNight = await page.evaluate(() => {
        let span = document.querySelector('#clock-unit .untilNight span').textContent;
        let time = document.querySelector('#clock-unit .untilNight b').textContent;

        return (span + " " + time);
      });
    }
    else
    {
      untilDaytime = await page.evaluate(() => {
        let span = document.querySelector('#clock-unit .untilDaytime span').textContent;
        let time = document.querySelector('#clock-unit .untilDaytime b').textContent;

        return (span + " " + time);
      });
    }

    const untilDailyReset = await page.evaluate(() => {
      let span = document.querySelector('#clock-unit .resets .untilDailyReset span').textContent;
      let time = document.querySelector('#clock-unit .resets .untilDailyReset b').textContent;

      return (span + " " + time);
    });

    const untilImperialReset = await page.evaluate(() => {
      let span = document.querySelector('#clock-unit .resets .untilImperialReset span').textContent;
      let time = document.querySelector('#clock-unit .resets .untilImperialReset b').textContent;

      return (span + " " + time);
    });

    let botembled = null;

    if (isDay)
    {
      let untilNightArgs = untilNight.split(" ");
      let untilDailyResetArgs = untilDailyReset.split(" ");
      let untilImperialResetArgs = untilImperialReset.split(" ");

      botembled = new Discord.RichEmbed()
        .setDescription("NOW IT'S CURRENTLY DAYTIME")
        .addBlankField(true)
        .setColor("#ffcc00")
        .addField("- Current server time -", currentTime)
        .addField("- " + untilNightArgs[0] + " " + untilNightArgs[1] + " -", untilNightArgs[2])
        .addField("- " + untilDailyResetArgs[0] + " " + untilDailyResetArgs[1] + " " + untilDailyResetArgs[2] + " -", untilDailyResetArgs[3])
        .addField("- " + untilImperialResetArgs[0] + " " + untilImperialResetArgs[1] + " " + untilImperialResetArgs[2] + " -", untilImperialResetArgs[3]);
    }
    else
    {
      let untilDaytimeArgs = untilDaytime.split(" ");
      let untilDailyResetArgs = untilDailyReset.split(" ");
      let untilImperialResetArgs = untilImperialReset.split(" ");

      botembled = new Discord.RichEmbed()
        .setDescription("NOW IT'S CURRENTLY NIGHTTIME")
        .addBlankField(true)
        .setColor("#cc33ff")
        .addField("- Current server time -", currentTime)
        .addField("- " + untilDaytimeArgs[0] + " " + untilDaytimeArgs[1] + " -", untilDaytimeArgs[2])
        .addField("- " + untilDailyResetArgs[0] + " " + untilDailyResetArgs[1] + " " + untilDailyResetArgs[2] + " -", untilDailyResetArgs[3])
        .addField("- " + untilImperialResetArgs[0] + " " + untilImperialResetArgs[1] + " " + untilImperialResetArgs[2] + " -", untilImperialResetArgs[3]);
    }
    timersChannel.fetchMessages().then(messages => messages.array().forEach( message => message.delete()));
    timersChannel.send(botembled)

    browser.close();
  })();
}

module.exports.help = {
  name: "timers"
}
