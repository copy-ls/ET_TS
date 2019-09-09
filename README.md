
原开源：https://github.com/egametang/ET

1. Type: new()=>any
类 和 对象的constructor 为type的一种体现
exp:
    class A{}
    const a = new A();
    const a1 = new a.constructor();
(a.constructor === A)为true
(a1.constructor === A)为true