<template>
    <div>
        <Card>
            <Row>
                <Col span="3">
                    <span style="color:#464c5b;font-size:16px;font-weight:700">文书送达管理</span>
                </Col>
                <Col span="21">
                    <Button v-show="!show1" @click.native="show1 = true" style="margin-left: 10px" type="ghost">
                        查询展开
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <Form :model="formItem" inline :label-width="100" v-show="show1">
                        <FormItem label="案号：">
                            <Input style="width: 128px" v-model="formItem.caseNo"/>
                        </FormItem>
                        <FormItem label="案由：">
                            <Select style="width: 128px" v-model="formItem.briefName">
                                <Option v-for="b in briefList" :value="b.brief" :key="b.brief">{{ b.brief }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="当事人：">
                            <Input style="width: 128px" v-model="formItem.litigantName"/>
                        </FormItem>
                        <FormItem label="送达状态：">
                            <Select style="width: 128px" v-model="formItem.state">
                                <Option value="-1">取消</Option>
                                <Option value="0">送达中</Option>
                                <Option value="1">已送达成功</Option>
                                <Option value="2">未外送达成功</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="立案时间：">
                            <DatePicker type="daterange"  placement="bottom-end":options="options" v-model="formItem.daterange" placeholder="请选择您要查询的时间范围" style="width: 190px"></DatePicker>
                        </FormItem>
                        <FormItem label="庭审次数：">
                            <Input style="width: 128px" v-model="formItem.courtNumber"/>
                        </FormItem>
                        <FormItem label="送达类型：">
                            <Select style="width: 128px" v-model="formItem.sendType">
                                <Option v-for="(s, k) in sendTypes" :value="k" :key="k">{{ s }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button @click="query()" type="ghost">查询</Button>
                            <Button @click="formItem = {}" style="margin-left: 10px" type="ghost">清空</Button>
                            <Button @click.native="show1 = false" style="margin-left: 10px" type="ghost">关闭</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
            <!-- <div> -->
                <!-- 转至表格行末 -->
                <!-- <Button v-show="false" @click="$router.push({name:'send', params: { lawCaseId: selCaseId }})" size="large" type="text">查看</Button> -->
                <!-- <Button v-show="false" @click="$router.push({name:'sendDip', params: { lawCaseId: selCaseId }})" size="large" type="text">发送文书</Button> -->
                <!-- 该模块短信通知功能暂时不用 -->
                <!-- <Button v-show="false" @click="smShow" size="large" type="text">短信通知</Button> -->
            <!-- </div> -->
            <Table stripe ref="sendTable" :columns="sendcol" :data="senddata" highlight-row>
                <Spin size="large" fix v-if="spinShow"></Spin>
            </Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="totalPages" :page-size="1" :current="pageNumber" @on-change="changePage"></Page>
                </div>
            </div>
        </Card>
        <Modal title="短信通知" v-model="modal2">
            <Spin size="large" fix v-if="spinSMS"></Spin>
            <div style="line-height: 38px">
                <Row>
                    <Col span="3" style="text-align: center">手机号</Col>
                    <Col span="9">
                        <Select v-model="smsPhone" style="width:100%">
                            <Option v-for="item in phoneList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </Col>
                    <Col span="3" style="text-align: center">模板</Col>
                    <Col span="9">
                        <Select v-model="smsTp" @on-change="selST" style="width:100%">
                            <Option v-for="item in smsTpList" :value="item" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </Col>
                </Row>
            </div>
            <div style="margin-top: 10px">
                <Input v-model="smsTpContent" type="textarea" :rows="4"></Input>
            </div>
            <div slot="footer" style="padding-left: 30px; padding-right: 30px">
                <Button type="info" size="large" long :loading="sms_loading" @click="smsSend">发 送</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { querySend, getPhones } from '../../api/send.js';
import { getBrief } from '../../api/global.js';
import { formatDate } from '../../libs/date.js';
export default {
    data () {
    // var nowD = new Date();
    // const idtypes = ['身份证', '军官证', '护照'];
        const sendTypes = [
            '现场领取',
            'ems送达',
            '工作人员上门送达',
            '邮件送达',
            '公告',
            'H5确认阅读'
        ];
        const sendStates = ['取消', '送达中', '已送达成功', '未外送达成功'];
        return {
            sms_loading: '',
            selCaseId: '',
            spinSMS: true,
            modal2: false,
            smsPhone: '',
            phoneList: [],
            smsTp: {},
            smsTpList: [],
            smsTpContent: '',
            show1: true,
            briefList: [],
            spinShow: false,
            totalPages: 1,
            pageNumber: 1,
            sendStates: sendStates,
            sendTypes: sendTypes,
            formItem: {
                caseNo: this.$store.getters.caseNo,
                briefName: '',
                litigantName: '',
                state: '',
                daterange: []
            },
            sendcol: [
                // {
                //     type: 'selection',
                //     width: 40,
                //     align: 'center'
                // },
                {
                    title: '案号',
                    key: 'caseNo',
                    align: 'center',
                    width: 200
                },
                {
                    title: '庭审次数',
                    key: 'courtNumber',
                    align: 'center',
                    width: 100
                },
                {
                    title: '送达类型',
                    key: 'sendType',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        var s = params.row.sendType;
                        if (s == null) {
                            return h('span', {}, '无');
                        }
                        if (!s && s !== 0) {
                            return h('span', {}, s);
                        }
                        return h('span', {}, sendTypes[s]);
                    }
                },
                {
                    title: '案由',
                    key: 'briefName',
                    align: 'center',
                    width: 110
                },
                {
                    title: '送达状态',
                    key: 'sendState',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        var s = params.row.sendState;
                        if (s == null) {
                            return h('span', {}, '无');
                        }
                        if (!s && s !== 0) {
                            return h('span', {}, s);
                        }
                        return h('span', {}, sendStates[s - 0 + 1]);
                    }
                },
                {
                    title: '诉讼地位',
                    key: 'litigationStatusName',
                    align: 'center',
                    width: 60
                },
                {
                    title: '当事人',
                    key: 'litigantName',
                    align: 'center',
                    width: 280
                },
                {
                    title: '类型',
                    key: 'litigantType',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        return h('span', params.row.litigantType ? '法人' : '自然人');
                    }
                },
                {
                    title: '性别',
                    key: 'litigantSex',
                    align: 'center',
                    width: 80,
                    render: (h, params) => {
                        if (params.row.litigantType) {
                            return h('span', '无');
                        } else {
                            return h('span', params.row.litigantSex ? '女' : '男');
                        }
                    }
                },
                {
                    title: '手机号码',
                    key: 'litigantPhone',
                    align: 'center',
                    width: 120
                },
                {
                    title: '座机号码',
                    key: 'litigantTelPhone',
                    align: 'center',
                    width: 120
                },
                {
                    title: '证件号码/统一信用码',
                    key: 'identityCard',
                    align: 'center',
                    width: 100
                },
                {
                    title: '立案时间',
                    key: 'filingDate',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        var d = new Date(params.row.filingDate - 0);
                        var s = formatDate(d, 'yyyy-MM-dd');
                        return h('span', {}, s);
                    }
                },
                {
                    title: '结案时间',
                    key: 'closeDate',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        if (params.row.closeDate == null) {
                            return '无';
                        } else {
                            var d = new Date(params.row.closeDate - 0);
                            var s = formatDate(d, 'yyyy-MM-dd');
                            return h('span', {}, s);
                        }
                    }
                },
                {
                    title: '案件金额',
                    key: 'applyStandard',
                    align: 'center',
                    width: 100
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    fixed: 'right',
                    width: 150,
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'sendY',
                                                params: { lawCaseId: params.row.id }
                                            });
                                        }
                                    }
                                },
                                '查看'
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({
                                                name: 'sendDipY',
                                                params: { lawCaseId: params.row.id }
                                            });
                                        }
                                    }
                                },
                                '发送文书'
                            )
                        ]);
                    }
                }
            ],
            senddata: [],
            options: {
                shortcuts: [
                    {
                        text: '一周',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '一个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '三个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    }
                ]
            }
        };
    },
    mounted () {
        this.getBrief();
        this.query();
    },
    methods: {
        getBrief () {
            var that = this;
            getBrief()
                .then(res => {
                    var data = res.data;
                    if (data.state - 0 === 100) {
                        that.briefList = data.result;
                    }
                })
                .catch(() => {
                    that.$Message.error('网络错误，获取案由列表失败。');
                    that.saved = false;
                });
        },
        query (page) {
            var that = this;
            that.spinShow = true;
            var s = '';
            var e = '';
            if (that.formItem.daterange && that.formItem.daterange[0]) {
                s = that.formItem.daterange[0].getTime();
            }
            if (that.formItem.daterange && that.formItem.daterange[1]) {
                e = that.formItem.daterange[1].getTime();
            }
            var d = {
                caseNo: that.formItem.caseNo,
                briefName: that.formItem.briefName,
                litigantName: that.formItem.litigantName,
                state: that.formItem.state,
                sendType: that.formItem.sendType,
                courtNumber: that.formItem.courtNumber,
                filingDateStart: s,
                filingDateEnd: e,
                pageNumber: that.pageNumber,
                rows: 10
            };
            querySend(d)
                .then(res => {
                    this.$store.commit('SET_CASENO', this.formItem.caseNo);
                    var data = res.data;
                    if (data.state - 0 === 100) {
                        that.senddata = data.result.content;
                        that.pageNumber = data.result.pageNumber;
                        that.totalPages = data.result.totalPages;
                    } else {
                        that.$Message.info(data.message);
                    }
                    that.spinShow = false;
                })
                .catch(() => {
                    that.$Message.error('网络错误，查询失败。');
                    that.spinShow = false;
                });
        },
        selST (s) {
            this.smsTpContent = s.content;
        },
        selRow (r) {
            this.selCaseId = r.id;
        },
        changePage (p) {
            this.pageNumber = p;
            this.query(p);
        },
        smShow () {
            var that = this;
            this.modal2 = true;
            this.spinSMS = true;
            getPhones(that.selCaseId)
                .then(res => {
                    var data = res.data;
                    if (data.state - 0 === 100) {
                        that.phoneList = data.result.content;
                    } else {
                        that.$Message.info(data.message);
                    }
                    that.spinSMS = false;
                })
                .catch(() => {
                    that.$Message.error('网络错误，当事人号码查询失败。');
                    that.spinSMS = false;
                });
        },
        smsSend () {}
    }
};
</script>
