const BASE_W=1600,BASE_H=900;
function fit(){const s=Math.min(innerWidth/BASE_W,innerHeight/BASE_H);document.getElementById('fit').style.transform=`translate(-50%,-50%) scale(${s})`}
addEventListener('resize',fit);fit();

const app=document.getElementById('app');
const SECTIONS=['phrases','grammar','spelling','functional','reading','pron','listening'];
const LABELS={phrases:'Words & Phrases',grammar:'Grammar',spelling:'Spelling',functional:'Real-life English',reading:'Reading',pron:'Alphabet Sounds',listening:'Listening'};
const STORAGE_KEY='wow_pe1_spell_v1';

const data={
 phrases:[
  {q:'surname',a:'фамилия',o:['имя','фамилия','страна','номер комнаты']},
  {q:'book',a:'книга',o:['книга','окно','ручка','стол']},
  {q:'dictionary',a:'словарь',o:['доска','словарь','бумага','дверь']},
  {q:'How do you spell it?',a:'Как это пишется по буквам?',o:['Как это пишется по буквам?','Как вас зовут?','Откуда вы?','Сколько человек?']},
  {q:'Can you repeat that, please?',a:'Можете повторить, пожалуйста?',o:['Можете повторить, пожалуйста?','Откройте книгу, пожалуйста.','Садитесь, пожалуйста.','До завтра.']},
  {q:'I have a reservation.',a:'У меня есть бронь.',o:['У меня есть бронь.','Я из Лондона.','Я не в отпуске.','Я журналист.']},
  {q:'How can I help you?',a:'Чем я могу вам помочь?',o:['Чем я могу вам помочь?','Как ваша фамилия?','Который час?','Это правильно?']},
  {q:'A table for tomorrow, please.',a:'Столик на завтра, пожалуйста.',o:['Столик на завтра, пожалуйста.','Книга на столе.','Номер комнаты три.','До завтра, пока.']},
  {q:'Sorry?',a:'Простите? / Повторите?',o:['Спасибо.','Простите? / Повторите?','Доброе утро.','Всё верно.']},
  {q:'That’s right.',a:'Всё верно.',o:['Всё верно.','Я не знаю.','До свидания.','Одну минуту.']}
 ],
 grammar:[
  {q:'I ___ Rob.',a:'am',o:['am','is','are']},
  {q:'She ___ Jenny.',a:'is',o:['am','is','are']},
  {q:'He ___ from London.',a:'is',o:['am','is','are']},
  {q:'It ___ Italian.',a:'is',o:['am','is','are']},
  {q:'I ___ not on holiday.',a:'am',o:['am','is','are']},
  {q:'___ she from New York?',a:'Is',o:['Am','Is','Are']},
  {q:'___ he a journalist?',a:'Is',o:['Am','Is','Are']},
  {q:'Are you Rob?',a:'Yes, I am.',o:['Yes, I am.','Yes, he is.','Yes, you are.']},
  {q:'Is Jenny from London?',a:'No, she isn’t.',o:['No, she isn’t.','No, I’m not.','No, he isn’t.']},
  {q:'My name ___ Alex.',a:'is',o:['am','is','are']}
 ],
 spelling:[
  {q:'Listen. Choose the correct word.',audio:'W. A. L. K. E. R.',a:'WALKER',o:['WALKER','WOLKER','WALCER']},
  {q:'Listen. Choose the correct word.',audio:'B. O. O. K.',a:'BOOK',o:['BOOK','BOCK','BUUK']},
  {q:'Listen. Choose the correct word.',audio:'B. I. R. T. H. D. A. Y.',a:'BIRTHDAY',o:['BIRTHDAY','BIRTDAY','BIRTHDAI']},
  {q:'Listen. Choose the correct name.',audio:'J. E. N. N. Y.',a:'JENNY',o:['JENNY','GENNY','JENI']},
  {q:'Listen. Choose the correct word.',audio:'T. A. B. L. E.',a:'TABLE',o:['TABLE','TABEL','TEBLE']},
  {q:'Listen. Choose the correct word.',audio:'H. O. T. E. L.',a:'HOTEL',o:['HOTEL','HOTAL','HOTELL']},
  {q:'Listen. Choose the correct country.',audio:'P. O. L. A. N. D.',a:'POLAND',o:['POLAND','POLEND','POLLAND']},
  {q:'Listen. Choose the correct city.',audio:'L. O. N. D. O. N.',a:'LONDON',o:['LONDON','LONDEN','LONDAN']},
  {q:'Listen. Choose the correct word.',audio:'R. O. O. M.',a:'ROOM',o:['ROOM','ROM','ROON']},
  {q:'Listen. Choose the correct surname.',audio:'R. E. E. D.',a:'REED',o:['REED','READ','RED']}
 ],
 functional:[
  {q:'Receptionist: Good afternoon. Guest: ___',a:'Hello. I have a reservation.',o:['Hello. I have a reservation.','A table for tomorrow, please.','Sit down, please.']},
  {q:'Receptionist: Sorry, what’s your surname?',a:'King.',o:['King.','Three.','Seven o’clock.']},
  {q:'Receptionist: How do you spell it?',a:'K-I-N-G.',o:['K-I-N-G.','Good afternoon.','That’s right.']},
  {q:'Receptionist: Sorry?',a:'K-I-N-G.',o:['K-I-N-G.','Thanks. Bye.','Two people.']},
  {q:'Waiter: How can I help you?',a:'A table for tomorrow, please.',o:['A table for tomorrow, please.','I’m from London.','Open your books.']},
  {q:'Waiter: How many people?',a:'Three.',o:['Tuesday.','Three.','Seven o’clock.']},
  {q:'Waiter: What time?',a:'Seven o’clock.',o:['Seven o’clock.','Tomorrow.','Jenny.']},
  {q:'Waiter: A table for three on Tuesday at seven.',a:'Great. Thanks.',o:['Great. Thanks.','Sorry, what’s your surname?','I’m not on holiday.']}
 ],
 reading:{
  text:`<b>Good afternoon. My name’s Maya King.</b> I’m from London. Today I’m in Warsaw for work. At the hotel I say, “Hello. I have a reservation.” The receptionist asks, “What’s your surname?” I say, “King — K-I-N-G.” I’m in room eight. Later, I phone a restaurant. “A table for tomorrow, please.” The waiter asks, “How many people?” “Three,” I say. “What time?” “Seven o’clock.” “That’s right,” I say. “Thank you.”`,
  audio:[
   'Good afternoon. My name’s Maya King. I’m from London. Today I’m in Warsaw for work.',
   'At the hotel I say, Hello. I have a reservation. The receptionist asks, What’s your surname?',
   'I say, King. K I N G. I’m in room eight.',
   'Later, I phone a restaurant. A table for tomorrow, please.',
   'The waiter asks, How many people? Three, I say. What time? Seven o’clock. That’s right, I say. Thank you.'
  ],
  qs:[
   {q:'Where is Maya from?',a:'London',o:['London','Warsaw','New York']},
   {q:'Why is Maya in Warsaw?',a:'For work',o:['For work','On holiday','For school']},
   {q:'What is Maya’s surname?',a:'King',o:['Walker','King','Reed']},
   {q:'What room is Maya in?',a:'Room eight',o:['Room three','Room eight','Room seven']},
   {q:'How many people is the restaurant table for?',a:'Three',o:['Two','Three','Seven']},
   {q:'What time is the table?',a:'Seven o’clock',o:['Three o’clock','Seven o’clock','Eight o’clock']}
  ]
 },
 pron:[
  {w:'B',a:'/iː/'},{w:'F',a:'/e/'},{w:'A',a:'/eɪ/'},{w:'C',a:'/iː/'},
  {w:'L',a:'/e/'},{w:'H',a:'/eɪ/'},{w:'D',a:'/iː/'},{w:'M',a:'/e/'},
  {w:'J',a:'/eɪ/'},{w:'T',a:'/iː/'},{w:'S',a:'/e/'},{w:'K',a:'/eɪ/'}
 ],
 listening:{
  scripts:[
   {id:1,lines:[
    {text:'Good afternoon.'},
    {text:'Hello. My name’s Maya King. I have a reservation.'},
    {text:'Sorry, what’s your surname?'},
    {text:'King.'},
    {text:'How do you spell it?'},
    {text:'K I N G.'},
    {text:'Thank you. You’re in room eight.'},
    {text:'Thanks.'}
   ]},
   {id:2,lines:[
    {text:'Good morning. How can I help you?'},
    {text:'A table for tomorrow, please.'},
    {text:'How many people?'},
    {text:'Two.'},
    {text:'What time?'},
    {text:'Seven o’clock.'},
    {text:'What’s your name, please?'},
    {text:'Alex Reed. That’s R E E D.'},
    {text:'Thank you. A table for two tomorrow at seven.'},
    {text:'Great. Thanks. Bye.'}
   ]}
  ],
  qs:[
   {q:'What greeting do you hear?',a:'Good afternoon',o:['Good morning','Good afternoon','Good evening'],script:1},
   {q:'What is the guest’s surname?',a:'King',o:['Walker','King','Reed'],script:1},
   {q:'How does Maya spell her surname?',a:'K-I-N-G',o:['K-I-N-G','K-E-N-G','K-I-M-G'],script:1},
   {q:'What room is Maya in?',a:'Room eight',o:['Room two','Room seven','Room eight'],script:1},
   {q:'How many people is the table for?',a:'Two',o:['Two','Three','Seven'],script:2},
   {q:'What time is the table?',a:'Seven o’clock',o:['Two o’clock','Seven o’clock','Eight o’clock'],script:2},
   {q:'What is the surname?',a:'Reed',o:['Reed','King','Walker'],script:2},
   {q:'How does Alex spell the surname?',a:'R-E-E-D',o:['R-E-E-D','R-E-A-D','R-E-D-D'],script:2}
  ]
 }
};

const MAX={phrases:data.phrases.length,grammar:data.grammar.length,spelling:data.spelling.length,functional:data.functional.length,reading:data.reading.qs.length,pron:data.pron.length,listening:data.listening.qs.length};
const fresh=()=>({screen:0,idx:{phrases:0,grammar:0,spelling:0,functional:0,reading:0,listening:0},answers:{phrases:{},grammar:{},spelling:{},functional:{},reading:{},pron:{},listening:{}},mistakes:{},selectedPron:null,sortOrder:null});
let state=fresh();
try{const s=JSON.parse(localStorage.getItem(STORAGE_KEY));if(s&&s.answers)state={...fresh(),...s,idx:{...fresh().idx,...(s.idx||{})},answers:{...fresh().answers,...s.answers}}}catch(e){}
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
function header(){return `<div class="noise"></div><div class="header"><div class="brandHeader"><div class="brandCopy"><div class="brandName">WOW SCHOOL</div><div class="brandMeta">online english school · wow-school.ru</div><div class="brandModule">interactive lesson module · Practical English Episode 1</div></div></div><div class="unitBadge"><span>English File Beginner</span><strong>Unit 1 · Episode 1</strong></div></div>`}
function shell(inner){return `${header()}<section class="shell"><div class="content">${inner}</div></section>`}
function progress(n){return `<div class="progressBox"><strong>Блок ${n}/7</strong><div class="track"><i style="width:${n/7*100}%"></i></div></div>`}
function title(n,t,sub){return `<div class="titlebar"><div class="titlewrap"><h1><span class="n">${n}.</span> ${t}</h1><p>${sub}</p></div>${progress(n)}</div>`}
function miniProgress(sec,idx,total){return `<div class="internalProgress"><div class="miniDots">${Array.from({length:total},(_,i)=>`<i class="miniDot ${i<idx?'done':i===idx?'current':''}"></i>`).join('')}</div><div class="counter">Задание ${Math.min(idx+1,total)} из ${total}</div></div>`}
function feedback(kind,text){return `<div class="feedbackBox ${kind}">${text}</div>`}

let currentAudio=null,playToken=0;
const ttsAudio=document.createElement('audio');ttsAudio.preload='auto';ttsAudio.setAttribute('playsinline','');ttsAudio.setAttribute('webkit-playsinline','');ttsAudio.referrerPolicy='no-referrer';ttsAudio.style.display='none';document.body.appendChild(ttsAudio);
function providerUrls(text){const q=encodeURIComponent(text.replace(/\s+/g,' ').trim());return [`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en-GB&q=${q}`,`https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${q}`,`https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${q}`]}
function splitTTS(text,max=260){const clean=text.replace(/\s+/g,' ').trim();if(clean.length<=max)return [clean];const out=[];let rest=clean;while(rest.length){if(rest.length<=max){out.push(rest);break}let cut=-1;for(const mark of ['. ','? ','! ',', ','; ']){const i=rest.lastIndexOf(mark,max);if(i>Math.floor(max*.55)){cut=i+mark.length-1;break}}if(cut<0){cut=rest.lastIndexOf(' ',max);if(cut<Math.floor(max*.55))cut=max}out.push(rest.slice(0,cut).trim());rest=rest.slice(cut).trim()}return out.filter(Boolean)}
function stopAudio(){playToken++;try{ttsAudio.pause();ttsAudio.removeAttribute('src');ttsAudio.load()}catch(e){}currentAudio=null}
function playUrl(url,token){return new Promise((resolve,reject)=>{if(token!==playToken)return reject(new Error('cancelled'));const a=ttsAudio;currentAudio=a;let finished=false;const cleanup=()=>{a.onended=a.onerror=a.onstalled=a.onabort=null;clearTimeout(timer)};const timer=setTimeout(()=>{if(finished)return;finished=true;cleanup();reject(new Error('timeout'))},30000);a.onended=()=>{if(finished)return;finished=true;cleanup();resolve()};a.onerror=()=>{if(finished)return;finished=true;cleanup();reject(new Error('audio error'))};a.onstalled=()=>{};a.onabort=()=>{if(finished)return;finished=true;cleanup();reject(new Error('aborted'))};a.referrerPolicy='no-referrer';a.src=url;a.currentTime=0;a.load();const p=a.play();if(p&&typeof p.catch==='function')p.catch(err=>{if(finished)return;finished=true;cleanup();reject(err)})})}
async function playChunk(text,token){let lastErr=null;for(const url of providerUrls(text)){if(token!==playToken)throw new Error('cancelled');try{await playUrl(url,token);return}catch(e){lastErr=e}}throw lastErr||new Error('No audio provider available')}
async function playSequence(texts,btn,idleLabel='▶ Прослушать'){stopAudio();const token=++playToken;btn?.classList.remove('error');btn?.classList.add('busy');if(btn)btn.textContent='■ Стоп';try{for(const text of texts){if(token!==playToken)return;await playChunk(text,token)}if(token===playToken){btn?.classList.remove('busy');if(btn)btn.textContent=idleLabel}}catch(e){if(token===playToken){btn?.classList.remove('busy');btn?.classList.add('error');if(btn)btn.textContent='Аудио недоступно';setTimeout(()=>{btn?.classList.remove('error');if(btn)btn.textContent=idleLabel},2200)}}}
function playText(text,voice='Brian',btn){return playSequence(splitTTS(text),btn,'▶ Прослушать')}
function playScript(lines,btn){return playSequence(splitTTS(lines.map(x=>x.text).join(' ')),btn,'▶ Прослушать')}
function audioBtn(id,label='Прослушать'){return `<button class="audioBtn" id="${id}">▶ ${label}</button><span class="audioMeta">British English · online voice</span>`}
function recordAttempt(sec,i,isCorrect){let a=state.answers[sec][i];if(!a){a={attempts:0,firstCorrect:null,solved:false};state.answers[sec][i]=a}a.attempts++;if(a.firstCorrect===null)a.firstCorrect=isCorrect;if(isCorrect)a.solved=true;state.mistakes[`${sec}:${i}`]=isCorrect?null:true;save()}

function visualImage(file,badge,alt){return `<div class="sceneFrame"><img class="sceneImg contain padded" src="assets/images/${file}" alt="${esc(alt)}"><div class="visualBadge">${esc(badge)}</div></div>`}
function commonQuestionScreen(sec,blockNum,heading,sub,visualHTML,item,total,audioText,afterLast){
 const idx=state.idx[sec]||0,done=solved(sec,idx),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(blockNum,heading,sub)}<div class="blockBody"><div class="visualCard">${visualHTML}</div><div class="questionCard"><div class="kicker">${LABELS[sec]}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Выбери правильный вариант. Если ошибёшься, можно попробовать ещё раз.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно! Переходим дальше.'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,total)}</div></div></div><div class="footerActions"><div class="leftActions">${audioText?audioBtn('audio','Прослушать'):''}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===total-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 const fb=document.getElementById('fb');
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');fb.innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');fb.innerHTML=feedback('bad','Пока нет. Попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 if(audioText){document.getElementById('audio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Прослушать'}else playText(audioText,'Brian',this)}}
 document.getElementById('next').onclick=()=>{if(idx<total-1){state.idx[sec]=idx+1;save();render()}else afterLast()};
}

function start(){
 app.innerHTML=shell(`<div class="hero"><div><div class="heroKicker">WOW SCHOOL · Practical English review</div><h1>How do you <span>spell it?</span></h1><p>7 интерактивных блоков: classroom & useful phrases, verb be, spelling, hotel & restaurant English, reading, alphabet sounds и listening.</p><div class="heroBtns"><button class="btn primary" id="start">Начать →</button><button class="btn secondary" id="reset">Сбросить прогресс</button></div></div><div class="heroVisual"><img class="heroImage" src="assets/images/preview-unit.jpg" alt="English learners"><div class="tag a">EPISODE 1</div><div class="tag b">Practical English</div></div></div>`);
 document.getElementById('start').onclick=()=>{state.screen=1;save();render()};document.getElementById('reset').onclick=()=>{state=fresh();save();render()};
}
function phrases(){const sec='phrases',idx=state.idx[sec]||0,item=data.phrases[idx];commonQuestionScreen(sec,1,'Words & Phrases','Classroom language + useful real-life phrases',visualImage('block1-classroom.jpg','Everyday English','Students in class'),item,data.phrases.length,item.q,()=>{state.screen=2;save();render()})}
function grammar(){const sec='grammar',idx=state.idx[sec]||0,item=data.grammar[idx];commonQuestionScreen(sec,2,'Grammar Check','verb be · I / he / she / it',visualImage('block2-personal-info.jpg','Personal information','Person introducing herself'),item,data.grammar.length,null,()=>{state.screen=3;save();render()})}
function spelling(){const sec='spelling',idx=state.idx[sec]||0,item=data.spelling[idx];commonQuestionScreen(sec,3,'Spelling Challenge','Слушай буквы и выбирай правильное слово',visualImage('block3-spelling.jpg','Listen → spell → choose','Listening and spelling'),item,data.spelling.length,item.audio,()=>{state.screen=4;save();render()})}
function functional(){const sec='functional',idx=state.idx[sec]||0,item=data.functional[idx];commonQuestionScreen(sec,4,'Real-life English','Hotel check-in + booking a table',visualImage('block4-functional.jpg','Real-life English','Real-life conversation'),item,data.functional.length,null,()=>{state.screen=5;save();render()})}
function reading(){
 const sec='reading',idx=state.idx[sec]||0,item=data.reading.qs[idx],done=solved(sec,idx),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(5,'Reading Mission','Прочитай новую ситуацию и найди детали')}<div class="blockBody"><div class="visualCard"><div class="readingVisual"><div class="readingArtFrame"><img class="readingArt" src="assets/images/block5-reading-scene.png" alt="Conversation scene"></div><div class="readText">${data.reading.text}</div></div></div><div class="questionCard"><div class="kicker">Reading comprehension</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Ответь только по тексту.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,data.reading.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('readAudio','Послушать текст')}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.reading.qs.length-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Перечитай текст и попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('readAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Послушать текст'}else playSequence(data.reading.audio,this,'▶ Послушать текст')};
 document.getElementById('next').onclick=()=>{if(idx<data.reading.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=6;save();render()}};
}
function pron(){
 const bins=['/iː/','/e/','/eɪ/'];if(!Array.isArray(state.sortOrder)||state.sortOrder.length!==data.pron.length){state.sortOrder=shuffledIndicesForSort(data.pron);save()}
 const order=state.sortOrder,allDone=data.pron.every((_,i)=>state.answers.pron[i]?.solved);
 app.innerHTML=shell(`${title(6,'Alphabet Sound Sort','Распредели буквы по трём звуковым группам')}<div class="sortLayout"><div class="bins">${bins.map(b=>`<div class="bin" data-bin="${b}"><strong>${b}</strong><small>${b==='/iː/'?'tree':b==='/e/'?'egg':'train'}</small><div class="binwords">${order.map(i=>{const x=data.pron[i];return state.answers.pron[i]?.solved&&x.a===b?`<button class="wordChip good" disabled>${esc(x.w)}</button>`:''}).join('')}</div></div>`).join('')}</div><div class="wordBank">${order.map(i=>{const x=data.pron[i];return !state.answers.pron[i]?.solved?`<button draggable="true" class="wordChip ${state.selectedPron===i?'selected':''}" data-word="${i}">${esc(x.w)}</button>`:''}).join('')}<span id="pronHint" class="audioMeta">${allDone?'Все буквы распределены верно':'Карточки перемешаны. Выбери букву или перетащи её в колонку.'}</span></div></div><div class="footerActions"><div class="leftActions">${audioBtn('pronAudio','Послушать выбранную букву')}</div><button class="nextBtn" id="next" ${allDone?'':'disabled'}>Следующий блок →</button></div>`);
 function tryPlace(i,bin){const x=data.pron[i];let a=state.answers.pron[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;const ok=x.a===bin;if(a.firstCorrect===null)a.firstCorrect=ok;if(ok){a.solved=true;state.selectedPron=null}else{const h=document.getElementById('pronHint');h.textContent=`Буква ${x.w}: это не ${bin}. Попробуй другую колонку.`;h.style.color='#bd4053'}state.answers.pron[i]=a;save();if(ok)render()}
 document.querySelectorAll('[data-word]').forEach(w=>{const i=+w.dataset.word;w.onclick=()=>{state.selectedPron=i;save();render()};w.ondragstart=e=>{e.dataTransfer.setData('text/plain',String(i));e.dataTransfer.effectAllowed='move'}});
 document.querySelectorAll('[data-bin]').forEach(b=>{b.onclick=()=>{if(state.selectedPron!==null)tryPlace(state.selectedPron,b.dataset.bin)};b.ondragover=e=>{e.preventDefault();b.classList.add('dropTarget')};b.ondragleave=()=>b.classList.remove('dropTarget');b.ondrop=e=>{e.preventDefault();b.classList.remove('dropTarget');const i=+e.dataTransfer.getData('text/plain');if(Number.isInteger(i))tryPlace(i,b.dataset.bin)}});
 document.getElementById('pronAudio').onclick=function(){if(state.selectedPron===null){document.getElementById('pronHint').textContent='Сначала выбери букву';return}const letter=data.pron[state.selectedPron].w;if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Послушать выбранную букву'}else playText(`${letter}.`,'Amy',this)};
 document.getElementById('next').onclick=()=>{state.screen=7;save();render()};
}
function listening(){
 const sec='listening',idx=state.idx[sec]||0,item=data.listening.qs[idx],done=solved(sec,idx),script=data.listening.scripts.find(s=>s.id===item.script),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(7,'Listening Mission','Два новых диалога: hotel + restaurant')}<div class="blockBody"><div class="visualCard">${visualImage('block7-listening.jpg','Listen carefully','Listening practice')}</div><div class="questionCard"><div class="kicker">Dialogue ${script.id}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Диалог можно прослушать несколько раз.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Сначала прослушай диалог')}</div>${miniProgress(sec,idx,data.listening.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('listenAudio',`Диалог ${script.id}`)}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.listening.qs.length-1?'Результат →':'Следующее задание →'}</button></div>`);
 document.getElementById('listenAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent=`▶ Диалог ${script.id}`}else playScript(script.lines,this)};
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Прослушай ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('next').onclick=()=>{if(idx<data.listening.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=8;save();render()}};
}
function results(){
 const keys=SECTIONS,totalMax=keys.reduce((n,k)=>n+MAX[k],0),total=keys.reduce((n,k)=>n+score(k),0),pct=Math.round(total/totalMax*100),sorted=[...keys].sort((a,b)=>score(b)/MAX[b]-score(a)/MAX[a]),best=sorted[0],weak=sorted.at(-1);
 app.innerHTML=shell(`<div class="titlebar"><div class="titlewrap"><h1>Your <span class="n">Results</span></h1><p>Beginner · Unit 1 · Practical English Episode 1</p></div><div class="progressBox"><strong>Готово</strong><div class="track"><i style="width:100%"></i></div></div></div><div class="results"><div class="ring" style="--pct:${pct}"><strong>${pct}%</strong><span>с первого раза</span></div><div><div class="resultList">${keys.map(k=>{const p=Math.round(score(k)/MAX[k]*100);return `<div class="resrow"><label>${LABELS[k]}</label><div class="resbar"><i style="width:${p}%"></i></div><b>${score(k)}/${MAX[k]}</b></div>`}).join('')}</div><div class="coach"><div><strong>Сильнее всего</strong><p>${LABELS[best]} — лучший результат с первой попытки.</p></div><div><strong>Что повторить</strong><p>${LABELS[weak]} — этот блок стоит пройти ещё раз.</p></div></div><div class="heroBtns" style="margin-top:16px"><button class="btn primary" id="retry">Пройти ещё раз</button><button class="btn secondary" id="home">На главную</button></div></div></div>`);
 document.getElementById('retry').onclick=()=>{state=fresh();state.screen=1;save();render()};document.getElementById('home').onclick=()=>{state.screen=0;save();render()};
}
function render(){stopAudio();({0:start,1:phrases,2:grammar,3:spelling,4:functional,5:reading,6:pron,7:listening,8:results}[state.screen]||start)()}
render();
