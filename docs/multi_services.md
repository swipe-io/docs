---
id: multi_services
title: Несколько контроллеров в приложении
sidebar_label: Несколько контроллеров в приложении
---

Для того чтобы использовать несколько контроллеров в 
одном сервисе необходимо добавить вторую функцию `Interface`.

:::info
Модно использовать любое количество функций `Interface` для добавления любого числа контроллеров.
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
            Interface((*controller.UserController)(nil), "users"),
            Interface((*controller.GroupController)(nil), "groups"),
            
            HTTPServer(),          
        ),
    )
}
```

Пространство имен указанное во втором параметре функции `Interface` для REST определяет префикс пути `/users`,
а для JSON RPC имя сервиса `user.Get`.

:::warning
Если вы используете несколько контроллеров, 
то второй параметр функции `Interface` определяющий пространство имен, обязателен. 
:::


