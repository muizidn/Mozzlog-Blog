import SubscribeNewsletter from '@/components/subscribe-newsletter';

export const metadata = {
  title: 'Welcome | Mozzlog',
};

export default function HomePage() {
  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">
        Hello, What Mozz 🤖 Can Help You Today?
      </h1>
      <h2 className="mt-12 text-center text-3xl">
        We find problems. We get some help.
      </h2>
      <h2 className="mt-12 text-center text-3xl">
        We solve it. We share our learning.
      </h2>
      <h2 className="mt-12 text-center text-3xl">OK?</h2>
      <div className="space-y-4">
        <h3 className="mt-12 text-center text-3xl font-bold">
          Weekly update is a must. Sometimes more.
        </h3>
        <div className="grid justify-items-center">
          <SubscribeNewsletter />
        </div>
      </div>
    </>
  );
}
