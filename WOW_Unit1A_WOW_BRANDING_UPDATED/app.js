const BASE_W=1600,BASE_H=900;
function fit(){const s=Math.min(innerWidth/BASE_W,innerHeight/BASE_H);document.getElementById('fit').style.transform=`translate(-50%,-50%) scale(${s})`}
addEventListener('resize',fit);fit();

const app=document.getElementById('app');
const SECTIONS=['phrases','grammar','numbers','days','reading','pron','listening'];
const LABELS={phrases:'Words & Phrases',grammar:'Grammar',numbers:'Numbers',days:'Days & Goodbye',reading:'Reading',pron:'Pronunciation',listening:'Listening'};

const data={
 phrases:[
  {q:'Hi',a:'Привет',o:['Привет','Спасибо','До свидания','Чай, пожалуйста']},
  {q:'Hello',a:'Здравствуйте / Привет',o:['Извините / Простите','Здравствуйте / Привет','Приятно познакомиться','Капучино, пожалуйста']},
  {q:'What’s your name?',a:'Как тебя / вас зовут?',o:['Как тебя / вас зовут?','Спасибо','До завтра','Чай, пожалуйста']},
  {q:'Nice to meet you',a:'Приятно познакомиться',o:['До свидания','Приятно познакомиться','Как тебя / вас зовут?','Одну минуту']},
  {q:'A cappuccino, please',a:'Капучино, пожалуйста',o:['Чай, пожалуйста','Капучино, пожалуйста','Спасибо','Привет']},
  {q:'A tea, please',a:'Чай, пожалуйста',o:['Капучино, пожалуйста','Извините / Простите','Чай, пожалуйста','До свидания']},
  {q:'Thanks',a:'Спасибо',o:['Спасибо','Привет','Одну минуту','Приятно познакомиться']},
  {q:'Sorry',a:'Извините / Простите',o:['До свидания','Извините / Простите','Спасибо','Как тебя / вас зовут?']},
  {q:'Just a minute',a:'Одну минуту',o:['Одну минуту','Спасибо','Привет','Чай, пожалуйста']},
  {q:'Goodbye',a:'До свидания',o:['До свидания','Приятно познакомиться','Капучино, пожалуйста','Извините / Простите']}
 ],
 grammar:[
  {q:'I ___ Helen',a:'am',o:['am','are']},{q:'You ___ Tom',a:'are',o:['am','are']},
  {q:'I ___ not Ellen',a:'am',o:['am','are']},{q:'You ___ not Dom',a:'are',o:['am','are']},
  {q:'___ I in class 2?',a:'Am',o:['Am','Are']},{q:'___ you Mike?',a:'Are',o:['Am','Are']},
  {q:'Are you Helen?',a:'Yes, I am',o:['Yes, I am','Yes, you are']},{q:'Am I in your class?',a:'Yes, you are',o:['Yes, you are','Yes, I am']},
  {q:'Are you Diana?',a:'No, I’m not',o:['No, I’m not','No, you aren’t']},{q:'Am I in room 8?',a:'No, you aren’t',o:['No, you aren’t','No, I’m not']}
 ],
 numbers:[
  {q:'zero',a:'0',o:['0','2','10'],visual:0},{q:'three',a:'3',o:['3','7','9'],visual:3},
  {q:'five',a:'5',o:['4','5','6'],visual:5},{q:'seven',a:'7',o:['1','7','8'],visual:7},
  {q:'nine',a:'9',o:['6','8','9'],visual:9},{q:'one, two, ___',a:'three',o:['three','five','ten'],visual:3},
  {q:'seven, eight, ___',a:'nine',o:['nine','six','zero'],visual:9},{q:'eight, nine, ___',a:'ten',o:['ten','three','five'],visual:10},
  {q:'two, three, ___',a:'four',o:['four','six','ten'],visual:4},{q:'four, five, ___',a:'six',o:['three','six','eight'],visual:6}
 ],
 days:[
  {q:'Monday →',a:'Tuesday',o:['Tuesday','Friday','Sunday']},{q:'Tuesday →',a:'Wednesday',o:['Wednesday','Monday','Saturday']},
  {q:'Wednesday →',a:'Thursday',o:['Thursday','Tuesday','Friday']},{q:'Thursday →',a:'Friday',o:['Friday','Sunday','Monday']},
  {q:'Friday →',a:'Saturday',o:['Saturday','Thursday','Tuesday']},{q:'Saturday →',a:'Sunday',o:['Sunday','Friday','Monday']},
  {q:'Goodbye, Tom. See you on ___',a:'Friday',o:['Friday','five','tea']},{q:'See you ___',a:'tomorrow',o:['tomorrow','cappuccino','Helen']}
 ],
 reading:{
  text:`<b>Hi, I’m Helen.</b> I’m at a café. “Hello,” says Tom. “What’s your name?” “Helen.” “Nice to meet you,” says Tom. “Nice to meet you,” says Helen. Tom says, “A cappuccino, please.” Helen says, “Thanks. Goodbye, Tom. See you tomorrow.” Tom says, “Bye.””`,
  qs:[
   {q:'What’s her name?',a:'Helen',o:['Helen','Ellen','Diana']},
   {q:'What does Helen order?',a:'A tea',o:['A tea','A cappuccino','Two teas']},
   {q:'What’s the man’s name?',a:'Tom',o:['Tom','Dom','Mike']},
   {q:'What does Tom order?',a:'A cappuccino',o:['A tea','A cappuccino','Three teas']},
   {q:'When do they see each other?',a:'Tomorrow',o:['Tomorrow','Friday','Monday']}
  ]
 },
 pron:[{w:'hello',a:'/h/'},{w:'Helen',a:'/h/'},{w:'hi',a:'/h/'},{w:'I’m',a:'/aɪ/'},{w:'five',a:'/aɪ/'},{w:'nine',a:'/aɪ/'},{w:'meet',a:'/iː/'},{w:'tea',a:'/iː/'}],
 listening:{
  scripts:[
   {id:1,lines:[
    {voice:'Amy',text:'Hello.'},{voice:'Brian',text:'Hi. A cappuccino, please.'},{voice:'Amy',text:'OK. What’s your name?'},{voice:'Brian',text:'Tom.'},{voice:'Amy',text:'Tom. Your cappuccino.'},{voice:'Brian',text:'Thanks.'}
   ]},
   {id:2,lines:[
    {voice:'Brian',text:'Hi. Are you Helen?'},{voice:'Amy',text:'Yes, I am. And you’re Tom?'},{voice:'Brian',text:'Yes. Nice to meet you.'},{voice:'Amy',text:'Nice to meet you.'},{voice:'Brian',text:'A tea, please.'},{voice:'Amy',text:'Goodbye, Tom. See you on Friday.'},{voice:'Brian',text:'Bye.'}
   ]}
  ],
  qs:[
   {q:'What does Tom order?',a:'A cappuccino',o:['A cappuccino','A tea','Two teas'],script:1},
   {q:'What name do you hear?',a:'Tom',o:['Tom','Dom','Mike'],script:1},
   {q:'What phrase do you hear at the end?',a:'Thanks',o:['Thanks','Sorry','Goodbye'],script:1},
   {q:'Are you Helen?',a:'Yes, I am',o:['Yes, I am','No, I’m not','Yes, you are'],script:2},
   {q:'What is the man’s name?',a:'Tom',o:['Tom','Dom','Mike'],script:2},
   {q:'What does Tom order?',a:'A tea',o:['A tea','A cappuccino','Three teas'],script:2},
   {q:'What phrase do they say?',a:'Nice to meet you',o:['Nice to meet you','See you tomorrow','Goodbye'],script:2},
   {q:'Which goodbye phrase do you hear?',a:'See you on Friday',o:['See you on Friday','See you on Monday','See you on Sunday'],script:2}
  ]
 }
};

const MAX={phrases:data.phrases.length,grammar:data.grammar.length,numbers:data.numbers.length,days:data.days.length,reading:data.reading.qs.length,pron:data.pron.length,listening:data.listening.qs.length};
const fresh=()=>({screen:0,idx:{phrases:0,grammar:0,numbers:0,days:0,reading:0,listening:0},answers:{phrases:{},grammar:{},numbers:{},days:{},reading:{},pron:{},listening:{}},mistakes:{},selectedPron:null});
let state=fresh();
try{const s=JSON.parse(localStorage.getItem('wow1a_v5'));if(s&&s.answers)state={...fresh(),...s,idx:{...fresh().idx,...(s.idx||{})},answers:{...fresh().answers,...s.answers}}}catch(e){}
function save(){localStorage.setItem('wow1a_v5',JSON.stringify(state))}
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function solved(sec,i){return !!state.answers[sec]?.[i]?.solved}
function firstCorrect(sec,i){return !!state.answers[sec]?.[i]?.firstCorrect}
function score(sec){return Object.values(state.answers[sec]||{}).filter(x=>x.firstCorrect).length}
function header(){return `<div class="noise"></div><div class="header"><div class="logoWrap"><img class="logoComposite" src="assets/images/logo-wow-school.svg" alt="WOW SCHOOL"></div><div class="unitBadge"><span>English File Beginner</span><strong>Unit 1A</strong></div></div>`}
function shell(inner){return `${header()}<section class="shell"><div class="content">${inner}</div></section>`}
function progress(n){return `<div class="progressBox"><strong>Блок ${n}/7</strong><div class="track"><i style="width:${n/7*100}%"></i></div></div>`}
function title(n,t,sub){return `<div class="titlebar"><div class="titlewrap"><h1><span class="n">${n}.</span> ${t}</h1><p>${sub}</p></div>${progress(n)}</div>`}
function miniProgress(sec,idx,total){return `<div class="internalProgress"><div class="miniDots">${Array.from({length:total},(_,i)=>`<i class="miniDot ${i<idx?'done':i===idx?'current':''}"></i>`).join('')}</div><div class="counter">Задание ${Math.min(idx+1,total)} из ${total}</div></div>`}
function feedback(kind,text){return `<div class="feedbackBox ${kind}">${text}</div>`}

/* audio engine v8: same Google UK voice as v5, but adapted for embedded Holst iframe.
   Key changes: no referrer, one persistent <audio> element, no CORS mode,
   whole dialogues as one request, and safe chunking only for long reading text. */
let currentAudio=null,playToken=0;
const ttsAudio=document.createElement('audio');
ttsAudio.preload='auto';
ttsAudio.setAttribute('playsinline','');
ttsAudio.setAttribute('webkit-playsinline','');
ttsAudio.referrerPolicy='no-referrer';
ttsAudio.style.display='none';
document.body.appendChild(ttsAudio);

function providerUrls(text){
 const q=encodeURIComponent(text.replace(/\s+/g,' ').trim());
 return [
  `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en-GB&q=${q}`,
  `https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${q}`,
  `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${q}`
 ];
}
function splitTTS(text,max=165){
 const clean=text.replace(/\s+/g,' ').trim();
 if(clean.length<=max)return [clean];
 const out=[];let rest=clean;
 while(rest.length){
  if(rest.length<=max){out.push(rest);break}
  let cut=-1;
  for(const mark of ['. ','? ','! ',', ','; ']){
   const i=rest.lastIndexOf(mark,max);
   if(i>Math.floor(max*.55)){cut=i+mark.length-1;break}
  }
  if(cut<0){cut=rest.lastIndexOf(' ',max);if(cut<Math.floor(max*.55))cut=max}
  out.push(rest.slice(0,cut).trim());rest=rest.slice(cut).trim();
 }
 return out.filter(Boolean);
}
function stopAudio(){
 playToken++;
 try{ttsAudio.pause();ttsAudio.removeAttribute('src');ttsAudio.load()}catch(e){}
 currentAudio=null;
}
function playUrl(url,token){
 return new Promise((resolve,reject)=>{
  if(token!==playToken)return reject(new Error('cancelled'));
  const a=ttsAudio;currentAudio=a;
  let finished=false;
  const cleanup=()=>{a.onended=a.onerror=a.onstalled=a.onabort=null;clearTimeout(timer)};
  const timer=setTimeout(()=>{if(finished)return;finished=true;cleanup();reject(new Error('timeout'))},12000);
  a.onended=()=>{if(finished)return;finished=true;cleanup();resolve()};
  a.onerror=()=>{if(finished)return;finished=true;cleanup();reject(new Error('audio error'))};
  a.onstalled=()=>{};
  a.onabort=()=>{if(finished)return;finished=true;cleanup();reject(new Error('aborted'))};
  a.referrerPolicy='no-referrer';
  a.src=url;
  a.load();
  const p=a.play();
  if(p&&typeof p.catch==='function')p.catch(err=>{if(finished)return;finished=true;cleanup();reject(err)});
 });
}
async function playChunk(text,token){
 let lastErr=null;
 for(const url of providerUrls(text)){
  if(token!==playToken)throw new Error('cancelled');
  try{await playUrl(url,token);return}catch(e){lastErr=e}
 }
 throw lastErr||new Error('No audio provider available');
}
async function playSequence(texts,btn,idleLabel='▶ Прослушать'){
 stopAudio();
 const token=++playToken;
 btn?.classList.remove('error');btn?.classList.add('busy');if(btn)btn.textContent='■ Стоп';
 try{
  for(const text of texts){if(token!==playToken)return;await playChunk(text,token)}
  if(token===playToken){btn?.classList.remove('busy');if(btn)btn.textContent=idleLabel}
 }catch(e){
  if(token===playToken){btn?.classList.remove('busy');btn?.classList.add('error');if(btn)btn.textContent='Аудио недоступно';setTimeout(()=>{btn?.classList.remove('error');if(btn)btn.textContent=idleLabel},2200)}
 }
}
function playText(text,voice='Brian',btn){return playSequence(splitTTS(text),btn,'▶ Прослушать')}
function playScript(lines,btn){
 const whole=lines.map(x=>x.text).join(' ');
 return playSequence(splitTTS(whole),btn,'▶ Прослушать');
}
function audioBtn(id,label='Прослушать'){return `<button class="audioBtn" id="${id}">▶ ${label}</button><span class="audioMeta">British English · online voice</span>`}

function recordAttempt(sec,i,isCorrect){
 let a=state.answers[sec][i];
 if(!a){a={attempts:0,firstCorrect:null,solved:false};state.answers[sec][i]=a}
 a.attempts++;
 if(a.firstCorrect===null)a.firstCorrect=isCorrect;
 if(isCorrect)a.solved=true;
 state.mistakes[`${sec}:${i}`]=isCorrect?null:true;save();
}

const PHRASE_CATEGORIES={
 'Hi':'Greeting','Hello':'Greeting','What’s your name?':'Question','Nice to meet you':'Polite phrase',
 'A cappuccino, please':'At the café','A tea, please':'At the café','Thanks':'Polite phrase',
 'Sorry':'Polite phrase','Just a minute':'Useful phrase','Goodbye':'Goodbye'
};
const WORD_TO_NUM={zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};

function objectGroup(n,variant='dot'){
 const items=Array.from({length:n},(_,i)=>`<span class="countSticker ${variant} v${i%4}"></span>`).join('');
 return `<div class="countGroup ${n>6?'compact':''}">${items||'<span class="countZero">0</span>'}</div>`;
}
function sequenceVisualFromText(q,variant='cup'){
 const words=q.toLowerCase().replace(/_/g,'').replace(/,/g,'').split(/\s+/).filter(Boolean).filter(x=>x!=='');
 const nums=words.filter(w=>WORD_TO_NUM[w]!==undefined).map(w=>WORD_TO_NUM[w]);
 return `<div class="sequenceBoard">${nums.map((n,i)=>`<div class="sequenceCard"><span class="sequenceLabel">step ${i+1}</span>${objectGroup(n,variant)}</div>`).join('<div class="sequenceArrow">→</div>')}<div class="sequenceArrow">→</div><div class="sequenceCard question"><span class="sequenceLabel">next</span><div class="questionStamp">?</div><div class="tinyHint">listen and choose</div></div></div>`;
}
function renderPhraseVisual(item){
 const cat=PHRASE_CATEGORIES[item.q]||'Lesson 1A';
 return `<div class="sceneFrame phrasePanel"><img class="sceneImg" src="assets/images/cafe-speaking.png" alt="Cafe speaking"><div class="visualBadge">${esc(cat)}</div><div class="speech modern">${esc(item.q)}</div></div>`;
}
function renderNumbersVisual(item,idx){
 if(item.q.includes('___')){
  return `<div class="numberVisual smart"><div class="numbersHeroBadge">Listen and continue</div>${sequenceVisualFromText(item.q,'dot')}</div>`;
 }
 return `<div class="numberVisual smart"><div class="numberImagePlaceholder">🔊</div><div class="visualHint">Послушай слово и выбери правильный вариант</div></div>`;
}
function weekdayIndex(q){return ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].findIndex(d=>q.startsWith(d));}
function renderDaysVisual(item){
 if(item.q.startsWith('Goodbye')||item.q.startsWith('See you')){
  return `<div class="daysVisualNew"><div class="dayCardScene"><div class="dayIcon">💬</div><div class="questionStamp">?</div><div class="visualHint">Слушай фразу и выбери правильный ответ</div></div></div>`;
 }
 const active=weekdayIndex(item.q);
 return `<div class="daysVisualNew"><div class="weekRouteSimple"><div class="routeLabel">DAY</div><div class="routeQuestion">→ ?</div></div><div class="visualHint">Определи следующий день недели</div></div>`;
}
function commonQuestionScreen(sec,blockNum,heading,sub,visualHTML,item,total,audioText,audioVoice='Brian',afterLast){
 const idx=state.idx[sec]||0;const done=solved(sec,idx);
 app.innerHTML=shell(`${title(blockNum,heading,sub)}<div class="blockBody"><div class="visualCard">${visualHTML}</div><div class="questionCard"><div class="kicker">${LABELS[sec]}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Выбери правильный вариант. Если ошибёшься, можно попробовать ещё раз.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно! Переходим дальше.'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,total)}</div></div></div><div class="footerActions"><div class="leftActions">${audioText?audioBtn('audio','Прослушать'):''}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===total-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 const fb=document.getElementById('fb');
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
  if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);
  if(ok){b.classList.add('correct');fb.innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}
  else{b.classList.add('wrongFlash');fb.innerHTML=feedback('bad','Пока нет. Попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}
 });
 if(audioText){document.getElementById('audio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Прослушать'}else playText(audioText,audioVoice,this)}}
 document.getElementById('next').onclick=()=>{if(idx<total-1){state.idx[sec]=idx+1;save();render()}else afterLast()};
}

function start(){app.innerHTML=shell(`<div class="hero"><div><div class="heroKicker">Unit Review · Lesson 1A</div><h1>A cappuccino,<span>please</span></h1><p>7 интерактивных блоков: фразы, verb be с I / you, numbers 0–10, days & goodbye, reading, pronunciation и listening. Всё — только по материалу Lesson 1A.</p><div class="heroBtns"><button class="btn primary" id="start">Начать →</button><button class="btn secondary" id="reset">Сбросить прогресс</button></div></div><div class="heroVisual"><img class="heroImage" src="assets/images/cafe-speaking.png" alt="Cafe speaking"><div class="tag a">7 блоков</div><div class="tag b">UK audio</div></div></div>`);document.getElementById('start').onclick=()=>{state.screen=1;save();render()};document.getElementById('reset').onclick=()=>{state=fresh();save();render()}}
function phrases(){const sec='phrases',idx=state.idx[sec]||0,item=data.phrases[idx];commonQuestionScreen(sec,1,'Words & Phrases','Фраза всегда остаётся на экране — выбери перевод',renderPhraseVisual(item),item,data.phrases.length,item.q,'Amy',()=>{state.screen=2;save();render()})}
function grammar(){const sec='grammar',idx=state.idx[sec]||0,item=data.grammar[idx];const vis=`<div class="grammarVisual"><div class="magnetBoard"><div class="magnetRow"><div class="magnet ${item.q.startsWith('You')||item.q.includes('you')?'you':'i'}">${item.q.startsWith('You')||item.q.includes('you')?'YOU':'I'}</div><div class="equals">+</div><div class="magnet be">BE</div></div><div class="grammarLegend">I am · You are · Am I? · Are you?</div></div></div>`;commonQuestionScreen(sec,2,'Grammar Check','verb be · только I / you',vis,item,data.grammar.length,null,'Brian',()=>{state.screen=3;save();render()})}
function numbers(){const sec='numbers',idx=state.idx[sec]||0,item=data.numbers[idx];commonQuestionScreen(sec,3,'Numbers 0–10','Слушай, считай и выбирай правильный вариант',renderNumbersVisual(item,idx),item,data.numbers.length,item.q,'Brian',()=>{state.screen=4;save();render()})}
function days(){const sec='days',idx=state.idx[sec]||0,item=data.days[idx];commonQuestionScreen(sec,4,'Days & Goodbye','Определи следующий день или нужную фразу',renderDaysVisual(item),item,data.days.length,item.q,'Amy',()=>{state.screen=5;save();render()})}
function reading(){const sec='reading',idx=state.idx[sec]||0,item=data.reading.qs[idx],done=solved(sec,idx);app.innerHTML=shell(`${title(5,'Reading Café','Прочитай мини-историю и ответь на вопросы')}<div class="blockBody"><div class="visualCard"><div class="readingVisual"><div class="readingArtFrame"><img class="readingArt" src="assets/images/cafe-conversation.png" alt="Reading cafe scene"></div><div class="readText">${data.reading.text}</div></div></div><div class="questionCard"><div class="kicker">Reading comprehension</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Ответь только по тексту.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,data.reading.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('readAudio','Послушать текст')}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.reading.qs.length-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Перечитай текст и попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('readAudio').onclick=function(){const plain=data.reading.text.replace(/<[^>]+>/g,'').replace(/[“”]/g,'');if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Послушать текст'}else{const sentences=plain.split(/(?<=[.!?])\s+/).filter(Boolean).map((t,i)=>({text:t,voice:i%2?'Brian':'Amy'}));playScript(sentences,this)}};
 document.getElementById('next').onclick=()=>{if(idx<data.reading.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=6;save();render()}};
}
function pron(){const bins=['/h/','/aɪ/','/iː/'];const allDone=Object.keys(state.answers.pron).length===data.pron.length;app.innerHTML=shell(`${title(6,'Sound Sort','Перетащи слово в правильный звук или выбери слово и нажми на блок')}<div class="sortLayout"><div class="bins">${bins.map(b=>`<div class="bin" data-bin="${b}"><strong>${b}</strong><small>${b==='/h/'?'hello · Helen · hi':b==='/aɪ/'?'I’m · five · nine':'meet · tea'}</small><div class="binwords">${data.pron.map((x,i)=>state.answers.pron[i]?.solved&&x.a===b?`<button class="wordChip good" disabled>${esc(x.w)}</button>`:'').join('')}</div></div>`).join('')}</div><div class="wordBank">${data.pron.map((x,i)=>!state.answers.pron[i]?.solved?`<button draggable="true" class="wordChip ${state.selectedPron===i?'selected':''}" data-word="${i}">${esc(x.w)}</button>`:'').join('')}<span id="pronHint" class="audioMeta">${allDone?'Все слова распределены верно':'Выбери слово или перетащи его в блок'}</span></div></div><div class="footerActions"><div class="leftActions">${audioBtn('pronAudio','Послушать выбранное слово')}</div><button class="nextBtn" id="next" ${allDone?'':'disabled'}>Следующий блок →</button></div>`);
 function tryPlace(i,bin){const x=data.pron[i];if(x.a===bin){let a=state.answers.pron[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;if(a.firstCorrect===null)a.firstCorrect=true;a.solved=true;state.answers.pron[i]=a;state.selectedPron=null;save();render()}else{let a=state.answers.pron[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;if(a.firstCorrect===null)a.firstCorrect=false;state.answers.pron[i]=a;save();const h=document.getElementById('pronHint');h.textContent=`${x.w}: это не ${bin}. Попробуй другой звук.`;h.style.color='#bd4053'}}
 document.querySelectorAll('[data-word]').forEach(w=>{const i=+w.dataset.word;w.onclick=()=>{state.selectedPron=i;save();render()};w.ondragstart=e=>{e.dataTransfer.setData('text/plain',String(i));e.dataTransfer.effectAllowed='move'}});
 document.querySelectorAll('[data-bin]').forEach(b=>{b.onclick=()=>{if(state.selectedPron!==null)tryPlace(state.selectedPron,b.dataset.bin)};b.ondragover=e=>{e.preventDefault();b.classList.add('dropTarget')};b.ondragleave=()=>b.classList.remove('dropTarget');b.ondrop=e=>{e.preventDefault();b.classList.remove('dropTarget');const i=+e.dataTransfer.getData('text/plain');if(Number.isInteger(i))tryPlace(i,b.dataset.bin)}});
 document.getElementById('pronAudio').onclick=function(){if(state.selectedPron===null){document.getElementById('pronHint').textContent='Сначала выбери слово';return}const word=data.pron[state.selectedPron].w;if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Послушать выбранное слово'}else playText(word,'Amy',this)};
 document.getElementById('next').onclick=()=>{state.screen=7;save();render()};
}
function listening(){const sec='listening',idx=state.idx[sec]||0,item=data.listening.qs[idx],done=solved(sec,idx),script=data.listening.scripts.find(s=>s.id===item.script);app.innerHTML=shell(`${title(7,'Listening Mission','Слушай диалог и отвечай — только язык Lesson 1A')}<div class="blockBody"><div class="visualCard"><div class="headphoneVisual"><img class="sceneImg" src="assets/images/listening-headphones.png" alt="Listening practice"></div></div><div class="questionCard"><div class="kicker">Dialogue ${script.id}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Диалог можно прослушать несколько раз.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Сначала прослушай диалог')}</div>${miniProgress(sec,idx,data.listening.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('listenAudio',`Диалог ${script.id}`)}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.listening.qs.length-1?'Результат →':'Следующее задание →'}</button></div>`);
 document.getElementById('listenAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent=`▶ Диалог ${script.id}`}else playScript(script.lines,this)};
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Прослушай ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('next').onclick=()=>{if(idx<data.listening.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=8;save();render()}};
}
function results(){const keys=SECTIONS,totalMax=keys.reduce((n,k)=>n+MAX[k],0),total=keys.reduce((n,k)=>n+score(k),0),pct=Math.round(total/totalMax*100),sorted=[...keys].sort((a,b)=>score(b)/MAX[b]-score(a)/MAX[a]),best=sorted[0],weak=sorted.at(-1);app.innerHTML=shell(`<div class="titlebar"><div class="titlewrap"><h1>Your <span class="n">Results</span></h1><p>Итоги проверочной работы по Lesson 1A</p></div><div class="progressBox"><strong>Готово</strong><div class="track"><i style="width:100%"></i></div></div></div><div class="results"><div class="ring" style="--pct:${pct}"><strong>${pct}%</strong><span>с первого раза</span></div><div><div class="resultList">${keys.map(k=>{const p=Math.round(score(k)/MAX[k]*100);return `<div class="resrow"><label>${LABELS[k]}</label><div class="resbar"><i style="width:${p}%"></i></div><b>${score(k)}/${MAX[k]}</b></div>`}).join('')}</div><div class="coach"><div><strong>Сильнее всего</strong><p>${LABELS[best]} — лучший результат с первой попытки.</p></div><div><strong>Что повторить</strong><p>${LABELS[weak]} — этот блок стоит пройти ещё раз.</p></div></div><div class="heroBtns" style="margin-top:16px"><button class="btn primary" id="retry">Пройти ещё раз</button><button class="btn secondary" id="home">На главную</button></div></div></div>`);document.getElementById('retry').onclick=()=>{state=fresh();state.screen=1;save();render()};document.getElementById('home').onclick=()=>{state.screen=0;save();render()}}
function render(){stopAudio();({0:start,1:phrases,2:grammar,3:numbers,4:days,5:reading,6:pron,7:listening,8:results}[state.screen]||start)()}
render();
