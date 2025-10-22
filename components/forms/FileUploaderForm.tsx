'use client'
import axios, { AxiosResponse } from 'axios'
import React, { useRef, useState } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Progress } from '@heroui/progress'
import { Snippet } from '@heroui/snippet'
import { ApiUploadFileResponse } from '@/types/api'
import translateErrorMsg from '@/lib/translateErrorMsg'

export default function FileUploaderForm() {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const nameInput = useRef<HTMLInputElement>(null)

  const [filename, setFilename] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [resultUrl, setResultUrl] = useState<string | undefined>()
  const [directURL, setDirectURL] = useState<string | undefined>()
  const [nameInvalid, setNameInvalid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingProgress, setLoadingProgress] = useState<number>(0)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsLoading(true)
    setNameInvalid(false)
    setError(undefined)
    setResultUrl(undefined)
    setDirectURL(undefined)

    const data = new FormData()
    if (!hiddenFileInput.current?.files?.[0]) return setIsLoading(false)
    if (hiddenFileInput.current.files[0].size > 104857600) {
      setError('Вес файла слишком большой')
      return setIsLoading(false)
    }
    if (nameInput.current?.value) data.set('name', nameInput.current.value)
    data.set('file', hiddenFileInput.current.files[0])

    let response: AxiosResponse
    try {
      response = await axios.post(
        new URL(
          '/api/record/upload',
          process.env.NEXT_PUBLIC_API_URL!,
        ).toString(),
        data,
        {
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent)
            if (progressEvent.progress)
              setLoadingProgress(Math.round(progressEvent.progress * 100))
          },
        },
      )
    } catch (err) {
      console.error(err)
      setIsLoading(false)
      return
    }

    const responseData: ApiUploadFileResponse = response.data
    if (responseData.success) {
      setResultUrl(responseData.url)
      setDirectURL(responseData.directURL)
    } else {
      const errorMsg = translateErrorMsg(responseData.error)
      if (errorMsg.type === 'name') setNameInvalid(true)
      setError(errorMsg.msg)
    }
    setIsLoading(false)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <input
          onChange={(event) => setFilename(event.target.files?.item(0)?.name)}
          ref={hiddenFileInput}
          type="file"
          id="file"
          className="hidden"
        />
        <div className="flex w-full items-center justify-start">
          <Button
            className="flex h-[56px] min-w-[40%] flex-col items-center gap-0"
            variant="faded"
            size="lg"
            fullWidth
            onPress={() => hiddenFileInput.current!.click()}
          >
            <span>Выберите файл</span>
            <span className="text-xs text-zinc-400">Размер ≤ 100 МБ</span>
          </Button>
          {!!filename && (
            <span className="min-w-[60%] overflow-x-clip text-ellipsis whitespace-nowrap px-2">
              {filename || '...'}
            </span>
          )}
        </div>
        <Input
          label="Имя"
          name="name"
          type="text"
          variant="faded"
          ref={nameInput}
          isInvalid={nameInvalid}
        />
        <Button
          color="secondary"
          className="w-full"
          variant="flat"
          type="submit"
          isLoading={isLoading}
        >
          Загрузить
        </Button>
      </form>
      <div className="m-4 flex flex-col items-center gap-3">
        {isLoading && (
          <Progress
            aria-label="Loading..."
            color="secondary"
            value={loadingProgress}
          />
        )}
        {error && <p className="font-medium text-red-400">{error}</p>}
        {resultUrl && (
          <div className="flex w-full flex-col items-start gap-2">
            <p className="font-light text-zinc-300">Ваша ссылка:</p>
            <Snippet hideSymbol fullWidth>
              {resultUrl}
            </Snippet>
          </div>
        )}
        {directURL && (
          <div className="flex w-full flex-col items-start gap-2">
            <p className="font-light text-zinc-300">Прямая ссылка на файл:</p>
            <Snippet hideSymbol fullWidth>
              {directURL}
            </Snippet>
          </div>
        )}
      </div>
    </>
  )
}
