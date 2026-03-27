const dict = new Map<string, string>([
  ['URL is invalid', 'Неправильная ссылка'],
  ['Name is too short', 'Слишком короткое имя ссылки'],
  ['Name contains invalid characters', 'Неверное имя ссылки'],
  ['This name is used', 'Имя ссылки занято'],
  ['FormData not found', 'Неверно переданные данные'],
  ['File not found', 'Файл не найден'],
  ['File is too big', 'Вес файла слишком большой'],
])

export default function translateErrorMsg(msg: string): string {
  return dict.get(msg) ?? msg
}
