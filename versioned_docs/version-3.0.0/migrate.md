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


## Генерация HTTP транспорта

v2 

```go
//+build swipe

package transport

import (
	"github.com/examples/example/pkg/interface/controller"
	"github.com/examples/example/pkg/swipe"
)

func swipe() {
	swipe.Build(
        swipe.Service(
            swipe.HTTPServer(),
            swipe.JSONRPCEnable(),
            swipe.ClientsEnable([]string{"js"}),
    
            swipe.Interface((*controller.UserControllerIface)(nil), "user", swipegokit.ClientName("user")),
            swipe.Interface((*controller.TaskControllerIface)(nil), "task", swipegokit.ClientName("task")),
    
            swipe.MethodDefaultOptions(
                swipe.Logging(true),
                swipe.Instrumenting(true),
            ),
        ),	    	
	)
}
```

v3

```go
//+build swipe

package transport

import (
	"github.com/examples/example/pkg/interface/controller"
	"github.com/examples/example/pkg/swipe/swipegokit"
)

func swipe() {
	swipegokit.Gokit(
		swipegokit.HTTPServer(),
		swipegokit.JSONRPCEnable(),
		swipegokit.ClientsEnable([]string{"js"}),

		swipegokit.Interface((*controller.UserControllerIface)(nil), "user", swipegokit.ClientName("user")),
		swipegokit.Interface((*controller.TaskControllerIface)(nil), "task", swipegokit.ClientName("task")),

		swipegokit.MethodDefaultOptions(
			swipegokit.Logging(true),
			swipegokit.Instrumenting(true),
		),
	)
}
```

## Генерация загрузчика настроек

v2 

```go
// +build swipe

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

v3

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

## Генерация имени клиента

В v3 изменилось поведение генерации имен клиентов, 
теперь параметр ns в опции `Interface` не влияет на имя клиента, 
для этого надо использовать опцию `ClientName`.


## Имена сгенерированных файлов

Изменились имена сгенерированных файлов, поэтому 
лучше удалить старые файлы с `_gen`.