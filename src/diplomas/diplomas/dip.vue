<template>
    <div id="my-node" class="layoutM">
        <Card class="cardItem">
            <p slot="title">
                <Icon type="wrench"></Icon>
                案件搜索
            </p>
            <div style="width: 40px" slot="extra">
                <!-- <Row :gutter="8" justify="center">
                    <Col class="minus-icon" span="12">
                        <Icon type="minus-round"></Icon>
                    </Col>
                    <Col class="close-icon" span="12">
                        <Icon type="close-round"></Icon>
                    </Col>
                </Row> -->
            </div>
            <div style="margin-bottom: 16px">
                <Form :label-width="60">
                    <FormItem label="案号">
                        <Input v-model="caseNo" placeholder="请输入案号"></Input>
                    </FormItem>
                    <FormItem label="原告姓名">
                        <Input v-model="plaintiffName"></Input>
                    </FormItem>
                    <FormItem label="被告姓名">
                        <Input v-model="defendantName"></Input>
                    </FormItem>
                    <Button type="info" :loading="queryLoading" @click="queryCase" long>
                        <span v-if="!queryLoading">查询</span>
                        <span v-else></span>
                    </Button>
                </Form>
            </div>
            <ButtonGroup vertical>
                <Button v-for="(item, key) in caseList" type="ghost" :key="key" v-show="parseInt(key/10) === (caseP - 1)" @click="showLeft(item.id)" class="caseBtn">
                    <p>
                        <Tooltip :content="item.caseNo">
                            案号：{{ item.caseNo }}
                        </Tooltip>
                    </p>
                    <p>
                        <Tooltip :content="'案由：' + item.briefName + '|' + item.litigationStatusName + ':' + item.litigantName">
                            案由：{{ item.briefName }} | {{ item.litigationStatusName }}:{{ item.litigantName }}
                        </Tooltip>
                    </p>
                </Button>
            </ButtonGroup>
            <Page v-if="caseList.length > 10" :current="caseP" @on-change="changePage" :total="caseList.length" style="padding-left: 28px;padding-top: 10px" simple></Page>
        </Card>
        <Card v-if="info.length">
            <p slot="title">
                案件信息
            </p>
            <div class="maininfo-warp">
                <Row>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        案号
                    </Col>
                    <Col span="9" class="maininfo-col">
                        {{ info[0].caseNo }}
                    </Col>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        案由
                    </Col>
                    <Col span="9" class="maininfo-col">
                        {{ info[0].briefName }}
                    </Col>
                </Row>
                <Row>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        建档时间
                    </Col>
                    <Col span="9" class="maininfo-col">
                        {{ formatDate(new Date(info[0].filingDate - 0), 'yyyy-MM-dd') }}
                    </Col>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        结案时间
                    </Col>
                    <Col span="9" class="maininfo-col">
                        {{ info[0].closeDate && formatDate(new Date(info[0].closeDate - 0), 'yyyy-MM-dd') }}
                    </Col>
                </Row>
                <Row>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        案件金额
                    </Col>
                    <Col span="21" class="maininfo-col">
                        {{ info[0].applyStandard }}元
                    </Col>
                </Row>
                <!-- <Row>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        备注
                    </Col>
                    <Col span="21" class="maininfo-col">
                        {{ info[0].remark }}
                    </Col>
                </Row> -->
            </div>
            <div style="margin-top: 10px; text-align: right;">
                <Button @click="dipshowF('封皮')" type="info" style="background-color: #15A05D; border-color: #15A05D;">封皮生成并预览</Button>
            </div>
        </Card>
        <Card v-if="info.length" v-for="(item, key) in info" :key="key" style="margin-top: 10px">
            <div class="maininfo-warp">
                <Row>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        {{ item.litigationStatusName }}
                    </Col>
                    <Col span="9" class="maininfo-col">
                        {{ item.litigantName }}
                    </Col>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        电子邮箱
                    </Col>
                    <Col span="9" class="maininfo-col">
                        {{ item.email }}
                    </Col>
                </Row>
                <Row>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        手机号码
                    </Col>
                    <Col span="9" class="maininfo-col">
                        {{ item.litigantPhone }}
                    </Col>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        固定电话
                    </Col>
                    <Col span="9" class="maininfo-col">
                        {{ item.litigantTelPhone }}
                    </Col>
                </Row>
                <Row>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        {{item.litigantType==0 ? '身份证号码' : '统一信用代码'}}
                    </Col>
                    <Col span="21" class="maininfo-col">
                        {{ item.identityCard }}
                    </Col>
                </Row>
                <div style="line-height: 38px;border-right:1px solid #e9eaec;" v-if="item.diplomsName">
                    &nbsp;&nbsp; 文书列表选择
                    <Checkbox :indeterminate="item.indeterminate" :value="item.checkAll" @click.prevent.native="handleCheckAll(item)" style="float:right">全选</Checkbox>
                </div>
                <div v-if="item.diplist" class="maininfo-warp">
                    <CheckboxGroup size="large" v-model="item.dipChecked" @on-change="dipCheckedChange(item)">
                        <Row>
                            <Col v-if="item.diplist" v-for="(d, key) in item.diplist" :key="key" span="6" class="maininfo-col">
                                <Checkbox :label="d.name"></Checkbox>
                            </Col>
                        </Row>
                    </CheckboxGroup>
                </div>
            </div>
            <div style="margin-top: 10px; text-align: right;">
                <Button @click="dipshow(item)" type="info">生成并预览</Button>
                <!-- <Button type="success">打印</Button> -->
                <!-- <Button>取消</Button> -->
            </div>
        </Card>
        <Modal
            v-model="modal1"
            title="文书预览"
            :mask-closable="false"
            :styles="{top: '20px'}"
            :width="modalWidth">
            <Tabs v-model="index" type="card">
                <TabPane v-if="dip.checked" v-for="(dip, key) in diplist" :key="key" :label="dip.name" :name="dip.name">
                    <div class="components-container">
                        <div class="editor-container">
                            <UE v-if="modal1" :defaultMsg="dip.content || ''" :config="config" :ref="dip.name"></UE>
                        </div>
                        <div :style="{marginTop: '10px', textAlign: 'right', width: ueWidth}">
                            <Button style="margin-right: 16px" @click.native="save">保存</Button>
                        </div>
                    </div>
                    <Spin size="large" fix v-if="dip.spin"></Spin>
                </TabPane>
            </Tabs>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
import UE from '../../components/ueditor/ueditor.vue';
import { list, toPdf } from '../../api/diplomas.js';
import { getBrief, queryCase, queryCaseInfo } from '../../api/global.js';
import { getInfo } from '../../api/send.js';
import { formatDate } from '../../libs/date.js';
import html2canvas from 'html2canvas';
export default {
    components: { UE },
    data () {
        var width = window.innerWidth - 200;
        var ueWidth = width - 40 + 'px';
        return {
            caseP: 1,
            modal1: false,
            modalWidth: width,
            ueWidth: ueWidth,
            queryLoading: false,
            caseLoading: false,
            infoLoading: false,
            searchForm: '',
            // filter1: '',
            // dateRange: '',
            briefName: '',
            briefList: [],
            caseNo: this.$store.getters.caseNo,
            plaintiffName: '',
            defendantName: '',
            value1: '1',
            caseList: [],
            caseInfo: '',
            info: [],
            diplist: [],
            index: '',
            config: {}
        };
    },
    mounted () {
        this.getBrief();
        if (this.caseNo != '') {
            this.queryCase()
        }
    },
    methods: {
        getBrief () {
            var that = this;
            getBrief().then(res => {
                var data = res.data;
                if (data.state - 0 === 100) {
                    that.briefList = data.result;
                }
            }).catch(() => {
                that.$Message.error('网络错误，获取案由列表失败。');
            });
        },
        queryCase () {
            var that = this;
            that.queryLoading = true;
            this.$store.commit('SET_CASENO', this.caseNo);
            queryCase(that.caseNo, that.plaintiffName, that.defendantName).then(res => {
                var data = res.data;
                if (data.state - 0 === 100) {
                    that.caseList = data.result;
                } else {
                    that.$Message.info(data.message);
                }
                that.queryLoading = false;
            }).catch(() => {
                that.$Message.error('网络错误，查询失败。');
                that.queryLoading = false;
            });
        },
        showLeft (caseId) {
            this.getInfo(caseId);
        },
        getCaseInfo (caseId) {
            var that = this;
            that.caseLoading = true;
            queryCaseInfo(caseId).then(res => {
                var data = res.data;
                if (data.state - 0 === 100) {
                    that.caseInfo = data.result;
                } else {
                    that.$Message.info('案件详情查询:' + data.message);
                }
                that.caseLoading = false;
            }).catch(() => {
                that.$Message.error('网络错误，查询案件详情失败。');
                that.caseLoading = false;
            });
        },
        getInfo (caseId) {
            var that = this;
            that.infoLoading = true;
            getInfo(caseId).then(res => {
                var data = res.data;
                if (data.state - 0 === 100) {
                    that.info = data.result;
                    for (let i = 0; i < that.info.length; i++) {
                        var el = that.info[i];
                        if (el.litigationStatusName == '原告') {
                            el.diplomsName = '送达地址确认书,送达回证,诉讼权利义务告知书,应诉通知书,电话通知记录表,传票,传票(存根),廉政监督卡,合议庭组成人员通知书,参加诉讼通知书,举证通知书,受理案件通知书,送达地址有关事项告知书'
                        } else {
                            el.diplomsName = '传票,廉政监督卡,合议庭组成人员通知书,参加诉讼通知书,举证通知书,受理案件通知书,送达地址有关事项告知书,送达地址确认书,送达回证,诉讼权利义务告知书,应诉通知书,电话通知记录表,传票(存根)'
                        }
                        el.checkAll = true;
                        el.indeterminate = false;
                        el.dipChecked = [];
                        el.diplist = [];
                        if (el.diplomsName) {
                            var arr = el.diplomsName.split(',');
                            for (let j = 0; j < arr.length; j++) {
                                const ee = arr[j];
                                el.diplist.push({
                                    name: ee,
                                    checked: false
                                });
                                if (ee !== '合议庭组成人员通知书' && ee != '参加诉讼通知书' && ee != '电话通知记录表' && ee != '受理案件通知书') {
                                    if (el.litigationStatusName == '原告') {
                                        if (ee != '应诉通知书') {
                                            el.dipChecked.push(ee);
                                        }
                                    } else {
                                        if (ee != '受理案件通知书') {
                                            el.dipChecked.push(ee);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    that.$Message.info('送达查询:' + data.message);
                }
                that.infoLoading = false;
            }).catch(() => {
                that.$Message.error('网络错误，查询送达信息失败。');
                that.infoLoading = false;
            });
        },
        // handleCheckAll (item) {
        //     console.log(item);
        //     if (item.indeterminate) {
        //         item.checkAll = false;
        //     } else {
        //         item.checkAll = !item.checkAll;
        //     }
        //     item.indeterminate = false;

        //     if (item.checkAll) {
        //         for (let i = 0; i < item.diplist.length; i++) {
        //             const el = item.diplist[i];
        //             item.diplist[i].checked = true;
        //             item.dipChecked.push(el.name);
        //         }
        //     } else {
        //         for (let i = 0; i < item.diplist.length; i++) {
        //             item.diplist[i].checked = false;
        //         }
        //         item.dipChecked = [];
        //     }
        // },
        handleCheckAll (item) {
            if (item.indeterminate) {
                item.checkAll = false;
            } else {
                item.checkAll = !item.checkAll;
            }
            item.indeterminate = false;

            if (item.checkAll) {
                for (let i = 0; i < item.diplist.length; i++) {
                    const el = item.diplist[i];
                    item.diplist[i].checked = true;
                    item.dipChecked.push(el.name);
                }
            } else {
                for (let i = 0; i < item.diplist.length; i++) {
                    item.diplist[i].checked = false;
                }
                item.dipChecked = [];
            }
            this.info = JSON.parse(JSON.stringify(this.info));
        },
        dipCheckedChange (data) {
            if (data.dipChecked.length === data.diplist.length) {
                data.indeterminate = false;
                data.checkAll = true;
            } else if (data.dipChecked.length > 0) {
                data.indeterminate = true;
                data.checkAll = false;
            } else {
                data.indeterminate = false;
                data.checkAll = false;
            }
            // vue对象数据更新
            this.info = JSON.parse(JSON.stringify(this.info));
        },
        // 等艺冬改好接口
        dipshow (item) {
            if (item.dipChecked.length) {
                var that = this;
                this.index = item.dipChecked[0];
                this.modal1 = false;
                var br = [];
                for (let i = 0; i < item.dipChecked.length; i++) {
                    const name = item.dipChecked[i];
                    this.diplist.push({
                        name: name,
                        spin: true
                    });
                    br.push(name);
                    if (i === item.dipChecked.length - 1) {
                        list(item.litigantId, br.join(',')).then(res => {
                            var data = res.data;
                            if (data.state - 0 === 100) {
                                that.$Message.loading({
                                    content: '文书生成中，请稍候',
                                    duration: br.length * 0.6, // 按照文书数量给后台一点生成pdf文件的时间
                                    onClose: () => {
                                        window.open('/' + data.result);
                                    }
                                });
                                that.diplist.spin = false;
                            }
                        }).catch(() => {
                            that.$Message.error('网络错误，获取' + name + '失败。');
                            that.diplist.spin = false;
                        });
                    }
                }
            } else {
                this.$Message.error('未选择文书');
            }
        },
        dipshowF (str) {
            var that = this;
            this.modal1 = false;
            var br = [];
            list(this.info[0].litigantId, str).then(res => {
                var data = res.data;
                if (data.state - 0 === 100) {
                    that.$Message.loading({
                        content: '文书生成中，请稍候',
                        duration: 3, // 给后台一点生成pdf文件的时间
                        onClose: () => {
                            window.open('/' + data.result);
                        }
                    });
                    that.diplist.spin = false;
                }
            }).catch(() => {
                that.$Message.error('网络错误，获取' + name + '失败。');
                that.diplist.spin = false;
            });
        },
        formatDate (d, fmt) {
            return formatDate(d, fmt);
        },
        changePage (p) {
            this.caseP = p;
        }
    },
    filters: {
        formatSex (value) {
            return value ? '女' : '男';
        },
        formatType (value) {
            return value ? '法人' : '自然人'
        }
    }
};
</script>
