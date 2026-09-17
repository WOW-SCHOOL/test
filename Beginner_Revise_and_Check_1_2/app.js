const BASE_W=1600,BASE_H=900;
function fit(){const s=Math.min(innerWidth/BASE_W,innerHeight/BASE_H);document.getElementById('fit').style.transform=`translate(-50%,-50%) scale(${s})`}
addEventListener('resize',fit);fit();

const app=document.getElementById('app');
const SECTIONS=['vocab','grammar','core','functional','reading','pron','listening'];
const LABELS={vocab:'Vocabulary Mix',grammar:'Grammar Review',core:'Numbers & Personal Info',functional:'Real-life English',reading:'Reading',pron:'Pronunciation',listening:'Listening'};
const STORAGE_KEY='wow_beginner_revise_check_1_2_v1';

const data={
 vocab:[
  {q:"Turkish",a:"Turkey",o:["Turkey","Egypt","Japan","Spain"]},
  {q:"Switzerland",a:"Swiss",o:["Swiss","Swedish","Spanish","Turkish"]},
  {q:"American",a:"the United States",o:["the United States","England","Canada","Germany"]},
  {q:"Egypt",a:"Egyptian",o:["Egyptian","English","German","Japanese"]},
  {q:"Japanese",a:"Japan",o:["Japan","China","Poland","Brazil"]},
  {q:"Today is Wednesday. Tomorrow is ___.",a:"Thursday",o:["Thursday","Tuesday","Sunday","Monday"]},
  {q:"Open your ___, please.",a:"book",o:["book","board","door","chair"]},
  {q:"Write on the ___, please.",a:"board",o:["board","pen","door","book"]},
  {q:"Sorry, I don't ___.",a:"know",o:["know","spell","sit","open"]},
  {q:"Can you ___ that, please?",a:"repeat",o:["repeat","meet","number","email"]},
  {q:"What's your phone ___?",a:"number",o:["number","address","country","class"]},
  {q:"What's your email ___?",a:"address",o:["address","number","surname","nationality"]}
 ],
 grammar:[
  {q:"I ___ from Spain.",a:"am",o:["am","is","are"]},
  {q:"You ___ in room 7.",a:"are",o:["am","is","are"]},
  {q:"She ___ Italian.",a:"is",o:["am","is","are"]},
  {q:"It ___ from Japan.",a:"is",o:["am","is","are"]},
  {q:"We ___ on holiday.",a:"are",o:["am","is","are"]},
  {q:"They're from Canada. They ___ American.",a:"aren't",o:["aren't","isn't","am not"]},
  {q:"___ he from England?",a:"Is",o:["Am","Is","Are"]},
  {q:"___ you from Turkey?",a:"Are",o:["Am","Is","Are"]},
  {q:"___ they in class 2?",a:"Are",o:["Am","Is","Are"]},
  {q:"Where ___ she from?",a:"is",o:["am","is","are"]},
  {q:"How old ___ you?",a:"are",o:["am","is","are"]},
  {q:"What ___ your phone number?",a:"is",o:["am","is","are"]}
 ],
 core:[
  {q:"Listen. Choose the number.",audio:"fifteen",a:"15",o:["15","50","5"]},
  {q:"Listen. Choose the number.",audio:"fifty",a:"50",o:["50","15","40"]},
  {q:"Listen. Choose the number.",audio:"twenty-one",a:"21",o:["21","12","20"]},
  {q:"Listen. Choose the number.",audio:"seventy",a:"70",o:["70","17","7"]},
  {q:"Listen. Choose the number.",audio:"thirty-three",a:"33",o:["33","13","30"]},
  {q:"Listen. Choose the name.",audio:"My name is Nina. N. I. N. A.",a:"Nina",o:["Nina","Mina","Nena"]},
  {q:"Listen. Where is the speaker from?",audio:"I'm from Egypt.",a:"Egypt",o:["Egypt","England","Italy"]},
  {q:"Listen. Choose the phone number.",audio:"My phone number is zero seven four two, six eight five nine.",a:"0742 6859",o:["0742 6859","0724 6859","0742 6589"]},
  {q:"Listen. Choose the email address.",audio:"My email address is tom dot hill at yahoo dot com.",a:"tom.hill@yahoo.com",o:["tom.hill@yahoo.com","tom.hill@gmail.com","tomhill@yahoo.com"]},
  {q:"Listen. How old is the speaker?",audio:"I'm twenty-eight.",a:"28",o:["28","18","82"]}
 ],
 functional:[
  {q:"A: Nice to meet you.\nB: ___",a:"Nice to meet you, too.",o:["Nice to meet you, too.","See you tomorrow.","Please sit down."]},
  {q:"A: How do you spell your surname?\nB: ___",a:"M-A-R-T-I-N.",o:["M-A-R-T-I-N.","I'm from Martin.","It's twenty-one."]},
  {q:"A: Sorry. ___\nB: Yes. B-R-O-W-N.",a:"Can you repeat that, please?",o:["Can you repeat that, please?","Are you on holiday?","What's your phone number?"]},
  {q:"A: Are you on holiday?\nB: ___",a:"No, we aren't. We're on business.",o:["No, we aren't. We're on business.","No, she isn't. She's Polish.","Yes, it is."]},
  {q:"A: What's your phone number?\nB: ___",a:"It's 0756 4378.",o:["It's 0756 4378.","I'm twenty-seven.","It's smith@yahoo.com."]},
  {q:"A: What's your email address?\nB: ___",a:"It's jo.king@yahoo.com.",o:["It's jo.king@yahoo.com.","It's zero seven five six.","I'm from England."]},
  {q:"A: Excuse me. Are they free?\nB: ___",a:"Yes, they are. Please sit down.",o:["Yes, they are. Please sit down.","No, it isn't.","I'm from Canada."]},
  {q:"A: Have a nice day!\nB: ___",a:"Thanks.",o:["Thanks.","Goodnight.","What's that?"]},
  {q:"A: See you tomorrow!\nB: ___",a:"Bye!",o:["Bye!","I'm fine.","Thursday."]},
  {q:"A: Sorry, I don't know.\nB: ___",a:"That's OK.",o:["That's OK.","We're British.","It's twenty."]}
 ],
 reading:{
  text:`<b>Emma and Leo are at English class in London.</b> Emma is from Brazil. She is 21. Leo is from Switzerland. He is 30. Maya is the teacher. She is British. Kenji and Sara are students. Kenji is Japanese and Sara is Turkish.<br><br><b>Maya:</b> Are you Emma and Leo?<br><b>Emma:</b> Yes, we are.<br><b>Maya:</b> Are you on holiday?<br><b>Leo:</b> No, we aren't. We're students.<br><b>Sara:</b> Nice to meet you.<br><b>Emma:</b> Nice to meet you, too.`,
  audio:[
   'Emma and Leo are at English class in London. Emma is from Brazil. She is twenty-one.',
   'Leo is from Switzerland. He is thirty. Maya is the teacher. She is British.',
   'Kenji and Sara are students. Kenji is Japanese and Sara is Turkish.',
   'Maya asks, Are you Emma and Leo? Emma says, Yes, we are.',
   'Maya asks, Are you on holiday? Leo says, No, we are not. We are students.',
   'Sara says, Nice to meet you. Emma says, Nice to meet you, too.'
  ],
  qs:[
   {q:"Where are Emma and Leo?",a:"London",o:["London","Brazil","Switzerland"]},
   {q:"How old is Emma?",a:"21",o:["21","30","20"]},
   {q:"Where is Leo from?",a:"Switzerland",o:["Switzerland","Turkey","Japan"]},
   {q:"What nationality is Maya?",a:"British",o:["British","Brazilian","Japanese"]},
   {q:"Are Kenji and Sara students?",a:"Yes, they are.",o:["Yes, they are.","No, they aren't.","No, we aren't."]},
   {q:"Are Emma and Leo on holiday?",a:"No, they aren't.",o:["No, they aren't.","Yes, they are.","No, she isn't."]}
  ]
 },
 pron:[
  {w:"three",a:"/iː/"},{w:"meet",a:"/iː/"},{w:"please",a:"/iː/"},{w:"email",a:"/iː/"},
  {w:"phone",a:"/əʊ/"},{w:"no",a:"/əʊ/"},{w:"hotel",a:"/əʊ/"},{w:"Poland",a:"/əʊ/"},
  {w:"she",a:"/ʃ/"},{w:"English",a:"/ʃ/"},{w:"Turkish",a:"/ʃ/"},{w:"shower",a:"/ʃ/"}
 ],
 listening:{
  scripts:[
   {id:1,lines:[
    {text:"Hi. I'm Julia."},
    {text:"Hi, I'm Omar."},
    {text:"How do you spell your name?"},
    {text:"O. M. A. R."},
    {text:"Where are you from?"},
    {text:"I'm from Egypt. And you?"},
    {text:"I'm from Poland."},
    {text:"Nice to meet you."}
   ]},
   {id:2,lines:[
    {text:"Hello. What's your name?"},
    {text:"Ben Morris."},
    {text:"How do you spell your surname?"},
    {text:"M. O. R. R. I. S."},
    {text:"What's your phone number?"},
    {text:"It's zero seven seven two, four one six three."},
    {text:"Are you on holiday?"},
    {text:"Yes, I am."}
   ]}
  ],
  qs:[
   {q:"What is the man's name?",a:"Omar",o:["Omar","Julia","Ben"],script:1},
   {q:"How do you spell Omar?",a:"O-M-A-R",o:["O-M-A-R","O-M-E-R","A-M-A-R"],script:1},
   {q:"Where is Omar from?",a:"Egypt",o:["Egypt","Poland","England"],script:1},
   {q:"Where is Julia from?",a:"Poland",o:["Poland","Egypt","Brazil"],script:1},
   {q:"What is the man's surname?",a:"Morris",o:["Morris","Martin","Miller"],script:2},
   {q:"How do you spell Morris?",a:"M-O-R-R-I-S",o:["M-O-R-R-I-S","M-O-R-I-S","M-A-R-R-I-S"],script:2},
   {q:"What is Ben's phone number?",a:"0772 4163",o:["0772 4163","0727 4163","0772 4613"],script:2},
   {q:"Is Ben on holiday?",a:"Yes, he is.",o:["Yes, he is.","No, he isn't.","Yes, they are."],script:2}
  ]
 }
};
const MAX={vocab:data.vocab.length,grammar:data.grammar.length,core:data.core.length,functional:data.functional.length,reading:data.reading.qs.length,pron:data.pron.length,listening:data.listening.qs.length};
const fresh=()=>({screen:0,idx:{vocab:0,grammar:0,core:0,functional:0,reading:0,listening:0},answers:{vocab:{},grammar:{},core:{},functional:{},reading:{},pron:{},listening:{}},mistakes:{},selectedPron:null,sortOrder:null});
let state=fresh();
try{const s=JSON.parse(localStorage.getItem(STORAGE_KEY));if(s&&s.answers)state={...fresh(),...s,idx:{...fresh().idx,...(s.idx||{})},answers:{...fresh().answers,...s.answers}}}catch(e){}
// Every new open starts on the Preview screen; progress is still preserved.
state.screen=0;
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function solved(sec,i){return !!state.answers[sec]?.[i]?.solved}
function score(sec){return Object.values(state.answers[sec]||{}).filter(x=>x.firstCorrect).length}
function orderedOptions(sec,idx,opts){const offset=((idx+sec.length)%opts.length);return opts.slice(offset).concat(opts.slice(0,offset))}
function shuffledIndicesForSort(items){
 const original=items.map((_,i)=>i);const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
 const hasBadRun=order=>{let run=1;for(let i=1;i<order.length;i++){if(items[order[i]].a===items[order[i-1]].a){run++;if(run>2)return true}else run=1}return false};
 for(let attempt=0;attempt<100;attempt++){const c=shuffle([...original]);if(c.some((v,i)=>v!==original[i])&&!hasBadRun(c))return c}return shuffle([...original]);
}
function header(){return `<div class="noise"></div><div class="header"><div class="brandHeader"><div class="brandCopy"><div class="brandName">WOW SCHOOL</div><div class="brandMeta">online english school · wow-school.ru</div><div class="brandModule">interactive review module · Files 1&2</div></div></div><div class="unitBadge"><span>English File Beginner</span><strong>1&2 Review</strong></div></div>`}
function shell(inner){return `${header()}<section class="shell"><div class="content">${inner}</div></section>`}
function progress(n){return `<div class="progressBox"><strong>Блок ${n}/7</strong><div class="track"><i style="width:${n/7*100}%"></i></div></div>`}
function title(n,t,sub){return `<div class="titlebar"><div class="titlewrap"><h1><span class="n">${n}.</span> ${t}</h1><p>${sub}</p></div>${progress(n)}</div>`}
function miniProgress(sec,idx,total){return `<div class="internalProgress"><div class="miniDots">${Array.from({length:total},(_,i)=>`<i class="miniDot ${i<idx?'done':i===idx?'current':''}"></i>`).join('')}</div><div class="counter">Задание ${Math.min(idx+1,total)} из ${total}</div></div>`}
function feedback(kind,text){return `<div class="feedbackBox ${kind}">${text}</div>`}

let currentAudio=null,playToken=0,currentUtterance=null;
const ttsAudio=document.createElement('audio');ttsAudio.preload='auto';ttsAudio.setAttribute('playsinline','');ttsAudio.setAttribute('webkit-playsinline','');ttsAudio.referrerPolicy='no-referrer';ttsAudio.style.display='none';document.body.appendChild(ttsAudio);
function providerUrls(text){const q=encodeURIComponent(text.replace(/\s+/g,' ').trim());return [`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en-GB&q=${q}`,`https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${q}`,`https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${q}`,`https://translate.google.co.uk/translate_tts?ie=UTF-8&client=tw-ob&tl=en-GB&q=${q}`]}
function splitTTS(text,max=220){const clean=text.replace(/\s+/g,' ').trim();if(clean.length<=max)return [clean];const out=[];let rest=clean;while(rest.length){if(rest.length<=max){out.push(rest);break}let cut=-1;for(const mark of ['. ','? ','! ',', ','; ']){const i=rest.lastIndexOf(mark,max);if(i>Math.floor(max*.52)){cut=i+mark.length-1;break}}if(cut<0){cut=rest.lastIndexOf(' ',max);if(cut<Math.floor(max*.52))cut=max}out.push(rest.slice(0,cut).trim());rest=rest.slice(cut).trim()}return out.filter(Boolean)}
function stopAudio(){playToken++;try{ttsAudio.pause();ttsAudio.removeAttribute('src');ttsAudio.load()}catch(e){}try{if(window.speechSynthesis)window.speechSynthesis.cancel()}catch(e){}currentAudio=null;currentUtterance=null}
function playUrl(url,token){return new Promise((resolve,reject)=>{if(token!==playToken)return reject(new Error('cancelled'));const a=ttsAudio;currentAudio=a;let finished=false;const cleanup=()=>{a.onended=a.onerror=a.onstalled=a.onabort=null;clearTimeout(timer)};const timer=setTimeout(()=>{if(finished)return;finished=true;cleanup();reject(new Error('timeout'))},18000);a.onended=()=>{if(finished)return;finished=true;cleanup();resolve()};a.onerror=()=>{if(finished)return;finished=true;cleanup();reject(new Error('audio error'))};a.onstalled=()=>{};a.onabort=()=>{if(finished)return;finished=true;cleanup();reject(new Error('aborted'))};a.referrerPolicy='no-referrer';a.src=url;a.currentTime=0;a.load();const p=a.play();if(p&&typeof p.catch==='function')p.catch(err=>{if(finished)return;finished=true;cleanup();reject(err)})})}
function preferredBritishVoice(){try{const voices=window.speechSynthesis?.getVoices?.()||[];const preferred=['Google UK English Female','Google UK English Male','Microsoft Sonia Online (Natural) - English (United Kingdom)','Microsoft Ryan Online (Natural) - English (United Kingdom)'];for(const n of preferred){const v=voices.find(x=>x.name===n);if(v)return v}return voices.find(x=>/^en-GB$/i.test(x.lang))||voices.find(x=>/^en/i.test(x.lang))||null}catch(e){return null}}
function playBrowserSpeech(text,token){return new Promise((resolve,reject)=>{if(token!==playToken)return reject(new Error('cancelled'));if(!window.speechSynthesis||!window.SpeechSynthesisUtterance)return reject(new Error('speech synthesis unavailable'));try{window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);currentUtterance=u;u.lang='en-GB';u.rate=1;u.pitch=1;const v=preferredBritishVoice();if(v)u.voice=v;let done=false;const timer=setTimeout(()=>{if(done)return;done=true;try{window.speechSynthesis.cancel()}catch(e){}reject(new Error('speech timeout'))},30000);u.onend=()=>{if(done)return;done=true;clearTimeout(timer);resolve()};u.onerror=e=>{if(done)return;done=true;clearTimeout(timer);reject(e.error||new Error('speech error'))};window.speechSynthesis.speak(u)}catch(e){reject(e)}})}
async function playChunk(text,token){let lastErr=null;for(const url of providerUrls(text)){if(token!==playToken)throw new Error('cancelled');try{await playUrl(url,token);return}catch(e){lastErr=e}}if(token!==playToken)throw new Error('cancelled');try{await playBrowserSpeech(text,token);return}catch(e){lastErr=e}throw lastErr||new Error('No audio provider available')}
async function playSequence(texts,btn,idleLabel='▶ Прослушать'){stopAudio();const token=++playToken;btn?.classList.remove('error');btn?.classList.add('busy');if(btn)btn.textContent='■ Стоп';try{for(const text of texts){if(token!==playToken)return;await playChunk(text,token)}if(token===playToken){btn?.classList.remove('busy');if(btn)btn.textContent=idleLabel}}catch(e){if(token===playToken){btn?.classList.remove('busy');btn?.classList.add('error');if(btn)btn.textContent='Аудио недоступно';setTimeout(()=>{btn?.classList.remove('error');if(btn)btn.textContent=idleLabel},2200)}}}
function playText(text,btn){return playSequence(splitTTS(text),btn,'▶ Прослушать')}
function playScript(lines,btn){return playSequence(lines.flatMap(x=>splitTTS(x.text,120)),btn,'▶ Прослушать')}
function audioBtn(id,label='Прослушать'){return `<button class="audioBtn" id="${id}">▶ ${label}</button><span class="audioMeta">British English · синтез речи</span>`}
function recordAttempt(sec,i,isCorrect){let a=state.answers[sec][i];if(!a){a={attempts:0,firstCorrect:null,solved:false};state.answers[sec][i]=a}a.attempts++;if(a.firstCorrect===null)a.firstCorrect=isCorrect;if(isCorrect)a.solved=true;state.mistakes[`${sec}:${i}`]=isCorrect?null:true;save()}

function slotFallback(icon,title,caption){return `<div class="slotFallback"><div><div class="slotIcon">${icon}</div><strong>${esc(title)}</strong><span>${esc(caption)}</span><small>визуал добавим на следующем шаге</small></div></div>`}
function visualSlot(file,icon,badge,caption,alt){return `<div class="visualSlot"><img src="assets/images/${file}" alt="${esc(alt)}" onload="this.parentElement.classList.add('loaded')" onerror="this.style.display='none';this.parentElement.classList.remove('loaded')"><div class="visualBadge">${esc(badge)}</div>${slotFallback(icon,badge,caption)}</div>`}
function heroSlot(){return `<div class="heroSlot"><img class="heroImage" src="assets/images/preview-review-1-2.jpg" alt="Revise and Check 1 and 2 preview" onload="this.parentElement.classList.add('loaded')" onerror="this.style.display='none';this.parentElement.classList.remove('loaded')"><div class="slotFallback"><div><div class="slotIcon">✓</div><strong>1&2 Revise and Check</strong><span>Grammar · vocabulary · numbers · pronunciation · reading · listening</span><small>WOW SCHOOL · English File Beginner</small></div></div></div>`}
function readingSlot(){return `<div class="readingSlot"><img src="assets/images/block5-reading.jpg" alt="Students meeting in an English class" onload="this.parentElement.classList.add('loaded')" onerror="this.style.display='none';this.parentElement.classList.remove('loaded')">${slotFallback('📖','Reading Mission','International students meeting in class')}</div>`}

function commonQuestionScreen(sec,blockNum,heading,sub,visualHTML,item,total,audioText,afterLast){
 const idx=state.idx[sec]||0,done=solved(sec,idx),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(blockNum,heading,sub)}<div class="blockBody"><div class="visualCard">${visualHTML}</div><div class="questionCard"><div class="kicker">${LABELS[sec]}</div><div class="prompt" style="white-space:pre-line">${esc(item.q)}</div><div class="subprompt">Выбери правильный вариант. Если ошибёшься, можно попробовать ещё раз.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно! Переходим дальше.'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,total)}</div></div></div><div class="footerActions"><div class="leftActions">${audioText?audioBtn('audio','Прослушать'):''}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===total-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 const fb=document.getElementById('fb');
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');fb.innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');fb.innerHTML=feedback('bad','Пока нет. Попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 if(audioText){document.getElementById('audio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Прослушать'}else playText(audioText,this)}}
 document.getElementById('next').onclick=()=>{if(idx<total-1){state.idx[sec]=idx+1;save();render()}else afterLast()};
}

function start(){
 app.innerHTML=shell(`<div class="hero"><div><div class="heroKicker">WOW SCHOOL · English File Beginner · Files 1&2</div><h1>1&2 <span>Revise and Check</span></h1><p>7 интерактивных блоков: vocabulary, verb be, Wh- / How questions, numbers & personal information, real-life English, reading, pronunciation и listening.</p><div class="heroBtns"><button class="btn primary" id="start">Начать →</button><button class="btn secondary" id="reset">Сбросить прогресс</button></div></div><div class="heroVisual">${heroSlot()}</div></div>`);
 document.getElementById('start').onclick=()=>{state.screen=1;save();render()};
 document.getElementById('reset').onclick=()=>{localStorage.removeItem(STORAGE_KEY);state=fresh();render()};
}
function vocab(){const sec='vocab',idx=state.idx[sec]||0,item=data.vocab[idx];commonQuestionScreen(sec,1,'Vocabulary Mix','Files 1&2 · countries, nationalities, days, classroom & personal info',visualSlot('block1-vocabulary.jpg','🧩','Vocabulary Mix','Review vocabulary from Files 1 and 2','Vocabulary review'),item,data.vocab.length,null,()=>{state.screen=2;save();render()})}
function grammar(){const sec='grammar',idx=state.idx[sec]||0,item=data.grammar[idx];commonQuestionScreen(sec,2,'Grammar Review','verb be · I / you / he / she / it / we / they · Wh- / How questions',visualSlot('block2-grammar.jpg','✍️','Grammar Review','Singular and plural verb be with simple questions','Grammar review'),item,data.grammar.length,null,()=>{state.screen=3;save();render()})}
function core(){const sec='core',idx=state.idx[sec]||0,item=data.core[idx];commonQuestionScreen(sec,3,'Numbers & Personal Info','Слушай короткий фрагмент и выбирай правильную информацию',visualSlot('block3-listening-details.jpg','🎧','Listen for details','Numbers, spelling, phone and email','Personal information listening'),item,data.core.length,item.audio,()=>{state.screen=4;save();render()})}
function functional(){const sec='functional',idx=state.idx[sec]||0,item=data.functional[idx];commonQuestionScreen(sec,4,'Real-life English','Фразы из Files 1&2 и Practical English Episode 1',visualSlot('block4-real-life.jpg','💬','Real-life English','Meeting people, classroom language and personal information','Real-life English'),item,data.functional.length,null,()=>{state.screen=5;save();render()})}
function reading(){
 const sec='reading',idx=state.idx[sec]||0,item=data.reading.qs[idx],done=solved(sec,idx),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(5,'Reading Mission','Прочитай новую ситуацию по материалу Files 1&2')}<div class="blockBody"><div class="visualCard"><div class="readingVisual"><div class="readingArtFrame">${readingSlot()}</div><div class="readText">${data.reading.text}</div></div></div><div class="questionCard"><div class="kicker">Reading comprehension</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Ответь только по тексту.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,data.reading.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('readAudio','Послушать текст')}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.reading.qs.length-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Перечитай текст и попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('readAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Послушать текст'}else playSequence(data.reading.audio,this,'▶ Послушать текст')};
 document.getElementById('next').onclick=()=>{if(idx<data.reading.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=6;save();render()}};
}
function pron(){
 const bins=['/iː/','/əʊ/','/ʃ/'];if(!Array.isArray(state.sortOrder)||state.sortOrder.length!==data.pron.length){state.sortOrder=shuffledIndicesForSort(data.pron);save()}
 const order=state.sortOrder,allDone=data.pron.every((_,i)=>state.answers.pron[i]?.solved);
 app.innerHTML=shell(`${title(6,'Pronunciation Sort','Распредели слова по трём звукам')}<div class="sortLayout"><div class="bins">${bins.map(b=>`<div class="bin" data-bin="${b}"><strong>${b}</strong><small>${b==='/iː/'?'tree':b==='/əʊ/'?'phone':'shower'}</small><div class="binwords">${order.map(i=>{const x=data.pron[i];return state.answers.pron[i]?.solved&&x.a===b?`<button class="wordChip good" disabled>${esc(x.w)}</button>`:''}).join('')}</div></div>`).join('')}</div><div class="wordBank">${order.map(i=>{const x=data.pron[i];return !state.answers.pron[i]?.solved?`<button draggable="true" class="wordChip ${state.selectedPron===i?'selected':''}" data-word="${i}">${esc(x.w)}</button>`:''}).join('')}<span id="pronHint" class="audioMeta">${allDone?'Все слова распределены верно':'Карточки перемешаны. Выбери слово или перетащи его в колонку.'}</span></div></div><div class="footerActions"><div class="leftActions">${audioBtn('pronAudio','Послушать выбранное слово')}</div><button class="nextBtn" id="next" ${allDone?'':'disabled'}>Следующий блок →</button></div>`);
 function tryPlace(i,bin){const x=data.pron[i];let a=state.answers.pron[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;const ok=x.a===bin;if(a.firstCorrect===null)a.firstCorrect=ok;if(ok){a.solved=true;state.selectedPron=null}else{const h=document.getElementById('pronHint');h.textContent=`${x.w}: это не ${bin}. Попробуй другую колонку.`;h.style.color='#bd4053'}state.answers.pron[i]=a;save();if(ok)render()}
 document.querySelectorAll('[data-word]').forEach(w=>{const i=+w.dataset.word;w.onclick=()=>{state.selectedPron=i;save();render()};w.ondragstart=e=>{e.dataTransfer.setData('text/plain',String(i));e.dataTransfer.effectAllowed='move'}});
 document.querySelectorAll('[data-bin]').forEach(b=>{b.onclick=()=>{if(state.selectedPron!==null)tryPlace(state.selectedPron,b.dataset.bin)};b.ondragover=e=>{e.preventDefault();b.classList.add('dropTarget')};b.ondragleave=()=>b.classList.remove('dropTarget');b.ondrop=e=>{e.preventDefault();b.classList.remove('dropTarget');const i=+e.dataTransfer.getData('text/plain');if(Number.isInteger(i))tryPlace(i,b.dataset.bin)}});
 document.getElementById('pronAudio').onclick=function(){if(state.selectedPron===null){document.getElementById('pronHint').textContent='Сначала выбери слово';return}const word=data.pron[state.selectedPron].w;if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Послушать выбранное слово'}else playText(word,this)};
 document.getElementById('next').onclick=()=>{state.screen=7;save();render()};
}
function listening(){
 const sec='listening',idx=state.idx[sec]||0,item=data.listening.qs[idx],done=solved(sec,idx),script=data.listening.scripts.find(s=>s.id===item.script),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(7,'Listening Mission','Два новых диалога по материалу Files 1&2')}<div class="blockBody"><div class="visualCard">${visualSlot('block7-listening.jpg','🎧','Listen carefully','Names, countries, spelling, phone numbers','Listening practice')}</div><div class="questionCard"><div class="kicker">Dialogue ${script.id}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Диалог можно прослушать несколько раз.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Сначала прослушай диалог')}</div>${miniProgress(sec,idx,data.listening.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('listenAudio',`Диалог ${script.id}`)}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.listening.qs.length-1?'Результат →':'Следующее задание →'}</button></div>`);
 document.getElementById('listenAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent=`▶ Диалог ${script.id}`}else playScript(script.lines,this)};
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Прослушай ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('next').onclick=()=>{if(idx<data.listening.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=8;save();render()}};
}
function results(){
 const keys=SECTIONS,totalMax=keys.reduce((n,k)=>n+MAX[k],0),total=keys.reduce((n,k)=>n+score(k),0),pct=Math.round(total/totalMax*100),sorted=[...keys].sort((a,b)=>score(b)/MAX[b]-score(a)/MAX[a]),best=sorted[0],weak=sorted.at(-1);
 app.innerHTML=shell(`<div class="titlebar"><div class="titlewrap"><h1>Your <span class="n">Results</span></h1><p>Beginner · Files 1&2 · Revise and Check</p></div><div class="progressBox"><strong>Готово</strong><div class="track"><i style="width:100%"></i></div></div></div><div class="results"><div class="ring" style="--pct:${pct}"><strong>${pct}%</strong><span>с первого раза</span></div><div><div class="resultList">${keys.map(k=>{const p=Math.round(score(k)/MAX[k]*100);return `<div class="resrow"><label>${LABELS[k]}</label><div class="resbar"><i style="width:${p}%"></i></div><b>${score(k)}/${MAX[k]}</b></div>`}).join('')}</div><div class="coach"><div><strong>Сильнее всего</strong><p>${LABELS[best]} — лучший результат с первой попытки.</p></div><div><strong>Что повторить</strong><p>${LABELS[weak]} — этот блок стоит пройти ещё раз.</p></div></div><div class="heroBtns" style="margin-top:16px"><button class="btn primary" id="retry">Пройти ещё раз</button><button class="btn secondary" id="home">На главную</button></div></div></div>`);
 document.getElementById('retry').onclick=()=>{state=fresh();state.screen=1;save();render()};document.getElementById('home').onclick=()=>{state.screen=0;save();render()};
}
function render(){stopAudio();({0:start,1:vocab,2:grammar,3:core,4:functional,5:reading,6:pron,7:listening,8:results}[state.screen]||start)()}
render();
