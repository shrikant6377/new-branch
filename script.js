
const cherio = require('cherio');
 const request = require('request');
const fs = require('fs');

// Create a Write Stream 
var WriteStream  = fs.createWriteStream("ImagesLink.txt", "UTF-8");

request('https://www.growpital.com', (err, resp, html)=>{

    if(!err && resp.statusCode == 200){
        console.log("Request was success ");
        
        // Define Cherio or $ Object 
        const $ = cherio.load(html);

        $("img").each((index, image)=>{

            var img = $(image).attr('src');
            var baseUrl = 'https://www.growpital.com';
            var Links = baseUrl + img;
            WriteStream.write(Links);
            WriteStream.write("\n");
        });

    }else{
        console.log("Request Failed ");
    }

});

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");
 
// (async () => {
//   const browser = await puppeteer.launch();

//   const page = await browser.newPage();
//   page.on("response", async (response) => {
//     const url = response.url();
//     if (response.request().resourceType() === "image") {
//       response.buffer().then((file) => {
//         const fileName = url.split("/").pop();
//         const filePath = path.resolve(__dirname, fileName);
//         const writeStream = fs.createWriteStream(filePath);
//         writeStream.write(file);
//       });
//     }
//   });
//   await page.goto("https://freemediatools.com/");
//   await browser.close();
// })();






// const cheerio = require('cheerio');
// const axios = require('axios');

// const url = 'https://www.imdb.com/chart/top/?ref_=nv_mv_250';

// let movies = [];
// axios.get(url).
// then((response) => {

//     let $ = cheerio.load(response.data);
//     $('.lister-list tr').each(function(el , index){
//         let url = $(this).find('td.titleColumn a').attr('href');
//         let title = $(this).find('td.titleColumn a').text();
//         let rating = $(this).find('td.imdbRating').text();
//         movies.push({ title: title, rating: rating , url : url});
//     });
//     console.log(movies);

// }).catch((error)=>{
//     console.log(error);
// })