---
id: config
title: Генерация загрузчика настроек
sidebar_label: Генерация загрузчика настроек
---

## Начало

В Swipe есть возможность сгенерировать загрузку 
настроек из переменных среды:

Структура конфигурации:

```go
package example

type Config struct {
    Database Database
}

type Database struct {
    Host string
    Username string
    Password string
}
 ```

Файл настроек Swipe:

```go
// +build swipe

package config

import "gitlab.com/example/example/pkg/swipe/swipeconfig"

func swipe() {
	swipeconfig.Config(
		swipeconfig.Environment(
			&Config{},
		),
	)
}
 ```

Swipe сгенерирует функцию загрузки `func LoadConfig() (cfg *Config, errs []error)`

## Настройки

### Изменение имени метода загрузки настроек

`swipeconfig.FuncName` используется для того, чтобы изменить 
имя функции загрузчика переменных среды.

```go
// +build swipe

package config

import "gitlab.com/example/example/pkg/swipe/swipeconfig"

func swipe() {
	swipeconfig.Config(
		swipeconfig.Environment(
			&Config{},
			swipeconfig.FuncName("Load"),
		),
	)
}
 ```


### Генерация markdown документации

`swipeconfig.EnableDoc` используется для того, чтобы включить 
генерацию документации markdown.

```go
// +build swipe

package config

import "gitlab.com/example/example/pkg/swipe/swipeconfig"

func swipe() {
	swipeconfig.Config(
		swipeconfig.Environment(
			&Config{},
			swipeconfig.FuncName("Load"),
			swipeconfig.EnableDoc(),
		),
	)
}
 ```

Swipe сгенерирует документацию рядом с файлом опций, 
если вы хотите изменить расположение то можете использовать 
опцию `swipeconfig.OutputDoc`:

```go
// +build swipe

package config

import "gitlab.com/example/example/pkg/swipe/swipeconfig"

func swipe() {
	swipeconfig.Config(
		swipeconfig.Environment(
			&Config{},
			swipeconfig.FuncName("Load"),
			swipeconfig.EnableDoc(),
			swipeconfig.OutputDoc("./docs"),
		),
	)
}
 ```

:::tip
Путь будет учитываться от корня проекта `gitlab.com/example/example`
:::

## Теги структуры

Swipe использует идиоматические значения по умолчанию для генерации имен переменных среды из имен полей Go.
Чтобы переопределить значения по умолчанию, используйте следующие необязательные теги полей структуры:

| Тег                      |      Описание                                        |
| ------------------------ | -----------------------------------------------------| 
| env:"env_name"           | Устанавливает имя переменной среды                   | 
| env:",required"          | Обязательное поле, пустые значения не допустимы      | 
| env:",required,use_zero" | Обязательное поле, пустые значения допустимы         |
| env:",use_flag"          | Использовать вместо переменной среды флаг из консоли |
| env:",desc:text          | Описания для генерации markdown документации         |

:::info
Переменная среды генерируется в верхнем регистре, вложенные поля структуры разделяться через `_`.
:::
