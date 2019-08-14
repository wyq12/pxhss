<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                {{ this.title }}
                <span class="right-btn" @click="add">
                    <Icon type="ios-plus-empty" style="margin-right:3px;" />添加</span>
            </p>
            <div v-show="this.caseLoading" style="position:absolute;top:0;bottom:0;left:0;right:0;z-index: 99;background: rgba(255,255,255,0.5)">
                <ClipLoader style="position:absolute;top:50%;left:50%;margin-top:-30px;margin-left:-30px" color="#40a9ff" size="60px" />
            </div>
            <Table :columns="columns" :data="this.data"></Table>
        </Card>
        <Modal :title="this.type === 'plaintiff' ? this.litigantId != '' ? '修改原告' : '添加原告' : this.type === 'defendant' ? this.litigantId != '' ? '修改被告' : '添加被告' : this.litigantId != '' ? '修改第三人' : '添加第三人'" v-model="showAdd" width="546px" :loading="loading" ok-text="提交" @on-ok="submit" :mask-closable="false">
            <div>
                <Form :model="addFormItem" :label-width="100" inline>
                    <FormItem :label="addFormItem.litigantType == '自然人'? '姓名' : '公司名称'" style="width: 505px;">
                        <Input v-model="addFormItem.litigantName" placeholder="请输入当事人"></Input>
                    </FormItem>
                    <FormItem label="类型" style="width: 245px;">
                        <Select v-model="addFormItem.litigantType" transfer placeholder="请选择">
                            <Option value="自然人">自然人</Option>
                            <Option value="法人">法人</Option>
                            <Option value="非法人组织">非法人组织</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '身份证号码' : '统一信用代码'" style="width: 245px;">
                        <Input v-model="addFormItem.identityCard" @on-blur="idCardtoBirth" placeholder="请输入"></Input>
                    </FormItem>
                    <FormItem label="性别" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <Select v-model="addFormItem.litigantSex" transfer placeholder="请选择">
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="出生日期" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <DatePicker type="date" transfer :value="addFormItem.birthday" @on-change="changeDate"></DatePicker>
                    </FormItem>

                    <FormItem label="当事人关系" style="width: 245px;display:none">
                        <Select v-model="addFormItem.relationType" transfer placeholder="请选择">
                            <Option value="0">无</Option>
                            <Option value="1">夫妻</Option>
                            <Option value="2">同住成员家属</Option>
                            <Option value="3">其他</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="当事人" style="width: 245px;display:none">
                        <Select v-model="addFormItem.relationLitigantId" transfer placeholder="请选择">
                            <Option v-for="item in this.data" :value="item.id" :key="item.litigantName">{{ item.litigantName }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="民族" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <Input v-model="addFormItem.nation" placeholder="请输入民族" width="100px;"></Input>
                    </FormItem>
                    <FormItem label="手机号码" style="width: 245px;">
                        <Input v-model="addFormItem.litigantPhone" placeholder="请输入手机号码"></Input>
                        <div style="color: #ed3f14;position:absolute;top:28px;left:5px;">多个手机号码请用逗号分隔</div>
                    </FormItem>
                    <FormItem label="固定电话" style="width: 245px;">
                        <Input v-model="addFormItem.litigantTelPhone" placeholder="请输入固定电话"></Input>
                    </FormItem>

                    <FormItem v-bind:label="addFormItem.litigantType == '法人' ? '法定代表人' : '负责人'" style="width: 245px;" v-show="addFormItem.litigantType != '自然人'">
                        <Input v-model="addFormItem.legalManName" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入法定代表人姓名' : '请输入负责人姓名'" width="100px;"></Input>
                    </FormItem>
                    <FormItem label="身份证号码" style="width: 245px;" v-show="addFormItem.litigantType != '自然人'">
                        <Input v-model="addFormItem.legalManId" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入法定代表人身份证号码' : '请输入负责人身份证号码'" width="100px;"></Input>
                    </FormItem>
                    <FormItem label="手机号码" style="width: 505px;" v-show="addFormItem.litigantType != '自然人'">
                        <Input v-model="addFormItem.legalManPhone" v-bind:placeholder="addFormItem.litigantType == '法人' ? '请输入法定代表人手机号码' : '请输入负责人手机号码'"></Input>
                    </FormItem>

                    <FormItem label="工作单位" style="width: 245px;" v-show="addFormItem.litigantType == '自然人'">
                        <Input v-model="addFormItem.employer" placeholder="请输入工作单位"></Input>
                    </FormItem>
                    <FormItem label="电子邮箱" style="width: 505px">
                        <Input v-model="addFormItem.email" placeholder="请输入电子邮箱"></Input>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '户籍地址' : '公司注册地址'" style="width: 505px">
                        <Input v-model="addFormItem.nativePlace" placeholder="请输入户籍地址"></Input>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '经常居住地址' : '公司经营地址'" style="width: 505px">
                        <Input v-model="addFormItem.address" placeholder="请输入经常居住地址"></Input>
                    </FormItem>
                    <FormItem :label="addFormItem.litigantType == '自然人' ? '送达地址' : '确认公司经营地址'" style="width: 505px">
                        <Input v-model="addFormItem.sendAddress" placeholder="请输入送达地址"></Input>
                    </FormItem>

                    <FormItem label="代理人一身份" style="width: 505px;">
                        <Select v-model="addFormItem.lawerType" transfer @on-change="changeType" placeholder="请选择">
                            <Option value="1">律师</Option>
                            <Option value="2">法律工作者</Option>
                            <Option value="3">单位工作人员</Option>
                            <Option value="4">近亲属</Option>
                            <Option value="5">公民</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="姓名" style="width: 245px;">
                        <!-- <Input v-model="addFormItem.lawerName" placeholder="请输入代理人一姓名"  width="100px;"></Input> -->
                        <AutoComplete v-model="addFormItem.lawerName" :data="agentData1" @on-search="queryAgent" placeholder="请输入代理人一姓名" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="电话" style="width: 245px;">
                        <!-- <Input v-model="addFormItem.lawermobile"  placeholder="请输入代理人一电话" width="100px;"></Input> -->
                        <AutoComplete v-model="addFormItem.lawermobile" :data="phoneData1" @on-search="queryAgent1" placeholder="请输入代理人一电话" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="公民身份证号码" v-show="lawyerT1" style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawIdentiCard" placeholder="请输入代理人一公民身份证号码"  ></Input> -->
                        <AutoComplete v-model="addFormItem.lawIdentiCard" :data="numData1" @on-search="queryAgent1" placeholder="请输入代理人一公民身份证号码" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="工作证件号码" v-show="!lawyerT1" style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawerNum" placeholder="请输入代理人一工作证件号码"  ></Input> -->
                        <AutoComplete v-model="addFormItem.lawerNum" :data="lawNumData1" @on-search="queryAgent1" placeholder="请输入代理人一工作证件号码" transfer></AutoComplete>
                    </FormItem>

                    <FormItem label="代理人二身份" style="width: 505px;">
                        <Select v-model="addFormItem.lawerType1" transfer @on-change="changeType1" placeholder="请选择">
                            <Option value="1">律师</Option>
                            <Option value="2">法律工作者</Option>
                            <Option value="3">单位工作人员</Option>
                            <Option value="4">近亲属</Option>
                            <Option value="5">公民</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="姓名" style="width: 245px;">
                        <!-- <Input v-model="addFormItem.lawerName1" placeholder="请输入代理人二姓名"  width="100px;"></Input> -->
                        <AutoComplete v-model="addFormItem.lawerName1" :data="agentData2" @on-search="queryAgent2" placeholder="请输入代理人二姓名" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="电话" style="width: 245px;">
                        <!-- <Input v-model="addFormItem.lawermobile1" placeholder="请输入代理人二电话" width="100px;"></Input> -->
                        <AutoComplete v-model="addFormItem.lawermobile1" :data="phoneData2" @on-search="queryAgent3" placeholder="请输入代理人二电话" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="公民身份证号码" v-show="lawyerT2" style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawIdentiCard1" placeholder="请输入代理人二公民身份证号码"  ></Input> -->
                        <AutoComplete v-model="addFormItem.lawIdentiCard1" :data="numData2" @on-search="queryAgent3" placeholder="请输入代理人二公民身份证号码" transfer></AutoComplete>
                    </FormItem>
                    <FormItem label="工作证件号码" v-show="!lawyerT2" style="width: 505px;">
                        <!-- <Input v-model="addFormItem.lawerNum1" placeholder="请输入代理人二工作证件号码"  ></Input> -->
                        <AutoComplete v-model="addFormItem.lawerNum1" :data="lawNumData2" @on-search="queryAgent3" placeholder="请输入代理人二工作证件号码" transfer></AutoComplete>
                    </FormItem>
                </Form>
            </div>
        </Modal>

        <Modal v-model="deleteModal" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确认删除？</span>
            </p>
            <div style="text-align:center">
                <p>您将删除“{{ deleteName }}”</p>
                <p>是否继续删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="deleteLitigant">删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script type="text/javascript">
import { formatDate } from '@/libs/date';
import { ClipLoader } from 'vue-spinner/dist/vue-spinner.min.js';
import {
    addLitigant,
    removeLitigant,
    detailLitigant,
    modiLitigant,
    NetworkKyc,
    findAgent
} from '@/api/case';
export default {
    components: {
        ClipLoader
    },
    data () {
        return {
            lawyerT1: true,
            lawyerT2: true,
            loading2: false,
            loading: true,
            agentData1: [],
            phoneData1: [],
            numData1: [],
            lawNumData1: [],
            agentData2: [],
            phoneData2: [],
            numData2: [],
            lawNumData2: [],
            addFormItem: {
                litigantName: '',
                litigantSex: '',
                litigantType: '自然人',
                employer: '',
                identityCard: '',
                nation: '',
                litigantPhone: '',
                litigantTelPhone: '',
                birthday: '',
                email: '',
                nativePlace: '',
                address: '',
                legalManName: '',
                legalManPhone: '',
                legalManId: '',
                sendAddress: '',
                agentId: '',
                lawerType: '',
                lawerName: '',
                lawermobile: '',
                lawIdentiCard: '',
                lawerNum: '',
                lawFirm: '',
                relationType: '',
                relationLitigantId: '',
                agentId1: "",
                lawerType1: "",
                lawerName1: "",
                lawermobile1: "",
                lawIdentiCard1: "",
                lawerNum1: ""
            },
            deleteName: '',
            acType: '',
            deleteId: '',
            deleteModal: false,
            litigantId: '',
            showAdd: false,
            columns: [
                {
                    title: '当事人',
                    key: 'litigantName',
                    width: '180px',
                    align: 'center'
                },
                {
                    title: '身份证号/统一信用码',
                    key: 'identityCard',
                    width: '170px',
                    align: 'center'
                },
                {
                    title: '手机号码',
                    key: 'litigantPhone',
                    width: '130px',
                    align: 'center'
                },
                {
                    title: '地址',
                    key: 'address',
                    width: '280px',
                    align: 'center'
                },
                {
                    title: '操作',
                    width: '130px',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            if (this.CaseInfoSaved()) {
                                                detailLitigant(params.row.id)
                                                    .then(res => {
                                                        if (res.data.state === 100) {
                                                            this.showAdd = true;
                                                            this.litigantId = params.row.id;
                                                            this.addFormItem.litigantName = res.data.result.litigantName;
                                                            this.addFormItem.litigantSex = res.data.result.litigantSex == 0 ? '男' : '女';
                                                            if (res.data.result.litigantType == 0) {
                                                                this.addFormItem.litigantType = '自然人';
                                                            } else if (res.data.result.litigantType == 1) {
                                                                this.addFormItem.litigantType = '法人';
                                                            } else {
                                                                this.addFormItem.litigantType = '非法人组织';
                                                            }
                                                            // this.addFormItem.litigantType =
                                                            //   res.data.result.litigantType == 1
                                                            //     ? "法人"
                                                            //     : "自然人";
                                                            this.addFormItem.employer = res.data.result.employer;
                                                            this.addFormItem.identityCard = res.data.result.identityCard;
                                                            this.addFormItem.nation = res.data.result.nation;
                                                            this.addFormItem.litigantPhone = res.data.phoneAll;
                                                            this.addFormItem.litigantTelPhone = res.data.result.litigantTelPhone;
                                                            this.addFormItem.birthday = res.data.result.birthday;
                                                            this.addFormItem.email = res.data.result.email;
                                                            this.addFormItem.nativePlace = res.data.result.nativePlace;
                                                            this.addFormItem.legalManName = res.data.result.legalManName;
                                                            this.addFormItem.legalManPhone = res.data.result.legalManPhone;
                                                            this.addFormItem.legalManId = res.data.result.legalManId;
                                                            this.addFormItem.sendAddress = res.data.result.sendAddress;
                                                            this.addFormItem.lawerType = res.data.result.lawyer.agentType;
                                                            this.addFormItem.lawerName = res.data.result.lawyer.agentName;
                                                            this.addFormItem.lawermobile = res.data.result.lawyer.agentMobile;
                                                            this.addFormItem.lawIdentiCard = res.data.result.lawyer.agentIdentiCard;
                                                            this.addFormItem.lawerNum = res.data.result.lawyer.lawerNum;
                                                            this.addFormItem.relationType = res.data.result.relationType;
                                                            this.addFormItem.relationLitigantId = res.data.result.relationLitigant;
                                                            var arry = res.data.result.lawyer;
                                                            if (arry != []) {
                                                                if (arry.length == 1) {
                                                                    this.addFormItem.agentId = "";
                                                                    this.addFormItem.lawerType = arry[0].agentType;
                                                                    console.log(arry[0].agentType)
                                                                    this.addFormItem.lawerName = arry[0].agentName;
                                                                    this.addFormItem.lawermobile = arry[0].agentMobile;
                                                                    this.addFormItem.lawIdentiCard = arry[0].agentIdentiCard;
                                                                    this.addFormItem.lawerNum = arry[0].lawerNum;
                                                                } else if (arry.length == 2) {
                                                                    this.addFormItem.agentId = "";
                                                                    this.addFormItem.lawerType = arry[1].agentType;
                                                                    this.addFormItem.lawerName = arry[1].agentName;
                                                                    this.addFormItem.lawermobile = arry[1].agentMobile;
                                                                    this.addFormItem.lawIdentiCard = arry[1].agentIdentiCard;
                                                                    this.addFormItem.lawerNum = arry[1].lawerNum;
                                                                    this.addFormItem.agentId1 = "";
                                                                    this.addFormItem.lawerType1 = arry[0].agentType;
                                                                    this.addFormItem.lawerName1 = arry[0].agentName;
                                                                    this.addFormItem.lawermobile1 = arry[0].agentMobile;
                                                                    this.addFormItem.lawIdentiCard1 = arry[0].agentIdentiCard;
                                                                    this.addFormItem.lawerNum1 = arry[0].lawerNum;
                                                                }
                                                            } else {
                                                                this.addFormItem.agentId = "";
                                                                this.addFormItem.lawerType = "";
                                                                this.addFormItem.lawerName = '';
                                                                this.addFormItem.lawermobile = '';
                                                                this.addFormItem.lawIdentiCard = '';
                                                                this.addFormItem.lawerNum = '';
                                                                this.addFormItem.agentId1 = "";
                                                                this.addFormItem.lawerType1 = '';
                                                                this.addFormItem.lawerName1 = '';
                                                                this.addFormItem.lawermobile1 = '';
                                                                this.addFormItem.lawIdentiCard1 = '';
                                                                this.addFormItem.lawerNum1 = '';
                                                            }
                                                            this.acType = '修改';
                                                            this.addFormItem.address = res.data.result.address;
                                                        } else {
                                                            this.$Message.error(res.data.message);
                                                        }
                                                    })
                                                    .catch(() => { });
                                            }
                                        }
                                    }
                                },
                                '修改'
                            ),
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if (this.CaseInfoSaved()) {
                                                this.deleteModal = true;
                                                this.deleteName = params.row.litigantName;
                                                this.deleteId = params.row.id;
                                            }
                                        }
                                    }
                                },
                                '删除'
                            )
                        ]);
                    }
                }
            ]
        };
    },
    props: {
        title: String,
        lowCaseId: String,
        data: Array,
        changeCaseInfo: Boolean,
        caseLoading: Boolean,
        type: String
    },
    methods: {
        changeType (e) {
            if (e == 1 || e == 2) {
                this.lawyerT1 = false;
            } else {
                this.lawyerT1 = true;
            }
        },
        changeType1 (e) {
            if (e == 1 || e == 2) {
                this.lawyerT2 = false;
            } else {
                this.lawyerT2 = true;
            }
        },
        queryAgent (value) {
            console.log(989)
            this.numData1 = [];
            this.phoneData1 = [];
            this.lawNumData1 = [];
            this.agentData1 = !value ? [] : [
                value,
            ];
            var agentIdentiCard = '';
            var lawerNum = "";
            findAgent(value, agentIdentiCard, lawerNum).then(res => {
                if (res.data.state == 100) {
                    if (res.data.lawyers != []) {
                        var arr1 = [];
                        var ary = res.data.lawyers;

                        for (var i = 0; i < ary.length; i++) {
                            arr1.push(ary[i].agentName)
                            this.numData1.push(ary[i].agentIdentiCard);
                            this.phoneData1.push(ary[i].agentMobile);
                            this.lawNumData1.push(ary[i].lawerNum)
                        }
                        this.agentData1 = arr1;
                        console.log(this.agentData1)
                    }
                }
            })
        },
        queryAgent1 (value) {
            this.numData1 = !value ? [] : [
                value,
            ];
            var lawyerNam = '';
            var agentIdentiCard = '';
            var lawerNum = "";
            findAgent(lawyerNam, value, lawerNum).then(res => {
                if (res.data.state == 100) {
                    if (res.data.lawyers != []) {
                        var arr1 = [];
                        var ary = res.data.lawyers;

                        for (var i = 0; i < ary.length; i++) {
                            this.numData1.push(ary[i].agentIdentiCard);
                        }
                    }
                }
            })
        },
        queryAgent2 (value) {
            this.phoneData2 = [];
            this.numData2 = [];
            this.lawNumData2 = [];
            this.agentData2 = !value ? [] : [
                value,
            ];
            var numa = '';
            var lawerNum = "";
            findAgent(value, numa, lawerNum).then(res => {
                if (res.data.state == 100) {
                    if (res.data.lawyers != []) {
                        var arr1 = [];
                        var ary = res.data.lawyers;

                        for (var i = 0; i < ary.length; i++) {
                            arr1.push(ary[i].agentName)
                            this.numData2.push(ary[i].agentIdentiCard);
                            this.phoneData2.push(ary[i].agentMobile);
                            this.lawNumData2.push(ary[i].lawerNum);
                        }
                        this.agentData2 = arr1;
                        console.log(this.agentData1)
                    }
                }
            })
        },
        queryAgent3 (value) {

        },
        changeDate (date) {
            this.addFormItem.birthday = new Date(date).getTime();
        },
        idCardtoBirth () {
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(this.addFormItem.identityCard)) {
                this.addFormItem.birthday =
                    this.addFormItem.identityCard.substring(6, 10) +
                    '-' +
                    this.addFormItem.identityCard.substring(10, 12) +
                    '-' +
                    this.addFormItem.identityCard.substring(12, 14);
            }
        },
        changeLoading () {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
        add () {
            console.log(this.litigantId)
            if (this.CaseInfoSaved()) {
                this.showAdd = true;
                this.litigantId = '';
                this.addFormItem.litigantName = '';
                this.addFormItem.litigantSex = '';
                this.addFormItem.identityCard = '';
                this.addFormItem.nation = '';
                this.addFormItem.litigantPhone = '';
                this.addFormItem.litigantTelPhone = '';
                this.addFormItem.birthday = '';
                this.addFormItem.email = '';
                this.addFormItem.address = '';
                this.addFormItem.legalManName = '';
                this.addFormItem.legalManPhone = '';
                this.addFormItem.legalManId = '';
                this.addFormItem.sendAddress = '';
                this.addFormItem.agentId = "";
                this.addFormItem.lawerType = '';
                this.addFormItem.lawerName = '';
                this.addFormItem.lawermobile = '';
                this.addFormItem.lawIdentiCard = '';
                this.addFormItem.lawerNum = '';
                this.addFormItem.relationType = "";
                this.addFormItem.relationLitigantId = '';
                this.addFormItem.agentId1 = "";
                this.addFormItem.lawerType1 = '';
                this.addFormItem.lawerName1 = '';
                this.addFormItem.lawermobile1 = '';
                this.addFormItem.lawIdentiCard1 = '';
                this.addFormItem.lawerNum1 = '';
                this.addFormItem.lawIdentiCard1 = '';
                console.log(this.agentData1)
                this.acType = '添加';
            }
        },
        submit () {
            // console.log(this.addFormItem.relationType)
            // console.log(this.addFormItem.lawerType1)
            // console.log(this.addFormItem.lawerType)
            // this.changeLoading()
            // return false;
            // if(this.addFormItem.relationType != 0 && this.addFormItem.relationLitigantId == ""){
            //     this.$Message.error('选择关系当事人');
            //     this.changeLoading();
            //     return false;
            // }
            // if(this.addFormItem.relationLitigantId != ""){
            //     if(this.addFormItem.relationType == 0 || this.addFormItem.relationType == ""){
            //         this.$Message.error('选择当事人关系');
            //         this.changeLoading();
            //         return false;
            //     }
            // }
            var litigaStatus;
            if (this.type == 'plaintiff') {
                litigaStatus = '原告';
            } else if (this.type == 'defendant') {
                litigaStatus = '被告';
            } else {
                litigaStatus = '第三人';
            }
            const litigantSex = this.addFormItem.litigantSex == '男' ? 0 : 1;
            if (this.addFormItem.litigantType == '自然人') {
                var litigantType = 0;
            } else if (this.addFormItem.litigantType == '法人') {
                var litigantType = 1;
            } else {
                var litigantType = 2;
            }
            if (
                this.addFormItem.litigantPhone == '' ||
                this.addFormItem.litigantPhone == undefined ||
                this.addFormItem.litigantPhone == null
            ) {
                var litigantPhone = '';
            } else {
                var litigantPhone = this.addFormItem.litigantPhone.replace(/，/gi, ',');
            }
            var birthday =
                this.addFormItem.birthday &&
                formatDate(new Date(this.addFormItem.birthday), 'yyyy-MM-dd');
            if (birthday == 'NaN-aN-aN') {
                birthday = '';
            }
            if (this.litigantId != '') {
                if (this.addFormItem.litigantType == '自然人') {
                    var subNmae = this.addFormItem.litigantName;
                    var subCarId = this.addFormItem.identityCard;
                    var subPhone = litigantPhone;
                } else {
                    var subNmae = this.addFormItem.legalManName;
                    var subCarId = this.addFormItem.legalManId;
                    var subPhone = this.addFormItem.legalManPhone;
                }
                NetworkKyc(subNmae, subCarId, subPhone).then(res => {
                    if (res.data.state === 100) {
                        if (res.data.isTrue == true) {
                            modiLitigant(
                                this.litigantId,
                                this.addFormItem.litigantName,
                                this.addFormItem.identityCard,
                                litigantSex,
                                litigantType,
                                this.addFormItem.employer,
                                litigantPhone,
                                this.addFormItem.litigantTelPhone,
                                this.addFormItem.email,
                                this.addFormItem.nativePlace,
                                this.addFormItem.address,
                                this.addFormItem.nation,
                                birthday,
                                litigaStatus,
                                this.addFormItem.legalManName,
                                this.addFormItem.legalManPhone,
                                this.addFormItem.legalManId,
                                this.addFormItem.sendAddress,
                                this.addFormItem.agentId,
                                this.addFormItem.lawerType,
                                this.addFormItem.lawerName,
                                this.addFormItem.lawermobile,
                                this.addFormItem.lawIdentiCard,
                                this.addFormItem.lawerNum,
                                this.addFormItem.relationType,
                                this.addFormItem.relationLitigantId,
                                this.addFormItem.agentId,
                                this.addFormItem.lawerType1,
                                this.addFormItem.lawerName1,
                                this.addFormItem.lawermobile1,
                                this.addFormItem.lawIdentiCard1,
                                this.addFormItem.lawerNum1
                            )
                                .then(res => {
                                    if (res.data.state === 100) {
                                        this.$Message.success(res.data.message);
                                        this.litigantId = '';
                                        this.addFormItem.litigantName = '';
                                        this.addFormItem.litigantSex = '';
                                        this.addFormItem.litigantType = '自然人';
                                        this.addFormItem.employer = '';
                                        this.addFormItem.identityCard = '';
                                        this.addFormItem.nation = '';
                                        this.addFormItem.litigantPhone = '';
                                        this.addFormItem.litigantTelPhone = '';
                                        this.addFormItem.birthday = '';
                                        this.addFormItem.email = '';
                                        this.addFormItem.nativePlace = '';
                                        this.addFormItem.address = '';
                                        this.addFormItem.legalManName = '';
                                        this.addFormItem.legalManPhone = '';
                                        this.addFormItem.legalManId = '';
                                        this.addFormItem.sendAddress = '';
                                        this.addFormItem.lawerType = '';
                                        this.addFormItem.lawerName = '';
                                        this.addFormItem.lawermobile = '';
                                        this.addFormItem.lawIdentiCard = '';
                                        this.addFormItem.lawerNum = '';
                                        this.addFormItem.relationType = '';
                                        this.addFormItem.relationLitigantId = '';
                                        this.addFormItem.agentId = "";
                                        this.addFormItem.agentId1 = "";
                                        this.addFormItem.lawerType1 = '';
                                        this.addFormItem.lawerName1 = '';
                                        this.addFormItem.lawermobile1 = '';
                                        this.addFormItem.lawIdentiCard1 = '';
                                        this.addFormItem.lawerNum1 = '';
                                        this.addFormItem.lawIdentiCard1 = '';
                                        this.showAdd = false;
                                        this.$emit('refreshList');
                                    } else {
                                        this.changeLoading();
                                        this.$Message.error(res.data.message);
                                    }
                                })
                                .catch(() => {
                                    this.$Message.error('服务器出错，请稍后再试');
                                    this.changeLoading();
                                });
                        } else if (res.data.isTrue == false) {
                            this.$Modal.confirm({
                                title: '',
                                content: '<p>三网认证不成功</p>',
                                okText: '继续提交',
                                cancelText: '取消提交',
                                onOk: () => {
                                    modiLitigant(
                                        this.litigantId,
                                        this.addFormItem.litigantName,
                                        this.addFormItem.identityCard,
                                        litigantSex,
                                        litigantType,
                                        this.addFormItem.employer,
                                        litigantPhone,
                                        this.addFormItem.litigantTelPhone,
                                        this.addFormItem.email,
                                        this.addFormItem.nativePlace,
                                        this.addFormItem.address,
                                        this.addFormItem.nation,
                                        birthday,
                                        litigaStatus,
                                        this.addFormItem.legalManName,
                                        this.addFormItem.legalManPhone,
                                        this.addFormItem.legalManId,
                                        this.addFormItem.sendAddress,
                                        this.addFormItem.agentId,
                                        this.addFormItem.lawerType,
                                        this.addFormItem.lawerName,
                                        this.addFormItem.lawermobile,
                                        this.addFormItem.lawIdentiCard,
                                        this.addFormItem.lawerNum,
                                        this.addFormItem.relationType,
                                        this.addFormItem.relationLitigantId,
                                        this.addFormItem.agentId,
                                        this.addFormItem.lawerType1,
                                        this.addFormItem.lawerName1,
                                        this.addFormItem.lawermobile1,
                                        this.addFormItem.lawIdentiCard1,
                                        this.addFormItem.lawerNum1
                                    )
                                        .then(res => {
                                            if (res.data.state === 100) {
                                                this.$Message.success(res.data.message);
                                                this.litigantId = '';
                                                this.addFormItem.litigantName = '';
                                                this.addFormItem.litigantSex = '';
                                                this.addFormItem.litigantType = '自然人';
                                                this.addFormItem.employer = '';
                                                this.addFormItem.identityCard = '';
                                                this.addFormItem.nation = '';
                                                this.addFormItem.litigantPhone = '';
                                                this.addFormItem.litigantTelPhone = '';
                                                this.addFormItem.birthday = '';
                                                this.addFormItem.email = '';
                                                this.addFormItem.nativePlace = '';
                                                this.addFormItem.address = '';
                                                this.addFormItem.legalManName = '';
                                                this.addFormItem.legalManPhone = '';
                                                this.addFormItem.legalManId = '';
                                                this.addFormItem.sendAddress = '';
                                                this.addFormItem.lawerType = '';
                                                this.addFormItem.lawerName = '';
                                                this.addFormItem.lawermobile = '';
                                                this.addFormItem.lawIdentiCard = '';
                                                this.addFormItem.lawerNum = '';
                                                this.addFormItem.lawFirm = '';
                                                this.addFormItem.relationType = '';
                                                this.addFormItem.relationLitigantId = '';
                                                this.addFormItem.agentId = "";
                                                this.addFormItem.agentId1 = "";
                                                this.addFormItem.lawerType1 = '';
                                                this.addFormItem.lawerName1 = '';
                                                this.addFormItem.lawermobile1 = '';
                                                this.addFormItem.lawIdentiCard1 = '';
                                                this.addFormItem.lawerNum1 = '';
                                                this.addFormItem.lawIdentiCard1 = '';
                                                this.showAdd = false;
                                                this.$emit('refreshList');
                                            } else {
                                                this.changeLoading();
                                                this.$Message.error(res.data.message);
                                            }
                                        })
                                        .catch(() => {
                                            this.$Message.error('服务器出错，请稍后再试');
                                            this.changeLoading();
                                        });
                                },
                                onCancel: () => {
                                    this.changeLoading();
                                }
                            });
                        }
                    } else {
                        this.$Modal.confirm({
                            title: '',
                            content: '<p>三网认证接口调用失败</p>',
                            okText: '继续提交',
                            cancelText: '取消提交',
                            onOk: () => {
                                modiLitigant(
                                    this.litigantId,
                                    this.addFormItem.litigantName,
                                    this.addFormItem.identityCard,
                                    litigantSex,
                                    litigantType,
                                    this.addFormItem.employer,
                                    litigantPhone,
                                    this.addFormItem.litigantTelPhone,
                                    this.addFormItem.email,
                                    this.addFormItem.nativePlace,
                                    this.addFormItem.address,
                                    this.addFormItem.nation,
                                    birthday,
                                    litigaStatus,
                                    this.addFormItem.legalManName,
                                    this.addFormItem.legalManPhone,
                                    this.addFormItem.legalManId,
                                    this.addFormItem.sendAddress,
                                    this.addFormItem.agentId,
                                    this.addFormItem.lawerType,
                                    this.addFormItem.lawerName,
                                    this.addFormItem.lawermobile,
                                    this.addFormItem.lawIdentiCard,
                                    this.addFormItem.lawerNum,
                                    this.addFormItem.relationType,
                                    this.addFormItem.relationLitigantId,
                                    this.addFormItem.agentId,
                                    this.addFormItem.lawerType1,
                                    this.addFormItem.lawerName1,
                                    this.addFormItem.lawermobile1,
                                    this.addFormItem.lawIdentiCard1,
                                    this.addFormItem.lawerNum1
                                )
                                    .then(res => {
                                        if (res.data.state === 100) {
                                            this.$Message.success(res.data.message);
                                            this.litigantId = '';
                                            this.addFormItem.litigantName = '';
                                            this.addFormItem.litigantSex = '';
                                            this.addFormItem.litigantType = '自然人';
                                            this.addFormItem.employer = '';
                                            this.addFormItem.identityCard = '';
                                            this.addFormItem.nation = '';
                                            this.addFormItem.litigantPhone = '';
                                            this.addFormItem.litigantTelPhone = '';
                                            this.addFormItem.birthday = '';
                                            this.addFormItem.email = '';
                                            this.addFormItem.nativePlace = '';
                                            this.addFormItem.address = '';
                                            this.addFormItem.legalManName = '';
                                            this.addFormItem.legalManPhone = '';
                                            this.addFormItem.legalManId = '';
                                            this.addFormItem.sendAddress = '';
                                            this.addFormItem.lawerType = '';
                                            this.addFormItem.lawerName = '';
                                            this.addFormItem.lawermobile = '';
                                            this.addFormItem.lawIdentiCard = '';
                                            this.addFormItem.lawerNum = '';
                                            this.addFormItem.lawFirm = '';
                                            this.addFormItem.relationType = '';
                                            this.addFormItem.relationLitigantId = '';
                                            this.addFormItem.agentId = "";
                                            this.addFormItem.agentId1 = "";
                                            this.addFormItem.lawerType1 = '';
                                            this.addFormItem.lawerName1 = '';
                                            this.addFormItem.lawermobile1 = '';
                                            this.addFormItem.lawIdentiCard1 = '';
                                            this.addFormItem.lawerNum1 = '';
                                            this.addFormItem.lawIdentiCard1 = '';
                                            this.showAdd = false;
                                            this.$emit('refreshList');
                                        } else {
                                            this.changeLoading();
                                            this.$Message.error(res.data.message);
                                        }
                                    })
                                    .catch(() => {
                                        this.$Message.error('服务器出错，请稍后再试');
                                        this.changeLoading();
                                    });
                            },
                            onCancel: () => {
                                this.changeLoading();
                            }
                        });
                    }
                });
                return false;
            } else {
                if (this.addFormItem.litigantType == '自然人') {
                    var subNmae = this.addFormItem.litigantName;
                    var subCarId = this.addFormItem.identityCard;
                    var subPhone = litigantPhone;
                } else {
                    var subNmae = this.addFormItem.legalManName;
                    var subCarId = this.addFormItem.legalManId;
                    var subPhone = this.addFormItem.legalManPhone;
                }
                NetworkKyc(subNmae, subCarId, subPhone).then(res => {
                    if (res.data.state === 100) {
                        if (res.data.isTrue == true) {
                            addLitigant(
                                this.lowCaseId,
                                this.addFormItem.litigantName,
                                this.addFormItem.identityCard,
                                litigantSex,
                                litigantType,
                                this.addFormItem.employer,
                                litigantPhone,
                                this.addFormItem.litigantTelPhone,
                                this.addFormItem.email,
                                this.addFormItem.nativePlace,
                                this.addFormItem.address,
                                this.addFormItem.nation,
                                birthday,
                                litigaStatus,
                                this.addFormItem.legalManName,
                                this.addFormItem.legalManPhone,
                                this.addFormItem.legalManId,
                                this.addFormItem.sendAddress,
                                this.addFormItem.agentId,
                                this.addFormItem.lawerType,
                                this.addFormItem.lawerName,
                                this.addFormItem.lawermobile,
                                this.addFormItem.lawIdentiCard,
                                this.addFormItem.lawerNum,
                                this.addFormItem.relationType,
                                this.addFormItem.relationLitigantId,
                                this.addFormItem.agentId,
                                this.addFormItem.lawerType1,
                                this.addFormItem.lawerName1,
                                this.addFormItem.lawermobile1,
                                this.addFormItem.lawIdentiCard1,
                                this.addFormItem.lawerNum1
                            )
                                .then(res => {
                                    if (res.data.state === 100) {
                                        this.$Message.success(res.data.message);
                                        this.addFormItem.litigantName = '';
                                        this.addFormItem.litigantSex = '';
                                        this.addFormItem.litigantType = '自然人';
                                        this.addFormItem.identityCard = '';
                                        this.addFormItem.employer = '';
                                        this.addFormItem.nation = '';
                                        this.addFormItem.litigantPhone = '';
                                        this.addFormItem.litigantTelPhone = '';
                                        this.addFormItem.birthday = '';
                                        this.addFormItem.email = '';
                                        this.addFormItem.nativePlace = '';
                                        this.addFormItem.address = '';
                                        this.addFormItem.legalManName = '';
                                        this.addFormItem.legalManPhone = '';
                                        this.addFormItem.legalManId = '';
                                        this.addFormItem.sendAddress = '';
                                        this.addFormItem.lawerType = '';
                                        this.addFormItem.lawerName = '';
                                        this.addFormItem.lawermobile = '';
                                        this.addFormItem.lawIdentiCard = '';
                                        this.addFormItem.lawerNum = '';
                                        this.addFormItem.lawFirm = '';
                                        this.addFormItem.relationType = '';
                                        this.addFormItem.relationLitigantId = '';
                                        this.addFormItem.agentId = "";
                                        this.addFormItem.agentId1 = "";
                                        this.addFormItem.lawerType1 = '';
                                        this.addFormItem.lawerName1 = '';
                                        this.addFormItem.lawermobile1 = '';
                                        this.addFormItem.lawIdentiCard1 = '';
                                        this.addFormItem.lawerNum1 = '';
                                        this.addFormItem.lawIdentiCard1 = '';
                                        this.showAdd = false;
                                        this.$emit('refreshList');
                                    } else {
                                        this.changeLoading();
                                        this.$Message.error(res.data.message);
                                    }
                                })
                                .catch(() => {
                                    this.$Message.error('服务器出错，请稍后再试');
                                    this.changeLoading();
                                });
                        } else {
                            this.$Modal.confirm({
                                title: '',
                                content: '<p>三网认证接口调用失败</p>',
                                okText: '继续提交',
                                cancelText: '取消提交',
                                onOk: () => {
                                    addLitigant(
                                        this.lowCaseId,
                                        this.addFormItem.litigantName,
                                        this.addFormItem.identityCard,
                                        litigantSex,
                                        litigantType,
                                        this.addFormItem.employer,
                                        litigantPhone,
                                        this.addFormItem.litigantTelPhone,
                                        this.addFormItem.email,
                                        this.addFormItem.nativePlace,
                                        this.addFormItem.address,
                                        this.addFormItem.nation,
                                        birthday,
                                        litigaStatus,
                                        this.addFormItem.legalManName,
                                        this.addFormItem.legalManPhone,
                                        this.addFormItem.legalManId,
                                        this.addFormItem.sendAddress,
                                        this.addFormItem.agentId,
                                        this.addFormItem.lawerType,
                                        this.addFormItem.lawerName,
                                        this.addFormItem.lawermobile,
                                        this.addFormItem.lawIdentiCard,
                                        this.addFormItem.lawerNum,
                                        this.addFormItem.relationType,
                                        this.addFormItem.relationLitigantId,
                                        this.addFormItem.agentId,
                                        this.addFormItem.lawerType1,
                                        this.addFormItem.lawerName1,
                                        this.addFormItem.lawermobile1,
                                        this.addFormItem.lawIdentiCard1,
                                        this.addFormItem.lawerNum1
                                    )
                                        .then(res => {
                                            if (res.data.state === 100) {
                                                this.$Message.success(res.data.message);
                                                this.addFormItem.litigantName = '';
                                                this.addFormItem.litigantSex = '';
                                                this.addFormItem.litigantType = '自然人';
                                                this.addFormItem.identityCard = '';
                                                this.addFormItem.employer = '';
                                                this.addFormItem.nation = '';
                                                this.addFormItem.litigantPhone = '';
                                                this.addFormItem.litigantTelPhone = '';
                                                this.addFormItem.birthday = '';
                                                this.addFormItem.email = '';
                                                this.addFormItem.nativePlace = '';
                                                this.addFormItem.address = '';
                                                this.addFormItem.legalManName = '';
                                                this.addFormItem.legalManPhone = '';
                                                this.addFormItem.legalManId = '';
                                                this.addFormItem.sendAddress = '';
                                                this.addFormItem.lawerType = '';
                                                this.addFormItem.lawerName = '';
                                                this.addFormItem.lawermobile = '';
                                                this.addFormItem.lawIdentiCard = '';
                                                this.addFormItem.lawerNum = '';
                                                this.addFormItem.lawFirm = '';
                                                this.addFormItem.relationType = '';
                                                this.addFormItem.relationLitigantId = '';
                                                this.addFormItem.agentId = "";
                                                this.addFormItem.agentId1 = "";
                                                this.addFormItem.lawerType1 = '';
                                                this.addFormItem.lawerName1 = '';
                                                this.addFormItem.lawermobile1 = '';
                                                this.addFormItem.lawIdentiCard1 = '';
                                                this.addFormItem.lawerNum1 = '';
                                                this.addFormItem.lawIdentiCard1 = '';
                                                this.showAdd = false;
                                                this.$emit('refreshList');
                                            } else {
                                                this.changeLoading();
                                                this.$Message.error(res.data.message);
                                            }
                                        })
                                        .catch(() => {
                                            this.$Message.error('服务器出错，请稍后再试');
                                            this.changeLoading();
                                        });
                                },
                                onCancel: () => {
                                    this.changeLoading();
                                }
                            });
                        }
                    } else {
                        this.$Modal.confirm({
                            title: '',
                            content: '<p>三网认证不成功</p>',
                            okText: '继续提交',
                            cancelText: '取消提交',
                            onOk: () => {
                                addLitigant(
                                    this.lowCaseId,
                                    this.addFormItem.litigantName,
                                    this.addFormItem.identityCard,
                                    litigantSex,
                                    litigantType,
                                    this.addFormItem.employer,
                                    litigantPhone,
                                    this.addFormItem.litigantTelPhone,
                                    this.addFormItem.email,
                                    this.addFormItem.nativePlace,
                                    this.addFormItem.address,
                                    this.addFormItem.nation,
                                    birthday,
                                    litigaStatus,
                                    this.addFormItem.legalManName,
                                    this.addFormItem.legalManPhone,
                                    this.addFormItem.legalManId,
                                    this.addFormItem.sendAddress,
                                    this.addFormItem.agentId,
                                    this.addFormItem.lawerType,
                                    this.addFormItem.lawerName,
                                    this.addFormItem.lawermobile,
                                    this.addFormItem.lawIdentiCard,
                                    this.addFormItem.lawerNum,
                                    this.addFormItem.relationType,
                                    this.addFormItem.relationLitigantId,
                                    this.addFormItem.agentId,
                                    this.addFormItem.lawerType1,
                                    this.addFormItem.lawerName1,
                                    this.addFormItem.lawermobile1,
                                    this.addFormItem.lawIdentiCard1,
                                    this.addFormItem.lawerNum1
                                )
                                    .then(res => {
                                        if (res.data.state === 100) {
                                            this.$Message.success(res.data.message);
                                            this.addFormItem.litigantName = '';
                                            this.addFormItem.litigantSex = '';
                                            this.addFormItem.litigantType = '自然人';
                                            this.addFormItem.identityCard = '';
                                            this.addFormItem.employer = '';
                                            this.addFormItem.nation = '';
                                            this.addFormItem.litigantPhone = '';
                                            this.addFormItem.litigantTelPhone = '';
                                            this.addFormItem.birthday = '';
                                            this.addFormItem.email = '';
                                            this.addFormItem.nativePlace = '';
                                            this.addFormItem.address = '';
                                            this.addFormItem.legalManName = '';
                                            this.addFormItem.legalManPhone = '';
                                            this.addFormItem.legalManId = '';
                                            this.addFormItem.sendAddress = '';
                                            this.addFormItem.lawerType = '';
                                            this.addFormItem.lawerName = '';
                                            this.addFormItem.lawermobile = '';
                                            this.addFormItem.lawIdentiCard = '';
                                            this.addFormItem.lawerNum = '';
                                            this.addFormItem.lawFirm = '';
                                            this.addFormItem.relationType = '';
                                            this.addFormItem.relationLitigantId = '';
                                            this.addFormItem.agentId = "";
                                            this.addFormItem.agentId1 = "";
                                            this.addFormItem.lawerType1 = '';
                                            this.addFormItem.lawerName1 = '';
                                            this.addFormItem.lawermobile1 = '';
                                            this.addFormItem.lawIdentiCard1 = '';
                                            this.addFormItem.lawerNum1 = '';
                                            this.addFormItem.lawIdentiCard1 = '';
                                            this.showAdd = false;
                                            this.$emit('refreshList');
                                        } else {
                                            this.changeLoading();
                                            this.$Message.error(res.data.message);
                                        }
                                    })
                                    .catch(() => {
                                        this.$Message.error('服务器出错，请稍后再试');
                                        this.changeLoading();
                                    });
                            },
                            onCancel: () => {
                                this.changeLoading();
                            }
                        });
                    }
                });
            }
        },
        deleteLitigant () {
            removeLitigant(this.deleteId).then(res => {
                if (res.data.state === 100) {
                    this.$Message.success(res.data.message);
                    this.deleteModal = false;
                    this.$emit('refreshList');
                } else {
                    this.$Message.err(res.data.message);
                    this.deleteModal = false;
                }
            });
        },
        CaseInfoSaved () {
            if (this.changeCaseInfo === true) {
                this.$Modal.warning({
                    title: '警告',
                    content: '请先保存案件信息，再进行下一步'
                });
                return false;
            } else {
                return true;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.ivu-card {
  margin-bottom: 20px;
  .ivu-card-head {
    border-top: 2px solid #40a9ff;
    p {
      color: #fff;
    }
    .right-btn {
      position: absolute;
      right: 10px;
      cursor: pointer;
      color: #fff;
    }
  }
}
[v-cloak] {
  display: none;
}
</style>
