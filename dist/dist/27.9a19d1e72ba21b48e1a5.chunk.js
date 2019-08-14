webpackJsonp([27],{1335:function(t,e,a){"use strict";function n(t){return c({url:"/court/infoManage/addServicePersonnel.jhtml",method:"GET",params:t})}function o(t){return c({url:"/court/infoManage/queryServicePersonnel.jhtml",method:"GET",params:t})}function i(t){return c({url:"/court/infoManage//deleteServicePersonnel.jhtml",method:"GET",params:{ids:t}})}function s(t){return c({url:"/court/infoManage/modifyServicePersonnel.jhtml",method:"GET",params:t})}Object.defineProperty(e,"__esModule",{value:!0}),e.add=n,e.list=o,e.del=i,e.update=s;var r=a(37),l=function(t){return t&&t.__esModule?t:{default:t}}(r),c=l.default.ajax},1336:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Card",{directives:[{name:"show",rawName:"v-show",value:t.cardState,expression:"cardState"}],staticStyle:{"margin-bottom":"16px"}},[a("p",{attrs:{slot:"title"},slot:"title"},[t._v("\n            "+t._s(t.op[t.cardState])+"送达专员信息\n        ")]),t._v(" "),a("div",{staticClass:"maininfo-warp"},[a("Row",[a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[t._v("\n                    工号\n                    "),a("Tooltip",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1&&!t.info.jobNumber,expression:"cardState > 1 && !info.jobNumber"}],attrs:{content:"此项必填"}},[a("Icon",{staticStyle:{color:"#ed3f14"},attrs:{type:"android-alert"}})],1)],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:t.info.jobNumber,callback:function(e){t.$set(t.info,"jobNumber",e)},expression:"info.jobNumber"}})],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[t._v("\n                    "+t._s(t.info.jobNumber)+"\n                ")]),t._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[t._v("\n                    姓名\n                    "),a("Tooltip",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1&&!t.info.name,expression:"cardState > 1 && !info.name"}],attrs:{content:"此项必填"}},[a("Icon",{staticStyle:{color:"#ed3f14"},attrs:{type:"android-alert"}})],1)],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[t._v("\n                    "+t._s(t.info.name)+"\n                ")]),t._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[t._v("\n                    性别\n                ")]),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Select",{staticStyle:{width:"100%"},model:{value:t.info.sex,callback:function(e){t.$set(t.info,"sex",e)},expression:"info.sex"}},[a("Option",{attrs:{value:"0"}},[t._v("男")]),t._v(" "),a("Option",{attrs:{value:"1"}},[t._v("女")])],1)],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[t._v("\n                    "+t._s(0==t.info.sex?"男":"女")+"\n                ")]),t._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[t._v("\n                    身份证号\n                    "),a("Tooltip",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1&&!t.info.identity,expression:"cardState > 1 && !info.identity"}],attrs:{content:"此项必填"}},[a("Icon",{staticStyle:{color:"#ed3f14"},attrs:{type:"android-alert"}})],1)],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2===t.cardState,expression:"cardState === 2"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:t.info.identity,callback:function(e){t.$set(t.info,"identity",e)},expression:"info.identity"}})],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:2!==t.cardState,expression:"cardState !== 2"}],staticClass:"maininfo-col",attrs:{span:"9"}},[t._v("\n                    "+t._s(t.info.identity)+"\n                ")]),t._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[t._v("\n                    所属部门\n                ")]),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Select",{staticStyle:{width:"100%"},model:{value:t.info.departmentName,callback:function(e){t.$set(t.info,"departmentName",e)},expression:"info.departmentName"}},t._l(t.departmentList,function(e){return a("Option",{key:e.id,attrs:{value:e.name}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[t._v("\n                    "+t._s(t.info.departmentName)+"\n                ")]),t._v(" "),a("Col",{staticClass:"maininfo-col maininfo-col-label",attrs:{span:"3"}},[t._v("\n                    手机号码\n                ")]),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1,expression:"cardState > 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[a("Input",{staticStyle:{width:"100%"},model:{value:t.info.phone,callback:function(e){t.$set(t.info,"phone",e)},expression:"info.phone"}})],1),t._v(" "),a("Col",{directives:[{name:"show",rawName:"v-show",value:t.cardState<=1,expression:"cardState <= 1"}],staticClass:"maininfo-col",attrs:{span:"9"}},[t._v("\n                    "+t._s(t.info.phone)+"\n                ")])],1)],1),t._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Button",{directives:[{name:"show",rawName:"v-show",value:1===t.cardState,expression:"cardState === 1"}],attrs:{type:"warning",size:"large"},on:{click:function(e){t.cardState=3}}},[t._v("修改")]),t._v(" "),a("Button",{directives:[{name:"show",rawName:"v-show",value:t.cardState>1,expression:"cardState > 1"}],attrs:{loading:t.saved,type:"success",size:"large"},on:{click:t.save}},[t._v("保存")]),t._v(" "),a("Button",{attrs:{type:"text",size:"large"},on:{click:function(e){t.cardState=0}}},[t._v("取消")])],1)])]),t._v(" "),a("Card",[a("Row",[a("Col",{attrs:{span:"3"}},[a("span",{staticStyle:{color:"#464c5b","font-size":"16px","font-weight":"700"}},[t._v("送达专员信息库")])]),t._v(" "),a("Col",{attrs:{span:"21"}},[a("Button",{directives:[{name:"show",rawName:"v-show",value:!t.show1,expression:"!show1"}],staticStyle:{"margin-left":"10px"},attrs:{type:"ghost"},nativeOn:{click:function(e){t.show1=!0}}},[t._v("\n                    查询展开\n                    "),a("Icon",{attrs:{type:"arrow-down-b"}})],1),t._v(" "),a("Form",{directives:[{name:"show",rawName:"v-show",value:t.show1,expression:"show1"}],attrs:{model:t.formItem,inline:"","label-width":100}},[a("FormItem",{attrs:{label:"工号："}},[a("Input",{staticStyle:{width:"200px"},model:{value:t.formItem.jobNumber,callback:function(e){t.$set(t.formItem,"jobNumber",e)},expression:"formItem.jobNumber"}})],1),t._v(" "),a("FormItem",{attrs:{label:"姓名："}},[a("Input",{staticStyle:{width:"200px"},model:{value:t.formItem.name,callback:function(e){t.$set(t.formItem,"name",e)},expression:"formItem.name"}})],1),t._v(" "),a("FormItem",{attrs:{label:"性别："}},[a("Select",{staticStyle:{width:"200px"},model:{value:t.formItem.sex,callback:function(e){t.$set(t.formItem,"sex",e)},expression:"formItem.sex"}},[a("Option",{attrs:{value:"0"}},[t._v("男")]),t._v(" "),a("Option",{attrs:{value:"1"}},[t._v("女")])],1)],1),t._v(" "),a("FormItem",{attrs:{label:"手机号码："}},[a("Input",{staticStyle:{width:"200px"},model:{value:t.formItem.phone,callback:function(e){t.$set(t.formItem,"phone",e)},expression:"formItem.phone"}})],1),t._v(" "),a("FormItem",{attrs:{label:"身份证号："}},[a("Input",{staticStyle:{width:"200px"},model:{value:t.formItem.identity,callback:function(e){t.$set(t.formItem,"identity",e)},expression:"formItem.identity"}})],1),t._v(" "),a("div",{staticStyle:{display:"inline-block","padding-right":"30px",float:"right"}},[a("Button",{attrs:{type:"ghost"},on:{click:function(e){t.getList(1)}}},[t._v("查询")]),t._v(" "),a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"ghost"},on:{click:t.clean}},[t._v("清空")]),t._v(" "),a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"ghost"},nativeOn:{click:function(e){t.show1=!1}}},[t._v("关闭")])],1)],1)],1)],1),t._v(" "),a("ButtonGroup",{staticStyle:{"margin-top":"10px","margin-bottom":"10px"}},[a("Button",{attrs:{size:"large",type:"primary"},on:{click:t.toAdd}},[t._v("添加")]),t._v(" "),a("Button",{attrs:{size:"large",type:"ghost"},on:{click:function(e){t.modal2=!0}}},[t._v("删除")])],1),t._v(" "),a("Table",{ref:"judgeTable",attrs:{stripe:"",columns:t.judgecol,data:t.judgedata},on:{"on-selection-change":t.tableCheck}}),t._v(" "),t.spinShow?a("Spin",{attrs:{size:"large",fix:""}}):t._e(),t._v(" "),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.totalPage,"page-size":1,current:t.pageNumber},on:{"on-change":t.changePage}})],1)])],1),t._v(" "),a("Modal",{attrs:{width:"360"},model:{value:t.modal2,callback:function(e){t.modal2=e},expression:"modal2"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),t._v(" "),a("span",[t._v("确认删除")])],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("p",[t._v("您将删除")]),t._v(" "),t._l(t.checkNames,function(e,n){return a("span",{key:n},[t._v("\n                【"+t._s(e)+"】\n            ")])}),t._v(" "),a("p",[t._v("共"+t._s(t.checkNames.length)+"条数据")])],2),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error",size:"large",long:"",loading:t.del_loading},on:{click:t.delJudge}},[t._v("删除")])],1)])],1)},o=[];n._withStripped=!0;var i={render:n,staticRenderFns:o};e.default=i},614:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(887),o=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);var s=a(1336),r=a.n(s),l=a(31),c=l(o.a,r.a,!1,null,null,null);c.options.__file="src\\information\\serviceInfo\\serviceInfo.vue",e.default=c.exports},626:function(t,e,a){"use strict";function n(){return f({url:"/court/createCase/queryBrief.jhtml",method:"get"})}function o(t){return f({url:"/court/scheduling/queryTribunals.jhtml",method:"get",params:{id:t}})}function i(t,e,a){return f({url:"/court/send/queryLawCase.jhtml",method:"POST",params:{caseNo:t,plaintiffName:e,defendantName:a}})}function s(t){return f({url:"/court/infoManage/queryLawCaseAll.jhtml",method:"GET",params:{id:t}})}function r(t,e,a,n,o,i,s){return f({url:"/court/infoManage/queryLawCase.jhtml",method:"GET",params:{caseNo:t,caseName:e,briefName:a,litigantName:n,filingDate1:o,filingDate2:i,pageNumber:s}})}function l(t){return f({url:"/court/process/queryProcessNote.jhtml",method:"GET",params:{lawCaseId:t}})}function c(t){return f({url:"/court/infoManage/lawCaseInfo.jhtml",method:"GET",params:{caseNo:t}})}function m(){return f({url:"/court/infoManage/courtList.jhtml",method:"GET"})}Object.defineProperty(e,"__esModule",{value:!0}),e.getBrief=n,e.getTribunal=o,e.queryCase=i,e.queryCaseInfo=s,e.caselist=r,e.queryProcessNote=l,e.searchCase=c,e.courtList=m;var d=a(37),u=function(t){return t&&t.__esModule?t:{default:t}}(d),f=u.default.ajax},887:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(99),o=function(t){return t&&t.__esModule?t:{default:t}}(n),i=a(1335),s=a(626),r=a(229);e.default={data:function(){var t=this;return{cardState:0,op:["","查看","添加","修改"],show1:!1,saved:!1,del_loading:!1,modal2:!1,spinShow:!1,totalPage:0,pageNumber:0,checkIds:[],checkNames:[],departmentList:[],formItem:{jobNumber:"",name:"",phone:"",identity:"",departmentName:"",sex:""},judgecol:[{type:"selection",width:40,align:"center"},{title:"工号",key:"jobNumber",align:"center",width:100},{title:"姓名",key:"name",align:"center",ellipsis:!0},{title:"手机号码",key:"phone",align:"center"},{title:"身份证号",key:"identity",align:"center"},{title:"操作",key:"action",width:150,align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){var e=JSON.parse((0,o.default)(a.row));t.info=e,t.cardState=1}}},"详情"),e("Button",{props:{type:"warning",size:"small"},on:{click:function(){var e=JSON.parse((0,o.default)(a.row));t.info=e,t.cardState=3}}},"修改")])}}],judgedata:[],info:{jobNumber:"",name:"",phone:"",identity:"",departmentName:"",sex:""}}},mounted:function(){this.getList(1),this.getCourtList()},methods:{getCourtList:function(){var t=this;(0,s.courtList)().then(function(e){100==e.data.state&&e.data.result.map(function(e){t.departmentList.push({name:e.name,id:e.id})})}).catch(function(t){})},getList:function(t){var e=this,a={jobNumber:this.formItem.jobNumber,name:this.formItem.name,phone:this.formItem.phone,courtId:this.info.departmentId,identity:this.formItem.identity,sex:this.formItem.sex};a.pageNumber=t,a.pageSize=10,(0,i.list)(a).then(function(t){var a=t.data;100===a.state?(e.judgedata=a.result.content,e.pageNumber=a.result.pageNumber,e.totalPage=a.result.totalPage):e.$Message.info(a.message)}).catch(function(){e.$Message.error("网络错误, 查询法官列表失败")})},addJudge:function(){this.$refs.judgeTable.clearCurrentRow()},save:function(){var t=this,e=this;e.saved=!0,this.departmentList.map(function(e){e.name==t.info.departmentName&&(t.info.departmentId=e.id)});var a={jobNumber:this.info.jobNumber,name:this.info.name,phone:this.info.phone,identity:this.info.identity,courtId:this.info.departmentId,sex:this.info.sex};2===this.cardState?(a.identity=this.info.identity,(0,i.add)(a).then(function(a){var n=a.data;e.$Message.info(n.message),100===n.state&&(e.getList(e.pageNumber),t.info.jobNumber="",t.info.name="",t.info.phone="",t.info.identity="",t.info.departmentName="",t.info.sex="",t.getList(1)),e.saved=!1}).catch(function(){e.$Message.error("网络错误"),e.saved=!1})):(0,i.update)(a).then(function(a){var n=a.data;e.$Message.info(n.message),100===n.state&&(e.getList(e.pageNumber),t.info.jobNumber="",t.info.name="",t.info.phone="",t.info.identity="",t.info.sex="",t.cardState=0),e.saved=!1}).catch(function(){e.$Message.error("网络错误"),e.saved=!1})},delJudge:function(){this.spinShow=!0,this.modal2=!1;var t=this;(0,i.del)(t.checkIds).then(function(e){t.spinShow=!1;var a=e.data;t.$Message.info(a.message),100===a.state&&t.getList(t.pageNumber)}).catch(function(){t.spinShow=!1,t.$Message.error("网络错误")})},tableCheck:function(t){for(var e=[],a=[],n=0;n<t.length;n++){var o=t[n];e.push(o.id),a.push(o.name)}this.checkNames=a,this.checkIds=e},changePage:function(t){this.getList(t)},clean:function(){this.formItem={clerkNo:"",name:"",phone:"",department:"",workYear:"",createDate:""}},toAdd:function(){this.cardState=2,this.info={jobNumber:"",name:"",phone:"",identity:"",sex:""}},birthdayChange:function(t){this.info.birthdayD=t},createDateChange:function(t){this.info.createDateD=t},exportExcel:function(){},formatDate:function(t,e){return(0,r.formatDate)(t,e)}}}}});