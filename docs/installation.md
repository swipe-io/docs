---
id: installation
title: Installation
sidebar_label: Installation
---
### Install the Swipe console utility:

```shell
brew tap swipe-io/swipe
brew install swipe
```

Swipe requires a Go version with [Golang Modules](https://github.com/golang/go/wiki/Modules) support.
So don't forget to initialize the Go module:

```shell
go mod init github.com/my/repo
```

and then install the Swipe package:

```shell
go get github.com/swipe-io/swipe/v2
```

> ⚠️ Warning:
>
> The package version must match
>
> the version of the Swipe console utility.


Swipe generates code using the option: function, which calls functions,
determining parameters of generation.



To describe the generation parameters, create a .go file and add a function,
add a call to `swipe.Build` in the body of the function.

You also need to add the build tag `// + build swipe`,
to have Golang ignore the file when you build your application.

Below is a simple example of a JSON RPC transport generation configuration file:

---

```go
// +build swipe

package transport

import (
    "github.com/example/app/pkg/controller"

    . "github.com/swipe-io/swipe/v2"
)

func Swipe() {
	Build(
		Service(
			HTTPServer(),
		
			Interface((*controller.ExampleController)(nil), ""),

			ClientsEnable([]string{"go"}),

			JSONRPCEnable(),	

			OpenapiEnable(),
			OpenapiOutput("./docs"),
			OpenapiInfo("Service", "Example description.", "v1.0.0"),

			MethodDefaultOptions(
				Logging(true),
				Instrumenting(true),
			),
		),
	)
}
```

---

If you want to generate code, you can run:

```shell
swipe ./pkg/...
```

The above command will search for all functions,
containing `swipe.Build`, and will generate the code in files`* _gen. *`.

---
