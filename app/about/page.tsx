import AboutPageAccordions from '@/components/common/AboutPageAccordions'

export default function About() {
  return (
    <div className="container mx-auto mt-2 px-2">
      <h1 className="text-center text-3xl font-extrabold">О проекте</h1>
      <p className="mt-2 px-1 text-center">
        Бесплатный сервис загрузки файлов и сокращения ссылок. По вопросам в ДС:
        kryptonfox
      </p>
      <AboutPageAccordions />
    </div>
  )
}
