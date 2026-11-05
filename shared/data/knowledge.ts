export interface KnowledgeTopic {
  slug: string
  order: number
  title: { en: string; zh: string }
  description: { en: string; zh: string }
  categorySlug: string
}

export const knowledgeTopics: KnowledgeTopic[] = [
  {
    slug: 'bearing-designation-system',
    order: 1,
    title: { en: 'How to read a bearing designation', zh: '如何读懂轴承型号' },
    description: {
      en: 'Break a designation into type, dimension series, bore, sealing and clearance suffixes without guessing.',
      zh: '把轴承型号拆解为类型、尺寸系列、内径、密封与游隙后缀，不凭经验猜测。',
    },
    categorySlug: 'ball-bearings',
  },
  {
    slug: 'precision-grades-iso-abec',
    order: 2,
    title: { en: 'ISO precision grades and ABEC cross-reference', zh: 'ISO 精度等级与 ABEC 对照' },
    description: {
      en: 'Understand P0, P6, P5, P4 and P2 classes and why ABEC equivalence is never a complete substitution.',
      zh: '理解 P0、P6、P5、P4、P2，以及为什么 ABEC 对照不能直接替代完整技术确认。',
    },
    categorySlug: 'ball-bearings',
  },
  {
    slug: 'internal-clearance-cn-c3',
    order: 3,
    title: { en: 'Internal clearance: CN, C3 and C4', zh: '内部游隙：CN、C3 与 C4' },
    description: {
      en: 'Clearance is an operating condition, not just a suffix. Fit, temperature and preload change residual clearance.',
      zh: '游隙是运行状态，不只是型号后缀。配合、温度与预紧都会改变残余游隙。',
    },
    categorySlug: 'roller-bearings',
  },
  {
    slug: 'seals-versus-shields',
    order: 4,
    title: { en: 'Seals versus shields: 2RS, 2Z and open bearings', zh: '密封与防尘盖：2RS、2Z 与开式轴承' },
    description: {
      en: 'Compare contact seals, non-contact shields and open bearings by friction, speed and contamination.',
      zh: '按摩擦、转速和污染要求比较接触式密封、非接触防尘盖与开式轴承。',
    },
    categorySlug: 'ball-bearings',
  },
  {
    slug: 'cage-material-selection',
    order: 5,
    title: { en: 'Cage material selection', zh: '保持架材料选型' },
    description: {
      en: 'Steel, brass, polyamide and PEEK cages have different temperature, speed and lubrication boundaries.',
      zh: '钢、黄铜、聚酰胺和 PEEK 保持架具有不同的温度、转速与润滑边界。',
    },
    categorySlug: 'bearing-components',
  },
  {
    slug: 'mounting-fits-and-preload',
    order: 6,
    title: { en: 'Mounting fits and preload control', zh: '安装配合与预紧控制' },
    description: {
      en: 'Avoid damaging raceways through uncontrolled press force, induction heating or excessive axial preload.',
      zh: '避免因不可控压装力、感应加热或过大轴向预紧损伤滚道。',
    },
    categorySlug: 'maintenance-tools',
  },
  {
    slug: 'bearing-failure-analysis',
    order: 7,
    title: { en: 'A practical bearing failure-analysis sequence', zh: '实用的轴承失效分析顺序' },
    description: {
      en: 'Separate evidence from assumption using load path, lubricant condition, mounting marks and damage morphology.',
      zh: '通过载荷路径、润滑状态、安装痕迹与损伤形貌区分证据和假设。',
    },
    categorySlug: 'roller-bearings',
  },
]
