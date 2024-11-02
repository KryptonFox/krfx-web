'use client'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Progress } from '@nextui-org/progress'
import { Snippet } from '@nextui-org/snippet'
import { ApiUploadFileResponse } from '@/types/api'
import translateErrorMsg from '@/lib/translateErrorMsg'
import getApiUrl from '@/app/actions/getApiUrl'

export default function UploadFile() {
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const nameInput = useRef<HTMLInputElement>(null)

  const [filename, setFilename] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [URL, setURL] = useState<string | undefined>()
  const [directURL, setDirectURL] = useState<string | undefined>()
  const [nameInvalid, setNameInvalid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingProgress, setLoadingProgress] = useState<number>(0)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsLoading(true)
    setNameInvalid(false)
    setError(undefined)
    setURL(undefined)
    setDirectURL(undefined)

    const data = new FormData()
    if (!hiddenFileInput.current?.files) return setIsLoading(false)
    if (hiddenFileInput.current.files[0].size > 104857600) {
      setError('Вес файла слишком большой')
      setIsLoading(false)
      return
    }
    if (nameInput.current?.value) data.set('name', nameInput.current.value)
    data.set('file', hiddenFileInput.current.files[0])

    const response = await axios.post(
      await getApiUrl('/api/files/upload'),
      data,
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.progress)
            setLoadingProgress(Math.round(progressEvent.progress * 100))
        },
      },
    )
    if (response.status !== 200) return setIsLoading(false)

    const responseData: ApiUploadFileResponse = response.data
    if (responseData.success) {
      setURL(responseData.url)
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
        className="flex flex-col gap-4 items-center"
      >
        <input
          onChange={(event) => setFilename(event.target.files?.item(0)?.name)}
          ref={hiddenFileInput}
          type="file"
          id="file"
          className="hidden"
        />
        <div className="flex justify-start items-center w-full">
          <Button
            className="flex flex-col items-center gap-0 min-w-[40%] h-[56px]"
            variant="faded"
            size="lg"
            fullWidth
            onClick={() => hiddenFileInput.current!.click()}
          >
            <span>Выберите файл</span>
            <span className="text-xs text-zinc-400">Размер ≤ 100 МБ</span>
          </Button>
          {!!filename && (
            <span className="min-w-[60%] px-2 whitespace-nowrap overflow-x-clip overflow-ellipsis">
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
      <div className="flex flex-col gap-3 items-center m-4">
        {isLoading && (
          <Progress
            aria-label="Loading..."
            color="secondary"
            value={loadingProgress}
          />
        )}
        {error && <p className="font-medium text-red-400">{error}</p>}
        {URL && (
          <div className="flex flex-col items-start gap-2 w-full">
            <p className="font-light text-zinc-300">Ваша ссылка:</p>
            <Snippet hideSymbol fullWidth>
              {URL}
            </Snippet>
          </div>
        )}
        {directURL && (
          <div className="flex flex-col items-start gap-2 w-full">
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
