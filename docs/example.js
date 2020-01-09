const useAsync = module.exports; // this is done only for the example, usually you'd do: `import useAsync from 'use-async-react'`

const Form = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { call: login, error, loading, result } = useAsync(
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
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
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

ReactDOM.render(<Form />, document.querySelector("#root"));
