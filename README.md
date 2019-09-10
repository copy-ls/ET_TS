
原开源：https://github.com/egametang/ET

# 1. Type: new()=>any 
类 和 对象的constructor 为type的一种体现
example:
```
    class A{
    }   
    const a = new A();
    //true
    if(a.constructor === A){
    }
    const a1 = new a.constructor();
    //true
    if(a1.constructor === A){
    }
```
