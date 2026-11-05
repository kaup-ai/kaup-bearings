import type { Category } from '../types/catalog.ts'

const localized = (en: string, zh: string) => ({ en, zh })

export const categories: Category[] = [
  {
    slug: 'ball-bearings',
    number: '01',
    title: localized('Ball bearings', '球轴承'),
    summary: localized(
      'Low-friction rolling bearings for motors, pumps and precision machinery.',
      '面向电机、泵与精密机械的低摩擦滚动轴承。',
    ),
    introduction: localized(
      'Ball bearings carry radial, axial or combined loads through spherical rolling elements. Selection depends on contact angle, clearance, sealing, speed and the required precision class.',
      '球轴承通过球形滚动体承受径向、轴向或联合载荷。选型时需要综合接触角、游隙、密封、转速与精度等级。',
    ),
    variants: [
      'Deep groove ball bearings',
      'Angular contact ball bearings',
      'Self-aligning ball bearings',
      'Thrust ball bearings',
    ],
    selectionNotes: [
      localized(
        'Use deep groove bearings for combined loads and general industrial drives.',
        '一般工业传动和联合载荷优先考虑深沟球轴承。',
      ),
      localized(
        'Angular contact pairs require attention to contact angle and axial preload.',
        '成对角接触球轴承需要校核接触角与轴向预紧。',
      ),
    ],
    applications: [
      localized('Electric motors', '工业电机'),
      localized('Pumps', '泵类设备'),
      localized('Machine tools', '机床主轴'),
    ],
    faq: [
      {
        question: localized('What do C2, CN and C3 mean?', 'C2、CN、C3 分别代表什么？'),
        answer: localized(
          'They are internal clearance groups. CN is normal, C3 is larger-than-normal and C2 is smaller-than-normal.',
          '它们代表内部游隙组别：CN 为普通游隙，C3 大于普通值，C2 小于普通值。',
        ),
      },
    ],
    image: '/images/categories/ball-bearings.webp',
    subcategories: [
      { slug: 'deep-groove-ball-bearings', title: localized('Deep groove ball bearings', '深沟球轴承') },
      { slug: 'angular-contact-ball-bearings', title: localized('Angular contact ball bearings', '角接触球轴承') },
      { slug: 'self-aligning-ball-bearings', title: localized('Self-aligning ball bearings', '调心球轴承') },
      { slug: 'thrust-ball-bearings', title: localized('Thrust ball bearings', '推力球轴承') },
    ],
  },
  {
    slug: 'roller-bearings',
    number: '02',
    title: localized('Roller bearings', '滚子轴承'),
    summary: localized(
      'High load capacity for gearboxes, mining and heavy rotating equipment.',
      '面向齿轮箱、矿山与重型旋转设备的高承载轴承。',
    ),
    introduction: localized(
      'Roller bearings distribute load across a line contact. Cylindrical, spherical, tapered and needle designs trade radial capacity, misalignment tolerance and axial capability against each other.',
      '滚子轴承通过线接触分布载荷。圆柱、调心、圆锥和滚针设计分别在径向承载、调心能力与轴向承载之间取舍。',
    ),
    variants: ['Cylindrical roller bearings', 'Spherical roller bearings', 'Tapered roller bearings', 'Needle roller bearings', 'Thrust roller bearings'],
    selectionNotes: [
      localized('Check whether axial location is required before choosing a cylindrical roller bearing.', '选择圆柱滚子轴承前应确认是否需要轴向定位。'),
      localized('Tapered bearings are normally mounted as matched pairs with defined axial setting.', '圆锥滚子轴承通常成对安装，并需设定轴向游隙或预紧。'),
    ],
    applications: [localized('Gearboxes', '工业齿轮箱'), localized('Mining equipment', '矿山设备'), localized('Wind turbines', '风电设备')],
    faq: [{
      question: localized('When should spherical roller bearings be used?', '什么时候选用调心滚子轴承？'),
      answer: localized('Use them for heavy radial loads with shaft deflection or mounting misalignment.', '适用于存在轴挠曲或安装不同心、同时承受重径向载荷的场合。'),
    }],
    image: '/images/categories/roller-bearings.webp',
    subcategories: [
      { slug: 'cylindrical-roller-bearings', title: localized('Cylindrical roller bearings', '圆柱滚子轴承') },
      { slug: 'spherical-roller-bearings', title: localized('Spherical roller bearings', '调心滚子轴承') },
      { slug: 'tapered-roller-bearings', title: localized('Tapered roller bearings', '圆锥滚子轴承') },
      { slug: 'needle-roller-bearings', title: localized('Needle roller bearings', '滚针轴承') },
      { slug: 'thrust-roller-bearings', title: localized('Thrust roller bearings', '推力滚子轴承') },
    ],
  },
  {
    slug: 'linear-motion',
    number: '03',
    title: localized('Linear motion', '直线运动'),
    summary: localized('Linear guidance, bushings and ball screw support for automation.', '面向自动化设备的直线导向、衬套与丝杠支撑。'),
    introduction: localized('Linear motion systems constrain translation while minimising friction and stick-slip. Rail flatness, preload, lubrication and contamination protection determine service life.', '直线运动系统在限制平移的同时降低摩擦和爬行。导轨平面度、预紧、润滑与防护决定使用寿命。'),
    variants: ['Linear ball bushings', 'Linear guide assemblies', 'Ball screw support units', 'Compact linear guides'],
    selectionNotes: [localized('Define stroke, load direction, preload and required repeatability together.', '应同时定义行程、载荷方向、预紧和重复定位精度。')],
    applications: [localized('CNC machining', '数控加工'), localized('Packaging machinery', '包装机械'), localized('Robotics', '机器人')],
    faq: [{ question: localized('Does higher preload always improve accuracy?', '提高预紧一定提升精度吗？'), answer: localized('No. Excessive preload increases friction, heat and reduces fatigue life.', '不是。过大的预紧会增加摩擦和温升，并缩短疲劳寿命。') }],
    image: '/images/categories/linear-motion.webp',
    subcategories: [
      { slug: 'linear-ball-bushings', title: localized('Linear ball bushings', '直线球轴承') },
      { slug: 'linear-guides', title: localized('Linear guide assemblies', '直线导轨副') },
      { slug: 'ball-screw-support-units', title: localized('Ball screw support units', '滚珠丝杠支撑单元') },
    ],
  },
  {
    slug: 'plain-bearings',
    number: '04',
    title: localized('Plain bearings', '滑动轴承'),
    summary: localized('Bushings, rod ends and spherical plain bearings for oscillating or heavy-duty joints.', '适用于摆动或重载关节的轴套、杆端与关节轴承。'),
    introduction: localized('Plain bearings operate through a sliding contact pair. Bearing material, lubrication regime, surface pressure and PV limits are central to selection.', '滑动轴承依靠滑动副工作。轴瓦材料、润滑状态、表面压力与 PV 极限是选型核心。'),
    variants: ['Sleeve bushings', 'Spherical plain bearings', 'Rod ends', 'Thrust washers'],
    selectionNotes: [localized('Confirm lubrication and maintenance access for maintenance-free and lubricated variants.', '需明确免维护或加油维护型式及润滑可达性。')],
    applications: [localized('Hydraulic cylinders', '液压缸'), localized('Agricultural machinery', '农业机械'), localized('Steering linkages', '转向连杆')],
    faq: [{ question: localized('What is the difference between sliding and rolling bearings?', '滑动轴承与滚动轴承有什么区别？'), answer: localized('Plain bearings use a sliding film or low-friction liner; rolling bearings use rolling elements and typically offer lower starting torque.', '滑动轴承依靠滑动膜或低摩擦衬层，滚动轴承依靠滚动体，启动摩擦通常更低。') }],
    image: '/images/categories/plain-bearings.webp',
    subcategories: [
      { slug: 'sleeve-bushings', title: localized('Sleeve and flanged bushings', '轴套与翻边衬套') },
      { slug: 'spherical-plain-bearings', title: localized('Spherical plain bearings', '关节轴承') },
      { slug: 'rod-ends', title: localized('Rod ends', '杆端关节轴承') },
      { slug: 'thrust-washers', title: localized('Thrust washers', '止推垫片') },
    ],
  },
  {
    slug: 'bearing-units',
    number: '05',
    title: localized('Bearing units and housings', '轴承单元与轴承座'),
    summary: localized('Ready-to-mount units for conveyors, fans and material handling.', '面向输送机、风机与物料搬运的即装式轴承单元。'),
    introduction: localized('Bearing units combine an insert bearing with a housing or support. Shaft locking, housing alignment and relubrication features should match the maintenance strategy.', '轴承单元将外球面轴承与座体或支撑组合。轴锁紧方式、座体调心与补脂结构应与维护策略匹配。'),
    variants: ['Insert ball bearings', 'Pillow block units', 'Flanged units', 'Take-up units'],
    selectionNotes: [localized('Confirm shaft locking method and housing orientation before ordering.', '订货前确认轴锁紧方式与座体安装方向。')],
    applications: [localized('Conveyors', '输送设备'), localized('Fans', '工业风机'), localized('Material handling', '物料搬运')],
    faq: [{ question: localized('Why use a bearing unit instead of separate housing and bearing?', '为何选择成品轴承单元？'), answer: localized('It simplifies mounting, alignment and replacement in common shaft-supported equipment.', '在常见轴支撑设备中可简化安装、调心与更换。') }],
    image: '/images/categories/bearing-units.webp',
    subcategories: [
      { slug: 'insert-ball-bearings', title: localized('Insert ball bearings', '外球面球轴承') },
      { slug: 'pillow-block-units', title: localized('Pillow block units', '带座轴承单元') },
      { slug: 'flanged-units', title: localized('Flanged units', '法兰轴承单元') },
      { slug: 'take-up-units', title: localized('Take-up units', '滑块轴承单元') },
    ],
  },
  {
    slug: 'slewing-special-bearings',
    number: '06',
    title: localized('Slewing and special bearings', '回转支承与特种轴承'),
    summary: localized('Large-diameter, split, ceramic and application-specific bearing solutions.', '面向大直径、剖分、陶瓷与特定工况的轴承方案。'),
    introduction: localized('Special bearings address rotation between large structures, difficult installation, extreme temperature or electrical insulation. Application ratings must be verified by the supplier.', '特种轴承用于大型结构间的旋转、困难安装、极端温度或电气绝缘。应用额定值必须由供应商确认。'),
    variants: ['Slewing ring bearings', 'Split bearings', 'Hybrid ceramic bearings', 'High-temperature bearings'],
    selectionNotes: [localized('Raceway hardening, gear rating and bolt load must be reviewed together for slewing bearings.', '回转支承需同时校核滚道硬化、齿圈承载与螺栓载荷。')],
    applications: [localized('Cranes', '起重设备'), localized('Wind energy', '风电能源'), localized('Steel mills', '冶金设备')],
    faq: [{ question: localized('Are hybrid ceramic bearings electrically insulating?', '混合陶瓷轴承是否完全绝缘？'), answer: localized('Ceramic rolling elements reduce electrical damage risk, but the complete system and surrounding components still need insulation review.', '陶瓷滚动体可降低电蚀风险，但系统及周边部件仍需做绝缘评估。') }],
    image: '/images/categories/slewing-special-bearings.webp',
    subcategories: [
      { slug: 'slewing-ring-bearings', title: localized('Slewing ring bearings', '回转支承') },
      { slug: 'split-bearings', title: localized('Split bearings', '剖分轴承') },
      { slug: 'hybrid-ceramic-bearings', title: localized('Hybrid ceramic bearings', '陶瓷混合轴承') },
      { slug: 'high-temperature-bearings', title: localized('High-temperature and corrosion-resistant bearings', '高温与耐腐蚀轴承') },
    ],
  },
  {
    slug: 'bearing-components',
    number: '07',
    title: localized('Bearing components', '轴承零部件'),
    summary: localized('Balls, rollers, cages, rings and sealing elements for production and repair.', '面向制造与维修的钢球、滚子、保持架、套圈与密封件。'),
    introduction: localized('Component quality directly affects raceway geometry, friction, noise and fatigue life. Grade, tolerance and material certification must match the intended bearing class.', '零部件质量直接影响滚道几何、摩擦、噪声与疲劳寿命。等级、公差与材料证明应与目标轴承等级匹配。'),
    variants: ['Balls', 'Rollers', 'Cages', 'Rings', 'Seals and shields'],
    selectionNotes: [localized('Do not mix material lots or dimensional grades without a documented quality decision.', '未经质量评审不得混用材料批次或尺寸等级。')],
    applications: [localized('Bearing manufacturing', '轴承制造'), localized('Maintenance repair', '维修再制造'), localized('Precision assemblies', '精密组件')],
    faq: [{ question: localized('What does G10 mean for bearing balls?', '钢球 G10 代表什么？'), answer: localized('G10 is a ball grade associated with nominal diameter variation and geometric accuracy; it is not interchangeable with a bearing precision class.', 'G10 是钢球的精度等级，涉及球径变化与几何精度，不能与轴承精度等级直接等同。') }],
    image: '/images/categories/bearing-components.webp',
    subcategories: [
      { slug: 'balls', title: localized('Balls', '钢球') },
      { slug: 'rollers', title: localized('Rollers', '滚子') },
      { slug: 'cages', title: localized('Cages', '保持架') },
      { slug: 'rings', title: localized('Rings', '套圈') },
      { slug: 'seals-shields', title: localized('Seals and shields', '密封与防尘盖') },
    ],
  },
  {
    slug: 'maintenance-tools',
    number: '08',
    title: localized('Mounting, lubrication and condition monitoring', '安装润滑与检测'),
    summary: localized('Tools and consumables for correct bearing mounting and reliable operation.', '用于轴承正确安装与可靠运行的工装、润滑与检测产品。'),
    introduction: localized('Most premature bearing failures begin with mounting, contamination or lubrication. Induction heating, controlled fitting and vibration monitoring reduce these risks.', '许多轴承早期失效源于安装、污染或润滑。感应加热、可控配合与振动监测可降低这些风险。'),
    variants: ['Mounting tools', 'Induction heaters', 'Lubricants', 'Condition monitoring'],
    selectionNotes: [localized('Induction heaters must include temperature and demagnetisation control for bearing rings.', '轴承感应加热器应具备温度控制和退磁功能。')],
    applications: [localized('Maintenance workshops', '维修车间'), localized('Condition monitoring', '状态监测'), localized('Shutdown planning', '检修计划')],
    faq: [{ question: localized('Can bearings be fitted with direct flame heating?', '轴承可以直接用火焰加热安装吗？'), answer: localized('No. Open flame creates uneven heating, contamination and material-risk exposure.', '不可以。明火会导致加热不均、污染和材料风险。') }],
    image: '/images/categories/maintenance-tools.webp',
    subcategories: [
      { slug: 'mounting-tools', title: localized('Mounting tools', '安装工具') },
      { slug: 'induction-heaters', title: localized('Induction heaters', '感应加热器') },
      { slug: 'lubricants', title: localized('Lubricants', '润滑脂与润滑油') },
      { slug: 'condition-monitoring', title: localized('Condition monitoring', '状态监测') },
    ],
  },
]

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug)
}
