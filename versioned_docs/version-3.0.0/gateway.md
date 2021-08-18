---
id: gateway
title: Gateway
sidebar_label: Gateway
---

Swipe можно использовать для генерации Gateway.

Для того чтобы указать swipe, что для интерфейса 
необходимо сгенерировать gateway надо указать опцию `Gateway` в `Interface`

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
            swipegokit.Gateway(),
        ),
        
        swipegokit.HTTPServer(),
        
        swipegokit.JSONRPCEnable(),
        swipegokit.JSONRPCPath("/rpc"),
    )
}
```

В данном примере swipe сгенерирует серверную часть 
на основе интерфейса, но в качестве имплементации 
нужно будет передать определенные настройки:

```go
import "github.com/go-kit/kit/sd"

type ExampleOption struct {
	Instancer          sd.Instancer
	Factory            func(string) (ExampleInterface, error)
	Create             EndpointOption
}

type EndpointOption struct {
	Balancer     BalancerFactory
	RetryMax     int
	RetryTimeout time.Duration
}
```

- `Instancer` - интерфейс из пакета `github.com/go-kit/kit/sd`,
если не нужна ни какая балансировка то достаточно будет использовать
`sd.FixedInstancer`

- `Factory` - фабрика создания экземпляра интерфейса, 
в данном примере это `ExampleInterface` 

- `Create` - опции для метода
  - `Balancer` - тип балансировки если используется 
    не `sd.FixedInstancer`, по умолчанию используется `github.com/go-kit/kit/sd/lb.NewRoundRobin`     
  - `RetryMax` - кол-во повторных запросов при возникновении ошибки
  - `RetryTimeout` - таймаут повторного запроса

