---
id: rest
title: REST API
sidebar_label: REST API
---

## Основные

### Включение генерации транспорта REST

По умолчанию Swipe генерирует REST транспорт.

Для генерации достаточно добавить такие настройки:

```go
package example

import (
  "github.com/example/app/pkg/controller"
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
        ),
    )
}
```

Swipe сгенерирует методы транспорта для всех экспортируемых методов.

:::info
Swipe автоматически определяет метод HTTP, если параметры метода не перенаправлены 
на параметры запроса, заголовки или в путь REST то будет использоваться метод POST иначе GET. 
:::

Swipe может генерировать документацию Openapi (Swagger) подробно про это рассказано в 
разделе [Openapi (Swagger) документации](docs/openapi)

## Настройки

Вы можете управлять генерацией методов, например исключить метод из генерации в транспорте,
перенаправить параметры на параметры запроса, заголовки или путь REST, изменить HTTP метод.

### Изменение настроек метода

Для того, чтобы изменить настройки метода необходимо, использовать функцию `MethodOptions`

```go
package example

import (
  "http"
    
  "github.com/example/app/pkg/controller"
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
            
            MethodOptions(controller.UserController.Get,
                 RESTMethod(http.MethodPost), // у всех метода Get будет HTTP метод POST.
            )
        ),
    )
}
```

### Изменение настроек по умолчанию для всех методов

Для того, чтобы изменить настройки по умолчанию для всех методов, необходимо использовать функцию `MethodDefaultOptions`

```go
package example

import (
  "http"
    
  "github.com/example/app/pkg/controller"
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
            
            MethodDefaultOptions(
                 RESTMethod(http.MethodPost), // у всех методов будет HTTP метод POST. 
            )
        ),
    )
}
```

### Изменение HTTP метода

Устанавливает HTTP метод.

```go
package example

import (
  "github.com/example/app/pkg/controller"
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
            
            MethodOptions(controller.UserController.Get,
                 RESTMethod(http.MethodPost), // у всех метода Get будет HTTP метод POST.
            )
        ),
    )
}
```

### Изменение HTTP пути

Устанавливает HTTP путь, по умолчанию используется имя метода интерфейса в нижнем регистре, например:

- для Get будет путь `/get`
- для GetByID будет путь `/getbyid`

```go
package example

import (
  "github.com/example/app/pkg/controller"
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
            
            MethodOptions(controller.UserController.Get,
                 RESTPath("/users"), // у метода Get будет путь /users.
            )
        ),
    )
}
```

### Привязки значений из HTTP заголовка к параметру метода.

Используется для привязки значений из HTTP заголовка к параметру метода.

Например если необходимо использовать заголовок `X-Request-ID` в параметре метода `requestID`:

:::info
Параметры указываются в виде массива, где пара значений представляет собой имя HTTP заголовка и параметра метода.
:::

```go
package example

import (
  "github.com/example/app/pkg/controller"
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
            
            MethodOptions(controller.UserController.Get,
                RESTHeaderVars([]string{"X-Request-ID", "requestID"}),
            )
        ),
    )
}
```

### Привязка значений из параметров HTTP запроса к параметру метода

Используется для привязки значений из параметров HTTP запроса к параметру метода.

Например если необходимо использовать параметр запроса `sort` в параметре метода `sort`:

:::info
Параметры указываются в виде массива, где пара значений представляет собой имя параметра HTTP запроса и метода.
:::

```go
package example

import (
  "github.com/example/app/pkg/controller"
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
            
            MethodOptions(controller.UserController.Get,
                RESTHeaderVars([]string{"X-Request-ID", "requestID"}),
            )
        ),
    )
}
```

### Оборачивание REST ответа в объект 

Используется для того, чтобы обернуть ответ в объект.

Например у вас есть метод интерфейса `Get() (User, error)` и вам необходимо чтобы 
содержимое полей структуры `User` было внутри поля `data` 

```go
package example

import (
  "github.com/example/app/pkg/controller"
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
            
            MethodOptions(controller.UserController.Get,
                RESTWrapResponse("data"),
            )
        ),
    )
}
```

В ответ будет JSON такого вида:

```json
{
  "data": {
    "firstName": "",
    "lastName": ""
  }
}
```
