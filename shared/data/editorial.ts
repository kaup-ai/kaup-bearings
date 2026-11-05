export interface EditorialEntry {
  slug: string
  title: { en: string; zh: string }
  summary: { en: string; zh: string }
  date: string
  location?: { en: string; zh: string }
  image: string
  demo: true
}

export const news: EditorialEntry[] = [
  {
    slug: 'bearing-mounting-quality', title: { en: 'Why controlled bearing mounting matters', zh: '为什么轴承可控安装至关重要' },
    summary: { en: 'A brief demo guide to press-fit force, induction heating and contamination control.', zh: '关于压装力、感应加热与污染控制的演示指南。' },
    date: '2026-10-28', image: '/images/scenes/assembly.webp', demo: true,
  },
  {
    slug: 'spherical-roller-selection', title: { en: 'Spherical roller bearing selection for mining drives', zh: '矿山传动中的调心滚子轴承选型' },
    summary: { en: 'How misalignment, contamination and load spectrum affect service life.', zh: '不同心、污染与载荷谱如何影响使用寿命。' },
    date: '2026-10-18', image: '/images/scenes/wind.webp', demo: true,
  },
  {
    slug: 'ceramic-bearing-electrical-damage', title: { en: 'Hybrid ceramic bearings and electrical damage', zh: '混合陶瓷轴承与电蚀风险' },
    summary: { en: 'The system boundary still matters even when ceramic rolling elements are used.', zh: '采用陶瓷滚动体后，系统绝缘边界仍然同样重要。' },
    date: '2026-10-07', image: '/images/scenes/inspection.webp', demo: true,
  },
  {
    slug: 'lubrication-audit', title: { en: 'Five checks before changing a bearing grease', zh: '更换轴承润滑脂前的五项检查' },
    summary: { en: 'Base oil, thickener compatibility, speed factor and relubrication access.', zh: '基础油、稠化剂相容性、速度因子与补脂可达性。' },
    date: '2026-09-26', image: '/images/scenes/inspection.webp', demo: true,
  },
]

export const exhibitions: EditorialEntry[] = [
  {
    slug: 'northeast-industrial-motion', title: { en: 'Northeast Industrial Motion Expo', zh: '东北工业传动展' },
    summary: { en: 'Demo exhibition for bearings, power transmission and maintenance equipment.', zh: '轴承、动力传动与维护设备演示展会。' },
    date: '2027-04-16', location: { en: 'Shenyang, China', zh: '中国沈阳' }, image: '/images/scenes/exhibition.webp', demo: true,
  },
  {
    slug: 'asia-machining-connect', title: { en: 'Asia Machining Connect', zh: '亚洲加工制造对接会' },
    summary: { en: 'Demo precision-manufacturing sourcing and engineering exchange.', zh: '精密制造采购与工程交流演示活动。' },
    date: '2027-06-08', location: { en: 'Dalian, China', zh: '中国大连' }, image: '/images/scenes/assembly.webp', demo: true,
  },
  {
    slug: 'global-reliability-summit', title: { en: 'Global Reliability Summit', zh: '全球设备可靠性峰会' },
    summary: { en: 'Demo event covering condition monitoring and maintenance planning.', zh: '设备状态监测与维护计划演示活动。' },
    date: '2027-09-22', location: { en: 'Singapore', zh: '新加坡' }, image: '/images/scenes/inspection.webp', demo: true,
  },
  {
    slug: 'wind-service-forum', title: { en: 'Wind Service Technology Forum', zh: '风电运维技术论坛' },
    summary: { en: 'Demo technical forum on main bearings, lubrication and service logistics.', zh: '主轴承、润滑与运维物流的演示技术论坛。' },
    date: '2027-11-05', location: { en: 'Hohhot, China', zh: '中国呼和浩特' }, image: '/images/scenes/wind.webp', demo: true,
  },
]

export const applications = [
  { slug: 'electric-motor', name: { en: 'Electric motors', zh: '工业电机' }, icon: 'i-lucide-zap', image: '/images/applications/electric-motor.webp' },
  { slug: 'gearbox', name: { en: 'Gearboxes', zh: '工业齿轮箱' }, icon: 'i-lucide-cog', image: '/images/applications/gearbox.webp' },
  { slug: 'mining', name: { en: 'Mining', zh: '矿山设备' }, icon: 'i-lucide-mountain', image: '/images/applications/mining.webp' },
  { slug: 'machine-tool', name: { en: 'Machine tools', zh: '机床主轴' }, icon: 'i-lucide-drill', image: '/images/applications/machine-tool.webp' },
  { slug: 'conveyor', name: { en: 'Conveying', zh: '输送设备' }, icon: 'i-lucide-move-horizontal', image: '/images/applications/conveyor.webp' },
  { slug: 'wind', name: { en: 'Wind energy', zh: '风电能源' }, icon: 'i-lucide-wind', image: '/images/applications/wind.webp' },
  { slug: 'pump', name: { en: 'Pumps', zh: '泵类设备' }, icon: 'i-lucide-gauge', image: '/images/applications/pump.webp' },
]
