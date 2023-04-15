var de=Object.defineProperty;var _e=(t,e,o)=>e in t?de(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var _=(t,e,o)=>(_e(t,typeof e!="symbol"?e+"":e,o),o);import{d as Y,r as b,a as W,o as T,c as R,b as f,t as $,_ as C,F as K,e as fe,f as Z,p as j,g as N,w as he,T as pe,h as ve,i as ee,s as te,j as E,u as m,k as me,l as be,m as ge,n as P,q as we,v as oe,x as ye,y as Se,z as L,A as F,B as Te,C as ne,D as ke,E as Ie,G as H,H as Oe,I as Re,J as xe,K as De}from"./index-8d2da0b2.js";class We{constructor({host:e}){_(this,"_host");_(this,"_headers",{"Content-Type":"application/json"});_(this,"get",async e=>this.makeRequest(e,"GET"));_(this,"post",async(e,{body:o})=>this.makeRequest(e,"POST",{body:o}));this._host=e}get host(){return this._host}prepareBody(e){return e?{body:JSON.stringify(e)}:{}}async makeRequest(e,o,n){const s=new URL(e,this.host),a=await globalThis.fetch(s,{method:o,...this.prepareBody(n==null?void 0:n.body),headers:{...this._headers}});if(a.ok)return await a.json();{const r=await a.text();return Promise.reject(new Error(`[Fetcher][${s.toString()}]: `+r))}}}class Ce{constructor(e,o){_(this,"fetcher");_(this,"source");_(this,"target");this.source=e,this.target=o,this.fetcher=new We({host:"https://translate.argosopentech.com/"})}getTranslation(e){return this.fetcher.post("/translate",{body:{q:e,source:this.source,target:this.target}}).then(o=>o.translatedText)}}const Ee={"en-ru":{key:"en-ru",source:"en",target:"ru"}};class Pe{constructor(e,o){_(this,"_database");_(this,"name");_(this,"version");_(this,"handleOpen",e=>{this._database=e.result});_(this,"handleUpgrade",(e,o)=>{switch(o.oldVersion){default:{this.create(e);break}}});_(this,"create",e=>{this.database||(this._database=e.result),Object.keys(Ee).forEach(o=>{this.database.createObjectStore(o,{keyPath:"id",autoIncrement:!0})})});_(this,"makeGetAllTransaction",async e=>(await this.initDb(),new Promise((o,n)=>{const r=this.database.transaction(e,"readonly").objectStore(e).getAll();r.onsuccess=()=>o(r.result),r.onerror=()=>n(`[LocalDatabase][${e}]: Unable to get all`)})));_(this,"makeAddTransaction",async(e,o)=>(await this.initDb(),new Promise((n,s)=>{const i=this.database.transaction(e,"readwrite").objectStore(e).add(o);i.onsuccess=()=>n({...o,id:i.result}),i.onerror=()=>s(`[LocalDatabase][${e}]: Unable to add ${o}`)})));_(this,"makeDeleteTransaction",async(e,o)=>(await this.initDb(),new Promise((n,s)=>{const i=this.database.transaction(e,"readwrite").objectStore(e).delete(o);i.onsuccess=()=>n(o),i.onerror=()=>s(`[LocalDatabase][${e}]: Unable to delete ${o}`)})));this.name=e,this.version=o}get database(){return this._database}initDb(){return new Promise((e,o)=>{if(this.database)return e("Local database already initialized");const n=globalThis.indexedDB.open(this.name,this.version);n.onsuccess=()=>{this.handleOpen(n),e("Local database opened")},n.onupgradeneeded=s=>{this.handleUpgrade(n,s),e("Local database upgraded")},n.onerror=o})}}class $e{constructor(e){_(this,"dbInstance");_(this,"dbName","dictionaries");_(this,"dbVersion",1);_(this,"dbStoreKey");this.dbStoreKey=e,this.dbInstance=new Pe(this.dbName,this.dbVersion),this.dbInstance.initDb()}getDictionary(){return this.dbInstance.makeGetAllTransaction(this.dbStoreKey)}addWord(e){return this.dbInstance.makeAddTransaction(this.dbStoreKey,e)}deleteWord(e){return this.dbInstance.makeDeleteTransaction(this.dbStoreKey,e)}}class Ae{constructor(e="en-ru"){_(this,"localService");_(this,"translationService");this.localService=new $e(e),this.translationService=new Ce("en","ru")}getAll(){return this.localService.getDictionary()}async addWord(e){const o=await this.translationService.getTranslation(e.value);return this.localService.addWord({...e,translation:o,dateAdd:Date.now()})}deleteWord(e){return this.localService.deleteWord(e)}}const se=Symbol("dictionary-store"),ae=Y("dictionary",()=>{const t=new Ae,e=b([]);return{words:e,setWord:async({value:a})=>{const r={value:a},i=await t.addWord(r);e.value=[i,...e.value]},removeWord:async a=>{const r=await t.deleteWord(a);e.value=e.value.filter(({id:i})=>i!==r)},fetchWords:async()=>{e.value=await t.getAll().then(a=>a.reverse())}}}),Le={class:"cell word-cell"},je={class:"cell"},Ne=W({__name:"table_row",props:{word:null},emits:["click"],setup(t,{emit:e}){const o=t,n=()=>{e("click",o.word)};return(s,a)=>(T(),R("tr",{class:"row",onClick:n},[f("td",Le,$(t.word.value),1),f("td",je,$(t.word.translation),1)]))}});const Ve=C(Ne,[["__scopeId","data-v-d3066e53"]]),Be=t=>(j("data-v-202a7640"),t=t(),N(),t),Fe={class:"table"},He=Be(()=>f("thead",null,[f("tr",{class:"row"},[f("td",{class:"cell"}," Word "),f("td",{class:"cell"}," Translation ")])],-1)),Ue=W({__name:"dictionary_table",props:{words:null},emits:["click:word"],setup(t,{emit:e}){const o=n=>{e("click:word",n)};return(n,s)=>(T(),R("table",Fe,[He,f("tbody",null,[(T(!0),R(K,null,fe(t.words,a=>(T(),Z(Ve,{key:a.id,word:a,onClick:o},null,8,["word"]))),128))])]))}});const Me=C(Ue,[["__scopeId","data-v-202a7640"]]),Qe="/focu/img/icons/delete_forever.svg",qe=t=>(j("data-v-611fdb9b"),t=t(),N(),t),Ge=["onClick"],ze={class:"container"},Je={class:"header"},Xe={class:"header__word"},Ye=qe(()=>f("img",{src:Qe,alt:"delete word",width:"24",height:"24"},null,-1)),Ke=[Ye],Ze=W({__name:"record_modal",props:{word:null},emits:["click:background","click:remove"],setup(t,{emit:e}){const o=t,n=()=>{e("click:background")},s=()=>{o.word&&e("click:remove",o.word)};return(a,r)=>(T(),Z(pe,{name:"modal"},{default:he(()=>[t.word?(T(),R("div",{key:0,class:"mask",onClick:ve(n,["self"])},[f("div",ze,[f("div",Je,[f("h1",Xe,$(t.word.value),1),f("button",{class:"header__button-remove",onClick:s},Ke)]),f("p",null,$(t.word.translation),1)])],8,Ge)):ee("",!0)]),_:1}))}});const et=C(Ze,[["__scopeId","data-v-611fdb9b"]]),tt=W({__name:"index",setup(t){const e=ae(),{words:o}=te(e),{removeWord:n}=e,s=b(),a=l=>{s.value=l},r=()=>{s.value=void 0},i=l=>{n(l.id),r()};return(l,u)=>(T(),R(K,null,[E(Me,{words:m(o),"onClick:word":a},null,8,["words"]),E(m(et),{word:s.value,"onClick:background":r,"onClick:remove":i},null,8,["word"])],64))}}),ot=Y("editor",()=>{const t=me(se),e=b("");function o(){const s=e.value;s&&(n(),t==null||t.setWord({value:s}))}function n(){e.value=""}return{value:e,submitWord:o}});var U;const re=typeof window<"u",nt=t=>typeof t=="string",D=()=>{};re&&((U=window==null?void 0:window.navigator)!=null&&U.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function k(t){return typeof t=="function"?t():m(t)}function ie(t,e){function o(...n){return new Promise((s,a)=>{Promise.resolve(t(()=>e.apply(this,n),{fn:e,thisArg:this,args:n})).then(s).catch(a)})}return o}function st(t,e={}){let o,n,s=D;const a=i=>{clearTimeout(i),s(),s=D};return i=>{const l=k(t),u=k(e.maxWait);return o&&a(o),l<=0||u!==void 0&&u<=0?(n&&(a(n),n=null),Promise.resolve(i())):new Promise((c,g)=>{s=e.rejectOnCancel?g:c,u&&!n&&(n=setTimeout(()=>{o&&a(o),n=null,c(i())},u)),o=setTimeout(()=>{n&&a(n),n=null,c(i())},l)})}}function at(t,e=!0,o=!0,n=!1){let s=0,a,r=!0,i=D,l;const u=()=>{a&&(clearTimeout(a),a=void 0,i(),i=D)};return g=>{const p=k(t),w=Date.now()-s,d=()=>l=g();return u(),p<=0?(s=Date.now(),d()):(w>p&&(o||!r)?(s=Date.now(),d()):e&&(l=new Promise((h,y)=>{i=n?y:h,a=setTimeout(()=>{s=Date.now(),r=!0,h(d()),u()},Math.max(0,p-w))})),!o&&!a&&(a=setTimeout(()=>r=!0,p)),r=!1,l)}}function rt(t){return t}function ce(t){return be()?(ge(t),!0):!1}function it(t,e=200,o={}){return ie(st(e,o),t)}function ct(t,e=200,o=!1,n=!0,s=!1){return ie(at(e,o,n,s),t)}function lt(t){return typeof t=="function"?P(t):b(t)}function ut(t,e=!0){we()?oe(t):e?t():ye(t)}function dt(t){var e;const o=k(t);return(e=o==null?void 0:o.$el)!=null?e:o}const le=re?window:void 0;function M(...t){let e,o,n,s;if(nt(t[0])||Array.isArray(t[0])?([o,n,s]=t,e=le):[e,o,n,s]=t,!e)return D;Array.isArray(o)||(o=[o]),Array.isArray(n)||(n=[n]);const a=[],r=()=>{a.forEach(c=>c()),a.length=0},i=(c,g,p,w)=>(c.addEventListener(g,p,w),()=>c.removeEventListener(g,p,w)),l=L(()=>[dt(e),k(s)],([c,g])=>{r(),c&&a.push(...o.flatMap(p=>n.map(w=>i(c,p,w,g))))},{immediate:!0,flush:"post"}),u=()=>{l(),r()};return ce(u),u}function _t(t,e=!1){const o=b(),n=()=>o.value=!!t();return n(),ut(n,e),o}const Q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},q="__vueuse_ssr_handlers__";Q[q]=Q[q]||{};const G=1;function ft(t,e={}){const{throttle:o=0,idle:n=200,onStop:s=D,onScroll:a=D,offset:r={left:0,right:0,top:0,bottom:0},eventListenerOptions:i={capture:!1,passive:!0},behavior:l="auto"}=e,u=b(0),c=b(0),g=P({get(){return u.value},set(v){w(v,void 0)}}),p=P({get(){return c.value},set(v){w(void 0,v)}});function w(v,I){var O,S,B;const A=k(t);A&&((B=A instanceof Document?document.body:A)==null||B.scrollTo({top:(O=k(I))!=null?O:p.value,left:(S=k(v))!=null?S:g.value,behavior:k(l)}))}const d=b(!1),h=F({left:!0,right:!1,top:!0,bottom:!1}),y=F({left:!1,right:!1,top:!1,bottom:!1}),x=v=>{d.value&&(d.value=!1,y.left=!1,y.right=!1,y.top=!1,y.bottom=!1,s(v))},ue=it(x,o+n),V=v=>{const I=v.target===document?v.target.documentElement:v.target,O=I.scrollLeft;y.left=O<u.value,y.right=O>c.value,h.left=O<=0+(r.left||0),h.right=O+I.clientWidth>=I.scrollWidth-(r.right||0)-G,u.value=O;let S=I.scrollTop;v.target===document&&!S&&(S=document.body.scrollTop),y.top=S<c.value,y.bottom=S>c.value,h.top=S<=0+(r.top||0),h.bottom=S+I.clientHeight>=I.scrollHeight-(r.bottom||0)-G,c.value=S,d.value=!0,ue(v),a(v)};return M(t,"scroll",o?ct(V,o,!0,!1):V,i),M(t,"scrollend",x,i),{x:g,y:p,isScrolling:d,arrivedState:h,directions:y}}var z;(function(t){t.UP="UP",t.RIGHT="RIGHT",t.DOWN="DOWN",t.LEFT="LEFT",t.NONE="NONE"})(z||(z={}));function ht(t={}){const{interimResults:e=!0,continuous:o=!0,window:n=le}=t,s=lt(t.lang||"en-US"),a=b(!1),r=b(!1),i=b(""),l=Se(void 0),u=(h=!a.value)=>{a.value=h},c=()=>{a.value=!0},g=()=>{a.value=!1},p=n&&(n.SpeechRecognition||n.webkitSpeechRecognition),w=_t(()=>p);let d;return w.value&&(d=new p,d.continuous=o,d.interimResults=e,d.lang=m(s),d.onstart=()=>{r.value=!1},L(s,h=>{d&&!a.value&&(d.lang=h)}),d.onresult=h=>{const y=Array.from(h.results).map(x=>(r.value=x.isFinal,x[0])).map(x=>x.transcript).join("");i.value=y,l.value=void 0},d.onerror=h=>{l.value=h},d.onend=()=>{a.value=!1,d.lang=m(s)},L(a,()=>{a.value?d.start():d.stop()})),ce(()=>{a.value=!1}),{isSupported:w,isListening:a,isFinal:r,recognition:d,result:i,error:l,toggle:u,start:c,stop:g}}var pt=Object.defineProperty,J=Object.getOwnPropertySymbols,vt=Object.prototype.hasOwnProperty,mt=Object.prototype.propertyIsEnumerable,X=(t,e,o)=>e in t?pt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,bt=(t,e)=>{for(var o in e||(e={}))vt.call(e,o)&&X(t,o,e[o]);if(J)for(var o of J(e))mt.call(e,o)&&X(t,o,e[o]);return t};const gt={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};bt({linear:rt},gt);const wt=({element:t=document,offset:e}=yt)=>{const{directions:o,y:n}=ft(t,{behavior:"smooth"}),{top:s,bottom:a}=Te(o),r=b(!1);return ne(()=>{s.value?r.value=!1:n.value>((e==null?void 0:e.value)??0)&&a.value&&(r.value=!0)},{flush:"post"}),{isHidden:r}},yt={element:document},St="/focu/img/icons/mic.svg",Tt=t=>(j("data-v-af40dbbb"),t=t(),N(),t),kt=Tt(()=>f("img",{src:St,alt:"toggle speech recognize",width:"48",height:"48"},null,-1)),It=[kt],Ot=W({__name:"speech",emits:["update:modelValue"],setup(t,{emit:e}){const{isSupported:o,isListening:n,isFinal:s,result:a,start:r,stop:i}=ht(),l=()=>{n.value?i():r()};return ne(()=>{s.value&&(e("update:modelValue",a.value),i())}),(u,c)=>m(o)?(T(),R("button",{key:0,class:"button",onClick:l},It)):ee("",!0)}});const Rt=C(Ot,[["__scopeId","data-v-af40dbbb"]]),xt={class:"text-input"},Dt=W({__name:"editor",setup(t,{expose:e}){const o=b(),n=ot(),{value:s}=te(n),{submitWord:a}=n,r=P(()=>{var l;return((l=o.value)==null?void 0:l.offsetHeight)||0}),{isHidden:i}=wt({offset:r});return e({elementRef:o}),(l,u)=>(T(),R("div",{ref_key:"elementRef",ref:o,class:Re(["root",{"root--hidden":m(i)}])},[f("div",xt,[ke(f("input",{"onUpdate:modelValue":u[0]||(u[0]=c=>H(s)?s.value=c:null),class:"control",placeholder:"Type something...",onKeypress:u[1]||(u[1]=Oe((...c)=>m(a)&&m(a)(...c),["enter"]))},null,544),[[Ie,m(s)]])]),E(Rt,{modelValue:m(s),"onUpdate:modelValue":u[2]||(u[2]=c=>H(s)?s.value=c:null)},null,8,["modelValue"])],2))}});const Wt=C(Dt,[["__scopeId","data-v-50d3f185"]]),Ct={class:"main"},Et=W({__name:"index",setup(t){const e=ae();De(se,e);const o=b(),n=P(()=>{var s;return{"margin-top":`calc(${(s=o.value)==null?void 0:s.elementRef.offsetHeight}px + var(--spacing))`}});return oe(()=>{e.fetchWords()}),(s,a)=>(T(),R("main",Ct,[E(m(Wt),{ref_key:"editorRef",ref:o},null,512),f("section",{style:xe(m(n))},[E(m(tt))],4)]))}});const At=C(Et,[["__scopeId","data-v-9b240e33"]]);export{At as default};
