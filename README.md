<h1 align="center">Ramda Suggest</h1>
<h3 align="center">🐏 🤔</h3>

<p align="center">
<b><a href="#usage">Usage</a></b>
|
<b><a href="#non-primitive-inputs-">Non-Primitive Inputs</a></b>
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
> _(**N.B.** This hasn't been published to NPM **yet**...)_

```bash
npm install
npm link
```

This will link a command line tool which can be run in the following
way

```bash
ramda-suggest true

# T  [type:Function] : R.T() → true
# 
#  A function that always returns `true`. Any passed in parameters are ignored.
# 
#  param 1: {*} 
#  returns: {Boolean}
```


```bash
ramda-suggest 42 41

# dec  [type:Math] : R.dec(42) → 41
# 
#  Decrements its argument.
# 
#  param 1: {Number} n
#  returns: {Number} n - 1
```

#### Non-Primitive Inputs 🐵
##### _Be Warned!_ ⚠️

The easiest way allow inputs of things other that just primitive
JavaScript data types _(i.e. Arrays, Objects, Functions)_ was to
use [`eval`](https://www.w3schools.com/jsref/jsref_eval.asp).

This will cast Strings that _look_ like Arrays into Arrays! However,
bear in mind that `eval` will just evaluate whatever **you** pass in
in the following formats;

###### _Strings_
```bash
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

###### _Arrays_
```bash
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
```bash 
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
[▲ back to top](#readme)
