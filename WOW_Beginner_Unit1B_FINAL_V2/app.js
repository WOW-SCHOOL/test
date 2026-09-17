const BASE_W=1600,BASE_H=900;
function fit(){const s=Math.min(innerWidth/BASE_W,innerHeight/BASE_H);document.getElementById('fit').style.transform=`translate(-50%,-50%) scale(${s})`}
addEventListener('resize',fit);fit();

const app=document.getElementById('app');
const SECTIONS=['phrases','grammar','numbers','days','reading','pron','listening'];
const LABELS={phrases:'Countries & Phrases',grammar:'Grammar',numbers:'Sound Detective',days:'Where from?',reading:'Reading',pron:'He · She · It Sort',listening:'Listening'};
const STORAGE_KEY='wow_beginner_1b_v2_20260917';

const data={
 phrases:[
  {q:'Brazil',a:'Бразилия',o:['Бразилия','Испания','Япония','Турция']},
  {q:'Japan',a:'Япония',o:['Китай','Япония','Германия','Франция']},
  {q:'Turkey',a:'Турция',o:['Турция','Польша','Египет','Италия']},
  {q:'Mexico',a:'Мексика',o:['Мексика','Россия','Швейцария','Китай']},
  {q:'the United States',a:'США',o:['Великобритания','США','Испания','Германия']},
  {q:'Switzerland',a:'Швейцария',o:['Швейцария','Франция','Польша','Россия']},
  {q:'Where are you from?',a:'Откуда ты / вы?',o:['Откуда ты / вы?','Где это?','Как тебя / вас зовут?','Это хороший город?']},
  {q:'Where’s Izmir?',a:'Где Измир?',o:['Откуда Измир?','Где Измир?','Измир хороший?','Измир в Испании?']},
  {q:'I don’t know.',a:'Я не знаю.',o:['Я не знаю.','Очень хорошо.','Я из Испании.','Думаю, да.']},
  {q:'I think it’s in Turkey.',a:'Думаю, это в Турции.',o:['Я из Турции.','Это не Турция.','Думаю, это в Турции.','Где Турция?']}
 ],
 grammar:[
  {q:'Leo is from Brazil. He ___ from Brazil.',a:'is',o:['is','isn’t','am']},
  {q:'Mia is from Mexico. ___ is from Mexico.',a:'She',o:['He','She','It']},
  {q:'Tokyo is in Japan. ___ is in Japan.',a:'It',o:['He','She','It']},
  {q:'Ben is from England. He ___ from France.',a:'isn’t',o:['is','isn’t','aren’t']},
  {q:'___ she from Spain?',a:'Is',o:['Is','Are','Am']},
  {q:'Is he from Turkey? — Yes, ___.',a:'he is',o:['he is','he isn’t','she is']},
  {q:'Is it in Italy? — No, ___.',a:'it isn’t',o:['it isn’t','it is','he isn’t']},
  {q:'Where’s Aya from? — ___ from Japan.',a:'She’s',o:['He’s','She’s','It’s']},
  {q:'Is the music good? — Yes, ___.',a:'it is',o:['it is','he is','she is']},
  {q:'Lila is from Mexico. She ___ from Brazil.',a:'isn’t',o:['is','isn’t','am not']}
 ],
 numbers:[
  {q:'Listen to “Italy”. Which target sound do you hear?',audio:'Italy',a:'/ɪ/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “six”. Which target sound do you hear?',audio:'six',a:'/ɪ/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “England”. Which target sound do you hear?',audio:'England',a:'/ɪ/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “no”. Which target sound do you hear?',audio:'no',a:'/əʊ/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “Poland”. Which target sound do you hear?',audio:'Poland',a:'/əʊ/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “Mexico”. Which target sound do you hear?',audio:'Mexico',a:'/əʊ/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “city”. Which target sound do you hear?',audio:'city',a:'/s/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “nice”. Which target sound do you hear?',audio:'nice',a:'/s/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “she”. Which target sound do you hear?',audio:'she',a:'/ʃ/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']},
  {q:'Listen to “Russia”. Which target sound do you hear?',audio:'Russia',a:'/ʃ/',o:['/ɪ/','/əʊ/','/s/','/ʃ/']}
 ],
 days:[
  {q:'A: Where are you from?  B: ___',a:'I’m from Spain.',o:['I’m from Spain.','It’s in Spain.','She’s from Spain.']},
  {q:'A: Where’s Toledo?  B: ___',a:'It’s in Spain.',o:['He’s from Spain.','It’s in Spain.','I’m from Spain.']},
  {q:'A: Where’s he from?  B: ___',a:'He’s from Brazil.',o:['He’s from Brazil.','She’s from Brazil.','It’s in Brazil.']},
  {q:'A: Is she from Mexico?  B: ___',a:'Yes, she is.',o:['Yes, she is.','Yes, he is.','Yes, it is.']},
  {q:'A: Is he from France?  B: ___',a:'No, he isn’t.',o:['No, she isn’t.','No, he isn’t.','No, it isn’t.']},
  {q:'A: Where’s Izmir?  B: I think ___',a:'it’s in Turkey.',o:['he’s from Turkey.','she’s from Turkey.','it’s in Turkey.']},
  {q:'A: Is it a nice city?  B: ___',a:'Yes, it is.',o:['Yes, he is.','Yes, it is.','Yes, she is.']},
  {q:'A: Where’s Osaka?  B: ___',a:'It’s in Japan.',o:['It’s in Japan.','She’s from Japan.','I’m from Japan.']}
 ],
 reading:{
  text:`<b>Leo:</b> Hi, I’m Leo. I’m from Spain.<br><b>Aya:</b> Hi. I’m Aya. I’m from Japan.<br><b>Omar:</b> Hi. I’m Omar. I’m from Egypt.<br><b>Leo:</b> The music festival is in London.<br><b>Aya:</b> Where’s London?<br><b>Omar:</b> It’s in England.<br><b>Aya:</b> Is it a nice city?<br><b>Leo:</b> Yes, it is. Very nice.<br><b>Omar:</b> Aya, where are you from?<br><b>Aya:</b> I’m from Japan.<br><b>Leo:</b> Wow! The music is very good.`,
  audio:[
   'Hi, I’m Leo. I’m from Spain. Hi, I’m Aya. I’m from Japan.',
   'Hi, I’m Omar. I’m from Egypt. The music festival is in London.',
   'Where’s London? It’s in England. Is it a nice city? Yes, it is. Very nice.',
   'Aya, where are you from? I’m from Japan. Wow! The music is very good.'
  ],
  qs:[
   {q:'Where’s Leo from?',a:'Spain',o:['Spain','Japan','Egypt']},
   {q:'Where’s Aya from?',a:'Japan',o:['England','Japan','Brazil']},
   {q:'Where’s London?',a:'In England',o:['In England','In Spain','In Egypt']},
   {q:'Is London a nice city?',a:'Yes, it is.',o:['Yes, it is.','No, it isn’t.','I don’t know.']},
   {q:'Who is from Egypt?',a:'Omar',o:['Leo','Aya','Omar']}
  ]
 },
 pron:[
  {w:'Caetano Veloso',a:'HE'},
  {w:'Tom',a:'HE'},
  {w:'Andrew',a:'HE'},
  {w:'Lila Downs',a:'SHE'},
  {w:'Helen',a:'SHE'},
  {w:'Maria',a:'SHE'},
  {w:'Brazil',a:'IT'},
  {w:'Izmir',a:'IT'},
  {w:'the music',a:'IT'},
  {w:'the city',a:'IT'}
 ],
 listening:{
  scripts:[
   {id:1,lines:[
    {voice:'Amy',text:'Hello. I’m Mia.'},
    {voice:'Brian',text:'Hi, Mia. I’m Ben.'},
    {voice:'Amy',text:'Where are you from?'},
    {voice:'Brian',text:'I’m from England.'},
    {voice:'Amy',text:'Where’s Cambridge?'},
    {voice:'Brian',text:'It’s in England.'},
    {voice:'Amy',text:'Is it a nice city?'},
    {voice:'Brian',text:'Yes, it is. Very nice.'}
   ]},
   {id:2,lines:[
    {voice:'Amy',text:'Wow! Luna!'},
    {voice:'Brian',text:'Where’s she from?'},
    {voice:'Amy',text:'She’s from Mexico.'},
    {voice:'Brian',text:'Is she good?'},
    {voice:'Amy',text:'Yes, she is. Very good.'},
    {voice:'Brian',text:'And Marco?'},
    {voice:'Amy',text:'He’s from Italy.'},
    {voice:'Brian',text:'Is he from Spain?'},
    {voice:'Amy',text:'No, he isn’t.'}
   ]}
  ],
  qs:[
   {q:'Where’s Ben from?',a:'England',o:['England','Spain','Mexico'],script:1},
   {q:'Where’s Cambridge?',a:'In England',o:['In England','In Italy','In Japan'],script:1},
   {q:'Is Cambridge a nice city?',a:'Yes, it is.',o:['Yes, it is.','No, it isn’t.','I don’t know.'],script:1},
   {q:'What question does Mia ask first?',a:'Where are you from?',o:['Where are you from?','Where’s Cambridge?','Is it a nice city?'],script:1},
   {q:'Where’s Luna from?',a:'Mexico',o:['Mexico','Brazil','Spain'],script:2},
   {q:'Is Luna good?',a:'Yes, she is.',o:['Yes, she is.','No, she isn’t.','Yes, he is.'],script:2},
   {q:'Where’s Marco from?',a:'Italy',o:['Italy','Turkey','France'],script:2},
   {q:'Is Marco from Spain?',a:'No, he isn’t.',o:['Yes, he is.','No, he isn’t.','No, she isn’t.'],script:2}
  ]
 }
};

const MAX={phrases:data.phrases.length,grammar:data.grammar.length,numbers:data.numbers.length,days:data.days.length,reading:data.reading.qs.length,pron:data.pron.length,listening:data.listening.qs.length};
const fresh=()=>({screen:0,idx:{phrases:0,grammar:0,numbers:0,days:0,reading:0,listening:0},answers:{phrases:{},grammar:{},numbers:{},days:{},reading:{},pron:{},listening:{}},mistakes:{},selectedPron:null});
let state=fresh();
try{const s=JSON.parse(localStorage.getItem(STORAGE_KEY));if(s&&s.answers)state={...fresh(),...s,idx:{...fresh().idx,...(s.idx||{})},answers:{...fresh().answers,...s.answers}}}catch(e){}
// Every open starts on the Preview screen, while saved progress can still be resumed after Start.
state.screen=0;
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function solved(sec,i){return !!state.answers[sec]?.[i]?.solved}
function score(sec){return Object.values(state.answers[sec]||{}).filter(x=>x.firstCorrect).length}
function orderedOptions(sec,idx,opts){const offset=((idx+sec.length)%opts.length);return opts.slice(offset).concat(opts.slice(0,offset))}
function header(){return `<div class="noise"></div><div class="header"><div class="brandHeader"><div class="brandCopy"><div class="brandName">WOW SCHOOL</div><div class="brandMeta">online english school · wow-school.ru</div><div class="brandModule">interactive lesson module · Unit 1B</div></div></div><div class="unitBadge"><span>English File Beginner</span><strong>Unit 1B</strong></div></div>`}
function shell(inner){return `${header()}<section class="shell"><div class="content">${inner}</div></section>`}
function progress(n){return `<div class="progressBox"><strong>Блок ${n}/7</strong><div class="track"><i style="width:${n/7*100}%"></i></div></div>`}
function title(n,t,sub){return `<div class="titlebar"><div class="titlewrap"><h1><span class="n">${n}.</span> ${t}</h1><p>${sub}</p></div>${progress(n)}</div>`}
function miniProgress(sec,idx,total){return `<div class="internalProgress"><div class="miniDots">${Array.from({length:total},(_,i)=>`<i class="miniDot ${i<idx?'done':i===idx?'current':''}"></i>`).join('')}</div><div class="counter">Задание ${Math.min(idx+1,total)} из ${total}</div></div>`}
function feedback(kind,text){return `<div class="feedbackBox ${kind}">${text}</div>`}

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
function splitTTS(text,max=260){
 const clean=text.replace(/\s+/g,' ').trim();
 if(clean.length<=max)return [clean];
 const out=[];let rest=clean;
 while(rest.length){
  if(rest.length<=max){out.push(rest);break}
  let cut=-1;
  for(const mark of ['. ','? ','! ',', ','; ']){const i=rest.lastIndexOf(mark,max);if(i>Math.floor(max*.55)){cut=i+mark.length-1;break}}
  if(cut<0){cut=rest.lastIndexOf(' ',max);if(cut<Math.floor(max*.55))cut=max}
  out.push(rest.slice(0,cut).trim());rest=rest.slice(cut).trim();
 }
 return out.filter(Boolean);
}
function stopAudio(){playToken++;try{ttsAudio.pause();ttsAudio.removeAttribute('src');ttsAudio.load()}catch(e){}currentAudio=null}
function playUrl(url,token){
 return new Promise((resolve,reject)=>{
  if(token!==playToken)return reject(new Error('cancelled'));
  const a=ttsAudio;currentAudio=a;let finished=false;
  const cleanup=()=>{a.onended=a.onerror=a.onstalled=a.onabort=null;clearTimeout(timer)};
  const timer=setTimeout(()=>{if(finished)return;finished=true;cleanup();reject(new Error('timeout'))},30000);
  a.onended=()=>{if(finished)return;finished=true;cleanup();resolve()};
  a.onerror=()=>{if(finished)return;finished=true;cleanup();reject(new Error('audio error'))};
  a.onstalled=()=>{};
  a.onabort=()=>{if(finished)return;finished=true;cleanup();reject(new Error('aborted'))};
  a.referrerPolicy='no-referrer';a.src=url;a.currentTime=0;a.load();
  const p=a.play();if(p&&typeof p.catch==='function')p.catch(err=>{if(finished)return;finished=true;cleanup();reject(err)});
 });
}
async function playChunk(text,token){let lastErr=null;for(const url of providerUrls(text)){if(token!==playToken)throw new Error('cancelled');try{await playUrl(url,token);return}catch(e){lastErr=e}}throw lastErr||new Error('No audio provider available')}
async function playSequence(texts,btn,idleLabel='▶ Прослушать'){
 stopAudio();const token=++playToken;btn?.classList.remove('error');btn?.classList.add('busy');if(btn)btn.textContent='■ Стоп';
 try{for(const text of texts){if(token!==playToken)return;await playChunk(text,token)}if(token===playToken){btn?.classList.remove('busy');if(btn)btn.textContent=idleLabel}}
 catch(e){if(token===playToken){btn?.classList.remove('busy');btn?.classList.add('error');if(btn)btn.textContent='Аудио недоступно';setTimeout(()=>{btn?.classList.remove('error');if(btn)btn.textContent=idleLabel},2200)}}
}
function playText(text,voice='Brian',btn){return playSequence(splitTTS(text),btn,'▶ Прослушать')}
function playScript(lines,btn){const whole=lines.map(x=>x.text).join(' ');return playSequence(splitTTS(whole),btn,'▶ Прослушать')}
function audioBtn(id,label='Прослушать'){return `<button class="audioBtn" id="${id}">▶ ${label}</button><span class="audioMeta">British English · online voice</span>`}
function sanitizeAudioText(text){return String(text).replace(/_{2,}/g,'').replace(/→/g,'').replace(/\s+,/g,',').replace(/\s{2,}/g,' ').replace(/[“”]/g,'').trim().replace(/[,.]\s*$/,'')}

function recordAttempt(sec,i,isCorrect){
 let a=state.answers[sec][i];if(!a){a={attempts:0,firstCorrect:null,solved:false};state.answers[sec][i]=a}
 a.attempts++;if(a.firstCorrect===null)a.firstCorrect=isCorrect;if(isCorrect)a.solved=true;state.mistakes[`${sec}:${i}`]=isCorrect?null:true;save();
}

const PHRASE_CATEGORIES={
 'Brazil':'Country','Japan':'Country','Turkey':'Country','Mexico':'Country','the United States':'Country','Switzerland':'Country',
 'Where are you from?':'Question','Where’s Izmir?':'Question','I don’t know.':'Useful phrase','I think it’s in Turkey.':'Useful phrase'
};
function renderPhraseVisual(item){const cat=PHRASE_CATEGORIES[item.q]||'Lesson 1B';return `<div class="sceneFrame phrasePanel"><img class="sceneImg photoCover" src="assets/images/generated/world-globe.jpg" alt="Globe with headphones for World music"><div class="visualBadge">${esc(cat)}</div><div class="speech modern">${esc(item.q)}</div></div>`}
function renderGrammarVisual(){return `<div class="grammarVisual"><div class="pronounDeck"><div class="pronounCard he">HE</div><div class="pronounCard she">SHE</div><div class="pronounCard it">IT</div><div class="grammarCue">verb be · singular</div></div></div>`}
function renderSoundVisual(){return `<div class="sceneFrame soundPanel"><img class="sceneImg photoCover" src="assets/images/generated/sound-headphones.jpg" alt="Student listening with headphones"><div class="visualBadge">Listen first</div><div class="floatingCard">4 target sounds · one answer</div></div>`}
function renderContextVisual(){return `<div class="sceneFrame contextPanel"><img class="sceneImg photoCover" src="assets/images/generated/context-friends.jpg" alt="Friends talking and making music"><div class="visualBadge">Real-life English</div><div class="floatingCard">Choose the natural reply</div></div>`}

function commonQuestionScreen(sec,blockNum,heading,sub,visualHTML,item,total,audioText,audioVoice='Brian',afterLast){
 const idx=state.idx[sec]||0;const done=solved(sec,idx);const options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(blockNum,heading,sub)}<div class="blockBody"><div class="visualCard">${visualHTML}</div><div class="questionCard"><div class="kicker">${LABELS[sec]}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Выбери правильный вариант. Если ошибёшься, можно попробовать ещё раз.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно! Переходим дальше.'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,total)}</div></div></div><div class="footerActions"><div class="leftActions">${audioText?audioBtn('audio','Прослушать'):''}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===total-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 const fb=document.getElementById('fb');
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');fb.innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');fb.innerHTML=feedback('bad','Пока нет. Попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 if(audioText){document.getElementById('audio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Прослушать'}else playText(audioText,audioVoice,this)}}
 document.getElementById('next').onclick=()=>{if(idx<total-1){state.idx[sec]=idx+1;save();render()}else afterLast()};
}

function start(){
 app.innerHTML=shell(`<div class="hero"><div><div class="heroKicker">WOW SCHOOL · proprietary lesson module</div><h1>World <span>music</span></h1><p>7 интерактивных блоков по Lesson 1B: countries, verb be с he / she / it, звуки /ɪ/ /əʊ/ /s/ /ʃ/, вопросы Where…?, reading, grammar sort и новое listening.</p><div class="heroBtns"><button class="btn primary" id="start">Начать →</button><button class="btn secondary" id="reset">Сбросить прогресс</button></div></div><div class="heroVisual"><img class="heroImage photoHero" src="assets/images/generated/context-friends.jpg" alt="Friends enjoying world music"><div class="tag a">WOW SCHOOL</div><div class="tag b">Beginner · 1B</div></div></div>`);
 document.getElementById('start').onclick=()=>{state.screen=1;save();render()};
 document.getElementById('reset').onclick=()=>{state=fresh();save();render()};
}
function phrases(){const sec='phrases',idx=state.idx[sec]||0,item=data.phrases[idx];commonQuestionScreen(sec,1,'Countries & Phrases','Страны и ключевые фразы Lesson 1B',renderPhraseVisual(item),item,data.phrases.length,sanitizeAudioText(item.q),'Amy',()=>{state.screen=2;save();render()})}
function grammar(){const sec='grammar',idx=state.idx[sec]||0,item=data.grammar[idx];commonQuestionScreen(sec,2,'Grammar Check','verb be · he / she / it',renderGrammarVisual(),item,data.grammar.length,null,'Brian',()=>{state.screen=3;save();render()})}
function numbers(){const sec='numbers',idx=state.idx[sec]||0,item=data.numbers[idx];commonQuestionScreen(sec,3,'Sound Detective','Слушай слово и выбирай целевой звук',renderSoundVisual(),item,data.numbers.length,item.audio,'Amy',()=>{state.screen=4;save();render()})}
function days(){const sec='days',idx=state.idx[sec]||0,item=data.days[idx];commonQuestionScreen(sec,4,'Where from?','Выбери естественную следующую реплику',renderContextVisual(),item,data.days.length,null,'Amy',()=>{state.screen=5;save();render()})}
function reading(){
 const sec='reading',idx=state.idx[sec]||0,item=data.reading.qs[idx],done=solved(sec,idx),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(5,'Reading · World Music Chat','Прочитай новый мини-диалог и ответь по тексту')}<div class="blockBody"><div class="visualCard"><div class="readingVisual"><div class="readingArtFrame"><img class="readingArt photoCover" src="assets/images/generated/reading-friends.jpg" alt="Friends at a music event"></div><div class="readText">${data.reading.text}</div></div></div><div class="questionCard"><div class="kicker">Reading comprehension</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Ответь только по тексту.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,data.reading.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('readAudio','Послушать текст')}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.reading.qs.length-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Перечитай текст и попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('readAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Послушать текст'}else playSequence(data.reading.audio,this,'▶ Послушать текст')};
 document.getElementById('next').onclick=()=>{if(idx<data.reading.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=6;save();render()}};
}
function pron(){
 const bins=['HE','SHE','IT'];
 const hints={HE:'male person',SHE:'female person',IT:'place / thing'};
 const solvedCount=data.pron.filter((_,i)=>state.answers.pron[i]?.solved).length;
 const allDone=solvedCount===data.pron.length;
 app.innerHTML=shell(`${title(6,'He · She · It Sort','Распредели имена, места и вещи по правильному местоимению')}<div class="sortLayout"><div class="bins">${bins.map(b=>`<div class="bin" data-bin="${b}"><strong>${b}</strong><small>${hints[b]}</small><div class="binwords">${data.pron.map((x,i)=>state.answers.pron[i]?.solved&&x.a===b?`<button class="wordChip good" disabled>${esc(x.w)}</button>`:'').join('')}</div></div>`).join('')}</div><div class="wordBank">${data.pron.map((x,i)=>!state.answers.pron[i]?.solved?`<button draggable="true" class="wordChip ${state.selectedPron===i?'selected':''}" data-word="${i}">${esc(x.w)}</button>`:'').join('')}<span id="pronHint" class="audioMeta">${allDone?'Все карточки распределены верно':`Распределено ${solvedCount} из ${data.pron.length}`}</span></div></div><div class="footerActions"><div class="leftActions"><span class="sortInstruction">Перетащи карточку или выбери её и нажми на колонку.</span></div><button class="nextBtn" id="next" ${allDone?'':'disabled'}>Следующий блок →</button></div>`);
 function tryPlace(i,bin){const x=data.pron[i];if(x.a===bin){let a=state.answers.pron[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;if(a.firstCorrect===null)a.firstCorrect=true;a.solved=true;state.answers.pron[i]=a;state.selectedPron=null;save();render()}else{let a=state.answers.pron[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;if(a.firstCorrect===null)a.firstCorrect=false;state.answers.pron[i]=a;save();const h=document.getElementById('pronHint');h.textContent='Пока нет. Карточка остаётся на месте — попробуй другую колонку.';h.style.color='#bd4053'}}
 document.querySelectorAll('[data-word]').forEach(w=>{const i=+w.dataset.word;w.onclick=()=>{state.selectedPron=i;save();render()};w.ondragstart=e=>{e.dataTransfer.setData('text/plain',String(i));e.dataTransfer.effectAllowed='move'}});
 document.querySelectorAll('[data-bin]').forEach(b=>{b.onclick=()=>{if(state.selectedPron!==null)tryPlace(state.selectedPron,b.dataset.bin)};b.ondragover=e=>{e.preventDefault();b.classList.add('dropTarget')};b.ondragleave=()=>b.classList.remove('dropTarget');b.ondrop=e=>{e.preventDefault();b.classList.remove('dropTarget');const i=+e.dataTransfer.getData('text/plain');if(Number.isInteger(i))tryPlace(i,b.dataset.bin)}});
 document.getElementById('next').onclick=()=>{state.screen=7;save();render()};
}
function listening(){
 const sec='listening',idx=state.idx[sec]||0,item=data.listening.qs[idx],done=solved(sec,idx),script=data.listening.scripts.find(s=>s.id===item.script),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(7,'Listening Mission','Слушай новые мини-диалоги по языку Lesson 1B')}<div class="blockBody"><div class="visualCard"><div class="headphoneVisual"><img class="sceneImg photoCover" src="assets/images/generated/listening-headphones.jpg" alt="Listening practice with headphones"></div></div><div class="questionCard"><div class="kicker">Dialogue ${script.id}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Диалог можно прослушать несколько раз.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Сначала прослушай диалог')}</div>${miniProgress(sec,idx,data.listening.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('listenAudio',`Диалог ${script.id}`)}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.listening.qs.length-1?'Результат →':'Следующее задание →'}</button></div>`);
 document.getElementById('listenAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent=`▶ Диалог ${script.id}`}else playScript(script.lines,this)};
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Прослушай ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('next').onclick=()=>{if(idx<data.listening.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=8;save();render()}};
}
function results(){
 const keys=SECTIONS,totalMax=keys.reduce((n,k)=>n+MAX[k],0),total=keys.reduce((n,k)=>n+score(k),0),pct=Math.round(total/totalMax*100),sorted=[...keys].sort((a,b)=>score(b)/MAX[b]-score(a)/MAX[a]),best=sorted[0],weak=sorted.at(-1);
 app.innerHTML=shell(`<div class="titlebar"><div class="titlewrap"><h1>Your <span class="n">Results</span></h1><p>Итоги проверочной работы по Lesson 1B · World music</p></div><div class="progressBox"><strong>Готово</strong><div class="track"><i style="width:100%"></i></div></div></div><div class="results"><div class="ring" style="--pct:${pct}"><strong>${pct}%</strong><span>${total}/${totalMax} с первого раза</span></div><div><div class="resultList">${keys.map(k=>{const p=Math.round(score(k)/MAX[k]*100);return `<div class="resrow"><label>${LABELS[k]}</label><div class="resbar"><i style="width:${p}%"></i></div><b>${score(k)}/${MAX[k]}</b></div>`}).join('')}</div><div class="coach"><div><strong>Сильнее всего</strong><p>${LABELS[best]} — лучший результат с первой попытки.</p></div><div><strong>Что повторить</strong><p>${LABELS[weak]} — этот блок стоит пройти ещё раз.</p></div></div><div class="heroBtns" style="margin-top:16px"><button class="btn primary" id="retry">Пройти ещё раз</button><button class="btn secondary" id="home">На главную</button></div></div></div>`);
 document.getElementById('retry').onclick=()=>{state=fresh();state.screen=1;save();render()};
 document.getElementById('home').onclick=()=>{state.screen=0;save();render()};
}
function render(){stopAudio();({0:start,1:phrases,2:grammar,3:numbers,4:days,5:reading,6:pron,7:listening,8:results}[state.screen]||start)()}
render();
