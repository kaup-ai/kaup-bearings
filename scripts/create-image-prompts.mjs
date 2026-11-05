import { mkdirSync, writeFileSync } from 'node:fs'
import { products } from '../shared/data/products.ts'
import { categories } from '../shared/data/taxonomy.ts'
import { applications } from '../shared/data/editorial.ts'
import { suppliers } from '../shared/data/suppliers.ts'

const shotSuffix =
  'Photorealistic commercial industrial photography, accurate machine-manufactured bearing geometry, real polished steel, machining marks, subtle oil film, controlled light, no text, no logos, no watermark, no illustration, no cartoon, no CGI plastic look.'

const categorySubjects = {
  'ball-bearings': 'an assortment of precision deep groove, angular contact, self-aligning and thrust ball bearings',
  'roller-bearings': 'cylindrical, spherical, tapered and needle roller bearings with visible rollers and machined raceways',
  'linear-motion': 'a linear ball bushing, profile guide rail and ball screw support bearing on an assembly bench',
  'plain-bearings': 'maintenance-free sleeve bushings, spherical plain bearings, rod ends and thrust washers',
  'bearing-units': 'pillow block, flanged and take-up bearing units with cast housings and insert bearings',
  'slewing-special-bearings': 'a large slewing ring bearing beside hybrid ceramic and corrosion-resistant bearing samples',
  'bearing-components': 'precision steel balls, cylindrical rollers, cages, rings and seals arranged by component type',
  'maintenance-tools': 'bearing mounting tools, an induction heater, grease and vibration monitoring equipment',
}

const items = []
const contextItems = []

items.push(
  {
    name: 'knowledge-selection',
    output: '/images/scenes/knowledge-selection.webp',
    model: 'image-01',
    prompt:
      'Wide 16:9 photorealistic bearing engineering selection workstation in a clean Chinese industrial technology centre. Three-quarter overhead view of a steel workbench with four physically accurate bearing types arranged for comparison, engineering drawings showing a bearing cross-section and load-direction arrows, a digital micrometer, dial indicator, calipers and an open technical catalogue. A laptop-like industrial display shows abstract load, speed and dimension charts without readable text. One gloved hand points at the angular-contact bearing; no face is visible. Precise professional engineering atmosphere, cool steel-blue daylight with restrained orange highlights, crisp material texture and shallow depth of field. No logos, watermarks, readable text, illustration, cartoon or plastic CGI look.',
  },
  {
    name: 'hero-packing',
    output: '/images/hero/packing.webp',
    model: 'image-01',
    prompt:
      'Wide 16:9 photorealistic factory export-packing scene for a Chinese bearing manufacturer. A large precision bearing has been cleaned, coated with thin anti-corrosion oil, wrapped in transparent VCI barrier film and placed in a foam-lined heavy-duty wooden export case. The open case shows desiccant sachets, protective blocking, steel strapping and a blank export plate without readable text. In the surrounding clean industrial packing area, gloved hands tighten a metal band; no face is visible. Modern bearing workshop, inspection equipment and dispatch paperwork out of focus. Cool graphite and steel palette, controlled overhead light, restrained safety-amber accent. Detail rich, physically plausible, no logos, no watermark, no text, no illustration, no cartoon, no plastic CGI look.',
  },
  {
    name: 'hero-port-loading',
    output: '/images/hero/port-loading.webp',
    model: 'image-01',
    prompt:
      'Wide 16:9 photorealistic container-terminal photograph for a bearing export story. A closed standard ISO steel shipping container has been lifted a short distance above a container ship by a ship-to-shore gantry crane and spreader. The container is fully closed and secured; the bearing and its protective wooden export cases are inside and completely invisible. Realistic container corner castings, crane spreader, lashing rods and stacked containers, with another cargo vessel visible. Heavy industrial scale, staff absent for safety, cool blue port lighting at dawn, graphite steel and restrained safety-amber highlights. No exposed wooden crate being lifted, no people, readable logos, text, watermark, illustration, cartoon, fantasy rigging or CGI plastic look.',
  },
  {
    name: 'hero-voyage',
    output: '/images/hero/voyage.webp',
    model: 'image-01',
    prompt:
      'Wide 16:9 photorealistic ocean-freight hero photograph. A large modern container ship underway from a northern Chinese industrial port, stacked export containers secured on deck and a clear wake trailing behind. Ship-to-shore gantry cranes and the Northeast Chinese port skyline recede in cool atmospheric haze. Early blue-hour daylight, calm realistic sea, subtle overcast clouds, graphite and steel-blue palette with a restrained warm horizon. Strong forward motion and horizon, international B2B export mood, generous dark tonality for homepage copy. No visible people, readable logos, text, watermark, illustration, cartoon, fantasy vessel, or plastic CGI look.',
  },
)

for (const category of categories) {
  items.push({
    name: `category-${category.slug}`,
    output: `/images/categories/${category.slug}.png`,
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic industrial catalogue photograph of ${categorySubjects[category.slug]}. Real bearing workshop inspection table, steel and graphite surfaces, cool daylight with restrained amber task light, technical and orderly composition with breathing room. ${shotSuffix}`,
  })
}

for (const product of products) {
  const number = product.id.slice(1)
  items.push({
    name: `p${number}`,
    output: product.image,
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic bearing product photograph for ${product.title.en}, designation ${product.designation}. Principal dimensions d ${product.dimensions.d ?? 'n/a'} mm, D ${product.dimensions.D ?? 'n/a'} mm, width ${product.dimensions.B ?? product.dimensions.T ?? 'n/a'} mm. Show a single correctly assembled ${product.title.en} with ${product.parameters.sealing} sealing and ${product.parameters.cage} cage on a dark machined inspection surface. Three-quarter view, softbox highlights, shallow industrial background, no people. ${shotSuffix}`,
  })
}

items.push(
  {
    name: 'scene-inspection',
    output: '/images/scenes/inspection.png',
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic bearing metrology laboratory. A polished tapered roller bearing sits on a granite surface plate beside a precision micrometer and roundness measuring instrument. No visible human faces, only gloved hands at most. Cool technical lighting, graphite and steel palette, plausible inspection equipment. ${shotSuffix}`,
  },
  {
    name: 'scene-assembly',
    output: '/images/scenes/assembly.png',
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic bearing assembly workshop. Sealed bearing rings, cages and rollers move through a clean organised assembly and inspection line. No visible human faces; machinery and components are the subject. Cool daylight, brushed steel and safety amber accents, physically plausible factory. ${shotSuffix}`,
  },
  {
    name: 'scene-exhibition',
    output: '/images/scenes/exhibition.png',
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic industrial exhibition hall with unlabelled bearing and motion-control displays, large slewing rings, precision bearings and machine components. Wide architectural view, no readable text, no visible faces, cool white lighting and safety orange accents. ${shotSuffix}`,
  },
  {
    name: 'scene-hero',
    output: '/images/scenes/hero.png',
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic industrial photographic hero for a bearing platform. A precision tapered roller bearing assembly on a granite inspection table inside a modern bearing factory, CNC grinder softly out of focus behind it. Dark open negative space on the left, bearing on the right, cool daylight, graphite steel and restrained amber. No visible human face. ${shotSuffix}`,
  },
  {
    name: 'scene-wind',
    output: '/images/scenes/wind.png',
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic wind turbine nacelle service scene showing a massive main rotor bearing and torque tools. If any person's face is visible, the person must be a Chinese national from Northeast China with authentic Dongbei Chinese facial features; otherwise show the workers from behind. No foreign faces and no generic East Asian faces. Cool overcast daylight, plausible engineering details. ${shotSuffix}`,
  },
)

const applicationSubjects = {
  'electric-motor': 'a large three-phase industrial electric motor opened for rotor installation, with copper stator windings, laminated rotor, visible shaft and two deep-groove ball bearings, in an electrical machinery assembly workshop with winding and balancing equipment',
  gearbox: 'the open housing of a heavy industrial helical gearbox during assembly, showing meshing gears, shafts, tapered and cylindrical roller bearings and controlled oil film on a dedicated gearbox build stand',
  mining: 'a huge mining haul-truck wheel hub and final-drive assembly being serviced outdoors at an open-pit mine maintenance yard, with a large spherical roller bearing, jack stands, torque equipment and red-brown ore dust',
  'machine-tool': 'a high-precision CNC machine-tool spindle being assembled in a bright clean metrology room, with matched angular-contact bearings, a precision tool taper, dial indicator and temperature-controlled assembly table',
  conveyor: 'a long bulk-material conveyor gallery and drive station in a port bulk terminal, clearly showing the head pulley, shaft, bearing units and gearbox connected to the conveyor frame',
  wind: 'inside a utility-scale wind-turbine nacelle high above winter hills, with the massive main rotor bearing, hydraulic torque tools and service crane track clearly visible around the drivetrain',
  pump: 'a large centrifugal process pump opened for overhaul in a petrochemical maintenance workshop, showing the impeller, shaft, mechanical seal area and bearing housing on a pump assembly stand',
}

for (const application of applications) {
  contextItems.push({
    name: `application-${application.slug}`,
    output: application.image,
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic industrial documentary photograph. Primary scene: ${applicationSubjects[application.slug]}. The equipment itself must dominate and visually explain why this application needs a specific bearing type. Use a distinct, real environment and camera composition for this application rather than a generic machine workshop. Physically correct equipment, practical service tools, no visible human faces, no text or logos. ${shotSuffix}`,
  })
}

const supplierSubjects = {
  'north-ridge-precision': 'a modern precision-bearing factory campus in Harbin at cold blue dawn, with a glass-walled clean production hall, HVAC equipment, dispatch bays and neat insulated loading docks in the foreground',
  'harbin-axis-works': 'the interior of a heavy forging hall with a large open-die press forming a glowing hot bearing-ring blank, gripping manipulators, scale, overhead crane rails and intense orange heat against dark steel',
  'anshan-heavy-bearing': 'a large-bearing heat-treatment department with a deep pit furnace, overhead crane lifting a massive forged bearing ring, quenching equipment and industrial rails at a major heavy-machinery plant',
  'shenyang-raceway': 'a precision raceway-grinding production line with several CNC internal grinders operating under coolant, bearing rings in fixtures and a profile-measurement station, shown in a clean cold-blue workshop',
  'liaoning-ringtech': 'an automated powder-metal sintering line with continuous furnaces, trays of plain bushings, compacting presses and a bright quality-control station',
  'changchun-precision-rings': 'a temperature-controlled metrology laboratory with a coordinate-measuring machine, granite table, precision bearing rings and surface-finish instruments viewed through a clean glass inspection area',
  'dalian-linear-works': 'a very long linear-guide production hall with rails stretching into perspective, straightening presses, rail grinding machines, preload assembly stations and overhead extraction ducts',
  'haicheng-unit-works': 'a foundry and machining plant for cast-iron pillow-block housings, with green-sand moulding boxes, raw castings on steel pallets and CNC housing machining cells',
  'dandong-bearing-unit': 'a high-volume bearing-unit assembly area with a conveyor of take-up units, flanged housings, insert bearings and automated greasing stations',
  'harbin-steel-ball': 'a precision steel-ball plant with rows of lapping barrels, washing drums, optical sorting machines and mirrored steel balls moving through inspection trays',
  'shenyang-shieldtech': 'a component-manufacturing plant with large stamping presses forming bearing cages, elastomer seal moulding machines and racks of finished seals',
  'changchun-lubricants': 'a bearing-lubricant production facility with a small outdoor tank farm, insulated transfer pipes, blending vessels and a glass-walled grease testing laboratory',
}

for (const supplier of suppliers) {
  contextItems.push({
    name: `supplier-${supplier.slug}`,
    output: supplier.image,
    model: 'image-01',
    prompt: `Wide 16:9 photorealistic industrial capability photograph. Primary scene: ${supplierSubjects[supplier.slug]}. The production equipment, facility scale and process step must be unmistakable and visually different from a generic workshop. Show a credible working Chinese factory with practical material handling and industrial architecture. It must not look like a bearing product photo. Avoid exposed final products as the hero, macro product composition, uniform dark workshop interiors and duplicated equipment layouts. No readable logos or text, no visible human faces. Photorealistic documentary photography, sharp industrial detail, restrained cool-blue daylight and process-specific lighting, no illustration, no cartoon, no CGI plastic look.`,
  })
}

items.push(...contextItems)

mkdirSync('tmp', { recursive: true })
writeFileSync('tmp/final-image-prompts.json', JSON.stringify(items, null, 2))
writeFileSync('tmp/context-image-prompts.json', JSON.stringify(contextItems, null, 2))
writeFileSync('docs/image-prompts.json', JSON.stringify(items, null, 2))
console.log(JSON.stringify({ count: items.length, context: contextItems.length, categories: categories.length, products: products.length, suppliers: suppliers.length }))
