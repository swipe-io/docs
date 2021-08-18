---
id: openapi
title: Openapi (Swagger) документации
sidebar_label: Openapi (Swagger) документации
---

## Основные

Для того, чтобы включит генерацию Openapi документации, необходимо использовать функцию `OpenapiEnable`.  

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
            
            OpenapiEnable(),           			
        ),
    )
}
```

Документация будет сгенерирована в корень проекта.

## Настройки

### Изменение пути генерации

Для того, чтобы изменить путь генерации Openapi документации, необходимо использовать функцию `OpenapiOutput`.

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
            
            OpenapiEnable(),       
            OpenapiOutput("./docs") // путь указывается относительно корня проекта.    			
        ),
    )
}
```

### Установка информации

Вы можете установить заголовок, описание и версию с помощью функции `OpenapiInfo`.

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
            
            OpenapiEnable(),       
            OpenapiInfo("Service Name", "Service description", "v1.0.0"),    			
        ),
    )
}
```

### Установка контактов

Вы можете установить контакты, с помощью функции `OpenapiContact`.

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
            
            OpenapiEnable(),       
            OpenapiContact("John Doe", "jd@mail.com", "jd.com"),
            OpenapiContact("No Name", "no@mail.com", ""),    			
        ),
    )
}
```

### Установка информации о серверах

Вы можете установить информацию о серверах, с помощью функции `OpenapiServer`.

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
            
            OpenapiEnable(),       
            OpenapiServer("Test API", "http://api.test.com"),
            OpenapiServer("Dev API", "http://api.dev.com"),    			
        ),
    )
}
```
