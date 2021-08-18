---
id: client
title: Генерация клиента REST и JSON RPC 
sidebar_label: Генерация клиента REST и JSON RPC
---

## Генерация клиента

Вы можете сгенерировать Golang клиента для JSON RPC и REST, 
JavaScript клиента для JSON RPC.

`ClientsEnable` включает генерацию.

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
        
        swipegokit.ClientsEnable([]string{"go"}),
        
        swipegokit.JSONRPCEnable(),       
    )
}
```

- go включает генерацию для Golang
- js включает генерация для JavaScript


:::info
Если не включать генерацию серверной части удалив `swipegokit.HTTPServer()`
то на основе интерфейса сгенерируется только клиент.
:::

## Изменение имени клиента

`ClientName` используется для того, чтобы изменить имя клиента.

:::info
По умолчанию имя клиента генерируется на основе имени интерфейса.
:::

```go
package example

import (
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func swipe() {
    swipegokit.Gokit(
        swipegokit.Interface(
            (*controller.ExampleController)(nil), 
            "example",
            swipegokit.ClientName("example"), // будет использовано имя Example вместо ExampleController 
        ),
        
        swipegokit.HTTPServer(),
        
        swipegokit.ClientsEnable([]string{"go"}),
        
        swipegokit.JSONRPCEnable(),       
    )
}
```

## Собственная функция для кодирования запроса.

`ClientEncodeRequest` используется для установки функции кодирования запроса.

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
                    
        swipegokit.JSONRPCEnable(),   
        
        swipegokit.MethodOptions(controller.ExampleController.Get,
            swipegokit.ClientEncodeRequest(youpkg.FuncName),
        ),
    )
}
```

Более подробно смотрите документацию [Gokit](https://gokit.io/).

## Собственная функция для раскодировки ответа.

`ClientEncodeRequest` используется для установки функции раскодировки ответа.

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
                    
        swipegokit.JSONRPCEnable(),   
        
        swipegokit.MethodOptions(controller.ExampleController.Get,
            swipegokit.ClientDecodeResponse(youpkg.FuncName),
        ),
    )
}
```

Более подробно смотрите документацию [Gokit](https://gokit.io/).