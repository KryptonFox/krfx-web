'use client'
import { Accordion, AccordionItem } from '@nextui-org/accordion'

export default function AboutPageAccordions() {
  return (
    <Accordion>
      <AccordionItem key="2" title="Является ли сервис платным?">
        Пока расходы на поддержку мизерные проект существует за счёт создателя
      </AccordionItem>
      <AccordionItem key="3" title="Собирает ли сервис какие либо данные?">
        Нет
      </AccordionItem>
      <AccordionItem key="1" title="Что под капотом?">
        <ul className="list-disc ml-6 dark:text-zinc-300">
          <li>
            <span>Фронтэнд: </span>
            <span className="font-light">Next.js + NextUI + TailwindCSS</span>
          </li>
          <li>
            <span>Бэкэнд: </span>
            <span className="font-light">
              Hono on Node.js + PrismaORM + MongoDB
            </span>
          </li>
          <li>
            <span>Храниние файлов: </span>
            <span className="font-light">Yandex Object Storage</span>
          </li>
          <li>
            <span>Хостинг: </span>
            <span className="font-light">Vercel (Фронт); Aeza (Бэк)</span>
          </li>
        </ul>
      </AccordionItem>
    </Accordion>
  )
}
