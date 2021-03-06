---
id: config
title: Generating the settings loader
sidebar_label: Generating the settings loader
---
## Beginning

Swipe has the ability to generate loading of settings from environment variables:

Configuration structure:

```go
package example

type Config struct {
    Database Database
}

type Database struct {
    Host string
    Username string
    Password string
}
```

Swipe settings file:

```go
package example

import (
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    swipe.Build(
		ConfigEnv(&Config{}),
	)
}
```

Swipe will generate a download function `func LoadConfig() (cfg *Config, errs []error)`

## Settings

Changing the name of the loading method:

```go
package example

import (
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    swipe.Build(
		ConfigEnv(
		    &Config{},
		    ConfigEnvFuncName("MyNameFunc"),
		),
	)
}
```

Generating markdown documentation:

```go
package example

import (
  . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
    swipe.Build(
		ConfigEnv(
		    &Config{},
		    ConfigEnvDocEnable(),
		    ConfigEnvDocOutput("./docs")
		),
	)
}
```

## Structure tags

Swipe uses idiomatic defaults to generate environment variable names from Go field names.
To override the default values, use the following optional structure field tags:


| Tag | Description |
| - | - |
| env:"env_name" | Replace the default environment variable name. |
| env:",required" | Required field, empty values are not allowed |
| env:",required,use_zero" | Required field, empty values are allowed |

> ℹ️ info
>
> The environment variable is generated in uppercase,
>
> the nested fields of the structure are separated by `_`.

---
