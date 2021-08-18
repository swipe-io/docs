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
  "github.com/example/app/pkg/swipe/swipegokit"
)

func swipe() {
    swipegokit.Gokit(
        swipegokit.Interface((*controller.ExampleController)(nil), "example"),

        swipegokit.HTTPServer(),       
    )
}

```

Swipe сгенерирует методы транспорта для всех экспортируемых методов.

:::info
Swipe автоматически определяет метод HTTP.
:::

:::info
Если параметры метода не перенаправлены на параметры запроса, заголовки или в путь REST то будет использоваться метод POST иначе GET. 
:::

Swipe может генерировать документацию Openapi (Swagger) подробно про это рассказано в 
разделе [Openapi (Swagger) документации](/docs/openapi)

## Настройки

Вы можете управлять генерацией методов, например исключить метод из генерации в транспорте,
перенаправить параметры на параметры запроса, заголовки или путь REST, изменить HTTP метод.

### Изменение настроек метода

Для того чтобы изменить настройки метода, необходимо использовать функцию `MethodOptions`

```go
package example

import (
  "http"
    
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func swipe() {
    swipegokit.Gokit(
        swipegokit.Interface((*controller.ExampleController)(nil), "example"),
                
        swipegokit.HTTPServer(),
        
        swipegokit.MethodOptions(controller.ExampleController.Get,
             swipegokit.RESTMethod(http.MethodPost), // у метода Get будет HTTP метод POST.
        ),
    )
}
```

### Изменение настроек по умолчанию для всех методов

Для того чтобы изменить настройки, по умолчанию для всех методов, необходимо использовать функцию `MethodDefaultOptions`

```go
package example

import (
  "http"
    
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit" 
)

func Swipe() {
    swipegokit.Gokit(
        swipegokit.Interface((*controller.ExampleController)(nil), "example"),
        
        swipegokit.HTTPServer(),
        
        swipegokit.MethodDefaultOptions(
             swipegokit.RESTMethod(http.MethodPost), // у всех методов будет HTTP метод POST. 
        ),
    )
}
```

### Изменение HTTP метода

`RESTMethod` устанавливает HTTP метод.

```go
package example

import (
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func swipe() {
    swipegokit.Gokit(
        swipegokit.Interface((*controller.ExampleController)(nil), "example"),
        
        swipegokit.HTTPServer(),
        
        swipegokit.MethodOptions(controller.ExampleController.Get,
             swipegokit.RESTMethod(http.MethodPost), // у всех метода Get будет HTTP метод POST.
        ),
    )
}
```

### Изменение HTTP пути

`RESTPath` устанавливает HTTP путь, по умолчанию используется имя метода интерфейса в нижнем регистре, например:

- для Get будет путь `/get`
- для GetByID будет путь `/getbyid`

```go
package example

import (
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func Swipe() {
    swipegokit.Gokit(
        swipegokit.Interface((*controller.ExampleController)(nil), "example"),
        
        swipegokit.HTTPServer(),
        
        swipegokit.MethodOptions(controller.ExampleController.Get,
             swipegokit.RESTPath("/users"), // у метода Get будет путь /users.
        ),      
    )
}
```

### Привязки значений из HTTP заголовка к параметру метода.

`RESTHeaderVars` используется для привязки значений из HTTP заголовка к параметру метода.

Например, если необходимо использовать заголовок `X-Request-ID` в параметре метода `requestID`:

:::info
Параметры указываются в виде массива, где пара значений представляет собой параметр метода и имя HTTP заголовка.
:::

```go
package example

import (
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func Swipe() {
    swipegokit.Gokit(
        swipegokit.Interface((*controller.ExampleController)(nil), "example"),
        
        swipegokit.HTTPServer(),
        
        swipegokit.MethodOptions(controller.ExampleController.Get,
            swipegokit.RESTHeaderVars([]string{"requestID", "X-Request-ID"}),
        )
    )
}
```

### Привязка значений из параметров HTTP запроса к параметру метода

`RESTQueryVars` используется для привязки значений из параметров HTTP запроса (query params) к параметру метода.

Например, если необходимо использовать параметр запроса `sort` в параметре метода `sortBy`:

:::info
Параметры указываются в виде массива, где пара значений представляет собой имя параметра метода и параметр HTTP запроса ([]string{"sortBy", "sort"}).
:::

```go
package example

import (
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func Swipe() {
    swipegokit.Gokit(
        swipegokit.Interface((*controller.ExampleController)(nil), "example"),
        
        swipegokit.HTTPServer(),
        
        swipegokit.MethodOptions(controller.ExampleController.Get,
            swipegokit.RESTHeaderVars([]string{"sortBy", "sort"}),
        ),
    )
}
```

### Оборачивание REST ответа в объект 

`RESTWrapResponse` используется для того, чтобы обернуть ответ в объект.

:::info
Можно указать путь в виде json path для того, чтобы сделать вложенность (`a.b.c => {"a": {"b": {"c": "<you value>"}}}`).
:::

Например, у вас есть метод интерфейса `Get() (User, error)` и вам необходимо чтобы 
содержимое полей структуры `User` было внутри поля `data` 

```go
package example

import (
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func Swipe() {
    swipegokit.Gokit(
        Interface((*controller.ExampleController)(nil), "example"),
        
        HTTPServer(),
        
        MethodOptions(controller.ExampleController.Get,
            RESTWrapResponse("data"),
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


### Загрузка файла

`RESTMultipart` используется для того, чтобы использовать метод для загрузки файла средствами HTTP multipart form.

В параметре указывается максимальный размер передаваемых данных в байтах.

Тип параметра, который будет получать файл должен имплементировать интерфейс:

```go
interface {
    Name() string
    io.ReadCloser
}
```

```go
package example

import (
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func Swipe() {
    swipegokit.Gokit(
        Interface((*controller.ExampleController)(nil), "example"),
        
        HTTPServer(),
        
        MethodOptions(controller.ExampleController.Upload,
            swipegokit.RESTMultipart(134217728),
        ),
    )
}
```