class ExpressModel {
  constructor() {
    this.comMapping = {
      'anxindakuaixi': '安信达',
      'baifudongfang': '百福东方',
      'bangsongwuliu': '邦送物流',
      'coe': '中国东方',
      'chuanxiwuliu': '传喜物流',
      'datianwuliu': '大田物流',
      'debangwuliu': '德邦物流',
      'dpex': 'DPEX',
      'dhl': 'DHL',
      'dhlen': 'DHL',
      'dhlde': 'DHL',
      'dsukuaidi': 'D速物流',
      'disifang': '递四方',
      'ems': 'EMS',
      'emsen': 'EMS',
      'emsguoji': 'EMS',
      'emsinten': 'EMS',
      'fedex': 'Fedex',
      'fedexcn': 'Fedex',
      'fedexus': 'Fedex',
      'feikangda': '飞康达物流',
      'feikuaida': '飞快达',
      'fengxingtianxia': '风行天下',
      'feibaokuaidi': '飞豹快递',
      'ganzhongnengda': '港中能达',
      'guotongkuaidi': '国通快递',
      'guangdongyouzhengwuliu': '广东邮政',
      'gls': 'GLS',
      'gongsuda': '共速达',
      'huitongkuaidi': '汇通快运',
      'huiqiangkuaidi': '汇强快递',
      'tiandihuayu': '华宇物流',
      'hengluwuliu': '恒路物流',
      'huaxialongwuliu': '华夏龙',
      'haiwaihuanqiu': '海外环球',
      'hebeijianhua': '河北建华',
      'haimengsudi': '海盟速递',
      'huaqikuaiyun': '华企快运',
      'haihongwangsong': '山东海红',
      'jiajiwuliu': '佳吉物流',
      'jiayiwuliu': '佳怡物流',
      'jiayunmeiwuliu': '加运美',
      'jinguangsudikuaijian': '京广速递',
      'jixianda': '急先达',
      'jinyuekuaidi': '晋越快递',
      'jietekuaidi': '捷特快递',
      'jindawuliu': '金大物流',
      'jialidatong': '嘉里大通',
      'kuaijiesudi': '快捷速递',
      'kangliwuliu': '康力物流',
      'kuayue': '跨越物流',
      'lianhaowuliu': '联昊通',
      'longbanwuliu': '龙邦物流',
      'lanbiaokuaidi': '蓝镖快递',
      'lejiedi': '乐捷递',
      'lianbangkuaidi': '联邦快递',
      'lianbangkuaidien': '联邦快递',
      'lijisong': '立即送',
      'longlangkuaidi': '隆浪快递',
      'menduimen': '门对门',
      'meiguokuaidi': '美国快递',
      'mingliangwuliu': '明亮物流',
      'quanchenkuaidi': '全晨快递',
      'quanjitong': '全际通',
      'quanritongkuaidi': '全日通',
      'quanyikuaidi': '全一快递',
      'quanfengkuaidi': '全峰快递',
      'sevendays': '七天连锁',
      'rufengda': '如风达快递',
      'shentong': '申通快递',
      'shunfeng': '顺丰速运',
      'shunfengen': '顺丰速运',
      'santaisudi': '三态速递',
      'shenghuiwuliu': '盛辉物流',
      'suer': '速尔物流',
      'shengfengwuliu': '盛丰物流',
      'shangda': '上大物流',
      'saiaodi': '赛澳递',
      'sxhongmajia': '山西红马甲',
      'shenganwuliu': '圣安物流',
      'suijiawuliu': '穗佳物流',
      'tiantian': '天天快递',
      'tonghetianxia': '通和天下',
      'ups': 'UPS',
      'upsen': 'UPS',
      'youshuwuliu': '优速物流',
      'usps': '美国邮政USPS',
      'wanjiawuliu': '万家物流',
      'wanxiangwuliu': '万象物流',
      'weitepai': '微特派',
      'xinbangwuliu': '新邦物流',
      'xinfengwuliu': '信丰物流',
      'neweggozzo': '新蛋奥硕物流',
      'hkpost': '香港邮政',
      'yuantong': '圆通速递',
      'yunda': '韵达快运',
      'yuntongkuaidi': '运通快递',
      'youzhengguonei': '邮政国内',
      'youzhengguoji': '邮政国际',
      'yuanchengwuliu': '远成物流',
      'yafengsudi': '亚风速递',
      'yibangwuliu': '一邦速递',
      'yuanweifeng': '源伟丰快递',
      'yuanzhijiecheng': '元智捷诚',
      'yuefengwuliu': '越丰物流',
      'yuananda': '源安达',
      'yuanfeihangwuliu': '原飞航',
      'yinjiesudi': '银捷速递',
      'yitongfeihong': '一统飞鸿',
      'zhongtong': '中通速递',
      'zhaijisong': '宅急送',
      'zhongyouwuliu': '中邮物流',
      'zhongxinda': '忠信达',
      'zhongsukuaidi': '中速快件',
      'zhimakaimen': '芝麻开门',
      'zhengzhoujianhua': '郑州建华',
      'zhongtianwanyun': '中天万运'
    };
  }

  parse(data) {
    const {auto} = data;
    const result = [];
    if (auto.length > 5) auto.length = 5;
    auto.forEach(({comCode}) => {
      result.push({
        comCode,
        comName: this.comMapping[comCode] || comCode
      });
    });
    return result;
  }
}

module.exports = ExpressModel;
