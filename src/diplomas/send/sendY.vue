<template lang="html">
  <div class="layoutM">
    <Card class="cardItem">
        <p slot="title">
            <Icon type="wrench"></Icon>
            案件搜索
        </p>
        <div style="margin-bottom: 16px">
            <Form :label-width="60">
                <FormItem label="案号">
                    <Input v-model="searchData.caseNo" placeholder="请输入案号"></Input>
                </FormItem>
                <FormItem label="原告姓名">
                    <Input v-model="searchData.plaintiffName"></Input>
                </FormItem>
                <FormItem label="被告姓名">
                    <Input v-model="searchData.defendantName"></Input>
                </FormItem>
                <Button type="info" :loading="queryLoading" @click="queryCase" long>
                    <span v-if="!queryLoading">查询</span>
                    <span v-else></span>
                </Button>
            </Form>
        </div>
        <ButtonGroup vertical>
            <Button v-for="(item, key) in caseList" type="ghost" :key="key" v-show="parseInt(key/10) === (pagenumber - 1)" @click="getCaseInfo(item.id)" class="caseBtn">
                <p>
                    <Tooltip :content="item.caseNo">
                        案号：{{ item.caseNo }}
                    </Tooltip>
                </p>
                <p>
                    <Tooltip :content="'案由：' + item.briefName + '|' + item.litigationStatusName + ':' + item.litigantName">
                        案由：{{ item.briefName }} | {{ item.litigantName }}
                    </Tooltip>
                </p>
            </Button>
        </ButtonGroup>
        <Page v-if="caseList.length > 10" :current="pagenumber" @on-change="changeSearchPage" :total="caseList.length" style="padding-left: 28px;padding-top: 10px" simple></Page>
    </Card>
    <Card v-show="caseInfoShow">
        <p slot="title">
            案件信息
            <span class="case-finish" @click="caseFinish">案件送达完成</span>
        </p>
        <div class="maininfo-warp">
            <Spin size="large" fix v-if="caseLoading"></Spin>
            <Row>
                <Col span="3" class="maininfo-col maininfo-col-label">
                    案号
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ caseInfo.caseNo }}
                </Col>
                <Col span="3" class="maininfo-col maininfo-col-label">
                    案由
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ caseInfo.briefName }}
                </Col>
            </Row>
            <Row>
                <Col span="3" class="maininfo-col maininfo-col-label">
                    原告
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ caseInfo.plaintiffName }}
                </Col>
                <Col span="3" class="maininfo-col maininfo-col-label">
                    被告
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ caseInfo.defendantName }}
                </Col>
            </Row>
            <Row style="display:none">
                <Col span="3" class="maininfo-col maininfo-col-label">
                    手机号码(原告)
                </Col>
                <Col span="9" class="maininfo-col">
                  {{ caseInfo.plaintiffPhone }}
                </Col>
                <Col span="3" class="maininfo-col maininfo-col-label">
                    手机号码(被告)
                </Col>
                <Col span="9" class="maininfo-col">
                  {{ caseInfo.defendantPhone }}
                </Col>
            </Row>
            <Row style="display:none">
                <Col span="3" class="maininfo-col maininfo-col-label">
                  证件号码(原告)
                </Col>
                <Col span="9" class="maininfo-col">
                  {{ caseInfo.plaintiffIdentityCard }}
                </Col>
                <Col span="3" class="maininfo-col maininfo-col-label">
                  证件号码(被告)
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ caseInfo.defendantIdentityCard }}
                </Col>
            </Row>
            <Row style="display:none">
                <Col span="3" class="maininfo-col maininfo-col-label">
                    建档时间
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ formatDate(new Date(caseInfo.filingDate), 'yyyy-MM-dd') }}
                </Col>
                <Col span="3" class="maininfo-col maininfo-col-label">
                    完结时间
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ caseInfo.closeDate && formatDate(new Date(caseInfo.closeDate), 'yyyy-MM-dd') }}
                </Col>
            </Row>
            <Row style="display:none">
                <Col span="3" class="maininfo-col maininfo-col-label">
                    案由
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ caseInfo.briefName }}
                </Col>
                <Col span="3" class="maininfo-col maininfo-col-label">
                    案件金额
                </Col>
                <Col span="9" class="maininfo-col">
                    {{ caseInfo.applyStandard }}元
                </Col>
            </Row>
        </div>
    </Card>
    <Card v-if="sendInfo.length" style="margin-top: 10px">
        <p slot="title">
            送达详情
        </p>
        <!-- <Spin size="large" fix v-if="infoLoading"></Spin> -->
        <div v-for="(item, key) in sendInfo" :key="key" class="send-info">
            <Row v-if="item.send != null">
                <Col span="3" style="text-align: right; padding-right: 5px">
                    {{ item.litigationStatusName }}：
                </Col>
                <Col span="5">
                    {{ item.litigantName }}
                </Col>
                <Col span="3" style="text-align: right; padding-right: 5px">
                    联系电话：
                </Col>
                <Col span="5">
                    {{ item.litigantPhone }}
                </Col>
                <Col span="3" style="text-align: right; padding-right: 5px">
                    送达方式：
                </Col>
                <Col span="5">
                    {{ sendTypes[item.send.type] }}
                </Col>
            </Row>
            <Row  v-if="item.send == null">
                <Col span="3" style="text-align: right; padding-right: 5px">
                    {{ item.litigationStatusName }}：
                </Col>
                <Col span="5">
                    {{ item.litigantName }}
                </Col>
                <Col span="3" style="text-align: right; padding-right: 5px">
                    联系电话：
                </Col>
                <Col span="5">
                    {{ item.litigantPhone }}
                </Col>
            </Row>
            <Row v-if="item.send != null">
                <Col span="3" style="text-align: right; padding-right: 5px">
                    送达时间：
                </Col>
                <Col span="21" v-if="item.send.createDate">
                    {{ formatDate(new Date(item.send.createDate), 'yyyy-MM-dd hh:mm') }}
                </Col>
                <Col span="21" v-else>
                    <span>无</span>
                </Col>
            </Row>
            <Row>
                <Col span="3" style="text-align: right; padding-right: 5px">
                    文书列表：
                </Col>
                <Col span="21" v-if="item.diploms[0] != null">
                    <a v-for="item in item.diploms" :href="item.path" :download="item.name + '.pdf'">{{ item.name }}、</a>
                </Col>
                <Col span="21" v-else>
                    <span>空</span>
                </Col>
            </Row>
            <Row>
                <Col span="3" style="text-align: right; padding-right: 5px">
                    材料列表：
                </Col>
                <Col span="21" v-if="item.evidenceAttachment.length != 0">
                    <a v-for="item in item.evidenceAttachment" :href="item.address" :download="item.name">{{ item.name }}、</a>
                </Col>
                <Col span="21" v-else>
                    <span>无</span>
                </Col>
            </Row>
            <Row v-if="item.send != null">
                <Col span="3" style="text-align: right; padding-right: 5px">
                    {{ sendTypes[item.send.sendType] !== '邮件送达' ? '收件地址' : '邮箱地址' }}：
                </Col>
                <Col span="21" v-if="item.send.sendAddress">
                    {{ sendTypes[item.send.sendType] !== '邮件送达' ? item.send.sendAddress : item.send.email }}
                </Col>
                <Col span="21" v-else>
                    <span>无</span>
                </Col>
            </Row>
            <div v-if="item.send != null">
            <Row v-if="sendTypes[item.send.sendType] == 'EMS送达'">
                <Col span="3" style="text-align: right; padding-right: 5px">
                    快递单号：
                </Col>
                <Col span="21">
                    {{ item.send.oddNumbers }}
                </Col>
            </Row>
            <Row v-if="sendTypes[item.send.sendType] == 'EMS送达'">
                <Col span="3" style="text-align: right; padding-right: 5px">
                    物流信息：
                </Col>
                <Col v-if="item.send.logisticsInfo" span="21">
                    <p v-for="(p, key) in item.send.logisticsInfo.split(';')" :key="key" v-show="!key || lc" @click="!key && (lc = !lc)">
                        <span style="color: #4e576b">{{ p.split('|')[0] }} &nbsp;&nbsp;</span>
                        {{ p.split('|')[1] }}
                        <Icon v-if="!key" type="arrow-down-b"></Icon>
                    </p>
                    <p v-if="!item.send.logisticsInfo.split(';').length">'暂无信息</p>
                </Col>
            </Row>
          </div>
            <Row>
                 <Col span="3" style="text-align: right; padding-right: 5px">
                     送达详情：
                 </Col>
                 <Col span="21" v-if="item.content">
                     {{ item.content }}
                 </Col>
                 <Col span="21" v-else>
                     <span>暂无送达记录</span>
                 </Col>
             </Row>
             <Row v-if="item.send != null">
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      送达情况：
                  </Col>
                  <Col span="21">
                      <span :style="{ color: sendStates[1].c }">{{ (item.send.state !== 0 && !item.send.state) ? '未发送' : sendStates[item.send.state + 1].s }}</span>
                      <Button v-if="item.send.state == 0 && !item.send.logisticsInfo && item.send.oddNumbers" @click="cancelExp(item.send.oddNumbers)" type="warning">
                          取消发送
                      </Button>
                      <Button v-if="item.send.state == 2" @click="sendAgain(item.send)" type="info">
                          再次发送
                      </Button>
                      <Button v-if="item.send.state == 0 && item.send.sendType == 0" @click="confirmSend(caseInfo.id, item.send.litigantId)" :loading="confirmSendLoading" type="success">
                          确认领取
                      </Button>
                  </Col>
              </Row>
              <Row v-if="item.send != null">
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      历史记录：
                  </Col>
                  <Col span="21">
                     <Button @click="showHistory(item.send.litigant.id)">查看历史记录</Button>
                  </Col>
              </Row>
        </div>
    </Card>
    <Modal
        v-model="showHistoryModel"
        title="历史记录"
        width="720"
        ok-text="关闭"
        cancel-text="">
          <div v-for="(item, key) in historyInfo" :key="key" class="send-info">
              <Row>
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      姓名：
                  </Col>
                  <Col span="5">
                      {{ item.send.litigant.litigantName }}
                  </Col>
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      联系电话：
                  </Col>
                  <Col span="5">
                      {{ item.send.litigant.litigantPhone }}
                  </Col>
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      送达方式：
                  </Col>
                  <Col span="5">
                      {{ sendTypes[item.send.type] }}
                  </Col>
              </Row>
              <Row>
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      送达时间：
                  </Col>
                  <Col span="21" v-if="item.send.createDate">
                      {{ formatDate(new Date(item.send.createDate), 'yyyy-MM-dd hh:mm') }}
                  </Col>
                  <Col span="21" v-else>
                      <span>无</span>
                  </Col>
              </Row>
              <Row>
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      文书列表：
                  </Col>
                  <Col span="21" v-if="item.diploms[0] != null">
                      <a v-for="item in item.diploms" :href="item.path" :download="item.name + '.pdf'">{{ item.name }}、</a>
                  </Col>
                  <Col span="21" v-else>
                      <span>无</span>
                  </Col>
              </Row>
              <Row>
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      材料列表：
                  </Col>
                  <Col span="21" v-if="item.evidenceAttachment.length != 0">
                      <a v-for="item in item.evidenceAttachment" :href="item.address" :download="item.name">{{ item.name }}、</a>
                  </Col>
                  <Col span="21" v-else>
                      <span>无</span>
                  </Col>
              </Row>
              <Row>
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      {{ sendTypes[item.send.sendType] !== '邮件送达' ? '收件地址' : '邮箱地址' }}：
                  </Col>
                  <Col span="21" v-if="item.send.sendAddress">
                      {{ sendTypes[item.send.sendType] !== '邮件送达' ? item.send.sendAddress : item.send.email }}
                  </Col>
                  <Col span="21" v-else>
                      <span>无</span>
                  </Col>
              </Row>
              <Row v-if="sendTypes[item.send.sendType] == 'EMS送达'">
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      快递单号：
                  </Col>
                  <Col span="21">
                      {{ item.send.oddNumbers }}
                  </Col>
              </Row>
              <Row v-if="sendTypes[item.send.sendType] == 'EMS送达'">
                  <Col span="3" style="text-align: right; padding-right: 5px">
                      物流信息：
                  </Col>
                  <Col v-if="item.send.logisticsInfo" span="21">
                      <p v-for="(p, key) in item.send.logisticsInfo.split(';')" :key="key" v-show="!key || lc" @click="!key && (lc = !lc)">
                          <span style="color: #4e576b">{{ p.split('|')[0] }} &nbsp;&nbsp;</span>
                          {{ p.split('|')[1] }}
                          <Icon v-if="!key" type="arrow-down-b"></Icon>
                      </p>
                      <p v-if="!item.send.logisticsInfo.split(';').length">'暂无信息</p>
                  </Col>
              </Row>
              <Row>
                   <Col span="3" style="text-align: right; padding-right: 5px">
                       送达详情：
                   </Col>
                   <Col span="21" v-if="item.content">
                       {{ item.content }}
                   </Col>
                   <Col span="21" v-else>
                       <span>无</span>
                   </Col>
               </Row>
               <Row>
                    <Col span="3" style="text-align: right; padding-right: 5px">
                        送达情况：
                    </Col>
                    <Col span="21">
                        <span :style="{ color: sendStates[1].c }">{{ (item.send.state !== 0 && !item.send.state) ? '未发送' : sendStates[item.send.state + 1].s }}</span>
                    </Col>
                </Row>
        </div>
    </Modal>
  </div>
</template>

<script>
import { getBrief, queryCase } from '../../api/global.js';
import { getSendInfo, cancelExp, sendME, confirm, lawCaseSendComplete, queryCurrentSend, queryLitigantSend } from '../../api/send.js';
import { formatDate } from '../../libs/date.js';
export default {
    data() {
        return {
            sendStates: [{ s: '取消', c: '#495060' }, { s: '送达中', c: '#2d8cf0' }, { s: '已送达成功', c: '#19be6b' }, { s: '送达失败！', c: '#ed3f14' }],
            sendTo: '0',
            searchData: {
                caseNo: '',
                plaintiffName: '',
                defendantName: ''
            },
            pagenumber: 1,
            queryLoading: false,
            caseLoading: false,
            caseInfoShow: false,
            showHistoryModel: false,
            caseList: [],
            caseInfo: [],
            sendInfo: [],
            historyInfo: [],
            sendTypes: ['现场领取', 'EMS送达', '工作人员上门送达', '邮件送达', '公告', 'H5确认阅读'],
        }
    },
    mounted() {
        if (this.$route.params) {
            var caseId = this.$route.params.lawCaseId;
            if (caseId) {
                this.getCaseInfo(caseId);
            }
        }
        this.getBrief();
    },
    methods: {
        showHistory(id) {
          this.showHistoryModal = true
          queryLitigantSend(id).then(res => {
              if (res.data.state == 100) {
                  this.historyInfo = res.data.result;
                  if(this.historyInfo.length == 0) {
                    this.$Message.info('该当事人无送达历史记录');
                  } else {
                    this.showHistoryModel = true;
                  }
              } else {
                  this.$Message.error(res.data.message);
              }
              this.$nextTick()
          }).catch(err => {
              this.$Message.error('网络错误，送达历史失败');
          })
        },
        getBrief() {
            getBrief().then(res => {
                var data = res.data;
                if (data.state === 100) {
                    this.briefList = data.result;
                }
            }).catch(() => {
                this.$Message.error('网络错误，获取案由列表失败。');
                this.saved = false;
            });
        },
        queryCase() {
            this.queryLoading = true;
            queryCase(this.searchData.caseNo, this.searchData.plaintiffName, this.searchData.defendantName).then(res => {
                var data = res.data;
                if (data.state - 0 === 100) {
                    this.caseList = data.result;
                } else {
                    this.$Message.info(data.message);
                }
                this.queryLoading = false;
            }).catch(() => {
                this.$Message.error('网络错误，查询失败。');
                this.queryLoading = false;
            });
        },
        async getCaseInfo(caseId) {
            this.caseLoading = true;
            await getSendInfo(caseId).then(res => {
                if (res.data.state == 100) {
                    this.caseInfo = res.data.result;
                    this.caseInfoShow = true;
                    this.caseLoading = false;
                } else {
                    this.$Message.error(res.data.message);
                    this.caseLoading = false;
                }
            }).catch(err => {
                this.$Message.error('网络错误，获取案件信息失败。');
                this.caseLoading = false;
            })
            await queryCurrentSend(caseId).then(res => {
                if (res.data.state == 100) {
                    this.sendInfo = res.data.result;
                } else {
                    this.$Message.error(res.data.message);
                }
            }).catch(err => {
                this.$Message.error('网络错误，获取案件信息失败。');
            })
        },
        caseFinish() {
            lawCaseSendComplete(this.caseInfo.id).then(res => {
                if (res.data.state == 100) {
                    this.$Message.success(res.data.message)
                } else {
                    this.$Message.error(res.data.message)
                }
            })
        },
        changeSearchPage(p) {
            this.pagenumber = p;
        },
        formatDate(d, fmt) {
            return formatDate(d, fmt);
        },
    }
}
</script>

<style lang="css">
.case-finish {
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-block;
  background-color: #19be6b;
  float: right;
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}
</style>
