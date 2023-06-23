
const puppeteer = require("puppeteer");
const fs = require("fs");

const rawData = fs.readFileSync('ranges.json');
const jsonData = JSON.parse(rawData);


async function takeScreenshot(ip, pathforss)  {
    
    // Create a browser instance
    const browser = await puppeteer.launch(
        {headless: "new"}
    );

    // Create a new page
    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 720 });

    const website_url = `http://${ip}`;
    console.log(`Loading ${website_url}`);
    // Open URL in current page  
    try {
    await page.goto(website_url, { waitUntil: 'networkidle0' });
        
    } catch (e) {
        console.log('Couldn\'t resolve ' + website_url);
    }
    try {
        await page.screenshot({
            path: pathforss + '/' + ip + '.png',
            fullPage: true 
          });
          console.log(`Successfully Took a screenshot of  ${website_url}`);
    } catch (e) {
        console.log('Couldn\'t take screenshot of ' + website_url);
    }
    browser.close();
    return false;
}
async function runTask(type, range, skip = false, skipto1, skipto2) {
    if (type = "one") {
        let alreadySkipped = (skip) ? false : true;
    for (let i = 0; i < 255; i++ ) {
        if (alreadySkipped) {
            ;
        } else {
            i += skipto1;
            alreadySkipped = true;
        }
        let ipm = `${range}.${i}`;
        let path = 'screenshots/' + range;
        await takeScreenshot(ipm, path);
    }
} else if (type = "two") {
    let alreadySkipped = (skip) ? false : true;
    let alreadySkipped2 = (skip) ? false : true;
    for (let i = 0; i < 255; i++ ) {
        if (alreadySkipped) {
            ;
        } else {
            i += skipto2;
            alreadySkipped = true;
        }
        let ipm = `${range}.${i}`;
        for (let j = 0; j < 255; j++ ) {
            if (alreadySkipped2) {
                ;
            } else {
                j += skipto1;
                alreadySkipped2 = true;
            }
            let ipx = `${ipm}.${j}`;
            let path = 'screenshots/' + range;
            await takeScreenshot(ipx, path);
        }
    }
}
}
async function taskManager() {
for (let x = 0; x < jsonData.length; x++) {
    if (jsonData[x].type == "one") {
        
        let type = jsonData[x].type;
        let range = jsonData[x].range;
        let skip = jsonData[x].skip;
        let skipto1 = jsonData[x].skipto1;
        try {
        fs.mkdirSync(`screenshots/${range}`);
        } catch (e) {
            if (e.code == 'EEXIST') console.log('Folder already exists, ignoring foler creation.')
        }
        await runTask(type, range, skip, skipto1);
    } else if (jsonData[x].type == "two") {
        let type = jsonData[x].type;
        let range = jsonData[x].range;
        let skip = jsonData[x].skip;
        let skipto1 = jsonData[x].skipto1;
        let skipto2 = jsonData[x].skipto2;
        try {
            fs.mkdirSync(`screenshots/${range}`);
            } catch (e) {
                if (e.code == 'EEXIST') console.log('Folder already exists, ignoring foler creation.')
            }
        await runTask(type, range, skip, skipto1, skipto2);
    }
}
}
taskManager();