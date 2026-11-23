const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const root=path.join(__dirname,'..');const h=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const name of ['setup-interview','browser-helper']) test(name+' preview assets are real WebM and deferred',()=>{
 const videos=[name+'-preview-v1.webm','720/'+name+'-720-preview-v1.webm'];
 for(const file of videos){const p='media/landing/video/'+file;assert.ok(h.includes(p));const b=fs.readFileSync(path.join(root,p));assert.equal(b.subarray(0,4).toString('hex'),'1a45dfa3');assert.ok(b.length<400000);}
 assert.ok(fs.existsSync(path.join(root,'media/landing/posters/'+name+'-preview-v1.webp')));
});
test('previews are explicitly labeled and do not imply browser control',()=>{assert.match(h,/Actual app screen · Setup preview/);assert.match(h,/Actual app screen · Connection preview/);assert.match(h,/not general tab control/);assert.match(h,/first-account interview/);assert.match(h,/click-to-capture OCR/);assert.match(h,/not a recording of an answer being saved/);});
test('preview videos have poster, lazy loading, accessible label and pause control',()=>{
 for(const id of ['setup-preview-video','browser-preview-video']){const tag=[...h.matchAll(/<video[^>]*>[\s\S]*?<\/video>/g)].map(m=>m[0]).find(v=>v.includes('id="'+id+'"'));assert.ok(tag);assert.match(tag,/preload="none"/);assert.match(tag,/poster=/);assert.match(tag,/aria-label=/);assert.doesNotMatch(tag,/\ssrc=/);assert.ok(h.includes('data-preview-toggle="'+id+'"'));}
});
