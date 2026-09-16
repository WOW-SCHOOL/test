const BASE_W=1600,BASE_H=900;
function fit(){const s=Math.min(innerWidth/BASE_W,innerHeight/BASE_H);document.getElementById('fit').style.transform=`translate(-50%,-50%) scale(${s})`}
addEventListener('resize',fit);fit();

const app=document.getElementById('app');
const SECTIONS=['phrases','grammar','numbers','days','reading','pron','listening'];
const LABELS={phrases:'Words & Phrases',grammar:'Grammar',numbers:'Numbers',days:'Days & Goodbye',reading:'Reading',pron:'Pronunciation',listening:'Listening'};

const data={
 phrases:[
  {q:'Hi',a:'Привет',o:['Привет','Спасибо','До свидания','Чай, пожалуйста'],audio:'phrases_1'},
  {q:'Hello',a:'Здравствуйте / Привет',o:['Извините / Простите','Здравствуйте / Привет','Приятно познакомиться','Капучино, пожалуйста'],audio:'phrases_2'},
  {q:'What’s your name?',a:'Как тебя / вас зовут?',o:['Как тебя / вас зовут?','Спасибо','До завтра','Чай, пожалуйста'],audio:'phrases_3'},
  {q:'Nice to meet you',a:'Приятно познакомиться',o:['До свидания','Приятно познакомиться','Как тебя / вас зовут?','Одну минуту'],audio:'phrases_4'},
  {q:'A cappuccino, please',a:'Капучино, пожалуйста',o:['Чай, пожалуйста','Капучино, пожалуйста','Спасибо','Привет'],audio:'phrases_5'},
  {q:'A tea, please',a:'Чай, пожалуйста',o:['Капучино, пожалуйста','Извините / Простите','Чай, пожалуйста','До свидания'],audio:'phrases_6'},
  {q:'Thanks',a:'Спасибо',o:['Спасибо','Привет','Одну минуту','Приятно познакомиться'],audio:'phrases_7'},
  {q:'Sorry',a:'Извините / Простите',o:['До свидания','Извините / Простите','Спасибо','Как тебя / вас зовут?'],audio:'phrases_8'},
  {q:'Just a minute',a:'Одну минуту',o:['Одну минуту','Спасибо','Привет','Чай, пожалуйста'],audio:'phrases_9'},
  {q:'Goodbye',a:'До свидания',o:['До свидания','Приятно познакомиться','Капучино, пожалуйста','Извините / Простите'],audio:'phrases_10'}
 ],
 grammar:[
  {q:'I ___ Helen',a:'am',o:['am','are'],audio:'grammar_1'},{q:'You ___ Tom',a:'are',o:['am','are'],audio:'grammar_2'},
  {q:'I ___ not Ellen',a:'am',o:['am','are'],audio:'grammar_3'},{q:'You ___ not Dom',a:'are',o:['am','are'],audio:'grammar_4'},
  {q:'___ I in class 2?',a:'Am',o:['Am','Are'],audio:'grammar_5'},{q:'___ you Mike?',a:'Are',o:['Am','Are'],audio:'grammar_6'},
  {q:'Are you Helen?',a:'Yes, I am',o:['Yes, I am','Yes, you are'],audio:'grammar_7'},{q:'Am I in your class?',a:'Yes, you are',o:['Yes, you are','Yes, I am'],audio:'grammar_8'},
  {q:'Are you Diana?',a:'No, I’m not',o:['No, I’m not','No, you aren’t'],audio:'grammar_9'},{q:'Am I in room 8?',a:'No, you aren’t',o:['No, you aren’t','No, I’m not'],audio:'grammar_10'}
 ],
 numbers:[
  {q:'Listen and choose the number.',a:'0',o:['0','2','10'],audio:'numbers_1'},
  {q:'Listen and choose the number.',a:'3',o:['3','7','9'],audio:'numbers_2'},
  {q:'Listen and choose the number.',a:'5',o:['4','5','6'],audio:'numbers_3'},
  {q:'Listen and choose the number.',a:'7',o:['1','7','8'],audio:'numbers_4'},
  {q:'Listen and choose the number.',a:'9',o:['6','8','9'],audio:'numbers_5'},
  {q:'Listen and choose the next number.',a:'4',o:['4','6','10'],audio:'numbers_6'},
  {q:'Listen and choose the next number.',a:'5',o:['5','7','10'],audio:'numbers_7'},
  {q:'Listen and choose the next number.',a:'9',o:['9','6','0'],audio:'numbers_8'},
  {q:'Listen and choose the next number.',a:'10',o:['10','3','5'],audio:'numbers_9'},
  {q:'Listen and choose the next number.',a:'2',o:['2','6','8'],audio:'numbers_10'}
 ],
 days:[
  {q:'Monday →',a:'Tuesday',o:['Tuesday','Friday','Sunday'],audio:'days_1'},{q:'Tuesday →',a:'Wednesday',o:['Wednesday','Monday','Saturday'],audio:'days_2'},
  {q:'Wednesday →',a:'Thursday',o:['Thursday','Tuesday','Friday'],audio:'days_3'},{q:'Thursday →',a:'Friday',o:['Friday','Sunday','Monday'],audio:'days_4'},
  {q:'Friday →',a:'Saturday',o:['Saturday','Thursday','Tuesday'],audio:'days_5'},{q:'Saturday →',a:'Sunday',o:['Sunday','Friday','Monday'],audio:'days_6'},
  {q:'Goodbye, Tom. See you on ___',a:'Friday',o:['Friday','five','tea'],audio:'days_7'},{q:'See you ___',a:'tomorrow',o:['tomorrow','cappuccino','Helen'],audio:'days_8'}
 ],
 reading:{
  text:`<b>Hi, I’m Helen.</b> I’m at a café. “A tea, please.” The assistant asks, “What’s your name?” “Helen.” “Ellen?” “No, Helen.” Tom says, “Hello. I’m Tom.” Helen asks, “Are you Tom?” “Yes, I am.” “Nice to meet you.” “Nice to meet you.” Tom says, “A cappuccino, please.” Helen says, “Goodbye, Tom. See you tomorrow.” Tom says, “Bye.”`,
  audio:'reading_text',
  qs:[
   {q:'What’s her name?',a:'Helen',o:['Helen','Ellen','Diana']},
   {q:'What does Helen order?',a:'A tea',o:['A tea','A cappuccino','Two teas']},
   {q:'What’s the man’s name?',a:'Tom',o:['Tom','Dom','Mike']},
   {q:'What does Tom order?',a:'A cappuccino',o:['A tea','A cappuccino','Three teas']},
   {q:'When do they see each other?',a:'Tomorrow',o:['Tomorrow','Friday','Monday']}
  ]
 },
 pron:[
  {w:'hello',a:'/h/',audio:'pron_1'},{w:'Helen',a:'/h/',audio:'pron_2'},{w:'hi',a:'/h/',audio:'pron_3'},
  {w:'I’m',a:'/aɪ/',audio:'pron_4'},{w:'five',a:'/aɪ/',audio:'pron_5'},{w:'nine',a:'/aɪ/',audio:'pron_6'},
  {w:'meet',a:'/iː/',audio:'pron_7'},{w:'tea',a:'/iː/',audio:'pron_8'}
 ],
 listening:{
  scripts:[
   {id:1,audio:'listening_1',lines:[
    {text:'Hello.'},{text:'Hi. A cappuccino, please.'},{text:'OK. What’s your name?'},{text:'Tom.'},{text:'Tom. Your cappuccino.'},{text:'Thanks.'}
   ]},
   {id:2,audio:'listening_2',lines:[
    {text:'Hi. Are you Helen?'},{text:'Yes, I am. And you’re Tom?'},{text:'Yes. Nice to meet you.'},{text:'Nice to meet you.'},{text:'A tea, please.'},{text:'Goodbye, Tom. See you on Friday.'},{text:'Bye.'}
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
try{const s=JSON.parse(localStorage.getItem('wow1a_v6'));if(s&&s.answers)state={...fresh(),...s,idx:{...fresh().idx,...(s.idx||{})},answers:{...fresh().answers,...s.answers}}}catch(e){}
function save(){localStorage.setItem('wow1a_v6',JSON.stringify(state))}
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function solved(sec,i){return !!state.answers[sec]?.[i]?.solved}
function firstCorrect(sec,i){return !!state.answers[sec]?.[i]?.firstCorrect}
function score(sec){return Object.values(state.answers[sec]||{}).filter(x=>x.firstCorrect).length}
function header(){return `<div class="noise"></div><div class="header"><div class="logoWrap"><div class="wowLogo"><strong>WOW</strong><i></i></div><div class="brandDivider"></div><div class="brandText"><strong>SCHOOL</strong><span>More English · Brighter Futures</span></div></div><div class="unitBadge"><span>English File Beginner</span><strong>Unit 1A</strong></div></div>`}
function shell(inner){return `${header()}<section class="shell"><div class="content">${inner}</div></section>`}
function progress(n){return `<div class="progressBox"><strong>Блок ${n}/7</strong><div class="track"><i style="width:${n/7*100}%"></i></div></div>`}
function title(n,t,sub){return `<div class="titlebar"><div class="titlewrap"><h1><span class="n">${n}.</span> ${t}</h1><p>${sub}</p></div>${progress(n)}</div>`}
function miniProgress(sec,idx,total){return `<div class="internalProgress"><div class="miniDots">${Array.from({length:total},(_,i)=>`<i class="miniDot ${i<idx?'done':i===idx?'current':''}"></i>`).join('')}</div><div class="counter">${Math.min(idx+1,total)} из ${total}</div></div>`}
function feedback(kind,text){return `<div class="feedbackBox ${kind}">${text}</div>`}
function audioBtn(id,label='Прослушать'){return `<button class="audioBtn" id="${id}" data-label="${esc(label)}">▶ ${label}</button><span class="audioMeta">British English · local MP3/WAV</span>`}

let currentAudio=null;
function stopAudio(){if(currentAudio){try{currentAudio.pause();currentAudio.currentTime=0}catch(e){}currentAudio=null}}
function setBtnIdle(btn){if(!btn)return;btn.classList.remove('busy','error');btn.textContent=`▶ ${btn.dataset.label||'Прослушать'}`}
function setBtnBusy(btn){if(!btn)return;btn.classList.remove('error');btn.classList.add('busy');btn.textContent='■ Стоп'}
function setBtnError(btn){if(!btn)return;btn.classList.remove('busy');btn.classList.add('error');btn.textContent='Аудио недоступно';setTimeout(()=>setBtnIdle(btn),2000)}
function playFile(path,btn){if(btn?.classList.contains('busy')){stopAudio();setBtnIdle(btn);return}stopAudio();const a=new Audio(path);currentAudio=a;setBtnBusy(btn);a.onended=()=>{if(currentAudio===a)currentAudio=null;setBtnIdle(btn)};a.onerror=()=>{if(currentAudio===a)currentAudio=null;setBtnError(btn)};a.play().catch(()=>setBtnError(btn))}
function playFiles(paths,btn){if(btn?.classList.contains('busy')){stopAudio();setBtnIdle(btn);return}stopAudio();setBtnBusy(btn);let i=0;const playNext=()=>{if(i>=paths.length){currentAudio=null;setBtnIdle(btn);return}const a=new Audio(paths[i++]);currentAudio=a;a.onended=()=>playNext();a.onerror=()=>{currentAudio=null;setBtnError(btn)};a.play().catch(()=>setBtnError(btn))};playNext()}
function file(id){return `assets/audio/${id}.wav`}

function recordAttempt(sec,i,isCorrect){
 let a=state.answers[sec][i];
 if(!a){a={attempts:0,firstCorrect:null,solved:false};state.answers[sec][i]=a}
 a.attempts++;
 if(a.firstCorrect===null)a.firstCorrect=isCorrect;
 if(isCorrect)a.solved=true;
 state.mistakes[`${sec}:${i}`]=isCorrect?null:true;save();
}
function commonQuestionScreen(sec,blockNum,heading,sub,visualHTML,item,total,audioId,afterLast){
 const idx=state.idx[sec]||0;const done=solved(sec,idx);
 app.innerHTML=shell(`${title(blockNum,heading,sub)}<div class="blockBody"><div class="visualCard">${visualHTML}</div><div class="questionCard"><div class="questionMain"><div class="kicker">${LABELS[sec]}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Выбери правильный вариант. Если ошибёшься, можно попробовать ещё раз.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div></div><div class="questionBottom"><div id="fb">${done?feedback('good','Верно! Переходим дальше.'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,total)}</div></div></div><div class="footerActions"><div class="leftActions">${audioId?audioBtn('audio','Прослушать'):''}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===total-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 const fb=document.getElementById('fb');
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{
  if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);
  if(ok){b.classList.add('correct');fb.innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}
  else{b.classList.add('wrongFlash');fb.innerHTML=feedback('bad','Пока нет. Попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}
 });
 if(audioId){document.getElementById('audio').onclick=function(){playFile(file(audioId),this)}}
 document.getElementById('next').onclick=()=>{if(idx<total-1){state.idx[sec]=idx+1;save();render()}else afterLast()};
}

function start(){app.innerHTML=shell(`<div class="hero"><div><div class="heroKicker">Unit Review · Lesson 1A</div><h1>A cappuccino,<span>please</span></h1><p>7 интерактивных блоков: фразы, verb be с I / you, numbers 0–10, days & goodbye, reading, pronunciation и listening. Всё — только по материалу Lesson 1A.</p><div class="heroBtns"><button class="btn primary" id="start">Начать →</button><button class="btn secondary" id="reset">Сбросить прогресс</button></div></div><div class="heroVisual"><div class="blob"><div class="cupIllo"><div class="saucerIllo"></div><div class="cupBody"></div><div class="cupHandle"></div></div><div class="tag a">7 блоков</div><div class="tag b">UK audio</div></div></div></div>`);document.getElementById('start').onclick=()=>{state.screen=1;save();render()};document.getElementById('reset').onclick=()=>{state=fresh();save();render()}}
function phrases(){const sec='phrases',idx=state.idx[sec]||0,item=data.phrases[idx];const vis=`<div class="cafeScene"><div class="sceneBadge">${idx+1} / ${data.phrases.length}</div><div class="cupIllo"><div class="saucerIllo"></div><div class="cupBody"></div><div class="cupHandle"></div></div><div class="speech">${esc(item.q)}</div><div class="phraseTip">Слушай фразу и выбери перевод.</div></div>`;commonQuestionScreen(sec,1,'Words & Phrases','Фраза всегда остаётся на экране — выбери перевод',vis,item,data.phrases.length,item.audio,()=>{state.screen=2;save();render()})}
function grammar(){const sec='grammar',idx=state.idx[sec]||0,item=data.grammar[idx];const you=(item.q.startsWith('You')||item.q.includes('you'));const vis=`<div class="grammarVisual"><div class="magnetBoard"><div class="magnetRow"><div class="magnet ${you?'you':'i'}">${you?'YOU':'I'}</div><div class="equals">+</div><div class="magnet be">BE</div></div><div class="grammarLegend">I am · You are · Am I? · Are you?</div></div></div>`;commonQuestionScreen(sec,2,'Grammar Check','verb be · только I / you',vis,item,data.grammar.length,item.audio,()=>{state.screen=3;save();render()})}
function numbers(){const sec='numbers',idx=state.idx[sec]||0,item=data.numbers[idx];const vis=`<div class="numberVisual modern"><div class="soundCard"><div class="soundIcon"><span></span><span></span><span></span></div><div class="soundText">Listen</div></div><div class="numberChips"><i>?</i><i>?</i><i>?</i></div><div class="phraseTip">Ориентируйся на аудио, а не на картинку.</div></div>`;commonQuestionScreen(sec,3,'Numbers 0–10','Слушай число или последовательность и выбирай ответ',vis,item,data.numbers.length,item.audio,()=>{state.screen=4;save();render()})}
function days(){const sec='days',idx=state.idx[sec]||0,item=data.days[idx];const vis=`<div class="plannerVisual"><div class="plannerTop"><div class="plannerTab"></div><div class="plannerTab"></div><div class="plannerTitle">Weekly Planner</div></div><div class="plannerRows"><div class="plannerRow"><i></i><span></span></div><div class="plannerRow"><i></i><span></span></div><div class="plannerRow"><i></i><span></span></div><div class="plannerRow"><i></i><span></span></div></div><div class="plannerStickers"><b>Hi</b><b>Tea</b><b>Bye</b></div><div class="phraseTip">Без подсказки-календаря: ориентируйся на вопрос и аудио.</div></div>`;commonQuestionScreen(sec,4,'Days & Goodbye','Дни недели и фразы прощания',vis,item,data.days.length,item.audio,()=>{state.screen=5;save();render()})}
function reading(){const sec='reading',idx=state.idx[sec]||0,item=data.reading.qs[idx],done=solved(sec,idx);app.innerHTML=shell(`${title(5,'Reading Café','Прочитай мини-историю и ответь на вопросы')}<div class="blockBody"><div class="visualCard"><div class="readingVisual"><div class="readingScene"><div class="sceneWindow"></div><div class="sceneLamp"></div><div class="scenePlant"></div><div class="sceneTable"></div><div class="scenePerson left"><i class="head"></i><i class="hair"></i><i class="body"></i><i class="arm"></i></div><div class="scenePerson right"><i class="head"></i><i class="hair"></i><i class="body"></i><i class="arm"></i></div><div class="sceneCup cup1"></div><div class="sceneCup cup2"></div></div><div class="readText">${data.reading.text}</div></div></div><div class="questionCard"><div class="questionMain"><div class="kicker">Reading comprehension</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Ответь только по тексту.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div></div><div class="questionBottom"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,data.reading.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('readAudio','Послушать текст')}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.reading.qs.length-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Перечитай текст и попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('readAudio').onclick=function(){playFile(file(data.reading.audio),this)};
 document.getElementById('next').onclick=()=>{if(idx<data.reading.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=6;save();render()}};
}
function pron(){const bins=['/h/','/aɪ/','/iː/'];const allDone=Object.values(state.answers.pron).filter(x=>x?.solved).length===data.pron.length;app.innerHTML=shell(`${title(6,'Sound Sort','Перетащи слово в правильный звук или выбери слово и нажми на блок')}<div class="sortLayout"><div class="bins">${bins.map(b=>`<div class="bin" data-bin="${b}"><strong>${b}</strong><small>${b==='/h/'?'hello · Helen · hi':b==='/aɪ/'?'I’m · five · nine':'meet · tea'}</small><div class="binwords">${data.pron.map((x,i)=>state.answers.pron[i]?.solved&&x.a===b?`<button class="wordChip good" disabled>${esc(x.w)}</button>`:'').join('')}</div></div>`).join('')}</div><div class="wordBank">${data.pron.map((x,i)=>!state.answers.pron[i]?.solved?`<button draggable="true" class="wordChip ${state.selectedPron===i?'selected':''}" data-word="${i}">${esc(x.w)}</button>`:'').join('')}<span id="pronHint" class="audioMeta large">${allDone?'Все слова распределены верно':'Выбери слово, послушай его и отправь в правильный блок'}</span></div></div><div class="footerActions"><div class="leftActions">${audioBtn('pronAudio','Послушать выбранное слово')}</div><button class="nextBtn" id="next" ${allDone?'':'disabled'}>Следующий блок →</button></div>`);
 function tryPlace(i,bin){const x=data.pron[i];if(x.a===bin){let a=state.answers.pron[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;if(a.firstCorrect===null)a.firstCorrect=true;a.solved=true;state.answers.pron[i]=a;state.selectedPron=null;save();render()}else{let a=state.answers.pron[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;if(a.firstCorrect===null)a.firstCorrect=false;state.answers.pron[i]=a;save();const h=document.getElementById('pronHint');h.textContent=`${x.w}: это не ${bin}. Попробуй другой звук.`;h.style.color='#bd4053'}}
 document.querySelectorAll('[data-word]').forEach(w=>{const i=+w.dataset.word;w.onclick=()=>{state.selectedPron=i;save();render()};w.ondragstart=e=>{e.dataTransfer.setData('text/plain',String(i));e.dataTransfer.effectAllowed='move'}});
 document.querySelectorAll('[data-bin]').forEach(b=>{b.onclick=()=>{if(state.selectedPron!==null)tryPlace(state.selectedPron,b.dataset.bin)};b.ondragover=e=>{e.preventDefault();b.classList.add('dropTarget')};b.ondragleave=()=>b.classList.remove('dropTarget');b.ondrop=e=>{e.preventDefault();b.classList.remove('dropTarget');const i=+e.dataTransfer.getData('text/plain');if(Number.isInteger(i))tryPlace(i,b.dataset.bin)}});
 document.getElementById('pronAudio').onclick=function(){if(state.selectedPron===null){const h=document.getElementById('pronHint');h.textContent='Сначала выбери слово';h.style.color='#bd4053';return}playFile(file(data.pron[state.selectedPron].audio),this)};
 document.getElementById('next').onclick=()=>{state.screen=7;save();render()};
}
function listening(){const sec='listening',idx=state.idx[sec]||0,item=data.listening.qs[idx],done=solved(sec,idx),script=data.listening.scripts.find(s=>s.id===item.script);app.innerHTML=shell(`${title(7,'Listening Mission','Слушай диалог и отвечай — только язык Lesson 1A')}<div class="blockBody"><div class="visualCard"><div class="headphoneVisual"><div class="headphones"><i class="hpBand"></i><i class="ear l"></i><i class="ear r"></i></div><div class="listenNotes"><span>hello</span><span>tea</span><span>Tom</span></div></div></div><div class="questionCard"><div class="questionMain"><div class="kicker">Dialogue ${script.id}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Сначала прослушай диалог, потом выбери ответ.</div><div class="answers">${item.o.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div></div><div class="questionBottom"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Сначала прослушай диалог')}</div>${miniProgress(sec,idx,data.listening.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('listenAudio',`Диалог ${script.id}`)}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.listening.qs.length-1?'Результат →':'Следующее задание →'}</button></div>`);
 document.getElementById('listenAudio').onclick=function(){playFile(file(script.audio),this)};
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Прослушай ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});
 document.getElementById('next').onclick=()=>{if(idx<data.listening.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=8;save();render()}};
}
function results(){const keys=SECTIONS,totalMax=keys.reduce((n,k)=>n+MAX[k],0),total=keys.reduce((n,k)=>n+score(k),0),pct=Math.round(total/totalMax*100),sorted=[...keys].sort((a,b)=>score(b)/MAX[b]-score(a)/MAX[a]),best=sorted[0],weak=sorted.at(-1);app.innerHTML=shell(`<div class="titlebar"><div class="titlewrap"><h1>Your <span class="n">Results</span></h1><p>Итоги проверочной работы по Lesson 1A</p></div><div class="progressBox"><strong>Готово</strong><div class="track"><i style="width:100%"></i></div></div></div><div class="results"><div class="ring" style="--pct:${pct}"><strong>${pct}%</strong><span>с первого раза</span></div><div><div class="resultList">${keys.map(k=>{const p=Math.round(score(k)/MAX[k]*100);return `<div class="resrow"><label>${LABELS[k]}</label><div class="resbar"><i style="width:${p}%"></i></div><b>${score(k)}/${MAX[k]}</b></div>`}).join('')}</div><div class="coach"><div><strong>Сильнее всего</strong><p>${LABELS[best]} — лучший результат с первой попытки.</p></div><div><strong>Что повторить</strong><p>${LABELS[weak]} — этот блок стоит пройти ещё раз.</p></div></div><div class="heroBtns" style="margin-top:16px"><button class="btn primary" id="retry">Пройти ещё раз</button><button class="btn secondary" id="home">На главную</button></div></div></div>`);document.getElementById('retry').onclick=()=>{state=fresh();state.screen=1;save();render()};document.getElementById('home').onclick=()=>{state.screen=0;save();render()}}
function render(){stopAudio();({0:start,1:phrases,2:grammar,3:numbers,4:days,5:reading,6:pron,7:listening,8:results}[state.screen]||start)()}
render();
