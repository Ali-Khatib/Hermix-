// Local regression evidence: no external actions, accounts or persistent answers.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..'),out=process.env.REVIEW_DIR||path.join(root,'media/landing/review-meet');fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROME||undefined});const report=[];try{for(const width of [390,820,1920])for(const reduced of [false,true]){
const page=await browser.newPage({viewport:{width,height:width===390?844:1080},reducedMotion:reduced?'reduce':'no-preference'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>sessionStorage.setItem('hx-intro','1'));await page.goto((process.env.SITE_URL||'http://localhost:3021')+'/');await page.locator('#first-setup').scrollIntoViewIfNeeded();await page.waitForTimeout(1600);assert.ok(await page.locator('#first-setup').evaluate(e=>e.classList.contains('greeted')));
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
await page.locator('#first-setup').screenshot({path:path.join(out,'greeting-'+width+'-'+(reduced?'reduced':'motion')+'.png')});
if(reduced)assert.equal(await page.locator('.meet-character').evaluate(e=>getComputedStyle(e).animationName),'none');
const explain=page.getByRole('button',{name:'What’s this?',exact:true});await explain.focus();await page.keyboard.press('Enter');await page.getByRole('button',{name:'Let’s try it',exact:true}).waitFor();assert.ok(await page.locator('#meet-message').innerText().then(s=>s.includes('One question at a time')));
await page.keyboard.press('Enter');await page.locator('#meet-input').fill('<img src=x onerror=alert(1)>');await page.locator('#meet-input').press('Enter');assert.ok(await page.locator('#meet-message').innerText().then(s=>s.includes('one repetitive task')));
assert.equal(await page.locator('#meet-message img').count(),0);await page.locator('#meet-input').fill('Weekly reporting');await page.locator('#meet-input').press('Enter');assert.equal(await page.locator('#meet-form').isVisible(),false);assert.ok((await page.locator('#meet-message').innerText()).includes('hasn’t saved'));
await page.getByRole('button',{name:'Start again',exact:true}).click();await page.getByRole('button',{name:'Hello!',exact:true}).click();await page.locator('#meet-input').fill('Planning');await page.locator('#meet-input').press('Enter');await page.getByRole('button',{name:'Show me an example',exact:true}).click();assert.ok((await page.locator('#meet-message').innerText()).includes('meeting in ten minutes'));
await page.locator('#first-setup').screenshot({path:path.join(out,'example-'+width+'-'+(reduced?'reduced':'motion')+'.png')});
await page.locator('.meet-continue').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#how').evaluate(e=>e===document.activeElement),true);assert.equal(new URL(page.url()).hash,'#how');assert.deepEqual(errors,[]);report.push({width,reduced,keyboard:true,overflow:false,errors});await page.close();
}fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
