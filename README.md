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