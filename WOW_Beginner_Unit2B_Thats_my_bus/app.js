const BASE_W=1600,BASE_H=900;
function fit(){const s=Math.min(innerWidth/BASE_W,innerHeight/BASE_H);document.getElementById('fit').style.transform=`translate(-50%,-50%) scale(${s})`}
addEventListener('resize',fit);fit();

const app=document.getElementById('app');
const SECTIONS=['phrases','grammar','numbers','functional','reading','sort','listening'];
const LABELS={phrases:'Words & Phrases',grammar:'Grammar',numbers:'Numbers',functional:'Real-life English',reading:'Reading',sort:'Question Sort',listening:'Listening'};
const STORAGE_KEY='wow_beginner_2b_bus_v1';

const data={
 phrases:[
  {q:'Who’s that?',a:'Кто это?',o:['Кто это?','Откуда он?','Как его зовут?','Сколько ему лет?']},
  {q:'How old is he?',a:'Сколько ему лет?',o:['Как у него дела?','Сколько ему лет?','Где он?','Какой у него номер?']},
  {q:'He’s very good-looking.',a:'Он очень привлекательный.',o:['Он очень привлекательный.','Он из Мексики.','Он в моей группе.','Он очень молодой.']},
  {q:'How are you?',a:'Как дела?',o:['Сколько вам лет?','Как дела?','Откуда вы?','Какой у вас номер телефона?']},
  {q:'I’m fine, thanks.',a:'Всё хорошо, спасибо.',o:['До завтра.','Всё хорошо, спасибо.','Очень приятно.','Это мой автобус.']},
  {q:'This is Alex.',a:'Это Алекс.',o:['Это Алекс.','Кто Алекс?','Алекс здесь.','Где Алекс?']},
  {q:'What class are you in?',a:'В какой вы / ты группе?',o:['В какой вы / ты группе?','Откуда вы / ты?','Сколько вам / тебе лет?','Какой номер автобуса?']},
  {q:'That’s my bus!',a:'Это мой автобус!',o:['Это моя остановка!','Это мой автобус!','Автобус опаздывает!','Где автобус?']},
  {q:'This is my bus stop.',a:'Это моя автобусная остановка.',o:['Это мой автобус.','Это моя автобусная остановка.','Это моя группа.','Это мой телефон.']},
  {q:'What’s your phone number?',a:'Какой у вас / тебя номер телефона?',o:['Как вас / тебя зовут?','Какой у вас / тебя номер телефона?','Где ваш / твой телефон?','Сколько стоит телефон?']}
 ],
 grammar:[
  {q:'___ is he? — He’s Alex.',a:'Who',o:['Who','Where','How','What']},
  {q:'___ are you from? — I’m from Mexico.',a:'Where',o:['Who','Where','How','What']},
  {q:'___ old is she? — She’s nineteen.',a:'How',o:['Who','Where','How','What']},
  {q:'___ is your phone number?',a:'What',o:['Who','Where','How','What']},
  {q:'___ are you? — I’m fine, thanks.',a:'How',o:['How','Where','Who','When']},
  {q:'___ is room 4?',a:'Where',o:['Where','What','Who','How']},
  {q:'Choose the correct question.',a:'Where are you from?',o:['Where are you from?','Where you are from?','Where from are you?']},
  {q:'Choose the correct question.',a:'How old is he?',o:['How is old he?','How old he is?','How old is he?']},
  {q:'Choose the correct question.',a:'What’s your phone number?',o:['What your phone number is?','What’s your phone number?','What is phone your number?']},
  {q:'Choose the correct question.',a:'Who’s that?',o:['Who that is?','Who’s that?','Who that?']}
 ],
 numbers:[
  {q:'What number do you hear?',audio:'thirteen',a:'13',o:['13','30','33']},
  {q:'What number do you hear?',audio:'forty',a:'40',o:['14','40','44']},
  {q:'What number do you hear?',audio:'fifteen',a:'15',o:['15','50','55']},
  {q:'What number do you hear?',audio:'fifty',a:'50',o:['15','50','51']},
  {q:'What number do you hear?',audio:'sixteen',a:'16',o:['16','60','66']},
  {q:'What number do you hear?',audio:'sixty',a:'60',o:['16','60','67']},
  {q:'What number do you hear?',audio:'eighteen',a:'18',o:['18','80','81']},
  {q:'What number do you hear?',audio:'eighty',a:'80',o:['18','80','88']},
  {q:'What number do you hear?',audio:'twenty-nine',a:'29',o:['19','29','92']},
  {q:'What number do you hear?',audio:'ninety-seven',a:'97',o:['79','90','97']}
 ],
 functional:[
  {q:'A: Hi. This is Leo.\nB: ___',a:'Nice to meet you, Leo.',o:['Nice to meet you, Leo.','That’s my bus!','I’m from Leo.','What class is Leo?']},
  {q:'A: How are you?\nB: ___',a:'I’m fine, thanks.',o:['I’m fine, thanks.','I’m twenty-two.','I’m from Italy.','I’m in class 2.']},
  {q:'A: ___\nB: I’m from Spain.',a:'Where are you from?',o:['Who are you?','Where are you from?','How old are you?','What class are you in?']},
  {q:'A: ___\nB: I’m in class 3.',a:'What class are you in?',o:['What class are you in?','Where are you from?','What’s your phone number?','How are you?']},
  {q:'A: ___\nB: It’s 07420 618 305.',a:'What’s your phone number?',o:['How old are you?','What’s your phone number?','Who’s that?','Where’s your phone?']},
  {q:'A: This is my bus stop.\nB: ___',a:'Bye. See you tomorrow!',o:['Bye. See you tomorrow!','I’m in class 4.','I’m from England.','He’s twenty.']},
  {q:'A: That’s my bus!\nB: ___',a:'Bye! See you tomorrow.',o:['Bye! See you tomorrow.','What’s your name?','I’m fine, thanks.','This is Alex.']},
  {q:'A: Who’s that?\nB: ___',a:'He’s a friend.',o:['He’s a friend.','He’s twenty-two?','It’s in Mexico.','Fine, thanks.']}
 ],
 reading:{
  text:`<b>Hi, I’m Sara.</b> I’m from Spain. I’m in class 2. This is Ben. He’s from England. He’s twenty-four. Ben is in my class. We are at the bus stop. Ben says, “How are you?” I’m fine, thanks. He says, “What’s your phone number?” It’s 07420 618 305. A bus is here. “That’s my bus!” I say. “See you tomorrow!” Ben says.`,
  audioChunks:[
   'Hi, I’m Sara. I’m from Spain. I’m in class two.',
   'This is Ben. He’s from England. He’s twenty-four.',
   'Ben is in my class. We are at the bus stop.',
   'Ben says, How are you? I’m fine, thanks.',
   'He says, What’s your phone number?',
   'It’s oh seven four two zero. Six one eight. Three oh five.',
   'A bus is here. That’s my bus, I say.',
   'See you tomorrow, Ben says.'
  ],
  qs:[
   {q:'Where is Sara from?',a:'Spain',o:['Spain','England','Mexico']},
   {q:'What class is Sara in?',a:'Class 2',o:['Class 2','Class 3','Class 4']},
   {q:'How old is Ben?',a:'24',o:['22','24','40']},
   {q:'What does Ben ask Sara?',a:'Her phone number',o:['Her phone number','Her email','Her bus number']},
   {q:'What does Sara say when the bus is here?',a:'That’s my bus!',o:['This is Ben.','That’s my bus!','I’m fine, thanks.']}
  ]
 },
 sort:[
  {w:'Who’s that?',a:'PERSON'},
  {w:'Who’s he?',a:'PERSON'},
  {w:'What’s your name?',a:'PERSON'},
  {w:'Where are you from?',a:'PLACE'},
  {w:'Where’s room 4?',a:'PLACE'},
  {w:'Where’s the bus stop?',a:'PLACE'},
  {w:'How old is he?',a:'NUMBER'},
  {w:'How old are you?',a:'NUMBER'},
  {w:'What’s your phone number?',a:'NUMBER'}
 ],
 listening:{
  scripts:[
   {id:1,lines:[
    {voice:'Emma',text:'Hi, I’m Emma. This is Leo. He’s in my class.'},
    {voice:'Mia',text:'Hi, Leo. How are you?'},
    {voice:'Leo',text:'I’m fine, thanks.'},
    {voice:'Mia',text:'Where are you from?'},
    {voice:'Leo',text:'I’m from Mexico.'},
    {voice:'Mia',text:'How old are you?'},
    {voice:'Leo',text:'I’m twenty-two.'}
   ]},
   {id:2,lines:[
    {voice:'Noah',text:'Hi, Eva. What class are you in?'},
    {voice:'Eva',text:'I’m in class three.'},
    {voice:'Noah',text:'What’s your phone number?'},
    {voice:'Eva',text:'It’s 07420 618 305.',chunks:['It’s oh seven four two zero.','Six one eight.','Three oh five.']},
    {voice:'Noah',text:'Thanks.'},
    {voice:'Eva',text:'That’s my bus! Bye. See you tomorrow.'},
    {voice:'Noah',text:'Bye, Eva.'}
   ]}
  ],
  qs:[
   {q:'Who is in Emma’s class?',a:'Leo',o:['Leo','Mia','Eva'],script:1},
   {q:'Where is Leo from?',a:'Mexico',o:['Mexico','Spain','England'],script:1},
   {q:'How old is Leo?',a:'22',o:['20','22','32'],script:1},
   {q:'How is Leo?',a:'Fine',o:['Fine','Late','On holiday'],script:1},
   {q:'What class is Eva in?',a:'Class 3',o:['Class 2','Class 3','Class 13'],script:2},
   {q:'What does Noah ask for?',a:'Eva’s phone number',o:['Eva’s phone number','Eva’s email','Eva’s address'],script:2},
   {q:'What are the first five digits?',a:'07420',o:['07420','04720','07402'],script:2},
   {q:'What does Eva say when her bus comes?',a:'That’s my bus!',o:['This is my bus stop.','That’s my bus!','Where’s my bus?'],script:2}
  ]
 }
};

const MAX={phrases:data.phrases.length,grammar:data.grammar.length,numbers:data.numbers.length,functional:data.functional.length,reading:data.reading.qs.length,sort:data.sort.length,listening:data.listening.qs.length};
const fresh=()=>({screen:0,idx:{phrases:0,grammar:0,numbers:0,functional:0,reading:0,listening:0},answers:{phrases:{},grammar:{},numbers:{},functional:{},reading:{},sort:{},listening:{}},mistakes:{},selectedSort:null,sortOrder:null});
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
function header(){return `<div class="noise"></div><div class="header"><div class="brandHeader"><div class="brandCopy"><div class="brandName">WOW SCHOOL</div><div class="brandMeta">online english school · wow-school.ru</div><div class="brandModule">interactive lesson module · Unit 2B</div></div></div><div class="unitBadge"><span>English File Beginner</span><strong>Unit 2B</strong></div></div>`}
function shell(inner){return `${header()}<section class="shell"><div class="content">${inner}</div></section>`}
function progress(n){return `<div class="progressBox"><strong>Блок ${n}/7</strong><div class="track"><i style="width:${n/7*100}%"></i></div></div>`}
function title(n,t,sub){return `<div class="titlebar"><div class="titlewrap"><h1><span class="n">${n}.</span> ${t}</h1><p>${sub}</p></div>${progress(n)}</div>`}
function miniProgress(sec,idx,total){return `<div class="internalProgress"><div class="miniDots">${Array.from({length:total},(_,i)=>`<i class="miniDot ${i<idx?'done':i===idx?'current':''}"></i>`).join('')}</div><div class="counter">Задание ${Math.min(idx+1,total)} из ${total}</div></div>`}
function feedback(kind,text){return `<div class="feedbackBox ${kind}">${text}</div>`}

let currentAudio=null,playToken=0;
const ttsAudio=document.createElement('audio');ttsAudio.preload='auto';ttsAudio.setAttribute('playsinline','');ttsAudio.setAttribute('webkit-playsinline','');ttsAudio.referrerPolicy='no-referrer';ttsAudio.style.display='none';document.body.appendChild(ttsAudio);
function providerUrls(text){const q=encodeURIComponent(text.replace(/\s+/g,' ').trim());return [`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en-GB&q=${q}`,`https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${q}`,`https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=en-GB&q=${q}`]}
function splitTTS(text,max=120){const clean=text.replace(/\s+/g,' ').trim();if(clean.length<=max)return [clean];const out=[];let rest=clean;while(rest.length){if(rest.length<=max){out.push(rest);break}let cut=-1;for(const mark of ['. ','? ','! ',', ','; ']){const i=rest.lastIndexOf(mark,max);if(i>Math.floor(max*.45)){cut=i+mark.length-1;break}}if(cut<0){cut=rest.lastIndexOf(' ',max);if(cut<Math.floor(max*.45))cut=max}out.push(rest.slice(0,cut).trim());rest=rest.slice(cut).trim()}return out.filter(Boolean)}
function stopAudio(){playToken++;try{ttsAudio.pause();ttsAudio.removeAttribute('src');ttsAudio.load()}catch(e){}currentAudio=null}
function playUrl(url,token){return new Promise((resolve,reject)=>{if(token!==playToken)return reject(new Error('cancelled'));const a=ttsAudio;currentAudio=a;let finished=false;const cleanup=()=>{a.onended=a.onerror=a.onstalled=a.onabort=null;clearTimeout(timer)};const timer=setTimeout(()=>{if(finished)return;finished=true;cleanup();reject(new Error('timeout'))},22000);a.onended=()=>{if(finished)return;finished=true;cleanup();resolve()};a.onerror=()=>{if(finished)return;finished=true;cleanup();reject(new Error('audio error'))};a.onstalled=()=>{};a.onabort=()=>{if(finished)return;finished=true;cleanup();reject(new Error('aborted'))};a.src=url;a.currentTime=0;a.load();const p=a.play();if(p&&typeof p.catch==='function')p.catch(err=>{if(finished)return;finished=true;cleanup();reject(err)})})}
async function playChunk(text,token){let lastErr=null;for(const url of providerUrls(text)){if(token!==playToken)throw new Error('cancelled');try{await playUrl(url,token);return}catch(e){lastErr=e}}throw lastErr||new Error('No audio provider available')}
async function playSequence(texts,btn,idleLabel='▶ Прослушать'){stopAudio();const token=++playToken;btn?.classList.remove('error');btn?.classList.add('busy');if(btn)btn.textContent='■ Стоп';try{for(const raw of texts){for(const text of splitTTS(raw)){if(token!==playToken)return;await playChunk(text,token)}}if(token===playToken){btn?.classList.remove('busy');if(btn)btn.textContent=idleLabel}}catch(e){if(token===playToken){btn?.classList.remove('busy');btn?.classList.add('error');if(btn)btn.textContent='Аудио недоступно';setTimeout(()=>{btn?.classList.remove('error');if(btn)btn.textContent=idleLabel},2200)}}}
function playText(text,btn){return playSequence([text],btn,'▶ Прослушать')}
function playScript(lines,btn){const chunks=lines.flatMap(line=>Array.isArray(line.chunks)?line.chunks:[line.text]);return playSequence(chunks,btn,'▶ Прослушать')}
function audioBtn(id,label='Прослушать'){return `<button class="audioBtn" id="${id}">▶ ${label}</button><span class="audioMeta">British English · короткие аудиофрагменты</span>`}
function sanitizeAudioText(text){return String(text).replace(/_{2,}/g,'').replace(/→/g,'').replace(/\s+,/g,',').replace(/\s{2,}/g,' ').replace(/[“”]/g,'').trim().replace(/[,.]\s*$/,'')}
function recordAttempt(sec,i,isCorrect){let a=state.answers[sec][i];if(!a){a={attempts:0,firstCorrect:null,solved:false};state.answers[sec][i]=a}a.attempts++;if(a.firstCorrect===null)a.firstCorrect=isCorrect;if(isCorrect)a.solved=true;state.mistakes[`${sec}:${i}`]=isCorrect?null:true;save()}

const PHRASE_TAGS={'Who’s that?':'person','How old is he?':'age','He’s very good-looking.':'description','How are you?':'greeting','I’m fine, thanks.':'response','This is Alex.':'introduction','What class are you in?':'class','That’s my bus!':'bus','This is my bus stop.':'bus stop','What’s your phone number?':'phone'};
function renderPhotoCard(src,badge,hint=''){return `<div class="photoPanel"><img class="modulePhoto" src="${src}" alt="${esc(badge)}">${badge?`<div class="visualBadge">${esc(badge)}</div>`:''}${hint?`<div class="photoCaption">${esc(hint)}</div>`:''}</div>`}
function renderPhraseVisual(item){return renderPhotoCard('assets/images/block1-phrases-tram.png',PHRASE_TAGS[item.q]||'Lesson 2B','Friends meet at the stop · personal information')}
function renderGrammarVisual(){return renderPhotoCard('assets/images/block2-grammar-campus.png','Question words','Who · Where · What · How')}
function renderNumberVisual(){return renderPhotoCard('assets/images/block3-numbers-busstop.png','11–100','Listen carefully: teen ≠ ty')}
function renderFunctionalVisual(){return renderPhotoCard('assets/images/block4-functional-cafe.png','Phone & personal info','Name · class · phone number')}
function renderReadingTop(){return renderPhotoCard('assets/images/block5-reading-travelbus.png','Reading scene','A bus is here. “That’s my bus!”')}
function renderListeningVisual(){return renderPhotoCard('assets/images/block7-listening-sunset-train.png','Listening mission','Short audio chunks · listen again')}
function renderHeroVisual(){return `<div class="heroPreviewFrame"><img class="heroPreviewImage" src="preview.png" alt="Unit 2B preview"></div>`}

function commonQuestionScreen(sec,blockNum,heading,sub,visualHTML,item,total,audioText,afterLast){
 const idx=state.idx[sec]||0,done=solved(sec,idx),options=orderedOptions(sec,idx,item.o);
 app.innerHTML=shell(`${title(blockNum,heading,sub)}<div class="blockBody"><div class="visualCard">${visualHTML}</div><div class="questionCard"><div class="kicker">${LABELS[sec]}</div><div class="prompt preserveLines">${esc(item.q)}</div><div class="subprompt">Выбери правильный вариант. Если ошибёшься, можно попробовать ещё раз.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно! Переходим дальше.'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,total)}</div></div></div><div class="footerActions"><div class="leftActions">${audioText?audioBtn('audio','Прослушать'):''}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===total-1?'Следующий блок →':'Следующее задание →'}</button></div>`);
 const fb=document.getElementById('fb');document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');fb.innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');fb.innerHTML=feedback('bad','Пока нет. Попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});if(audioText){document.getElementById('audio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Прослушать'}else playText(audioText,this)}}document.getElementById('next').onclick=()=>{if(idx<total-1){state.idx[sec]=idx+1;save();render()}else afterLast()};
}

function start(){app.innerHTML=shell(`<div class="hero"><div><div class="heroKicker">WOW SCHOOL · English File Beginner · Unit Review</div><h1>That’s my <span>bus!</span></h1><p>7 интерактивных блоков: фразы Lesson 2B, Wh- / How questions with <b>be</b>, numbers 11–100, phone numbers, personal information, reading, question sort и listening.</p><div class="heroBtns"><button class="btn primary" id="start">Начать →</button><button class="btn secondary" id="reset">Сбросить прогресс</button></div></div><div class="heroVisual">${renderHeroVisual()}<div class="tag a">7 блоков</div><div class="tag b">short audio chunks</div></div></div>`);document.getElementById('start').onclick=()=>{state.screen=1;save();render()};document.getElementById('reset').onclick=()=>{state=fresh();save();render()}}
function phrases(){const sec='phrases',idx=state.idx[sec]||0,item=data.phrases[idx];commonQuestionScreen(sec,1,'Words & Phrases','Фраза остаётся на экране — выбери точное значение',renderPhraseVisual(item),item,data.phrases.length,sanitizeAudioText(item.q),()=>{state.screen=2;save();render()})}
function grammar(){const sec='grammar',idx=state.idx[sec]||0,item=data.grammar[idx];commonQuestionScreen(sec,2,'Grammar Check','Wh- / How questions with be · вопросительное слово + be + подлежащее',renderGrammarVisual(),item,data.grammar.length,null,()=>{state.screen=3;save();render()})}
function numbers(){const sec='numbers',idx=state.idx[sec]||0,item=data.numbers[idx];commonQuestionScreen(sec,3,'Number Detective','Слушай числа 11–100 и различай похожие пары',renderNumberVisual(),item,data.numbers.length,item.audio,()=>{state.screen=4;save();render()})}
function functional(){const sec='functional',idx=state.idx[sec]||0,item=data.functional[idx];commonQuestionScreen(sec,4,'Phone & Personal Info','Выбери естественную реплику: знакомство, класс, страна, телефон, автобус',renderFunctionalVisual(),item,data.functional.length,null,()=>{state.screen=5;save();render()})}
function reading(){const sec='reading',idx=state.idx[sec]||0,item=data.reading.qs[idx],done=solved(sec,idx),options=orderedOptions(sec,idx,item.o);app.innerHTML=shell(`${title(5,'Reading at the Bus Stop','Прочитай новый короткий текст и ответь на вопросы')}<div class="blockBody"><div class="visualCard"><div class="readingVisual"><div class="readingArtFrame">${renderReadingTop()}</div><div class="readText">${data.reading.text}</div></div></div><div class="questionCard"><div class="kicker">Reading comprehension</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Ответь только по тексту.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Ответ не выбран')}</div>${miniProgress(sec,idx,data.reading.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('readAudio','Послушать текст')}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.reading.qs.length-1?'Следующий блок →':'Следующее задание →'}</button></div>`);document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Перечитай текст и попробуй ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});document.getElementById('readAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent='▶ Послушать текст'}else playSequence(data.reading.audioChunks,this,'▶ Послушать текст')};document.getElementById('next').onclick=()=>{if(idx<data.reading.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=6;save();render()}}}
function sort(){const bins=[['PERSON','PERSON','Who…? / What’s your name?'],['PLACE','PLACE','Where…?'],['NUMBER','NUMBER','How old…? / phone number']];if(!Array.isArray(state.sortOrder)||state.sortOrder.length!==data.sort.length){state.sortOrder=shuffledIndicesForSort(data.sort);save()}const order=state.sortOrder,allDone=data.sort.every((_,i)=>state.answers.sort[i]?.solved);app.innerHTML=shell(`${title(6,'Question Sort','Распредели вопросы по типу информации, которую они запрашивают')}<div class="sortLayout"><div class="bins">${bins.map(([key,label,hint])=>`<div class="bin" data-bin="${key}"><strong>${label}</strong><small>${hint}</small><div class="binwords">${order.map(i=>{const x=data.sort[i];return state.answers.sort[i]?.solved&&x.a===key?`<button class="wordChip good" disabled>${esc(x.w)}</button>`:''}).join('')}</div></div>`).join('')}</div><div class="wordBank">${order.map(i=>{const x=data.sort[i];return !state.answers.sort[i]?.solved?`<button draggable="true" class="wordChip ${state.selectedSort===i?'selected':''}" data-word="${i}">${esc(x.w)}</button>`:''}).join('')}<span id="sortHint" class="audioMeta">${allDone?'Все вопросы распределены верно':'Выбери вопрос или перетащи его в колонку'}</span></div></div><div class="footerActions"><div class="leftActions"></div><button class="nextBtn" id="next" ${allDone?'':'disabled'}>Следующий блок →</button></div>`);function tryPlace(i,bin){const x=data.sort[i];let a=state.answers.sort[i]||{attempts:0,firstCorrect:null,solved:false};a.attempts++;const ok=x.a===bin;if(a.firstCorrect===null)a.firstCorrect=ok;if(ok){a.solved=true;state.selectedSort=null}state.answers.sort[i]=a;save();if(ok)render();else{const h=document.getElementById('sortHint');h.textContent='Не сюда. Посмотри, какую информацию просит этот вопрос.';h.style.color='#bd4053'}}document.querySelectorAll('[data-word]').forEach(w=>{const i=+w.dataset.word;w.onclick=()=>{state.selectedSort=i;save();render()};w.ondragstart=e=>{e.dataTransfer.setData('text/plain',String(i));e.dataTransfer.effectAllowed='move'}});document.querySelectorAll('[data-bin]').forEach(b=>{b.onclick=()=>{if(state.selectedSort!==null)tryPlace(state.selectedSort,b.dataset.bin)};b.ondragover=e=>{e.preventDefault();b.classList.add('dropTarget')};b.ondragleave=()=>b.classList.remove('dropTarget');b.ondrop=e=>{e.preventDefault();b.classList.remove('dropTarget');const i=+e.dataTransfer.getData('text/plain');if(Number.isInteger(i))tryPlace(i,b.dataset.bin)}});document.getElementById('next').onclick=()=>{state.screen=7;save();render()}}
function listening(){const sec='listening',idx=state.idx[sec]||0,item=data.listening.qs[idx],done=solved(sec,idx),script=data.listening.scripts.find(s=>s.id===item.script),options=orderedOptions(sec,idx,item.o);app.innerHTML=shell(`${title(7,'Listening Mission','Слушай короткие реплики: каждый диалог воспроизводится маленькими фрагментами')}<div class="blockBody"><div class="visualCard">${renderListeningVisual()}</div><div class="questionCard"><div class="kicker">Dialogue ${script.id}</div><div class="prompt">${esc(item.q)}</div><div class="subprompt">Диалог можно прослушать несколько раз.</div><div class="answers">${options.map((o,oi)=>`<button class="answer" data-answer="${oi}" data-value="${esc(o)}" ${done?'disabled':''}>${esc(o)}</button>`).join('')}</div><div class="statusWrap"><div id="fb">${done?feedback('good','Верно!'):feedback('neutral','Сначала прослушай диалог')}</div>${miniProgress(sec,idx,data.listening.qs.length)}</div></div></div><div class="footerActions"><div class="leftActions">${audioBtn('listenAudio',`Диалог ${script.id}`)}</div><button class="nextBtn" id="next" ${done?'':'disabled'}>${idx===data.listening.qs.length-1?'Результат →':'Следующее задание →'}</button></div>`);document.getElementById('listenAudio').onclick=function(){if(this.classList.contains('busy')){stopAudio();this.classList.remove('busy');this.textContent=`▶ Диалог ${script.id}`}else playScript(script.lines,this)};document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(solved(sec,idx))return;const ok=b.dataset.value===item.a;recordAttempt(sec,idx,ok);if(ok){b.classList.add('correct');document.getElementById('fb').innerHTML=feedback('good','Верно!');document.querySelectorAll('[data-answer]').forEach(x=>x.disabled=true);document.getElementById('next').disabled=false}else{b.classList.add('wrongFlash');document.getElementById('fb').innerHTML=feedback('bad','Пока нет. Прослушай ещё раз.');setTimeout(()=>b.classList.remove('wrongFlash'),500)}});document.getElementById('next').onclick=()=>{if(idx<data.listening.qs.length-1){state.idx[sec]=idx+1;save();render()}else{state.screen=8;save();render()}}}
function results(){const keys=SECTIONS,totalMax=keys.reduce((n,k)=>n+MAX[k],0),total=keys.reduce((n,k)=>n+score(k),0),pct=Math.round(total/totalMax*100),sorted=[...keys].sort((a,b)=>score(b)/MAX[b]-score(a)/MAX[a]),best=sorted[0],weak=sorted.at(-1);app.innerHTML=shell(`<div class="titlebar"><div class="titlewrap"><h1>Your <span class="n">Results</span></h1><p>Итоги проверочной работы по Lesson 2B · That’s my bus!</p></div><div class="progressBox"><strong>Готово</strong><div class="track"><i style="width:100%"></i></div></div></div><div class="results"><div class="ring" style="--pct:${pct}"><strong>${pct}%</strong><span>с первого раза</span></div><div><div class="resultList">${keys.map(k=>{const p=Math.round(score(k)/MAX[k]*100);return `<div class="resrow"><label>${LABELS[k]}</label><div class="resbar"><i style="width:${p}%"></i></div><b>${score(k)}/${MAX[k]}</b></div>`}).join('')}</div><div class="coach"><div><strong>Сильнее всего</strong><p>${LABELS[best]} — лучший результат с первой попытки.</p></div><div><strong>Что повторить</strong><p>${LABELS[weak]} — этот блок стоит пройти ещё раз.</p></div></div><div class="heroBtns" style="margin-top:16px"><button class="btn primary" id="retry">Пройти ещё раз</button><button class="btn secondary" id="home">На главную</button></div></div></div>`);document.getElementById('retry').onclick=()=>{state=fresh();state.screen=1;save();render()};document.getElementById('home').onclick=()=>{state.screen=0;save();render()}}
function render(){stopAudio();({0:start,1:phrases,2:grammar,3:numbers,4:functional,5:reading,6:sort,7:listening,8:results}[state.screen]||start)()}
render();
