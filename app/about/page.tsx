import Accordions from './components/accordions'

export default function About() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-extrabold text-center">О проекте</h1>
      <p className="text-center mt-2">
        Бесплатный сервис загрузки файлов и сокращения ссылок. По вопросам в ДС:
        kryptonfox
      </p>
      <Accordions />
    </div>
  )
}
