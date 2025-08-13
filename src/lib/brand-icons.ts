import {
  siOpenjdk,
  siKotlin,
  siPython,
  siJavascript,
  siPostgresql,
  siRedis,
  siMongodb,
  siDocker,
  siApachekafka,
  siRabbitmq,
  siGit,
  siApachemaven,
  siGradle,
  siKubernetes,
  siAndroid,
  siHibernate,
  siSpring,
  siSpringboot,
} from 'simple-icons'

export type BrandIcon = {
  title: string
  slug: string
  hex: string
  path: string
}

const entries: Array<[string, BrandIcon]> = [
  ['java', siOpenjdk],
  ['kotlin', siKotlin],
  ['python', siPython],
  ['javascript', siJavascript],
  ['postgresql', siPostgresql],
  ['postgres', siPostgresql],
  ['redis', siRedis],
  ['mongodb', siMongodb],
  ['docker', siDocker],
  ['kafka', siApachekafka],
  ['apache kafka', siApachekafka],
  ['rabbitmq', siRabbitmq],
  ['git', siGit],
  ['maven', siApachemaven],
  ['apache maven', siApachemaven],
  ['gradle', siGradle],
  ['kubernetes', siKubernetes],
  ['android', siAndroid],
  ['android sdk', siAndroid],
  ['hibernate', siHibernate],
  ['spring', siSpring],
  ['spring framework', siSpring],
  ['spring boot', siSpringboot],
]

export const brandIcons: Record<string, BrandIcon> = Object.fromEntries(entries)

export function getBrandIcon(name: string): BrandIcon | undefined {
  const key = name.trim().toLowerCase()
  return brandIcons[key]
}
