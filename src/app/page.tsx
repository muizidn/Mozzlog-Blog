export const metadata = {
  title: 'Welcome | Mozzlog',
};

export default function HomePage() {
  return (
    <>
    <h1 className="mt-12 text-center text-3xl font-bold">Hello, What Mozzlog Can Help You Today?</h1>
    <h2 className="mt-12 text-center text-3xl">We find problem. We get some helps. We solve it. We share our learning. OK?</h2>
    <h3 className="mt-12 text-center text-3xl font-bold">Weekly update is a must. Sometimes much more</h3>
    <input
          className="w-4/5 rounded-full border border-gray-400 px-6 py-3"
          type="text"
          placeholder="Your email address"
        />
    <button>Subscribe</button>
    </>
  )
}
