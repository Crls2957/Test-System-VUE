<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="秒杀测试项名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="秒杀测试项名称"></el-input>
    </el-form-item>
    <el-form-item label="秒杀测试项数量" prop="number">
      <el-input v-model="dataForm.number" placeholder="秒杀测试项数量"></el-input>
    </el-form-item>
    <!-- <el-form-item label="秒杀开启时间" prop="startTime">
      <el-input v-model="dataForm.startTime" placeholder="秒杀开启时间"></el-input>
    </el-form-item> -->
    <el-form-item label="秒杀结束时间" prop="endTime">
      <el-input v-model="dataForm.endTime" placeholder="秒杀结束时间"></el-input>
    </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          seckillId: 0,
          name: '',
          number: '',
          startTime: '',
          endTime: '',
          createTime: '',
          status: '',
          seckillStatus: ''
        },
        dataRule: {
          name: [
            { required: true, message: '秒杀测试项名称不能为空', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '秒杀测试项数量不能为空', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '秒杀开启时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '秒杀结束时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.seckillId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.seckillId) {
            this.$http({
              url: this.$http.adornUrl(`/kill/seckill/info/${this.dataForm.seckillId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.killSeckill.name
                this.dataForm.number = data.killSeckill.number
                this.dataForm.startTime = data.killSeckill.startTime
                this.dataForm.endTime = data.killSeckill.endTime
                this.dataForm.createTime = data.killSeckill.createTime
                this.dataForm.status = data.killSeckill.status
                this.dataForm.seckillStatus = data.killSeckill.seckillStatus
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/kill/seckill/${!this.dataForm.seckillId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'seckillId': this.dataForm.seckillId || undefined,
                'name': this.dataForm.name,
                'number': this.dataForm.number,
                'startTime': this.dataForm.startTime,
                'endTime': this.dataForm.endTime,
                'createTime': this.dataForm.createTime,
                'status': this.dataForm.status,
                'seckillStatus': this.dataForm.seckillStatus
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
