# State Management

## URL State

Catalog filters are URL state. They survive reloads through query parameters, and server rendering reads the same query.

## Browser Demo State

Use versioned keys:

| Key | Purpose |
| --- | --- |
| `kb_session_v1` | Current demo role and approval status |
| `kb_accounts_v1` | Registered demo accounts |
| `kb_drafts_v1` | Supplier product drafts |
| `kb_rfqs_v1` | Buyer inquiries and supplier replies |
| `kb_supplier_profile_v1` | Supplier capability profile |

Use the storage adapter result contract:

```ts
type StoreResult<T> =
  | { ok: true; value: T }
  | { ok: false; error: 'unavailable' | 'invalid' | 'quota' }
```

Never report success when `ok` is false.

## Server State

Public catalog and technical content are typed fixtures rendered by Nitro. This prototype has no production API or database.
