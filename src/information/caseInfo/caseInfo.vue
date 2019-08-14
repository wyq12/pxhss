<template>
    <div>
        <Card>
            <Row style="padding-bottom: 10px;">
                <Col span="3">
                    <span style="color:#464c5b;font-size:16px;font-weight:700">案件信息库</span>
                </Col>
                <Col span="21">
                    <Button v-show="!show1" @click.native="show1 = true" style="margin-left: 10px" type="ghost">
                        查询展开
                        <Icon type="arrow-down-b"></Icon>
                    </Button>
                    <Form :model="searchData" inline :label-width="100" v-show="show1">
                        <FormItem label="案号">
                            <Input style="width: 200px" v-model="searchData.caseNo"/>
                        </FormItem>
                        <FormItem label="案由">
                          <Select v-model="searchData.briefName" style="width: 200px;vertical-align:middle;">
                            <Option v-for="item in briefList" :value="item.brief" :key="item.brief">{{ item.brief }}</Option>
                          </Select>
                        </FormItem>
                        <!-- <FormItem label="当事人">
                            <Input style="width: 200px" v-model="searchData.litigantName"/>
                        </FormItem> -->
                        <FormItem label="立案时间">
                            <DatePicker style="width:175px;" type="daterange" placeholder="选择日期" v-model="searchData.date" />
                        </FormItem>
                        <div style="display: inline-block; padding-right: 30px;float: right;">
                            <Button type="ghost" @click="search">查询</Button>
                            <Button style="margin-left: 10px" type="ghost" @click="empty">清空</Button>
                            <Button @click.native="show1 = false" style="margin-left: 10px" type="ghost">关闭</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <Table stripe :columns="dipcol" :data="dipdata"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="totalPage" :page-size="1" :current="searchData.pageNumber" @on-change="changePage"></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
import { queryLawCase } from '@/api/caseInfo.js';
import { formatDate } from '@/libs/date';
import { getBrief } from '@/api/global';
export default {
    data () {
    // var nowD = new Date();
        const idtypes = ['身份证', '军官证', '护照'];
        return {
            show1: false,
            totalPage: 0,
            briefList: [],
            searchData: {
                caseNo: this.$store.getters.caseNo,
                briefName: '',
                date: '',
                filingDate1: '',
                filingDate2: '',
                pageNumber: 1
            },
            dipcol: [
                {
                    title: '案号',
                    key: 'caseNo',
                    align: 'center',
                    width: 180
                },
                {
                    title: '案由',
                    key: 'briefName',
                    align: 'center',
                    width: 120
                },
                {
                    title: '审判员',
                    key: 'judgeName',
                    align: 'center',
                    width: 120
                },
                {
                    title: '书记员',
                    key: 'clerkName',
                    align: 'center',
                    width: 120
                },
                {
                    title: '原告',
                    key: 'plaintiffs',
                    align: 'center',
                    width: 200
                },
                {
                    title: '被告',
                    key: 'defendants',
                    align: 'center',
                    width: 200
                },
                {
                    title: '立案日期',
                    key: 'filingDate',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        return h(
                            'span',
                            {},
                            formatDate(new Date(params.row.filingDate), 'yyyy-MM-dd')
                        );
                    }
                },
                {
                    title: '标的金额',
                    key: 'applyStandard',
                    align: 'center',
                    width: 150,
                    render: (h, params) => {
                        return h('span', {}, params.row.applyStandard + '元');
                    }
                }
            ],
            dipdata: []
        };
    },
    created () {
        this.onRefreshList();
        getBrief()
            .then(res => {
                if (res.data.state === 100) {
                    this.briefList = res.data.result;
                }
            })
            .catch(error => {});
    },
    methods: {
        search () {
            this.onRefreshList();
        },
        empty () {
            this.searchData.caseNo = '';
            this.searchData.briefName = '';
            this.searchData.litigantName = '';
            this.searchData.date = '';
            this.searchData.filingDate1 = '';
            this.searchData.filingDate2 = '';
            this.searchData.pageNumber = 1;
            this.onRefreshList();
        },
        onRefreshList () {
            this.$store.commit('SET_CASENO', this.searchData.caseNo);
            this.searchData.filingDate1 =
        this.searchData.date == '' ? '' : this.searchData.date[0].getTime();
            this.searchData.filingDate2 =
        this.searchData.date == '' ? '' : this.searchData.date[1].getTime();
            queryLawCase(this.searchData).then(res => {
                if ((res.data.state = 100)) {
                    this.dipdata = res.data.result.content;
                    this.totalPage = res.data.result.totalPage;
                    this.searchData.pageNumber = res.data.result.pageNumber;
                }
            });
        },
        changePage (num) {
            this.searchData.pageNumber = num;
            this.onRefreshList();
        }
    }
};
</script>
