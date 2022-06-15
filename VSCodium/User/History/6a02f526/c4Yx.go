package main 

import (
  "fmt"
)

const (
  _ = iota
    a
    b
    c
)

func main() { 
  const a = 42;
  var b int64 = 23
  fmt.Printf("%v\n",a + b );
}

