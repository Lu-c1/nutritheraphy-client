!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){var r,o;
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */!function(i){if(void 0===(o="function"==typeof(r=i)?r.call(t,n,t,e):r)||(e.exports=o),!0,e.exports=i(),!!0){var s=window.Cookies,u=window.Cookies=i();u.noConflict=function(){return window.Cookies=s,u}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}return function t(n){function r(t,o,i){var s;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(i=e({path:"/"},r.defaults,i)).expires){var u=new Date;u.setMilliseconds(u.getMilliseconds()+864e5*i.expires),i.expires=u}i.expires=i.expires?i.expires.toUTCString():"";try{s=JSON.stringify(o),/^[\{\[]/.test(s)&&(o=s)}catch(e){}o=n.write?n.write(o,t):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=(t=(t=encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var c="";for(var a in i)i[a]&&(c+="; "+a,!0!==i[a]&&(c+="="+i[a]));return document.cookie=t+"="+o+c}t||(s={});for(var d=document.cookie?document.cookie.split("; "):[],f=/(%[0-9A-Z]{2})+/g,l=0;l<d.length;l++){var p=d[l].split("="),v=p.slice(1).join("=");this.json||'"'!==v.charAt(0)||(v=v.slice(1,-1));try{var m=p[0].replace(f,decodeURIComponent);if(v=n.read?n.read(v,m):n(v,m)||v.replace(f,decodeURIComponent),this.json)try{v=JSON.parse(v)}catch(e){}if(t===m){s=v;break}t||(s[m]=v)}catch(e){}}return s}}return r.set=r,r.get=function(e){return r.call(r,e)},r.getJSON=function(){return r.apply({json:!0},[].slice.call(arguments))},r.defaults={},r.remove=function(t,n){r(t,"",e(n,{expires:-1}))},r.withConverter=t,r}(function(){})})},function(e,t,n){var r,o,i=n(3),s=n(4),u=0,c=0;e.exports=function(e,t,n){var a=t&&n||0,d=t||[],f=(e=e||{}).node||r,l=void 0!==e.clockseq?e.clockseq:o;if(null==f||null==l){var p=i();null==f&&(f=r=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==l&&(l=o=16383&(p[6]<<8|p[7]))}var v=void 0!==e.msecs?e.msecs:(new Date).getTime(),m=void 0!==e.nsecs?e.nsecs:c+1,w=v-u+(m-c)/1e4;if(w<0&&void 0===e.clockseq&&(l=l+1&16383),(w<0||v>u)&&void 0===e.nsecs&&(m=0),m>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");u=v,c=m,o=l;var y=(1e4*(268435455&(v+=122192928e5))+m)%4294967296;d[a++]=y>>>24&255,d[a++]=y>>>16&255,d[a++]=y>>>8&255,d[a++]=255&y;var h=v/4294967296*1e4&268435455;d[a++]=h>>>8&255,d[a++]=255&h,d[a++]=h>>>24&15|16,d[a++]=h>>>16&255,d[a++]=l>>>8|128,d[a++]=255&l;for(var g=0;g<6;++g)d[a+g]=f[g];return t||s(d)}},function(e,t,n){!function(n){"use strict";var r=function(e,t){var n="XMLHttpRequest"in window?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");n.open("POST",e,!1),n.withCredentials=!0,n.setRequestHeader("Accept","*/*"),"string"==typeof t?(n.setRequestHeader("Content-Type","text/plain;charset=UTF-8"),n.responseType="text/plain"):"[object Blob]"==={}.toString.call(t)&&t.type&&n.setRequestHeader("Content-Type",t.type);try{n.send(t)}catch(e){}return!0};"navigator"in n&&"sendBeacon"in n.navigator&&(r=navigator.sendBeacon.bind(navigator)),e.exports&&(t=e.exports=r),t.sendBeacon=r}("object"==typeof window?window:this)},function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var r=new Uint8Array(16);e.exports=function(){return n(r),r}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){for(var n=[],r=0;r<256;++r)n[r]=(r+256).toString(16).substr(1);e.exports=function(e,t){var r=t||0,o=n;return[o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]]].join("")}},function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"location",function(){return i}),n.d(r,"referrer",function(){return s}),n.d(r,"timestamp",function(){return u}),n.d(r,"uuid",function(){return l}),n.d(r,"userAgent",function(){return p});var o=window;function i(e){return e.location=o.document.location.href,Promise.resolve(e)}function s(e){return e.referrer=o.document.referrer,Promise.resolve(e)}function u(e){return e.ts=e.ts||Date.now(),Promise.resolve(e)}var c=n(0),a=n.n(c),d=n(1),f=n.n(d);function l({name:e,expires:t=18e5,cacheName:n=`varys_uuid_${e}`}){return r=>{let o=a.a.get(n);return o||(o=f()(),a.a.set(n,o,{expires:t/864e5})),r[e]=o,Promise.resolve(r)}}function p(e){return e.ua=o.navigator.userAgent,Promise.resolve(e)}var v=n(2),m=n.n(v);
/*!
 * Copyright (c) 2018 by Marfeel Solutions (http://www.marfeel.com)
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Marfeel Solutions S.L and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Marfeel Solutions S.L and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Marfeel Solutions SL.
 */
const w=[],y="https://cosmos.marfeel.com";class h{constructor(e){this.middlewares=[],this.endpoint=`${y}/${e}-${Date.now()}/event`}use(){return this.middlewares.push(...arguments),this}track(e){return function e(t,n){if(0===n.length)return Promise.resolve(t);return n.shift()(t).then(t=>e(t,n))}(e,[...w,...this.middlewares]).then(this.log.bind(this))}log(e){return new Promise((t,n)=>{const r=m()(this.endpoint,JSON.stringify(e));r?t(e):n({status:r,responseText:"Beacon Failure"})})}}let g={};var x={middlewares:r,create(e){if(!e)throw new Error("An ELS index should be provided");if(e in g)throw new Error("An instance with that index already exists");return g[e]=new h(e),g[e]},use(){w.push(...arguments)},get:e=>g[e],getInstance:e=>(e in g||(g[e]=new h(e)),g[e]),que:{push(e){e()}}};const b=window.vrys&&window.vrys.que||[];window.vrys=x,b.forEach(e=>e())}]);