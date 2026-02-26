// My Personal Data Center – main script

// ── Section navigation ──────────────────────────────────────────────────────

const menuEl   = document.querySelector('main.glass-panel');
const mathEl   = document.getElementById('math-section');
const backBtns = document.querySelectorAll('.btn-back');

document.querySelector('a[href="#math"]').addEventListener('click', function (e) {
  e.preventDefault();
  menuEl.classList.add('hidden');
  mathEl.classList.remove('hidden');
  generatePolynomial();
});

backBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    mathEl.classList.add('hidden');
    menuEl.classList.remove('hidden');
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
