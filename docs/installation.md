---
id: installation
title: Установка
sidebar_label: Установка
---

Установите консольную утилиту Swipe:

```shell
brew tap swipe-io/swipe
brew install swipe
```

Swipe требуется версия Go с поддержкой [Golang Modules](https://github.com/golang/go/wiki/Modules).
Поэтому не забудьте инициализировать модуль Go:

```shell
go mod init github.com/my/repo
```

а затем установите пакет Swipe:

```shell
go get github.com/swipe-io/swipe/v2
```

:::warning
Версия пакета должна соответствовать версии консольной утилиты Swipe.
:::


Swipe генерирует код с использованием опции: функции, которая вызывает функции, 
определяющие параметры генерации.

Для описания параметров генерации создайте файл .go и добавьте функцию, 
в тело функции добавьте вызов `swipe.Build`. 
Также необходимо добавить тег сборки `// +build swipe`, 
чтобы Golang игнорировал файл когда вы будете собирать ваше приложение.

Ниже представлен простой пример файла настройки генерации JSON RPC транспорта:

---
```go
// +build swipe

package transport

import (
    "github.com/example/app/pkg/controller"

    . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
	Build(
		Service(
			HTTPServer(),
			
			Interface((*controller.ExampleController)(nil), ""),

			ClientsEnable([]string{"go"}),

			JSONRPCEnable(),		

			OpenapiEnable(),
			OpenapiOutput("./docs"),
			OpenapiInfo("Service", "Example description.", "v1.0.0"),

			MethodDefaultOptions(
				Logging(true),
				Instrumenting(true),
			),
		),
	)
}
```
---
Если вы хотите сгенерировать код, вы можете запустить:

```shell
swipe ./pkg/...
```

Приведенная выше команда выполнит поиск всех функций, 
содержащих `swipe.Build`, и сгенерирует код в файлах` * _gen. * `.
