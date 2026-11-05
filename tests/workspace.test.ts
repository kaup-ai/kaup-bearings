import assert from 'node:assert/strict'
import test from 'node:test'
import { canPublish, canReply } from '../shared/utils/workspace.ts'

test('pending and rejected suppliers cannot publish or reply', () => {
  assert.equal(canPublish('pending'), false)
  assert.equal(canPublish('rejected'), false)
  assert.equal(canReply('pending'), false)
  assert.equal(canReply('rejected'), false)
})

test('verified suppliers can publish and reply', () => {
  assert.equal(canPublish('verified'), true)
  assert.equal(canReply('verified'), true)
})
