<template lang="html">
  <div class="demo">
    <schedule-calendar :events="events"
                        :dateItemRender="itemRender"
                        @event-updateView="updateView"
                        @event-click="showDetail"></schedule-calendar>
                        <Modal
              v-model="detailModal"
              width="630"
              :ok-text="'确认'"
              @on-ok=""
              title="详情">
                <Row>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      原告
                  </Col>
                  <Col span="21" class="" style="min-height:38px;padding: 0 4px;line-height: 30px;border-right: 1px solid #e9eaec;border-bottom: 1px solid #e9eaec;">
                      {{detailLawcase.plaintiffName}}
                      
                  </Col>
              </Row>
              <Row>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      被告
                  </Col>
                  <Col span="21" class=""  style="min-height:38px;padding: 0 4px;line-height: 30px;border-right: 1px solid #e9eaec;border-bottom: 1px solid #e9eaec;">
                      {{detailLawcase.defendantName}}
                      
                  </Col>
              </Row>
              <Row>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      案件编号
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.caseNo}}
                  </Col>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      案由
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.briefName}}
                  </Col>
              </Row>
              <Row> 
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      法官
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.judgeName}}
                  </Col>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      书记员
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.clerkName}}
                  </Col>
              </Row>
              <Row>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      开庭时间
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.startDate | formatDate}}
                  </Col>
                  <Col span="3" class="maininfo-col maininfo-col-label">
                      法庭
                  </Col>
                  <Col span="9" class="maininfo-col">
                      {{detailLawcase.tribunalName}}
                  </Col>
              </Row>
              <Row>
                  <Col span="3" class="table-border-t" :style="{minHeight: '38px'}">
                      关联案件
                  </Col>
                  <Col span="21" class="table-border-t"  v-if="detailLawcase.associateLawCase != ''" :style="{minHeight: '38px'}">
                      <a v-for="item in detailLawcase.associateLawCase" >{{ item.caseNo }}</a><br/>
                  </Col>
                  <Col span="21"  class="table-border-t" v-else>
                      <span>无</span>
                  </Col>
              </Row>
          </Modal>
</div>
</template>

<script>
import { orderByTimes } from "@/api/courtDate.js";
import { formatDate } from "@/libs/date.js";
import scheduleCalendar from "../../components/scheduleCalendar";
import { calendarList } from "@/api/courtDate.js";
import { list } from "@/api/judgeInfo.js";
import { lawCaseSchedulding } from "@/api/homeDate";
import Vue from "vue";

Vue.component(scheduleCalendar.name, scheduleCalendar);

export default {
  data() {
    return {
      events: [],
      itemRender(item) {
        const h = this.$createElement;
        return h("span", item.text);
      },
      judgeColorData: [],
      detailModal: false,
      detailLawcase: {}
    };
  },
  created: function() {
    // 在vue初始化时调用
    const now = new Date();
    this.events = this.events.map(item => {
      const d = item.date.split("-")[2];
      item.date = `${now.getFullYear()}-${now.getMonth() + 1}-${d}`;
      return item;
    });
    this.updateView(now.getFullYear(), now.getMonth(), []);
    list().then(res => {
      res.data.result.content.map((item, i) => {
        var obj = {};
        obj.id = item.id;
        obj.cnum = i + 1;
        this.judgeColorData.push(obj);
      });
    });
  },
  methods: {
    // changeDate(e, item, date) {
    //   const updateIndex = this.events.findIndex(ele => ele.id === item.id);
    //   this.$set(this.events, updateIndex, {
    //     ...this.events[updateIndex],
    //     date
    //   });
    // },
    updateView(year, month, judgeIdStr) {
      console.log(year, month, judgeIdStr);
      calendarList(year, month + 1, judgeIdStr, "dq").then(res => {
        if ((res.data.state = 100)) {
          this.events = [];
          res.data.result.map(item => {
            var obj = {};
            obj.date = formatDate(new Date(item.startDate), "yyyy-MM-dd");
            obj.text =
              formatDate(new Date(item.startDate), "hh:mm") +
              "," +
              item.judge.name +
              "," +
              item.tribunal.name;
            obj.caseId = item.lawCase.id;
            for (var i = 0; i < this.judgeColorData.length; i++) {
              if (item.judge.id == this.judgeColorData[i].id) {
                obj.status = this.judgeColorData[i].cnum;
              }
            }
            this.events.push(obj);
          });
        }
      });
    },
    showDetail(e, item) {
      this.detailModal = true;
      lawCaseSchedulding(item.caseId).then(res => {
        if (res.data.state == 100) {
          this.detailLawcase = res.data.result;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  },
  filters: {
    formatDate(time) {
      if (time == "") {
        return "";
      }
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>

<style lang="css">
html {
  background: #eee;
}

body,
html {
  height: 100%;
  overflow: hidden;
}

body {
  margin: 0;
}

.demo {
  display: flex;
  flex-direction: column;
  height: 1000px;
  padding: 0 30px 30px;
  box-sizing: border-box;
}

.demo-title {
  text-align: center;
}
.schedule-calendar-month {
  position: inherit;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  z-index: 99;
}
</style>
