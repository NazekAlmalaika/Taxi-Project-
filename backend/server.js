const puppeteer = require('puppeteer');
const express = require('express');
const Readable = require('stream');
const mjpeg = require('mp4-mjpeg');
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');
var streamBuffers = require('stream-buffers');
const { BufferListStream } = require('bl')
const fs = require('fs')


ffmpeg.setFfmpegPath(ffmpegPath);
var command = ffmpeg();

const app = express();
var mongoose = require('./database');
var slidersSchema = require('./models/sliders');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

app.get('/screenshot', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //await page.goto(req.query.url); // URL is given by the "user" (your client-side application)
    //await page.goto("http://localhost:3000"); // URL is given by the "user" (your client-side application)
    var html = '<div style="position: absolute; width: 100%; transform: translate3d(0px, 0px, 0px); height: 1800px;"><div style="position: absolute; background-size: cover; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, -1200px, 0px); background-image: url(&quot;https://awv3node-homepage.surge.sh/build/assets/stars.svg&quot;);"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, -120px, 0px); display: flex; align-items: center; justify-content: center;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/server.svg" style="display: block; width: 20%;"></div><div style="position: absolute; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 0px, 0px); background-color: rgb(128, 94, 115);"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 960px, 0px); pointer-events: none;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/satellite4.svg" style="display: block; width: 15%; margin-left: 70%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 120px, 0px); opacity: 0.1; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 20%; margin-left: 55%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 120px, 0px); opacity: 0.1; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 10%; margin-left: 15%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 750px, 0px); opacity: 0.1; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 20%; margin-left: 70%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 750px, 0px); opacity: 0.1; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 20%; margin-left: 40%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1020px, 0px); opacity: 0.4; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 20%; margin-left: 60%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1020px, 0px); opacity: 0.4; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 25%; margin-left: 30%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1020px, 0px); opacity: 0.4; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 10%; margin-left: 80%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 480px, 0px); opacity: 0.2; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 10%; margin-left: 10%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 480px, 0px); opacity: 0.2; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 20%; margin-left: 75%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 540px, 0px); display: flex; align-items: center; justify-content: center;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/bash.svg" style="display: block; width: 40%;"></div><div style="position: absolute; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1200px, 0px); background-color: rgb(135, 188, 222);"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1560px, 0px); opacity: 0.6; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 20%; margin-left: 5%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1560px, 0px); opacity: 0.6; display: block;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/cloud.svg" style="display: block; width: 15%; margin-left: 75%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1500px, 0px); display: flex; align-items: center; justify-content: center; pointer-events: none;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/earth.svg" style="display: block; width: 60%;"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1200px, 0px);"></div><div style="position: absolute; background-size: auto; background-repeat: no-repeat; will-change: transform; width: 100%; height: 600px; transform: translate3d(0px, 1200px, 0px); display: flex; align-items: center; justify-content: center;"><img alt="" src="https://awv3node-homepage.surge.sh/build/assets/clients-main.svg" style="display: block; width: 40%;"></div></div>'
    const contentset = await page.setContent(html,{waitUntil: 'load'}).catch(() => {});
   
    await page.setJavaScriptEnabled(true);
    console.log("scroll to 635");
    await page.evaluate('window.scrollBy(0, 1000)');
    //await page.waitFor(2000);
    //{ clip: { x:0, y:900, width:855, height:600 }}
    const screenshotBuffer = await page.screenshot().catch((error) => {console.log(error)});
    // Respond with the image
    if(screenshotBuffer) {
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': screenshotBuffer.length
        });
        res.end(screenshotBuffer); 
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': html.length
        });
        res.end(html); 
    }
    await browser.close();
});

app.get('/presentationToImg/:author', async(req,res) => {

    var author = req.params.author;
    console.log(mongoose.connection.readyState);
    
    
    if(mongoose.connection.readyState == 1){
        try {
            slidersSchema.Slider.find({ author : author}).exec(async function(err, sliders) {
               
                if (sliders.length > 0){
                    const browser = await puppeteer.launch();
                    var html = []
                    var slides = []
                    var buffered = []
                    console.log(sliders.length);
                    sliders[0].slides.forEach( slide => {
                        html.push({id: slide._id, scroll: slide.scroll , index: slide.index});
                        slides.push({id: slide._id, scroll: slide.scroll , index: slide.index, content:slide.content});
                    });
                    slides.sort(function(a, b) {
                        return a.scroll - b.scroll;
                    });
                    // or if we have the image as a buffer
                    console.log("start " +  slides.length);
                    const bufferedResult = await slides.map( async slide => {
                        //console.log(`within scroll to ${slide.scroll}`);
                        const page = await browser.newPage();
                        //const contentset = await page.setContent(slide.content).catch(() => {});
                        await page.setDefaultNavigationTimeout(0);
                        await page.goto(`data:text/html,${slide.content}`, { waitUntil: 'networkidle0' });

                        //await sleep(2000);
                        await page.setJavaScriptEnabled(true);
                        await page.evaluate(`window.scrollBy(0, ${slide.scroll})`);
                        const screenshotBuffer = await page.screenshot({
                            fullPage: true,
                            path:`images/${slide.scroll}.png`
                          });
                        buffered.push(screenshotBuffer);
                        return {img: screenshotBuffer, scroll: slide.scroll};
                    });
                    console.log("finished");
                    console.log(buffered.length);
                    console.log(bufferedResult.length);
                    Promise.all(bufferedResult).then(function(values) {
                        //console.log(values);
                       
                        res.send(JSON.stringify({ result: 'done'})); 
                    });
                } else {
                    res.send(JSON.stringify({ result: []})); 
                }
            });
         } catch(e) {
            console.log('Error:', e.message)
            res.send(JSON.stringify({ result: []})); 
         } 
       
    } else {
        res.send(JSON.stringify({ result: []})); 
    }
   

});

app.get('/presentation/:author', async (req, res) => {
   
    
    var author = req.params.author;
    console.log(mongoose.connection.readyState);
    
    
    if(mongoose.connection.readyState == 1){
        try {
            slidersSchema.Slider.find({ author : author}).exec(async function(err, sliders) {
               
                if (sliders.length > 0){
                    const browser = await puppeteer.launch();
                    var html = []
                    var slides = []
                    var buffered = []
                    console.log(sliders.length);
                    sliders[0].slides.forEach( slide => {
                        html.push({id: slide._id, scroll: slide.scroll , index: slide.index});
                        slides.push({id: slide._id, scroll: slide.scroll , index: slide.index, content:slide.content});
                    });
                    slides.sort(function(a, b) {
                        return a.scroll - b.scroll;
                    });
                    // or if we have the image as a buffer
                    console.log("start " +  slides.length);
                    const bufferedResult = await slides.map( async slide => {
                        //console.log(`within scroll to ${slide.scroll}`);
                        const page = await browser.newPage();
                        await page.setDefaultNavigationTimeout(0);
                        await page.goto(`data:text/html,${slide.content}`, { waitUntil: 'networkidle0' });
                        await page.setJavaScriptEnabled(true);
                        await page.evaluate(`window.scrollBy(0, ${slide.scroll})`);
                        const screenshotBuffer = await page.screenshot();
                        buffered.push(screenshotBuffer);
                        return {img: screenshotBuffer, scroll: slide.scroll};
                    });
                    console.log("finished");
                    console.log(buffered.length);
                    console.log(bufferedResult.length);
                    Promise.all(bufferedResult).then(function(values) {
                        //console.log(values);
                        var bl = new BufferListStream();
                        values.sort(function(a, b) {return a.scroll - b.scroll;}).forEach(screenshotBuffer => {
                            if(screenshotBuffer.img!== undefined && screenshotBuffer.img!== null){
                                console.log(`test ${screenshotBuffer.scroll} ` + screenshotBuffer.img.length);
                                bl.append(screenshotBuffer.img);
                            }
                        });
                        command.input(bl)
                        .inputFPS(30/1)
                        .output('Sinewav.mp4')
                        .outputFPS(30)
                        .noAudio()
                        .run();
                        res.send(JSON.stringify({ result: 'done'})); 
                    });
                } else {
                    res.send(JSON.stringify({ result: []})); 
                }
            });
         } catch(e) {
            console.log('Error:', e.message)
            res.send(JSON.stringify({ result: []})); 
         } 
       
    } else {
        res.send(JSON.stringify({ result: []})); 
    }
   
   
});

app.get('/getSlides/:author', async (req, res) => {
    var author = req.params.author;
    console.log(mongoose.connection.readyState);
    
    var html;
    if(mongoose.connection.readyState == 1){
        try {
            await slidersSchema.Slider.find({ author : author}).exec(async function(err, sliders) {
                var html = [];
                if (sliders.length > 0){
                    console.log(sliders.length);
                    sliders[0].slides.forEach( slide => {
                        html.push({id: slide._id, content: slide.content, scroll: slide.scroll , index: slide.index});
                    });            
                    res.write(JSON.stringify({ result: html})); 
                } 
                res.end(); 
            });
         } catch(e) {
            console.log('Error:', e.message)
            res.send(JSON.stringify({ result: []})); 
         } 
       
    } else {
        res.send(JSON.stringify({ result: html})); 
    }
    
    

});

app.post('/addSlide', async (req, res) => {
    var content = req.body.content;
    var index = req.body.index;
    var uid = req.body.uid;
    var scroll = req.body.scroll;
    try { 
        var query = { author: uid };
        slidersSchema.Slider.find(query).exec(async function(err, sliders) {
            
            var slide = new slidersSchema.Slides({content: content, index:index, scroll:scroll});
            if( sliders !== undefined && sliders !== null && sliders.length>0){
                console.log(sliders[0].slides.length);
                sliders[0].slides.push(slide);
                await sliders[0].save();
            } else {
                console.log("create new one");
                //create new one
                var slider = new slidersSchema.Slider({author: uid, slides: [slide] });
                await slider.save();
                slidersSchema.Slider.find().exec(function(err, sliders) {
                    console.log(sliders.length);
                });
            }
        });
        
    }
    catch(e) {
        console.log('Error:', e.message)
    } 
    res.writeHead(200, {
        'Content-Type': 'appliation/json',
    });
    res.end(JSON.stringify({ result: "success"})); 
});

async function autoScroll(page){
    await page.evaluate(() => {
            window.scrollTo(-150,-1200);
    });
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

app.listen(4000);