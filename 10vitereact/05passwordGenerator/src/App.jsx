import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(15);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*-+=_{}[]~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-xl p-6">

        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Password Generator
        </h1>

        {/* Password Field */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="flex-1 px-4 py-3 rounded-lg outline-none text-gray-800 font-medium"
          />

          <button
            onClick={passwordGenerator}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg transition"
          >
            Generate
          </button>

          <button
            onClick={copyPasswordToClipboard}
            className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg transition"
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-6 text-white">

          {/* Length */}
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
            <span className="text-orange-400 font-medium">
              Length: {length}
            </span>
          </div>

          {/* Numbers */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          {/* Characters */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="characterInput"
              onChange={() => setCharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Special Characters</label>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;