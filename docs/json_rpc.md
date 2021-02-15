---
id: json_rpc
title: JSON RPC
sidebar_label: JSON RPC
---

## Основные

### Включения генерации транспорта JSON RPC

Для включения генерации JSON RPC достаточно добавить в настройки функцию `JSONRPCEnable`:

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
            
            JSONRPCEnable(),			
        ),
    )
}
```

Swipe сгенерирует методы транспорта для всех экспортируемых методов.

Swipe может генерировать документацию Openapi (Swagger) подробно 
про это рассказано в разделе [Openapi (Swagger) документации](docs/openapi)

## Настройки

Вы можете управлять генерацией методов, например исключить метод из генерации в транспорте.

### Включение генерации markdown документации

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
            
            JSONRPCEnable(),
            JSONRPCDocEnable(),
            JSONRPCDocOutput("./docs"),			
        ),
    )
}
```

Путь в `JSONRPCDocOutput` указывается относительно корня приложения.

### Изменение пути HTTP

Вы можете изменить путь HTTP на который будут отправлять запросы:

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
            
            JSONRPCEnable(),
            JSONRPCPath("/rpc"),           			
        ),
    )
}
```
