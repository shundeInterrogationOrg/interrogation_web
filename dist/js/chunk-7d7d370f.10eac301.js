(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d7d370f"],{"371d":function(e,t,l){"use strict";l.r(t);var i=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"template-manage"},[l("div",{staticClass:"temp-title"},[l("div",{staticClass:"toolBtn"},[l("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:e.addTemp}},[e._v("添加模板")])],1),e._v(" "),l("div",{staticClass:"toolBtn"},[l("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-picture-outline"},on:{click:e.copyTemp}},[e._v("复制")])],1),e._v(" "),l("div",{staticClass:"toolBtn"},[l("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-remove-outline"},on:{click:e.deleteTemp}},[e._v("删除")])],1)]),e._v(" "),l("div",{staticClass:"temp-list"},[l("el-table",{ref:"moduleTable",staticClass:"template-list",staticStyle:{width:"100%"},attrs:{data:e.tempList}},[l("el-table-column",{attrs:{label:"模板名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.editing?l("div",[l("el-input",{attrs:{placeholder:"请填写模板名称"},model:{value:t.row.moduleName,callback:function(l){e.$set(t.row,"moduleName",l)},expression:"scope.row.moduleName"}})],1):l("div",[l("span",[e._v(e._s(t.row.moduleName))])])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"调用模型/程序"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.editing?l("div",[l("el-input",{attrs:{placeholder:"请填写调用模型/程序"},model:{value:t.row.moduleIp,callback:function(l){e.$set(t.row,"moduleIp",l)},expression:"scope.row.moduleIp"}})],1):l("div",[l("span",[e._v(e._s(t.row.moduleIp))])])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"模型类别"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.editing?l("div",[l("el-select",{attrs:{placeholder:"模型类别"},model:{value:t.row.moduleType,callback:function(l){e.$set(t.row,"moduleType",l)},expression:"scope.row.moduleType"}},e._l(e.enhanceDeal,(function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1):l("div",[l("span",[e._v(e._s(t.row.moduleType))])])]}}])}),e._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("div",{staticClass:"operate-groups"},[t.row.editing?e._e():l("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit-outline"},on:{click:function(l){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑\n            ")]),e._v(" "),t.row.editing?l("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-success"},on:{click:function(l){return e.handleSave(t.$index,t.row)}}},[e._v("保存\n            ")]):e._e(),e._v(" "),t.row.editing?e._e():l("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(l){return e.handleDelete(t.$index,t.row)}}},[e._v("删除\n            ")]),e._v(" "),t.row.editing?l("el-button",{attrs:{size:"mini",type:"warning",icon:"el-icon-warning"},on:{click:function(l){return e.handleCancel(t.$index,t.row)}}},[e._v("取消\n            ")]):e._e()],1)]}}])})],1)],1)])},n=[],o={data:function(){return{tempList:[],imageType:[{label:"CT 头颅平扫",value:"CT 头颅平扫"},{label:"CT 腹部",value:"CT 腹部"},{label:"CT 胸部",value:"CT 胸部"},{label:"CT 脊柱",value:"CT 脊柱"},{label:"胸腺钼靶",value:"胸腺钼靶"},{label:"MRI",value:"MRI"}],enhanceDeal:[{label:"通用类",value:"通用类"}]}},created:function(){this.tempList=JSON.parse(localStorage.getItem("tempList"))},methods:{swapItems:function(e,t,l){return e[t]=e.splice(l,1,e[t])[0],e},handleUp:function(e,t){0!==e&&this.swapItems(this.tempList,e,e-1)},handleDown:function(e,t){e!==this.tempList.length-1&&this.swapItems(this.tempList,e,e+1)},handleEdit:function(e,t){this.$set(this.tempList[e],"editing",!0)},handleSave:function(e,t){t.moduleName&&t.moduleIp&&t.moduleType?(this.$set(this.tempList[e],"editing",!1),localStorage.setItem("tempList",JSON.stringify(this.tempList))):this.$message.error("新建模型，请填写完全！")},handleCancel:function(e,t){this.$set(this.tempList[e],"editing",!1)},addTemp:function(){this.tempList=this.tempList||[],this.tempList.push({moduleName:"",moduleIp:"",moduleType:"",editing:!0})},copyTemp:function(){console.log("copy")},deleteTemp:function(){console.log("delete")},handleDelete:function(e,t){var l=this;this.$confirm("此操作将永久删除该条模板, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){l.tempList.splice(e,1),localStorage.setItem("tempList",JSON.stringify(l.tempList)),l.$message({type:"success",message:"删除成功!"})})).catch((function(e){l.$message({type:"error",message:e})}))}}},s=o,a=(l("3e8e"),l("2877")),c=Object(a["a"])(s,i,n,!1,null,"54cff39c",null);t["default"]=c.exports},"3e8e":function(e,t,l){"use strict";var i=l("c37c"),n=l.n(i);n.a},c37c:function(e,t,l){}}]);
//# sourceMappingURL=chunk-7d7d370f.10eac301.js.map