if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>s(e,o),d={module:{uri:o},exports:t,require:c};i[o]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-220e644b.js",revision:null},{url:"assets/index-89767a24.css",revision:null},{url:"assets/index-9af109ca.css",revision:null},{url:"assets/index-a5a100c1.js",revision:null},{url:"img/icons/mic.svg",revision:"0871936da84436a207d1609ec4b1b468"},{url:"img/icons/voice_recording.svg",revision:"3bed1942f00dafd8abe56b5d8591652b"},{url:"index.html",revision:"5afe6585ddcf74eae2575bf8c7fa5397"},{url:"registerSW.js",revision:"040ec5a6d18716febbcd5cf240ca8db7"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"manifest.webmanifest",revision:"cc87bbc8d65b1f4b78c50288be1a1df2"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
