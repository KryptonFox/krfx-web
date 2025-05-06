'use client'
import { Tab, Tabs } from "@heroui/tabs"
import LinkShortenerForm from '@/components/forms/LinkShortenerForm'
import FileUploaderForm from '@/components/forms/FileUploaderForm'
import { Accordion, AccordionItem } from "@heroui/accordion"
import { useState } from 'react'

export default function ActionTabs() {
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
          <LinkShortenerForm />
        </Tab>
        <Tab className="px-0" title="Загрузить файл" key="file">
          <FileUploaderForm />
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
