---
id: multi_services
title: Несколько интерфейсов в сервисе
sidebar_label: Несколько интерфейсов в сервисе
---

Для того чтобы использовать несколько интерфейсов в 
одном сервисе необходимо добавить вторую функцию `Interface`.

:::info
Можно использовать любое количество функций `Interface`.
:::

```go
// +build swipe

package example

import (
  "github.com/example/app/pkg/controller"  
  "github.com/example/app/pkg/swipe/swipegokit"
)

func swipe() {
    swipegokit.Gokit(
        Interface((*controller.UserController)(nil), "users"),
        Interface((*controller.GroupController)(nil), "groups"),
        
        HTTPServer(),          
    )
}
```

Пространство имен указанное во втором параметре функции `Interface` для REST определяет префикс пути `/users`,
а для JSON RPC имя сервиса `user.Get`.