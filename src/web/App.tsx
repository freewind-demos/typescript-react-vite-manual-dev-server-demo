import { useState } from "react";

const App = (): React.JSX.Element => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGreet = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/api/hello?name=${encodeURIComponent(name)}`);
      const data = (await response.json()) as { ok: boolean; message?: string; error?: string };
      setMessage(data.ok ? (data.message ?? "") : `错误：${data.error ?? "未知错误"}`);
    } catch (error) {
      setMessage(`请求失败：${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <h1>configureServer Demo</h1>
      <div className="row">
        <input
          value={name}
          placeholder="你的名字"
          onChange={(event) => setName(event.target.value)}
        />
        <button type="button" disabled={loading} onClick={() => void handleGreet()}>
          {loading ? "请求中…" : "打招呼"}
        </button>
      </div>
      <p className="message">{message}</p>
    </main>
  );
};

export default App;
