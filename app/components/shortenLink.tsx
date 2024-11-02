'use client'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import React, { useRef, useState } from 'react'
import { ApiCreateShortLinkResponse } from '@/types/api'
import { Snippet } from '@nextui-org/snippet'
import translateErrorMsg from '@/lib/translateErrorMsg'
import getApiUrl from '@/app/actions/getApiUrl'
import axios from 'axios'

export default function ShortenLink() {
  const urlRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string | undefined>()
  const [URL, setURL] = useState<string | undefined>()
  const [urlInvalid, setUrlInvalid] = useState<boolean>(false)
  const [nameInvalid, setNameInvalid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const url = urlRef.current?.value
    const name = nameRef.current?.value
    if (!url) return setUrlInvalid(true)

    setUrlInvalid(false)
    setNameInvalid(false)
    setIsLoading(true)
    setError(undefined)
    setURL(undefined)

    const response = await axios.post(await getApiUrl('/api/links/create'), {
      url,
      name,
    })
    if (response.status !== 200) return setIsLoading(false)

    const data: ApiCreateShortLinkResponse = response.data
    if (!data.success) {
      const err = translateErrorMsg(data.error)
      if (err.type === 'url') setUrlInvalid(true)
      if (err.type === 'name') setNameInvalid(true)
      setError(err.msg)
    } else {
      setURL(data.url)
    }
    setIsLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center"
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
      <div className="flex flex-col gap-3 items-center m-4">
        {error && <p className="font-medium text-red-400">{error}</p>}
        {URL && (
          <div className="flex flex-col items-start gap-2 w-full">
            <p className="font-light text-zinc-300">Ваша ссылка:</p>
            <Snippet hideSymbol fullWidth>
              {URL}
            </Snippet>
          </div>
        )}
      </div>
    </>
  )
}
