var Ut=Object.defineProperty;var qt=(n,t,e)=>t in n?Ut(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var D=(n,t,e)=>(qt(n,typeof t!="symbol"?t+"":t,e),e);import{r as ut,c as N,d as Mt,a as E,b as zt,e as U,o as C,f as I,g as y,t as st,n as rt,F as dt,h as Zt,u as T,i as X,j as Z,k as ft,l as Qt,m as Gt,p as Jt,q as Ct,s as Kt,w as ot,v as Xt,x as ht,y as Lt,T as te,z as vt,A as ee,B as It,C as yt,D as Et,E as Pt,G as At,H as ne,I as se,J as oe}from"./index-6c321e8c.js";const Rt={"en-ru":{key:"en-ru",source:"en",target:"ru"}};class re{constructor({host:t}){D(this,"_host");D(this,"_headers",{"Content-Type":"application/json"});D(this,"get",async t=>this.makeRequest(t,"GET"));D(this,"post",async(t,{body:e})=>this.makeRequest(t,"POST",{body:e}));this._host=t}get host(){return this._host}prepareBody(t){return t?{body:JSON.stringify(t)}:{}}async makeRequest(t,e,s){const i=new URL(t,this.host),o=await globalThis.fetch(i,{method:e,...this.prepareBody(s==null?void 0:s.body),headers:{...this._headers}});if(o.ok)return await o.json();{const r=await o.text();return Promise.reject(new Error(`[Fetcher][${i.toString()}]: `+r))}}}class ae{constructor(t){D(this,"fetcher");D(this,"langPair");this.langPair=t,this.fetcher=new re({host:"https://translate.argosopentech.com/"})}getTranslation(t){return this.fetcher.post("/translate",{body:{q:t,source:this.langPair.source,target:this.langPair.target}}).then(e=>e.translatedText)}}class ie{constructor(t,e,s){D(this,"_database");D(this,"name");D(this,"version");D(this,"storeKeys");D(this,"handleOpen",t=>{this._database=t.result});D(this,"handleUpgrade",(t,e)=>{switch(e.oldVersion){default:{this.create(t);break}}});D(this,"create",t=>{this.database||(this._database=t.result),this.storeKeys.forEach(e=>{this.database.createObjectStore(e,{keyPath:"id",autoIncrement:!0})})});D(this,"makeGetAllTransaction",async t=>(await this.initDb(),new Promise((e,s)=>{const r=this.database.transaction(t,"readonly").objectStore(t).getAll();r.onsuccess=()=>e(r.result),r.onerror=()=>s(`[LocalDatabase][${t}]: Unable to get all`)})));D(this,"makeAddTransaction",async(t,e)=>(await this.initDb(),new Promise((s,i)=>{const a=this.database.transaction(t,"readwrite").objectStore(t).add(e);a.onsuccess=()=>s({...e,id:a.result}),a.onerror=()=>i(`[LocalDatabase][${t}]: Unable to add ${e}`)})));D(this,"makeDeleteTransaction",async(t,e)=>(await this.initDb(),new Promise((s,i)=>{const a=this.database.transaction(t,"readwrite").objectStore(t).delete(e);a.onsuccess=()=>s(e),a.onerror=()=>i(`[LocalDatabase][${t}]: Unable to delete ${e}`)})));D(this,"makeEditTransaction",async(t,e)=>(await this.initDb(),new Promise((s,i)=>{const a=this.database.transaction(t,"readwrite").objectStore(t).put(e);a.onsuccess=()=>s({...e,id:a.result}),a.onerror=()=>i(`[LocalDatabase][${t}]: Unable to edit ${a.result}`)})));this.name=t,this.version=e,this.storeKeys=s}get database(){return this._database}initDb(){return new Promise((t,e)=>{if(this.database)return t("Local database already initialized");const s=globalThis.indexedDB.open(this.name,this.version);s.onsuccess=()=>{this.handleOpen(s),t("Local database opened")},s.onupgradeneeded=i=>{this.handleUpgrade(s,i),t("Local database upgraded")},s.onerror=e})}}class le{constructor(t){D(this,"dbInstance");D(this,"dbName","dictionaries");D(this,"dbVersion",1);D(this,"dbStoreKey");this.dbStoreKey=t,this.dbInstance=new ie(this.dbName,this.dbVersion,Object.keys(Rt)),this.dbInstance.initDb()}getDictionary(){return this.dbInstance.makeGetAllTransaction(this.dbStoreKey)}addWord(t){return this.dbInstance.makeAddTransaction(this.dbStoreKey,t)}deleteWord(t){return this.dbInstance.makeDeleteTransaction(this.dbStoreKey,t)}editWord(t){return this.dbInstance.makeEditTransaction(this.dbStoreKey,t)}}class ce{constructor(t="en-ru"){D(this,"localService");D(this,"translationService");D(this,"langPair");this.langPair=Rt[t],this.localService=new le(t),this.translationService=new ae(this.langPair)}fetchTranslation(t){return this.translationService.getTranslation(t.value)}getAll(){return this.localService.getDictionary()}addWord(t){return this.localService.addWord({...t,translation:"",dateAdd:Date.now()})}async updateWordTranslation(t){const e=await this.fetchTranslation(t);return this.localService.editWord({...t,translation:e})}modifyWord(t){return this.localService.editWord(t)}deleteWord(t){return this.localService.deleteWord(t)}}const ue=(n,t)=>{const e=ut({});return{result:N(()=>n.value.filter(o=>Object.entries(e).every(([r,a])=>{var d;return t[r]?(d=t[r])==null?void 0:d.call(t,o,a):(console.warn(`Filter func didn't passed for ${r}`),!0)}))),filterValues:e,setFilterValue:(o,r)=>{Object.assign(e,{[o]:r})}}},_t=Symbol("dictionary-store"),Ht=Mt("dictionary",()=>{const n=new ce,t=E([]),{result:e,filterValues:s,setFilterValue:i}=ue(t,{value:(f,v)=>f.value.toLowerCase().includes(String(v).toLowerCase())}),o=f=>{t.value=t.value.map(v=>f.id===v.id?f:v)},r=async({value:f})=>{const v={value:f},g=await n.addWord(v);t.value=[g,...t.value],d(g)},a=f=>n.fetchTranslation(f),d=async f=>{o({...f,isLoadTranslation:!0});let v=f;try{v=await n.updateWordTranslation(f)}finally{o({...v,isLoadTranslation:!1})}};return{words:t,wordsToShow:e,filterValues:s,addWord:r,removeWord:async f=>{const v=await n.deleteWord(f);t.value=t.value.filter(({id:g})=>g!==v)},fetchWords:async()=>{t.value=await n.getAll().then(f=>f.reverse())},updateWordTranslation:d,modifyWord:async({isLoadTranslation:f,...v})=>{o({...v,isLoadTranslation:!0});let g=v;try{g=await n.modifyWord(v)}finally{o({...g,isLoadTranslation:!1})}},getWordTranslation:a,setFilterValue:i}});var pt={},de={get exports(){return pt},set exports(n){pt=n}};(function(n,t){(function(e,s){n.exports=s()})(zt,function(){var e=1e3,s=6e4,i=36e5,o="millisecond",r="second",a="minute",d="hour",h="day",p="week",$="month",f="quarter",v="year",g="date",O="Invalid Date",L=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,B=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,tt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(m){var u=["th","st","nd","rd"],l=m%100;return"["+m+(u[(l-20)%10]||u[l]||u[0])+"]"}},J=function(m,u,l){var _=String(m);return!_||_.length>=u?m:""+Array(u+1-_.length).join(l)+m},P={s:J,z:function(m){var u=-m.utcOffset(),l=Math.abs(u),_=Math.floor(l/60),c=l%60;return(u<=0?"+":"-")+J(_,2,"0")+":"+J(c,2,"0")},m:function m(u,l){if(u.date()<l.date())return-m(l,u);var _=12*(l.year()-u.year())+(l.month()-u.month()),c=u.clone().add(_,$),w=l-c<0,b=u.clone().add(_+(w?-1:1),$);return+(-(_+(l-c)/(w?c-b:b-c))||0)},a:function(m){return m<0?Math.ceil(m)||0:Math.floor(m)},p:function(m){return{M:$,y:v,w:p,d:h,D:g,h:d,m:a,s:r,ms:o,Q:f}[m]||String(m||"").toLowerCase().replace(/s$/,"")},u:function(m){return m===void 0}},H="en",A={};A[H]=tt;var j=function(m){return m instanceof at},Q=function m(u,l,_){var c;if(!u)return H;if(typeof u=="string"){var w=u.toLowerCase();A[w]&&(c=w),l&&(A[w]=l,c=w);var b=u.split("-");if(!c&&b.length>1)return m(b[0])}else{var S=u.name;A[S]=u,c=S}return!_&&c&&(H=c),c||!_&&H},x=function(m,u){if(j(m))return m.clone();var l=typeof u=="object"?u:{};return l.date=m,l.args=arguments,new at(l)},k=P;k.l=Q,k.i=j,k.w=function(m,u){return x(m,{locale:u.$L,utc:u.$u,x:u.$x,$offset:u.$offset})};var at=function(){function m(l){this.$L=Q(l.locale,null,!0),this.parse(l)}var u=m.prototype;return u.parse=function(l){this.$d=function(_){var c=_.date,w=_.utc;if(c===null)return new Date(NaN);if(k.u(c))return new Date;if(c instanceof Date)return new Date(c);if(typeof c=="string"&&!/Z$/i.test(c)){var b=c.match(L);if(b){var S=b[2]-1||0,M=(b[7]||"0").substring(0,3);return w?new Date(Date.UTC(b[1],S,b[3]||1,b[4]||0,b[5]||0,b[6]||0,M)):new Date(b[1],S,b[3]||1,b[4]||0,b[5]||0,b[6]||0,M)}}return new Date(c)}(l),this.$x=l.x||{},this.init()},u.init=function(){var l=this.$d;this.$y=l.getFullYear(),this.$M=l.getMonth(),this.$D=l.getDate(),this.$W=l.getDay(),this.$H=l.getHours(),this.$m=l.getMinutes(),this.$s=l.getSeconds(),this.$ms=l.getMilliseconds()},u.$utils=function(){return k},u.isValid=function(){return this.$d.toString()!==O},u.isSame=function(l,_){var c=x(l);return this.startOf(_)<=c&&c<=this.endOf(_)},u.isAfter=function(l,_){return x(l)<this.startOf(_)},u.isBefore=function(l,_){return this.endOf(_)<x(l)},u.$g=function(l,_,c){return k.u(l)?this[_]:this.set(c,l)},u.unix=function(){return Math.floor(this.valueOf()/1e3)},u.valueOf=function(){return this.$d.getTime()},u.startOf=function(l,_){var c=this,w=!!k.u(_)||_,b=k.p(l),S=function(K,V){var z=k.w(c.$u?Date.UTC(c.$y,V,K):new Date(c.$y,V,K),c);return w?z:z.endOf(h)},M=function(K,V){return k.w(c.toDate()[K].apply(c.toDate("s"),(w?[0,0,0,0]:[23,59,59,999]).slice(V)),c)},W=this.$W,R=this.$M,q=this.$D,Y="set"+(this.$u?"UTC":"");switch(b){case v:return w?S(1,0):S(31,11);case $:return w?S(1,R):S(0,R+1);case p:var et=this.$locale().weekStart||0,nt=(W<et?W+7:W)-et;return S(w?q-nt:q+(6-nt),R);case h:case g:return M(Y+"Hours",0);case d:return M(Y+"Minutes",1);case a:return M(Y+"Seconds",2);case r:return M(Y+"Milliseconds",3);default:return this.clone()}},u.endOf=function(l){return this.startOf(l,!1)},u.$set=function(l,_){var c,w=k.p(l),b="set"+(this.$u?"UTC":""),S=(c={},c[h]=b+"Date",c[g]=b+"Date",c[$]=b+"Month",c[v]=b+"FullYear",c[d]=b+"Hours",c[a]=b+"Minutes",c[r]=b+"Seconds",c[o]=b+"Milliseconds",c)[w],M=w===h?this.$D+(_-this.$W):_;if(w===$||w===v){var W=this.clone().set(g,1);W.$d[S](M),W.init(),this.$d=W.set(g,Math.min(this.$D,W.daysInMonth())).$d}else S&&this.$d[S](M);return this.init(),this},u.set=function(l,_){return this.clone().$set(l,_)},u.get=function(l){return this[k.p(l)]()},u.add=function(l,_){var c,w=this;l=Number(l);var b=k.p(_),S=function(R){var q=x(w);return k.w(q.date(q.date()+Math.round(R*l)),w)};if(b===$)return this.set($,this.$M+l);if(b===v)return this.set(v,this.$y+l);if(b===h)return S(1);if(b===p)return S(7);var M=(c={},c[a]=s,c[d]=i,c[r]=e,c)[b]||1,W=this.$d.getTime()+l*M;return k.w(W,this)},u.subtract=function(l,_){return this.add(-1*l,_)},u.format=function(l){var _=this,c=this.$locale();if(!this.isValid())return c.invalidDate||O;var w=l||"YYYY-MM-DDTHH:mm:ssZ",b=k.z(this),S=this.$H,M=this.$m,W=this.$M,R=c.weekdays,q=c.months,Y=function(V,z,lt,it){return V&&(V[z]||V(_,w))||lt[z].slice(0,it)},et=function(V){return k.s(S%12||12,V,"0")},nt=c.meridiem||function(V,z,lt){var it=V<12?"AM":"PM";return lt?it.toLowerCase():it},K={YY:String(this.$y).slice(-2),YYYY:this.$y,M:W+1,MM:k.s(W+1,2,"0"),MMM:Y(c.monthsShort,W,q,3),MMMM:Y(q,W),D:this.$D,DD:k.s(this.$D,2,"0"),d:String(this.$W),dd:Y(c.weekdaysMin,this.$W,R,2),ddd:Y(c.weekdaysShort,this.$W,R,3),dddd:R[this.$W],H:String(S),HH:k.s(S,2,"0"),h:et(1),hh:et(2),a:nt(S,M,!0),A:nt(S,M,!1),m:String(M),mm:k.s(M,2,"0"),s:String(this.$s),ss:k.s(this.$s,2,"0"),SSS:k.s(this.$ms,3,"0"),Z:b};return w.replace(B,function(V,z){return z||K[V]||b.replace(":","")})},u.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},u.diff=function(l,_,c){var w,b=k.p(_),S=x(l),M=(S.utcOffset()-this.utcOffset())*s,W=this-S,R=k.m(this,S);return R=(w={},w[v]=R/12,w[$]=R,w[f]=R/3,w[p]=(W-M)/6048e5,w[h]=(W-M)/864e5,w[d]=W/i,w[a]=W/s,w[r]=W/e,w)[b]||W,c?R:k.a(R)},u.daysInMonth=function(){return this.endOf($).$D},u.$locale=function(){return A[this.$L]},u.locale=function(l,_){if(!l)return this.$L;var c=this.clone(),w=Q(l,_,!0);return w&&(c.$L=w),c},u.clone=function(){return k.w(this.$d,this)},u.toDate=function(){return new Date(this.valueOf())},u.toJSON=function(){return this.isValid()?this.toISOString():null},u.toISOString=function(){return this.$d.toISOString()},u.toString=function(){return this.$d.toUTCString()},m}(),wt=at.prototype;return x.prototype=wt,[["$ms",o],["$s",r],["$m",a],["$H",d],["$W",h],["$M",$],["$y",v],["$D",g]].forEach(function(m){wt[m[1]]=function(u){return this.$g(u,m[0],m[1])}}),x.extend=function(m,u){return m.$i||(m(u,at,x),m.$i=!0),x},x.locale=Q,x.isDayjs=j,x.unix=function(m){return x(1e3*m)},x.en=A[H],x.Ls=A,x.p={},x})})(de);const ct=pt,fe={class:"cell"},he={key:0},ve={key:1,class:"progress"},pe=U({__name:"table_row",props:{word:null,isSelected:{type:Boolean}},emits:["click"],setup(n,{emit:t}){const e=n,s=()=>{t("click",e.word)};return(i,o)=>(C(),I("tr",{class:rt(["hover",{active:n.isSelected}]),onClick:s},[y("td",null,st(n.word.value),1),y("td",fe,[n.word.isLoadTranslation?(C(),I("progress",ve)):(C(),I("span",he,st(n.word.translation),1))])],2))}}),me={class:"table table-zebra w-full p-2"},_e=y("thead",null,[y("tr",null,[y("th",null,"Word"),y("th",null,"Translation")])],-1),ge={key:0},be=y("td",null,null,-1),we=U({__name:"dictionary_table",props:{words:null,selectedWord:null},emits:["click:word"],setup(n,{emit:t}){const e=i=>{t("click:word",i)},s=(i,o)=>o?ct(i).isSame(ct(o),"day"):!1;return(i,o)=>(C(),I("table",me,[_e,y("tbody",null,[(C(!0),I(dt,null,Zt(n.words,(r,a)=>{var d,h;return C(),I(dt,{key:r.id},[s(r.dateAdd,(d=n.words[a-1])==null?void 0:d.dateAdd)?X("",!0):(C(),I("tr",ge,[y("th",null,st(T(ct)(r.dateAdd).format("DD.MM.YYYY")),1),be])),Z(pe,{word:r,"is-selected":((h=n.selectedWord)==null?void 0:h.id)===r.id,onClick:e},null,8,["word","is-selected"])],64)}),128))])]))}});var $t;const jt=typeof window<"u",ye=n=>typeof n=="string",G=()=>{},St=jt&&(($t=window==null?void 0:window.navigator)==null?void 0:$t.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function F(n){return typeof n=="function"?n():T(n)}function Vt(n,t){function e(...s){return new Promise((i,o)=>{Promise.resolve(n(()=>t.apply(this,s),{fn:t,thisArg:this,args:s})).then(i).catch(o)})}return e}function $e(n,t={}){let e,s,i=G;const o=a=>{clearTimeout(a),i(),i=G};return a=>{const d=F(n),h=F(t.maxWait);return e&&o(e),d<=0||h!==void 0&&h<=0?(s&&(o(s),s=null),Promise.resolve(a())):new Promise((p,$)=>{i=t.rejectOnCancel?$:p,h&&!s&&(s=setTimeout(()=>{e&&o(e),s=null,p(a())},h)),e=setTimeout(()=>{s&&o(s),s=null,p(a())},d)})}}function Se(n,t=!0,e=!0,s=!1){let i=0,o,r=!0,a=G,d;const h=()=>{o&&(clearTimeout(o),o=void 0,a(),a=G)};return $=>{const f=F(n),v=Date.now()-i,g=()=>d=$();return h(),f<=0?(i=Date.now(),g()):(v>f&&(e||!r)?(i=Date.now(),g()):t&&(d=new Promise((O,L)=>{a=s?L:O,o=setTimeout(()=>{i=Date.now(),r=!0,O(g()),h()},Math.max(0,f-v))})),!e&&!o&&(o=setTimeout(()=>r=!0,f)),r=!1,d)}}function Te(n){return n}function gt(n){return Qt()?(Gt(n),!0):!1}function ke(n,t=200,e={}){return Vt($e(t,e),n)}function De(n,t=200,e=!1,s=!0,i=!1){return Vt(Se(t,e,s,i),n)}function Ft(n){return typeof n=="function"?N(n):E(n)}function Oe(n,t=!0){Jt()?Ct(n):t?n():Kt(n)}function xe(n=!1,t={}){const{truthyValue:e=!0,falsyValue:s=!1}=t,i=ft(n),o=E(n);function r(a){if(arguments.length)return o.value=a,o.value;{const d=F(e);return o.value=o.value===d?F(s):d,o.value}}return i?r:[o,r]}function We(n){var t;const e=F(n);return(t=e==null?void 0:e.$el)!=null?t:e}const Bt=jt?window:void 0;function mt(...n){let t,e,s,i;if(ye(n[0])||Array.isArray(n[0])?([e,s,i]=n,t=Bt):[t,e,s,i]=n,!t)return G;Array.isArray(e)||(e=[e]),Array.isArray(s)||(s=[s]);const o=[],r=()=>{o.forEach(p=>p()),o.length=0},a=(p,$,f,v)=>(p.addEventListener($,f,v),()=>p.removeEventListener($,f,v)),d=ot(()=>[We(t),F(i)],([p,$])=>{r(),p&&o.push(...e.flatMap(f=>s.map(v=>a(p,f,v,$))))},{immediate:!0,flush:"post"}),h=()=>{d(),r()};return gt(h),h}function Me(n,t=!1){const e=E(),s=()=>e.value=!!n();return s(),Oe(s,t),e}const Tt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},kt="__vueuse_ssr_handlers__";Tt[kt]=Tt[kt]||{};const Dt=1;function Ce(n,t={}){const{throttle:e=0,idle:s=200,onStop:i=G,onScroll:o=G,offset:r={left:0,right:0,top:0,bottom:0},eventListenerOptions:a={capture:!1,passive:!0},behavior:d="auto"}=t,h=E(0),p=E(0),$=N({get(){return h.value},set(P){v(P,void 0)}}),f=N({get(){return p.value},set(P){v(void 0,P)}});function v(P,H){var A,j,Q;const x=F(n);x&&((Q=x instanceof Document?document.body:x)==null||Q.scrollTo({top:(A=F(H))!=null?A:f.value,left:(j=F(P))!=null?j:$.value,behavior:F(d)}))}const g=E(!1),O=ut({left:!0,right:!1,top:!0,bottom:!1}),L=ut({left:!1,right:!1,top:!1,bottom:!1}),B=P=>{g.value&&(g.value=!1,L.left=!1,L.right=!1,L.top=!1,L.bottom=!1,i(P))},tt=ke(B,e+s),J=P=>{const H=P.target===document?P.target.documentElement:P.target,A=H.scrollLeft;L.left=A<h.value,L.right=A>p.value,O.left=A<=0+(r.left||0),O.right=A+H.clientWidth>=H.scrollWidth-(r.right||0)-Dt,h.value=A;let j=H.scrollTop;P.target===document&&!j&&(j=document.body.scrollTop),L.top=j<p.value,L.bottom=j>p.value,O.top=j<=0+(r.top||0),O.bottom=j+H.clientHeight>=H.scrollHeight-(r.bottom||0)-Dt,p.value=j,g.value=!0,tt(P),o(P)};return mt(n,"scroll",e?De(J,e,!0,!1):J,a),mt(n,"scrollend",B,a),{x:$,y:f,isScrolling:g,arrivedState:O,directions:L}}var Ot;(function(n){n.UP="UP",n.RIGHT="RIGHT",n.DOWN="DOWN",n.LEFT="LEFT",n.NONE="NONE"})(Ot||(Ot={}));function Nt(n){const t=window.getComputedStyle(n);if(t.overflowX==="scroll"||t.overflowY==="scroll"||t.overflowX==="auto"&&n.clientHeight<n.scrollHeight||t.overflowY==="auto"&&n.clientWidth<n.scrollWidth)return!0;{const e=n.parentNode;return!e||e.tagName==="BODY"?!1:Nt(e)}}function Le(n){const t=n||window.event,e=t.target;return Nt(e)?!1:t.touches.length>1?!0:(t.preventDefault&&t.preventDefault(),!1)}function Ie(n,t=!1){const e=E(t);let s=null,i;ot(Ft(n),a=>{if(a){const d=a;i=d.style.overflow,e.value&&(d.style.overflow="hidden")}},{immediate:!0});const o=()=>{const a=F(n);!a||e.value||(St&&(s=mt(a,"touchmove",d=>{Le(d)},{passive:!1})),a.style.overflow="hidden",e.value=!0)},r=()=>{const a=F(n);!a||!e.value||(St&&(s==null||s()),a.style.overflow=i,e.value=!1)};return gt(r),N({get(){return e.value},set(a){a?o():r()}})}function Ee(n={}){const{interimResults:t=!0,continuous:e=!0,window:s=Bt}=n,i=Ft(n.lang||"en-US"),o=E(!1),r=E(!1),a=E(""),d=Xt(void 0),h=(O=!o.value)=>{o.value=O},p=()=>{o.value=!0},$=()=>{o.value=!1},f=s&&(s.SpeechRecognition||s.webkitSpeechRecognition),v=Me(()=>f);let g;return v.value&&(g=new f,g.continuous=e,g.interimResults=t,g.lang=T(i),g.onstart=()=>{r.value=!1},ot(i,O=>{g&&!o.value&&(g.lang=O)}),g.onresult=O=>{const L=Array.from(O.results).map(B=>(r.value=B.isFinal,B[0])).map(B=>B.transcript).join("");a.value=L,d.value=void 0},g.onerror=O=>{d.value=O},g.onend=()=>{o.value=!1,g.lang=T(i)},ot(o,()=>{o.value?g.start():g.stop()})),gt(()=>{o.value=!1}),{isSupported:v,isListening:o,isFinal:r,recognition:g,result:a,error:d,toggle:h,start:p,stop:$}}var Pe=Object.defineProperty,xt=Object.getOwnPropertySymbols,Ae=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable,Wt=(n,t,e)=>t in n?Pe(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,He=(n,t)=>{for(var e in t||(t={}))Ae.call(t,e)&&Wt(n,e,t[e]);if(xt)for(var e of xt(t))Re.call(t,e)&&Wt(n,e,t[e]);return n};const je={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};He({linear:Te},je);const Ve={key:0,class:"fixed top-0 left-0 w-full h-full z-30 flex justify-center items-center"},Fe=["onClick"],Be={class:"absolute card lg:w-96 w-11/12 bg-base-100 shadow-xl"},Ne=U({__name:"modal",props:{isOpen:{type:Boolean}},emits:["click:background"],setup(n,{emit:t}){const e=n,s=Ie(document.body),i=()=>{t("click:background")};return ot(()=>e.isOpen,o=>{s.value=o}),(o,r)=>(C(),ht(te,{name:"modal"},{default:Lt(()=>[n.isOpen?(C(),I("div",Ve,[y("div",{class:"bg-neutral/[.4] w-full h-full",onClick:vt(i,["self"])},null,8,Fe),y("div",Be,[ee(o.$slots,"default",{},void 0,!0)])])):X("",!0)]),_:3}))}});const bt=(n,t)=>{const e=n.__vccOpts||n;for(const[s,i]of t)e[s]=i;return e},Ye=bt(Ne,[["__scopeId","data-v-1b4d69e4"]]),Ue={},qe={xmlns:"http://www.w3.org/2000/svg",height:"100%",width:"100%",viewBox:"0 96 960 960"},ze=y("path",{class:"fill-inherit",d:"m361 757 119-121 120 121 47-48-119-121 119-121-47-48-120 121-119-121-48 48 120 121-120 121 48 48ZM261 936q-24 0-42-18t-18-42V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306Zm-438 0v570-570Z"},null,-1),Ze=[ze];function Qe(n,t){return C(),I("svg",qe,Ze)}const Ge=bt(Ue,[["render",Qe]]),Je={},Ke={xmlns:"http://www.w3.org/2000/svg",height:"100%",viewBox:"0 96 960 960",width:"100%"},Xe=y("path",{class:"fill-inherit",d:"m475 976 181-480h82l186 480h-87l-41-126H604l-47 126h-82Zm151-196h142l-70-194h-2l-70 194Zm-466 76-55-55 204-204q-38-44-67.5-88.5T190 416h87q17 33 37.5 62.5T361 539q45-47 75-97.5T487 336H40v-80h280v-80h80v80h280v80H567q-22 69-58.5 135.5T419 598l98 99-30 81-127-122-200 200Z"},null,-1),tn=[Xe];function en(n,t){return C(),I("svg",Ke,tn)}const nn=bt(Je,[["render",en]]),sn={key:0,class:"card-body"},on={class:"card-title"},rn={class:"card-actions justify-end mt-2"},an=["onSubmit"],ln=["value"],cn={class:"form-control"},un={class:"input-group"},dn=["value"],fn=["disabled","onClick"],hn={class:"card-actions justify-end mt-2"},vn=y("button",{class:"btn btn-sm btn-outline btn-success",type:"submit"}," сохранить ",-1),pn=U({__name:"record_modal",props:{word:null},emits:["click:close","click:remove","click:save","click:update-translation"],setup(n,{emit:t}){const e=n,[s,i]=xe(!1),o=()=>{i(!1),t("click:close")},r=()=>{e.word&&t("click:remove",e.word)},a=h=>{var f,v;if(!e.word)return;const p=new FormData(h.target),$={...e.word,value:((f=p.get("value"))==null?void 0:f.toString())??"",translation:((v=p.get("translation"))==null?void 0:v.toString())??""};t("click:save",$),i(!1)},d=()=>{e.word&&t("click:update-translation",e.word)};return(h,p)=>(C(),ht(T(Ye),{"is-open":!!n.word,"onClick:background":o},{default:Lt(()=>{var $,f,v,g,O,L,B;return[T(s)?X("",!0):(C(),I("div",sn,[y("h1",on,st(($=n.word)==null?void 0:$.value),1),y("p",null,st((f=n.word)==null?void 0:f.translation),1),y("div",rn,[y("button",{class:"btn btn-sm btn-outline btn-error fill-error hover:fill-info-content",onClick:r},[Z(T(Ge),{class:"w-5 h-5"})]),y("button",{class:"btn btn-sm btn-outline btn-info",onClick:p[0]||(p[0]=tt=>T(i)(!0))}," редактировать ")])])),T(s)?(C(),I("form",{key:1,class:"card-body gap-y-4",onSubmit:vt(a,["prevent"])},[y("input",{class:"input input-sm input-bordered input-info",name:"value",value:(v=n.word)==null?void 0:v.value},null,8,ln),y("div",cn,[y("div",un,[y("input",{class:"input input-sm input-bordered input-info w-full",name:"translation",value:(g=n.word)==null?void 0:g.translation},null,8,dn),y("button",{class:rt(["btn btn-sm btn-square fill-info-content hover:fill-info",{loading:(O=n.word)==null?void 0:O.isLoadTranslation}]),disabled:(L=n.word)==null?void 0:L.isLoadTranslation,onClick:vt(d,["prevent"])},[(B=n.word)!=null&&B.isLoadTranslation?X("",!0):(C(),ht(T(nn),{key:0,class:"w-4 h-4"}))],10,fn)])]),y("div",hn,[y("button",{class:"btn btn-sm btn-outline btn-error",onClick:p[1]||(p[1]=tt=>T(i)(!1))}," отмена "),vn])],40,an)):X("",!0)]}),_:1},8,["is-open"]))}}),mn=U({__name:"index",setup(n){const t=Ht(),{wordsToShow:e}=It(t),{removeWord:s,modifyWord:i,getWordTranslation:o}=t,r=E(),a=f=>{r.value=f},d=()=>{r.value=void 0},h=f=>{s(f.id),d()},p=f=>{i(f),d()},$=f=>{r.value&&(r.value={...r.value,isLoadTranslation:!0},o(f).then(v=>{r.value&&(r.value={...r.value,translation:v,isLoadTranslation:!1})}).finally(()=>{r.value&&(r.value={...r.value,isLoadTranslation:!1})}))};return(f,v)=>(C(),I(dt,null,[Z(we,{words:T(e),"selected-word":r.value,"onClick:word":a},null,8,["words","selected-word"]),Z(T(pn),{word:r.value,"onClick:close":d,"onClick:remove":h,"onClick:save":p,"onClick:updateTranslation":$},null,8,["word"])],64))}}),Yt=({scrollElement:n=document,offset:t}=_n)=>{const{directions:e,y:s,arrivedState:i}=Ce(n,{behavior:"smooth"}),{bottom:o,top:r}=yt(i),{top:a,bottom:d}=yt(e),h=E(!1);return Et(()=>{a.value||o.value||r.value?h.value=!1:s.value>((t==null?void 0:t.value)??0)&&d.value&&(h.value=!0)},{flush:"post"}),{isHidden:h}},_n={scrollElement:document},gn=y("div",{class:"navbar-start"},[y("h1",{class:"normal-case font-semibold text-xl select-none"}," focu ")],-1),bn={class:"navbar-end"},wn={class:"form-control"},yn=["value","onKeypress"],$n=U({__name:"header",setup(n){const t=At(_t),e=N(()=>{var a;return((a=t==null?void 0:t.filterValues)==null?void 0:a.value)||""}),s=E(),i=N(()=>{var a;return((a=s.value)==null?void 0:a.offsetHeight)||0}),{isHidden:o}=Yt({offset:i}),r=({target:a})=>{t==null||t.setFilterValue("value",a.value)};return(a,d)=>(C(),I("header",{ref_key:"elementRef",ref:s,class:rt(["navbar bg-base-100 rounded-xl z-20 fixed -top-28 gap-x-2 drop-shadow-xl",{"top-1":!T(o)}])},[gn,y("div",bn,[y("div",wn,[y("input",{value:T(e),type:"text",placeholder:"Search",class:"input input-bordered",onInput:r,onKeypress:Pt(r,["enter"])},null,40,yn)])])],2))}}),Sn=Mt("editor",()=>{const n=At(_t),t=E(""),e=E(!1),s=async()=>{if(e.value=!0,!t.value){i();return}await(n==null?void 0:n.addWord({value:t.value})),i()},i=()=>{t.value="",e.value=!1};return{word:t,isLoading:e,submitWord:s}}),Tn=["src"],kn=U({__name:"speech",emits:["update:modelValue"],setup(n,{emit:t}){const{isSupported:e,isListening:s,isFinal:i,result:o,start:r,stop:a}=Ee(),d=N(()=>`/focu/img/icons/${s.value?"voice_recording":"mic"}.svg`),h=N(()=>({"btn-active":s.value})),p=()=>{s.value?a():r()};return Et(()=>{i.value&&(t("update:modelValue",o.value),a())}),($,f)=>T(e)?(C(),I("button",{key:0,class:rt(["btn btn-success btn-square drop-shadow",T(h)]),onClick:p},[y("img",{src:T(d),alt:"toggle speech recognize",width:"32",height:"32"},null,8,Tn)],2)):X("",!0)}}),Dn=["disabled"],On=U({__name:"editor",setup(n){const t=E(),e=Sn(),{word:s,isLoading:i}=It(e),{submitWord:o}=e,r=N(()=>{var d;return((d=t.value)==null?void 0:d.offsetHeight)||0}),{isHidden:a}=Yt({offset:r});return(d,h)=>(C(),I("div",{ref_key:"elementRef",ref:t,class:rt(["navbar bg-base-100 rounded-xl z-20 fixed -bottom-28 gap-x-2 drop-shadow-2xl",{"bottom-1":!T(a)}])},[ne(y("input",{"onUpdate:modelValue":h[0]||(h[0]=p=>ft(s)?s.value=p:null),type:"text",autocomplete:"off",class:"input input-bordered input-success flex-1 drop-shadow",placeholder:"Type something...",disabled:T(i),onKeypress:h[1]||(h[1]=Pt((...p)=>T(o)&&T(o)(...p),["enter"]))},null,40,Dn),[[se,T(s)]]),Z(kn,{modelValue:T(s),"onUpdate:modelValue":h[2]||(h[2]=p=>ft(s)?s.value=p:null),disabled:T(i)},null,8,["modelValue","disabled"])],2))}}),xn={class:"min-h-full bg-base-200"},Wn={class:"relative container mx-auto"},Mn={class:"px-2 py-20"},In=U({__name:"index",setup(n){const t=Ht();return oe(_t,t),Ct(()=>{t.fetchWords()}),(e,s)=>(C(),I("main",xn,[y("div",Wn,[Z(T($n),{class:"container"}),y("section",Mn,[Z(T(mn))]),Z(T(On),{class:"container"})])]))}});export{In as default};
