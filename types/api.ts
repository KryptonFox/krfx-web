export type ApiCreateShortLinkResponse =
  | ApiCreateShortLinkResponseSuccess
  | ApiResponseFailure

export type ApiUploadFileResponse =
  | ApiUploadFileResponseSuccess
  | ApiResponseFailure

interface ApiCreateShortLinkResponseSuccess {
  success: true
  url: string
}

interface ApiUploadFileResponseSuccess {
  success: true
  url: string
  directURL: string
}

interface ApiResponseFailure {
  success: false
  error: string
}
