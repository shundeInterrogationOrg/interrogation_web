(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-773533ba"],{"1e17":function(e,t,a){"use strict";var r=a("d7b3"),n=a.n(r);n.a},a27e:function(e,t,a){"use strict";var r=a("f753"),n=a.n(r),l=a("64f3");n.a.defaults.headers.common["Cache-Control"]="no-cache, no-store, must-revalidate",n.a.defaults.headers.common["Pragma"]="no-cache",n.a.defaults.headers.common["Expires"]=0;var o={baseURL:"/interrogation"},s=n.a.create(o);s.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),s.interceptors.response.use((function(e){var t=e,a=t.status,r=t.statusText;if(200===a)return t;if(500===a)return l["Message"].error(r),Promise.reject(r);if(4e3===a){var n=t.data;localStorage.removeItem("isLogin"),localStorage.removeItem("userInfo");var o=encodeURIComponent(window.location.href);return window.location.href="".concat(n,"&&relayState=").concat(o),Promise.reject(t)}}),(function(e){return l["Message"].error("请求出错:".concat(e)),Promise.reject(e)})),t["a"]=s},d7b3:function(e,t,a){},f0bd:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-row",{staticClass:"table-toolbar"},[a("el-col",{attrs:{span:13}},[e._v(" ")]),e._v(" "),a("el-col",{staticClass:"searchStyle",attrs:{span:7}},[a("span",{staticStyle:{"font-size":"14px"}},[e._v("审讯模板名称 ")]),e._v(" "),a("el-input",{attrs:{size:"small","prefix-icon":"el-icon-search",placeholder:"审讯模板名称",clearable:""},model:{value:e.searchValue,callback:function(t){e.searchValue=t},expression:"searchValue"}})],1),e._v(" "),a("el-col",{attrs:{span:3}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.onSearch}},[e._v("搜索")])],1)],1),e._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",size:"small",data:e.tableData,"tooltip-effect":"dark","header-row-class-name":"headStyle"}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"审讯模板名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"questionNum",width:"150",label:"问题数量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"modelNum",width:"150",label:"模型数量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"useNum",width:"150",label:"使用次数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updateTime",width:"160",label:"更新时间"}})],1),e._v(" "),a("el-pagination",{attrs:{background:"",layout:"total,prev, pager, next,jumper",total:e.total},on:{"current-change":e.handleCurrentChange}})],1)},n=[],l=a("a27e"),o=function(e){return l["a"].post("/dataStatistics/dataStatisticsPageQuery",e)},s={filters:{statusFilter:function(e){var t={published:"success",draft:"gray",deleted:"danger"};return t[e]}},data:function(){return{list:null,listLoading:!0,searchValue:"",tableData:[],multipleSelection:[],currentPage:1,total:null,dialogFormVisible:!1,form:{name:""},formLabelWidth:"100px",type:"add"}},created:function(){this.getData()},methods:{getData:function(){var e=this,t={rows:10,page:this.currentPage,name:this.searchValue};this.listLoading=!0,o(t).then((function(t){var a=t.data;e.tableData=a.rows,e.total=a.total,e.listLoading=!1}))},onSearch:function(){this.currentPage=1,this.getData()},handleCurrentChange:function(e){this.currentPage=e,this.getData()}}},i=s,c=(a("1e17"),a("623f")),u=Object(c["a"])(i,r,n,!1,null,"838c5870",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-773533ba.ee3fe180.js.map