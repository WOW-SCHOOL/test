(() => {
  const PIN = String(window.WOW_MODULE_PIN ?? '').trim();
  if (!PIN) return;

  const IS_EMBEDDED = window.self !== window.top;
  const SESSION_KEY = 'wow_module_pin_access:' + location.pathname;

  // In a normal browser tab, remember successful access for the current tab session.
  // Inside Holst (iframe), always show the PIN screen whenever the module document opens.
  if (!IS_EMBEDDED) {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === PIN) return;
    } catch (_) {}
  }

  const style = document.createElement('style');
  style.textContent = `
    .wow-pin-gate{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:24px;background:linear-gradient(135deg,rgba(221,237,255,.98),rgba(248,241,255,.98) 52%,rgba(255,247,226,.98));font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;color:#10275f}
    .wow-pin-gate:before,.wow-pin-gate:after{content:"";position:absolute;border-radius:50%;filter:blur(2px);pointer-events:none}
    .wow-pin-gate:before{width:560px;height:560px;left:-240px;top:-250px;background:radial-gradient(circle,rgba(45,141,247,.25),transparent 68%)}
    .wow-pin-gate:after{width:520px;height:520px;right:-210px;top:-230px;background:radial-gradient(circle,rgba(142,88,245,.22),transparent 70%)}
    .wow-pin-card{position:relative;width:min(92vw,500px);padding:38px 38px 34px;border-radius:32px;background:rgba(255,255,255,.94);border:1px solid rgba(255,255,255,.98);box-shadow:0 28px 70px rgba(43,75,145,.20),inset 0 2px 0 #fff;text-align:center}
    .wow-pin-logo{font-size:32px;line-height:1;font-weight:1000;letter-spacing:-1.2px;color:#10275f}.wow-pin-logo span{color:#2d8df7}
    .wow-pin-meta{margin-top:8px;font-size:14px;font-weight:800;color:#7283a5}
    .wow-pin-title{margin:26px 0 8px;font-size:28px;line-height:1.1;font-weight:1000;letter-spacing:-.6px}
    .wow-pin-sub{margin:0 0 22px;font-size:15px;line-height:1.45;font-weight:700;color:#687a9f}
    .wow-pin-input{width:100%;height:62px;border-radius:18px;border:2px solid #dce8f7;background:#f8fbff;color:#10275f;text-align:center;font-size:28px;font-weight:950;letter-spacing:.18em;outline:none;transition:.15s;box-shadow:inset 0 1px 0 #fff}
    .wow-pin-input:focus{border-color:#59a8ff;box-shadow:0 0 0 5px rgba(45,141,247,.10),inset 0 1px 0 #fff}
    .wow-pin-btn{width:100%;height:58px;margin-top:14px;border:0;border-radius:18px;background:linear-gradient(145deg,#20c7c1,#2d8df7);color:#fff;font:inherit;font-size:18px;font-weight:950;cursor:pointer;box-shadow:inset 0 2px 0 rgba(255,255,255,.25),0 12px 24px rgba(36,145,214,.20);transition:.15s}
    .wow-pin-btn:hover{transform:translateY(-1px)}.wow-pin-btn:active{transform:translateY(0)}
    .wow-pin-error{min-height:22px;margin-top:12px;font-size:14px;font-weight:850;color:#c64b5f}
    .wow-pin-gate.wrong .wow-pin-card{animation:wowPinShake .26s linear}.wow-pin-gate.success{animation:wowPinFade .22s ease forwards}
    @keyframes wowPinShake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
    @keyframes wowPinFade{to{opacity:0;visibility:hidden}}
  `;
  document.head.appendChild(style);

  const gate = document.createElement('div');
  gate.className = 'wow-pin-gate';
  gate.setAttribute('role','dialog');
  gate.setAttribute('aria-modal','true');
  gate.setAttribute('aria-label','Вход в учебный модуль');
  gate.innerHTML = `
    <div class="wow-pin-card">
      <div class="wow-pin-logo"><span>WOW</span> SCHOOL</div>
      <div class="wow-pin-meta">online english school · wow-school.ru</div>
      <div class="wow-pin-title">Введите PIN-код</div>
      <p class="wow-pin-sub">Введите код доступа, чтобы открыть учебный модуль.</p>
      <form id="wowPinForm" autocomplete="off">
        <input id="wowPinInput" class="wow-pin-input" type="password" inputmode="numeric" autocomplete="one-time-code" aria-label="PIN-код" />
        <button class="wow-pin-btn" type="submit">Войти</button>
        <div id="wowPinError" class="wow-pin-error" aria-live="polite"></div>
      </form>
    </div>`;
  document.body.appendChild(gate);

  const form = gate.querySelector('#wowPinForm');
  const input = gate.querySelector('#wowPinInput');
  const error = gate.querySelector('#wowPinError');

  const unlock = () => {
    if (!IS_EMBEDDED) {
      try { sessionStorage.setItem(SESSION_KEY, PIN); } catch (_) {}
    }
    gate.classList.add('success');
    setTimeout(() => gate.remove(), 230);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value === PIN) {
      error.textContent = '';
      unlock();
      return;
    }
    error.textContent = 'Неверный PIN-код. Попробуйте ещё раз.';
    gate.classList.remove('wrong');
    void gate.offsetWidth;
    gate.classList.add('wrong');
    input.select();
  });

  setTimeout(() => input.focus(), 50);
})();
