<template>
  <div class="mod-home">
    <div class="brand-info">
          <h2 class="brand-info__text">基于Docker的分布式高可用集群</h2>
    </div>
    <div class="brand-info1">
      <p class="brand-info__intro">实现一套囊括数据库，前后端的分布式高可用集群部署平台，本平台主要应用于web部署和运维。时下电商平台的流行，推动C/S架构的web应用的发展，本平台通过针对web应用所面临的高并发以及容灾问题，通过本平台来实现部署项目的高可用。高分布式架构以及集群架构的重中之重是网络通信。他们存在于独立的容器进程之中，更普遍的是存在于不同的机架上。本系统研究的重点不仅是分布式高可用架构的思想，也是对于设想的实现。主要在于中间件的使用，便能够完成整套分布式高可用集群的应用。可体现其抗并发，高可用，容灾的可靠性与稳定性。</p>
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
  .brand-info {
      margin: 100px 100px 50px 100px;
      color: #fff;
    }
    .brand-info1 {
      margin: 50px 100px 0 100px;
      color: #fff;
    }
  .brand-info__text {
      color: #000;
      margin:vertical;
      text-align: center;
      font-size: 48px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-info__intro {
      color: #000;
      margin: 10px 0;
      font-size: 20px;
      line-height: 1.58;
      opacity: .6;
    }
</style>

