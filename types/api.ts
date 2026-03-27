export type ApiCreateShortLinkResponse =
  | ApiCreateShortLinkResponseSuccess
  | ApiResponseFailure

export type ApiUploadFileResponse =
  | ApiUploadFileResponseSuccess
  | ApiResponseFailure

export interface ApiCreateShortLinkResponseSuccess {
  id: string
  owner_id?: string
  link: string
  created_at: string
  is_temp: boolean
  expires_at?: string
}

export interface ApiUploadFileResponseSuccess {
  id: string
  owner_id?: string
  link: string
  cdn_link: string
  hash: string
  mime_type: string
  created_at: string
  is_temp: boolean
  expires_at?: string
}

export interface ApiResponseFailure {
  error_type: string
  message: string
}
