// this is done only for the example, usually you'd do: `import useAsync from 'use-async-react'`
const useAsync = module.exports;

const Form = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { call: login, error, loading, result } = useAsync(
    (username, password) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username.length === 0) reject(new Error("username too short"));
          else if (password.length < 8) reject(new Error("password too short"));
          else resolve("iAmAToken");
        }, 1000);
      })
  );

  return (
    <div className="row">
      <input
        className="s5 input-field col"
        placeholder="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="s5 input-field col"
        placeholder="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button
        className="waves-effect waves-light btn-small"
        onClick={() => login(username, password)}
      >
        Log in
      </button>
      <p>
        {error && `Error! - ${error}`}
        {loading && "Logging in..."}
        {result && `Logged in! Here is your token: '${result}'`}
      </p>
    </div>
  );
};

ReactDOM.render(<Form />, document.querySelector("#root"));
