(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61786218"],{"013f":function(t,e,a){"use strict";var r=a("da51"),n=a.n(r);n.a},a27e:function(t,e,a){"use strict";var r=a("f753"),n=a.n(r),l=a("64f3");n.a.defaults.headers.common["Cache-Control"]="no-cache, no-store, must-revalidate",n.a.defaults.headers.common["Pragma"]="no-cache",n.a.defaults.headers.common["Expires"]=0;var o={baseURL:"/interrogation"},s=n.a.create(o);s.interceptors.request.use((function(t){return t}),(function(t){return Promise.reject(t)})),s.interceptors.response.use((function(t){var e=t,a=e.status,r=e.statusText;if(200===a)return e;if(500===a)return l["Message"].error(r),Promise.reject(r);if(4e3===a){var n=e.data;localStorage.removeItem("isLogin"),localStorage.removeItem("userInfo");var o=encodeURIComponent(window.location.href);return window.location.href="".concat(n,"&&relayState=").concat(o),Promise.reject(e)}}),(function(t){return l["Message"].error("请求出错:".concat(t)),Promise.reject(t)})),e["a"]=s},da51:function(t,e,a){},f0bd:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-row",{staticClass:"table-toolbar"},[a("el-col",{attrs:{span:13}},[t._v(" ")]),t._v(" "),a("el-col",{staticClass:"searchStyle",attrs:{span:7}},[a("span",{staticStyle:{"font-size":"14px"}},[t._v("审讯模板名称 ")]),t._v(" "),a("el-input",{attrs:{size:"small","prefix-icon":"el-icon-search",placeholder:"审讯模板名称",clearable:""},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}})],1),t._v(" "),a("el-col",{attrs:{span:3}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.onSearch}},[t._v("搜索")])],1)],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",size:"small",data:t.tableData,"tooltip-effect":"dark","header-row-class-name":"headStyle"}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"审讯模板名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"questionNum",width:"150",label:"问题数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"modelNum",width:"150",label:"模型数量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"useNum",width:"150",label:"使用次数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",width:"160",label:"更新时间"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"total,prev, pager, next,jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)},n=[],l=a("a27e"),o=function(t){return l["a"].post("/dataStatistics/dataStatisticsPageQuery",t)},s={filters:{statusFilter:function(t){var e={published:"success",draft:"gray",deleted:"danger"};return e[t]}},data:function(){return{list:null,listLoading:!0,searchValue:"",tableData:[],multipleSelection:[],currentPage:1,total:null,dialogFormVisible:!1,form:{name:""},formLabelWidth:"100px",type:"add"}},created:function(){this.getData()},methods:{getData:function(){var t=this,e={rows:10,page:this.currentPage,name:this.searchValue,status:"1"};this.listLoading=!0,o(e).then((function(e){var a=e.data;t.tableData=a.rows,t.total=a.total,t.listLoading=!1}))},onSearch:function(){this.currentPage=1,this.getData()},handleCurrentChange:function(t){this.currentPage=t,this.getData()}}},i=s,c=(a("013f"),a("623f")),u=Object(c["a"])(i,r,n,!1,null,"2c1d5f08",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-61786218.c8b2dd92.js.map