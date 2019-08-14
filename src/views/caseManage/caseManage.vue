<template>
    <div>
        <Card v-show="cardState" style="margin-bottom: 16px">
            <p slot="title">
                {{ op[cardState] }}案件分配
            </p>
            <div class="maininfo-warp">
                <Row>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        工号
                        <Tooltip v-show="cardState > 1 && !info.jobNumber" content="此项必填">
                            <Icon type="android-alert" style="color: #ed3f14"></Icon>
                        </Tooltip>
                    </Col>
                    <Col v-show="cardState > 1" span="9" class="maininfo-col">
                        <Input v-model="info.jobNumber" style="width: 100%"></Input>
                    </Col>
                    <Col v-show="cardState <= 1" span="9" class="maininfo-col">
                        {{ info.jobNumber }}
                    </Col>

                    <Col span="3" class="maininfo-col maininfo-col-label">
                        姓名
                        <Tooltip v-show="cardState > 1 && !info.name" content="此项必填">
                            <Icon type="android-alert" style="color: #ed3f14"></Icon>
                        </Tooltip>
                    </Col>
                    <Col v-show="cardState > 1" span="9" class="maininfo-col">
                        <Input v-model="info.name" style="width: 100%"></Input>
                    </Col>
                    <Col v-show="cardState <= 1" span="9" class="maininfo-col">
                        {{ info.name }}
                    </Col>

                    <Col span="3" class="maininfo-col maininfo-col-label">
                        性别
                    </Col>
                    <Col v-show="cardState > 1" span="9" class="maininfo-col">
                        <Select v-model="info.sex" style="width:100%">
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    </Col>
                    <Col v-show="cardState <= 1" span="9" class="maininfo-col">
                        {{ info.sex }}
                    </Col>

                    <Col span="3" class="maininfo-col maininfo-col-label">
                        身份证号
                        <Tooltip v-show="cardState > 1 && !info.identity" content="此项必填">
                            <Icon type="android-alert" style="color: #ed3f14"></Icon>
                        </Tooltip>
                    </Col>
                    <Col v-show="cardState === 2" span="9" class="maininfo-col">
                        <Input v-model="info.identity" style="width: 100%"></Input>
                    </Col>
                    <Col v-show="cardState !== 2" span="9" class="maininfo-col">
                        {{ info.identity }}
                    </Col>
                    <Col span="3" class="maininfo-col maininfo-col-label">
                        手机号码
                    </Col>
                    <Col v-show="cardState > 1" span="9" class="maininfo-col">
                        <Input v-model="info.phone" style="width: 100%"></Input>
                    </Col>
                    <Col v-show="cardState <= 1" span="9" class="maininfo-col">
                        {{ info.phone }}
                    </Col>
                    
                </Row>
            </div>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Button v-show="cardState === 1" @click="cardState = 3" type="warning" size="large">修改</Button>
                    <Button v-show="cardState > 1" @click="save" :loading="saved" type="success" size="large">保存</Button>
                    <Button @click="cardState = 0" type="text" size="large">取消</Button>
                </div>
            </div>
        </Card>
        <Card>
            <Row>
                <Col span="3">
                    <span style="color:#464c5b;font-size:16px;font-weight:700">案件管理</span>
                </Col>
                <Col span="21">
                    <Button v-show="!show1" @click.native="show1 = true" style="margin-left: 10px" type="ghost">
                        查询展开
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <Form :model="formItem" inline :label-width="100" v-show="show1">
                        <FormItem label="案号：">
                            <Input style="width: 200px" v-model="formItem.caseNo"/>
                        </FormItem>
                        <FormItem label="法官姓名：">
                            <Input style="width: 200px" v-model="formItem.judgeName"/>
                        </FormItem>
                        <FormItem label="案由：">
                            <Input style="width: 200px" v-model="formItem.brief"/>
                        </FormItem>
                        <FormItem label="书记员姓名：">
                            <Input style="width: 200px" v-model="formItem.clerkName"/>
                        </FormItem>
                        <FormItem label="送达人员姓名：">
                            <Input style="width: 200px" v-model="formItem.servicePersonnelName"/>
                        </FormItem>
                        <div style="display: inline-block;padding-right: 30px;float: right;">
                            <Button @click="getList(1)" type="ghost">查询</Button>
                            <Button @click="clean" style="margin-left: 10px" type="ghost">清空</Button>
                            <Button @click.native="show1 = false" style="margin-left: 10px" type="ghost">关闭</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <ButtonGroup style="margin-top: 10px; margin-bottom: 10px">
                <Button @click="distributive" size="large" type="primary">分配送达人员</Button>
            </ButtonGroup>
            <Table stripe ref="judgeTable" :columns="judgecol" :data="judgedata" @on-selection-change="tableCheck"></Table>
            <Spin size="large" fix v-if="spinShow"></Spin>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="totalPage" :page-size="1" :current="pageNumber" @on-change="changePage"></Page>
                </div>
            </div>
        </Card>

        <Modal
        v-model="detailModal"
        :loading="loading"
        width="630"
        cancel-text=""
        ok-text="确认分配"
        @on-ok="onOkF"
        title="案件送达人员分配">
        <Form class="search-form"  :label-width="100" inline style="border-bottom:1px solid #e9eaec;margin-bottom: 12px;">
          <FormItem label="送达人员姓名">
            <Input  placeholder="送达人员姓名" style="width: 150px" v-model="searchConnectData.name"/>
            <Button type="primary" @click="searchServerviceList">查询</Button>
          </FormItem>
        </Form>
            <Table height="250" @on-current-change="selectOne" highlight-row :columns="detailColumns" :data="detailData" style="margin-top: 10px;height:250px"></Table>
            <div style="margin: 5px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="totalPage2" :page-size="1" :current="pageNumber2" @on-change="changePage2"></Page>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import { list, add, update, del, serviceList, distri } from '../../api/caseManage.js';
import { courtList } from '../../api/global.js';
import { formatDate } from '../../libs/date.js';
export default {
    data () {
    // var nowD = new Date();
        return {
            cardState: 0,
            op: ['', '查看', '添加', '修改'],
            show1: false,
            saved: false,
            del_loading: false,
            modal2: false,
            spinShow: false,
            totalPage2: 0,
            totalPage: 0,
            searchConnectData: {
                jobNumber: '',
                name: '',
                phone: '',
                identity: '',
                sex: ''
            },
            pageNumber: 0,
            pageNumber2: 0,
            checkIds: [],
            checkNames: [],
            loading: false,
            detailModal: false,
            departmentList: [],
            detailData: [],
            selectId: '',
            formItem: {
                id: '',
                caseNo: '',
                judgeName: '',
                brief: '',
                clerkName: '',
                servicePersonnelName: ''
            },
            detailColumns: [
                {
                    title: '工号',
                    key: 'jobNumber',
                    align: 'center',
                    width: 200
                },
                {
                    title: '姓名',
                    key: 'name',
                    align: 'center',
                    width: 200
                },
                {
                    title: '手机号码',
                    key: 'phone',
                    align: 'center',
                    width: 193
                }
            ],
            judgecol: [
                {
                    type: 'selection',
                    width: 40,
                    align: 'center'
                },
                {
                    title: '案号',
                    key: 'caseNo',
                    align: 'center',
                    width: 220
                },
                {
                    title: '法官姓名',
                    key: 'judgeName',
                    align: 'center',
                    ellipsis: true
                },
                {
                    title: '案由',
                    key: 'brief',
                    align: 'center'
                },
                {
                    title: '书记员姓名',
                    key: 'clerkName',
                    align: 'center'
                },
                {
                    title: '送达人员姓名',
                    key: 'servicePersonnelName',
                    align: 'center'
                }
            ],
            lawCaseIds: [],
            judgedata: [],
            onSelectData: [],
            info: {
                jobNumber: '',
                name: '',
                phone: '',
                identity: '',
                sex: ''
            }
        };
    },
    mounted () {
        this.getList(1);
    // this.getCourtList();
    },
    methods: {
        getCourtList () {
            courtList()
                .then(res => {
                    if (res.data.state == 100) {
                        res.data.result.map(item => {
                            this.departmentList.push({ name: item.name, id: item.id });
                        });
                    }
                })
                .catch(err => {});
        },
        selectOne (e) {
            this.selectId = e.id;
            console.log(this.selectId)
        },
        getList (page) {
            var that = this;
            var params = {
                caseNo: this.formItem.caseNo,
                judgeName: this.formItem.judgeName,
                brief: this.formItem.brief,
                clerkName: this.formItem.clerkName,
                servicePersonnelName: this.formItem.servicePersonnelName
            };
            params.pageNumber = page;
            params.pageSize = 10;
            this.judgedata = [];
            list(params)
                .then(res => {
                    var data = res.data;
                    if (data.state === 1) {
                        res.data.result.content.map(item => {
                            let objectData = {
                                id: item.id,
                                caseNo: item.caseNo,
                                judgeName: item.judge.name,
                                brief: item.brief.name,
                                clerkName: item.clerk.name,
                                servicePersonnelName: item.servicePersonnel == null ? '暂无' : item.servicePersonnel.name
                            };
                            this.judgedata.push(objectData);
                        });
                        console.log(this.judgedata)
                        that.pageNumber = data.result.pageNumber;
                        that.totalPage = data.result.totalPages;
                    } else {
                        that.$Message.info(data.message);
                    }
                })
                .catch(() => {
                    that.$Message.error('网络错误, 查询法官列表失败');
                });
        },
        addJudge () {
            this.$refs.judgeTable.clearCurrentRow();
        },
        searchServerviceList () {
            var that = this;
            var params = this.searchConnectData;
            params.pageNumber = 1;
            params.pageSize = 10;
            serviceList(params).then(res => {
                var data = res.data;
                if (data.state === 100) {
                    that.detailData = data.result.content;
                    that.pageNumber2 = data.result.pageNumber;
                    that.totalPage2 = data.result.totalPage;
                } else {
                    that.$Message.info(data.message);
                }
            })
        },
        distributive () {
            if (this.onSelectData == '') {
                this.$Message.info('请选择需要分配的案件');
                return false;
            }
            this.selectId = '';
            var that = this;
            this.detailModal = true;
            this.searchConnectData.name = '';
            var params = {
                jobNumber: '',
                name: '',
                phone: '',
                identity: '',
                sex: ''
            };
            params.pageNumber = 1;
            params.pageSize = 10;
            serviceList(params).then(res => {
                var data = res.data;
                if (data.state === 100) {
                    that.detailData = data.result.content;
                    that.pageNumber2 = data.result.pageNumber;
                    that.totalPage2 = data.result.totalPage;
                } else {
                    that.$Message.info(data.message);
                }
            })
        },
        onOkF () {
            let lawCaseIds = '';
            this.loading = true;
            this.onSelectData.map((item, index) => {
                if (index == this.onSelectData.length - 1) {
                    lawCaseIds += item.id;
                } else {
                    lawCaseIds += item.id + ',';
                }
            });
            distri(this.selectId, lawCaseIds).then(res => {
                if (res.data.state == 100) {
                    this.$Message.success(res.data.message);
                    this.loading = false;
                    this.onSelectData == '';
                    this.getList(1);
                } else {
                    this.$Message.info(res.data.message);
                }
            })
        },
        save () {
            var that = this;
            that.saved = true;
            this.departmentList.map(item => {
                if (item.name == this.info.departmentName) {
                    this.info.departmentId = item.id;
                }
            });
            var params = {
                jobNumber: this.info.jobNumber,
                name: this.info.name,
                phone: this.info.phone,
                identity: this.info.identity,
                sex: this.info.sex
            };

            if (this.cardState === 2) {
                params.identity = this.info.identity; // 添加信息要传身份证号
                add(params)
                    .then(res => {
                        var data = res.data;
                        that.$Message.info(data.message);
                        if (data.state === 100) {
                            that.getList(that.pageNumber);
                            this.info.jobNumber = '';
                            this.info.name = '';
                            this.info.phone = '';
                            this.info.identity = '';
                            this.info.sex = ''
                        }
                        that.saved = false;
                    })
                    .catch(() => {
                        that.$Message.error('网络错误');
                        that.saved = false;
                    });
            } else {
                update(params)
                    .then(res => {
                        var data = res.data;
                        that.$Message.info(data.message);
                        if (data.state === 100) {
                            that.getList(that.pageNumber);
                            this.info.jobNumber = '';
                            this.info.name = '';
                            this.info.phone = '';
                            this.info.identity = '';
                            this.info.sex = ''
                            this.cardState = 0;
                        }
                        that.saved = false;
                    })
                    .catch(() => {
                        that.$Message.error('网络错误');
                        that.saved = false;
                    });
            }
        },
        delJudge () {
            this.spinShow = true;
            this.modal2 = false;
            var that = this;
            del(that.checkIds)
                .then(res => {
                    that.spinShow = false;
                    var data = res.data;
                    that.$Message.info(data.message);
                    if (data.state === 100) {
                        that.getList(that.pageNumber);
                    }
                })
                .catch(() => {
                    that.spinShow = false;
                    that.$Message.error('网络错误');
                });
        },
        tableCheck (selection) {
            this.onSelectData = selection;
            console.log(this.onSelectData)
        },
        changePage (p) {
            this.getList(p);
        },
        changePage2 (p) {

        },
        clean () {
            this.formItem = {
                clerkNo: '',
                name: '',
                phone: '',
                department: '',
                workYear: '',
                createDate: ''
            };
        },
        toAdd () {
            this.cardState = 2;
            this.info = {
                jobNumber: '',
                name: '',
                phone: '',
                identity: '',
                sex: ''
            };
        },
        birthdayChange (d) {
            this.info.birthdayD = d;
        },
        createDateChange (d) {
            this.info.createDateD = d;
        },
        exportExcel () {},
        formatDate (d, fmt) {
            return formatDate(d, fmt);
        }
    }
};
</script>
