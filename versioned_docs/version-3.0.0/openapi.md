---
id: openapi
title: Openapi (Swagger) документации
sidebar_label: Openapi (Swagger) документации
---

## Основные

`OpenapiEnable` используется для включения генерации Openapi документации.  

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
        
        swipegokit.OpenapiEnable(),
    )
}
```

Документация будет сгенерирована в корень проекта.

## Настройки

### Изменение пути генерации

`OpenapiOutput` используется для изменения пути генерации Openapi документации.

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
        
        swipegokit.OpenapiEnable(),       
        swipegokit.OpenapiOutput("./docs") // путь указывается относительно корня проекта.    			
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
            Interface((*controller.ExampleController)(nil), "example"),
            
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
            Interface((*controller.ExampleController)(nil), "example"),
            
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
            Interface((*controller.ExampleController)(nil), "example"),
            
            HTTPServer(),
            
            OpenapiEnable(),       
            OpenapiServer("Test API", "http://api.test.com"),
            OpenapiServer("Dev API", "http://api.dev.com"),    			
        ),
    )
}
```
