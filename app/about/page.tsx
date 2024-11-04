import AboutPageAccordions from '@/components/common/AboutPageAccordions'

export default function About() {
  return (
    <div className="container mx-auto mt-2 px-2">
      <h1 className="text-3xl font-extrabold text-center">О проекте</h1>
      <p className="text-center mt-2 px-1">
        Бесплатный сервис загрузки файлов и сокращения ссылок. По вопросам в ДС:
        kryptonfox
      </p>
      <AboutPageAccordions />
    </div>
  )
}
