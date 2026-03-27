'use client'
import axios, { AxiosError } from 'axios'
import React, { useRef, useState } from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Progress } from '@heroui/progress'
import { Snippet } from '@heroui/snippet'
import {
  ApiResponseFailure,
  ApiUploadFileResponse,
  ApiUploadFileResponseSuccess,
} from '@/types/api'
import translateErrorMsg from '@/lib/translateErrorMsg'

export default function FileUploaderForm() {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const nameInput = useRef<HTMLInputElement>(null)

  const [error, setErrorMsg] = useState<string | undefined>()
  const [nameInvalid, setNameInvalid] = useState<boolean>(false)

  const [filename, setFilename] = useState<string | undefined>()
  const [resultUrl, setResultUrl] = useState<string | undefined>()
  const [directURL, setDirectUrl] = useState<string | undefined>()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingProgress, setLoadingProgress] = useState<number>(0)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsLoading(true)
    setNameInvalid(false)
    setErrorMsg(undefined)
    setResultUrl(undefined)
    setDirectUrl(undefined)

    const form_data = new FormData()
    if (!hiddenFileInput.current?.files?.[0]) return setIsLoading(false)
    if (hiddenFileInput.current.files[0].size > 104857600) {
      setErrorMsg('Вес файла слишком большой')
      return setIsLoading(false)
    }
    if (nameInput.current?.value) form_data.set('name', nameInput.current.value)
    form_data.set('file', hiddenFileInput.current.files[0])

    const response = await axios
      .post<ApiUploadFileResponse>(
        new URL(
          '/api/record/upload',
          process.env.NEXT_PUBLIC_API_URL!,
        ).toString(),
        form_data,
        {
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent)
            if (progressEvent.progress)
              setLoadingProgress(Math.round(progressEvent.progress * 100))
          },
        },
      )
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error) && !!error.response?.data) {
          const error_data = JSON.parse(
            error.response?.data,
          ) as ApiResponseFailure

          if (error_data.error_type === 'name') setNameInvalid(true)

          setErrorMsg(translateErrorMsg(error_data.message))
        }
        setIsLoading(false)
        console.error(error)
        return
      })

    if (!response) return

    const response_data = response.data
    const success_data = response_data as ApiUploadFileResponseSuccess

    setResultUrl(success_data.link)
    setDirectUrl(success_data.cdn_link)
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
            className="flex h-14 min-w-[40%] flex-col items-center gap-0"
            variant="faded"
            size="lg"
            fullWidth
            onPress={() => hiddenFileInput.current!.click()}
          >
            <span>Выберите файл</span>
            <span className="text-xs text-zinc-400">Размер ≤ 100 МБ</span>
          </Button>
          {!!filename && (
            <span className="min-w-[60%] overflow-x-clip px-2 text-ellipsis whitespace-nowrap">
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
