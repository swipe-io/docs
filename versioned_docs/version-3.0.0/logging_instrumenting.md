---
id: logging_instrumenting
title: Метрики и логирование
sidebar_label: Метрики и логирование
---

## Логирование

Для того чтобы включить генерацию `middleware` логирования, 
необходимо использовать функцию `Logging`.

Пример включающий логирование для всех методов:

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
        
        swipegokit.MethodDefaultOptions(			
            swipegokit.Logging(true),
        ),
    )
}
```

### Отключение логирование для определенного метода

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
            swipegokit.Logging(false),
        ),           			
    )
}
```

### Отключение логирование для определенный параметров метода

`LoggingParams` используется для исключения или включения 
параметра метода в логирование.

Параметры:

- `includes` включение параметра в логирование.
- `excludes` исключение параметра из логирования.

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
            swipegokit.LoggingParams([]string{}, []string{"password"}), // выключает логирование параметра password
        ),
    )
}
```

### Добавление в логирование параметра из контекста

```go
package log

import (
	"context"
	"net/http"
)

type ContextKey string

const (
	RequestIDLogContextKey ContextKey = "request_id"
)

func PopulateContext(ctx context.Context, r *http.Request) context.Context {
	for k, v := range map[ContextKey]string{
		RequestIDLogContextKey: r.Header.Get("X-Request-Id"),
	} {
		ctx = context.WithValue(ctx, k, v)
	}
	return ctx
}
```

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
            swipegokit.LoggingContext(log.RequestIDLogContextKey, "requestID"),
        ),
    )
}
```

### Логирование ошибки

Вы можете логировать ошибку, а клиенту отправить другое сообщение.
Для этого необходимо имплементировать интерфейс `interface{ LogError() error }` для типа `error`.

```go
package example

type SomeError struct {
    Err error
    Message string
}

func (e *SomeError) LogError() error {
  return e.Err
}

func (e *SomeError) Error() string {
    return e.Message
}

func (e *SomeError) StatusCode() int {
    return 400
}
```

Более подробно в разделе про [Ошибки API](/docs/errors) 
## Метрики

Генерация сбора метрик доступна только с использованием [Prometheus](http://prometheus.io/) 

:::info
Генерируется сбор только количества успешных/не успешных запросов и время выполнения метода.  
:::

```go
package example

import (
  "github.com/example/app/pkg/controller"
  "github.com/example/app/pkg/swipe/swipegokit"
)

func swipe() {
    swipegokit.Gokit(
        Interface((*controller.ExampleController)(nil), "example"),
        
        HTTPServer(),
        
        MethodDefaultOptions(			
            Instrumenting(true),
        ),
    )
}
```

