# use-async-hook

![npm type definitions](https://img.shields.io/npm/types/typescript)

Defer your async call with a react hook.

### install

```sh
npm i use-async-react
```

### usage

There is one export, default export with the react hook:

```ts
export default function <T extends any[], U>(
  promise: (...args: T) => Promise<U>
): {
  call: (...args: T) => void;
  result?: U;
  loading: boolean;
  error?: any;
};
```

Example usage can be found in `docs/`, and a live demo on [github pages](https://github.shilangyu.dev/use-async-react):

```jsx
import useAsync from "use-async-react";
import React, { useState } from "react";

const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    call: login,
    error,
    loading,
    result,
  } = useAsync(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() < 0.7
            ? resolve("iAmAToken")
            : reject(new Error("failed to log in"));
        }, 1000);
      })
  );

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Log in</button>
      <div>
        {error && `Error! - ${error}`}
        {loading && "Logging in..."}
        {result && `Logged in! Here is your token: ${result}`}
      </div>
    </div>
  );
};
```
