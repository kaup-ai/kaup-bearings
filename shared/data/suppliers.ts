import type { Supplier } from '../types/catalog.ts'

const t = (en: string, zh: string) => ({ en, zh })

export const suppliers: Supplier[] = [
  {
    slug: 'north-ridge-precision', name: t('North Ridge Precision Bearing Co.', '北岭精工轴承有限公司'), image: '/images/suppliers/north-ridge-precision.webp', country: t('China', '中国'), city: t('Harbin', '哈尔滨'), established: 2008,
    description: t('Demo supplier focused on precision ball and hybrid ceramic bearings for electric motors and machine tools.', '专注电机与机床精密球轴承、陶瓷混合轴承的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['ball-bearings', 'slewing-special-bearings'],
    processes: [t('Turning', '车削'), t('Heat treatment', '热处理'), t('Grinding', '磨削'), t('Superfinishing', '超精加工')],
    qualitySystems: ['ISO 9001'], inspection: [t('Roundness measurement', '圆度测量'), t('Noise and vibration testing', '噪声与振动检测')],
    precisionCapability: t('P6 to P4', 'P6 至 P4'), markets: [t('Europe', '欧洲'), t('Southeast Asia', '东南亚')], leadTime: '25–40 days', verified: true, demo: true,
  },
  {
    slug: 'harbin-axis-works', name: t('Harbin Axis Works', '哈尔滨轴研工场'), image: '/images/suppliers/harbin-axis-works.webp', country: t('China', '中国'), city: t('Harbin', '哈尔滨'), established: 2001,
    description: t('Demo supplier for angular contact and tapered roller bearings with controlled preload and clearance.', '提供可控预紧及游隙的角接触球轴承、圆锥滚子轴承演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['ball-bearings', 'roller-bearings'],
    processes: [t('Forging', '锻造'), t('Hard turning', '硬车削'), t('Grinding', '磨削'), t('Matched assembly', '配对装配')],
    qualitySystems: ['ISO 9001', 'IATF 16949'], inspection: [t('Contact-angle inspection', '接触角检测'), t('Noise testing', '噪声检测')],
    precisionCapability: t('P6 to P5', 'P6 至 P5'), markets: [t('North America', '北美'), t('Europe', '欧洲')], leadTime: '30–45 days', verified: true, demo: true,
  },
  {
    slug: 'anshan-heavy-bearing', name: t('Anshan Heavy Bearing Works', '鞍山重载轴承工场'), image: '/images/suppliers/anshan-heavy-bearing.webp', country: t('China', '中国'), city: t('Anshan', '鞍山'), established: 1997,
    description: t('Demo supplier for heavy-duty spherical roller, plain and slewing bearing assemblies.', '重载调心滚子、关节和回转支承组件的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['roller-bearings', 'plain-bearings', 'slewing-special-bearings'],
    processes: [t('Large-ring machining', '大型套圈加工'), t('Carburising', '渗碳'), t('Grinding', '磨削'), t('Assembly and testing', '装配与检测')],
    qualitySystems: ['ISO 9001'], inspection: [t('Ultrasonic inspection', '超声波检测'), t('Hardness mapping', '硬度分布检测')],
    precisionCapability: t('P0 to P6', 'P0 至 P6'), markets: [t('Australia', '澳大利亚'), t('Middle East', '中东')], leadTime: '45–70 days', verified: true, demo: true,
  },
  {
    slug: 'shenyang-raceway', name: t('Shenyang Raceway Technology', '沈阳滚道科技有限公司'), image: '/images/suppliers/shenyang-raceway.webp', country: t('China', '中国'), city: t('Shenyang', '沈阳'), established: 2012,
    description: t('Demo supplier for thrust bearings, corrosion-resistant bearings and bearing components.', '推力轴承、耐腐蚀轴承及零部件的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['ball-bearings', 'plain-bearings', 'slewing-special-bearings'],
    processes: [t('Precision turning', '精密车削'), t('Heat treatment', '热处理'), t('Lapping', '研磨'), t('Surface treatment', '表面处理')],
    qualitySystems: ['ISO 9001'], inspection: [t('Profile inspection', '轮廓检测'), t('Salt-spray testing', '盐雾试验')],
    precisionCapability: t('P0 to P5', 'P0 至 P5'), markets: [t('Japan', '日本'), t('Europe', '欧洲')], leadTime: '20–35 days', verified: true, demo: true,
  },
  {
    slug: 'liaoning-ringtech', name: t('Liaoning RingTech Manufacturing', '辽宁环承制造有限公司'), image: '/images/suppliers/liaoning-ringtech.webp', country: t('China', '中国'), city: t('Dalian', '大连'), established: 2005,
    description: t('Demo supplier of self-aligning ball bearings and maintenance-free plain bushings.', '调心球轴承与免维护滑动轴套的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['ball-bearings', 'plain-bearings'],
    processes: [t('Pressing', '冲压'), t('Sintering', '烧结'), t('Machining', '机加工'), t('Assembly', '装配')],
    qualitySystems: ['ISO 9001'], inspection: [t('Clearance measurement', '游隙测量'), t('PV limit verification', 'PV 极限验证')],
    precisionCapability: t('P0 to P6', 'P0 至 P6'), markets: [t('Southeast Asia', '东南亚'), t('South America', '南美')], leadTime: '20–35 days', verified: true, demo: true,
  },
  {
    slug: 'changchun-precision-rings', name: t('Changchun Precision Rings', '长春精密套圈有限公司'), image: '/images/suppliers/changchun-precision-rings.webp', country: t('China', '中国'), city: t('Changchun', '长春'), established: 2010,
    description: t('Demo supplier of needle bearings, rod ends and precision rings with batch traceability.', '滚针轴承、杆端关节及可追溯精密套圈的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['roller-bearings', 'plain-bearings', 'linear-motion', 'bearing-components'],
    processes: [t('Ring turning', '套圈车削'), t('Heat treatment', '热处理'), t('Raceway grinding', '滚道磨削'), t('Dimensional sorting', '尺寸分选')],
    qualitySystems: ['ISO 9001'], inspection: [t('CMM inspection', '三坐标检测'), t('Roundness testing', '圆度检测')],
    precisionCapability: t('P6 to P4', 'P6 至 P4'), markets: [t('Europe', '欧洲'), t('North America', '北美')], leadTime: '25–40 days', verified: true, demo: true,
  },
  {
    slug: 'dalian-linear-works', name: t('Dalian Linear Motion Works', '大连直线传动工场'), image: '/images/suppliers/dalian-linear-works.webp', country: t('China', '中国'), city: t('Dalian', '大连'), established: 2014,
    description: t('Demo supplier for linear bushings, guides, ball screw supports and monitoring products.', '直线轴承、导轨、丝杠支撑及监测产品的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['linear-motion', 'maintenance-tools'],
    processes: [t('Rail straightening', '导轨校直'), t('Raceway grinding', '滚道磨削'), t('Preload assembly', '预紧装配'), t('Calibration', '标定')],
    qualitySystems: ['ISO 9001'], inspection: [t('Straightness inspection', '直线度检测'), t('Preload and friction test', '预紧与摩擦测试')],
    precisionCapability: t('P6 to P4', 'P6 至 P4'), markets: [t('Southeast Asia', '东南亚'), t('Europe', '欧洲')], leadTime: '20–30 days', verified: true, demo: true,
  },
  {
    slug: 'haicheng-unit-works', name: t('Haicheng Bearing Unit Works', '海城轴承单元制造厂'), image: '/images/suppliers/haicheng-unit-works.webp', country: t('China', '中国'), city: t('Haicheng', '海城'), established: 2003,
    description: t('Demo supplier for pillow block and flanged bearing units used in conveying equipment.', '输送设备用带座与法兰轴承单元的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['bearing-units'],
    processes: [t('Housing casting', '座体铸造'), t('Machining', '机加工'), t('Insert assembly', '外球面轴承装配'), t('Greasing', '注脂')],
    qualitySystems: ['ISO 9001'], inspection: [t('Shaft-lock torque test', '轴锁紧扭矩检测'), t('Seal leak inspection', '密封泄漏检测')],
    precisionCapability: t('P0', 'P0'), markets: [t('Middle East', '中东'), t('Africa', '非洲')], leadTime: '15–25 days', verified: true, demo: true,
  },
  {
    slug: 'dandong-bearing-unit', name: t('Dandong Motion Components', '丹东传动组件有限公司'), image: '/images/suppliers/dandong-bearing-unit.webp', country: t('China', '中国'), city: t('Dandong', '丹东'), established: 2009,
    description: t('Demo supplier of take-up and insert bearing units for bulk material handling.', '散料输送用滑块与外球面轴承单元的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['bearing-units'],
    processes: [t('Housing machining', '座体加工'), t('Insert grinding', '外球面磨削'), t('Assembly', '装配'), t('Packing', '包装')],
    qualitySystems: ['ISO 9001'], inspection: [t('Housing alignment check', '座体同轴度检测'), t('Noise testing', '噪声检测')],
    precisionCapability: t('P0', 'P0'), markets: [t('Australia', '澳大利亚'), t('Southeast Asia', '东南亚')], leadTime: '18–30 days', verified: true, demo: true,
  },
  {
    slug: 'harbin-steel-ball', name: t('Harbin Steel Ball Technology', '哈尔滨钢球科技有限公司'), image: '/images/suppliers/harbin-steel-ball.webp', country: t('China', '中国'), city: t('Harbin', '哈尔滨'), established: 2006,
    description: t('Demo supplier of precision bearing balls and cylindrical rollers with grade control.', '具备等级控制的精密钢球与圆柱滚子演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['bearing-components'],
    processes: [t('Cold heading', '冷镦'), t('Heat treatment', '热处理'), t('Lapping', '研磨'), t('Optical sorting', '光学分选')],
    qualitySystems: ['ISO 9001'], inspection: [t('Diameter variation', '球径变化检测'), t('Surface defect inspection', '表面缺陷检测')],
    precisionCapability: t('G20 to G5', 'G20 至 G5'), markets: [t('Europe', '欧洲'), t('Japan', '日本')], leadTime: '15–30 days', verified: true, demo: true,
  },
  {
    slug: 'shenyang-shieldtech', name: t('Shenyang ShieldTech Industrial', '沈阳盾承工业有限公司'), image: '/images/suppliers/shenyang-shieldtech.webp', country: t('China', '中国'), city: t('Shenyang', '沈阳'), established: 2011,
    description: t('Demo supplier for cages, seals, mounting tools and induction equipment.', '保持架、密封件、安装工具与感应加热设备的演示供应商。'),
    businessType: t('Manufacturer', '制造商'), primaryCategories: ['bearing-components', 'maintenance-tools'],
    processes: [t('Precision stamping', '精密冲压'), t('Elastomer moulding', '弹性体成型'), t('Tool assembly', '工装装配'), t('Electrical safety testing', '电气安全测试')],
    qualitySystems: ['ISO 9001'], inspection: [t('Cage runout', '保持架跳动检测'), t('Electrical insulation test', '绝缘测试')],
    precisionCapability: t('P0 component class', 'P0 零部件等级'), markets: [t('Europe', '欧洲'), t('Middle East', '中东')], leadTime: '20–35 days', verified: true, demo: true,
  },
  {
    slug: 'changchun-lubricants', name: t('Changchun Industrial Lubricants', '长春工业润滑科技有限公司'), image: '/images/suppliers/changchun-lubricants.webp', country: t('China', '中国'), city: t('Changchun', '长春'), established: 2016,
    description: t('Demo supplier of bearing greases, lubrication accessories and condition-monitoring consumables.', '轴承润滑脂、润滑附件与状态监测耗材的演示供应商。'),
    businessType: t('Service provider', '服务商'), primaryCategories: ['maintenance-tools'],
    processes: [t('Blending', '调合'), t('Quality control', '质量控制'), t('Packaging', '包装'), t('Application support', '应用支持')],
    qualitySystems: ['ISO 9001'], inspection: [t('Penetration test', '锥入度检测'), t('Dropping point test', '滴点检测')],
    precisionCapability: t('Lubricant specification', '润滑剂规格'), markets: [t('Northeast Asia', '东北亚'), t('Europe', '欧洲')], leadTime: '10–20 days', verified: true, demo: true,
  },
]

export function getSupplierBySlug(slug: string) {
  return suppliers.find((supplier) => supplier.slug === slug)
}
