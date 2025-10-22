'use client'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import React, { useRef, useState } from 'react'
import { ApiCreateShortLinkResponse } from '@/types/api'
import { Snippet } from '@heroui/snippet'
import translateErrorMsg from '@/lib/translateErrorMsg'
import axios from 'axios'

export default function LinkShortenerForm() {
  const urlRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string | undefined>()
  const [resultUrl, setResultUrl] = useState<string | undefined>()
  const [urlInvalid, setUrlInvalid] = useState<boolean>(false)
  const [nameInvalid, setNameInvalid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(process.env.NEXT_PUBLIC_API_URL!)
    e.preventDefault()
    const url = urlRef.current?.value
    const name = nameRef.current?.value
    if (!url) return setUrlInvalid(true)

    setUrlInvalid(false)
    setNameInvalid(false)
    setIsLoading(true)
    setError(undefined)
    setResultUrl(undefined)

    const response = await axios.post(
      new URL(
        '/api/record/create_link',
        process.env.NEXT_PUBLIC_API_URL!,
      ).toString(),
      {
        url,
        name,
      },
    )
    if (response.status !== 200) return setIsLoading(false)

    const data: ApiCreateShortLinkResponse = response.data
    if (!data.success) {
      const err = translateErrorMsg(data.error)
      if (err.type === 'url') setUrlInvalid(true)
      if (err.type === 'name') setNameInvalid(true)
      setError(err.msg)
    } else {
      setResultUrl(data.url)
    }
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
