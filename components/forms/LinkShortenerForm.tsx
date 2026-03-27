'use client'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import React, { useRef, useState } from 'react'
import {
  ApiCreateShortLinkResponse,
  ApiCreateShortLinkResponseSuccess,
  ApiResponseFailure,
} from '@/types/api'
import { Snippet } from '@heroui/snippet'
import axios, { AxiosError } from 'axios'
import translateErrorMsg from '@/lib/translateErrorMsg'

export default function LinkShortenerForm() {
  const urlRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const [error, setErrorMsg] = useState<string | undefined>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [resultUrl, setResultUrl] = useState<string | undefined>()
  const [urlInvalid, setUrlInvalid] = useState<boolean>(false)
  const [nameInvalid, setNameInvalid] = useState<boolean>(false)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const url = urlRef.current?.value
    const name = nameRef.current?.value
    if (!url) {
      setUrlInvalid(true)
      return
    }

    setErrorMsg(undefined)
    setUrlInvalid(false)
    setNameInvalid(false)

    setResultUrl(undefined)
    setIsLoading(true)

    const response = await axios
      .post<ApiCreateShortLinkResponse>(
        new URL(
          '/api/record/create_link',
          process.env.NEXT_PUBLIC_API_URL!,
        ).toString(),
        {
          url,
          name,
        },
      )
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error) && !!error.response?.data) {
          const error_data = JSON.parse(
            error.response?.data,
          ) as ApiResponseFailure

          if (error_data.error_type === 'url') setUrlInvalid(true)
          if (error_data.error_type === 'name') setNameInvalid(true)

          setErrorMsg(translateErrorMsg(error_data.message))
        }
        setIsLoading(false)
        console.error(error)
        return
      })

    if (!response) return

    const data = response.data
    const success_data = data as ApiCreateShortLinkResponseSuccess

    setResultUrl(success_data.link)
    setIsLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <Input
          ref={urlRef}
          type="text"
          name="url"
          label="Ссылка"
          variant="faded"
          onChange={() => {
            if (urlInvalid) setUrlInvalid(false)
          }}
          isInvalid={urlInvalid}
          isDisabled={isLoading}
          isRequired
        />
        <Input
          ref={nameRef}
          type="text"
          name="name"
          label="Имя"
          variant="faded"
          onChange={() => {
            if (nameInvalid) setNameInvalid(false)
          }}
          isInvalid={nameInvalid}
          isDisabled={isLoading}
        />
        <Button
          isLoading={isLoading}
          color="secondary"
          className="w-full"
          variant="flat"
          type="submit"
        >
          Сократить
        </Button>
      </form>
      <div className="m-4 flex flex-col items-center gap-3">
        {error && <p className="font-medium text-red-400">{error}</p>}
        {resultUrl && (
          <div className="flex w-full flex-col items-start gap-2">
            <p className="font-light text-zinc-300">Ваша ссылка:</p>
            <Snippet hideSymbol fullWidth>
              {resultUrl}
            </Snippet>
          </div>
        )}
      </div>
    </>
  )
}
