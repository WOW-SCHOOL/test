
const AUDIO = {
  phrases_1: "assets/audio/phrases_1.mp3",
  numbers_1: "assets/audio/numbers_1.mp3",
  days_1: "assets/audio/days_1.mp3",
  listening_1: "assets/audio/listening_1.mp3",
  listening_2: "assets/audio/listening_2.mp3",
  pronunciation_1: "assets/audio/pronunciation_1.mp3"
};

const state = {
  screen: 0,
  scores: {
    phrases: 0,
    grammar: 0,
    numbers: 0,
    days: 0,
    pronunciation: 0,
    listening: 0
  },
  max: {
    phrases: 8,
    grammar: 10,
    numbers: 8,
    days: 8,
    pronunciation: 8,
    listening: 8
  }
};

const screens = [
  "start",
  "phrases",
  "grammar",
  "numbers",
  "days",
  "pronunciation",
  "listening",
  "results"
];

const data = {
  phrases: [
    ["Hi","Привет"],
    ["Hello","Здравствуйте / Привет"],
    ["What’s your name?","Как тебя / вас зовут?"],
    ["Nice to meet you","Приятно познакомиться"],
    ["A cappuccino, please","Капучино, пожалуйста"],
    ["A tea, please","Чай, пожалуйста"],
    ["Thanks","Спасибо"],
    ["Sorry","Извините / Простите"]
  ],
  grammar: [
    {q:"I ___ Helen", opts:["am","are"], a:"am"},
    {q:"You ___ Tom", opts:["am","are"], a:"are"},
    {q:"I ___ not Ellen", opts:["am","are"], a:"am"},
    {q:"You ___ not Dom", opts:["am","are"], a:"are"},
    {q:"___ I in class 2?", opts:["Am","Are"], a:"Am"},
    {q:"___ you Mike?", opts:["Am","Are"], a:"Are"},
    {q:"Are you Helen?", opts:["Yes, I am","Yes, you are"], a:"Yes, I am"},
    {q:"Am I in your class?", opts:["Yes, you are","Yes, I am"], a:"Yes, you are"},
    {q:"Are you Diana?", opts:["No, I’m not","No, you aren’t"], a:"No, I’m not"},
    {q:"Am I in room 8?", opts:["No, you aren’t","No, I’m not"], a:"No, you aren’t"}
  ],
  numbers: [
    {q:"zero", opts:["0","2","10"], a:"0"},
    {q:"three", opts:["3","7","9"], a:"3"},
    {q:"five", opts:["4","5","6"], a:"5"},
    {q:"seven", opts:["1","7","8"], a:"7"},
    {q:"nine", opts:["6","8","9"], a:"9"},
    {q:"one, two, ___", opts:["three","five","ten"], a:"three"},
    {q:"seven, eight, ___", opts:["nine","six","zero"], a:"nine"},
    {q:"eight, nine, ___", opts:["ten","three","five"], a:"ten"}
  ],
  days: [
    {q:"Monday →", opts:["Tuesday","Friday","Sunday"], a:"Tuesday"},
    {q:"Tuesday →", opts:["Wednesday","Monday","Saturday"], a:"Wednesday"},
    {q:"Wednesday →", opts:["Thursday","Tuesday","Friday"], a:"Thursday"},
    {q:"Thursday →", opts:["Friday","Sunday","Monday"], a:"Friday"},
    {q:"Friday →", opts:["Saturday","Thursday","Tuesday"], a:"Saturday"},
    {q:"Saturday →", opts:["Sunday","Friday","Monday"], a:"Sunday"},
    {q:"Goodbye, Tom. See you on ___", opts:["Friday","five","tea"], a:"Friday"},
    {q:"See you ___", opts:["tomorrow","cappuccino","Helen"], a:"tomorrow"}
  ],
  pronunciation: [
    {w:"hello", a:"/h/"},
    {w:"Helen", a:"/h/"},
    {w:"hi", a:"/h/"},
    {w:"I’m", a:"/aɪ/"},
    {w:"five", a:"/aɪ/"},
    {w:"nine", a:"/aɪ/"},
    {w:"meet", a:"/iː/"},
    {w:"tea", a:"/iː/"}
  ],
  listening: [
    {q:"What does the speaker order?", opts:["A cappuccino","A tea","Two teas"], a:"A cappuccino"},
    {q:"What name do you hear?", opts:["Helen","Ellen","Diana"], a:"Helen"},
    {q:"Are you Diana?", opts:["No, I’m not","Yes, you are","No, you aren’t"], a:"No, I’m not"},
    {q:"What does Tom order?", opts:["A tea","A cappuccino","Three teas"], a:"A tea"},
    {q:"Tom or Dom?", opts:["Tom","Dom","Mike"], a:"Tom"},
    {q:"What phrase do you hear?", opts:["Nice to meet you","See you tomorrow","Good morning"], a:"Nice to meet you"},
    {q:"Which number do you hear?", opts:["three","five","nine"], a:"five"},
    {q:"Which goodbye phrase do you hear?", opts:["See you on Friday","See you on Monday","See you on Sunday"], a:"See you on Friday"}
  ]
};

const $ = s => document.querySelector(s);
const screenEl = $("#screen");
const stepDots = $("#stepDots");

function save(){
  localStorage.setItem("wow_unit1a_state_v3", JSON.stringify(state));
}
function load(){
  try{
    const s = JSON.parse(localStorage.getItem("wow_unit1a_state_v3"));
    if(s && s.scores) state.scores = {...state.scores, ...s.scores};
  }catch(e){}
}
load();

function setScreen(i){
  state.screen = Math.max(0, Math.min(i, screens.length-1));
  render();
  save();
}
function renderDots(){
  stepDots.innerHTML = screens.map((_,i)=>{
    const cls = i===state.screen ? "step-dot active" : (i<state.screen ? "step-dot done":"step-dot");
    return `<span class="${cls}"></span>`;
  }).join("");
}
function stage(content){
  return `<div class="stage-card"><div class="inner">${content}</div></div>`;
}
function progressChip(i){
  const p = Math.round((i/6)*100);
  return `<div class="progress-chip">
    <strong>Прогресс ${i}/6</strong>
    <div class="progress-track"><i style="width:${p}%"></i></div>
  </div>`;
}
function escapeHTML(s){
  return String(s).replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m]));
}
function makeOptionButtons(opts, qidx, group){
  return `<div class="options">${opts.map(o=>`<button class="option" data-group="${group}" data-q="${qidx}" data-value="${escapeHTML(o)}">${escapeHTML(o)}</button>`).join("")}</div>`;
}
function bindChoiceBlock(group, questions, scoreKey){
  const answered = new Map();
  screenEl.querySelectorAll(`.option[data-group="${group}"]`).forEach(btn=>{
    btn.addEventListener("click",()=>{
      const q = +btn.dataset.q;
      if(answered.has(q)) return;
      const correct = questions[q].a;
      const value = btn.dataset.value;
      answered.set(q, value);
      screenEl.querySelectorAll(`.option[data-group="${group}"][data-q="${q}"]`).forEach(b=>{
        if(b.dataset.value===correct) b.classList.add("correct");
        else if(b===btn) b.classList.add("wrong");
        b.disabled=true;
      });
      if(value===correct) state.scores[scoreKey] += 1;
      const fb = screenEl.querySelector(`[data-feedback="${group}-${q}"]`);
      fb.textContent = value===correct ? "Верно" : `Правильный ответ: ${correct}`;
      fb.className = `feedback-line ${value===correct?"good":"bad"}`;
      save();
    });
  });
}
async function playAudio(key, statusId){
  const status = document.getElementById(statusId);
  const src = AUDIO[key];
  const audio = new Audio(src);
  status.textContent = "Загрузка аудио…";
  try{
    await audio.play();
    status.textContent = "Воспроизведение";
    audio.addEventListener("ended",()=>status.textContent="Готово к повтору",{once:true});
  }catch(err){
    status.textContent = "MP3 пока не добавлен";
  }
}
function audioButton(key, id, label="Слушать"){
  return `<button class="audio-btn" data-audio="${key}" data-status="${id}">▶ ${label}</button>
  <div class="audio-status" id="${id}">Британское MP3-аудио</div>`;
}
function bindAudio(){
  screenEl.querySelectorAll("[data-audio]").forEach(btn=>{
    btn.addEventListener("click",()=>playAudio(btn.dataset.audio, btn.dataset.status));
  });
}

function renderStart(){
  screenEl.innerHTML = stage(`
    <div class="hero">
      <div class="hero-copy">
        <div class="eyebrow">Unit Review · Lesson 1A</div>
        <h1>A cappuccino,<span>please</span></h1>
        <p class="hero-sub">Самопроверка только по материалу Lesson 1A: фразы, verb be с I / you, numbers 0–10, days of the week, pronunciation и listening.</p>
        <div class="hero-actions">
          <button class="btn btn-primary" id="startBtn">Начать →</button>
          <button class="btn btn-secondary" id="resetAllBtn">Сбросить прогресс</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="orb">
          <div class="saucer"></div>
          <div class="cup"></div>
          <div class="mini-tag tag-a">6 блоков</div>
          <div class="mini-tag tag-b">British audio</div>
        </div>
      </div>
    </div>
  `);
  $("#startBtn").onclick = ()=>setScreen(1);
  $("#resetAllBtn").onclick = ()=>{
    Object.keys(state.scores).forEach(k=>state.scores[k]=0);
    save(); render();
  };
}
function renderPhrases(){
  const left = data.phrases.slice(0,4);
  const right = data.phrases.slice(4);
  screenEl.innerHTML = stage(`
    <div class="headline-row">
      <div><h2 class="section-title"><span>1.</span> Words & Phrases</h2><p class="section-sub">Соедини английскую фразу с переводом</p></div>
      ${progressChip(1)}
    </div>
    <div class="task-grid two-col">
      ${data.phrases.map((p,i)=>`
        <div class="task-card">
          <h3>${escapeHTML(p[0])}</h3>
          <select class="text-answer phrase-select" data-i="${i}">
            <option value="">Выбери перевод</option>
            ${data.phrases.map(x=>`<option>${escapeHTML(x[1])}</option>`).join("")}
          </select>
          <div class="feedback-line" data-feedback="phrase-${i}"></div>
        </div>`).join("")}
    </div>
    <div class="bottom-actions">
      <div>${audioButton("phrases_1","audioPhrases","Послушать фразы")}</div>
      <button class="btn btn-primary" id="nextBtn">Далее →</button>
    </div>
  `);
  bindAudio();
  screenEl.querySelectorAll(".phrase-select").forEach(sel=>{
    sel.addEventListener("change",()=>{
      const i = +sel.dataset.i;
      if(sel.dataset.done) return;
      const ok = sel.value===data.phrases[i][1];
      sel.dataset.done="1";
      sel.disabled=true;
      if(ok) state.scores.phrases++;
      const fb = screenEl.querySelector(`[data-feedback="phrase-${i}"]`);
      fb.textContent = ok ? "Верно" : `Правильно: ${data.phrases[i][1]}`;
      fb.className = `feedback-line ${ok?"good":"bad"}`;
      save();
    });
  });
  $("#nextBtn").onclick = ()=>setScreen(2);
}
function renderGrammar(){
  screenEl.innerHTML = stage(`
    <div class="headline-row">
      <div><h2 class="section-title"><span>2.</span> Grammar Check</h2><p class="section-sub">verb be · только I / you</p></div>
      ${progressChip(2)}
    </div>
    <div class="task-grid two-col">
      ${data.grammar.map((x,i)=>`<div class="task-card"><div class="prompt">${escapeHTML(x.q)}</div>${makeOptionButtons(x.opts,i,"grammar")}<div class="feedback-line" data-feedback="grammar-${i}"></div></div>`).join("")}
    </div>
    <div class="bottom-actions"><div class="score-mini">I am · You are · I’m not · You aren’t · Am I? · Are you?</div><button class="btn btn-primary" id="nextBtn">Далее →</button></div>
  `);
  bindChoiceBlock("grammar",data.grammar,"grammar");
  $("#nextBtn").onclick = ()=>setScreen(3);
}
function renderNumbers(){
  screenEl.innerHTML = stage(`
    <div class="headline-row">
      <div><h2 class="section-title"><span>3.</span> Numbers 0–10</h2><p class="section-sub">Узнай число и продолжи последовательность</p></div>
      ${progressChip(3)}
    </div>
    <div class="task-grid two-col">
      ${data.numbers.map((x,i)=>`<div class="task-card"><div class="prompt">${escapeHTML(x.q)}</div>${makeOptionButtons(x.opts,i,"numbers")}<div class="feedback-line" data-feedback="numbers-${i}"></div></div>`).join("")}
    </div>
    <div class="bottom-actions">
      <div>${audioButton("numbers_1","audioNumbers","Послушать числа")}</div>
      <button class="btn btn-primary" id="nextBtn">Далее →</button>
    </div>
  `);
  bindAudio(); bindChoiceBlock("numbers",data.numbers,"numbers");
  $("#nextBtn").onclick = ()=>setScreen(4);
}
function renderDays(){
  screenEl.innerHTML = stage(`
    <div class="headline-row">
      <div><h2 class="section-title"><span>4.</span> Days & Goodbye</h2><p class="section-sub">Дни недели и фразы прощания</p></div>
      ${progressChip(4)}
    </div>
    <div class="task-grid two-col">
      ${data.days.map((x,i)=>`<div class="task-card"><div class="prompt">${escapeHTML(x.q)}</div>${makeOptionButtons(x.opts,i,"days")}<div class="feedback-line" data-feedback="days-${i}"></div></div>`).join("")}
    </div>
    <div class="bottom-actions">
      <div>${audioButton("days_1","audioDays","Послушать дни")}</div>
      <button class="btn btn-primary" id="nextBtn">Далее →</button>
    </div>
  `);
  bindAudio(); bindChoiceBlock("days",data.days,"days");
  $("#nextBtn").onclick = ()=>setScreen(5);
}
function renderPronunciation(){
  const bins=["/h/","/aɪ/","/iː/"];
  screenEl.innerHTML = stage(`
    <div class="headline-row">
      <div><h2 class="section-title"><span>5.</span> Sound Sort</h2><p class="section-sub">Распредели слова по звукам</p></div>
      ${progressChip(5)}
    </div>
    <div class="task-card" style="flex:1;margin-top:2vh">
      <div class="sort-grid">
        ${bins.map(b=>`<div class="sound-bin" data-bin="${b}"><strong>${b}</strong><div class="bin-words"></div></div>`).join("")}
      </div>
      <div class="word-bank">
        ${data.pronunciation.map((x,i)=>`<button class="word-chip" data-word="${i}">${escapeHTML(x.w)}</button>`).join("")}
      </div>
      <div class="feedback-line" id="pronFeedback"></div>
    </div>
    <div class="bottom-actions">
      <div>${audioButton("pronunciation_1","audioPron","Послушать образцы")}</div>
      <button class="btn btn-primary" id="nextBtn">Далее →</button>
    </div>
  `);
  bindAudio();
  let selected=null, done=0;
  screenEl.querySelectorAll(".word-chip").forEach(btn=>{
    btn.onclick=()=>{
      if(btn.disabled) return;
      selected=btn;
      screenEl.querySelectorAll(".word-chip").forEach(x=>x.classList.remove("selected"));
      btn.classList.add("selected");
    };
  });
  screenEl.querySelectorAll(".sound-bin").forEach(bin=>{
    bin.onclick=()=>{
      if(!selected) return;
      const i=+selected.dataset.word;
      const correct=data.pronunciation[i].a;
      const ok=bin.dataset.bin===correct;
      if(ok) state.scores.pronunciation++;
      const clone=document.createElement("span");
      clone.className="word-chip "+(ok?"correct":"wrong");
      clone.textContent=data.pronunciation[i].w;
      bin.querySelector(".bin-words").appendChild(clone);
      selected.disabled=true;selected.style.display="none";
      selected=null;done++;
      const fb=$("#pronFeedback");
      fb.textContent=ok ? "Верно" : `Слово относится к ${correct}`;
      fb.className=`feedback-line ${ok?"good":"bad"}`;
      save();
    };
  });
  $("#nextBtn").onclick = ()=>setScreen(6);
}
function renderListening(){
  screenEl.innerHTML = stage(`
    <div class="headline-row">
      <div><h2 class="section-title"><span>6.</span> Listening Mission</h2><p class="section-sub">Слушай и выбирай ответ · только язык Lesson 1A</p></div>
      ${progressChip(6)}
    </div>
    <div class="task-grid two-col">
      ${data.listening.map((x,i)=>`<div class="task-card"><div class="prompt">${escapeHTML(x.q)}</div>${makeOptionButtons(x.opts,i,"listening")}<div class="feedback-line" data-feedback="listening-${i}"></div></div>`).join("")}
    </div>
    <div class="bottom-actions">
      <div style="display:flex;gap:10px">${audioButton("listening_1","audioListen1","Диалог 1")}${audioButton("listening_2","audioListen2","Диалог 2")}</div>
      <button class="btn btn-primary" id="nextBtn">Результат →</button>
    </div>
  `);
  bindAudio(); bindChoiceBlock("listening",data.listening,"listening");
  $("#nextBtn").onclick = ()=>setScreen(7);
}
function renderResults(){
  const keys=["phrases","grammar","numbers","days","pronunciation","listening"];
  const labels={phrases:"Words & Phrases",grammar:"Grammar",numbers:"Numbers",days:"Days & Goodbye",pronunciation:"Pronunciation",listening:"Listening"};
  const total=keys.reduce((a,k)=>a+state.scores[k],0);
  const max=keys.reduce((a,k)=>a+state.max[k],0);
  const pct=Math.round(total/max*100);
  const strongest=[...keys].sort((a,b)=>state.scores[b]/state.max[b]-state.scores[a]/state.max[a])[0];
  const weakest=[...keys].sort((a,b)=>state.scores[a]/state.max[a]-state.scores[b]/state.max[b])[0];
  screenEl.innerHTML = stage(`
    <div class="headline-row">
      <div><h2 class="section-title">Your <span>Results</span></h2><p class="section-sub">Итоги проверочной работы по Lesson 1A</p></div>
      <div class="progress-chip"><strong>Готово</strong><div class="progress-track"><i style="width:100%"></i></div></div>
    </div>
    <div class="result-layout">
      <div>
        <div class="score-orb" style="--p:${pct}%"><strong>${pct}%</strong><span>общий результат</span></div>
      </div>
      <div>
        <div class="result-bars">
          ${keys.map(k=>{
            const p=Math.round(state.scores[k]/state.max[k]*100);
            return `<div class="result-row"><label>${labels[k]}</label><div class="bar"><i style="width:${p}%"></i></div><b>${state.scores[k]}/${state.max[k]}</b></div>`
          }).join("")}
        </div>
        <div class="coach-box">
          <div class="coach-card"><strong>Что получилось лучше всего</strong><p>${labels[strongest]} — самый сильный блок в этой попытке.</p></div>
          <div class="coach-card"><strong>Что повторить</strong><p>${labels[weakest]} — сюда стоит вернуться ещё раз.</p></div>
        </div>
        <div class="hero-actions" style="margin-top:16px">
          <button class="btn btn-primary" id="retryBtn">Пройти ещё раз</button>
          <button class="btn btn-secondary" id="homeBtn">На главную</button>
        </div>
      </div>
    </div>
  `);
  $("#retryBtn").onclick=()=>{Object.keys(state.scores).forEach(k=>state.scores[k]=0);setScreen(1)};
  $("#homeBtn").onclick=()=>setScreen(0);
}
function render(){
  renderDots();
  ({
    start:renderStart,
    phrases:renderPhrases,
    grammar:renderGrammar,
    numbers:renderNumbers,
    days:renderDays,
    pronunciation:renderPronunciation,
    listening:renderListening,
    results:renderResults
  })[screens[state.screen]]();
}
render();
