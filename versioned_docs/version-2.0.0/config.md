---
id: config
title: Генерация загрузчика настроек
sidebar_label: Генерация загрузчика настроек
---

## Начало

В Swipe есть возможность сгенерировать загрузку настроек из переменных среды:

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
package example

import (
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    swipe.Build(
		ConfigEnv(&Config{}),
	)
}
 ```

Swipe сгенерирует функцию загрузки `func LoadConfig() (cfg *Config, errs []error)`

## Настройки

### Изменение имени метода загрузки настроек

```go
package example

import (
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    swipe.Build(
		ConfigEnv(
		    &Config{},
		    ConfigEnvFuncName("MyNameFunc"),
		),
	)
}
 ```

### Генерация markdown документации

```go
package example

import (
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    swipe.Build(
		ConfigEnv(
		    &Config{},
		    ConfigEnvDocEnable(),
		    ConfigEnvDocOutput("./docs")
		),
	)
}
 ```

## Теги структуры

Swipe использует идиоматические значения по умолчанию для генерации имен переменных среды из имен полей Go.
Чтобы переопределить значения по умолчанию, используйте следующие необязательные теги полей структуры:

| Тег                      |      Описание                                    |
| ------------------------ | ------------------------------------------------ | 
| env:"env_name"           | Заменить имя переменной среды по умолчанию.      | 
| env:",required"          | Обязательное поле, пустые значения не допустимы  | 
| env:",required,use_zero" | Обязательное поле, пустые значения допустимы     | 

:::info
Переменная среды генерируется в верхнем регистре, вложенные поля структуры разделяться через `_`.
:::
