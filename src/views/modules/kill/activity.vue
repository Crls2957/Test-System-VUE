<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.name" placeholder="秒杀项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('kill:seckill:save')"  @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('kill:seckill:delete')"  @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item> -->
      <h3 style="color:red">秒杀活动</h3>
    </el-form>
    <el-table
      :row-style="{height:'85px'}"
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
       <template slot="empty">
           <h3 style="color:red">秒杀活动未开始或已结束</h3>
       </template>
      <el-table-column
        prop="seckillId"
        header-align="center"
        align="center"
        label="ID"
        v-if="false">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="秒杀测试项名称">
      </el-table-column>
      <el-table-column
        prop="number"
        header-align="center"
        align="center"
        label="秒杀测试项数量">
      </el-table-column>
      <el-table-column
        prop="startTime"
        header-align="center"
        align="center"
        label="秒杀开启时间"
        v-if="false">
      </el-table-column>
      <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        label="秒杀结束时间">
      </el-table-column>
      <el-table-column
        prop="seckillStatus"
        header-align="center"
        align="center"
        label="状态"
        v-if="false">
        <template slot-scope="scope">{{scope.row.seckillStatus==0?'未执行':'已执行'}}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addHandle(scope.row.seckillId)" v-if="scope.row.number>0?true:false">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination> -->
    
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>

    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.name" placeholder="秒杀项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('kill:seckill:save')"  @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('kill:seckill:delete')"  @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item> -->
      <h3 style="color:red">秒杀计数</h3>
    </el-form>
    <el-table
      :row-style="{height:'85px'}"
      :data="resultList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column
        prop="seckillId"
        header-align="center"
        align="center"
        label="ID"
        v-if="false">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="秒杀测试项名称">
      </el-table-column>
      <el-table-column
        prop="number"
        header-align="center"
        align="center"
        label="秒杀添加数量">
      </el-table-column>
      <!-- <el-table-column
        prop="startTime"
        header-align="center"
        align="center"
        label="秒杀开启时间"
        v-if="false">
      </el-table-column> -->
      <!-- <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        label="秒杀结束时间">
      </el-table-column> -->
      <!-- <el-table-column
        prop="seckillStatus"
        header-align="center"
        align="center"
        label="状态"
        v-if="false">
        <template slot-scope="scope">{{scope.row.seckillStatus==0?'未执行':'已执行'}}</template>
      </el-table-column> -->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="finishHandle(scope.row.seckillId)" v-if="scope.row.number>0?true:false">结束</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!-- <el-form-item>
        <el-input v-model="dataForm.name" placeholder="秒杀项目名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('kill:seckill:save')"  @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('kill:seckill:delete')"  @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item> -->
      <h3 style="color:red">秒杀结果</h3>
    </el-form>
    <el-table
      :row-style="{height:'85px'}"
      :data="resultList1"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!-- <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="ID"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="秒杀测试项名称">
      </el-table-column>
      <el-table-column
        prop="number"
        header-align="center"
        align="center"
        label="秒杀添加数量">
      </el-table-column>
      <!-- <el-table-column
        prop="startTime"
        header-align="center"
        align="center"
        label="秒杀开启时间"
        v-if="false">
      </el-table-column> -->
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <!-- <el-table-column
        prop="seckillStatus"
        header-align="center"
        align="center"
        label="状态"
        v-if="false">
        <template slot-scope="scope">{{scope.row.seckillStatus==0?'未执行':'已执行'}}</template>
      </el-table-column> -->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
  import AddOrUpdate from './killseckill-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          name: ''
        },
        dataList: [],
        resultList: [],
        resultList1: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
      this.getResultList()
      this.getResultList１()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/kill/activity/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'name': this.dataForm.name
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.list
            // this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 获取数据列表
      getResultList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/kill/activity/resultList'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'name': this.dataForm.name
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.resultList = data.list
            // this.totalPage = data.page.totalCount
          } else {
            this.resultList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 获取数据列表
      getResultList１ () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/kill/result/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.resultList1 = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.resultList1 = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getResultList１()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getResultList１()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.seckillId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/kill/result/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.getResultList１()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 秒杀
      addHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.seckillId
        })
        this.$http({
          url: this.$http.adornUrl('/kill/activity/add'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 500,
              onClose: () => {
                this.getDataList()
                this.getResultList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 结束
      finishHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.seckillId
        })
        this.$http({
          url: this.$http.adornUrl('/kill/result/finish'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getResultList()
                this.getResultList１()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
</script>
