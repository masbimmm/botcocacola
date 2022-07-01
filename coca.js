/*
* Created By @Masbimmmm
* I do not forbid you to change my name, but please don't remove the tag Powered
* This is next Generation From I-WRAH Tools
* Created on : 19/06/2022
*   ______         ____  _____  ______   _______          _
* .' ____ \       |_   \|_   _||_   _ `.|_   __ \        / \
* | (___ \_| ______ |   \ | |    | | `. \ | |__) |      / _ \
*  _.____`..|______|| |\ \| |    | |  | | |  __ /      / ___ \
* | \____) |       _| |_\   |_  _| |_.' /_| |  \ \_  _/ /   \ \_
*  \______.'      |_____|\____||______.'|____| |___||____| |____|
*
*                    BOT GRIVY WITH NODEJS
*                      Tools By S-NDRA
*
*  Powered By :
*  I-WRAH & EriKz & X-ReRe & T-PhuTe & Elkiranaa & M.ZulfA
*
*  How to use : 
*  [-] Install nodejs, 
*  [-] installl package "puppeteer", "puppeteer-extra", "puppeteer-extra-plugin-stealth" with npm, 
*  [-] set account "user|password" with array userlist, ex you can see in line,
*  [-] run
*/
// import * as fs from 'fs';
// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
const fs = require("fs")
const puppeteer = require("puppeteer-extra")
const StealthPlugin = require("puppeteer-extra-plugin-stealth")
var xxx = [

// "100082024413758|contoh",
// "100081721248196|contoh",
// "100081563784148|contoh",
// "100081839443156|contoh",
// "100081775456789|contoh",
// "100081750767872|contoh",
// "100081912009598|contoh",

"100081543775160|contoh",
"100082051622628|contoh",
"100081909430210|contoh",
"100081897550375|contoh",
"100081667579974|contoh",
"100081686389544|contoh",
"100081958028604|contoh",
"100081577224206|contoh",
"100081521936404|contoh",
"100082011814572|contoh",


];
let tot = 0;
var xlogin = false;
var namabarcode = '';
(async () => {
    for (var nn = 0; nn < xxx.length; nn++) {

        let user = xxx[nn];
        let spl = user.split("|")
        let username = spl[0];
        let password = spl[1];
        console.log(username)
        console.log("Preparing browser")
        puppeteer.use(StealthPlugin());
        const browser = await puppeteer.launch({ headless: false,  args: [ '--incognito', '--no-sandbox'], })
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage()
        await page.setViewport({ width: 540, height: 586, deviceScaleFactor: 1, });
        const pages = await browser.pages();
        if (pages.length > 1) {
            await pages[0].close();
        }
        await page.evaluateOnNewDocument(function() {
          navigator.geolocation.getCurrentPosition = function (cb) {
            setTimeout(() => {
              cb({
                'coords': {
                  accuracy: 21,
                  altitude: null,
                  altitudeAccuracy: null,
                  heading: null,
                  latitude: 23.129163,
                  longitude: 113.264435,
                  speed: null
                }
              })
            }, 1000)
          }
        });
        // https://ayo.coca-cola.co.id/c/sat-coke-ayo-901
        let alfa = 'https://ayo.coca-cola.co.id/login/sat-coke-ayo-9-60';
        let indomaret = 'https://ayo.coca-cola.co.id/login/idm-coke-ayo-9-06';
        const navigationPromise = page.waitForNavigation()

        var statusF = false;
        await page.goto(indomaret+'?utm_campaign=Earned_Media&utm_content=Wallet&utm_medium=Advocacy&utm_source=ayo_coca_cola&utm_term=Sharing', {
            waitUntil: 'networkidle2'
        })
        await navigationPromise;
        await page.waitForSelector('button[style*="background-color: rgb(0, 0, 0)"]')
        await navigationPromise;
        console.log("Ready");
        await delay(100);
        await page.waitForXPath("//*[contains(text(),'Accept all') or contains(text(),'Terima semua')]")
        while(true){
          try{
            let accept = await page.$x("//*[contains(text(),'Accept all') or contains(text(),'Terima semua')]");
            // accept[0].click();
            await delay(500);
            await page.mouse.click(410, 540); //nope
            break;
          }catch(err){
            console.log("Waiting cookie accept");
          }
          await delay(100);
        }
        console.log("Login akun "+user)
        while(true){
            let btn = await page.$x("//span[contains(text(),'Facebook')]")
            if (btn) {
                const newPagePromise = new Promise(x => page.once('popup', x));
                btn[0].click();
                const newPage = await newPagePromise;
                await newPage.setExtraHTTPHeaders({
                    'accept-language': 'en-US,en;q=0.9,hy;q=0.8'
                });
                //input[@id="email"]
                try{
                    const navigationPromise2 = newPage.waitForNavigation()
                    await newPage.waitForSelector('input[id="email"]')
                    await newPage.type('input[id="email"]', username)
                    await newPage.waitForSelector('input[id="pass"]')
                    await newPage.type('input[id="pass"]', password)
                    await newPage.waitForXPath("//input[@name='login']");
                    let login = await newPage.$x("//input[@name='login']");
                    if (login) {
                        login[0].click();
                        try{
                            await navigationPromise2;
                            await delay(1000);
                            let data = await newPage.evaluate(() => document.querySelector('head').innerHTML);
                            if (data!='') {
                              let data2 = await newPage.evaluate(() => document.querySelector('html').innerHTML);
                              if (data2.match("URL=\/checkpoint\/\\?next=") || data2.match("CheckpointLoggedOutProfileJewelConfig") || data2.match("Your request couldn't be processed")) {
                                if (data2.match("Your request couldn't be processed")) {
                                  console.log("gagal login");
                                  await simpen('gagallogin', user)
                                }else{
                                  console.log("wkwkwk checkpoint");
                                  await simpen('checkpoint', user)
                                }
                                await delay(1000);
                                break;
                              }else{
                                console.log("try find element")
                                await newPage.waitForXPath("//span[contains(text(),'Continue') or contains(text(),'Lanjutkan')]")
                                let accept = await newPage.$x("//span[contains(text(),'Continue') or contains(text(),'Lanjutkan')]")
                                if (accept) {
                                    statusF = true;
                                    console.log("accept login Facebook")
                                    accept[0].click()
                                    try{
                                        await delay(1000);
                                        await navigationPromise2;
                                        await newPage.close();
                                        await delay(500);
                                    }catch(err){
                                        console.log("failed close page")
                                    }
                                    break;
                                }else{
                                  console.log("Kaga ngarti error apaan, coba login manual");
                                  await simpen('manual', user)
                                  await newPage.close();
                                  break;
                                }
                              }
                              
                            }else{
                              statusF = true;
                              console.log("udah pernah login");
                              try{
                                  await navigationPromise2;
                                  await newPage.close();
                                  await delay(500);
                              }catch(err){
                                  console.log("failed close page")
                              }
                              break;
                            }
                        }catch(err){
                            console.log("failed load page login "+user);
                            break;
                        }
                    }
                }catch(err){
                    console.log("ERROR 821");
                    break;
                }
            }else{
              console.log("kok ngga ke klik");
              break;

            }
        }
        xlogin = true;
        if (statusF) {
          try{
            try{
              let loginagain = await page.$x("//span[contains(text(),'Facebook')]")
              if (loginagain) {
                  loginagain[0].click();
              }
            }catch(err){
              console.log("skip click login facebook")
            }
            await delay(1000);
            await navigationPromise;
            await page.waitForXPath("//span[contains(text(),'Allow')]");
            var btn = await page.$x("//span[contains(text(),'Allow')]");
            btn[0].click();
            console.log("Click Allow")
            await delay(1000);

            await page.waitForXPath("//button[contains(text(),'Klaim')]");
            var btn = await page.$x("//button[contains(text(),'Klaim')]");
            btn[0].click();
            console.log("Click Klaim")

            await navigationPromise;
            await page.waitForSelector(".mat-chip-ripple")
            var barcodeS = false;
            var claimStatus = true;
            await page.waitForSelector('button[style*="color: rgb(238, 238, 238); background-color: rgb(0, 0, 0);"]')
            await delay(1000);
            while(true){
              var checkterm = await page.$('.terms-block');
              let checkerr = await page.evaluate(() => document.querySelector('body').innerHTML);
              if (checkterm) {
                  console.log("term nongol")
                  break;
              }else if (checkerr.match("Anda telah melebihi batas penggunaan untuk promo ini") || checkerr.match("You have exceeded the usage limit for this promo")) {
                console.log("wah udah pernah claim di alfa/indomaret inimah");
                claimStatus = false;
                await delay(3000);
                break;
              }else{
                  try{
                    let barcodevalue = await page.evaluate(() => document.querySelector('.barcode-value').innerHTML);
                    if (barcodevalue!='') {
                      barcodeS =  true;
                      console.log("udah pernah claim")
                      await delay(100);
                      break;
                    }
                  }catch(err){
                    console.log("Click Redeem")
                    var btn = await page.$x("//span[contains(text(),'Redeem')]");
                    try{
                      btn[0].click();
                    }catch(err){
                      console.log("try click redem")
                    }
                    await delay(100)
                  }
              }
                
            }

            if (claimStatus) {
              console.log(barcodeS);
              await navigationPromise;
              let statclaim = false;
              if (!barcodeS) {
                await delay(200);
                await page.waitForSelector('.terms-block')
                var checkmark = await page.$x('//span[@class="checkmark"][1]');
                checkmark[0].click();
                console.log("Click verif")
                await delay(1000);
                await page.waitForXPath("//span[contains(text(),'Claim it')]");
                while(true){
                  try{
                    var btn = await page.$x("//span[contains(text(),'Claim it')]");
                    btn[0].click();
                    console.log("Click Claim it")
                  }catch(err){
                    try{
                      let element = await page.$('.barcode-value')
                      let value = await page.evaluate(el => el.textContent, element);
                      if (value!='') {
                       break;
                      }
                    }catch(err){
                      console.log("nunggu barcode")
                    }
                  }
                  await delay(500)
                }
                statclaim = true;
              }
              let co = 0;
              console.log("catch barcode")
              while(true){
                try{
                  console.log("find el")
                  let element = await page.$('.barcode-value')
                  let value = await page.evaluate(el => el.textContent, element);
                  if (value!='') {
                    barcodeS =  true;
                    console.log("barcode udah muncul")
                    console.log(value);
                    namabarcode = value;
                    await delay(1000);
                    break;
                  }
                }catch(err){
                  console.log("nunggu barcode")
                }
                await delay(100);
              }
              while(true){
                if (barcodeS) {
                  break;
                }
                await delay(100);
              }
              
              while(true){
                try{
                  let match = await page.evaluate(() => document.querySelector('.description').innerHTML);
                  if (match) {
                    console.log("barcode udah nongol");
                    break;
                  }
                }catch(err){
                  try{
                    console.log("expand click");
                    await page.waitForXPath("//p[contains(text(),'Tap to expand')]");
                    var btn = await page.$x("//p[contains(text(),'Tap to expand')]");
                    btn[0].click();
                    await delay(1000);
                  }catch(err){
                    try{
                      await page.waitForSelector(".description");
                      await delay(1000);
                      break;
                    }catch(err){
                      console.log("gabisa ke klik masa")
                      break;
                    }
                  }
                }
                await delay(1000);
              }
              console.log("barcode "+namabarcode)
              let match = await page.evaluate(() => document.querySelector('.description').innerHTML);
              if (match) {
                console.log(match);
                await page.screenshot({path: './voucher/'+namabarcode+'.png'});
                console.log("[Sukses] "+user+" cek ajalah vouchernya "+namabarcode)
                await simpen('sukses', user)
              }
              await delay(500);
              console.log("close page")
            }
          }catch(err){
            // console.log(err)
            await delay(50000)
            console.log("[GAGAL] "+user+" cek ae ndiri lah, mungkin dah pernah login / claim, ini code buat akun yang belom pernah claim aja")
            await simpen('gagal', user)
          }
        }
        browser.close();

    }
})()
function delay(time) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, time)
   });
}
function simpen(filename, content){
  fs.appendFile(filename+'.txt', content+"\n", function (err) {
    if (err) throw err;
  });
}