// MEGA GARBAGE CODE - DO NOT USE IN PRODUCTION
// This file is intentionally full of bad practices and bugs

// ===== GLOBAL POLLUTION =====
globalVar1 = 'no var declaration';
globalVar2 = globalVar3 + 5;  // undefined reference
globalVar3 = undefined;
window.secretData = 'stored in window';

// ===== INSECURE CODE =====
function getUserData(id) {
  // SQL injection vulnerability
  var query = "SELECT * FROM users WHERE id = " + id;
  return executeQuery(query);  // undefined function
}

function processUserInput(input) {
  // XSS vulnerability
  document.body.innerHTML = '<h1>' + input + '</h1>';
}

// ===== TYPE ERRORS =====
var obj = null;
var value = obj.toString();  // will crash - null has no methods

var arr = [1, 2, 3];
arr[100] = 'sparse array';
console.log(arr[50]);  // undefined

// ===== LOGIC ERRORS =====
function checkAge(age) {
  if (age >= 18) return 'adult';
  if (age >= 13) return 'teen';
  if (age >= 0) return 'child';
  return 'invalid';  // never reached for age > 18
}

// ===== MEMORY LEAKS =====
var cache = [];
function leakMemory() {
  setInterval(function() {
    cache.push(new Array(1000000).fill('LEAK'));
  }, 100);  // Grows infinitely
}

// ===== INFINITE LOOPS =====
function freeze() {
  var i = 0;
  while (true) {
    i++;
    if (i > 10) break;
  }
}

function actualFreeze() {
  while (1) {
    console.log('freeze');
  }
}

// ===== RACE CONDITIONS =====
var counter = 0;
function incrementAsync() {
  setTimeout(function() {
    counter++;  // race condition
  }, Math.random() * 1000);
}

// ===== CALLBACK HELL =====
function dbQuery(sql, callback) {
  setTimeout(function() {
    dbQuery('SELECT...', function() {
      dbQuery('INSERT...', function() {
        dbQuery('UPDATE...', function() {
          callback('nested hell');
        });
      });
    });
  }, 1000);
}

// ===== PROTOTYPE POLLUTION =====
function pollute(obj) {
  obj.__proto__['isAdmin'] = true;
  Object.prototype.constructor = 'hacked';
}

// ===== EVAL AND EVAL-LIKE =====
var userCode = 'alert("XSS")';
eval(userCode);  // DANGER!
new Function(userCode)();  // Also dangerous
setTimeout(userCode, 1000);  // Dangerous!

// ===== REGEX DOS =====
var evilRegex = /^(a+)+$/;
var maliciousInput = 'aaaaaaaaaaaaaaaaaaaaa';
evilRegex.test(maliciousInput);  // catastrophic backtracking

// ===== LOOSE EQUALITY =====
if (0 == false) console.log('loose!');
if ('' == false) console.log('loose!');
if (null == undefined) console.log('loose!');  // true!
if ([] == false) console.log('loose!');  // true!

// ===== NAN COMPARISONS =====
var x = NaN;
if (x === NaN) console.log('never');  // always false
if (x == NaN) console.log('never');   // always false

// ===== PARAMETER SHADOWING =====
function shadow(data) {
  var data = null;  // shadows parameter
  return data;
}

// ===== UNREACHABLE CODE =====
function unreachable() {
  return 'done';
  var x = 5;  // never executes
  console.log(x);  // dead code
  if (false) {
    console.log('impossible');
  }
}

// ===== SWITCH FALL-THROUGH =====
function switchFail(x) {
  switch(x) {
    case 1:
      console.log('one');
      // missing break
    case 2:
      console.log('two');
      // missing break
    case 3:
      console.log('three');
  }
}

// ===== MODIFYING CONSTANTS =====
const MAX_SIZE = 100;
MAX_SIZE = 200;  // TypeError

const obj2 = { x: 1 };
obj2.x = 2;  // This actually works (mutable object)

// ===== IMPLICIT GLOBALS =====
function createGlobal() {
  implicit = 'exists in global scope';  // no var/let/const
  this.implicit2 = 'also global';
}

// ===== MISSING RETURN STATEMENTS =====
function calculate(a, b) {
  var result = a + b;
  // forgot return
}

function process(data) {
  if (!data) return;
  doSomething(data);
  // forgot return
}

// ===== ASYNC PROBLEMS =====
function badAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);  // 'data' is undefined
    }, 1000);
  });
}

// ===== FLOATING PROMISE =====
async function floatingPromise() {
  doAsyncThing();  // not awaited
  return 'done';  // completes before async finishes
}

// ===== WRONG ARRAY METHODS =====
var nums = [1, 2, 3];
nums.forEach(num => {
  nums.push(num * 2);  // modifying during iteration
});

// ===== MISSING ERROR HANDLING =====
function dangerousJSON() {
  var data = JSON.parse(userInput);  // crashes on invalid JSON
  return data;
}

// ===== OBJECT COMPARISON =====
if ({} === {}) console.log('never');  // always false
if ([] === []) console.log('never');  // always false

// ===== THIS BINDING ISSUES =====
var obj3 = {
  value: 42,
  getValue: function() {
    setTimeout(function() {
      console.log(this.value);  // 'this' is wrong context
    }, 1000);
  }
};

// ===== ASYNC/AWAIT ERRORS =====
async function badAwait() {
  const promises = [
    fetch(url1),
    fetch(url2),
    fetch(url3)
  ];
  promises.forEach(async (p) => {
    await p;  // should use Promise.all
  });
}

// ===== FLOATING ELEMENTS =====
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);  // always logs 10
  }, 100);
}

// ===== SECURITY: HARDCODED SECRETS =====
const API_KEY = 'sk_test_1234567890abcdefgh';
const PASSWORD = 'admin123';
const DB_URL = 'mongodb://admin:password@localhost/db';

// ===== PERFORMANCE: UNNECESSARY LOOPS =====
function slowWay(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      for (var k = 0; k < arr.length; k++) {
        result.push(arr[i] + arr[j] + arr[k]);
      }
    }
  }
  return result;  // O(n³) complexity
}

// ===== MISSING VALIDATION =====
function divide(a, b) {
  return a / b;  // no check for b === 0
}

function accessArray(arr, index) {
  return arr[index];  // no bounds checking
}

// ===== ANTIPATTERN: CONSTRUCTOR FUNCTIONS =====
function BadObject() {
  this.value = 0;
  this.getValue = function() {  // creates new function each time
    return this.value;
  };
}

// ===== GLOBAL OBJECT POLLUTION =====
var app = {};
app.config = { debug: true };
app.state = { users: [] };
app.cache = {};
// All mutable, all global

// ===== DEPRECATED APIS =====
document.write('hello');  // deprecated
var img = new Image();
img.onload = function() { };  // old callback style

// ===== MONKEY PATCHING =====
Array.prototype.sum = function() {  // dangerous!
  return this.reduce((a, b) => a + b, 0);
};

String.prototype.reverse = function() {  // overwrites built-in
  return this.split('').reverse().join('');
};

// ===== TYPEOF BUGS =====
if (typeof x === 'undefined') {  // can throw ReferenceError for let/const
  console.log('undefined');
}

// ===== NULL COALESCING WRONG =====
var value = null || 'default';  // works but confusing
var value2 = 0 || 'default';  // 'default' (falsy issue)

// ===== MAGIC STRINGS =====
function getUserRole(roleId) {
  if (roleId === '1') return 'admin';
  if (roleId === '2') return 'user';
  if (roleId === '3') return 'guest';
  // magic numbers everywhere
}

// ===== UNUSED VARIABLES =====
var unused1 = 'never used';
var unused2 = 42;
var unused3 = { data: 'not used' };
var unused4 = [];

console.log('Garbage file loaded');
