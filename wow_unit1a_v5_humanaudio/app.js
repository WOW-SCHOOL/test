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
  text:`<b>Hi, I’m Helen.</b> I’m at a café. “A tea, please.” The assistant asks, “What’s your name?” “Helen.” “Ellen?” “No, Helen.” Tom says, “Hello. I’m Tom.” Helen asks, “Are you Tom?” “Yes, I am.” “Nice to meet you.” “Nice to meet you.” Tom says, “A cappuccino, please.” Helen says, “Goodbye, Tom. See you tomorrow.” Tom says, “Bye.”`,
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
function header(){return `<div class="noise"></div><div class="header"><div class="logoWrap"><div class="wowLogo"><strong>WOW</strong><i></i></div><div class="brandDivider"></div><div class="brandText"><strong>SCHOOL</strong><span>More English · Brighter Futures</span></div></div><div class="unitBadge"><span>English File Beginner</span><strong>Unit 1A</strong></div></div>`}
function shell(inner){return `${header()}<section class="shell"><div class="content">${inner}</div></section>`}
function progress(n){return `<div class="progressBox"><strong>Блок ${n}/7</strong><div class="track"><i style="width:${n/7*100}%"></i></div></div>`}
function title(n,t,sub){return `<div class="titlebar"><div class="titlewrap"><h1><span class="n">${n}.</span> ${t}</h1><p>${sub}</p></div>${progress(n)}</div>`}
function miniProgress(sec,idx,total){return `<div class="internalProgress"><div class="miniDots">${Array.from({length:total},(_,i)=>`<i class="miniDot ${i<idx?'done':i===idx?'current':''}"></i>`).join('')}</div><div class="counter">Задание ${Math.min(idx+1,total)} из ${total}</div></div>`}
function feedback(kind,text){return `<div class="feedbackBox ${kind}">${text}</div>`}

/* audio engine: real human British recordings from Wikimedia Commons / Shtooka.
   Same approach as sound-lockers-v5: no speech synthesis, no Google TTS. */
const WIKI_AUDIO_BASE='https://commons.wikimedia.org/wiki/Special:FilePath/';
const HUMAN_AUDIO_EXACT={
 'hi':['En-uk-hi.ogg'],
 'hello':['En-uk-hello.ogg'],
 'tea':['En-uk-tea.ogg'],
 'please':['En-uk-please.ogg'],
 'tomorrow':['En-uk-tomorrow.ogg'],
 'bye':['En-uk-bye.ogg'],
 'goodbye':['En-uk-goodbye.ogg','En-uk-bye.ogg'],
 'thanks':['En-uk-thanks.ogg','En-uk-thank you.ogg'],
 'thank you':['En-uk-thank you.ogg'],
 'sorry':['En-uk-sorry.ogg',"En-uk-I'm sorry.ogg"],
 "i'm sorry":["En-uk-I'm sorry.ogg"],
 'a minute':['En-uk-a minute.ogg'],
 'to meet':['En-uk-to meet.ogg'],
 'cappuccino':['Cappuccino Pronunciation.ogg'],
 'what':['En-uk-what.ogg'],
 'your':['En-uk-your.ogg'],
 'you':['En-uk-you.ogg'],
 'i':['En-uk-I.ogg'],
 'a':['En-uk-a.ogg']
};
const HUMAN_PHRASES={
 'hi':['hi'],
 'hello':['hello'],
 'thanks':['thanks'],
 'sorry':['sorry'],
 'goodbye':['goodbye'],
 'a tea, please':['a','tea','please'],
 'a cappuccino, please':['a','cappuccino','please'],
 'nice to meet you':['nice','to meet','you'],
 'just a minute':['just','a minute'],
 'what’s your name?':['what','is','your','name'],
 "what's your name?":['what','is','your','name']
};
let currentAudio=new Audio(),playToken=0,currentBtn=null;
currentAudio.preload='auto';
function wikiUrl(file){return WIKI_AUDIO_BASE+encodeURIComponent(file).replace(/%2F/g,'/').replace(/%20/g,'%20')}
function normText(t){return String(t||'').replace(/[“”]/g,'"').replace(/[’]/g,"'").replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()}
function expandToken(w){
 const x=w.toLowerCase();
 if(x==="i'm")return ['i','am'];
 if(x==="you're")return ['you','are'];
 if(x==="aren't")return ['are','not'];
 if(x==="what's")return ['what','is'];
 if(x==="i’m")return ['i','am'];
 if(x==="you’re")return ['you','are'];
 if(x==="aren’t")return ['are','not'];
 return [x];
}
function wordCandidates(key){
 const k=key.toLowerCase();
 if(HUMAN_AUDIO_EXACT[k])return HUMAN_AUDIO_EXACT[k];
 const clean=k.replace(/[^a-z0-9'-]/g,'');
 if(!clean)return [];
 const cap=clean.charAt(0).toUpperCase()+clean.slice(1);
 return [`En-uk-${clean}.ogg`,`En-uk-${cap}.ogg`,`En-gb-${clean}.ogg`];
}
function queueFor(text){
 const original=normText(text);const lower=original.toLowerCase();
 const exact=HUMAN_PHRASES[lower];
 let chunks=exact?[...exact]:null;
 if(!chunks){
  let raw=original.replace(/___+/g,' ').replace(/[.,!?;:()"“”]/g,' ').split(/\s+/).filter(Boolean);
  chunks=raw.flatMap(expandToken);
 }
 const out=[];
 for(let i=0;i<chunks.length;i++){
  const one=String(chunks[i]).toLowerCase();
  if(i<chunks.length-1){
   const two=`${one} ${String(chunks[i+1]).toLowerCase()}`;
   if(HUMAN_AUDIO_EXACT[two]){out.push({key:two,candidates:HUMAN_AUDIO_EXACT[two]});i++;continue}
  }
  out.push({key:one,candidates:wordCandidates(one)});
 }
 return out.filter(x=>x.candidates.length);
}
function stopAudio(){
 playToken++;
 try{currentAudio.pause();currentAudio.removeAttribute('src');currentAudio.load()}catch(e){}
 if(currentBtn){currentBtn.classList.remove('busy');currentBtn.textContent=currentBtn.dataset.idle||'▶ Прослушать';currentBtn=null}
}
function playCandidate(candidates,idx,token,resolve){
 if(token!==playToken)return resolve(false);
 if(idx>=candidates.length)return resolve(false);
 currentAudio.onerror=()=>playCandidate(candidates,idx+1,token,resolve);
 currentAudio.onended=()=>resolve(true);
 currentAudio.src=wikiUrl(candidates[idx]);
 currentAudio.load();
 currentAudio.play().catch(()=>playCandidate(candidates,idx+1,token,resolve));
}
function playUnit(unit,token){return new Promise(resolve=>playCandidate(unit.candidates,0,token,resolve))}
async function playQueue(queue,btn,pause=75){
 stopAudio();playToken++;const token=playToken;currentBtn=btn;
 if(btn){btn.dataset.idle=btn.textContent;btn.classList.add('busy');btn.textContent='■ Стоп'}
 let played=0;
 for(const unit of queue){
  if(token!==playToken)return;
  const ok=await playUnit(unit,token);if(ok)played++;
  if(token!==playToken)return;
  await new Promise(r=>setTimeout(r,pause));
 }
 if(token!==playToken)return;
 if(btn){btn.classList.remove('busy');btn.textContent=btn.dataset.idle||'▶ Прослушать';currentBtn=null}
 if(!played&&btn){btn.classList.add('error');btn.textContent='Аудио недоступно';setTimeout(()=>{btn.classList.remove('error');btn.textContent=btn.dataset.idle||'▶ Прослушать'},1800)}
}
function playText(text,voice='Brian',btn){
 if(btn?.classList.contains('busy')){stopAudio();return}
 playQueue(queueFor(text),btn,70);
}
function playScript(lines,btn){
 if(btn?.classList.contains('busy')){stopAudio();return}
 const queue=[];
 lines.forEach((l,li)=>{queue.push(...queueFor(l.text));if(li<lines.length-1)queue.push({pause:true,candidates:[]})});
 // Keep one media element alive through the whole dialogue; this is more iframe-friendly.
 stopAudio();playToken++;const token=playToken;currentBtn=btn;
 if(btn){btn.dataset.idle=btn.textContent;btn.classList.add('busy');btn.textContent='■ Стоп'}
 (async()=>{
  let played=0;
  for(const unit of queue){
   if(token!==playToken)return;
   if(unit.pause){await new Promise(r=>setTimeout(r,260));continue}
   const ok=await playUnit(unit,token);if(ok)played++;
   await new Promise(r=>setTimeout(r,55));
  }
  if(token!==playToken)return;
  if(btn){btn.classList.remove('busy');btn.textContent=btn.dataset.idle||'▶ Прослушать';currentBtn=null}
  if(!played&&btn){btn.classList.add('error');btn.textContent='Аудио недоступно';setTimeout(()=>{btn.classList.remove('error');btn.textContent=btn.dataset.idle||'▶ Прослушать'},1800)}
 })();
}
function audioBtn(id,label='Прослушать'){return `<button class="audioBtn" id="${id}">▶ ${label}</button><span class="audioMeta">Real British voice · Wikimedia Commons</span>`}

function recordAttempt(sec,i,isCorrect){
 let a=state.answers[sec][i];
 if(!a){a={attempts:0,firstCorrect:null,solved:false};state.answers[sec][i]=a}
 a.attempts++;
 if(a.firstCorrect===null)a.firstCorrect=isCorrect;
 if(isCorrect)a.solved=true;
 state.mistakes[`${sec}:${i}`]=isCorrect?null:true;save();
}
function commonQuestionScreen(sec,blockNum,heading,sub,visualHTML,item,total,audioText,audioVoice='Brian',afterLast){
 const idx=state.idx[sec]||0;const done=solved(sec,idx);
 app.innerHTML=shell(`${title(blockNum,heading,sub)}<div class="blockBody"><div class="visualCard">${visualHTML}</div><div class="questionCard"><div class="kicker">${LABELS[sec]}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Выбери правильный вариант. Если ошибёшься, можно попробовать ещё раз.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div id="fb">${done?feedback('good','Верно! Переходим дальше.'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,total)}</div></div><div class="footerActions"><div class="leftActions">${audioText?audioBtn('audio','Прослушать'):''}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===total-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 const fb=document.getElementById('fb');
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
  if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);
  if(ok){b.classList.add('correct');fb.innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}
  else{b.classList.add('wrongFlash');fb.innerHTML=feedback('bad','Пока нет. Попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}
 });
 if(audioText){document.getElementById('audio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Прослушать'}else playText(audioText,audioVoice,this)}}
 document.getElementById('next').onclick=()=>{if(idx<total-1){state.idx[sec]=idx+1;save();render()}else afterLast()};
}

function start(){app.innerHTML=shell(`<div class="hero"><div><div class="heroKicker">Unit Review · Lesson 1A</div><h1>A cappuccino,<span>please</span></h1><p>7 интерактивных блоков: фразы, verb be с I / you, numbers 0–10, days & goodbye, reading, pronunciation и listening. Всё — только по материалу Lesson 1A.</p><div class="heroBtns"><button class="btn primary" id="start">Начать →</button><button class="btn secondary" id="reset">Сбросить прогресс</button></div></div><div class="heroVisual"><div class="blob"><div class="cupIllo"><div class="saucerIllo"></div><div class="cupBody"></div><div class="cupHandle"></div></div><div class="tag a">7 блоков</div><div class="tag b">UK audio</div></div></div></div>`);document.getElementById('start').onclick=()=>{state.screen=1;save();render()};document.getElementById('reset').onclick=()=>{state=fresh();save();render()}}
function phrases(){const sec='phrases',idx=state.idx[sec]||0,item=data.phrases[idx];const vis=`<div class="cafeScene"><div class="cupIllo"><div class="saucerIllo"></div><div class="cupBody"></div><div class="cupHandle"></div></div><div class="speech">${esc(item.q)}</div></div>`;commonQuestionScreen(sec,1,'Words & Phrases','Фраза всегда остаётся на экране — выбери перевод',vis,item,data.phrases.length,item.q,'Amy',()=>{state.screen=2;save();render()})}
function grammar(){const sec='grammar',idx=state.idx[sec]||0,item=data.grammar[idx];const vis=`<div class="grammarVisual"><div class="magnetBoard"><div class="magnetRow"><div class="magnet ${item.q.startsWith('You')||item.q.includes('you')?'you':'i'}">${item.q.startsWith('You')||item.q.includes('you')?'YOU':'I'}</div><div class="equals">+</div><div class="magnet be">BE</div></div><div class="grammarLegend">I am · You are · Am I? · Are you?</div></div></div>`;commonQuestionScreen(sec,2,'Grammar Check','verb be · только I / you',vis,item,data.grammar.length,item.q,'Brian',()=>{state.screen=3;save();render()})}
function numbers(){const sec='numbers',idx=state.idx[sec]||0,item=data.numbers[idx];const n=item.visual;const cups=Array.from({length:Math.min(n,10)},()=>'<i class="miniCup"></i>').join('');const vis=`<div class="numberVisual"><div class="bigNumber">${n}</div><div class="cupCount">${cups}</div></div>`;commonQuestionScreen(sec,3,'Numbers 0–10','Узнай число и продолжи последовательность',vis,item,data.numbers.length,item.q,'Brian',()=>{state.screen=4;save();render()})}
function days(){const sec='days',idx=state.idx[sec]||0,item=data.days[idx];const dayNames=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];const vis=`<div class="calendarVisual">${dayNames.map((d,i)=>`<div class="dayTile ${item.q.startsWith(d)?'today':''}"><b>${d}</b><span>${i+1}</span></div>`).join('')}</div>`;commonQuestionScreen(sec,4,'Days & Goodbye','Дни недели и фразы прощания',vis,item,data.days.length,item.q,'Amy',()=>{state.screen=5;save();render()})}
function reading(){const sec='reading',idx=state.idx[sec]||0,item=data.reading.qs[idx],done=solved(sec,idx);app.innerHTML=shell(`${title(5,'Reading Café','Прочитай мини-историю и ответь на вопросы')}<div class="blockBody"><div class="visualCard"><div class="readingVisual"><div class="miniCafe"><div class="person a"><i class="head"></i><i class="body"></i></div><div class="person b"><i class="head"></i><i class="body"></i></div><div class="cafeCup"></div><div class="counterBar"></div></div><div class="readText">${data.reading.text}</div></div></div><div class="questionCard"><div class="kicker">Reading comprehension</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Ответь только по тексту.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,data.reading.qs.length)}</div></div><div class="footerActions"><div class="leftActions">${audioBtn('readAudio','Послушать текст')}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.reading.qs.length-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
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
function listening(){const sec='listening',idx=state.idx[sec]||0,item=data.listening.qs[idx],done=solved(sec,idx),script=data.listening.scripts.find(s=>s.id===item.script);app.innerHTML=shell(`${title(7,'Listening Mission','Слушай диалог и отвечай — только язык Lesson 1A')}<div class="blockBody"><div class="visualCard"><div class="headphoneVisual"><div class="headphones"><i class="hpBand"></i><i class="ear l"></i><i class="ear r"></i></div></div></div><div class="questionCard"><div class="kicker">Dialogue ${script.id}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Диалог можно прослушать несколько раз.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Сначала прослушай диалог')}</div>${miniProgress(sec,idx,data.listening.qs.length)}</div></div><div class="footerActions"><div class="leftActions">${audioBtn('listenAudio',`Диалог ${script.id}`)}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.listening.qs.length-1?'Результат →':'Следующее задание →'}</button></div>`);
 document.getElementById('listenAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent=`▶ Диалог ${script.id}`}else playScript(script.lines,this)};
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Прослушай ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('next').onclick=()=>{if(idx<data.listening.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=8;save();render()}};
}
function results(){const keys=SECTIONS,totalMax=keys.reduce((n,k)=>n+MAX[k],0),total=keys.reduce((n,k)=>n+score(k),0),pct=Math.round(total/totalMax*100),sorted=[...keys].sort((a,b)=>score(b)/MAX[b]-score(a)/MAX[a]),best=sorted[0],weak=sorted.at(-1);app.innerHTML=shell(`<div class="titlebar"><div class="titlewrap"><h1>Your <span class="n">Results</span></h1><p>Итоги проверочной работы по Lesson 1A</p></div><div class="progressBox"><strong>Готово</strong><div class="track"><i style="width:100%"></i></div></div></div><div class="results"><div class="ring" style="--pct:${pct}"><strong>${pct}%</strong><span>с первого раза</span></div><div><div class="resultList">${keys.map(k=>{const p=Math.round(score(k)/MAX[k]*100);return `<div class="resrow"><label>${LABELS[k]}</label><div class="resbar"><i style="width:${p}%"></i></div><b>${score(k)}/${MAX[k]}</b></div>`}).join('')}</div><div class="coach"><div><strong>Сильнее всего</strong><p>${LABELS[best]} — лучший результат с первой попытки.</p></div><div><strong>Что повторить</strong><p>${LABELS[weak]} — этот блок стоит пройти ещё раз.</p></div></div><div class="heroBtns" style="margin-top:16px"><button class="btn primary" id="retry">Пройти ещё раз</button><button class="btn secondary" id="home">На главную</button></div></div></div>`);document.getElementById('retry').onclick=()=>{state=fresh();state.screen=1;save();render()};document.getElementById('home').onclick=()=>{state.screen=0;save();render()}}
function render(){stopAudio();({0:start,1:phrases,2:grammar,3:numbers,4:days,5:reading,6:pron,7:listening,8:results}[state.screen]||start)()}
render();
