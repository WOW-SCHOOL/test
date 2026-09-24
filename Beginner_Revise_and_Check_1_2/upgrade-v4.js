/* WOW SCHOOL v4 retrofit layer. Educational app logic remains in the original app.js. */
const WOW_V4_HELPERS={
  1:{title:"Лёгкая подсказка",html:"Сначала определи категорию: country, nationality, day, classroom language или personal information. Это сузит выбор."},
  2:{title:"Простое правило",html:"Сначала найди подлежащее, затем форму <b>verb be</b>. В вопросах отдельно проверь порядок слов и вопросительное слово."},
  3:{title:"Лёгкая подсказка",html:"Слушай только за одной деталью за раз: number, spelling, phone или email. После этого сравни варианты."},
  4:{title:"Лёгкая подсказка",html:"Определи функцию реплики: знакомство, просьба повторить, classroom instruction или personal information."}
};
const WOW_V4_TRANSCRIPT_SPEAKERS={"1": ["Julia", "Omar"], "2": ["Receptionist", "Ben"]};
const WOW_V4_VOICE_MAP={};
function wowV4HelperDetails(title,html){return `<details class="helperDetails"><summary>${esc(title)}</summary><div class="helperBody">${html}</div></details>`}
function wowV4TranscriptHTML(){
 try{
  const idx=state.idx?.listening||0;
  const item=data.listening?.qs?.[idx];
  const script=item&&data.listening?.scripts?.find(s=>s.id===item.script);
  if(!script||!Array.isArray(script.lines))return '';
  const alternating=WOW_V4_TRANSCRIPT_SPEAKERS[String(script.id)]||[];
  return `<div class="transcript">${script.lines.map((line,i)=>{
   const speaker=WOW_V4_VOICE_MAP[line.voice]||line.voice||alternating[i%alternating.length]||`Speaker ${i%2+1}`;
   return `<div class="transcriptLine"><strong>${esc(speaker)}</strong><span>${esc(line.text)}</span></div>`;
  }).join('')}</div>`;
 }catch(_){return ''}
}
function wowV4ApplyHelpers(){
 const body=document.querySelector('.blockBody');if(!body)return;
 const visual=Array.from(body.children).find(el=>el.classList?.contains('visualCard'));if(!visual)return;
 let helper='';
 const cfg=WOW_V4_HELPERS[state.screen];
 if(cfg)helper=wowV4HelperDetails(cfg.title,cfg.html);
 if(state.screen===7){const transcript=wowV4TranscriptHTML();if(transcript)helper=wowV4HelperDetails('Открыть текст диалога',transcript)}
 if(!helper)return;
 const column=document.createElement('div');column.className='visualColumn';
 body.insertBefore(column,visual);column.appendChild(visual);
 const wrap=document.createElement('div');wrap.className='visualHelpers';wrap.innerHTML=helper;column.appendChild(wrap);
}
const wowV4BaseRender=render;
render=function(){wowV4BaseRender();wowV4ApplyHelpers()};
wowV4ApplyHelpers();
function wowV4QaChangeTask(delta){
 const sec=SECTIONS[state.screen-1];if(!sec||!state.idx||!(sec in state.idx)||!MAX[sec])return;
 state.idx[sec]=Math.max(0,Math.min(MAX[sec]-1,(state.idx[sec]||0)+delta));save();render();
}
function wowV4QaChangeBlock(delta){
 const last=SECTIONS.length,current=state.screen>=1&&state.screen<=last?state.screen:(delta>0?0:last+1);
 state.screen=Math.max(1,Math.min(last,current+delta));save();render();
}
addEventListener('keydown',e=>{
 if(document.querySelector('.wow-pin-gate'))return;
 if(e.altKey&&e.shiftKey&&!e.ctrlKey&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();wowV4QaChangeTask(e.key==='ArrowRight'?1:-1);return}
 if(e.altKey&&e.ctrlKey&&!e.shiftKey&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();wowV4QaChangeBlock(e.key==='ArrowRight'?1:-1)}
});
