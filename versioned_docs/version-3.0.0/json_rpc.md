---
id: json_rpc
title: JSON RPC
sidebar_label: JSON RPC
---

## Основные

### Включения генерации транспорта JSON RPC

Для включения генерации JSON RPC достаточно добавить в настройки функцию `HTTPServer` и `JSONRPCEnable`:

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
    )
}
```

Swipe сгенерирует методы транспорта для всех экспортируемых методов.

Swipe может генерировать документацию Openapi (Swagger) подробно 
про это рассказано в разделе [Openapi (Swagger) документации](/docs/openapi)

## Настройки

Вы можете управлять генерацией методов, например исключить метод из генерации в транспорте.

### Включение генерации markdown документации

`JSONRPCDocEnable` используется для включения генерации markdown документации.

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
        swipegokit.JSONRPCDocEnable(),
        swipegokit.JSONRPCDocOutput("./docs"),
    )
}
```

`JSONRPCDocOutput` устанавливает путь, куда сгенерируется документация относительно корня приложения. 

### Изменение пути JSON RPC

`JSONRPCPath` меняет HTTP путь JSON RPC.

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
        swipegokit.JSONRPCPath("/rpc"),
    )
}
```

Теперь все запросы JSON RPC необходимо слать на `http://hosname/rpc`.