(() => {
  const D = window.UNIT_DATA;
  const app = document.querySelector('#app');
  const TOTAL_SCREENS = 8; // intro + 6 blocks + results

  const freshState = () => ({
    screen: 0,
    checked: {},
    answers: {},
    scores: {
      phrases: [0, D.phrases.length],
      grammar: [0, D.grammar.length],
      numbers: [0, D.numbers.audioRounds.length + D.numbers.sequences.length],
      days: [0, D.days.correctOrder.length + D.days.quick.length],
      pronunciation: [0, D.pronunciation.bins.reduce((n,b)=>n+b.words.length,0)],
      listening: [0, D.listening.questions.length]
    }
  });
  let state;
  try { state = JSON.parse(localStorage.getItem(D.storageKey)) || freshState(); }
  catch { state = freshState(); }
  state.scores = {...freshState().scores, ...(state.scores || {})};
  state.answers = state.answers || {};
  state.checked = state.checked || {};
  const save = () => localStorage.setItem(D.storageKey, JSON.stringify(state));

  const esc = (s) => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const shuffle = (arr, seed=17) => {
    const a=[...arr]; let x=seed;
    for(let i=a.length-1;i>0;i--){x=(x*9301+49297)%233280; const j=Math.floor((x/233280)*(i+1)); [a[i],a[j]]=[a[j],a[i]]}
    return a;
  };

  // ---------- British audio engine: local MP3 first, high-quality en-GB speech voice fallback ----------
  let speechVoice = null;
  let speechVoiceB = null;
  let currentAudio = null;
  let speakingBtn = null;
  const voicePriority = [
    /Microsoft Sonia.*English.*United Kingdom/i,
    /Microsoft Ryan.*English.*United Kingdom/i,
    /Google UK English Female/i,
    /Google UK English Male/i,
    /^Serena$/i, /^Daniel$/i, /^Kate$/i, /^Oliver$/i
  ];
  function chooseVoices(){
    if(!('speechSynthesis' in window)) return;
    const voices = speechSynthesis.getVoices();
    const gb = voices.filter(v => /^en[-_]GB/i.test(v.lang) || /United Kingdom|British|UK English/i.test(v.name));
    const ranked = [...gb].sort((a,b)=>{
      const rank = v => {const i=voicePriority.findIndex(r=>r.test(v.name)); return i<0?999:i};
      return rank(a)-rank(b);
    });
    speechVoice = ranked[0] || voices.find(v=>/^en[-_]GB/i.test(v.lang)) || voices.find(v=>/^en/i.test(v.lang)) || null;
    speechVoiceB = ranked[1] || speechVoice;
    document.querySelectorAll('[data-voice-name]').forEach(el => el.textContent = speechVoice ? `British voice · ${speechVoice.name}` : 'British English audio');
  }
  if('speechSynthesis' in window){ speechSynthesis.onvoiceschanged = chooseVoices; setTimeout(chooseVoices,80); }
  function stopAudio(){
    if(currentAudio){ currentAudio.pause(); currentAudio=null; }
    if('speechSynthesis' in window) speechSynthesis.cancel();
    if(speakingBtn){ speakingBtn.classList.remove('speaking'); speakingBtn=null; }
  }
  function speak(text, btn=null, voiceIndex=0, opts={}){
    stopAudio();
    if(!('speechSynthesis' in window)){ toast('Аудио недоступно в этом браузере'); return; }
    chooseVoices();
    const u = new SpeechSynthesisUtterance(text);
    u.lang='en-GB'; u.voice=voiceIndex ? (speechVoiceB||speechVoice) : speechVoice;
    u.rate=opts.rate ?? .88; u.pitch=opts.pitch ?? 1.0; u.volume=1;
    if(btn){ btn.classList.add('speaking'); speakingBtn=btn; }
    u.onend=u.onerror=()=>{ if(btn)btn.classList.remove('speaking'); if(speakingBtn===btn)speakingBtn=null; };
    speechSynthesis.speak(u);
  }
  async function playAssetOrSpeak(src, text, btn=null, voiceIndex=0){
    stopAudio();
    if(src){
      const a=new Audio(src); currentAudio=a; if(btn){btn.classList.add('speaking');speakingBtn=btn}
      a.onended=()=>{btn?.classList.remove('speaking');currentAudio=null;speakingBtn=null};
      a.onerror=()=>speak(text,btn,voiceIndex);
      try{ await a.play(); return; }catch{}
    }
    speak(text,btn,voiceIndex);
  }
  function playDialogueAssetOrSpeech(src, lines, btn){
    stopAudio();
    if(src){
      const a=new Audio(src); currentAudio=a; if(btn){btn.classList.add('speaking');speakingBtn=btn}
      let fellBack=false;
      a.onended=()=>{btn?.classList.remove('speaking');currentAudio=null;speakingBtn=null};
      a.onerror=()=>{if(fellBack)return;fellBack=true;currentAudio=null;btn?.classList.remove('speaking');speakDialogue(lines,btn)};
      a.play().catch(()=>{if(!fellBack){fellBack=true;currentAudio=null;btn?.classList.remove('speaking');speakDialogue(lines,btn)}});
      return;
    }
    speakDialogue(lines,btn);
  }

  function speakDialogue(lines, btn){
    stopAudio();
    if(!('speechSynthesis' in window)){ toast('Аудио недоступно в этом браузере'); return; }
    chooseVoices();
    if(btn){btn.classList.add('speaking');speakingBtn=btn}
    let i=0;
    const next=()=>{
      if(i>=lines.length){btn?.classList.remove('speaking');speakingBtn=null;return}
      const line=lines[i++]; const u=new SpeechSynthesisUtterance(line.text);
      u.lang='en-GB'; u.voice=line.speaker==='B'?(speechVoiceB||speechVoice):speechVoice;
      u.rate=.84; u.pitch=line.speaker==='B'?1.05:.98; u.volume=1;
      u.onend=()=>setTimeout(next,220); u.onerror=()=>setTimeout(next,120);
      speechSynthesis.speak(u);
    };
    next();
  }

  // ---------- shell ----------
  const topbar = (step) => `
    <div class="topbar">
      <div class="brand">WOW <span class="smile">⌣</span> SCHOOL <span>More English<br>Brighter Futures</span></div>
      <div class="progress-shell"><i style="width:${Math.max(0,Math.min(100,(step/7)*100))}%"></i></div>
      <div class="counter">${step===0?'START':step===7?'RESULT':`${step}/6`}</div>
    </div>`;
  const unitPill = () => `<div class="unit-pill">Unit<b>${D.id}</b></div>`;
  const nav = (step,{check=true,next=true,back=true,checkLabel='ПРОВЕРИТЬ'}={}) => `
    <div class="navbar">
      <div class="feedback" id="feedback-${step}"></div>
      <div class="nav-actions">
        ${back?`<button class="btn ghost" data-prev>← НАЗАД</button>`:''}
        ${check?`<button class="btn primary" data-check="${step}">${checkLabel}</button>`:''}
        ${next?`<button class="btn violet" data-next>ДАЛЕЕ →</button>`:''}
      </div>
    </div>`;
  const head = (kicker,title,subtitle) => `<div class="panel-head"><div><div class="eyebrow">${esc(kicker)}</div><h1 class="title">${title}</h1><p class="subtitle">${subtitle}</p></div>${unitPill()}</div>`;

  const screens = [];
  screens.push(`
    <section class="screen" data-screen="0">${topbar(0)}
      <div class="panel"><i class="spark s1"></i><i class="spark s2"></i><i class="spark s3"></i>
        <div class="content" style="height:100%;padding-top:24px">
          <div class="hero-grid">
            <div class="hero-copy">
              <div class="eyebrow">INTERACTIVE UNIT REVIEW · BEGINNER</div>
              <h1 class="title"><span class="accent">English File</span><br>${D.id} · ${D.title}</h1>
              <div class="hero-ribbon">Самопроверка по материалу только Lesson ${D.id}</div>
              <div class="skills">${D.blocks.map((b,i)=>`<div class="skill-tile ${b.accent}"><b>${i+1}</b><span>${esc(b.short)}</span><small>${esc(b.label)}</small></div>`).join('')}</div>
              <div class="start-row"><button class="start-btn" id="start">НАЧАТЬ →</button><div class="mini-progress"><div class="label"><span>Ваш прогресс</span><span>0%</span></div><div class="track"><i style="width:0"></i></div></div></div>
            </div>
            <div class="hero-art">
              <div class="note">Small steps.<br>Big progress. ♡</div>
              <div class="postcard"><img src="assets/images/london-card.svg" alt="London illustration"><p>Real English · real confidence</p></div>
              <img class="cup" src="assets/images/cappuccino.svg" alt="Cappuccino">
              <img class="headphones" src="assets/images/headphones.svg" alt="Headphones">
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </section>`);

  // phrases
  const phraseTranslations = shuffle(D.phrases.map(x=>x[1]),31);
  screens.push(`
    <section class="screen" data-screen="1">${topbar(1)}
      <div class="panel">${head('BLOCK 1 · WORDS & PHRASES','Vocabulary <span class="accent">Match</span>','Соедини фразу из Lesson 1A с переводом')}
        <div class="content"><div class="match-layout">
          <div class="match-col" id="phrase-left">${D.phrases.map((p,i)=>`<button class="match-item" data-side="left" data-key="${i}" style="--dot:${['#318fff','#8755ef','#10c3bd','#ffa61f','#fa587a'][i%5]}"><span class="match-dot"></span>${esc(p[0])}</button>`).join('')}</div>
          <div class="match-col" id="phrase-right">${phraseTranslations.map((t,i)=>`<button class="match-item" data-side="right" data-text="${esc(t)}" style="--dot:${['#fa587a','#10c3bd','#318fff','#8755ef','#ffa61f'][i%5]}"><span class="match-dot"></span>${esc(t)}</button>`).join('')}</div>
          <div class="visual-stack"><div class="polaroid"><img src="assets/images/cappuccino.svg" alt="Cappuccino"><span>A cappuccino, please.</span></div><div class="polaroid"><img src="assets/images/hello.svg" alt="Greeting"><span>Nice to meet you.</span></div></div>
        </div></div>
      </div>${nav(1)}
    </section>`);

  // grammar
  screens.push(`
    <section class="screen" data-screen="2">${topbar(2)}
      <div class="panel">${head('BLOCK 2 · VERB BE','Grammar <span class="accent">Check</span>','Только I / you: am, are, contractions, questions & short answers')}
        <div class="content"><div class="grammar-grid" id="grammar-grid">${D.grammar.map((q,i)=>`<div class="question card"><div class="qtext"><span class="qnum">${i+1}</span>${q.html}</div><div class="options">${q.options.map(o=>`<button class="option" data-gq="${i}" data-val="${esc(o)}">${esc(o)}</button>`).join('')}</div></div>`).join('')}</div><div class="grammar-note">💡 <b>Remember:</b> I am → I’m · You are → You’re · I am not → I’m not · You are not → You aren’t.</div></div>
      </div>${nav(2)}
    </section>`);

  // numbers
  screens.push(`
    <section class="screen" data-screen="3">${topbar(3)}
      <div class="panel">${head('BLOCK 3 · NUMBERS 0–10','Number <span class="accent">Challenge</span>','Слушай, распознавай и продолжай последовательности')}
        <div class="content"><div class="numbers-wrap">
          <div><div class="audio-box card"><div class="audio-heading"><h3>🎧 Какое число ты слышишь?</h3><div class="round-dots" id="num-dots"></div></div><div class="listen-row"><button class="play-orb" id="num-play" aria-label="Play number">▶</button><div><input class="big-input" id="num-input" inputmode="numeric" placeholder="Введите 0–10"><div class="num-feedback" id="num-feedback"></div><button class="btn primary small" id="num-submit" style="margin-top:7px">ПРОВЕРИТЬ РАУНД</button></div></div></div><div class="seq-grid" id="seq-grid">${D.numbers.sequences.map((s,i)=>`<div class="seq card">${s.prompt.map(v=>v===null?`<input data-seq="${i}" inputmode="numeric" aria-label="missing number">`:`<span>${v}</span>`).join('<span>→</span>')}</div>`).join('')}</div></div>
          <div class="number-art card"><img src="assets/images/number-cups.svg" alt="Cups and numbers"><div class="number-cloud">${D.numbers.words.map((w,i)=>`<div class="number-chip"><b>${i}</b>${w}</div>`).join('')}</div></div>
        </div></div>
      </div>${nav(3,{check:true,checkLabel:'ПРОВЕРИТЬ БЛОК'})}
    </section>`);

  // days
  screens.push(`
    <section class="screen" data-screen="4">${topbar(4)}
      <div class="panel">${head('BLOCK 4 · DAYS & GOODBYE','Days <span class="accent">& Goodbye</span>','Поставь дни по порядку и заверши знакомые фразы')}
        <div class="content"><div class="days-layout"><div><div class="days-board card" id="days-board"></div><div class="goodbye-art"><img src="assets/images/calendar.svg" alt="Calendar"><div><strong>Goodbye! See you on Friday.</strong><small>Дни недели начинаются с заглавной буквы.</small></div><button class="tiny-speaker" id="days-audio" title="Listen">🔊</button></div></div><div class="quick-grid card" id="days-quick">${D.days.quick.map((q,i)=>`<div class="quick-row"><div class="qtext">${i+1}. ${esc(q.q)}</div><div class="options">${q.options.map(o=>`<button class="option" data-dq="${i}" data-val="${esc(o)}">${esc(o)}</button>`).join('')}</div></div>`).join('')}</div></div></div>
      </div>${nav(4)}
    </section>`);

  // pronunciation
  const allSoundWords = shuffle(D.pronunciation.bins.flatMap(b=>b.words),83);
  screens.push(`
    <section class="screen" data-screen="5">${topbar(5)}
      <div class="panel">${head('BLOCK 5 · PRONUNCIATION','Sound <span class="accent">Sort</span>','Слушай слово и перетаскивай в правильную группу')}
        <div class="content"><div class="sound-layout"><div class="sound-bins" id="sound-bins">${D.pronunciation.bins.map(b=>`<div class="sound-bin" data-bin="${b.key}"><div class="sound-head"><div><div class="sound-symbol">${b.symbol}</div><div class="sound-guide">example: ${b.guide}</div></div><button class="tiny-speaker" data-say="${b.guide}">🔊</button></div><div class="dropzone" data-drop="${b.key}"></div></div>`).join('')}</div><div class="word-bank" id="word-bank">${allSoundWords.map(w=>`<div class="sound-token" draggable="true" data-word="${esc(w)}"><button class="tiny-speaker" data-say="${esc(w)}">🔊</button>${esc(w)}</div>`).join('')}</div></div></div>
      </div>${nav(5)}
    </section>`);

  // listening
  screens.push(`
    <section class="screen" data-screen="6">${topbar(6)}
      <div class="panel">${head('BLOCK 6 · LISTENING','Mini Listening <span class="accent">Mission</span>','Новая мини-сцена, составленная только из языка Lesson 1A')}
        <div class="content"><div class="listening-layout"><div class="listen-card card"><img src="assets/images/headphones.svg" alt="Headphones"><h3>Listen</h3><div class="voice-badge" data-voice-name>British English audio</div><button class="play-orb" id="mission-play">▶</button><p>Можно прослушать несколько раз. Сначала слушай целиком, затем отвечай на вопросы.</p></div><div class="listen-questions" id="listen-questions">${D.listening.questions.map((q,i)=>`<div class="listen-q card"><div class="qtext"><span class="qnum">${i+1}</span>${esc(q.q)}</div><div class="options">${q.options.map(o=>`<button class="option" data-lq="${i}" data-val="${esc(o)}">${esc(o)}</button>`).join('')}</div></div>`).join('')}</div></div></div>
      </div>${nav(6)}
    </section>`);

  // results
  screens.push(`
    <section class="screen" data-screen="7">${topbar(7)}
      <div class="panel">${head('UNIT 1A COMPLETE','Your <span class="accent">Results</span>','Итоги по каждому навыку и рекомендации для повторения')}
        <div class="content"><div class="result-wrap"><div class="score-card"><div class="score-ring" id="score-ring"><div><div class="trophy">🏆</div><b id="score-percent">0%</b><span>общий результат</span></div></div><button class="btn gold" id="result-label" style="margin-top:14px">Готово!</button></div><div><div class="result-detail" id="result-detail"></div><div class="insights"><div class="insight good card"><h4>✅ Что получилось хорошо</h4><div id="good-list"></div></div><div class="insight work card"><h4>💡 Над чем поработать</h4><div id="work-list"></div></div></div></div></div></div>
      </div><div class="navbar"><div class="feedback">Результат сохранён в этом браузере.</div><div class="nav-actions"><button class="btn ghost" id="review">ПОСМОТРЕТЬ ОШИБКИ</button><button class="btn primary" id="restart">ПРОЙТИ ЕЩЁ РАЗ</button></div></div>
    </section>`);

  app.innerHTML = `<div class="stage">${screens.join('')}<div class="toast" id="toast"></div></div>`;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  function toast(msg){ const t=$('#toast'); if(!t)return; t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700); }
  function feedback(step,msg,ok=true){const el=$(`#feedback-${step}`);if(!el)return;el.textContent=msg;el.className=`feedback ${ok?'ok':'bad'}`}
  function setScore(key,c,t){state.scores[key]=[c,t];save()}
  function show(i){stopAudio();state.screen=Math.max(0,Math.min(7,i));save();$$('.screen').forEach((s,j)=>s.classList.toggle('active',j===state.screen));if(state.screen===7)renderResults();window.scrollTo({top:0,behavior:'smooth'})}

  // ----- Intro -----
  $('#start').onclick=()=>show(1);

  // ----- Phrase matching -----
  let phraseLeft=null;
  state.answers.phraseMatches = state.answers.phraseMatches || {};
  const refreshPhraseUI=()=>{
    $$('[data-side="left"]').forEach(el=>{const i=el.dataset.key;el.classList.toggle('matched',!!state.answers.phraseMatches[i]);el.disabled=!!state.answers.phraseMatches[i]});
    $$('[data-side="right"]').forEach(el=>{const used=Object.values(state.answers.phraseMatches).includes(el.dataset.text);el.classList.toggle('matched',used);el.disabled=used});
  };
  $$('[data-side="left"]').forEach(el=>el.onclick=()=>{if(el.disabled)return;$$('[data-side="left"]').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');phraseLeft=Number(el.dataset.key);speak(D.phrases[phraseLeft][0],null,0,{rate:.86})});
  $$('[data-side="right"]').forEach(el=>el.onclick=()=>{
    if(phraseLeft===null){toast('Сначала выберите английскую фразу');return}
    const expected=D.phrases[phraseLeft][1], got=el.dataset.text;
    if(got===expected){state.answers.phraseMatches[phraseLeft]=got;save();refreshPhraseUI();phraseLeft=null;$$('[data-side="left"]').forEach(x=>x.classList.remove('selected'));}
    else{el.classList.add('wrong');setTimeout(()=>el.classList.remove('wrong'),420)}
  });
  refreshPhraseUI();

  // ----- Grammar -----
  $$('[data-gq]').forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.gq);$$(`[data-gq="${i}"]`).forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');state.answers[`g${i}`]=btn.dataset.val;save()});

  // ----- Numbers -----
  let numRound=Number(state.answers.numRound||0), numCorrect=Number(state.answers.numCorrect||0);
  const renderNumRound=()=>{
    const dots=$('#num-dots'); if(!dots)return;
    dots.innerHTML=D.numbers.audioRounds.map((_,i)=>`<i class="${i<numRound?'done':''} ${i===numRound?'current':''}"></i>`).join('');
    if(state.answers.numDone){$('#num-feedback').textContent=`Аудирование чисел: ${numCorrect}/${D.numbers.audioRounds.length}`;$('#num-play').disabled=true;$('#num-submit').disabled=true}
  };
  $('#num-play').onclick=()=>{if(state.answers.numDone)return; const n=D.numbers.audioRounds[numRound];playAssetOrSpeak(D.audio?.numbers?.[n],D.numbers.words[n],$('#num-play'),0)};
  $('#num-submit').onclick=()=>{
    if(state.answers.numDone)return;
    const input=$('#num-input'), val=input.value.trim(); if(val===''){toast('Введите число');return}
    const answer=String(D.numbers.audioRounds[numRound]); const ok=val===answer;
    if(ok)numCorrect++;
    $('#num-feedback').textContent=ok?'Верно! ✓':`Правильный ответ: ${answer}`;$('#num-feedback').style.color=ok?'#088356':'#c3475c';
    numRound++;state.answers.numRound=numRound;state.answers.numCorrect=numCorrect;input.value='';
    if(numRound>=D.numbers.audioRounds.length){state.answers.numDone=true;toast(`Аудирование чисел: ${numCorrect}/${D.numbers.audioRounds.length}`)}
    save();renderNumRound();
  };
  $$('[data-seq]').forEach(inp=>{const i=inp.dataset.seq;inp.value=state.answers[`seq${i}`]??'';inp.oninput=()=>{state.answers[`seq${i}`]=inp.value.trim();save()}});
  renderNumRound();

  // ----- Days -----
  let days = Array.isArray(state.answers.daysOrder)&&state.answers.daysOrder.length===7 ? state.answers.daysOrder : [...D.days.startOrder];
  let dragDay=null;
  function renderDays(){
    $('#days-board').innerHTML=days.map(d=>`<div class="day-card" draggable="true" data-day="${d}"><span>${d}</span></div>`).join('');
    $$('[data-day]').forEach(el=>{
      el.ondragstart=()=>{dragDay=el.dataset.day;};el.ondragover=e=>e.preventDefault();el.ondrop=e=>{e.preventDefault();const target=el.dataset.day;if(!dragDay||dragDay===target)return;const a=days.indexOf(dragDay),b=days.indexOf(target);days.splice(b,0,days.splice(a,1)[0]);state.answers.daysOrder=days;save();renderDays()};
      el.onclick=()=>{if(!state.answers.dayPick){state.answers.dayPick=el.dataset.day;el.style.outline='4px solid #7f5bea'}else{const first=state.answers.dayPick;if(first===el.dataset.day){delete state.answers.dayPick;renderDays();return}const a=days.indexOf(first),b=days.indexOf(el.dataset.day);[days[a],days[b]]=[days[b],days[a]];delete state.answers.dayPick;state.answers.daysOrder=days;save();renderDays()}}
    });
  }
  renderDays();
  $$('[data-dq]').forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.dq);$$(`[data-dq="${i}"]`).forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');state.answers[`dq${i}`]=btn.dataset.val;save()});
  $('#days-audio').onclick=()=>playAssetOrSpeak(D.audio?.goodbye,'Goodbye, Tom. See you on Friday.',$('#days-audio'),0);

  // ----- Sound sort -----
  state.answers.soundPlaced=state.answers.soundPlaced||{};
  const soundAnswerMap={}; D.pronunciation.bins.forEach(b=>b.words.forEach(w=>soundAnswerMap[w]=b.key));
  function makeToken(w){return `<div class="sound-token" draggable="true" data-word="${esc(w)}"><button class="tiny-speaker" data-say="${esc(w)}">🔊</button>${esc(w)}</div>`}
  function renderSounds(){
    D.pronunciation.bins.forEach(b=>{const zone=$(`[data-drop="${b.key}"]`);zone.innerHTML=Object.entries(state.answers.soundPlaced).filter(([,bin])=>bin===b.key).map(([w])=>makeToken(w)).join('')});
    $('#word-bank').innerHTML=allSoundWords.filter(w=>!state.answers.soundPlaced[w]).map(makeToken).join('');
    bindSoundEvents();
  }
  function bindSoundEvents(){
    $$('.sound-token').forEach(el=>{el.ondragstart=e=>e.dataTransfer.setData('text/plain',el.dataset.word);});
    $$('.sound-token').forEach(el=>{el.onclick=e=>{if(e.target.closest('[data-say]'))return;state.answers.soundPick=el.dataset.word;save();$$('.sound-token').forEach(x=>x.classList.toggle('selected',x.dataset.word===state.answers.soundPick))}});
    $$('[data-drop]').forEach(zone=>{
      zone.ondragover=e=>e.preventDefault();
      zone.ondrop=e=>{e.preventDefault();const w=e.dataTransfer.getData('text/plain');if(!w)return;state.answers.soundPlaced[w]=zone.dataset.drop;delete state.answers.soundPick;save();renderSounds()};
      zone.onclick=e=>{if(e.target.closest('.sound-token')||e.target.closest('button'))return;const w=state.answers.soundPick;if(!w){toast('Сначала выберите слово');return}state.answers.soundPlaced[w]=zone.dataset.drop;delete state.answers.soundPick;save();renderSounds()};
    });
    $$('[data-say]').forEach(b=>b.onclick=e=>{e.stopPropagation();playAssetOrSpeak(D.audio?.words?.[b.dataset.say],b.dataset.say,b,0)});
    if(state.answers.soundPick)$$('.sound-token').forEach(x=>x.classList.toggle('selected',x.dataset.word===state.answers.soundPick));
  }
  renderSounds();

  // ----- Listening -----
  $('#mission-play').onclick=()=>playDialogueAssetOrSpeech(D.audio?.dialogue,D.listening.lines,$('#mission-play'));
  $$('[data-lq]').forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.lq);$$(`[data-lq="${i}"]`).forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');state.answers[`lq${i}`]=btn.dataset.val;save()});

  // ----- Checkers -----
  function checkPhrases(){
    const c=Object.keys(state.answers.phraseMatches||{}).filter(i=>state.answers.phraseMatches[i]===D.phrases[i][1]).length;
    setScore('phrases',c,D.phrases.length);state.checked[1]=true;feedback(1,`${c}/${D.phrases.length} — ${c===D.phrases.length?'Все пары найдены!':'Соедините оставшиеся пары.'}`,c===D.phrases.length);save();
  }
  function checkGrammar(){let c=0;D.grammar.forEach((q,i)=>{$$(`[data-gq="${i}"]`).forEach(b=>{b.classList.remove('correct','wrong');if(b.dataset.val===q.answer)b.classList.add('correct');if(b.classList.contains('selected')&&b.dataset.val!==q.answer)b.classList.add('wrong')});if(state.answers[`g${i}`]===q.answer)c++});setScore('grammar',c,D.grammar.length);state.checked[2]=true;feedback(2,`${c}/${D.grammar.length} — ${c===D.grammar.length?'Отлично!':'Проверьте отмеченные ответы.'}`,c===D.grammar.length);save()}
  function checkNumbers(){let seqC=0;D.numbers.sequences.forEach((s,i)=>{const el=$(`[data-seq="${i}"]`);const ok=String(state.answers[`seq${i}`]??'')===String(s.answer);if(ok)seqC++;el.style.borderColor=ok?'#23c983':'#ff788f';el.style.background=ok?'#effff6':'#fff1f3'});const audioC=Number(state.answers.numCorrect||0);const total=D.numbers.audioRounds.length+D.numbers.sequences.length;setScore('numbers',audioC+seqC,total);state.checked[3]=true;feedback(3,`${audioC+seqC}/${total} — аудио ${audioC}/${D.numbers.audioRounds.length}, последовательности ${seqC}/${D.numbers.sequences.length}`,audioC+seqC===total);save()}
  function checkDays(){let orderC=days.filter((d,i)=>d===D.days.correctOrder[i]).length;$$('[data-day]').forEach((el,i)=>{el.classList.remove('correct','wrong');el.classList.add(days[i]===D.days.correctOrder[i]?'correct':'wrong')});let quickC=0;D.days.quick.forEach((q,i)=>{$$(`[data-dq="${i}"]`).forEach(b=>{b.classList.remove('correct','wrong');if(b.dataset.val===q.answer)b.classList.add('correct');if(b.classList.contains('selected')&&b.dataset.val!==q.answer)b.classList.add('wrong')});if(state.answers[`dq${i}`]===q.answer)quickC++});const total=D.days.correctOrder.length+D.days.quick.length;setScore('days',orderC+quickC,total);state.checked[4]=true;feedback(4,`${orderC+quickC}/${total} — порядок ${orderC}/7, фразы ${quickC}/${D.days.quick.length}`,orderC+quickC===total);save()}
  function checkSounds(){let c=0;Object.entries(soundAnswerMap).forEach(([w,bin])=>{if(state.answers.soundPlaced[w]===bin)c++});setScore('pronunciation',c,Object.keys(soundAnswerMap).length);state.checked[5]=true;feedback(5,`${c}/${Object.keys(soundAnswerMap).length} — ${c===12?'Все три звука распознаны!':'Прослушайте слова ещё раз.'}`,c===12);save();renderSounds();setTimeout(()=>{$$('.sound-token').forEach(el=>{const w=el.dataset.word;el.classList.add(state.answers.soundPlaced[w]===soundAnswerMap[w]?'correct':'wrong')})},0)}
  function checkListening(){let c=0;D.listening.questions.forEach((q,i)=>{$$(`[data-lq="${i}"]`).forEach(b=>{b.classList.remove('correct','wrong');if(b.dataset.val===q.answer)b.classList.add('correct');if(b.classList.contains('selected')&&b.dataset.val!==q.answer)b.classList.add('wrong')});if(state.answers[`lq${i}`]===q.answer)c++});setScore('listening',c,D.listening.questions.length);state.checked[6]=true;feedback(6,`${c}/${D.listening.questions.length} — ${c>=7?'Слышите детали очень хорошо!':'Прослушайте сцену ещё раз и проверьте детали.'}`,c===D.listening.questions.length);save()}
  const checkers={1:checkPhrases,2:checkGrammar,3:checkNumbers,4:checkDays,5:checkSounds,6:checkListening};
  $$('[data-check]').forEach(b=>b.onclick=()=>checkers[Number(b.dataset.check)]?.());
  $$('[data-next]').forEach(b=>b.onclick=()=>show(state.screen+1));
  $$('[data-prev]').forEach(b=>b.onclick=()=>show(state.screen-1));

  // ----- Results -----
  function totals(){let c=0,t=0;D.blocks.forEach(b=>{const [x,y]=state.scores[b.key]||[0,0];c+=x;t+=y});return[c,t]}
  function renderResults(){
    const [c,t]=totals(), pct=t?Math.round(c/t*100):0;
    $('#score-ring').style.setProperty('--score',`${pct*3.6}deg`);$('#score-percent').textContent=`${pct}%`;
    $('#result-label').textContent=pct>=90?'ВЕЛИКОЛЕПНО!':pct>=75?'ОЧЕНЬ ХОРОШО!':pct>=55?'ХОРОШАЯ РАБОТА!':'ПОВТОРИМ ЕЩЁ РАЗ';
    $('#result-detail').innerHTML=D.blocks.map(b=>{const [x,y]=state.scores[b.key]||[0,0],p=y?Math.round(x/y*100):0;return `<div class="result-row card"><div class="result-name"><span class="result-icon">${b.icon}</span>${esc(b.label)}</div><div class="bar"><i style="width:${p}%"></i></div><div class="score-text">${x}/${y}</div></div>`}).join('');
    const strong=[],work=[];D.blocks.forEach(b=>{const [x,y]=state.scores[b.key]||[0,0],p=y?x/y:0;(p>=.8?strong:work).push(`${b.label}: ${Math.round(p*100)}%`)});
    $('#good-list').innerHTML=(strong.length?strong:['Пока нет раздела выше 80% — повторите ошибки.']).map(x=>`<p>✓ ${esc(x)}</p>`).join('');
    $('#work-list').innerHTML=(work.length?work:['Все разделы закреплены на 80% и выше.']).map(x=>`<p>• ${esc(x)}</p>`).join('');
  }
  $('#restart').onclick=()=>{localStorage.removeItem(D.storageKey);location.reload()};
  $('#review').onclick=()=>{const bad=D.blocks.findIndex(b=>{const [x,y]=state.scores[b.key]||[0,0];return !y||x/y<.8});show(bad>=0?bad+1:1);toast('Открыт раздел для повторения')};

  // restore selected answers visuals
  D.grammar.forEach((_,i)=>{const v=state.answers[`g${i}`];if(v)$$(`[data-gq="${i}"]`).find(b=>b.dataset.val===v)?.classList.add('selected')});
  D.days.quick.forEach((_,i)=>{const v=state.answers[`dq${i}`];if(v)$$(`[data-dq="${i}"]`).find(b=>b.dataset.val===v)?.classList.add('selected')});
  D.listening.questions.forEach((_,i)=>{const v=state.answers[`lq${i}`];if(v)$$(`[data-lq="${i}"]`).find(b=>b.dataset.val===v)?.classList.add('selected')});
  show(state.screen||0); chooseVoices();
})();
