import { use, useState } from "react";
import axios, { Axios } from "axios";
import bgImage from "../src/assets/Dak.webp";

function App() {
  const [url, setUrl] = useState("")
  const [sendData, setSendData] = useState("")
  const [method, setMethod] = useState("GET")
  const [data, setData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      new URL(url);  
    } catch {
      alert("Enter valid URL!")
      return;
    }
    try {
      if (method === "GET") {
        const resp = await axios.get(url)
        setData(resp.data);
      } else if (method === "POST") {
        const parsedData = sendData ? JSON.parse(sendData) : {};
        const resp = await axios.post(url, parsedData);
        alert("Sent!")
      } else if (method === "PUT") {
        const parsedData = sendData ? JSON.parse(sendData) : {};
        const resp = await axios.put(url, parsedData);
        alert("Updated!")
      } else if (method === "DELETE") {
        const parsedData = sendData ? JSON.parse(sendData) : {};
        const resp = await axios.delete(url, { data: parsedData });
        alert("Deleted!")
      } else if (method === "PATCH") {
        const parsedData = sendData ? JSON.parse(sendData) : {};
        const resp = await axios.patch(url, parsedData);
        alert(resp.data)
      }
    } catch (err) {
      setData(null);
      console.error(err);
      alert("Failed to call API.")
    }
  };

  return (
    <div style={{backgroundImage: `url(${bgImage})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}} className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#0a1628] to-[#050c18] text-white px-4">
      {/* Title */}
      <h1 className="text-5xl font-bold bg-linear-to-r top-5 from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-wide fixed">
        API-DAK
      </h1>
      <div className="w-full max-w-3xl  border border-[#1e3a66]/40 rounded-2xl shadow-lg p-8">

        {/* Request Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 bg-[#808895] p-4 rounded-xl shadow-inner"
        > 
          {/* Method Dropdown */}
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="bg-[#20375f] text-white font-medium px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition w-full sm:w-28"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>PATCH</option>
          </select>

          {/* URL Input */}
          <input
            type="text"
            placeholder="Enter request URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-[#0d1b33] text-white placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          {/* Send Button */}
          <button
            type="submit"
            className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-6 py-2 rounded-lg transition-transform active:scale-95 whitespace-nowrap"
          >
            Send
          </button>
        </form>
        {method === "GET" ?
          <div className="w-full max-w-3xl mt-10 bg-[#bfbffd] h-70 backdrop-blur-md border border-[#1e3a66]/40 rounded-2xl shadow-lg p-8 overflow-y-scroll">
            {data ? (
              <pre className="whitespace-pre-wrap text-[#050530]">
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500 italic">No response yet.</p>
            )}
          </div>
          : <textarea rows={10} cols={5} placeholder="Enter data." value={sendData} onChange={(e) => setSendData(e.target.value)} className="w-full max-w-3xl mt-10 text-[#050530] bg-[#bfbffd] h-70 backdrop-blur-md border border-[#1e3a66]/40 rounded-2xl shadow-lg p-8 overflow-y-scroll">

          </textarea>
        }
      </div>

    </div>
  );
}

export default App;
