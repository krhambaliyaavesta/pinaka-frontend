export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex flex-col items-center justify-center p-8 text-white">
      <main className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Project Pinaka</h1>

        <div className="mb-8">
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <h2 className="text-2xl font-semibold mb-4">
            The Divine Bow of Lord Shiva
          </h2>

          <p className="text-lg mb-6">
            Pinaka is the celestial bow of Lord Shiva, one of the most powerful
            weapons in Hindu mythology. Known for its immense destructive power,
            it was used by Lord Shiva in many legendary battles.
          </p>

          <p className="text-lg mb-6">
            According to ancient texts, Pinaka was crafted by Vishwakarma, the
            divine architect. When strung and released, it could produce
            thunderous sounds that would shake the three worlds.
          </p>

          <p className="text-lg">
            This project embodies the strength, precision, and divine power
            represented by Lord Shiva's bow.
          </p>
        </div>

        <div className="mt-12">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300 mr-4">
            Explore Project
          </button>
          <button className="border-2 border-yellow-500 hover:bg-yellow-500/20 text-yellow-400 font-bold py-3 px-6 rounded-full transition duration-300">
            Learn More
          </button>
        </div>
      </main>

      <footer className="mt-16 text-sm text-gray-300">
        <p>Project Pinaka - Harnessing the power of Lord Shiva's divine bow</p>
      </footer>
    </div>
  );
}
