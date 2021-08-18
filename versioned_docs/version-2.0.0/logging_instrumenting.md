---
id: logging_instrumenting
title: Метрики и логирование
sidebar_label: Метрики и логирование
---

## Логирование

Для того, чтобы включить генерацию мидлвара логирования, необходимо использовать функцию `Logging`.

Пример включающий логирование для всех методов:

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
            
            MethodDefaultOptions(			
				Logging(true),
			),           			
        ),
    )
}
```

### Отключение логирование для определенного метода

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
				Logging(false),
			),           			
        ),
    )
}
```

### Отключение логирование для определенный параметров метода

Для исключения или включения параметра метода в логирование необходимо использовать функцию `LoggingParams` где
первый параметр это `includes`, а второй `excludes`.

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
				LoggingParams([]string{}, []string{"password"}), // выключает логирование параметра password
			),           			
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
  
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    Build(
        Service(
            Interface((*controller.UserController)(nil), ""),
            
            HTTPServer(),
            
            MethodOptions(controller.UserController.Get,			
				LoggingContext(log.RequestIDLogContextKey, "requestID"),
			),           			
        ),
    )
}
```

## Метрики

Генерация сбора метрик доступна только с использованием [Prometheus](http://prometheus.io/) 

:::info
Генерируется сбор только количества запросов и время выполнения метода.  
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
            
            MethodDefaultOptions(			
			    Instrumenting(true),
			),           			
        ),
    )
}
```
