/**
 * Given a string formatted as a `@da`, returns a bigint representing the urbit date.
 *
 * @param   {string}  x  The formatted `@da`
 * @return  {bigint}     The urbit date as bigint
 */
function parseDa(x) {
  let pos = true;
  let [date, time, ms] = x.split('..');
  time = time || '0.0.0';
  ms = ms || '0000';
  let [yer, month, day] = date.slice(1).split('.');
  if (yer.at(-1) === '-') {
    yer = yer.slice(0, -1);
    pos = false;
  }
  const [hour, minute, sec] = time.split('.');
  const millis = ms.split('.').map(m => BigInt('0x' + m));
  return year({
    pos: pos,
    year: BigInt(yer),
    month: BigInt(month),
    time: {
      day: BigInt(day),
      hour: BigInt(hour),
      minute: BigInt(minute),
      second: BigInt(sec),
      ms: millis
    }
  });
}
function parseDr(x) {
  const rop = {
    day: 0n,
    hour: 0n,
    minute: 0n,
    second: 0n,
    ms: []
  };
  x = x.slice(1); //  strip ~
  let [time, ms] = x.split('..');
  ms = ms || '0000';
  rop.ms = ms.split('.').map(m => BigInt('0x' + m));
  time.split('.').forEach(a => {
    switch (a[0]) {
      case 'd':
        rop.day += BigInt(a.slice(1));
        break;
      case 'h':
        rop.hour += BigInt(a.slice(1));
        break;
      case 'm':
        rop.minute += BigInt(a.slice(1));
        break;
      case 's':
        rop.second += BigInt(a.slice(1));
        break;
      default:
        throw new Error('bad dr: ' + x);
    }
  });
  ms = ms || '0000';
  return yule(rop);
}
/**
 * Given a bigint representing an urbit date, returns a string formatted as a proper `@da`.
 *
 * @param   {bigint}  x  The urbit date as bigint
 * @return  {string}     The formatted `@da`
 */
function renderDa(x) {
  const {
    pos,
    year,
    month,
    time
  } = yore(x);
  let out = `~${year}${pos ? '' : '-'}.${month}.${time.day}`;
  if (time.hour !== 0n || time.minute !== 0n || time.second !== 0n || time.ms.length !== 0) {
    out = out + `..${time.hour.toString().padStart(2, '0')}.${time.minute.toString().padStart(2, '0')}.${time.second.toString().padStart(2, '0')}`;
    if (time.ms.length !== 0) {
      out = out + `..${time.ms.map(x => x.toString(16).padStart(4, '0')).join('.')}`;
    }
  }
  return out;
}
function renderDr(x) {
  if (x === 0n) return '~s0';
  const {
    day,
    hour,
    minute,
    second,
    ms
  } = yell(x);
  let out = [];
  if (day !== 0n) out.push('d' + day.toString());
  if (hour !== 0n) out.push('h' + hour.toString());
  if (minute !== 0n) out.push('m' + minute.toString());
  if (second !== 0n) out.push('s' + second.toString());
  if (ms.length !== 0) {
    if (out.length === 0) out.push('s0');
    out.push('.' + ms.map(x => x.toString(16).padStart(4, '0')).join('.'));
  }
  return '~' + out.join('.');
}
/**
 * Given a bigint representing an urbit date, returns a unix timestamp.
 *
 * @param   {bigint}  da  The urbit date
 * @return  {number}      The unix timestamp
 */
function toUnix(da) {
  // ported from +time:enjs:format in hoon.hoon
  const offset = DA_SECOND / 2000n;
  const epochAdjusted = offset + (da - DA_UNIX_EPOCH);
  return Math.round(Number(epochAdjusted * 1000n / DA_SECOND));
}
/**
 * Given a unix timestamp, returns a bigint representing an urbit date
 *
 * @param   {number}  unix  The unix timestamp
 * @return  {bigint}        The urbit date
 */
function fromUnix(unix) {
  const timeSinceEpoch = BigInt(unix) * DA_SECOND / 1000n;
  return DA_UNIX_EPOCH + timeSinceEpoch;
}
/**
 * Given a number of seconds, return a bigint representing its `@dr`
 */
function fromSeconds(seconds) {
  return yule({
    day: 0n,
    hour: 0n,
    minute: 0n,
    second: seconds,
    ms: []
  });
}
/**
 * Convert a `@dr` to the amount of seconds it represents, dropping sub-
 * second precision
 */
function toSeconds(dr) {
  const {
    day,
    hour,
    minute,
    second
  } = yell(dr);
  return ((day * 24n + hour) * 60n + minute) * 60n + second;
}
const DA_UNIX_EPOCH = /*#__PURE__*/BigInt('170141184475152167957503069145530368000'); // `@ud` ~1970.1.1
const DA_SECOND = /*#__PURE__*/BigInt('18446744073709551616'); // `@ud` ~s1
const EPOCH = /*#__PURE__*/BigInt('292277024400');
function isLeapYear(year) {
  return year % 4n === 0n && year % 100n !== 0n || year % 400n === 0n;
}
const MOH_YO = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MOY_YO = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAY_YO = 86400n;
const HOR_YO = 3600n;
const MIT_YO = 60n;
const ERA_YO = 146097n;
const CET_YO = 36524n;
function year(det) {
  const yer = det.pos ? EPOCH + BigInt(det.year) : EPOCH - (BigInt(det.year) - 1n);
  const day = (() => {
    let cah = isLeapYear(yer) ? MOY_YO : MOH_YO;
    let d = det.time.day - 1n;
    let m = det.month - 1n;
    while (m !== 0n) {
      const [first, ...rest] = cah;
      d = d + BigInt(first);
      m = m - 1n;
      cah = rest;
    }
    let loop = true;
    let y = yer;
    while (loop == true) {
      if (y % 4n !== 0n) {
        y = y - 1n;
        d = d + (isLeapYear(y) ? 366n : 365n);
      } else if (y % 100n !== 0n) {
        y = y - 4n;
        d = d + (isLeapYear(y) ? 1461n : 1460n);
      } else if (y % 400n !== 0n) {
        y = y - 100n;
        d = d + (isLeapYear(y) ? 36525n : 36524n);
      } else {
        let eras = y / 400n;
        d = d + eras * (4n * 36524n + 1n);
        loop = false;
      }
    }
    return d;
  })();
  det.time.day = day;
  return yule(det.time);
}
function yule(rip) {
  let sec = rip.second + DAY_YO * rip.day + HOR_YO * rip.hour + MIT_YO * rip.minute;
  let ms = rip.ms;
  let fac = 0n;
  let muc = 3n;
  while (ms.length !== 0) {
    const [first, ...rest] = ms;
    fac = fac + (first << 16n * muc);
    ms = rest;
    muc -= 1n;
  }
  return fac | sec << 64n;
}
function yell(x) {
  let sec = x >> 64n;
  const milliMask = BigInt('0xffffffffffffffff');
  const millis = milliMask & x;
  const ms = millis.toString(16).padStart(16, '0').match(/.{4}/g).map(x => BigInt('0x' + x));
  while (ms.at(-1) === 0n) {
    ms.pop();
  }
  let day = sec / DAY_YO;
  sec = sec % DAY_YO;
  let hor = sec / HOR_YO;
  sec = sec % HOR_YO;
  let mit = sec / MIT_YO;
  sec = sec % MIT_YO;
  return {
    ms,
    day,
    minute: mit,
    hour: hor,
    second: sec
  };
}
function yall(day) {
  let era = 0n;
  let cet = 0n;
  let lep = false;
  era = day / ERA_YO;
  day = day % ERA_YO;
  if (day < CET_YO + 1n) {
    lep = true;
  } else {
    lep = false;
    cet = 1n;
    day = day - (CET_YO + 1n);
    cet = cet + day / CET_YO;
    day = day % CET_YO;
  }
  let yer = era * 400n + cet * 100n;
  let loop = true;
  while (loop == true) {
    let dis = lep ? 366n : 365n;
    if (!(day < dis)) {
      yer = yer + 1n;
      day = day - dis;
      lep = yer % 4n === 0n;
    } else {
      loop = false;
      let inner = true;
      let mot = 0n;
      while (inner) {
        let cah = lep ? MOY_YO : MOH_YO;
        let zis = BigInt(cah[Number(mot)]);
        if (day < zis) {
          return [yer, mot + 1n, day + 1n];
        }
        mot = mot + 1n;
        day = day - zis;
      }
    }
  }
  return [0n, 0n, 0n];
}
function yore(x) {
  const time = yell(x);
  const [y, month, d] = yall(time.day);
  time.day = d;
  const pos = y > EPOCH;
  const year = pos ? y - EPOCH : EPOCH + 1n - y;
  return {
    pos,
    year,
    month,
    time
  };
}

// ++  muk
//
// See arvo/sys/hoon.hoon.
/**
 * Standard murmur3.
 *
 * @param  {Number}       syd
 * @param  {Number}       len
 * @param  {bigint}       key
 * @return {bigint}
 */
const muk = (syd, key) => {
  const lo = Number(key & 0xffn);
  const hi = Number((key & 0xff00n) / 256n);
  const kee = String.fromCharCode(lo) + String.fromCharCode(hi);
  return BigInt(murmurhash3_32_gc(kee, syd));
};
// see: https://github.com/garycourt/murmurhash-js
//
// Copyright (c) 2011 Gary Court
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
/**
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 *
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} key ASCII only
 * @param {number} seed Positive integer only
 * @return {number} 32-bit positive integer hash
 **/
const murmurhash3_32_gc = (key, seed) => {
  let remainder, bytes, h1, h1b, c1, c2, k1, i; // c1b, c2b unused
  remainder = key.length & 3; // key.length % 4
  bytes = key.length - remainder;
  h1 = seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;
  while (i < bytes) {
    k1 = key.charCodeAt(i) & 0xff | (key.charCodeAt(++i) & 0xff) << 8 | (key.charCodeAt(++i) & 0xff) << 16 | (key.charCodeAt(++i) & 0xff) << 24;
    ++i;
    k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
    k1 = k1 << 15 | k1 >>> 17;
    k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
    h1 ^= k1;
    h1 = h1 << 13 | h1 >>> 19;
    h1b = (h1 & 0xffff) * 5 + (((h1 >>> 16) * 5 & 0xffff) << 16) & 0xffffffff;
    h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654 & 0xffff) << 16);
  }
  k1 = 0;
  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff;
      k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
      k1 = k1 << 15 | k1 >>> 17;
      k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
      h1 ^= k1;
  }
  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = (h1 & 0xffff) * 0x85ebca6b + (((h1 >>> 16) * 0x85ebca6b & 0xffff) << 16) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = (h1 & 0xffff) * 0xc2b2ae35 + (((h1 >>> 16) * 0xc2b2ae35 & 0xffff) << 16) & 0xffffffff;
  h1 ^= h1 >>> 16;
  return h1 >>> 0;
};

// ++  ob
//
// See arvo/sys/hoon.hoon.
// a PRF for j in { 0, .., 3 }
const F = (j, arg) => {
  const raku = [0xb76d5eed, 0xee281300, 0x85bcae01, 0x4b387af7];
  return muk(raku[j], arg);
};
/**
 * Conceal structure v3.
 *
 * @param {String, Number, bigint} pyn
 * @return  {bigint}
 */
const fein = arg => {
  const loop = pyn => {
    const lo = pyn & 0xffffffffn;
    const hi = pyn & 0xffffffff00000000n;
    return pyn >= 0x10000n && pyn <= 0xffffffffn ? 0x10000n + feis(pyn - 0x10000n) : pyn >= 0x100000000n && pyn <= 0xffffffffffffffffn ? hi | loop(lo) : pyn;
  };
  return loop(arg);
};
/**
 * Restore structure v3.
 *
 * @param  {String, Number, bigint}  cry
 * @return  {bigint}
 */
const fynd = arg => {
  const loop = cry => {
    const lo = cry & 0xffffffffn;
    const hi = cry & 0xffffffff00000000n;
    return cry >= 0x10000n && cry <= 0xffffffffn ? 0x10000n + tail(cry - 0x10000n) : cry >= 0x100000000n && cry <= 0xffffffffffffffffn ? hi | loop(lo) : cry;
  };
  return loop(BigInt(arg));
};
/**
 * Generalised Feistel cipher.
 *
 * See: Black and Rogaway (2002), "Ciphers with arbitrary finite domains."
 *
 * Note that this has been adjusted from the reference paper in order to
 * support some legacy behaviour.
 *
 * @param  {String, Number, bigint}
 * @return  {BN}
 */
const feis = arg => Fe(4, 65535n, 65536n, 0xffffffffn, F, arg);
const Fe = (r, a, b, k, f, m) => {
  const c = fe(r, a, b, f, m);
  return c < k ? c : fe(r, a, b, f, c);
};
const fe = (r, a, b, f, m) => {
  const loop = (j, ell, arr) => {
    if (j > r) {
      return r % 2 !== 0 ? a * arr + ell : arr === a ? a * arr + ell : a * ell + arr;
    } else {
      const eff = BigInt(f(j - 1, arr).toString());
      const tmp = j % 2 !== 0 ? (ell + eff) % a : (ell + eff) % b;
      return loop(j + 1, arr, tmp);
    }
  };
  const L = m % a;
  const R = m / a;
  return loop(1, L, R);
};
/**
 * Reverse 'feis'.
 *
 * See: Black and Rogaway (2002), "Ciphers with arbitrary finite domains."
 *
 * Note that this has been adjusted from the reference paper in order to
 * support some legacy behaviour.
 *
 * @param {bigint}  arg
 * @return  {bigint}
 */
const tail = arg => Fen(4, 65535n, 65536n, 0xffffffffn, F, arg);
const Fen = (r, a, b, k, f, m) => {
  const c = fen(r, a, b, f, m);
  return c < k ? c : fen(r, a, b, f, c);
};
const fen = (r, a, b, f, m) => {
  const loop = (j, ell, arr) => {
    if (j < 1) {
      return a * arr + ell;
    } else {
      const eff = f(j - 1, ell);
      // NB (jtobin):
      //
      // Slight deviation from B&R (2002) here to prevent negative values.  We
      // add 'a' or 'b' to arr as appropriate and reduce 'eff' modulo the same
      // number before performing subtraction.
      //
      const tmp = j % 2 !== 0 ? (arr + a - eff % a) % a : (arr + b - eff % b) % b;
      return loop(j - 1, tmp, ell);
    }
  };
  const ahh = r % 2 !== 0 ? m / a : m % a;
  const ale = r % 2 !== 0 ? m % a : m / a;
  const L = ale === a ? ahh : ale;
  const R = ale === a ? ale : ahh;
  return loop(r, L, R);
};
var ob = {
  F,
  fe,
  Fe,
  feis,
  fein,
  fen,
  Fen,
  tail,
  fynd
};

//
//  main parsing & rendering
//
//NOTE  matches for shape, not syllables
const regexP = /^~([a-z]{3}|([a-z]{6}(\-[a-z]{6}){0,3}(\-(\-[a-z]{6}){4})*))$/;
/**
 * Convert a valid `@p` literal string to a bigint.
 * Throws on malformed input.
 * @param  {String}  str  certified-sane `@p` literal string
 */
function parseP(str) {
  const syls = patp2syls(str);
  const syl2bin = idx => {
    return idx.toString(2).padStart(8, '0'); //NOTE  base16 isn't any faster
  };

  const addr = syls.reduce((acc, syl, idx) => idx % 2 !== 0 || syls.length === 1 ? acc + syl2bin(suffixes.indexOf(syl)) : acc + syl2bin(prefixes.indexOf(syl)), '');
  const num = BigInt('0b' + addr);
  return ob.fynd(num);
}
/**
 * Convert a valid `@p` literal string to a bigint.
 * Returns null on malformed input.
 * @param  {String}  str  `@p` literal string
 */
function parseValidP(str) {
  if (!regexP.test(str) || !validSyllables(str)) return null;
  const res = parseP(str);
  return str === renderP(res) ? res : null;
}
/**
 * Convert a number to a @p-encoded string.
 * @param  {bigint}  num
 */
function renderP(num) {
  const sxz = ob.fein(num);
  const dyx = Math.ceil(sxz.toString(16).length / 2);
  const dyy = Math.ceil(sxz.toString(16).length / 4);
  function loop(tsxz, timp, trep) {
    const log = tsxz & 0xffffn;
    const pre = prefixes[Number(log >> 8n)];
    const suf = suffixes[Number(log & 0xffn)];
    const etc = timp & 0b11 ? '-' : timp === 0 ? '' : '--';
    const res = pre + suf + etc + trep;
    return timp === dyy ? trep : loop(tsxz >> 16n, timp + 1, res);
  }
  return '~' + (dyx <= 1 ? suffixes[Number(sxz)] : loop(sxz, 0, ''));
}
//
//  utilities
//
/**
 * Validate a @p string.
 *
 * @param  {String}  str a string
 * @return  {boolean}
 */
function isValidP(str) {
  return regexP.test(str) //  general structure
  && validSyllables(str) //  valid syllables
  && str === renderP(parseP(str)); //  no leading zeroes
}
/**
 * Determine the `$rank` of a `@p` value or literal.
 * Throws on malformed input string.
 * @param   {String}  who  `@p` value or literal string
 */
function clan(who) {
  let num;
  if (typeof who === 'bigint') num = who;else num = checkedParseP(who);
  return num <= 0xffn ? 'czar' : num <= 0xffffn ? 'king' : num <= 0xffffffffn ? 'duke' : num <= 0xffffffffffffffffn ? 'earl' : 'pawn';
}
/**
 * Determine the "size" of a `@p` value or literal.
 * Throws on malformed input string.
 * @param   {String}  who  `@p` value or literal string
 */
function kind(who) {
  return rankToSize(clan(who));
}
function rankToSize(rank) {
  switch (rank) {
    case 'czar':
      return 'galaxy';
    case 'king':
      return 'star';
    case 'duke':
      return 'planet';
    case 'earl':
      return 'moon';
    case 'pawn':
      return 'comet';
  }
}
function sizeToRank(size) {
  switch (size) {
    case 'galaxy':
      return 'czar';
    case 'star':
      return 'king';
    case 'planet':
      return 'duke';
    case 'moon':
      return 'earl';
    case 'comet':
      return 'pawn';
  }
}
function sein(who) {
  let num;
  if (typeof who === 'bigint') num = who;else num = checkedParseP(who);
  let mir = clan(num);
  const res = mir === 'czar' ? num : mir === 'king' ? num & 0xffn : mir === 'duke' ? num & 0xffffn : mir === 'earl' ? num & 0xffffffffn : num & 0xffffn;
  if (typeof who === 'bigint') return res;else return renderP(res);
}
/**
 * Render short-form ship name.
 * Throws on malformed input string.
 * @param  {String | number}  who  `@p` value or literal string
 */
function cite(who) {
  let num;
  if (typeof who === 'bigint') num = who;else num = checkedParseP(who);
  if (num <= 0xffffffffn) {
    return renderP(num);
  } else if (num <= 0xffffffffffffffffn) {
    return renderP(num & 0xffffffffn).replace('-', '^');
  } else {
    return renderP(BigInt('0x' + num.toString(16).slice(0, 4))) + '_' + renderP(num & 0xffffn).slice(1);
  }
}
//
//  internals
//
function checkedParseP(str) {
  if (!isValidP(str)) throw new Error('invalid @p literal: ' + str);
  return parseP(str);
}
const pre = `
dozmarbinwansamlitsighidfidlissogdirwacsabwissib\
rigsoldopmodfoglidhopdardorlorhodfolrintogsilmir\
holpaslacrovlivdalsatlibtabhanticpidtorbolfosdot\
losdilforpilramtirwintadbicdifrocwidbisdasmidlop\
rilnardapmolsanlocnovsitnidtipsicropwitnatpanmin\
ritpodmottamtolsavposnapnopsomfinfonbanmorworsip\
ronnorbotwicsocwatdolmagpicdavbidbaltimtasmallig\
sivtagpadsaldivdactansidfabtarmonranniswolmispal\
lasdismaprabtobrollatlonnodnavfignomnibpagsopral\
bilhaddocridmocpacravripfaltodtiltinhapmicfanpat\
taclabmogsimsonpinlomrictapfirhasbosbatpochactid\
havsaplindibhosdabbitbarracparloddosbortochilmac\
tomdigfilfasmithobharmighinradmashalraglagfadtop\
mophabnilnosmilfopfamdatnoldinhatnacrisfotribhoc\
nimlarfitwalrapsarnalmoslandondanladdovrivbacpol\
laptalpitnambonrostonfodponsovnocsorlavmatmipfip\
`;
const suf = `
zodnecbudwessevpersutletfulpensytdurwepserwylsun\
rypsyxdyrnuphebpeglupdepdysputlughecryttyvsydnex\
lunmeplutseppesdelsulpedtemledtulmetwenbynhexfeb\
pyldulhetmevruttylwydtepbesdexsefwycburderneppur\
rysrebdennutsubpetrulsynregtydsupsemwynrecmegnet\
secmulnymtevwebsummutnyxrextebfushepbenmuswyxsym\
selrucdecwexsyrwetdylmynmesdetbetbeltuxtugmyrpel\
syptermebsetdutdegtexsurfeltudnuxruxrenwytnubmed\
lytdusnebrumtynseglyxpunresredfunrevrefmectedrus\
bexlebduxrynnumpyxrygryxfeptyrtustyclegnemfermer\
tenlusnussyltecmexpubrymtucfyllepdebbermughuttun\
bylsudpemdevlurdefbusbeprunmelpexdytbyttyplevmyl\
wedducfurfexnulluclennerlexrupnedlecrydlydfenwel\
nydhusrelrudneshesfetdesretdunlernyrsebhulryllud\
remlysfynwerrycsugnysnyllyndyndemluxfedsedbecmun\
lyrtesmudnytbyrsenwegfyrmurtelreptegpecnelnevfes\
`;
const prefixes = /*#__PURE__*/pre.match(/.{1,3}/g);
const suffixes = /*#__PURE__*/suf.match(/.{1,3}/g);
function patp2syls(name) {
  return name.replace(/[\^~-]/g, '').match(/.{1,3}/g) || [];
}
//  check if string contains valid syllables
function validSyllables(name) {
  const syls = patp2syls(name);
  return !(syls.length % 2 !== 0 && syls.length !== 1) // wrong length
  && syls.every((syl, index) =>
  //  invalid syllables
  index % 2 !== 0 || syls.length === 1 ? suffixes.includes(syl) : prefixes.includes(syl));
}

//TODO  investigate whether native UintArrays are more portable
//      than node Buffers
/**
 * Convert a number to a `@q`-encoded string.
 * @param   {bigint}  num
 * @return  {String}
 */
function renderQ(num) {
  //NOTE  stupid hack to work around bad node Buffer spec
  const hex = num.toString(16);
  const lex = hex.length;
  const buf = Buffer.from(hex.padStart(lex + lex % 2, '0'), 'hex');
  const chunked = buf.length % 2 !== 0 && buf.length > 1 ? [[buf[0]]].concat(chunk(Array.from(buf.slice(1)), 2)) : chunk(Array.from(buf), 2);
  const prefixName = byts => byts[1] === undefined ? suffixes[byts[0]] : prefixes[byts[0]] + suffixes[byts[1]]; //TODO  this branch unused
  const name = byts => byts[1] === undefined ? suffixes[byts[0]] : prefixes[byts[0]] + suffixes[byts[1]];
  const alg = pair => pair.length % 2 !== 0 && chunked.length > 1 ? prefixName(pair) : name(pair);
  return chunked.reduce((acc, elem) => acc + (acc === '.~' ? '' : '-') + alg(elem), '.~');
}
/**
 * Convert a `@q`-encoded string to a bigint.
 * Throws on malformed input.
 * @param   {String}  str `@q` string with leading .~
 * @return  {String}
 */
function parseQ(str) {
  const chunks = str.slice(2).split('-');
  const dec2hex = dec => {
    if (dec < 0) throw new Error('malformed @q');
    return dec.toString(16).padStart(2, '0');
  };
  const splat = chunks.map((chunk, i) => {
    let syls = splitAt(3, chunk);
    return syls[1] === '' && i === 0 //  singles only at the start
    ? dec2hex(suffixes.indexOf(syls[0])) : dec2hex(prefixes.indexOf(syls[0])) + dec2hex(suffixes.indexOf(syls[1]));
  });
  return BigInt('0x' + (str.length === 0 ? '00' : splat.join('')));
}
function parseValidQ(str) {
  try {
    const num = parseQ(str);
    return num;
  } catch (e) {
    return null;
  }
}
//
//  internals
//
function chunk(arr, size) {
  let chunk = [];
  let newArray = [chunk];
  for (let i = 0; i < arr.length; i++) {
    if (chunk.length < size) {
      chunk.push(arr[i]);
    } else {
      chunk = [arr[i]];
      newArray.push(chunk);
    }
  }
  return newArray;
}
function splitAt(index, str) {
  return [str.slice(0, index), str.slice(index)];
}

//  str: @r* format string including its leading . and ~s
function parseR(per, str) {
  per = getPrecision(per);
  return parse$1(str.slice(per.l.length), per.w, per.p);
}
function renderR(per, r) {
  per = getPrecision(per);
  return per.l + rCo(deconstruct(r, BigInt(per.w), BigInt(per.p)));
}
//
//  helpers
//
function getPrecision(per) {
  if (per === 'h') return {
    w: 5,
    p: 10,
    l: '.~~'
  };else if (per === 's') return {
    w: 8,
    p: 23,
    l: '.'
  };else if (per === 'd') return {
    w: 11,
    p: 52,
    l: '.~'
  };else if (per === 'q') return {
    w: 15,
    p: 112,
    l: '.~~~'
  };else return per;
}
function bitMask(bits) {
  return 2n ** bits - 1n;
}
//
//  parsing and construction
//
//  str: @r* format string with its leading . and ~ stripped off
//  w:   exponent bits
//  p:   mantissa bits
function parse$1(str, w, p) {
  if (str === 'nan') return makeNaN(w, p);
  if (str === 'inf') return makeInf(true, w, p);
  if (str === '-inf') return makeInf(false, w, p);
  let i = 0;
  let sign = true;
  if (str[i] === '-') {
    sign = false;
    i++;
  }
  let int = '';
  while (str[i] !== '.' && str[i] !== 'e' && str[i] !== undefined) {
    int += str[i++];
  }
  if (str[i] === '.') i++;
  let fra = '';
  while (str[i] !== 'e' && str[i] !== undefined) {
    fra += str[i++];
  }
  if (str[i] === 'e') i++;
  let expSign = true;
  if (str[i] === '-') {
    expSign = false;
    i++;
  }
  let exp = '';
  while (str[i] !== undefined) {
    exp += str[i++];
  }
  return BigInt('0b' + makeFloat(w, p, sign, int, fra, expSign, Number(exp)));
}
function makeNaN(w, p) {
  return bitMask(BigInt(w + 1)) << BigInt(p - 1);
}
function makeInf(s, w, p) {
  return bitMask(BigInt(s ? w : w + 1)) << BigInt(p);
}
//  turn into representation without exponent
function makeFloat(w, p, sign, intPart, floatPart, expSign, exp) {
  if (exp !== 0) {
    if (expSign) {
      intPart = intPart + floatPart.padEnd(exp, '0').slice(0, exp);
      floatPart = floatPart.slice(exp);
    } else {
      floatPart = intPart.padStart(exp, '0').slice(-exp) + floatPart;
      intPart = intPart.slice(0, -exp);
    }
  }
  return construct(p, w, sign, BigInt(intPart), BigInt(floatPart.length), BigInt(floatPart));
}
//NOTE  modified from an encodeFloat() written by by Jonas Raoni Soares Silva,
//      made to operate on (big)integers, without using js's float logic.
//      http://jsfromhell.com/classes/binary-parser
//      (yes, this code is vaguely deranged. but it works!)
function construct(precisionBits, exponentBits, sign, intPart, floatDits, floatPart) {
  //REVIEW  when do we trigger this?
  //        inputs representing nrs too large for exponentBits?
  //        inputs with precision we can't match?
  //        add tests for those cases! should match stdlib result.
  function exceed(x) {
    console.warn(x);
    return 1;
  }
  const bias = 2 ** (exponentBits - 1) - 1,
    minExp = -bias + 1,
    maxExp = bias,
    minUnnormExp = minExp - precisionBits,
    len = 2 * bias + 1 + precisionBits + 3,
    bin = new Array(len),
    denom = 10n ** floatDits;
  var exp = 0,
    signal = !sign,
    i,
    lastBit,
    rounded,
    j,
    result,
    n;
  //  zero-initialize the bit-array
  for (i = len; i; bin[--i] = 0);
  //  integral into bits
  for (i = bias + 2; intPart && i; bin[--i] = intPart & 1n, intPart = intPart >> 1n);
  //  fractional into bits
  for (i = bias + 1; floatPart > 0n && i < len; (bin[++i] = (floatPart *= 2n) >= denom ? 1 : 0) && (floatPart = floatPart - denom));
  //  walk cursor (i) to first 1-bit.
  for (i = -1; ++i < len && !bin[i];);
  //  round if needed
  if (bin[(lastBit = precisionBits - 1 + (i = (exp = bias + 1 - i) >= minExp && exp <= maxExp ? i + 1 : bias + 1 - (exp = minExp - 1))) + 1]) {
    if (!(rounded = bin[lastBit])) for (j = lastBit + 2; !rounded && j < len; rounded = bin[j++]);
    for (j = lastBit + 1; rounded && --j >= 0; (bin[j] = (!bin[j] ? 1 : 0) - 0) && (rounded = 0));
  }
  //  walk cursor (i) to first/next(??) 1-bit
  for (i = i - 2 < 0 ? -1 : i - 3; ++i < len && !bin[i];);
  //  set exponent, throwing on under- and overflows
  (exp = bias + 1 - i) >= minExp && exp <= maxExp ? ++i : exp < minExp && (exp != bias + 1 - len && exp < minUnnormExp && exceed('r.construct underflow'), i = bias + 1 - (exp = minExp - 1));
  intPart && (exceed(intPart ? 'r.construct overflow' : 'r.construct'), exp = maxExp + 1, i = bias + 2);
  //  exponent into bits
  for (n = Math.abs(exp + bias), j = exponentBits + 1, result = ''; --j; result = (n & 1) + result, n = n >>= 1);
  //  final serialization: sign + exponent + mantissa
  return (signal ? '1' : '0') + result + bin.slice(i, i + precisionBits).join('');
}
//NOTE  not _exactly_ like +r-co due to dragon4() outExponent semantics.
//      if we copy +r-co logic exactly we off-by-one all over the place.
function rCo(a) {
  if (a.t === 'n') return 'nan';
  if (a.t === 'i') return a.s ? 'inf' : '-inf';
  let e;
  if (a.e - 4 > 0) {
    //  12000 -> 12e3 e>+2
    e = 1;
  } else if (a.e + 2 < 0) {
    //  0.001 -> 1e-3 e<-2
    e = 1;
  } else {
    //  1.234e2 -> '.'@3 -> 123 .4
    e = a.e + 1;
    a.e = 0;
  }
  return (a.s ? '' : '-') + edCo(e, a.a) + (a.e === 0 ? '' : 'e' + a.e.toString());
}
function edCo(exp, int) {
  const dig = Math.abs(exp);
  if (exp <= 0) {
    return '0.' + ''.padEnd(dig, '0') + int;
  } else {
    const len = int.length;
    if (dig >= len) return int + ''.padEnd(dig - len, '0');
    return int.slice(0, dig) + '.' + int.slice(dig);
  }
}
//NOTE  the deconstruct() and dragon4() below are ported from Ryan Juckett's
//      PrintFloat32() and Dragon4() respectively. its general structure is
//      copied one-to-one and comments are preserved, but we got to drop some
//      logic due to having access to native bigints. see his post series for
//      a good walkthrough of the underlying algorithm and its implementation,
//      as well as pointers to additional references.
//      https://www.ryanjuckett.com/printing-floating-point-numbers/
//      we only use one of the cutoff modes, but have maintained support for
//      the others for completeness' sake.
//  deconstruct(): binary float to $dn structure (+drg:ff)
function deconstruct(float, exponentBits, precisionBits) {
  //  deconstruct the value into its components
  const mantissaMask = bitMask(precisionBits);
  const exponentMask = bitMask(exponentBits);
  const floatMantissa = float & mantissaMask;
  const floatExponent = float >> BigInt(precisionBits) & exponentMask;
  const sign = (float >> BigInt(exponentBits + precisionBits) & 1n) === 0n;
  //  transform the components into the values they represent
  let mantissa, exponent, mantissaHighBitIdx, unequalMargins;
  if (floatExponent === exponentMask) {
    //  specials
    if (floatMantissa === 0n) return {
      t: 'i',
      s: sign
    }; //  infinity
    return {
      t: 'n'
    }; //  nan
  } else if (floatExponent !== 0n) {
    //  normalized
    //  the floating point equation is:
    //    value = (1 + mantissa/2^23) * 2 ^ (exponent-127)
    //  we convert the integer equation by factoring a 2^23 out of the exponent
    //    value = (1 + mantissa/2^23) * 2^23 * 2 ^ (exponent-127-23)
    //    value = (2^23 + mantissa) * 2 ^ (exponent-127-23)
    //  because of the implied 1 in front of the mantissa we have 24 bits of precision
    //    m = (2^23 + mantissa)
    //    e = (exponent-127-23)
    mantissa = 1n << BigInt(precisionBits) | floatMantissa;
    exponent = floatExponent - (2n ** (exponentBits - 1n) - 1n) - precisionBits;
    mantissaHighBitIdx = Number(precisionBits);
    unequalMargins = floatExponent !== 1n && floatMantissa === 0n;
  } else {
    //  denormalized
    //  the floating point equation is:
    //    value = (mantissa/2^23) * 2 ^ (1-127)
    //  we convert the integer equation by factoring a 2^23 out of the exponent
    //    value = (mantissa/2^23) * 2^23 * 2 ^ (1-127-23)
    //    value = mantissa * 2 ^ (1-127-23)
    //  we have up to 23 bits of precision
    //    m = (mantissa)
    //    e = (1-127-23)
    mantissa = floatMantissa;
    exponent = 1n - (2n ** (exponentBits - 1n) - 1n) - precisionBits;
    mantissaHighBitIdx = mantissa.toString(2).length - 1; //  poor man's log2
    unequalMargins = false;
  }
  const buf = (2n ** precisionBits).toString(10).length + 1;
  const res = dragon4(mantissa, Number(exponent), mantissaHighBitIdx, unequalMargins, 'unique', 0, buf);
  return {
    t: 'd',
    s: sign,
    e: res.outExponent,
    a: res.digits
  };
}
//  dragon4(): binary float to decimal digits
//
//    like +drg:fl (but with slightly different outExponent semantics)
//
//    mantissa:           value significand
//    exponent:           value exponent in base 2
//    mantissaHighBitIdx: highest set mantissa bit index
//    hasUnequalMargins:  is the high margin twice the low margin
//    cutoffMode:         'unique' | 'totalLength' | 'fractionLength'
//    cutoffNumber:       cutoff parameter for the selected mode
//    bufferSize:         max output digits
//
//    digits:             printed digits
//    outExponent:        exponent of the first digit printed
//
function dragon4(mantissa, exponent, mantissaHighBitIdx, hasUnequalMargins, cutoffMode, cutoffNumber, bufferSize) {
  const bexponent = BigInt(exponent);
  let pCurDigit = 0; //  pointer into output buffer (digit string index)
  let outBuffer = new Array(bufferSize).fill('0');
  let outExponent = 0;
  //  if mantissa is zero, output "0"
  if (mantissa === 0n) {
    outBuffer[0] = '0';
    outExponent = 0;
    return {
      digits: outBuffer.slice(0, 1).join(''),
      outExponent
    };
  }
  //  compute the initial state in integral form such that:
  //  value     = scaledValue / scale
  //  marginLow = scaledMarginLow / scale
  let scale; //  positive scale applied to value and margin such
  //  that they can be represented as whole numbers
  let scaledValue; //  scale * mantissa
  let scaledMarginLow; //  scale * 0.5 * (distance between this floating-
  //  point number and its immediate lower value)
  //  for normalized IEEE floating point values, each time the exponent is
  //  incremented the margin also doubles. That creates a subset of transition
  //  numbers where the high margin is twice the size of the low margin.
  let scaledMarginHigh;
  if (hasUnequalMargins) {
    if (exponent > 0) {
      //  no fractional component
      //  1. expand the input value by multiplying out the mantissa and exponent.
      //     this represents the input value in its whole number representation.
      //  2. apply an additional scale of 2 such that later comparisons against
      //     the margin values are simplified.
      //  3. set the margin value to the lowest mantissa bit's scale.
      scaledValue = 4n * mantissa;
      scaledValue <<= bexponent; //  2 * 2 * mantissa*2^exponent
      scale = 4n; //  2 * 2 * 1
      scaledMarginLow = 1n << bexponent; //  2 * 2^(exponent-1)
      scaledMarginHigh = 1n << bexponent + 1n; //  2 * 2 * 2^(exponent-1)
    } else {
      //  fractional component
      //  in order to track the mantissa data as an integer, we store it as is
      //  with a large scale
      scaledValue = 4n * mantissa; //  2 * 2 * mantissa
      scale = 1n << -bexponent + 2n; //  2 * 2 * 2^(-exponent)
      scaledMarginLow = 1n; //  2 * 2^(-1)
      scaledMarginHigh = 2n; //  2 * 2 * 2^(-1)
    }
  } else {
    if (exponent > 0) {
      //  no fractional component
      //  1. expand the input value by multiplying out the mantissa and exponent.
      //     this represents the input value in its whole number representation.
      //  2. apply an additional scale of 2 such that later comparisons against
      //     the margin values are simplified.
      //  3. set the margin value to the lowest mantissa bit's scale.
      scaledValue = 2n * mantissa;
      scaledValue <<= bexponent; //  2 * mantissa*2^exponent
      scale = 2n; //  2 * 1
      scaledMarginLow = 1n << bexponent; //  2 * 2^(exponent-1)
      scaledMarginHigh = scaledMarginLow;
    } else {
      //  fractional component
      //  in order to track the mantissa data as an integer, we store it as is
      //  with a large scale
      scaledValue = 2n * mantissa; //  2 * mantissa
      scale = 1n << BigInt(-exponent + 1); //  2 * 2^(-exponent)
      scaledMarginLow = 1n; //  2 * 2^(-1)
      scaledMarginHigh = scaledMarginLow;
    }
  }
  //  compute an estimate for digitExponent that will be correct or undershoot
  //  by one. this optimization is based on the paper "Printing Floating-Point
  //  Numbers Quickly and Accurately" by Burger and Dybvig.
  //  http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.72.4656&rep=rep1&type=pdf
  //  we perform an additional subtraction of 0.69 to increase the frequency of
  //  a failed estimate because that lets us take a faster branch in the code.
  //  0.69 is chosen because 0.69 + log10(2) is less than one by a reasonable
  //  epsilon that will account for any floating point error.
  //  we want to set digitExponent to floor(log10(v)) + 1
  //  v = mantissa*2^exponent
  //  log2(v) = log2(mantissa) + exponent;
  //  log10(v) = log2(v) * log10(2)
  //  floor(log2(v)) = mantissaHighBitIdx + exponent;
  //  log10(v) - log10(2) < (mantissaHighBitIdx + exponent) * log10(2) <= log10(v)
  //  log10(v) < (mantissaHighBitIdx + exponent) * log10(2) + log10(2) <= log10(v) + log10(2)
  //  floor( log10(v) ) < ceil( (mantissaHighBitIdx + exponent) * log10(2) ) <= floor( log10(v) ) + 1
  //NOTE  loses precision! wants a 64-bit float. but seems precise enough...
  const log10_2 = 0.30102999566398119521373889472449;
  let digitExponent = Math.ceil((mantissaHighBitIdx + exponent) * log10_2 - 0.69);
  //  if the digit exponent is smaller than the smallest desired digit for
  //  fractional cutoff, pull the digit back into legal range at which point we
  //  will round to the appropriate value.
  //  note that while our value for digitExponent is still an estimate, this is
  //  safe because it only increases the number. this will either correct
  //  digitExponent to an accurate value or it will clamp it above the accurate
  //  value.
  if (cutoffMode === 'fractionLength' && digitExponent <= -cutoffNumber) {
    digitExponent = -cutoffNumber + 1;
  }
  //  scale adjustment for digit exponent, divide value by 10^digitExponent
  if (digitExponent > 0) {
    //  the exponent is positive creating a division so we multiply up the scale
    scale *= BigInt(10) ** BigInt(digitExponent);
  } else if (digitExponent < 0) {
    //  the exponent is negative creating a multiplication so we multiply
    //  up the scaledValue, scaledMarginLow and scaledMarginHigh
    const pow10 = BigInt(10) ** BigInt(-digitExponent);
    scaledValue *= pow10;
    scaledMarginLow *= pow10;
    if (scaledMarginHigh !== scaledMarginLow) {
      scaledMarginHigh *= scaledMarginLow;
    }
  }
  //  if (value >= 1), our estimate for digitExponent was too low
  if (scaledValue >= scale) {
    //  the exponent estimate was incorrect. increment the exponent and don't
    //  perform the premultiply needed for the first loop iteration.
    digitExponent += 1;
  } else {
    //  the exponent estimate was correct. multiply larger by the output base
    //  to prepare for the first loop iteration.
    scaledValue *= 10n;
    scaledMarginLow *= 10n;
    if (scaledMarginHigh !== scaledMarginLow) scaledMarginHigh *= 10n;
  }
  //  compute the cutoff exponent (the exponent of the final digit to print).
  //  default to the maximum size of the output buffer.
  let cutoffExponent = digitExponent - bufferSize;
  if (cutoffMode === 'totalLength') {
    let desired = digitExponent - cutoffNumber;
    if (desired > cutoffExponent) cutoffExponent = desired;
  } else if (cutoffMode === 'fractionLength') {
    let desired = -cutoffNumber;
    if (desired > cutoffExponent) cutoffExponent = desired;
  }
  //  output the exponent of the first digit we will print
  outExponent = digitExponent - 1;
  //NOTE  thanks to native bigints, no bit block normalization needed
  //  these values are used to inspect why the print loop terminated so we can properly
  //  round the final digit.
  let low = false; //  did the value get within marginLow distance from zero
  let high = false; //  did the value get within marginHigh distance from one
  let outputDigit = 0; //  current digit being output
  if (cutoffMode === 'unique') {
    //  for the unique cutoff mode, we will try to print until we have reached
    //  a level of precision that uniquely distinguishes this value from its
    //  neighbors. if we run out of space in the output buffer, we exit early.
    while (true) {
      digitExponent -= 1;
      //  extract the digit
      outputDigit = Number(scaledValue / scale);
      scaledValue = scaledValue % scale;
      //  update the high end of the value
      let scaledValueHigh = scaledValue + scaledMarginHigh;
      //  stop looping if we are far enough away from our neighboring values
      //  or if we have reached the cutoff digit
      low = scaledValue < scaledMarginLow;
      high = scaledValueHigh > scale;
      if (low || high || digitExponent === cutoffExponent) break;
      //  store the output digit
      outBuffer[pCurDigit] = String.fromCharCode('0'.charCodeAt(0) + outputDigit);
      pCurDigit += 1;
      //  mulitply larger by the output base
      scaledValue *= 10n;
      scaledMarginLow *= 10n;
      if (scaledMarginHigh !== scaledMarginLow) scaledMarginHigh *= 10n;
    }
  } else {
    //  for length based cutoff modes, we will try to print until we have
    //  exhausted all precision (i.e. all remaining digits are zeros) or until
    //  we reach the desired cutoff digit.
    low = false;
    high = false;
    while (true) {
      digitExponent -= 1;
      //  extract the digit
      outputDigit = Number(scaledValue / scale);
      scaledValue = scaledValue % scale;
      if (scaledValue === 0n || digitExponent === cutoffExponent) break;
      //  store the output digit
      outBuffer[pCurDigit] = String.fromCharCode('0'.charCodeAt(0) + outputDigit);
      pCurDigit += 1;
      //  multiply larger by the output base
      scaledValue *= 10n;
    }
  }
  //  round off the final digit.
  //  default to rounding down if value got too close to 0
  let roundDown = low;
  if (low === high) {
    //  legal to round up and down
    //  round to the closest digit by comparing value with 0.5. to do this we
    //  need to convert the inequality to large integer values.
    //  compare( value, 0.5 )
    //  compare( scale * value, scale * 0.5 )
    //  compare( 2 * scale * value, scale )
    scaledValue *= 2n;
    let compare = scaledValue < scale ? -1 : scaledValue > scale ? 1 : 0;
    roundDown = compare < 0;
    //  if we are directly in the middle, round towards the even digit
    //  (i.e. IEEE rouding rules)
    if (compare === 0) roundDown = (outputDigit & 1) === 0;
  }
  //  print the rounded digit
  if (roundDown) {
    outBuffer[pCurDigit] = String.fromCharCode('0'.charCodeAt(0) + outputDigit);
    pCurDigit += 1;
  } else {
    //  handle rounding up
    if (outputDigit === 9) {
      //  find the first non-nine prior digit
      while (true) {
        if (pCurDigit === 0) {
          //  first digit
          //  output 1 at the next highest exponent
          outBuffer[pCurDigit] = '1';
          pCurDigit += 1;
          outExponent += 1;
          break;
        }
        pCurDigit -= 1;
        if (outBuffer[pCurDigit] !== '9') {
          //  increment the digit
          outBuffer[pCurDigit] = String.fromCharCode(outBuffer[pCurDigit].charCodeAt(0) + 1);
          pCurDigit += 1;
          break;
        }
      }
    } else {
      //  values in the range [0,8] can perform a simple round up
      outBuffer[pCurDigit] = String.fromCharCode('0'.charCodeAt(0) + outputDigit + 1);
      pCurDigit += 1;
    }
  }
  //  trim trailing zeroes, produce output
  const digits = outBuffer.slice(0, pCurDigit).join('');
  return {
    digits,
    outExponent
  };
}

//  parse: deserialize from atom literal strings
function integerRegex(a, b, c, d, e) {
  if (e === void 0) {
    e = false;
  }
  const pre = d === 0 ? b : `${b}${c}{0,${d - 1}}`;
  const aft = d === 0 ? `${c}*` : `(\\.${c}{${d}})*`;
  return new RegExp(`^${e ? '\\-\\-?' : ''}${a}(0|${pre}${aft})$`);
}
function floatRegex(a) {
  return new RegExp(`^\\.~{${a}}(nan|\\-?(inf|(0|[1-9][0-9]*)(\\.[0-9]+)?(e\\-?(0|[1-9][0-9]*))?))$`);
}
//TODO  rewrite with eye towards capturing groups?
const regex = {
  'c': /^~\-((~[0-9a-fA-F]+\.)|(~[~\.])|[0-9a-z\-\._])*$/,
  'da': /^~(0|[1-9][0-9]*)\-?\.0*([1-9]|1[0-2])\.0*[1-9][0-9]*(\.\.([0-9]+)\.([0-9]+)\.([0-9]+)(\.(\.[0-9a-f]{4})+)?)?$/,
  'dr': /^~((d|h|m|s)(0|[1-9][0-9]*))(\.(d|h|m|s)(0|[1-9][0-9]*))*(\.(\.[0-9a-f]{4})+)?$/,
  'f': /^\.(y|n)$/,
  'if': /^(\.(0|[1-9][0-9]{0,2})){4}$/,
  'is': /^(\.(0|[1-9a-fA-F][0-9a-fA-F]{0,3})){8}$/,
  'n': /^~$/,
  'p': regexP,
  'q': /^\.~(([a-z]{3}|[a-z]{6})(\-[a-z]{6})*)$/,
  'rd': /*#__PURE__*/floatRegex(1),
  'rh': /*#__PURE__*/floatRegex(2),
  'rq': /*#__PURE__*/floatRegex(3),
  'rs': /*#__PURE__*/floatRegex(0),
  'sb': /*#__PURE__*/integerRegex('0b', '1', '[01]', 4, true),
  'sd': /*#__PURE__*/integerRegex('', '[1-9]', '[0-9]', 3, true),
  'si': /*#__PURE__*/integerRegex('0i', '[1-9]', '[0-9]', 0, true),
  'sv': /*#__PURE__*/integerRegex('0v', '[1-9a-v]', '[0-9a-v]', 5, true),
  'sw': /*#__PURE__*/integerRegex('0w', '[1-9a-zA-Z~-]', '[0-9a-zA-Z~-]', 5, true),
  'sx': /*#__PURE__*/integerRegex('0x', '[1-9a-f]', '[0-9a-f]', 4, true),
  't': /^~~((~[0-9a-fA-F]+\.)|(~[~\.])|[0-9a-z\-\._])*$/,
  'ta': /^~\.[0-9a-z\-\.~_]*$/,
  'tas': /^[a-z][a-z0-9\-]*$/,
  'ub': /*#__PURE__*/integerRegex('0b', '1', '[01]', 4),
  'ud': /*#__PURE__*/integerRegex('', '[1-9]', '[0-9]', 3),
  'ui': /*#__PURE__*/integerRegex('0i', '[1-9]', '[0-9]', 0),
  'uv': /*#__PURE__*/integerRegex('0v', '[1-9a-v]', '[0-9a-v]', 5),
  'uw': /*#__PURE__*/integerRegex('0w', '[1-9a-zA-Z~-]', '[0-9a-zA-Z~-]', 5),
  'ux': /*#__PURE__*/integerRegex('0x', '[1-9a-f]', '[0-9a-f]', 4)
};
//  parse(): slav()
//  slav(): slaw() but throwing on failure
//
const parse = slav;
function slav(aura, str) {
  const out = slaw(aura, str);
  if (!out) {
    throw new Error('slav: failed to parse @' + aura + ' from string: ' + str);
  }
  return out;
}
//  tryParse(): slaw()
//  slaw(): parse string as specific aura, null if that fails
//
const tryParse = slaw;
function slaw(aura, str) {
  //  if the aura has a regex, test with that first
  //TODO  does double work with checks in nuck?
  //
  if (aura in regex && !regex[aura].test(str)) {
    return null;
  }
  //  proceed into parsing the string into a coin,
  //  producing a result if the aura matches
  //
  //TODO  further short-circuit based on aura?
  const coin = nuck(str);
  if (coin && coin.type === 'dime' && coin.aura === aura) {
    return coin.atom;
  } else {
    return null;
  }
}
function valid(aura, str) {
  return slaw(aura, str) !== null;
}
//  nuck(): parse string into coin, or null if that fails
//
function nuck(str) {
  if (str === '') return null;
  //  narrow options down by the first character, before doing regex tests
  //  and trying to parse for real
  //
  const c = str[0];
  if (c >= 'a' && c <= 'z') {
    //  "sym"
    if (regex['tas'].test(str)) {
      return {
        type: 'dime',
        aura: 'tas',
        atom: stringToCord(str)
      };
    } else {
      return null;
    }
  } else if (c >= '0' && c <= '9') {
    //  "bisk"
    const dim = bisk(str);
    if (!dim) {
      return null;
    } else {
      return {
        type: 'dime',
        ...dim
      };
    }
  } else if (c === '-') {
    //  "tash"
    let pos = true;
    if (str[1] == '-') {
      str = str.slice(2);
    } else {
      str = str.slice(1);
      pos = false;
    }
    const dim = bisk(str);
    if (dim) {
      // `@s`?:(pos (mul 2 b) ?:(=(0 b) 0 +((mul 2 (dec b)))))
      if (pos) {
        dim.atom = 2n * dim.atom;
      } else if (dim.atom !== 0n) {
        dim.atom = 1n + 2n * (dim.atom - 1n);
      }
      //NOTE  assumes bisk always returns u* auras
      return {
        type: 'dime',
        aura: dim.aura.replace('u', 's'),
        atom: dim.atom
      };
    } else {
      return null;
    }
  } else if (c === '.') {
    //  "perd", "zust"
    //NOTE  doesn't match stdlib parsing order, but they're easy early-outs
    if (str === '.y') {
      return {
        type: 'dime',
        aura: 'f',
        atom: 0n
      };
    } else if (str === '.n') {
      return {
        type: 'dime',
        aura: 'f',
        atom: 1n
      };
    } else
      //REVIEW  entering the branch this way assumes regexes for sequentially-tested auras don't overlap...
      //        going down the list of options this way matches hoon parser behavior the closest, but is slow for the "miss" case.
      //        could be optimized by hard-returning if the regex fails for cases where the lead char is unique.
      //        should probably run some perf tests
      if (regex['is'].test(str)) {
        const value = str.slice(1).split('.').reduce((a, v) => a + v.padStart(4, '0'), '');
        return {
          type: 'dime',
          aura: 'is',
          atom: BigInt('0x' + value)
        };
      } else if (regex['if'].test(str)) {
        const value = str.slice(1).split('.').reduce((a, v, i) => a + (BigInt(v) << BigInt(8 * (3 - i))), 0n);
        return {
          type: 'dime',
          aura: 'if',
          atom: value
        };
      } else if (str[1] === '~' && (regex['rd'].test(str) || regex['rh'].test(str) || regex['rq'].test(str)) || regex['rs'].test(str)) {
        //  "royl"
        let precision = 0;
        while (str[precision + 1] === '~') precision++;
        let aura;
        switch (precision) {
          case 0:
            aura = 'rs';
            break;
          case 1:
            aura = 'rd';
            break;
          case 2:
            aura = 'rh';
            break;
          case 3:
            aura = 'rq';
            break;
          default:
            throw new Error('parsing invalid @r*');
        }
        return {
          type: 'dime',
          aura,
          atom: parseR(aura[1], str)
        };
      } else if (str[1] === '~' && regex['q'].test(str)) {
        const num = parseValidQ(str);
        if (num === null) return null;
        return {
          type: 'dime',
          aura: 'q',
          atom: num
        };
      } else if (str[1] === '_' && /^\.(_([0-9a-zA-Z\-\.]|~\-|~~)+)*__$/.test(str)) {
        //  "nusk"
        const coins = str.slice(1, -2).split('_').slice(1).map(s => {
          //NOTE  real +wick produces null for strings w/ other ~ chars,
          //      but the regex above already excludes those
          s = s.replaceAll('~-', '_').replaceAll('~~', '~'); //  "wick"
          return nuck(s);
        });
        if (coins.some(c => c === null)) {
          return null;
        } else {
          return {
            type: 'many',
            list: coins
          };
        }
      }
    return null;
  } else if (c === '~') {
    if (str === '~') {
      return {
        type: 'dime',
        aura: 'n',
        atom: 0n
      };
    } else {
      //  "twid"
      if (regex['da'].test(str)) {
        return {
          type: 'dime',
          aura: 'da',
          atom: parseDa(str)
        };
      } else if (regex['dr'].test(str)) {
        return {
          type: 'dime',
          aura: 'dr',
          atom: parseDr(str)
        };
      } else if (regex['p'].test(str)) {
        //NOTE  this still does the regex check twice...
        const res = parseValidP(str);
        if (res === null) return null;
        return {
          type: 'dime',
          aura: 'p',
          atom: res
        };
      } else
        //TODO  test if these single-character checks affect performance or no,
        //      or if we want to move them further up, etc.
        if (str[1] === '.' && regex['ta'].test(str)) {
          return {
            type: 'dime',
            aura: 'ta',
            atom: stringToCord(str.slice(2))
          };
        } else if (str[1] === '~' && regex['t'].test(str)) {
          return {
            type: 'dime',
            aura: 't',
            atom: stringToCord(decodeString(str.slice(2)))
          };
        } else if (str[1] === '-' && regex['c'].test(str)) {
          //TODO  cheeky! this doesn't support the full range of inputs that the
          //      hoon stdlib supports, but should work for all sane inputs.
          //      no guarantees about behavior for insane inputs...
          if (/^~\-~[0-9a-f]+\.$/.test(str)) {
            return {
              type: 'dime',
              aura: 'c',
              atom: BigInt('0x' + str.slice(3, -1))
            };
          }
          return {
            type: 'dime',
            aura: 'c',
            atom: stringToCord(decodeString(str.slice(2)))
          };
        }
    }
    if (str[1] === '0' && /^~0[0-9a-v]+$/.test(str)) {
      return {
        type: 'blob',
        jam: slurp(5, UV_ALPHABET, str.slice(2))
      };
    }
    return null;
  }
  return null;
}
//  bisk(): parse string into dime of integer aura, or null if that fails
//
function bisk(str) {
  switch (str.slice(0, 2)) {
    case '0b':
      //  "bay"
      if (regex['ub'].test(str)) {
        return {
          aura: 'ub',
          atom: BigInt(str.replaceAll('.', ''))
        };
      } else {
        return null;
      }
    case '0c':
      //  "fim"
      //TODO  support base58check
      console.log('aura-js: @uc parsing unsupported (bisk)');
      return null;
    case '0i':
      //  "dim"
      if (regex['ui'].test(str)) {
        return {
          aura: 'ui',
          atom: BigInt(str.slice(2))
        };
      } else {
        return null;
      }
    case '0x':
      //  "hex"
      if (regex['ux'].test(str)) {
        return {
          aura: 'ux',
          atom: BigInt(str.replaceAll('.', ''))
        };
      } else {
        return null;
      }
    case '0v':
      //  "viz"
      if (regex['uv'].test(str)) {
        return {
          aura: 'uv',
          atom: slurp(5, UV_ALPHABET, str.slice(2))
        };
      } else {
        return null;
      }
    case '0w':
      //  "wiz"
      if (regex['uw'].test(str)) {
        return {
          aura: 'uw',
          atom: slurp(6, UW_ALPHABET$1, str.slice(2))
        };
      } else {
        return null;
      }
    default:
      //  "dem"
      if (regex['ud'].test(str)) {
        return {
          aura: 'ud',
          atom: BigInt(str.replaceAll('.', ''))
        };
      } else {
        return null;
      }
  }
}
//  decodeString(): decode string from @ta-safe format
//
//    using logic from +woad.
//    for example, '~.some.~43.hars~21.' becomes 'some Chars!'
//    assumes
//
function decodeString(str) {
  let out = '';
  let i = 0;
  while (i < str.length) {
    switch (str[i]) {
      case '.':
        out = out + ' ';
        i++;
        continue;
      case '~':
        switch (str[++i]) {
          case '~':
            out = out + '~';
            i++;
            continue;
          case '.':
            out = out + '.';
            i++;
            continue;
          default:
            let char = 0;
            do {
              char = char << 4 | Number.parseInt(str[i++], 16);
            } while (str[i] !== '.');
            out = out + String.fromCodePoint(char);
            i++;
            continue;
        }
      default:
        out = out + str[i++];
        continue;
    }
  }
  return out;
}
function stringToCord(str) {
  return bytesToBigint(new TextEncoder().encode(str));
}
const UW_ALPHABET$1 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-~';
const UV_ALPHABET = '0123456789abcdefghijklmnopqrstuv';
function slurp(bits, alphabet, str) {
  let out = 0n;
  const bbits = BigInt(bits);
  while (str !== '') {
    if (str[0] !== '.') {
      out = (out << bbits) + BigInt(alphabet.indexOf(str[0]));
    }
    str = str.slice(1);
  }
  return out;
}
//REVIEW  should the reversal happen here or at callsites? depends on what endianness is idiomatic to js?
function bytesToBigint(bytes) {
  if (bytes.length === 0) return 0n;
  //  if we have node's Buffer available, use it, it's wicked fast.
  //  otherwise, constructing the hex string "by hand" and instantiating
  //  a bigint from that is the fastest thing we can do.
  //
  if (typeof Buffer !== 'undefined') return BigInt('0x' + Buffer.from(bytes.reverse()).toString('hex'));
  let byt,
    parts = [];
  for (var i = bytes.length - 1; i >= 0; --i) {
    byt = bytes[i];
    parts.push(byt < 16 ? "0" + byt.toString(16) : byt.toString(16));
  }
  const num = BigInt('0x' + parts.join(''));
  return num;
}

//  render: serialize into atom literal strings
//  render(): scot()
//  scot(): render atom as specific aura
//
const render = scot;
function scot(aura, atom) {
  return rend({
    type: 'dime',
    aura,
    atom
  });
}
//  rend(): render coin into string
//
function rend(coin) {
  switch (coin.type) {
    case 'blob':
      return '~0' + coin.jam.toString(32);
    case 'many':
      return '.' + coin.list.reduce((acc, item) => {
        return acc + '_' + wack(rend(item));
      }, '') + '__';
    case 'dime':
      switch (coin.aura[0]) {
        case 'c':
          //  this short-circuits the (wood (tuft atom)) calls that
          //  hoon.hoon does, leaning on wood only for ascii characters,
          //  and going straight to encoded representation for anything else.
          //  (otherwise we'd need to stringify the utf-32 bytes, ouch.)
          if (coin.atom < 0x7fn) return '~-' + encodeString(String.fromCharCode(Number(coin.atom)));else return '~-~' + coin.atom.toString(16) + '.';
        case 'd':
          switch (coin.aura[1]) {
            case 'a':
              return renderDa(coin.atom);
            case 'r':
              return renderDr(coin.atom);
            default:
              return zco(coin.atom);
          }
        case 'f':
          switch (coin.atom) {
            case 0n:
              return '.y';
            case 1n:
              return '.n';
            default:
              return zco(coin.atom);
          }
        case 'n':
          return '~';
        case 'i':
          switch (coin.aura[1]) {
            case 'f':
              return '.' + spite(coin.atom, 1, 4, 10);
            case 's':
              return '.' + spite(coin.atom, 2, 8, 16);
            default:
              return zco(coin.atom);
          }
        case 'p':
          return renderP(coin.atom);
        case 'q':
          return renderQ(coin.atom);
        case 'r':
          switch (coin.aura[1]) {
            case 'd':
              return renderR('d', coin.atom);
            case 'h':
              return renderR('h', coin.atom);
            case 'q':
              return renderR('q', coin.atom);
            case 's':
              return renderR('s', coin.atom);
            default:
              return zco(coin.atom);
          }
        case 'u':
          switch (coin.aura[1]) {
            case 'c':
              throw new Error('aura-js: @uc rendering unsupported');
            //TODO;
            case 'b':
              return '0b' + split(coin.atom.toString(2), 4);
            case 'i':
              return '0i' + dco(1, coin.atom);
            case 'x':
              return '0x' + split(coin.atom.toString(16), 4);
            case 'v':
              return '0v' + split(coin.atom.toString(32), 5);
            case 'w':
              return '0w' + split(blend(6, UW_ALPHABET, coin.atom), 5);
            default:
              return split(coin.atom.toString(10), 3);
          }
        case 's':
          const end = coin.atom & 1n;
          coin.atom = end + (coin.atom >> 1n);
          coin.aura = coin.aura.replace('s', 'u');
          return (end === 0n ? '--' : '-') + rend(coin);
        case 't':
          if (coin.aura[1] === 'a') {
            if (coin.aura[2] === 's') {
              return cordToString(coin.atom);
            } else {
              return '~.' + cordToString(coin.atom);
            }
          } else {
            return '~~' + encodeString(cordToString(coin.atom));
          }
        default:
          return zco(coin.atom);
      }
  }
}
function dco(lent, atom) {
  return atom.toString(10).padStart(lent, '0');
}
function xco(lent, atom) {
  return atom.toString(16).padStart(lent, '0');
}
function zco(atom) {
  return '0x' + xco(1, atom);
}
function wack(str) {
  return str.replaceAll('~', '~~').replaceAll('_', '~-');
}
//  encodeString(): encode string into @ta-safe format
//
//    using logic from +wood.
//    for example, 'some Chars!' becomes '~.some.~43.hars~21.'
//    this is url-safe encoding for arbitrary strings.
//
function encodeString(string) {
  let out = '';
  for (let i = 0; i < string.length; i += 1) {
    const char = string[i];
    let add = '';
    switch (char) {
      case ' ':
        add = '.';
        break;
      case '.':
        add = '~.';
        break;
      case '~':
        add = '~~';
        break;
      default:
        {
          const codePoint = string.codePointAt(i);
          if (!codePoint) break;
          //  js strings are encoded in UTF-16, so 16 bits per character.
          //  codePointAt() reads a _codepoint_ at a character index, and may
          //  consume up to two js string characters to do so, in the case of
          //  16 bit surrogate pseudo-characters. here we detect that case, so
          //  we can advance the cursor to skip past the additional character.
          if (codePoint > 0xffff) i += 1;
          if (codePoint >= 97 && codePoint <= 122 ||
          // a-z
          codePoint >= 48 && codePoint <= 57 ||
          // 0-9
          char === '-') {
            add = char;
          } else {
            add = `~${codePoint.toString(16)}.`;
          }
        }
    }
    out += add;
  }
  return out;
}
const UW_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-~';
function blend(bits, alphabet, atom) {
  if (atom === 0n) return alphabet[0];
  let out = '';
  const bbits = BigInt(bits);
  while (atom !== 0n) {
    out = alphabet[Number(BigInt.asUintN(bits, atom))] + out;
    atom = atom >> bbits;
  }
  return out;
}
function split(str, group) {
  //  insert '.' every $group characters counting from the end,
  //  while avoiding putting a leading dot at the start
  return str.replace(new RegExp(`(?=(?:.{${group}})+$)(?!^)`, 'g'), '.');
}
//  byte-level split()
function spite(atom, bytes, groups, base) {
  if (base === void 0) {
    base = 10;
  }
  let out = '';
  const size = 8n * BigInt(bytes);
  const mask = (1n << size) - 1n;
  while (groups-- > 0) {
    if (out !== '') out = '.' + out;
    out = (atom & mask).toString(base) + out;
    atom = atom >> size;
  }
  return out;
}
function cordToString(atom) {
  return new TextDecoder('utf-8').decode(atomToByteArray(atom).reverse());
}
//NOTE  from nockjs' bigIntToByteArray
//REVIEW  original produced [0] for 0n... probably not correct in our contexts!
function atomToByteArray(atom) {
  if (atom === 0n) return new Uint8Array(0);
  const hexString = atom.toString(16);
  const paddedHexString = hexString.length % 2 === 0 ? hexString : '0' + hexString;
  const arrayLength = paddedHexString.length / 2;
  const int8Array = new Uint8Array(arrayLength);
  for (let i = 0; i < paddedHexString.length; i += 2) {
    const hexSubstring = paddedHexString.slice(i, i + 2);
    const signedInt = parseInt(hexSubstring, 16) << 24 >> 24;
    int8Array[i / 2] = signedInt;
  }
  return int8Array;
}

//  main
const da = {
  toUnix,
  fromUnix
};
const dr = {
  toSeconds,
  fromSeconds
};
const p = {
  cite,
  sein,
  clan,
  kind,
  rankToSize,
  sizeToRank
};

export { da, dr, nuck, p, parse, rend, render, scot, slav, slaw, tryParse, valid };
//# sourceMappingURL=aura.esm.js.map
