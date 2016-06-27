// @flow

import type {IconType} from '../common-adapters/icon'
import type {TypedAction} from '../constants/types/flux'

export type SearchPlatforms = 'Keybase' | 'Twitter' | 'Github' | 'Reddit' | 'Coinbase' | 'Hackernews' | 'Pgp'

export type ExtraInfo = {
  service: 'external',
  icon: IconType,
  serviceUsername: string, // i.e. with twitter it would be malgorithms
  serviceAvatar: ?string, // i.e. with twitter it would be their twitter avatar url
  fullNameOnService: ?string // Say with twitter we know malgorithms is "Chris Coyne"
} | {
  service: 'keybase',
  username: string,
  fullName: string,
  isFollowing: boolean
} | {
  service: 'none',
  fullName: string
}

export type SearchResult = {
  service: 'keybase',
  username: string,
  isFollowing: boolean,
  extraInfo: ExtraInfo
} | {
  service: 'external',
  icon: IconType,
  serviceAvatar: ?string, // i.e. with twitter it would be their twitter avatar url
  username: string,
  serviceName: SearchPlatforms,
  profileUrl: string,
  extraInfo: ExtraInfo,
  keybaseSearchResult: ?SearchResult, // If we want to grab the keybase version of a search result
}

export function fullName (extraInfo: ExtraInfo): string {
  switch (extraInfo.service) {
    case 'keybase':
    case 'none':
      return extraInfo.fullName
    case 'external':
      return extraInfo.fullNameOnService || ''
  }
  return ''
}

export const search = 'search:search'
export type Search = TypedAction<'search:search', {term: string}, void>

export const results = 'search:results'
export type Results = TypedAction<'search:results', {term: string, results: Array<SearchResult>}, void>

export const selectPlatform = 'search:selectPlatform'
export type SelectPlatform = TypedAction<'search:selectPlatform', {platform: SearchPlatforms}, void>

export const selectUserForInfo = 'search:selectUserForInfo'
export type SelectUserForInfo = TypedAction<'search:selectUserForInfo', {user: SearchResult}, void>

export const addUserToGroup = 'search:addUserToGroup'
export type AddUserToGroup = TypedAction<'search:addUserToGroup', {user: SearchResult}, void>

export const removeUserFromGroup = 'search:removeUserFromGroup'
export type RemoveUserFromGroup = TypedAction<'search:removeUserFromGroup', {user: SearchResult}, void>

export const toggleUserGroup = 'search:toggleUserGroup'
export type ToggleUserGroup = TypedAction<'search:toggleUserGroup', {show: boolean}, void>

export type SearchActions = Search | Results | SelectPlatform | SelectUserForInfo | AddUserToGroup | RemoveUserFromGroup | ToggleUserGroup

export function platformToIcon (platform: SearchPlatforms): IconType {
  return {
    'Keybase': 'fa-kb-iconfont-identity-devices',
    'Twitter': 'fa-kb-iconfont-identity-twitter',
    'Github': 'fa-kb-iconfont-identity-github',
    'Reddit': 'fa-kb-iconfont-identity-reddit',
    'Coinbase': 'fa-kb-iconfont-identity-bitcoin',
    'Hackernews': 'fa-kb-iconfont-identity-hn',
    'Pgp': 'fa-kb-iconfont-identity-pgp',
  }[platform]
}

// TODO(mm) get Logo for Hn at 32x32
export function platformToLogo32 (platform: SearchPlatforms): IconType {
  return {
    'Keybase': 'keybase-logo-mascot-only-dz-2-32',
    'Twitter': 'icon-twitter-logo-32',
    'Github': 'icon-github-logo-32',
    'Reddit': 'icon-reddit-logo-32',
    'Coinbase': 'icon-coinbase-logo-32',
    'Hackernews': 'placeholder-avatar-32-x-32',
    'Pgp': 'icon-pgp-key-32',
  }[platform]
}

// TODO(mm) get Logo for Hn
export function platformToLogo24 (platform: SearchPlatforms): IconType {
  return {
    'Keybase': 'keybase-logo-mascot-only-dz-2-24',
    'Twitter': 'icon-twitter-logo-24',
    'Github': 'icon-github-logo-24',
    'Reddit': 'icon-reddit-logo-24',
    'Coinbase': 'icon-coinbase-logo-24',
    'Hackernews': 'placeholder-avatar-24-x-24',
    'Pgp': 'icon-pgp-key-24',
  }[platform]
}

// TODO(mm) fill this out correctly
export function platformToLogo16 (platform: SearchPlatforms): IconType {
  return {
    'Keybase': 'keybase-logo-mascot-only-dz-2-24',
    'Twitter': 'icon-twitter-logo-24',
    'Github': 'icon-github-logo-24',
    'Reddit': 'icon-reddit-logo-24',
    'Coinbase': 'icon-coinbase-logo-24',
    'Hackernews': 'placeholder-avatar-24-x-24',
    'Pgp': 'icon-pgp-key-24',
  }[platform]
}

export function equalSearchResult (a: SearchResult, b: SearchResult): boolean {
  return a.service === b.service && a.username === b.username
}
