/**
 * ECharts 示例数据
 */

// 折线图数据
export const lineChartData = {
  categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  values: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1520, 1680, 1890, 2100]
};

// 柱状图数据
export const barChartData = {
  categories: ['产品A', '产品B', '产品C', '产品D', '产品E', '产品F'],
  values: [120, 200, 150, 80, 70, 110]
};

// 饼图数据
export const pieChartData = {
  name: '访问来源',
  items: [
    { value: 1048, name: '搜索引擎' },
    { value: 735, name: '直接访问' },
    { value: 580, name: '邮件营销' },
    { value: 484, name: '联盟广告' },
    { value: 300, name: '视频广告' }
  ]
};

// 散点图数据
export const scatterData = {
  points: [
    [10.0, 8.04],
    [8.07, 6.95],
    [13.0, 7.58],
    [9.05, 8.81],
    [11.0, 8.33],
    [14.0, 7.66],
    [13.4, 6.81],
    [10.0, 6.33],
    [14.0, 8.96],
    [12.5, 6.82],
    [9.15, 7.20],
    [11.5, 7.20],
    [3.03, 4.23],
    [12.2, 7.83],
    [2.02, 4.47],
    [1.05, 3.33],
    [4.05, 4.96],
    [6.03, 7.24],
    [12.0, 6.26],
    [12.0, 8.84],
    [7.08, 5.82],
    [5.02, 5.68]
  ]
};

// 雷达图数据
export const radarData = {
  name: '预算 vs 开销',
  indicators: [
    { name: '销售', max: 6500 },
    { name: '管理', max: 16000 },
    { name: '信息技术', max: 30000 },
    { name: '客服', max: 38000 },
    { name: '研发', max: 52000 },
    { name: '市场', max: 25000 }
  ],
  values: [4200, 3000, 20000, 35000, 50000, 18000]
};

// 销售趋势数据（复杂折线图）
export const salesTrendData = {
  categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [
    {
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320]
    }
  ]
};

// 多维柱状图数据
export const multiBarData = {
  categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
  series: [
    {
      name: '蒸发量',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7]
    },
    {
      name: '降水量',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7]
    },
    {
      name: '平均温度',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2]
    }
  ]
};

// 仪表盘数据（Gauge）
export const gaugeData = {
  value: 70,
  name: '完成率',
  min: 0,
  max: 100,
  splitNumber: 10,
  axisLine: {
    lineStyle: {
      color: [
        [0.3, '#ff4500'],
        [0.7, '#48b'],
        [1, '#228b22']
      ],
      width: 20
    }
  }
};