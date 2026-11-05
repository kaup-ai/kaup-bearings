import type { DemoSession } from '#shared/types/catalog'
import { canPublish, canReply } from '#shared/utils/workspace'

interface StoredAccount extends DemoSession {
  email: string
  name: string
}

const sessionKey = 'kb_session_v1'
const accountsKey = 'kb_accounts_v1'

const demoAccounts: StoredAccount[] = [
  {
    userId: 'demo-buyer',
    role: 'buyer',
    company: 'Bluewater Procurement',
    status: 'verified',
    email: 'buyer@kaupbearings.demo',
    name: 'Alex Morgan',
  },
  {
    userId: 'demo-supplier',
    role: 'supplier',
    company: 'North Ridge Precision Bearing Co.',
    status: 'verified',
    email: 'supplier@kaupbearings.demo',
    name: 'Lin Yang',
  },
]

export function useDemoSession() {
  const session = useState<DemoSession | null>('kb-session', () => null)
  const error = ref<StoreError | null>(null)

  function load() {
    const result = readBrowserStore<DemoSession | null>(sessionKey, null)
    if (result.ok) session.value = result.value
    else error.value = result.error
  }

  function login(role: 'buyer' | 'supplier', email: string, password: string) {
    const expected = role === 'buyer'
      ? 'buyer@kaupbearings.demo'
      : 'supplier@kaupbearings.demo'
    if (email.trim().toLowerCase() !== expected || password !== 'Demo123!') {
      return false
    }
    const account = demoAccounts.find((entry) => entry.role === role)!
    const persisted: DemoSession = {
      userId: account.userId,
      role: account.role,
      company: account.company,
      status: account.status,
    }
    const result = writeBrowserStore(sessionKey, persisted)
    if (!result.ok) {
      error.value = result.error
      return false
    }
    session.value = persisted
    error.value = null
    return true
  }

  function register(role: 'buyer' | 'supplier', company: string, email: string) {
    const account: StoredAccount = {
      userId: `${role}-${Date.now()}`,
      role,
      company: company.trim(),
      status: role === 'supplier' ? 'pending' : 'verified',
      email: email.trim().toLowerCase(),
      name: company.trim(),
    }
    const existing = readBrowserStore<StoredAccount[]>(accountsKey, [])
    if (!existing.ok) {
      error.value = existing.error
      return false
    }
    const result = writeBrowserStore(accountsKey, [...existing.value, account])
    if (!result.ok) {
      error.value = result.error
      return false
    }
    const persisted: DemoSession = {
      userId: account.userId,
      role: account.role,
      company: account.company,
      status: account.status,
    }
    const sessionResult = writeBrowserStore(sessionKey, persisted)
    if (!sessionResult.ok) {
      error.value = sessionResult.error
      return false
    }
    session.value = persisted
    return true
  }

  function updateStatus(status: DemoSession['status']) {
    if (!session.value) return false
    const next = { ...session.value, status }
    const result = writeBrowserStore(sessionKey, next)
    if (!result.ok) {
      error.value = result.error
      return false
    }
    session.value = next
    return true
  }

  function logout() {
    removeBrowserStore(sessionKey)
    session.value = null
  }

  onMounted(load)

  return {
    session,
    error: readonly(error),
    login,
    register,
    updateStatus,
    logout,
    canPublish: computed(() => !!session.value && canPublish(session.value.status)),
    canReply: computed(() => !!session.value && canReply(session.value.status)),
  }
}
