(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07625dc3"],{2173:function(e,t,a){},"8ef3":function(e,t,a){"use strict";var s=a("2173"),r=a.n(s);r.a},9406:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{staticClass:"table-toolbar"},[a("el-col",{attrs:{span:13}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.doAdd}},[e._v("添加类别")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.deleteAll}},[e._v("删除")])],1),e._v(" "),a("el-col",{staticClass:"searchStyle",attrs:{span:7}},[a("span",[e._v("案件类型名称:")]),e._v(" "),a("el-input",{attrs:{size:"small","prefix-icon":"el-icon-search",placeholder:"案件类型名称",clearable:""},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}})],1),e._v(" "),a("el-col",{attrs:{span:3}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.onSearch}},[e._v("搜索")])],1)],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",size:"small",data:e.tableData,"tooltip-effect":"dark","header-row-class-name":"headStyle"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"案件类别"}}),e._v(" "),a("el-table-column",{attrs:{label:"更新时间",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.update_time))]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.handleClick(t.row)}}},[e._v("编辑")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{background:"",layout:"total,prev, pager, next,jumper",total:e.total},on:{"current-change":e.handleCurrentChange}}),e._v(" "),a("el-dialog",{attrs:{title:"案件信息",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-form-item",{attrs:{label:"案件类别","label-width":e.formLabelWidth}},[a("el-input",{attrs:{autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.handleCase}},[e._v("确 定")])],1)],1)],1)},r=[],n=(a("6d57"),a("63ff"),a("57f0")),i=(a("cc57"),a("9cf5")),o={filters:{statusFilter:function(e){var t={published:"success",draft:"gray",deleted:"danger"};return t[e]}},data:function(){return{list:null,listLoading:!0,searchValue:"",tableData:[],multipleSelection:[],currentPage:1,total:null,dialogFormVisible:!1,form:{name:""},formLabelWidth:"100px",type:"add",status:"1"}},created:function(){this.getData()},methods:{getData:function(){var e=this,t={rows:10,page:this.currentPage,name:this.searchValue,status:this.status};this.listLoading=!0,Object(i["c"])(t).then((function(t){var a=t.data;e.tableData=a.rows,e.total=a.total,e.listLoading=!1}))},handleSelectionChange:function(e){this.multipleSelection=e},onSearch:function(){this.currentPage=1,this.getData()},doAdd:function(){this.dialogFormVisible=!0,this.form.name="",this.form.id="",this.form.status="",this.type="add"},handleClick:function(e){this.dialogFormVisible=!0,this.type="updata",this.form.name=e.name,this.form.id=e.id,this.form.status=e.status},handleCase:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,a,s,r,n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("add"!==this.type){e.next=15;break}return t={name:this.form.name,status:"1"},e.prev=2,e.next=5,Object(i["a"])(t);case 5:a=e.sent,s=a.data,"sucess"===s.status?(this.$message.success("新增案件成功"),this.currentPage=1,this.getData()):"repeat"===s.status?this.$message.error("新增案件已存在"):this.$message.error("新增案件失败"),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](2),this.$message.error("新增案件失败");case 13:e.next=27;break;case 15:return r={name:this.form.name,id:this.form.id,status:this.form.status},e.prev=16,e.next=19,Object(i["d"])(r);case 19:n=e.sent,o=n.data,"sucess"===o.status?(this.$message.success("修改案件成功"),this.getData()):"repeat"===o.status?this.$message.error("修改案件已存在"):this.$message.error("修改案件失败"),e.next=27;break;case 24:e.prev=24,e.t1=e["catch"](16),this.$message.error("修改案件失败");case 27:this.dialogFormVisible=!1;case 28:case"end":return e.stop()}}),e,this,[[2,10],[16,24]])})));function t(){return e.apply(this,arguments)}return t}(),deleteAll:function(){var e=this;0===this.multipleSelection.length?this.$message("请选择要删除的信息"):this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=[],e.multipleSelection.forEach((function(e){a.push(e.id)})),s={idList:a},s.status="0",t.prev=4,t.next=7,Object(i["b"])(s);case 7:r=t.sent,n=r.data,"sucess"===n.status?(e.$message.success("删除成功"),e.currentPage=1,e.getData()):e.$message.error("删除失败，案件类别使用中"),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](4),e.$message.error("删除失败，案件类别使用中");case 15:case"end":return t.stop()}}),t,null,[[4,12]])})))).catch((function(){e.$message({type:"info",message:"已取消删除"}),e.multipleSelection.forEach((function(t){e.$refs.multipleTable.toggleRowSelection(t)})),e.multipleSelection=[]}))},handleCurrentChange:function(e){this.currentPage=e,this.getData()}}},l=o,c=(a("8ef3"),a("623f")),u=Object(c["a"])(l,s,r,!1,null,"7d73d324",null);t["default"]=u.exports},"9cf5":function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return i})),a.d(t,"d",(function(){return o}));var s=a("a27e"),r=function(e){var t=s["a"].post("/caseClassification/queryPage",e);return t},n=function(e){return s["a"].post("/caseClassification/add",e)},i=function(e){return s["a"].post("/caseClassification/delete",e)},o=function(e){return s["a"].post("/caseClassification/update",e)}},a27e:function(e,t,a){"use strict";var s=a("f753"),r=a.n(s),n=a("64f3");r.a.defaults.headers.common["Cache-Control"]="no-cache, no-store, must-revalidate",r.a.defaults.headers.common["Pragma"]="no-cache",r.a.defaults.headers.common["Expires"]=0;var i={baseURL:"/interrogation"},o=r.a.create(i);o.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),o.interceptors.response.use((function(e){var t=e,a=t.status,s=t.statusText;if(200===a)return t;if(500===a)return n["Message"].error(s),Promise.reject(s);if(4e3===a){var r=t.data;localStorage.removeItem("isLogin"),localStorage.removeItem("userInfo");var i=encodeURIComponent(window.location.href);return window.location.href="".concat(r,"&&relayState=").concat(i),Promise.reject(t)}}),(function(e){return n["Message"].error("请求出错:".concat(e)),Promise.reject(e)})),t["a"]=o}}]);
//# sourceMappingURL=chunk-07625dc3.5b8b8646.js.map