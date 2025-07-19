interface LoginProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}: LoginProps) {
  return (
    <div
      style={{
        background:
          "linear-gradient(80deg, black, transparent), url(https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={onSubmit}
          className="bg-black bg-opacity-75 text-white p-20 rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-7">Sign In</h2>
          <div className="mb-7">
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 rounded-md bg-[#333333] outline-none"
              required
            />
          </div>
          <div className="mb-7">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 rounded-md bg-[#333333] outline-none"
              required
            />
          </div>
          <div className="flex justify-center mb-2">
            <button
              type="submit"
              className="bg-[#e50815] w-full py-3 rounded-md"
            >
              Sign In
            </button>
          </div>
          <div className="mb-10">
            <div className="flex justify-between">
              <label className="flex items-center gap-1 text-gray-400 font-light text-sm">
                <input type="checkbox" className="w-4 h-4" />
                Remember me
              </label>
              <p className="font-light text-sm text-gray-400">Need help?</p>
            </div>
          </div>
          <div className="mb-5">
            <span className="font-light text-gray-400">
              New to Nextflix?
            </span>
            <a href="/register">
              <span className="font-light hover:underline"> Sign up now.</span>
            </a>
          </div>
          <div className="mb-20">
            <p className="text-xs text-gray-400">
              <span className="text-blue-600">Learn more.</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
