---
id: migrate
title: Миграция v2 -> v3
sidebar_label: Миграция v2 в v3
---

## CLI

### Инициализация опций swipe

v2

```shell
swipe gen --init
```

v3

```shell
swipe init
```


## Запуск генерации

v2

```shell
swipe gen ./pkg/...
```
или

```shell
swipe ./pkg/...
```

v3

```shell
swipe gen ./pkg/...
```

## Файлы опций

Файлы опции по-прежнему находятся в pkg/swipe, но в v3 
появляются еще поддиректории, сейчас это `swipegokit` и `swipeconfig`.

`swipegokit` и `swipeconfig` это плагины Swipe.

- `swipegokit` - плагин генерации транспорта с использованием GoKit.
- `swipeconfig` - плагин генерации загрузчика настроек из переменных среды.

Если в версии импорт файла с опциями был `yourepo/repo/name/pkg/swipe` 
то теперь он такой `yourepo/repo/name/pkg/swipe/swipegokit` или 
`yourepo/repo/name/pkg/swipe/swipegokit`


## Генерация имени клиента

В v3 изменилось поведение генерации имен клиентов, 
теперь параметр ns в опции `Interface` не влияет на имя клиента, 
для этого надо использовать опцию `ClientName`.


## Имена сгенерированных файлов

Изменились имена сгенерированных файлов, поэтому 
лучше удалить старые файлы с `_gen`.