(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-065eb6da"],{"0aed":function(e,t,n){"use strict";n("aaba");var r=n("bf16"),a=n("86d4"),i=n("238a"),o=n("f6b4"),c=n("cb3d"),s=n("8714"),u=c("species"),l=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),f=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();e.exports=function(e,t,n){var v=c(e),d=!i((function(){var t={};return t[v]=function(){return 7},7!=""[e](t)})),p=d?!i((function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[u]=function(){return n}),n[v](""),!t})):void 0;if(!d||!p||"replace"===e&&!l||"split"===e&&!f){var h=/./[v],m=n(o,v,""[e],(function(e,t,n,r,a){return t.exec===s?d&&!a?{done:!0,value:h.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}})),g=m[0],x=m[1];r(String.prototype,e,g),a(RegExp.prototype,v,2==t?function(e,t){return x.call(e,this,t)}:function(e){return x.call(e,this)})}}},"185e":function(e,t,n){},"190b":function(e,t,n){n("149f")&&"g"!=/./g.flags&&n("064e").f(RegExp.prototype,"flags",{configurable:!0,get:n("f1fe")})},"2b45":function(e,t,n){"use strict";n("190b");var r=n("69b3"),a=n("f1fe"),i=n("149f"),o="toString",c=/./[o],s=function(e){n("bf16")(RegExp.prototype,o,e,!0)};n("238a")((function(){return"/a/b"!=c.call({source:"a",flags:"b"})}))?s((function(){var e=r(this);return"/".concat(e.source,"/","flags"in e?e.flags:!i&&e instanceof RegExp?a.call(e):void 0)})):c.name!=o&&s((function(){return c.call(this)}))},"2fd4":function(e,t,n){var r=n("fb68"),a=n("75c4"),i=n("cb3d")("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==a(e))}},"57b3":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"onlineWrapper"},[n("div",{staticClass:"searchTool"},[n("span",[e._v("审讯模板 ")]),e._v(" "),n("div",{staticClass:"moduleNameIpt"},[n("el-input",{attrs:{size:"mini"},model:{value:e.moduleName,callback:function(t){e.moduleName=t},expression:"moduleName"}})],1),e._v(" "),n("div",{staticClass:"moduleBtn"},[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.moduleSearch}},[e._v("搜索")])],1)]),e._v(" "),e.viewFlag?n("div",[n("div",{staticClass:"moduleName"},[e._v(e._s(e.moduleName))]),e._v(" "),n("div",{staticClass:"moduleView"},[n("div",{staticClass:"moduleWrapper"},[n("div",{staticClass:"moduleViewBtn1"},[e._v("开始")]),e._v(" "),n("div",{staticClass:"questionWrapper"},[n("ul",e._l(e.data,(function(t,r){return n("li",{staticClass:"item"},[n("div",{staticClass:"con"},[n("h6",[e._v("问题"+e._s(t.sequence))]),e._v(" "),n("p",[e._v(e._s(t.content))]),e._v(" "),n("div",{staticClass:"moduleType"},[n("b",[e._v(e._s(t.modelName))])]),e._v(" "),-1!=t.modelName.indexOf("是非模型")?n("div",{staticClass:"line"},[n("u",[e._v("是")]),n("i",[e._v("否")])]):e._e()])])})),0)]),e._v(" "),n("div",{staticClass:"moduleViewBtn2"},[e._v("结束")])])])]):e._e()])},a=[],i=(n("63ff"),n("57f0")),o=(n("2b45"),n("9a33"),n("a27e")),c=function(e){return o["a"].post("/onlinePreview/onlinePreviewPageQuery",{params:e})},s=function(e){var t=["零","一","二","三","四","五","六","七","八","九"],n=["","十","百","千","万"];e=parseInt(e);var r=function(e){for(var r=e.toString().split("").reverse(),a="",i=0;i<r.length;i++)a=(0==i&&0==r[i]?"":i>0&&0==r[i]&&0==r[i-1]?"":t[r[i]]+(0==r[i]?n[0]:n[i]))+a;return a},a=Math.floor(e/1e4),i=e%1e4;return i.toString().length<4&&(i="0"+i),a?r(a)+"万"+r(i):r(e)};var u={data:function(){return{data:[],moduleName:"",viewFlag:!1}},created:function(){this.moduleSearch()},methods:{moduleSearch:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={name:this.moduleName},e.prev=1,e.next=4,c(t);case 4:for(n=e.sent,r=[],a=0;a<n.data.rows.length;a++)r.push({sequence:s(a+1),content:n.data.rows[a].content,modelName:n.data.rows[a].modelName||"- - -"});r[0].content="我们是佛山市顺德区公安局交通警察大队机动中队的民警，现就有关案情依法对你进行询问，你应当如实回答，故意作伪证或者隐匿证据会负相应的法律责任，对案件无关问题，你有拒绝回答的权利，你有要求办案人员或者公安机关负责人回避的权利，有陈述和申辩的权利，以上权利义务告知，你听清楚了吗？",r[0].modelName="是非模型",r[1].modelName="是非模型",r[1].content="陈述和申辩的权利，以上权利义务告知，你听清楚了吗？",this.data=r,this.viewFlag=!0,e.next=19;break;case 15:e.prev=15,e.t0=e["catch"](1),this.data=[],this.viewFlag=!1;case 19:case"end":return e.stop()}}),e,this,[[1,15]])})));function t(){return e.apply(this,arguments)}return t}()}},l=u,f=(n("b5fa"),n("623f")),v=Object(f["a"])(l,r,a,!1,null,"0892ee75",null);t["default"]=v.exports},7108:function(e,t,n){"use strict";var r=n("7e23"),a=RegExp.prototype.exec;e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},8714:function(e,t,n){"use strict";var r=n("f1fe"),a=RegExp.prototype.exec,i=String.prototype.replace,o=a,c="lastIndex",s=function(){var e=/a/,t=/b*/g;return a.call(e,"a"),a.call(t,"a"),0!==e[c]||0!==t[c]}(),u=void 0!==/()??/.exec("")[1],l=s||u;l&&(o=function(e){var t,n,o,l,f=this;return u&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),s&&(t=f[c]),o=a.call(f,e),s&&o&&(f[c]=f.global?o.index+o[0].length:t),u&&o&&o.length>1&&i.call(o[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(o[l]=void 0)})),o}),e.exports=o},"9a33":function(e,t,n){"use strict";var r=n("2fd4"),a=n("69b3"),i=n("f63e"),o=n("e754"),c=n("eafa"),s=n("7108"),u=n("8714"),l=n("238a"),f=Math.min,v=[].push,d="split",p="length",h="lastIndex",m=4294967295,g=!l((function(){RegExp(m,"y")}));n("0aed")("split",2,(function(e,t,n,l){var x;return x="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[p]||2!="ab"[d](/(?:ab)*/)[p]||4!="."[d](/(.?)(.?)/)[p]||"."[d](/()()/)[p]>1||""[d](/.?/)[p]?function(e,t){var a=String(this);if(void 0===e&&0===t)return[];if(!r(e))return n.call(a,e,t);var i,o,c,s=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,d=void 0===t?m:t>>>0,g=new RegExp(e.source,l+"g");while(i=u.call(g,a)){if(o=g[h],o>f&&(s.push(a.slice(f,i.index)),i[p]>1&&i.index<a[p]&&v.apply(s,i.slice(1)),c=i[0][p],f=o,s[p]>=d))break;g[h]===i.index&&g[h]++}return f===a[p]?!c&&g.test("")||s.push(""):s.push(a.slice(f)),s[p]>d?s.slice(0,d):s}:"0"[d](void 0,0)[p]?function(e,t){return void 0===e&&0===t?[]:n.call(this,e,t)}:n,[function(n,r){var a=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,a,r):x.call(String(a),n,r)},function(e,t){var r=l(x,e,this,t,x!==n);if(r.done)return r.value;var u=a(e),v=String(this),d=i(u,RegExp),p=u.unicode,h=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),b=new d(g?u:"^(?:"+u.source+")",h),w=void 0===t?m:t>>>0;if(0===w)return[];if(0===v.length)return null===s(b,v)?[v]:[];var _=0,y=0,C=[];while(y<v.length){b.lastIndex=g?y:0;var E,R=s(b,g?v:v.slice(y));if(null===R||(E=f(c(b.lastIndex+(g?0:y)),v.length))===_)y=o(v,y,p);else{if(C.push(v.slice(_,y)),C.length===w)return C;for(var S=1;S<=R.length-1;S++)if(C.push(R[S]),C.length===w)return C;y=_=E}}return C.push(v.slice(_)),C}]}))},a27e:function(e,t,n){"use strict";var r=n("f753"),a=n.n(r),i=n("64f3");a.a.defaults.headers.common["Cache-Control"]="no-cache, no-store, must-revalidate",a.a.defaults.headers.common["Pragma"]="no-cache",a.a.defaults.headers.common["Expires"]=0;var o={baseURL:"/interrogation"},c=a.a.create(o);c.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),c.interceptors.response.use((function(e){var t=e,n=t.status,r=t.statusText;if(200===n)return t;if(500===n)return i["Message"].error(r),Promise.reject(r);if(4e3===n){var a=t.data;localStorage.removeItem("isLogin"),localStorage.removeItem("userInfo");var o=encodeURIComponent(window.location.href);return window.location.href="".concat(a,"&&relayState=").concat(o),Promise.reject(t)}}),(function(e){return i["Message"].error("请求出错:".concat(e)),Promise.reject(e)})),t["a"]=c},aaba:function(e,t,n){"use strict";var r=n("8714");n("e46b")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},b5fa:function(e,t,n){"use strict";var r=n("185e"),a=n.n(r);a.a},e754:function(e,t,n){"use strict";var r=n("fc81")(!0);e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},f1fe:function(e,t,n){"use strict";var r=n("69b3");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},fc81:function(e,t,n){var r=n("ee21"),a=n("f6b4");e.exports=function(e){return function(t,n){var i,o,c=String(a(t)),s=r(n),u=c.length;return s<0||s>=u?e?"":void 0:(i=c.charCodeAt(s),i<55296||i>56319||s+1===u||(o=c.charCodeAt(s+1))<56320||o>57343?e?c.charAt(s):i:e?c.slice(s,s+2):o-56320+(i-55296<<10)+65536)}}}}]);
//# sourceMappingURL=chunk-065eb6da.1c23c164.js.map