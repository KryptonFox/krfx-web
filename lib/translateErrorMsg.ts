interface ErrorMsg {
  msg: string
  type?: 'url' | 'name'
}

const dict = new Map<string, ErrorMsg>([
  ['URL is invalid', { type: 'url', msg: 'Неправильная ссылка' }],
  [
    'The name is too short',
    { type: 'name', msg: 'Слишком короткое имя ссылки' },
  ],
  ['Restricted characters', { type: 'name', msg: 'Неверное имя ссылки' }],
  ['Name is used', { type: 'name', msg: 'Имя ссылки занято' }],
  ['FormData not found', { msg: 'Неверно переданные данные' }],
  ['File not found', { msg: 'Файл не найден' }],
  ['File is too big', { msg: 'Вес файла слишком большой' }],
])

export default function translateErrorMsg(msg: string): ErrorMsg {
  return dict.get(msg) ?? { msg }
}
