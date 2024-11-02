'use client'
import { Tab, Tabs } from '@nextui-org/tabs'
import ShortenLink from '@/app/components/shortenLink'
import UploadFile from '@/app/components/uploadFile'
import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { useState } from 'react'

export default function ShortenUploadForm() {
  const [selectedTabKey, setSelectedTabKey] = useState<
    'link' | 'file' | string
  >('link')
  return (
    <div className="px-4 mx-auto max-w-[450px]">
      <Tabs
        fullWidth
        variant="bordered"
        onSelectionChange={(key) => setSelectedTabKey(key.toString())}
      >
        <Tab className="px-0" title="Сократить ссылку" key="link">
          <ShortenLink />
        </Tab>
        <Tab className="px-0" title="Загрузить файл" key="file">
          <UploadFile />
        </Tab>
      </Tabs>
      <Accordion variant="splitted">
        <AccordionItem
          key="1"
          title={`Формат имени ${selectedTabKey === 'file' ? 'файла' : 'ссылки'}`}
        >
          <ul className="px-4 pb-2 list-disc font-light text-[1rem] dark:text-zinc-300">
            <li>Минимальная длина имени 3 символа</li>
            <li>
              Имя должно содержать только латинские буквы, цифры и символы -, _
            </li>
            <li>Имя не должно быть занято</li>
            <li>Если имя не дано, то оно генерируется автоматически</li>
            <li>Регистр имени не имеет значения</li>
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  )
}