(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-536b1243"],{"0aed":function(e,t,n){"use strict";n("aaba");var a=n("bf16"),r=n("86d4"),i=n("238a"),o=n("f6b4"),s=n("cb3d"),l=n("8714"),c=s("species"),u=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),p=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();e.exports=function(e,t,n){var d=s(e),m=!i((function(){var t={};return t[d]=function(){return 7},7!=""[e](t)})),f=m?!i((function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[c]=function(){return n}),n[d](""),!t})):void 0;if(!m||!f||"replace"===e&&!u||"split"===e&&!p){var h=/./[d],g=n(o,d,""[e],(function(e,t,n,a,r){return t.exec===l?m&&!r?{done:!0,value:h.call(t,n,a)}:{done:!0,value:e.call(n,t,a)}:{done:!1}})),v=g[0],y=g[1];a(String.prototype,e,v),r(RegExp.prototype,d,2==t?function(e,t){return y.call(e,this,t)}:function(e){return y.call(e,this)})}}},"2fd4":function(e,t,n){var a=n("fb68"),r=n("75c4"),i=n("cb3d")("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==r(e))}},"371d":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"template-manage"},[n("el-row",{staticClass:"table-toolbar"},[n("el-col",{attrs:{span:7}},[n("div",{staticClass:"temp-title"},[n("div",{staticClass:"toolBtn"},[n("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:e.addTemp}},[e._v("添加模型")])],1),e._v(" "),n("div",{staticClass:"toolBtn"},[n("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-picture-outline"},on:{click:e.copyTemp}},[e._v("复制")])],1),e._v(" "),n("div",{staticClass:"toolBtn"},[n("el-button",{staticClass:"el-button--danger",attrs:{type:"primary",size:"small",icon:"el-icon-delete"},on:{click:e.handleDelete}},[e._v("删除")])],1)])]),e._v(" "),n("el-col",{staticClass:"searchStyle",staticStyle:{"margin-top":"20px"},attrs:{span:15}},[n("span",{staticStyle:{"font-size":"14px"}},[e._v("模型类别 ")]),e._v(" "),n("el-input",{staticStyle:{width:"160px","margin-right":"20px"},attrs:{size:"small","prefix-icon":"el-icon-search",placeholder:"模型类别名称",clearable:""},model:{value:e.searchCategoryName,callback:function(t){e.searchCategoryName=t},expression:"searchCategoryName"}}),e._v(" "),n("span",{staticStyle:{"font-size":"14px"}},[e._v("模型名称 ")]),e._v(" "),n("el-input",{staticStyle:{width:"160px","margin-right":"10px"},attrs:{size:"small","prefix-icon":"el-icon-search",placeholder:"模型名称",clearable:""},model:{value:e.searchName,callback:function(t){e.searchName=t},expression:"searchName"}}),e._v(" "),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.onSearch}},[e._v("搜索")])],1)],1),e._v(" "),n("div",{staticClass:"temp-list"},[n("el-table",{ref:"module",staticClass:"template-list",staticStyle:{width:"100%"},attrs:{data:e.tempList},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{label:"模型名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.editing?n("div",[n("el-input",{attrs:{placeholder:"请填写模型名称"},model:{value:t.row.name,callback:function(n){e.$set(t.row,"name",n)},expression:"scope.row.name"}})],1):n("div",[n("span",[e._v(e._s(t.row.name))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"调用模型/程序"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.editing?n("div",[n("el-input",{attrs:{placeholder:"请填写调用模型/程序"},model:{value:t.row.interface_url,callback:function(n){e.$set(t.row,"interface_url",n)},expression:"scope.row.interface_url"}})],1):n("div",[n("span",[e._v(e._s(t.row.interface_url))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"模型类别"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.adding||t.row.editing?e._e():n("div",[n("span",[e._v(e._s(t.row.model_category_name))])]),e._v(" "),t.row.adding?n("div",[n("el-select",{attrs:{placeholder:"请选择"},on:{change:e.categoryChange},model:{value:e.tempCategory,callback:function(t){e.tempCategory=t},expression:"tempCategory"}},e._l(e.categoryOpts,(function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id+","+e.name}})})),1)],1):e._e(),e._v(" "),t.row.editing&&!t.row.adding?n("div",[n("el-select",{attrs:{placeholder:"请选择"},on:{change:e.categoryChange},model:{value:t.row.model_category_name,callback:function(n){e.$set(t.row,"model_category_name",n)},expression:"scope.row.model_category_name"}},e._l(e.categoryOpts,(function(e){return n("el-option",{key:e.id,attrs:{label:e.name,value:e.id+","+e.name}})})),1)],1):e._e()]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"返回值"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.editing?n("div",[n("el-input",{attrs:{placeholder:"请填写返回值"},model:{value:t.row.retValue,callback:function(n){e.$set(t.row,"retValue",n)},expression:"scope.row.retValue"}})],1):n("div",[n("span",[e._v(e._s(t.row.retValue))])])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticClass:"operate-groups"},[t.row.editing?e._e():n("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit-outline"},on:{click:function(n){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑\n            ")]),e._v(" "),t.row.editing?n("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-success"},on:{click:function(n){return e.handleSave(t.$index,t.row)}}},[e._v("保存\n            ")]):e._e(),e._v(" "),t.row.editing?n("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-warning"},on:{click:function(n){return e.handleCancel(t.$index,t.row)}}},[e._v("取消\n            ")]):e._e()],1)]}}])})],1),e._v(" "),n("el-pagination",{attrs:{background:"",layout:"total,prev, pager, next,jumper",total:e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)},r=[],i=(n("6d57"),n("cc57"),n("9a33"),n("a27e")),o=function(e){return i["a"].post("/model/queryPage",e)},s=function(e){return i["a"].post("/model/update",e)},l=function(e){return i["a"].post("/model/add",e)},c=function(e){return i["a"].post("/model/delete",e)},u=n("d71b"),p={data:function(){return{flag:!1,searchCategoryName:"",searchName:"",currentPage:1,total:null,multipleSelection:[],tempList:[],tempName:"",tempUrl:"",tempCategory:"",tempCategoryId:"",tempRetValue:"",categoryOpts:[]}},created:function(){this.getCategory(),this.getData()},methods:{getData:function(){var e=this,t={rows:10,page:this.currentPage,model_name:this.searchName,model_category_name:this.searchCategoryName};o(t).then((function(t){var n=t.data;e.tempList=n.rows,e.total=n.total}))},getCategory:function(){var e=this,t={rows:1e3,page:1,name:""};Object(u["a"])(t).then((function(t){var n=t.data;e.categoryOpts=n.rows}))},categoryChange:function(e){this.tempCategory=e.split(",")[1],this.tempCategoryId=e.split(",")[0]},handleEdit:function(e,t){0==this.flag&&(this.flag=!0,this.$set(this.tempList[e],"editing",!0),this.$set(this,"tempName",t.name),this.$set(this,"tempUrl",t.interface_url),this.$set(this,"tempRetValue",t.retValue),this.$set(this,"tempCategory",t.model_category_name),this.$set(this,"tempCategoryId",t.model_category_id))},handleSave:function(e,t){var n=this;if(t.adding){if(this.tempCategory,""==this.tempCategoryId)return void this.$message({type:"error",message:"请填写模型类别！"});l({name:t.name,interface_url:t.interface_url,model_category_id:this.tempCategoryId,model_category_name:this.tempCategory,retValue:t.retValue}).then((function(a){var r=a.data;"repeat"==r.status?n.$message({type:"error",message:"模型名称已存在!"}):(n.$message({type:"success",message:"添加成功!"}),n.handleCancel(e,t))})).catch((function(e){n.$message({type:"error",message:"新建模型名称，请填写完全！"})}))}else{var a={id:t.id,name:t.name,retValue:t.retValue,interface_url:t.interface_url,model_category_id:this.tempCategoryId};s(a).then((function(e){var t=e.data;"repeat"==t.status?n.$message({type:"error",message:"模型名称已存在!"}):(n.$message({type:"success",message:"修改成功!"}),n.flag=!1,n.getData())})).catch((function(e){n.$message({type:"error",message:"修改模型名称，请填写完全！"})}))}},handleCancel:function(e,t){t.adding?(this.$set(this.tempList[e],"editing",!1),this.$set(this.tempList[e],"adding",!1),this.getData()):(this.$set(this.tempList[e],"editing",!1),this.$set(this.tempList[e],"name",this.tempName),this.$set(this.tempList[e],"interface_url",this.tempUrl),this.$set(this.tempList[e],"retValue",this.tempRetValue)),this.flag=!1},addTemp:function(){this.flag=!0,this.tempList=this.tempList||[],this.tempList.push({name:"",interface_url:"",retValue:"",editing:!0,adding:!0})},copyTemp:function(){var e=this;this.multipleSelection.length>1?this.$message.info("请选择单一模型进行复制"):l({name:this.multipleSelection[0].name+" 复制",interface_url:this.multipleSelection[0].interface_url,retValue:this.multipleSelection[0].retValue,model_category_id:this.multipleSelection[0].model_category_id}).then((function(t){t.data;e.$message({type:"success",message:"复制成功!"}),e.getData()})).catch((function(e){}))},deleteTemp:function(){console.log("delete")},handleSelectionChange:function(e){this.multipleSelection=e},handleDelete:function(){var e=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var t=[];e.multipleSelection.forEach((function(e){t.push(e.id)})),c({idList:t}).then((function(t){var n=t.data;"error"==n.status?e.$message({type:"error",message:"模型在使用中，删除失败!"}):(e.$message({type:"success",message:"删除成功!"}),e.getData())})).catch((function(t){e.$message({type:"error",message:"服务器响应异常!"})}))})).catch((function(e){}))},onSearch:function(){this.currentPage=1,this.getData()},handleCurrentChange:function(e){this.currentPage=e,this.getData()}}},d=p,m=(n("ae94"),n("623f")),f=Object(m["a"])(d,a,r,!1,null,"4bc9e033",null);t["default"]=f.exports},7108:function(e,t,n){"use strict";var a=n("7e23"),r=RegExp.prototype.exec;e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==a(e))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(e,t)}},8714:function(e,t,n){"use strict";var a=n("f1fe"),r=RegExp.prototype.exec,i=String.prototype.replace,o=r,s="lastIndex",l=function(){var e=/a/,t=/b*/g;return r.call(e,"a"),r.call(t,"a"),0!==e[s]||0!==t[s]}(),c=void 0!==/()??/.exec("")[1],u=l||c;u&&(o=function(e){var t,n,o,u,p=this;return c&&(n=new RegExp("^"+p.source+"$(?!\\s)",a.call(p))),l&&(t=p[s]),o=r.call(p,e),l&&o&&(p[s]=p.global?o.index+o[0].length:t),c&&o&&o.length>1&&i.call(o[0],n,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(o[u]=void 0)})),o}),e.exports=o},"9a33":function(e,t,n){"use strict";var a=n("2fd4"),r=n("69b3"),i=n("f63e"),o=n("e754"),s=n("eafa"),l=n("7108"),c=n("8714"),u=n("238a"),p=Math.min,d=[].push,m="split",f="length",h="lastIndex",g=4294967295,v=!u((function(){RegExp(g,"y")}));n("0aed")("split",2,(function(e,t,n,u){var y;return y="c"=="abbc"[m](/(b)*/)[1]||4!="test"[m](/(?:)/,-1)[f]||2!="ab"[m](/(?:ab)*/)[f]||4!="."[m](/(.?)(.?)/)[f]||"."[m](/()()/)[f]>1||""[m](/.?/)[f]?function(e,t){var r=String(this);if(void 0===e&&0===t)return[];if(!a(e))return n.call(r,e,t);var i,o,s,l=[],u=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,m=void 0===t?g:t>>>0,v=new RegExp(e.source,u+"g");while(i=c.call(v,r)){if(o=v[h],o>p&&(l.push(r.slice(p,i.index)),i[f]>1&&i.index<r[f]&&d.apply(l,i.slice(1)),s=i[0][f],p=o,l[f]>=m))break;v[h]===i.index&&v[h]++}return p===r[f]?!s&&v.test("")||l.push(""):l.push(r.slice(p)),l[f]>m?l.slice(0,m):l}:"0"[m](void 0,0)[f]?function(e,t){return void 0===e&&0===t?[]:n.call(this,e,t)}:n,[function(n,a){var r=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,r,a):y.call(String(r),n,a)},function(e,t){var a=u(y,e,this,t,y!==n);if(a.done)return a.value;var c=r(e),d=String(this),m=i(c,RegExp),f=c.unicode,h=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(v?"y":"g"),_=new m(v?c:"^(?:"+c.source+")",h),b=void 0===t?g:t>>>0;if(0===b)return[];if(0===d.length)return null===l(_,d)?[d]:[];var x=0,w=0,C=[];while(w<d.length){_.lastIndex=v?w:0;var S,$=l(_,v?d:d.slice(w));if(null===$||(S=p(s(_.lastIndex+(v?0:w)),d.length))===x)w=o(d,w,f);else{if(C.push(d.slice(x,w)),C.length===b)return C;for(var k=1;k<=$.length-1;k++)if(C.push($[k]),C.length===b)return C;w=x=S}}return C.push(d.slice(x)),C}]}))},a27e:function(e,t,n){"use strict";var a=n("f753"),r=n.n(a),i=n("64f3");r.a.defaults.headers.common["Cache-Control"]="no-cache, no-store, must-revalidate",r.a.defaults.headers.common["Pragma"]="no-cache",r.a.defaults.headers.common["Expires"]=0;var o={baseURL:"/interrogation"},s=r.a.create(o);s.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),s.interceptors.response.use((function(e){var t=e,n=t.status,a=t.statusText;if(200===n)return t;if(500===n)return i["Message"].error(a),Promise.reject(a);if(4e3===n){var r=t.data;localStorage.removeItem("isLogin"),localStorage.removeItem("userInfo");var o=encodeURIComponent(window.location.href);return window.location.href="".concat(r,"&&relayState=").concat(o),Promise.reject(t)}}),(function(e){return i["Message"].error("请求出错:".concat(e)),Promise.reject(e)})),t["a"]=s},aaba:function(e,t,n){"use strict";var a=n("8714");n("e46b")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},ae94:function(e,t,n){"use strict";var a=n("bf8b"),r=n.n(a);r.a},bf8b:function(e,t,n){},d71b:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"d",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s}));var a=n("a27e"),r=function(e){return a["a"].post("/modelCategory/queryPage",e)},i=function(e){return a["a"].post("/modelCategory/update",e)},o=function(e){return a["a"].post("/modelCategory/add",e)},s=function(e){return a["a"].post("/modelCategory/delete",e)}},e754:function(e,t,n){"use strict";var a=n("fc81")(!0);e.exports=function(e,t,n){return t+(n?a(e,t).length:1)}},f1fe:function(e,t,n){"use strict";var a=n("69b3");e.exports=function(){var e=a(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},fc81:function(e,t,n){var a=n("ee21"),r=n("f6b4");e.exports=function(e){return function(t,n){var i,o,s=String(r(t)),l=a(n),c=s.length;return l<0||l>=c?e?"":void 0:(i=s.charCodeAt(l),i<55296||i>56319||l+1===c||(o=s.charCodeAt(l+1))<56320||o>57343?e?s.charAt(l):i:e?s.slice(l,l+2):o-56320+(i-55296<<10)+65536)}}}}]);
//# sourceMappingURL=chunk-536b1243.0b11ca45.js.map