import type { DemoSession } from '../types/catalog.ts'

export function canPublish(status: DemoSession['status']): boolean {
  return status === 'verified'
}

export function canReply(status: DemoSession['status']): boolean {
  return status === 'verified'
}
