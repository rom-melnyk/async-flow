# Async data flow experiments

## Promise way

**File:** `promise.js`

**Run:** `node promise.js`

## async/await way

**File:** `async-await.js`

**Run:** `node --harmony-async-await async-await.js`

**Notes:**

- `await` works only in `async` scope;
- `await` receives the value the Promise is resolved with;
- `async` returns Promise (which is `.then`-able and so on).

## generator/iterator way

**File:** `generator.js`

**Run:** `node generator.js`

**Notes:**

- `yield` actually pauses the program execution until next `iter.next()` is called;
- when `iter.next(value)` is called, the value is passed to th generator at exact place last `yeild` resides;
- the business logic (data flow) is described in generator;
  - the asyncronousity is passes control via calling `iter.next()` at proper places;
- true syncronosity is not possible because we cannot call `iter.next()` from _running_ generator.

---

## Credits

Roman Melnyk <email.rom.melnyk@gmail.com>
