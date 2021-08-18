---
id: errors
title: Ошибки API
sidebar_label: Ошибки API
---

Swipe умеет анализировать код, и находить ошибки которые 
возвращают функции или методы.

Поддерживается работа с двумя типами ошибок, HTTP и JSON RPC.

Если вы используете REST API, то ошибка должна имплементировать интерфейс:

```go
interface {
    StatusCode() int
    Error() string
}
```

`StatusCodec` должен возвращать HTTP код ошибки.

Если у вас JSON RPC:

```go
interface {
    ErrorCode() int
    Error() string
}
```

`StatusCodec` должен возвращать код ошибки JSON RPC.

Так же эти ошибки будут показаны в Openapi документации 
если у вас включена их генерация.