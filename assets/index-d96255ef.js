var ce=Object.defineProperty;var ue=(n,e,t)=>e in n?ce(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var d=(n,e,t)=>(ue(n,typeof e!="symbol"?e+"":e,t),t);import{d as J,r as y,a as W,o as D,c as E,b as w,t as N,_ as k,F as de,e as fe,f as X,p as Y,g as K,s as Z,u as g,i as _e,h as pe,j as he,k as P,l as ve,m as ee,n as me,q as be,w as L,v as V,x as ge,y as te,z as ye,A as we,B as Se,C as F,D as Te,E as $,G as Ie,H as Oe,I as De}from"./index-008d048a.js";class Re{constructor({host:e}){d(this,"_host");d(this,"_headers",{"Content-Type":"application/json"});d(this,"get",async e=>this.makeRequest(e,"get"));d(this,"post",async(e,{body:t})=>this.makeRequest(e,"post",{body:t}));this._host=e}get host(){return this._host}async makeRequest(e,t,s){const a=new URL(e,this.host),o=await fetch(a,{method:t,body:JSON.stringify((s==null?void 0:s.body)??""),headers:{...this._headers}});if(o.ok)return await o.json();{const r=await o.text();return Promise.reject(new Error(`[Fetcher][${a.toString()}]:`+r))}}}class xe{constructor(e,t){d(this,"fetcher");d(this,"source");d(this,"target");this.source=e,this.target=t,this.fetcher=new Re({host:"https://translate.argosopentech.com/"})}getTranslation(e){return this.fetcher.post("/translate",{body:{q:e,source:this.source,target:this.target}}).then(t=>t.translatedText)}}const Ee={"en-ru":{key:"en-ru",source:"en",target:"ru"}};class We{constructor(e,t){d(this,"_database");d(this,"name");d(this,"version");d(this,"handleOpen",e=>{this._database=e.result});d(this,"handleUpgrade",(e,t)=>{switch(t.oldVersion){default:{this.create(e);break}}});d(this,"create",e=>{this.database||(this._database=e.result),Object.keys(Ee).forEach(t=>{this.database.createObjectStore(t,{keyPath:"id",autoIncrement:!0})})});d(this,"makeGetAllTransaction",async e=>(await this.initDb(),new Promise((t,s)=>{const r=this.database.transaction(e,"readonly").objectStore(e).getAll();r.onsuccess=()=>t(r.result),r.onerror=()=>s(`[LocalDatabase][${e}]: Unable to get all`)})));d(this,"makeAddTransaction",async(e,t)=>(await this.initDb(),new Promise((s,a)=>{const i=this.database.transaction(e,"readwrite").objectStore(e).add(t);i.onsuccess=()=>s({...t,id:i.result}),i.onerror=()=>a(`[LocalDatabase][${e}]: Unable to add ${t}`)})));d(this,"makeDeleteTransaction",async(e,t)=>(await this.initDb(),new Promise((s,a)=>{const i=this.database.transaction(e,"readwrite").objectStore(e).delete(t);i.onsuccess=()=>s(t),i.onerror=()=>a(`[LocalDatabase][${e}]: Unable to delete ${t}`)})));this.name=e,this.version=t}get database(){return this._database}initDb(){return new Promise((e,t)=>{if(this.database)return e("Local database already initialized");const s=globalThis.indexedDB.open(this.name,this.version);s.onsuccess=()=>{this.handleOpen(s),e("Local database opened")},s.onupgradeneeded=a=>{this.handleUpgrade(s,a),e("Local database upgraded")},s.onerror=t})}}class Pe{constructor(e){d(this,"dbInstance");d(this,"dbName","dictionaries");d(this,"dbVersion",1);d(this,"dbStoreKey");this.dbStoreKey=e,this.dbInstance=new We(this.dbName,this.dbVersion),this.dbInstance.initDb()}getDictionary(){return this.dbInstance.makeGetAllTransaction(this.dbStoreKey)}addWord(e){return this.dbInstance.makeAddTransaction(this.dbStoreKey,e)}deleteWord(e){return this.dbInstance.makeDeleteTransaction(this.dbStoreKey,e)}}class ke{constructor(e="en-ru"){d(this,"localService");d(this,"translationService");this.localService=new Pe(e),this.translationService=new xe("en","ru")}getAll(){return this.localService.getDictionary()}async addWord(e){const t=await this.translationService.getTranslation(e.value);return this.localService.addWord({...e,translation:t,dateAdd:Date.now()})}deleteWord(e){return this.localService.deleteWord(e)}}const ne=Symbol("dictionary-store"),se=J("dictionary",()=>{const n=new ke,e=y([]);return{words:e,setWord:async({value:o})=>{const r={value:o},i=await n.addWord(r);e.value=[i,...e.value]},removeWord:async o=>{const r=await n.deleteWord(o);e.value=e.value.filter(({id:i})=>i!==r)},fetchWords:async()=>{e.value=await n.getAll().then(o=>o.reverse())}}}),Ae={class:"row"},Le={class:"cell word-cell"},$e={class:"cell"},Ce=W({__name:"table_row",props:{word:null},setup(n){return(e,t)=>(D(),E("tr",Ae,[w("td",Le,N(n.word.value),1),w("td",$e,N(n.word.translation),1)]))}});const je=k(Ce,[["__scopeId","data-v-950216d2"]]),Ne=n=>(Y("data-v-3b351647"),n=n(),K(),n),Ve={class:"table"},Fe=Ne(()=>w("thead",null,[w("tr",{class:"row"},[w("td",{class:"cell"}," Word "),w("td",{class:"cell"}," Translation ")])],-1)),He=W({__name:"dictionary_table",props:{words:null},setup(n){return(e,t)=>(D(),E("table",Ve,[Fe,w("tbody",null,[(D(!0),E(de,null,fe(n.words,s=>(D(),X(je,{key:s.id,word:s},null,8,["word"]))),128))])]))}});const Ue=k(He,[["__scopeId","data-v-3b351647"]]),Be=W({__name:"index",setup(n){const e=se(),{words:t}=Z(e);return(s,a)=>(D(),X(Ue,{words:g(t)},null,8,["words"]))}}),Qe=J("editor",()=>{const n=_e(ne),e=y("");function t(){e.value&&(n==null||n.setWord({value:e.value}),s())}function s(){e.value=""}return{value:e,submitWord:t}});var H;const oe=typeof window<"u",qe=n=>typeof n=="string",x=()=>{};oe&&((H=window==null?void 0:window.navigator)!=null&&H.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function T(n){return typeof n=="function"?n():g(n)}function ae(n,e){function t(...s){return new Promise((a,o)=>{Promise.resolve(n(()=>e.apply(this,s),{fn:e,thisArg:this,args:s})).then(a).catch(o)})}return t}function Me(n,e={}){let t,s,a=x;const o=i=>{clearTimeout(i),a(),a=x};return i=>{const f=T(n),c=T(e.maxWait);return t&&o(t),f<=0||c!==void 0&&c<=0?(s&&(o(s),s=null),Promise.resolve(i())):new Promise((l,v)=>{a=e.rejectOnCancel?v:l,c&&!s&&(s=setTimeout(()=>{t&&o(t),s=null,l(i())},c)),t=setTimeout(()=>{s&&o(s),s=null,l(i())},f)})}}function Ge(n,e=!0,t=!0,s=!1){let a=0,o,r=!0,i=x,f;const c=()=>{o&&(clearTimeout(o),o=void 0,i(),i=x)};return v=>{const p=T(n),m=Date.now()-a,u=()=>f=v();return c(),p<=0?(a=Date.now(),u()):(m>p&&(t||!r)?(a=Date.now(),u()):e&&(f=new Promise((_,b)=>{i=s?b:_,o=setTimeout(()=>{a=Date.now(),r=!0,_(u()),c()},Math.max(0,p-m))})),!t&&!o&&(o=setTimeout(()=>r=!0,p)),r=!1,f)}}function ze(n){return n}function re(n){return pe()?(he(n),!0):!1}function Je(n,e=200,t={}){return ae(Me(e,t),n)}function Xe(n,e=200,t=!1,s=!0,a=!1){return ae(Ge(e,t,s,a),n)}function Ye(n){return typeof n=="function"?P(n):y(n)}function Ke(n,e=!0){ve()?ee(n):e?n():me(n)}function Ze(n){var e;const t=T(n);return(e=t==null?void 0:t.$el)!=null?e:t}const ie=oe?window:void 0;function U(...n){let e,t,s,a;if(qe(n[0])||Array.isArray(n[0])?([t,s,a]=n,e=ie):[e,t,s,a]=n,!e)return x;Array.isArray(t)||(t=[t]),Array.isArray(s)||(s=[s]);const o=[],r=()=>{o.forEach(l=>l()),o.length=0},i=(l,v,p,m)=>(l.addEventListener(v,p,m),()=>l.removeEventListener(v,p,m)),f=L(()=>[Ze(e),T(a)],([l,v])=>{r(),l&&o.push(...t.flatMap(p=>s.map(m=>i(l,p,m,v))))},{immediate:!0,flush:"post"}),c=()=>{f(),r()};return re(c),c}function et(n,e=!1){const t=y(),s=()=>t.value=!!n();return s(),Ke(s,e),t}const B=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Q="__vueuse_ssr_handlers__";B[Q]=B[Q]||{};const q=1;function tt(n,e={}){const{throttle:t=0,idle:s=200,onStop:a=x,onScroll:o=x,offset:r={left:0,right:0,top:0,bottom:0},eventListenerOptions:i={capture:!1,passive:!0},behavior:f="auto"}=e,c=y(0),l=y(0),v=P({get(){return c.value},set(h){m(h,void 0)}}),p=P({get(){return l.value},set(h){m(void 0,h)}});function m(h,I){var O,S,j;const A=T(n);A&&((j=A instanceof Document?document.body:A)==null||j.scrollTo({top:(O=T(I))!=null?O:p.value,left:(S=T(h))!=null?S:v.value,behavior:T(f)}))}const u=y(!1),_=V({left:!0,right:!1,top:!0,bottom:!1}),b=V({left:!1,right:!1,top:!1,bottom:!1}),R=h=>{u.value&&(u.value=!1,b.left=!1,b.right=!1,b.top=!1,b.bottom=!1,a(h))},le=Je(R,t+s),C=h=>{const I=h.target===document?h.target.documentElement:h.target,O=I.scrollLeft;b.left=O<c.value,b.right=O>l.value,_.left=O<=0+(r.left||0),_.right=O+I.clientWidth>=I.scrollWidth-(r.right||0)-q,c.value=O;let S=I.scrollTop;h.target===document&&!S&&(S=document.body.scrollTop),b.top=S<l.value,b.bottom=S>l.value,_.top=S<=0+(r.top||0),_.bottom=S+I.clientHeight>=I.scrollHeight-(r.bottom||0)-q,l.value=S,u.value=!0,le(h),o(h)};return U(n,"scroll",t?Xe(C,t,!0,!1):C,i),U(n,"scrollend",R,i),{x:v,y:p,isScrolling:u,arrivedState:_,directions:b}}var M;(function(n){n.UP="UP",n.RIGHT="RIGHT",n.DOWN="DOWN",n.LEFT="LEFT",n.NONE="NONE"})(M||(M={}));function nt(n={}){const{interimResults:e=!0,continuous:t=!0,window:s=ie}=n,a=Ye(n.lang||"en-US"),o=y(!1),r=y(!1),i=y(""),f=be(void 0),c=(_=!o.value)=>{o.value=_},l=()=>{o.value=!0},v=()=>{o.value=!1},p=s&&(s.SpeechRecognition||s.webkitSpeechRecognition),m=et(()=>p);let u;return m.value&&(u=new p,u.continuous=t,u.interimResults=e,u.lang=g(a),u.onstart=()=>{r.value=!1},L(a,_=>{u&&!o.value&&(u.lang=_)}),u.onresult=_=>{const b=Array.from(_.results).map(R=>(r.value=R.isFinal,R[0])).map(R=>R.transcript).join("");i.value=b,f.value=void 0},u.onerror=_=>{f.value=_},u.onend=()=>{o.value=!1,u.lang=g(a)},L(o,()=>{o.value?u.start():u.stop()})),re(()=>{o.value=!1}),{isSupported:m,isListening:o,isFinal:r,recognition:u,result:i,error:f,toggle:c,start:l,stop:v}}var st=Object.defineProperty,G=Object.getOwnPropertySymbols,ot=Object.prototype.hasOwnProperty,at=Object.prototype.propertyIsEnumerable,z=(n,e,t)=>e in n?st(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,rt=(n,e)=>{for(var t in e||(e={}))ot.call(e,t)&&z(n,t,e[t]);if(G)for(var t of G(e))at.call(e,t)&&z(n,t,e[t]);return n};const it={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};rt({linear:ze},it);const lt=({element:n=document,offset:e}=ct)=>{const{directions:t,y:s}=tt(n,{behavior:"smooth"}),{top:a,bottom:o}=ge(t),r=y(!1);return te(()=>{a.value?r.value=!1:s.value>((e==null?void 0:e.value)??0)&&o.value&&(r.value=!0)},{flush:"post"}),{isHidden:r}},ct={element:document},ut="/focu/img/icons/mic.svg",dt=n=>(Y("data-v-95585af3"),n=n(),K(),n),ft=dt(()=>w("img",{src:ut,alt:"delete word",width:"48",height:"48"},null,-1)),_t=[ft],pt=W({__name:"speech",emits:["update:modelValue"],setup(n,{emit:e}){const{isSupported:t,isListening:s,isFinal:a,result:o,start:r,stop:i}=nt(),f=()=>{s.value?i():r()};return te(()=>{a.value&&(e("update:modelValue",o.value),i())}),(c,l)=>g(t)?(D(),E("button",{key:0,class:"button",onClick:f},_t)):ye("",!0)}});const ht=k(pt,[["__scopeId","data-v-95585af3"]]),vt={class:"text-input"},mt=W({__name:"editor",setup(n,{expose:e}){const t=y(),s=Qe(),{value:a}=Z(s),{submitWord:o}=s,r=P(()=>{var f;return((f=t.value)==null?void 0:f.offsetHeight)||0}),{isHidden:i}=lt({offset:r});return e({elementRef:t}),(f,c)=>(D(),E("div",{ref_key:"elementRef",ref:t,class:Ie(["root",{"root--hidden":g(i)}])},[w("div",vt,[we(w("input",{"onUpdate:modelValue":c[0]||(c[0]=l=>F(a)?a.value=l:null),class:"control",placeholder:"Type something...",onKeypress:c[1]||(c[1]=Te((...l)=>g(o)&&g(o)(...l),["enter"]))},null,544),[[Se,g(a)]])]),$(ht,{modelValue:g(a),"onUpdate:modelValue":c[2]||(c[2]=l=>F(a)?a.value=l:null)},null,8,["modelValue"])],2))}});const bt=k(mt,[["__scopeId","data-v-b7d23f52"]]),gt={class:"main"},yt=W({__name:"index",setup(n){const e=se();De(ne,e);const t=y(),s=P(()=>{var a;return{"margin-top":`calc(${(a=t.value)==null?void 0:a.elementRef.offsetHeight}px + var(--spacing))`}});return ee(()=>{e.fetchWords()}),(a,o)=>(D(),E("main",gt,[$(g(bt),{ref_key:"editorRef",ref:t},null,512),w("section",{style:Oe(g(s))},[$(g(Be))],4)]))}});const Tt=k(yt,[["__scopeId","data-v-9b240e33"]]);export{Tt as default};