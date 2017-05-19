# ts-mox

## Installation
To install this, run 
```
npm install --save-dev ts-mox

// or alternatively

yarn add -D ts-mox
```
## Why

When I was programming in Java, thanks to dependency injection, we could easily unit test classes by passing mock dependencies to their constructors. I use dependency injection in typescript too, with the typescript-ioc library. The problem is, there is no easy way to create mocks like you can in Java without writing a lot of boiler plate code, so that's why I created ts-mox. The idea is that you can easily create an objet with the correct type, that has all the functions and properties of the class, except all the functions return null by default and the properties are null by default (you can just reassign these according to your needs).

## Docs

Currently the only feature available is to create a mock instance of a class.

```typescript
// Assume we have a class like this
class Foo {

    constructor() {
    }

    public fooAction(): string {
        return "fooAction";
    }
}

// Another class that has a Foo dependency
class Bar {

    constructor(@Inject private foo:Foo) {
    }

    public barAction(): object {
        return {
            property: this.foo.fooAction();
        }
    }
}

// When we want to unit test Bar, we can easily do

describe('Bar', () => {
    let foo:Foo;
    let classUnderTest:Bar;

    beforeEach(() => {
        foo:Foo = Mox.createMock<Foo>(Foo);
        classUnderTest = new Bar(foo);
    });

    describe('barAction', () => {
        if('should return an object with property', () => {
            const mockReturn = "someMockReturn";
            foo.fooAction = () => mockReturn; 

            const actual = classUnderTest.barAction();
            expect(actual.property).to.equal(mockReturn);
        });

        // If you want to do some verifies or stuff with sinon, you can do this too:

        f('should return an object with property', () => {
            const mockReturn = "someMockReturn";
            const fooMock = sinon.mock(foo);
            fooMock.expects("fooAction").returns(mockReturn);
            const actual = classUnderTest.barAction();
            fooMock.verify();
            expect(actual.property).to.equal(mockReturn);
        });
    });

});

```

Feel free to do pull requests or ask for more features.