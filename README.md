<h1 align="center">Ramda Suggest</h1>
<h3 align="center">🐏 🤔</h3>

<p align="center">
<b><a href="#usage">Usage</a></b>
|
<b><a href="#non-primitive-inputs-">Non-Primitive Inputs</a></b>
|
<b><a href="#function-outputs-">Functions as Outputs</a></b>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ramda-suggest"><img src="https://badge.fury.io/js/ramda-suggest.svg"></a>
  <a href="https://github.com/domtronn/ramda-suggest/releases"><img src="https://img.shields.io/github/tag/domtronn/ramda-suggest"></a>
  <a href="https://github.com/domtronn/ramda-suggest/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"></a>
</p>


This is a library inspired
by [`suggest.el`](https://github.com/Wilfred/suggest.el) and the
constant _(valid)_ feedback I get from people new
to [**Ramda**](ramdajs.com/docs/)...

> *_"How do you know what the Ramda function is called?!"_* - 🤔

> *_"I know what I want to do, but how do I do it?!"_* - 😫

> *_"Why do the arguments for compose go right to left...?"_* - 🙃

So this tool will _(hopefully)_ suggest a function in Ramda, you can
use to produce your desired output! For example,

```js
// Given:   [1, 2, 3, 4, 5]
// Desired: 15

R.sum([1, 2, 3, 4, 5]) = 15
```

#### Usage

Install this package in the typical way; 

```sh
npm install -g ramda-suggest

ramda-suggest true

# T  [type:Function] : R.T() → true
# 
#  A function that always returns `true`. Any passed in parameters are ignored.
# 
#  param 1: {*} 
#  returns: {Boolean}
```


```sh
ramda-suggest 42 41

# dec  [type:Math] : R.dec(42) → 41
# 
#  Decrements its argument.
# 
#  param 1: {Number} n
#  returns: {Number} n - 1
```

### Non-Primitive Inputs 🐵
##### _Be Warned!_ ⚠️

The easiest way allow inputs of things other that just primitive
JavaScript data types _(i.e. Arrays, Objects, Functions)_ was to
use [`eval`](https://www.w3schools.com/jsref/jsref_eval.asp).

This will cast Strings that _look_ like Arrays into Arrays! However,
bear in mind that `eval` will just evaluate whatever **you** pass in
in the following formats;

###### _Strings_
```sh
ramda-suggest foo bar foobar

# concat  [type:List] : R.concat("foo", "bar") → foobar
# 
#  Returns the result of concatenating the given lists or strings.
#  Note: `R.concat` expects both arguments to be of the same type,
#  unlike the native `Array.prototype.concat` method. It will throw
#  an error if you `concat` an Array with a non-Array value.
#  Dispatches to the `concat` method of the first argument, if present.
# 
#  param 1: {Array|String} firstList The first list, param 2: {Array|String} secondList...
#  returns: {Array|String} A list consisting of the elements of `firstList` followed by...
```

###### _Objects_
```sh
ramda-suggest a '{a:1,b:2,c:3}' '{b:2,c3:}'

# dissoc [category:Object]
# 
#     R: R.dissoc("a", {"a":1,"b":2,"c":3}) → {"b":2,"c":3}
#     λ: String → {k: v} → {k: v}
# 
#  Returns a new object that does not contain a prop property.
# 
#  param 1: {String} prop The name of the property to dissociate
#  param 2: {Object} obj The object to clone
#  returns: {Object} A new object equivalent to the original but without the specified property
```

_Note that Objects **must** be passed in as string - i.e. wrapped in quotes - This is a
limitation of how Node parses command line args._

###### _Arrays_
```sh
ramda-suggest [1,2,3,4,5] 15
ramda-suggest '[1, 2, 3, 4, 5]' 15

# sum  [type:Math] : R.sum([1,2,3,4,5]) → 15
# 
#  Adds together all the elements of a list.
# 
#  param 1: {Array} list An array of numbers
#  returns: {Number} The sum of all the numbers in the list.
```

###### _Functions_
Functions _must_ be placed inside strings
```sh 
ramda-suggest '(a, b) => a + b' 0 [1,2,3,4] 10

# reduce  [type:List] : R.reduce((a, b) => a + b, 0, [1,2,3,4]) → 10
# 
#  /*
#  ...docs...
#  */
# 
#  param 1: {Function} fn The iterator function. Receives two values, the accumulator and the, param 2: {*} acc The accumulator value., param 3: {Array} list The list to iterate over.
#  returns: {*} The final, accumulated value.
```

### Function Outputs 🙊

A lot of the time, **Ramda** will return a _function_ rather than
actual output - You can also test these in the same way you would pass
in functions as arguments! _e.g._

```sh
ramda-suggest '(a) => a + 5' '() => 10' '() => 15'

# compose [category:Function]
# 
#     R: R.compose((a) => a + 5, () => 10) → () => 15
#     λ: ((y → z), (x → y), ..., (o → p), ((a, b, ..., n) → o)) → ((a, b, ..., n) → z)
# 
#  Performs right-to-left function composition. The rightmost function may have
#  any arity; the remaining functions must be unary.
# 
#  param 1: {...Function} ...functions The functions to compose
#  returns: {Function}
```

###### _Complex output functions_

For output functions which **take arguments**, you should pass them in
using the following format;

```js
("value_1", "value_2") => "return_string"
```

This will define an **output** function which when called with the **2**
arguments, `"value_1"` & `"value_2"` _(both strings)_ expects the
**return** to be `"return_string"`.

```sh
ramda-suggest '(a) => a + 2' '(a) => a * 2' '(5) => 12'

# compose [category:Function]
# 
#     R: R.compose((a) => a + 2, (a) => a * 2) → (a: 5) => 12
#     λ: ((y → z), (x → y), ..., (o → p), ((a, b, ..., n) → o)) → ((a, b, ..., n) → z)
# 
#  Performs right-to-left function composition. The rightmost function may have
#  any arity; the remaining functions must be unary.
# 
#  param 1: {...Function} ...functions The functions to compose
#  returns: {Function}
```

In the above example, you have two functions which take arguments, and
when composed together basiaclly perform `(a) => (a * 2) + 2`, in this
case, we would expect that when we call the returned function with a
value of `5`, we should get `12` out.

This would also work with the _following_ examples

* `ramda-suggest '(a) => a + 2' '(a) => a * 2' '(10) => 22'`
* `ramda-suggest '(a) => a + 2' '(a) => a * 2' '(100) => 202'`
* `ramda-suggest '(a) => a + 2' '(a) => a * 2' '(2) => 6'`

###### _Complexer outputer functionser_

You can also use other _primtive types_ as return values from your
output functions, for example

```sh
ramda-suggest '(a) => [a, 2]' '(a) => a * 2' '(100) => [200, 2]'
 
# compose [category:Function]
# 
#     R: R.compose((a) => [a, 2], (a) => a * 2) → (a: 100) => [200,2]
#     λ: ((y → z), (x → y), ..., (o → p), ((a, b, ..., n) → o)) → ((a, b, ..., n) → z)
# 
#  Performs right-to-left function composition. The rightmost function may have
#  any arity; the remaining functions must be unary.
# 
#  param 1: {...Function} ...functions The functions to compose
#  returns: {Function}
```

[▲ back to top](#readme)
