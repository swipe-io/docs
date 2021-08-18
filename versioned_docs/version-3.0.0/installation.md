---
id: installation
title: Установка
sidebar_label: Установка
---

Установите консольную утилиту Swipe:

```shell
git clone -b v3 git@github.com:swipe-io/swipe.git
cd swipe/v3 && make
```

Swipe требуется версия Go с поддержкой [Golang Modules](https://github.com/golang/go/wiki/Modules).
Поэтому не забудьте инициализировать модуль Go:

```shell
go mod init github.com/my/repo
```

Утилита swipe генерирует код с использованием плагинов у которых есть настройки. Настройки организованы на основе патерна  
`options as func`.

У каждого плагина свой набор настроек.

Перед написание файла конфигурации необходимо сненерировать файды настроек, для этого надо выполнить следующую команду:

```shell
swipe3 init
```

Swipe сгенерирует файлы настроек в пакет `<package>/pkg/swipe`.

Для описания параметров генерации создайте файл .go.

- Добавьте тег сборки `// +build swipe`, чтобы Golang игнорировал файл когда вы будете собирать ваше приложение.
- Добавьте функцию с любым именем, можно использовать не экспортируемое имя
- В тело функции добавьте вызов функции плагина, например `swipegokit.Gokit(opts ...GokitOption)`. 

Ниже представлен простой пример файла настройки генерации JSON RPC транспорта:

---
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
---
Если вы хотите сгенерировать код, вы можете запустить:

```shell
swipe3 gen ./pkg/...
```