webpackJsonp([15],{1284:function(e,t,a){var n=a(1285);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(65)("03e3ec1c",n,!1)},1285:function(e,t,a){t=e.exports=a(64)(!1),t.push([e.i,"\n.search-wrapper[data-v-4b05bc53] {\n  margin-bottom: 10px;\n}\n.search-form .ivu-form-item[data-v-4b05bc53] {\n  margin-bottom: 10px;\n}\n.btn-group .ivu-form-item[data-v-4b05bc53] {\n  margin-bottom: 0px;\n}\n.table-btn-group[data-v-4b05bc53] {\n  padding-bottom: 15px;\n}\n.page-wrapper[data-v-4b05bc53] {\n  margin-top: 10px;\n  text-align: right;\n}\n.bookbuilding-table[data-v-4b05bc53] {\n  width: 100%;\n  min-width: 600px;\n  border: 1px solid #e9eaec;\n}\n.bookbuilding-table tr td[data-v-4b05bc53] {\n  border-left: 1px solid #e9eaec;\n  border-bottom: 1px solid #e9eaec;\n  line-height: 37px;\n  text-align: left;\n  padding-left: 8px;\n}\n.bookbuilding-table tr td[data-v-4b05bc53]:first-child {\n  border-left: none;\n  width: 20%;\n}\n.bookbuilding-table tr td[data-v-4b05bc53]:nth-child(2) {\n  width: 30%;\n}\n.bookbuilding-table tr td[data-v-4b05bc53]:nth-child(3) {\n  width: 20%;\n}\n.bookbuilding-table tr td[data-v-4b05bc53]:nth-of-type(odd) {\n  background: #f8f8f9;\n}\n.bookbuilding-table tr:last-child td[data-v-4b05bc53] {\n  border-bottom: none;\n}\ntd.ivu-table-expanded-cell[data-v-4b05bc53] {\n  padding: 15px 50px 0px;\n  background: #f8f8f9;\n}\n.time-wrapper[data-v-4b05bc53] {\n  width: 150px;\n  left: 230px;\n  top: 26px;\n}\n.time-wrapper li[data-v-4b05bc53] {\n  padding-left: 10px;\n  cursor: pointer;\n}\n.time-wrapper li[data-v-4b05bc53]:hover {\n  color: #40a9ff;\n}\n.time-wrapper li.checked[data-v-4b05bc53] {\n  color: #fff;\n  background-color: #40a9ff;\n}\n.time-wrapper li.disable[data-v-4b05bc53] {\n  color: #aaa;\n  cursor: not-allowed;\n}\n",""])},1286:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Card",{staticClass:"search-wrapper"},[a("Form",{staticClass:"search-form",attrs:{model:e.searchData,"label-width":80,inline:""}},[a("FormItem",{attrs:{label:"案号"}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入案号"},model:{value:e.searchData.caseNo,callback:function(t){e.$set(e.searchData,"caseNo",t)},expression:"searchData.caseNo"}})],1),e._v(" "),a("FormItem",{attrs:{label:"案由"}},[a("Select",{staticStyle:{width:"200px","vertical-align":"middle"},attrs:{placeholder:"请选择案由"},model:{value:e.searchData.briefName,callback:function(t){e.$set(e.searchData,"briefName",t)},expression:"searchData.briefName"}},e._l(e.reasonList,function(t){return a("Option",{key:t.brief,attrs:{value:t.brief}},[e._v(e._s(t.brief))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"状态"}},[a("Select",{staticStyle:{width:"200px","vertical-align":"middle"},attrs:{placeholder:"请选择状态"},model:{value:e.searchData.state,callback:function(t){e.$set(e.searchData,"state",t)},expression:"searchData.state"}},[a("Option",{attrs:{value:"0"}},[e._v("待确认")]),e._v(" "),a("Option",{attrs:{value:"1"}},[e._v("调期待确认")]),e._v(" "),a("Option",{attrs:{value:"2"}},[e._v("已确认")])],1)],1),e._v(" "),a("FormItem",{attrs:{label:"法庭"}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入法庭"},model:{value:e.searchData.tribunalName,callback:function(t){e.$set(e.searchData,"tribunalName",t)},expression:"searchData.tribunalName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"审判员"}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入审判员"},model:{value:e.searchData.judgeName,callback:function(t){e.$set(e.searchData,"judgeName",t)},expression:"searchData.judgeName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"书记员"}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入书记员"},model:{value:e.searchData.clerkName,callback:function(t){e.$set(e.searchData,"clerkName",t)},expression:"searchData.clerkName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"当事人"}},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入当事人"},model:{value:e.searchData.litigantName,callback:function(t){e.$set(e.searchData,"litigantName",t)},expression:"searchData.litigantName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"开庭时间"}},[a("DatePicker",{staticStyle:{width:"200px"},attrs:{format:"yyyy/MM/dd",type:"daterange",placement:"bottom-start",placeholder:"请选择开庭时间"},model:{value:e.searchData.date,callback:function(t){e.$set(e.searchData,"date",t)},expression:"searchData.date"}})],1),e._v(" "),a("div",{staticClass:"btn-group",staticStyle:{"text-align":"right"}},[a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:e.searchList}},[e._v("查询")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:e.emptySearchList}},[e._v("清空")])],1)],1)],1)],1),e._v(" "),a("Card",[a("div",{staticClass:"table-btn-group"},[a("Button",{on:{click:function(t){e.handleSelectAll(!0)}}},[e._v("全选")]),e._v(" "),a("Button",{attrs:{type:"primary"},on:{click:function(t){e.checkAllComfirm(1)}}},[e._v("批量原告")]),e._v(" "),a("Button",{attrs:{type:"primary"},on:{click:function(t){e.checkAllComfirm(2)}}},[e._v("批量被告")])],1),e._v(" "),a("Alert",{attrs:{"show-icon":""}},[e._v("已选择\n      "),a("span",{staticStyle:{color:"#40a9ff","font-weight":"600","font-size":"16px",margin:"0 3px"}},[e._v(e._s(e.tableSelectedNum))]),e._v("项\n      "),a("a",{staticStyle:{"margin-left":"30px"},attrs:{href:"javascript:;"},on:{click:function(t){e.handleSelectAll(!1)}}},[e._v("清空")])]),e._v(" "),a("Table",{ref:"selection",attrs:{border:"",stripe:"",columns:e.columns,data:e.tableData},on:{"on-select":e.onSelect,"on-select-all":e.onSelectAll,"on-selection-change":e.onSelectChange}}),e._v(" "),a("div",{staticClass:"page-wrapper"},[a("Page",{attrs:{total:Number(e.pageData.total),"page-size":e.pageData.pageSize,current:e.pageData.pageNumber,"page-size-opts":[5,10,20],"show-sizer":""},on:{"on-change":e.pageChange,"on-page-size-change":e.pageSizeChange}})],1)],1),e._v(" "),a("Modal",{attrs:{width:"630","cancel-text":e.isDateState?"驳回":"","ok-text":e.isDateState?"同意":"关闭",title:"确认排期详情"},on:{"on-cancel":e.changeDateCancel},model:{value:e.detailModal,callback:function(t){e.detailModal=t},expression:"detailModal"}},[a("table",{staticClass:"bookbuilding-table",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[a("tr",[a("td",[e._v("案号")]),e._v(" "),a("td",[a("span",[e._v(e._s(e.caseInfo.caseNo))])]),e._v(" "),a("td",[e._v("审判员")]),e._v(" "),a("td",[a("span",[e._v(e._s(e.caseInfo.judge))])])]),e._v(" "),a("tr",[a("td",[e._v("开庭时间")]),e._v(" "),a("td",{staticStyle:{position:"relative"}},[a("span",{directives:[{name:"show",rawName:"v-show",value:!e.isDateState,expression:"!isDateState"}]},[e._v(e._s(e._f("formatStartDate")(e.caseInfo.time)))]),e._v(" "),a("DatePicker",{directives:[{name:"show",rawName:"v-show",value:e.isDateState,expression:"isDateState"}],staticStyle:{width:"98%","vertical-align":"baseline"},attrs:{placement:"bottom-start",type:"date",confirm:"",options:e.dateOptions,open:e.datePickerOpen,transfer:""},on:{"on-change":e.selectDate,"on-ok":e.submitDate,"on-clear":e.clearDate}},[a("a",{attrs:{href:"javascript:void(0)"},on:{click:e.handleClick}},[a("Icon",{attrs:{type:"ios-calendar-outline"}}),e._v(" "),""===e.caseInfo.time?[e._v("选择时间")]:[e._v(e._s(e._f("formatStartDate")(e.caseInfo.time)))]],2)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.selectTime,expression:"selectTime"}],staticClass:"ivu-select-dropdown time-wrapper"},[a("ul",e._l(e.timeList,function(t,n){return a("li",{class:{checked:t.isCheck,disable:!t.able},on:{click:function(t){e.selectTimeVal(n)}}},[e._v(e._s(t.value))])}))])],1),e._v(" "),a("td",[e._v("开庭地址")]),e._v(" "),a("td",[a("span",[e._v(e._s(e.caseInfo.court))])])]),e._v(" "),a("tr"),a("tr",[a("td",[e._v("审判法庭")]),e._v(" "),a("td",[a("span",{directives:[{name:"show",rawName:"v-show",value:!e.isDateState,expression:"!isDateState"}]},[e._v(e._s(e.caseInfo.room))]),e._v(" "),a("Select",{directives:[{name:"show",rawName:"v-show",value:e.isDateState,expression:"isDateState"}],staticStyle:{width:"98%","vertical-align":"middle"},model:{value:e.caseInfo.room,callback:function(t){e.$set(e.caseInfo,"room",t)},expression:"caseInfo.room"}},e._l(e.roomList,function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])}))],1)])]),e._v(" "),a("Table",{staticStyle:{"margin-top":"10px"},attrs:{height:"200",columns:e.detailColumns,data:e.detailData}})],1)],1)},i=[];n._withStripped=!0;var s={render:n,staticRenderFns:i};t.default=s},603:function(e,t,a){"use strict";function n(e){l||a(1284)}Object.defineProperty(t,"__esModule",{value:!0});var i=a(869),s=a.n(i);for(var r in i)"default"!==r&&function(e){a.d(t,e,function(){return i[e]})}(r);var c=a(1286),o=a.n(c),l=!1,d=a(31),u=n,m=d(s.a,o.a,!1,u,"data-v-4b05bc53",null);m.options.__file="src\\views\\courtDate\\datecheck.vue",t.default=m.exports},626:function(e,t,a){"use strict";function n(){return h({url:"/court/createCase/queryBrief.jhtml",method:"get"})}function i(e){return h({url:"/court/scheduling/queryTribunals.jhtml",method:"get",params:{id:e}})}function s(e,t,a){return h({url:"/court/send/queryLawCase.jhtml",method:"POST",params:{caseNo:e,plaintiffName:t,defendantName:a}})}function r(e){return h({url:"/court/infoManage/queryLawCaseAll.jhtml",method:"GET",params:{id:e}})}function c(e,t,a,n,i,s,r){return h({url:"/court/infoManage/queryLawCase.jhtml",method:"GET",params:{caseNo:e,caseName:t,briefName:a,litigantName:n,filingDate1:i,filingDate2:s,pageNumber:r}})}function o(e){return h({url:"/court/process/queryProcessNote.jhtml",method:"GET",params:{lawCaseId:e}})}function l(e){return h({url:"/court/infoManage/lawCaseInfo.jhtml",method:"GET",params:{caseNo:e}})}function d(){return h({url:"/court/infoManage/courtList.jhtml",method:"GET"})}Object.defineProperty(t,"__esModule",{value:!0}),t.getBrief=n,t.getTribunal=i,t.queryCase=s,t.queryCaseInfo=r,t.caselist=c,t.queryProcessNote=o,t.searchCase=l,t.courtList=d;var u=a(37),m=function(e){return e&&e.__esModule?e:{default:e}}(u),h=m.default.ajax},663:function(e,t,a){"use strict";function n(e,t){var a={caseNo:e.caseNo||"",judgeName:e.judgeName||"",tribunalName:e.tribunalName||"",briefName:e.briefName||"",state:e.state||"",startDate:e.startDate||"",endDate:e.endDate||"",pageNumber:t.pageNumber||"",litigantName:e.litigantName||"",pageSize:t.pageSize||""};return b({url:"/court/scheduling/list.jhtml",method:"get",params:a})}function i(e,t){var a={caseNo:e.caseNo||"",judgeName:e.judgeName||"",tribunalName:e.tribunalName||"",briefName:e.briefName||"",state:e.state||"",startDate:e.startDate||"",endDate:e.endDate||"",pageNumber:t.pageNumber||"",pageSize:t.pageSize||""};return b({url:"/court/scheduling/orderByTimes.jhtml",method:"get",params:a})}function s(e){return b({url:"/court/scheduling/holiday.jhtml",method:"get",params:{judgeId:e}})}function r(e){return b({url:"/court/scheduling/detail.jhtml",method:"get",params:{schedulingId:e}})}function c(e,t){return b({url:"/court/scheduling/findDayTimes.jhtml",method:"get",params:{date:e,judgeId:t}})}function o(e,t,a,n){return b({url:"/court/scheduling/modify.jhtml",method:"get",params:{schedulingId:e,tribunalId:t,dayTimes:a,date:n}})}function l(e,t,a){return b({url:"/court/scheduling/confirm.jhtml",method:"get",params:{schedulingId:e,isConfirm:t,confirmType:a}})}function d(e,t,a){return b({url:"/court/scheduling/confirm.jhtml",method:"get",params:{schedulingId:e,isConfirm:t,litigantId:a}})}function u(e){return b({url:"/court/scheduling/confirm/detail.jhtml",method:"get",params:{schedulingId:e}})}function m(e,t,a){return b({url:"/court/scheduling/handArrange.jhtml",method:"get",params:{caseId:e,judgeId:t,clerkId:a}})}function h(e,t,a,n,i){return b({url:"/court/scheduling/hand.jhtml",method:"get",params:{caseId:e,judgeId:t,clerkId:a,tribunalId:n,date:i}})}function f(e,t,a,n,i,s,r){return b({url:"/court/scheduling/handArrangeConfirm.jhtml",method:"get",params:{lawCaseId:e,judgeId:t,clerkId:a,tribunalId:n,startDate:i,times:s,dayTimes:r}})}function g(e,t,a,n){return b({url:"/court/scheduling/calendar/list.jhtml",method:"post",params:{startYear:e,startMonth:t,judgeId:a,type:n}})}Object.defineProperty(t,"__esModule",{value:!0}),t.courtList=n,t.orderByTimes=i,t.holiday=s,t.courtDetail=r,t.findDayTimes=c,t.modify=o,t.confirm=l,t.confirmOne=d,t.confirmDetail=u,t.handArrange=m,t.hand=h,t.handArrangeConfirm=f,t.calendarList=g;var p=a(37),v=function(e){return e&&e.__esModule?e:{default:e}}(p),b=v.default.ajax},869:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(663),i=a(229),s=a(626);t.default={data:function(){var e=this;return{searchData:{caseNo:this.$store.getters.caseNo,judgeName:"",clerkName:"",tribunalName:"",briefName:"",state:"",startDate:"",endDate:"",date:"",litigantName:""},pageData:{pageNumber:1,pageSize:10,total:0},onSelectData:[],reasonList:[],tableSelectedNum:0,columns:[{type:"selection",width:60,align:"center",fixed:"left"},{title:"案号",key:"caseNo",align:"center",width:200,fixed:"left"},{title:"案由",key:"brief",align:"center",width:180},{title:"立案时间",key:"filingDate",align:"center",width:150},{title:"法庭",key:"address",align:"center",width:200},{title:"开庭时间",key:"startDate",align:"center",width:150},{title:"审判员",key:"judge",align:"center",width:120},{title:"书记员",key:"clerk",align:"center",width:120},{title:"操作",key:"action",align:"center",fixed:"right",width:120,render:function(t,a){return t("div",[t("Button",{props:{type:"text",size:"small"},on:{click:function(){e.isDateState=1==a.row.state,e.detailModal=!0,e.detailData=[],(0,n.confirmDetail)(a.row.id).then(function(t){100==t.data.state&&(t.data.result.detail.map(function(t){var a={name:t.name,status:t.status,isConfirm:null==t.isConfirm?"0":t.isConfirm,remark:null==t.remark?"":t.remark,smsState:t.smsState,litigantId:t.id};e.detailData.push(a)}),e.caseInfo.schedulingId=a.row.id,e.caseInfo.caseNo=t.data.result.case.caseNo,e.caseInfo.judge=t.data.result.case.name,e.caseInfo.judgeId=t.data.result.case.judgeId,e.caseInfo.time=t.data.result.case.startDate,e.time=t.data.result.case.startDate,e.caseInfo.court=t.data.result.case.address,e.caseInfo.room=t.data.result.case.tribunalName,e.caseInfo.courtId=t.data.result.case.courtId,(0,s.getTribunal)(e.caseInfo.courtId).then(function(t){e.roomList=[],e.roomListData=[],t.data.result.map(function(t){var a={value:t.id,name:t.name};e.roomList.push(t.name),e.roomListData.push(a)})}))})}}},"查看")])}}],detailColumns:[{title:"姓名",key:"name",align:"center",width:120},{title:"角色",key:"status",align:"center",width:120},{title:"操作",key:"isConfirm",align:"center",width:120,render:function(t,a){return 1==a.row.smsState?t("Button",{props:{type:"default",size:"small"}},"已发送"):t("Button",{props:{type:"success",size:"small"},on:{click:function(){(0,n.confirmOne)(e.caseInfo.schedulingId,1,a.row.litigantId).then(function(t){100==t.data.state?(e.$Message.success(t.data.message),e.onRefreshList(),a.row.smsState=1):e.$Message.error(t.data.message)})}}},"发送")}},{title:"短信状态",key:"isConfirm",align:"center",width:120,render:function(e,t){return 1==t.row.smsState?e("Button",{props:{type:"success",size:"small"}},"已送达"):e("Button",{props:{type:"error",size:"small"}},"待送达")}},{title:"反馈",key:"remark",align:"center"}],detailData:[],tableData:[],detailModal:!1,caseInfo:{schedulingId:"",caseNo:"",judge:"",room:"",judgeId:"",time:"",court:"",courtId:""},roomList:[],roomListData:[],dateOptions:{disabledDate:function(t){var a=e.disabledDateArr;return t&&(t.valueOf()<Date.now()||-1!==a.indexOf(t.valueOf()))}},selectTime:!1,datePickerOpen:!1,timeList:[],loading:!0,isDateState:!1,time:""}},created:function(){var e=this;this.onRefreshList(),(0,s.getBrief)().then(function(t){100===t.data.state&&(e.reasonList=t.data.result)}).catch(function(e){})},methods:{changeLoading:function(){var e=this;this.loading=!1,this.$nextTick(function(){e.loading=!0})},handleClick:function(){var e=this;this.disabledDateArr=[];var t=[];this.datePickerOpen=!this.datePickerOpen,this.selectTime&&(this.selectTime=!1),(0,n.holiday)(this.judgeId).then(function(a){100==a.data.state&&(a.data.result.holidays.map(function(e,a){t.push(e.date)}),a.data.result.judgeVacations.map(function(e,a){var n=(0,i.formatDate)(new Date(e.leaveStartDate),"hh"),s=(0,i.formatDate)(new Date(e.leaveCloseDate),"hh"),r=(0,i.formatDate)(new Date(e.leaveStartDate),"yyyy-MM-dd"),c=(0,i.formatDate)(new Date(e.leaveCloseDate),"yyyy-MM-dd");"08"==n&&t.push(new Date(r).getTime()-288e5),"17"==s&&t.push(new Date(c).getTime()-288e5);for(var o=new Date(r).getTime()+864e5;o<new Date(c).getTime();)t.push(o-288e5),o+=864e5}),e.disabledDateArr=t)})},selectDate:function(e){var t=this,a=new Date(e).getMonth()+1;if(this.clear)this.clear=!1;else{this.caseInfo.time=e,this.selectTime=!0;var i=new Date(e).getTime();(0,n.findDayTimes)(i,this.caseInfo.judgeId).then(function(e){if(100==e.data.state){var n=e.data.result.split(",");t.timeList=1==a||2==a||3==a||4==a||5==a||10==a||11==a||12==a?[{value:"08:45",able:!0,isCheck:!1},{value:"10:20",able:!0,isCheck:!1},{value:"15:00",able:!0,isCheck:!1}]:[{value:"08:45",able:!0,isCheck:!1},{value:"10:20",able:!0,isCheck:!1},{value:"15:30",able:!0,isCheck:!1}],n.map(function(e){0!=e&&(t.timeList[e-1].able=!1)})}else t.$Message.error(e.data.message)})}},selectTimeVal:function(e){var t=this;this.timeList[e].able&&this.timeList.map(function(a,n){e==n?(a.isCheck=!0,t.selectTimer=a.value,t.caseInfo.time=t.caseInfo.time.split(" ")[0]+" "+t.selectTimer):a.isCheck=!1})},clearDate:function(){this.clear=!0,this.selectTime=!1,this.datePickerOpen=!1,this.caseInfo.time=this.time},submitDate:function(){this.datePickerOpen=!1,this.selectTime=!1,""==this.selectTimer&&this.$Message.error("请选择开庭时间，否则将无法提交")},changeDateOk:function(){var e=this;if(this.isDateState){var t;this.roomListData.map(function(a){e.caseInfo.room==a.name&&(t=a.value)}),(0,n.modify)(this.caseInfo.schedulingId,t,new Date(this.caseInfo.time).getTime()).then(function(t){100===t.data.state?(e.$Message.success("修改成功！"),e.changeLoading(),e.detailModal=!1,e.onRefreshList()):(e.changeLoading(),e.$Message.error(t.data.message))}).catch(function(){e.changeLoading()})}},changeDateCancel:function(){var e=this;this.isDateState&&this.$Modal.confirm({content:"是否直接确认排班？",okText:"确认",cancelText:"取消",onOk:function(){(0,n.confirm)(e.caseInfo.schedulingId,1).then(function(t){100==t.data.state?(e.$Message.success(t.data.message),e.onRefreshList()):e.$Message.error(t.data.message)})},onCancel:function(){}})},handleSelectAll:function(e){this.$refs.selection.selectAll(e)},onSelect:function(e,t){this.tableSelectedNum=e.length},onSelectAll:function(e){this.tableSelectedNum=e.length},onSelectChange:function(e){this.onSelectData=e,this.tableSelectedNum=e.length},checkAllComfirm:function(e){var t=this,a="";this.onSelectData.map(function(e,n){n==t.onSelectData.length-1?a+=e.id:a+=e.id+","}),(0,n.confirm)(a,1,e).then(function(e){100==e.data.state?(t.$Message.success(e.data.message),t.onRefreshList()):t.$Message.error(e.data.message)})},searchList:function(){2==this.searchData.date.length&&(this.searchData.startDate=new Date(this.searchData.date[0]).getTime(),this.searchData.endDate=new Date(this.searchData.date[1]).getTime()+828e5+354e4+59e3),console.log(this.searchData),this.onRefreshList()},emptySearchList:function(){this.searchData.caseNo="",this.searchData.judgeName="",this.searchData.clerkName="",this.searchData.state="",this.searchData.briefName="",this.searchData.tribunalName="",this.searchData.startDate="",this.searchData.endDate="",this.searchData.litigantName="",this.searchData.date=[],this.pageData.pageNum=1,this.pageData.pageSize=10,this.onRefreshList()},pageChange:function(e){this.pageData.pageNumber=e,this.tableSelectedNum=0,this.onRefreshList()},pageSizeChange:function(e){this.pageData.pageSize=e,this.tableSelectedNum=0,this.onRefreshList()},onRefreshList:function(){var e=this;console.log(this.searchData.litigantName),this.$store.commit("SET_CASENO",this.searchData.caseNo),(0,n.courtList)(this.searchData,this.pageData).then(function(t){if(e.tableData=[],100==t.data.state){var a=t.data.result.content;e.pageData.total=t.data.result.total,a.map(function(t){try{var a=(0,i.formatDate)(new Date(t.startDate.replace(/-/g,"/")),"yyyy-MM-dd hh:mm")}catch(e){var a=(0,i.formatDate)(new Date(t.startDate),"yyyy-MM-dd hh:mm")}var n={id:t.id,caseNo:t.lawCase.caseNo,brief:t.lawCase.brief.name,filingDate:(0,i.formatDate)(new Date(t.lawCase.filingDate),"yyyy-MM-dd"),startDate:a,address:t.tribunal.name,judge:t.judge.name,clerk:t.clerk.name,state:t.state};e.tableData.push(n)})}})}},filters:{formatDate:function(e){if(""==e)return"";var t=new Date(e);return(0,i.formatDate)(t,"yyyy-MM-dd")},whether:function(e){return e?"是":"否"},filCheck:function(e){return 0==e?"未确认":"已确认"},formatStartDate:function(e){if(""==e)return"";var t=new Date(e);return(0,i.formatDate)(t,"yyyy-MM-dd hh:mm")}}}}});