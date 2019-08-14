webpackJsonp([29],{1331:function(e,t,a){"use strict";function n(e){return l({url:"/court/infoManage/addClerk.jhtml",method:"GET",params:e})}function o(e){return l({url:"/court/infoManage/queryClerk.jhtml",method:"GET",params:e})}function i(e){return l({url:"/court/infoManage/deleteClerk.jhtml",method:"GET",params:{ids:e}})}function s(e){return l({url:"/court/infoManage/modifyClerk.jhtml",method:"GET",params:e})}Object.defineProperty(t,"__esModule",{value:!0}),t.add=n,t.list=o,t.del=i,t.update=s;var r=a(37),c=function(e){return e&&e.__esModule?e:{default:e}}(r),l=c.default.ajax},1332:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Card",{directives:[{name:"show",rawName:"v-show",value:e.cardState,expression:"cardState"}],staticStyle:{"margin-bottom":"16px"}},[a("p",{attrs:{slot:"title"},slot:"title"},[e._v("\n            "+e._s(e.op[e.cardState])+"书记员信息\n        ")]),e._v(" "),a("div",{staticClass:"maininfo-warp"},[a("Row",[a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    书记员编号\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.judgeNo)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    姓名\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:e.info.name,callback:function(t){e.$set(e.info,"name",t)},expression:"info.name"}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.name)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    出生年月\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("DatePicker",{staticStyle:{width:"100%"},attrs:{value:e.info.birthdayD,type:"date"},on:{"on-change":e.birthdayChange}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.birthdayD)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    身份证号\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2===e.cardState,expression:"cardState === 2"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:e.info.identity,callback:function(t){e.$set(e.info,"identity",t)},expression:"info.identity"}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.identity)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    手机号码\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:e.info.phone,callback:function(t){e.$set(e.info,"phone",t)},expression:"info.phone"}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.phone)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    微信号\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:e.info.openNum,callback:function(t){e.$set(e.info,"openNum",t)},expression:"info.openNum"}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.openNum)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    所属部门\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Select",{staticStyle:{width:"100%"},model:{value:e.info.departmentName,callback:function(t){e.$set(e.info,"departmentName",t)},expression:"info.departmentName"}},e._l(e.departmentList,function(t){return a("Option",{key:t.id,attrs:{value:t.name}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.departmentName)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    紧急联系人\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:e.info.emergencyContact,callback:function(t){e.$set(e.info,"emergencyContact",t)},expression:"info.emergencyContact"}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.emergencyContact)+"\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    采集时间\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.createDateD)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    紧急联系人号码\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:e.info.emergencyPhone,callback:function(t){e.$set(e.info,"emergencyPhone",t)},expression:"info.emergencyPhone"}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.emergencyPhone)+"\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    变更次数\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.changeNum)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    工作年限\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:e.info.workYear,callback:function(t){e.$set(e.info,"workYear",t)},expression:"info.workYear"}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.workYear)+"\n                ")]),e._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    备注\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"21"}},[a("Input",{staticStyle:{width:"100%"},model:{value:e.info.remark,callback:function(t){e.$set(e.info,"remark",t)},expression:"info.remark"}})],1),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:e.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"21"}},[e._v("\n                    "+e._s(e.info.remark)+"\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    最后修改人\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.lastModifyPeople)+"\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[e._v("\n                    最后修改时间\n                ")]),e._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==e.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col",attrs:{span:"9"}},[e._v("\n                    "+e._s(e.info.lastModifyDate&&e.formatDate(new Date(e.info.lastModifyDate),"yyyy-MM-dd hh-mm-ss"))+"\n                ")])],1)],1),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Button",{directives:[{name:"show",rawName:"v-show",value:1===e.cardState,expression:"cardState === 1"}],attrs:{type:"warning",size:"large"},on:{click:function(t){e.cardState=3}}},[e._v("修改")]),e._v(" "),a("Button",{directives:[{name:"show",rawName:"v-show",value:e.cardState>1,expression:"cardState > 1"}],attrs:{loading:e.saved,type:"success",size:"large"},on:{click:e.save}},[e._v("保存")]),e._v(" "),a("Button",{attrs:{type:"text",size:"large"},on:{click:function(t){e.cardState=0}}},[e._v("取消")])],1)])]),e._v(" "),a("Card",[a("Row",[a("Col",{attrs:{span:"3"}},[a("span",{staticStyle:{color:"#464c5b","font-size":"16px","font-weight":"700"}},[e._v("书记员信息库")])]),e._v(" "),a("Col",{attrs:{span:"21"}},[a("Button",{directives:[{name:"show",rawName:"v-show",value:!e.show1,expression:"!show1"}],staticStyle:{"margin-left":"10px"},attrs:{type:"ghost"},nativeOn:{click:function(t){e.show1=!0}}},[e._v("\n                    查询展开\n                    "),a("Icon",{attrs:{type:"arrow-down-b"}})],1),e._v(" "),a("Form",{directives:[{name:"show",rawName:"v-show",value:e.show1,expression:"show1"}],attrs:{model:e.formItem,inline:"","label-width":100}},[a("FormItem",{attrs:{label:"书记员编号："}},[a("Input",{staticStyle:{width:"200px"},model:{value:e.formItem.judgeNo,callback:function(t){e.$set(e.formItem,"judgeNo",t)},expression:"formItem.judgeNo"}})],1),e._v(" "),a("FormItem",{attrs:{label:"书记员姓名："}},[a("Input",{staticStyle:{width:"200px"},model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}})],1),e._v(" "),a("FormItem",{attrs:{label:"手机号码："}},[a("Input",{staticStyle:{width:"200px"},model:{value:e.formItem.phone,callback:function(t){e.$set(e.formItem,"phone",t)},expression:"formItem.phone"}})],1),e._v(" "),a("FormItem",{attrs:{label:"工作部门："}},[a("Select",{staticStyle:{width:"200px"},model:{value:e.formItem.departmentName,callback:function(t){e.$set(e.formItem,"departmentName",t)},expression:"formItem.departmentName"}},e._l(e.departmentList,function(t){return a("Option",{key:t.id,attrs:{value:t.name}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"工作年限："}},[a("Input",{staticStyle:{width:"200px"},model:{value:e.formItem.workYear,callback:function(t){e.$set(e.formItem,"workYear",t)},expression:"formItem.workYear"}})],1),e._v(" "),a("FormItem",{attrs:{label:"采集时间："}},[a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"date"},model:{value:e.formItem.createDate,callback:function(t){e.$set(e.formItem,"createDate",t)},expression:"formItem.createDate"}})],1),e._v(" "),a("div",{staticStyle:{display:"inline-block","padding-right":"30px",float:"right"}},[a("Button",{attrs:{type:"ghost"},on:{click:function(t){e.getList(1)}}},[e._v("查询")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"ghost"},on:{click:e.clean}},[e._v("清空")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"ghost"},nativeOn:{click:function(t){e.show1=!1}}},[e._v("关闭")])],1)],1)],1)],1),e._v(" "),a("ButtonGroup",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"}},[a("Button",{attrs:{size:"large",type:"primary"},on:{click:e.toAdd}},[e._v("添加")]),e._v(" "),a("Button",{attrs:{size:"large",type:"ghost"},on:{click:function(t){e.modal2=!0}}},[e._v("删除")])],1),e._v(" "),a("Table",{ref:"clerkTable",attrs:{stripe:"",columns:e.clerkcol,data:e.clerkdata},on:{"on-selection-change":e.tableCheck}}),e._v(" "),e.spinShow?a("Spin",{attrs:{size:"large",fix:""}}):e._e(),e._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:e.totalPage,"page-size":1,current:e.pageNumber},on:{"on-change":e.changePage}})],1)])],1),e._v(" "),a("Modal",{attrs:{width:"360"},model:{value:e.modal2,callback:function(t){e.modal2=t},expression:"modal2"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v("确认删除")])],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("p",[e._v("您将删除")]),e._v(" "),e._l(e.checkNames,function(t,n){return a("span",{key:n},[e._v("\n                【"+e._s(t)+"】\n            ")])}),e._v(" "),a("p",[e._v("共"+e._s(e.checkNames.length)+"条数据")])],2),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error",size:"large",long:"",loading:e.del_loading},on:{click:e.delClerk}},[e._v("删除")])],1)])],1)},o=[];n._withStripped=!0;var i={render:n,staticRenderFns:o};t.default=i},612:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(885),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);var s=a(1332),r=a.n(s),c=a(31),l=c(o.a,r.a,!1,null,null,null);l.options.__file="src\\information\\clerkInfo\\clerkInfo.vue",t.default=l.exports},626:function(e,t,a){"use strict";function n(){return u({url:"/court/createCase/queryBrief.jhtml",method:"get"})}function o(e){return u({url:"/court/scheduling/queryTribunals.jhtml",method:"get",params:{id:e}})}function i(e,t,a){return u({url:"/court/send/queryLawCase.jhtml",method:"POST",params:{caseNo:e,plaintiffName:t,defendantName:a}})}function s(e){return u({url:"/court/infoManage/queryLawCaseAll.jhtml",method:"GET",params:{id:e}})}function r(e,t,a,n,o,i,s){return u({url:"/court/infoManage/queryLawCase.jhtml",method:"GET",params:{caseNo:e,caseName:t,briefName:a,litigantName:n,filingDate1:o,filingDate2:i,pageNumber:s}})}function c(e){return u({url:"/court/process/queryProcessNote.jhtml",method:"GET",params:{lawCaseId:e}})}function l(e){return u({url:"/court/infoManage/lawCaseInfo.jhtml",method:"GET",params:{caseNo:e}})}function m(){return u({url:"/court/infoManage/courtList.jhtml",method:"GET"})}Object.defineProperty(t,"__esModule",{value:!0}),t.getBrief=n,t.getTribunal=o,t.queryCase=i,t.queryCaseInfo=s,t.caselist=r,t.queryProcessNote=c,t.searchCase=l,t.courtList=m;var d=a(37),f=function(e){return e&&e.__esModule?e:{default:e}}(d),u=f.default.ajax},885:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(99),o=function(e){return e&&e.__esModule?e:{default:e}}(n),i=a(1331),s=a(626),r=a(229);t.default={data:function(){var e=this;return{cardState:0,op:["","查看","添加","修改"],show1:!1,saved:!1,del_loading:!1,modal2:!1,spinShow:!1,totalPage:0,pageNumber:0,checkIds:[],checkNames:[],departmentList:[],formItem:{judgeNo:"",name:"",phone:"",department:"",departmentName:"",departmentId:"",workYear:"",createDate:""},clerkcol:[{type:"selection",width:40,align:"center"},{title:"书记员编号",key:"judgeNo",align:"center",width:100},{title:"书记员账号",key:"admin",align:"center",width:100,render:function(e,t){return e("span",{},t.row.admin.name)}},{title:"书记员姓名",key:"name",align:"center",ellipsis:!0},{title:"出生年月",key:"birthday",align:"center",render:function(e,t){return e("span",{},t.row.birthday&&(0,r.formatDate)(new Date(t.row.birthday),"yyyy-MM-dd"))}},{title:"工作年限",key:"workYear",align:"center",width:100},{title:"手机号码",key:"phone",align:"center"},{title:"工作部门",key:"department",align:"center",render:function(e,t){return e("span",{},t.row.court.name)}},{title:"采集时间",key:"createDate",align:"center",render:function(e,t){return e("span",{},(0,r.formatDate)(new Date(t.row.createDate),"yyyy-MM-dd hh:mm:ss"))}},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){var t=JSON.parse((0,o.default)(a.row));e.info=t,e.info.departmentName=e.info.court.name,e.info.createDateD=e.info.createDate&&e.formatDate(new Date(e.info.createDate),"yyyy-MM-dd hh:mm:ss"),e.info.birthdayD=e.info.birthday&&e.formatDate(new Date(e.info.birthday),"yyyy-MM-dd"),e.cardState=1}}},"详情"),t("Button",{props:{type:"warning",size:"small"},on:{click:function(){var t=JSON.parse((0,o.default)(a.row));e.info=t,e.info.departmentName=e.info.court.name,e.info.createDateD=e.formatDate(new Date(e.info.createDate),"yyyy-MM-dd hh:mm:ss"),e.info.birthdayD=e.formatDate(new Date(e.info.birthday),"yyyy-MM-dd"),e.cardState=3}}},"修改")])}}],clerkdata:[],info:{judgeNo:"",name:"",birthdayD:"",identity:"",phone:"",openNum:"",department:"",departmentName:"",departmentId:"",emergencyContact:"",emergencyPhone:"",createDate:"",changeNum:"",workYear:"",remark:"",lastModifyPeople:"",lastModifyDate:""}}},mounted:function(){this.getList(1),this.getCourtList()},methods:{getCourtList:function(){var e=this;(0,s.courtList)().then(function(t){100==t.data.state&&t.data.result.map(function(t){e.departmentList.push({name:t.name,id:t.id})})}).catch(function(e){})},getList:function(e){var t=this,a=this;this.departmentList.map(function(e){e.name==t.formItem.departmentName&&(t.formItem.departmentId=e.id)});var n={judgeNo:this.formItem.judgeNo,name:this.formItem.name,phone:this.formItem.phone,courtId:this.formItem.departmentId,workYear:this.formItem.workYear,createDate:this.formItem.createDate&&new Date(this.formItem.createDate).getTime()};n.pageNumber=e,(0,i.list)(n).then(function(e){var t=e.data;100===t.state?(a.clerkdata=t.result.content,a.pageNumber=t.result.pageNumber,a.totalPage=t.result.totalPage):a.$Message.info(t.message)}).catch(function(){a.$Message.error("网络错误, 查询书记员列表失败")})},addClerk:function(){this.$refs.clerkTable.clearCurrentRow()},save:function(){var e=this,t=this;t.saved=!0,this.departmentList.map(function(t){t.name==e.info.departmentName&&(e.info.departmentId=t.id)});var a={judgeNo:this.info.judgeNo,name:this.info.name,birthday:this.info.birthdayD&&new Date(this.info.birthdayD).getTime(),phone:this.info.phone,openNum:this.info.openNum,identity:this.info.identity,courtId:this.info.departmentId,emergencyContact:this.info.emergencyContact,emergencyPhone:this.info.emergencyPhone,workYear:this.info.workYear,remark:this.info.remark};2===this.cardState?(a.identity=this.info.identity,(0,i.add)(a).then(function(a){var n=a.data;t.$Message.info(n.message),100===n.state&&(t.getList(t.pageNumber),e.info.judgeNo="",e.info.name="",e.info.birthdayD="",e.info.phone="",e.info.openNum="",e.info.departmentName="",e.info.emergencyContact="",e.info.emergencyPhone="",e.info.workYear="",e.info.remark="",e.info.identity=""),t.saved=!1}).catch(function(){t.$Message.error("网络错误"),t.saved=!1})):(0,i.update)(a).then(function(a){var n=a.data;t.$Message.info(n.message),100===n.state&&(t.getList(t.pageNumber),e.info.judgeNo="",e.info.name="",e.info.birthdayD="",e.info.phone="",e.info.openNum="",e.info.departmentName="",e.info.emergencyContact="",e.info.emergencyPhone="",e.info.workYear="",e.info.remark="",e.info.identity="",e.cardState=0),t.saved=!1}).catch(function(){t.$Message.error("网络错误"),t.saved=!1})},delClerk:function(){this.spinShow=!0,this.modal2=!1;var e=this;(0,i.del)(e.checkIds).then(function(t){e.spinShow=!1;var a=t.data;e.$Message.info(a.message),100===a.state&&e.getList(e.pageNumber)}).catch(function(){e.spinShow=!1,e.$Message.error("网络错误")})},tableCheck:function(e){for(var t=[],a=[],n=0;n<e.length;n++){var o=e[n];t.push(o.id),a.push(o.name)}this.checkNames=a,this.checkIds=t},changePage:function(e){this.getList(e)},clean:function(){this.formItem={id:"",name:"",phone:"",department:"",workYear:"",createDate:""}},toAdd:function(){this.cardState=2,this.info={judgeNo:"",name:"",birthdayD:"",identity:"",phone:"",openNum:"",department:"",emergencyContact:"",emergencyPhone:"",createDateD:"",changeNum:"",workYear:"",remark:"",lastModifyPeople:"",lastModifyDate:""}},birthdayChange:function(e){this.info.birthdayD=e},createDateChange:function(e){this.info.createDateD=e},exportExcel:function(){},formatDate:function(e,t){return(0,r.formatDate)(e,t)}}}}});