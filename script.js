// My Personal Data Center – main script

// ── Section navigation ──────────────────────────────────────────────────────

const menuEl      = document.querySelector('main.glass-panel');
const mathEl      = document.getElementById('math-section');
const alevelMath1 = document.getElementById('alevel-math1-section');
const backBtns    = document.querySelectorAll('.btn-back');

var sections = [mathEl, alevelMath1];

document.querySelector('a[href="#math"]').addEventListener('click', function (e) {
  e.preventDefault();
  menuEl.classList.add('hidden');
  mathEl.classList.remove('hidden');
  window.scrollTo(0, 0);
  generatePolynomial();
});

document.querySelector('a[href="#alevel-math1"]').addEventListener('click', function (e) {
  e.preventDefault();
  menuEl.classList.add('hidden');
  alevelMath1.classList.remove('hidden');
  window.scrollTo(0, 0);
});

backBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    sections.forEach(function (s) { s.classList.add('hidden'); });
    menuEl.classList.remove('hidden');
    window.scrollTo(0, 0);
  });
});

// ── Polynomial generator ────────────────────────────────────────────────────

/**
 * Returns a random integer in [min, max] (inclusive), never zero.
 */
function randIntNonZero(min, max) {
  var n;
  do { n = Math.floor(Math.random() * (max - min + 1)) + min; } while (n === 0);
  return n;
}

/**
 * Generates a factorable quadratic of the form (x + p)(x + q),
 * expanded to ax² + bx + c (a = 1), and renders it on the page.
 *
 * Roots r₁ = –p and r₂ = –q are integers in [-9, 9] \ {0}
 * so the equation can always be factored by hand.
 */
function generatePolynomial() {
  var p = randIntNonZero(-9, 9);
  var q = randIntNonZero(-9, 9);

  var b = p + q;           // coefficient of x
  var c = p * q;           // constant term

  // Build display string: x² + bx + c
  var bStr = coeffStr(b, 'x');
  var cStr = signedNum(c);

  var equationStr = 'x\u00B2' + bStr + cStr + ' = 0';

  document.getElementById('poly-equation').textContent = equationStr;
  document.getElementById('poly-hint').textContent = '';
  document.getElementById('poly-answer').classList.add('hidden');

  // Store factors for reveal
  document.getElementById('btn-show-answer').dataset.p = p;
  document.getElementById('btn-show-answer').dataset.q = q;
}

/** Returns the signed coefficient string, e.g. " + 3x", " − 3x", "" for 0. */
function coeffStr(n, variable) {
  if (n === 0) return '';
  var abs = Math.abs(n);
  var sign = n > 0 ? ' + ' : ' \u2212 ';
  var num = abs === 1 ? '' : abs;
  return sign + num + variable;
}

/** Returns a signed number string, e.g. " + 5", " − 5". */
function signedNum(n) {
  if (n === 0) return '';
  return (n > 0 ? ' + ' : ' \u2212 ') + Math.abs(n);
}

// ── Show answer ─────────────────────────────────────────────────────────────

document.getElementById('btn-show-answer').addEventListener('click', function () {
  var p = parseInt(this.dataset.p, 10);
  var q = parseInt(this.dataset.q, 10);

  var factor1 = factorStr(p);
  var factor2 = factorStr(q);
  var r1 = -p, r2 = -q;

  document.getElementById('poly-answer').textContent =
    'Factored form: (x ' + factor1 + ')(x ' + factor2 + ')   \u27A4  ' +
    'Solutions: x = ' + r1 + ', x = ' + r2;
  document.getElementById('poly-answer').classList.remove('hidden');
});

/** Returns the inner term of a factor, e.g. "+ 3" or "− 3". */
function factorStr(n) {
  return (n >= 0 ? '+ ' : '\u2212 ') + Math.abs(n);
}

// ── New equation button ──────────────────────────────────────────────────────

document.getElementById('btn-new-equation').addEventListener('click', generatePolynomial);

// ── Worksheet linking ────────────────────────────────────────────────────────

/** All available worksheet PDFs (non-answer-key). */
var worksheetPdfs = [
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 01 เซต [Lv.0].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 01 เซต [Lv.1].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 02 ตรรกศาสตร์ [Lv.0].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 02 ตรรกศาสตร์ [Lv.1].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 03 จำนวนจริง [Lv.0].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 03 จำนวนจริง [Lv.1].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 04 ความสัมพันธ์และฟังก์ชัน [Lv.0].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 04 ความสัมพันธ์และฟังก์ชัน [Lv.1].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 05 เอกซ์โพเนนเชียลและลอการิทึม [Lv.0].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 05 เอกซ์โพเนนเชียลและลอการิทึม [Lv.1].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 08 เมทริกซ์ [Lv.0].pdf',
  'worksheets/book1/สำเนาของ แบบฝึกหัดเสริมพลัง 08 เมทริกซ์ [Lv.1].pdf',
  'worksheets/book1/สำเนาของ แบบทดสอบ คอร์ส พิชิต A – Level คณิต 1 เล่ม 1.pdf',
  'worksheets/book2/สำเนาของ แบบฝึกหัดเสริมพลัง 11 การนับและความน่าจะเป็น [Lv.0].pdf',
  'worksheets/book2/สำเนาของ แบบฝึกหัดเสริมพลัง 11 การนับและความน่าจะเป็น [Lv.1].pdf',
  'worksheets/book2/สำเนาของ แบบฝึกหัดเสริมพลัง 12 ลำดับและอนุกรม [Lv.0].pdf',
  'worksheets/book2/สำเนาของ แบบฝึกหัดเสริมพลัง 12 ลำดับและอนุกรม [Lv.1].pdf',
  'worksheets/book2/สำเนาของ แบบฝึกหัดเสริมพลัง 13 แคลคูลัส [Lv.0].pdf',
  'worksheets/book2/สำเนาของ แบบฝึกหัดเสริมพลัง 13 แคลคูลัส [Lv.1].pdf',
  'worksheets/book2/สำเนาของ แบบฝึกหัดเสริมพลัง 14 สถิติและการแจกแจงความน่าจะเป็น [Lv.0].pdf',
  'worksheets/book2/สำเนาของ แบบทดสอบ คอร์ส พิชิต A – Level คณิต 1 เล่ม 2 (ครั้งที่ 1).pdf',
  'worksheets/book3/สำเนาของ Quiz A – Level คณิต 1 เล่ม 3 บทจำนวนเชิงซ้อน.pdf',
  'worksheets/book3/สำเนาของ Quiz A – Level คณิต 1 เล่ม 3 บทเวกเตอร์.pdf',
  'worksheets/book3/สำเนาของ แบบฝึกหัดเสริมพลัง 09 เวกเตอร์ [Lv.0].pdf',
  'worksheets/book3/สำเนาของ แบบฝึกหัดเสริมพลัง 09 เวกเตอร์ [Lv.2].pdf',
  'worksheets/book3/สำเนาของ แบบฝึกหัดเสริมพลัง 10 จำนวนเชิงซ้อน [Lv.0].pdf',
  'worksheets/book3/สำเนาของ แบบฝึกหัดเสริมพลัง 10 จำนวนเชิงซ้อน [Lv.2].pdf',
  'worksheets/mock/math1/ข้อสอบ Unseen Mock Test คณิต1 ชุดพิเศษ 67.pdf',
  'worksheets/mock/math2/ข้อสอบชุดที่1 I002 Unseen Mock Test คณิต2.pdf',
  'worksheets/mock/math2/ข้อสอบชุดที่2 I002 Unseen Mock Test คณิต2.pdf',
  'worksheets/mock/math2/ข้อสอบชุดที่3 I002 Unseen Mock Test คณิต2.pdf',
  'worksheets/mock/math2/ข้อสอบชุดที่4 I002 Unseen Mock Test คณิต2(แก้ไข15มีค67).pdf',
  'worksheets/mock/math2/ข้อสอบ Unseen Mock Test คณิต 2 (Vol.5).pdf'
];

/** All available answer-key PDFs. */
var answerPdfs = [
  'worksheets/book1/สำเนาของ (เฉลย) แบบทดสอบ คอร์ส พิชิต A – Level คณิต 1 เล่ม 1.pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 01 เซต [Lv.0].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 01 เซต [Lv.1].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 02 ตรรกศาสตร์ [Lv.0].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 02 ตรรกศาสตร์ [Lv.1].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 03 จำนวนจริง [Lv.0].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 03 จำนวนจริง [Lv.1].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 04 ความสัมพันธ์และฟังก์ชัน [Lv.0].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 04 ความสัมพันธ์และฟังก์ชัน [Lv.1].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 05 เอกซ์โพเนนเชียลและลอการิทึม [Lv.0].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 05 เอกซ์โพเนนเชียลและลอการิทึม [Lv.1].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 08 เมทริกซ์ [Lv.0].pdf',
  'worksheets/book1/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 08 เมทริกซ์ [Lv.1].pdf',
  'worksheets/book2/สำเนาของ เฉลยแบบทดสอบ คอร์ส พิชิต A – Level คณิต 1 เล่ม 2 (ครั้งที่ 1).pdf',
  'worksheets/book2/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 11 การนับและความน่าจะเป็น [Lv.0].pdf',
  'worksheets/book2/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 11 การนับและความน่าจะเป็น [Lv.1].pdf',
  'worksheets/book2/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 12 ลำดับและอนุกรม [Lv.0].pdf',
  'worksheets/book2/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 12 ลำดับและอนุกรม [Lv.1].pdf',
  'worksheets/book2/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 13 แคลคูลัส [Lv.0].pdf',
  'worksheets/book2/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 13 แคลคูลัส [Lv.1].pdf',
  'worksheets/book2/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 14 สถิติและการแจกแจงความน่าจะเป็น [Lv.0].pdf',
  'worksheets/book3/สำเนาของ (เฉลย) Quiz A – Level คณิต 1 เล่ม 3 บทจำนวนเชิงซ้อน.pdf',
  'worksheets/book3/สำเนาของ (เฉลย) Quiz A – Level คณิต 1 เล่ม 3 บทเวกเตอร์.pdf',
  'worksheets/book3/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 09 เวกเตอร์ [Lv.0].pdf',
  'worksheets/book3/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 09 เวกเตอร์ [Lv.2].pdf',
  'worksheets/book3/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 10 จำนวนเชิงซ้อน [Lv.0].pdf',
  'worksheets/book3/สำเนาของ เฉลยแบบฝึกหัดเสริมพลัง 10 จำนวนเชิงซ้อน [Lv.2].pdf',
  'worksheets/mock/math1/เฉลยคำตอบ_Mock A-Level คณิต 1 (ชุดพิเศษ ปี 67).pdf',
  'worksheets/mock/math2/เฉลยคำตอบชุดที่1 I002 Unseen Mock Test คณิต2.pdf',
  'worksheets/mock/math2/เฉลยคำตอบชุดที่2 I002 Unseen Mock Test คณิต2.pdf',
  'worksheets/mock/math2/เฉลยคำตอบชุดที่3 I002 Unseen Mock Test คณิต2.pdf',
  'worksheets/mock/math2/เฉลยคำตอบชุดที่4 I002 Unseen Mock Test คณิต2.pdf',
  'worksheets/mock/math2/เฉลยคำตอบ Unseen Mock Test คณิต 2 (Vol.5).pdf'
];

/** Normalize en-dash (–) spacing so schedule text ("A–Level") matches file names ("A – Level"). */
function normalizeWorksheetName(name) {
  return name.replace(/A\s*\u2013\s*Level/g, 'A\u2013Level').trim();
}

/** Build lookup: normalized worksheet name → file path. */
var worksheetLookup = {};
worksheetPdfs.forEach(function (path) {
  var filename = path.split('/').pop();
  var name = filename.replace(/^สำเนาของ /, '').replace(/\.pdf$/, '');
  name = name.replace(/\(แก้ไข[^)]*\)/g, '');
  worksheetLookup[normalizeWorksheetName(name)] = path;
});

/** Manual override: schedule text uses a different name than the actual PDF filename. */
worksheetLookup[normalizeWorksheetName('Unseen MockTest 30ข้อ 90นาที')] =
  'worksheets/mock/math1/ข้อสอบ Unseen Mock Test คณิต1 ชุดพิเศษ 67.pdf';

/** Strip answer-key indicators from a name to recover the base worksheet name. */
function extractAnswerBaseName(name) {
  name = name.replace(/^\(เฉลย\)\s*/, '');
  name = name.replace(/^เฉลยคำตอบชุดที่/, 'ข้อสอบชุดที่');
  name = name.replace(/^เฉลยคำตอบ\s*/, 'ข้อสอบ ');
  name = name.replace(/^เฉลย/, '');
  return normalizeWorksheetName(name);
}

/** Build lookup: normalized worksheet name → answer-key file path. */
var answerLookup = {};
answerPdfs.forEach(function (path) {
  var filename = path.split('/').pop();
  var name = filename.replace(/^สำเนาของ /, '').replace(/\.pdf$/, '');
  name = name.replace(/\(แก้ไข[^)]*\)/g, '');
  answerLookup[extractAnswerBaseName(name)] = path;
});

/** Manual override: math1 mock answer key has a completely different name. */
answerLookup[normalizeWorksheetName('Unseen MockTest 30ข้อ 90นาที')] =
  'worksheets/mock/math1/เฉลยคำตอบ_Mock A-Level คณิต 1 (ชุดพิเศษ ปี 67).pdf';

/** Extract the core worksheet name from a schedule <li> text.
 *  Strips trailing metadata such as "(21ข้อ, 20นาที)" where ข้อ = items/questions,
 *  "(เต็มเวลาเหมือนสอบจริง)" for mock tests, and "(Math N Mock Test)" labels. */
function extractWorksheetName(text) {
  return normalizeWorksheetName(
    text.replace(/\s*\(\d+ข้อ[^)]*\)\s*$/, '')
        .replace(/\s*\(เต็มเวลาเหมือนสอบจริง\)\s*$/, '')
        .replace(/\s*\(Math \d+ Mock Test\)\s*$/, '')
        .trim()
  );
}

/** Turn matching schedule items into clickable PDF links with answer-key links. */
document.querySelectorAll('#alevel-math1-section .day-tasks li').forEach(function (li) {
  var name = extractWorksheetName(li.textContent);
  var pdfPath = worksheetLookup[name];
  if (pdfPath) {
    var link = document.createElement('a');
    link.href = pdfPath;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'worksheet-link';
    link.textContent = li.textContent;
    li.textContent = '';
    li.appendChild(link);

    var answerPath = answerLookup[name];
    if (answerPath) {
      var answerLink = document.createElement('a');
      answerLink.href = answerPath;
      answerLink.target = '_blank';
      answerLink.rel = 'noopener';
      answerLink.className = 'answer-link';
      answerLink.textContent = '[เฉลย]';
      answerLink.title = 'Answer Key';
      li.appendChild(document.createTextNode(' '));
      li.appendChild(answerLink);
    }
  }
});

// ── Checkbox function ────────────────────────────────────────────────────────

var CHECKBOX_KEY = 'schedule-checkboxes';

/** Load saved checkbox states from localStorage. */
function loadCheckboxState() {
  try { return JSON.parse(localStorage.getItem(CHECKBOX_KEY)) || {}; } catch (e) { return {}; }
}

/** Save checkbox states to localStorage. */
function saveCheckboxState(state) {
  localStorage.setItem(CHECKBOX_KEY, JSON.stringify(state));
}

/** Update the completion badge for a day card. */
function updateDayBadge(dayEl) {
  var items = dayEl.querySelectorAll('.day-tasks li');
  if (!items.length) return;
  var done = 0;
  items.forEach(function (li) { if (li.classList.contains('task-done')) done++; });
  var badge = dayEl.querySelector('.day-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'day-badge';
    dayEl.querySelector('.day-heading').appendChild(badge);
  }
  badge.textContent = done + '/' + items.length;
  badge.classList.toggle('all-done', done === items.length);
}

/** Inject checkboxes into every schedule task <li>. */
(function initCheckboxes() {
  var saved = loadCheckboxState();
  var days = document.querySelectorAll('#alevel-math1-section .schedule-day');

  days.forEach(function (dayEl, dayIdx) {
    var items = dayEl.querySelectorAll('.day-tasks li');
    items.forEach(function (li, taskIdx) {
      var id = 'd' + dayIdx + 't' + taskIdx;

      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'task-checkbox';
      cb.dataset.taskId = id;
      if (saved[id]) {
        cb.checked = true;
        li.classList.add('task-done');
      }

      cb.addEventListener('change', function () {
        var state = loadCheckboxState();
        if (cb.checked) {
          li.classList.add('task-done');
          state[id] = Date.now();
        } else {
          li.classList.remove('task-done');
          delete state[id];
        }
        saveCheckboxState(state);
        updateDayBadge(dayEl);
      });

      li.insertBefore(cb, li.firstChild);
    });

    updateDayBadge(dayEl);
  });
})();

// ── Per-task time recording ───────────────────────────────────────────────────

var TASK_TIME_KEY = 'task-times';

/** Load saved per-task time values from localStorage. */
function loadTaskTimes() {
  try { return JSON.parse(localStorage.getItem(TASK_TIME_KEY)) || {}; } catch (e) { return {}; }
}

/** Save per-task time values to localStorage. */
function saveTaskTimes(times) {
  localStorage.setItem(TASK_TIME_KEY, JSON.stringify(times));
}

/** Inject time-recording text boxes beside each schedule task. */
(function initTaskTimeInputs() {
  var saved = loadTaskTimes();
  var days = document.querySelectorAll('#alevel-math1-section .schedule-day');

  days.forEach(function (dayEl, dayIdx) {
    var items = dayEl.querySelectorAll('.day-tasks li');
    items.forEach(function (li, taskIdx) {
      var id = 'd' + dayIdx + 't' + taskIdx;

      var wrapper = document.createElement('span');
      wrapper.className = 'task-time-wrapper';

      var input = document.createElement('input');
      input.type = 'text';
      input.className = 'task-time-input';
      input.placeholder = 'Time';
      input.title = 'Record your completion time (e.g. 30m, 1h15m)';
      input.dataset.taskId = id;
      if (saved[id]) {
        input.value = saved[id];
      }

      input.addEventListener('input', function () {
        var times = loadTaskTimes();
        if (input.value.trim()) {
          times[id] = input.value.trim();
        } else {
          delete times[id];
        }
        saveTaskTimes(times);
      });

      wrapper.appendChild(input);
      li.appendChild(wrapper);
    });
  });
})();

// ── Study time recorder ──────────────────────────────────────────────────────

var TIMER_KEY = 'study-timer';

/** Load timer state: { elapsed: ms, running: boolean, startedAt: timestamp|null } */
function loadTimerState() {
  try {
    var s = JSON.parse(localStorage.getItem(TIMER_KEY));
    return s && typeof s.elapsed === 'number' ? s : { elapsed: 0, running: false, startedAt: null };
  } catch (e) { return { elapsed: 0, running: false, startedAt: null }; }
}

function saveTimerState(state) {
  localStorage.setItem(TIMER_KEY, JSON.stringify(state));
}

/** Format milliseconds into HH:MM:SS. */
function formatTime(ms) {
  var totalSec = Math.floor(ms / 1000);
  var h = Math.floor(totalSec / 3600);
  var m = Math.floor((totalSec % 3600) / 60);
  var s = totalSec % 60;
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

(function initTimer() {
  var bar = document.createElement('div');
  bar.className = 'timer-bar';

  var display = document.createElement('span');
  display.className = 'timer-display';
  display.textContent = '00:00:00';

  var btnStart = document.createElement('button');
  btnStart.className = 'btn-action btn-timer';
  btnStart.textContent = '▶ Start';

  var btnReset = document.createElement('button');
  btnReset.className = 'btn-action btn-timer btn-timer-reset';
  btnReset.textContent = '↺ Reset';

  bar.appendChild(document.createTextNode('⏱️ Study Time: '));
  bar.appendChild(display);
  bar.appendChild(btnStart);
  bar.appendChild(btnReset);

  var subtitle = alevelMath1.querySelector('.section-subtitle');
  subtitle.parentNode.insertBefore(bar, subtitle.nextSibling);

  var timerInterval = null;
  var state = loadTimerState();

  function currentElapsed() {
    if (state.running && state.startedAt) {
      return state.elapsed + (Date.now() - state.startedAt);
    }
    return state.elapsed;
  }

  function render() {
    display.textContent = formatTime(currentElapsed());
  }

  function startTicking() {
    if (timerInterval) return;
    timerInterval = setInterval(render, 1000);
  }

  function stopTicking() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Restore state on load
  if (state.running) {
    btnStart.textContent = '⏸ Pause';
    startTicking();
  }
  render();

  btnStart.addEventListener('click', function () {
    if (state.running) {
      // Pause
      state.elapsed = currentElapsed();
      state.running = false;
      state.startedAt = null;
      btnStart.textContent = '▶ Start';
      stopTicking();
    } else {
      // Start
      state.running = true;
      state.startedAt = Date.now();
      btnStart.textContent = '⏸ Pause';
      startTicking();
    }
    saveTimerState(state);
    render();
  });

  btnReset.addEventListener('click', function () {
    state.elapsed = 0;
    state.running = false;
    state.startedAt = null;
    btnStart.textContent = '▶ Start';
    stopTicking();
    saveTimerState(state);
    render();
  });
})();
