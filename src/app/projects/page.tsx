import Link from 'next/link';

export const metadata = {
  title: 'Project',
  description: 'Side project we are working on',
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">Side Project Helps Us Grow As A Software Engineer</h1>
      <h2 className="mt-12 text-center text-3xl">
        You can also benefit from our side project. Join the waitlist for free premium features*
      </h2>
      <h2 className="mt-12 text-center text-3xl">Take a look</h2>
      <Link href="/projects/network-spy">
        <h3 className="mt-12 text-center text-3xl">
          Network Spy (last commit 1 day ago)
        </h3>
      </Link>
      <Link href="/projects/wolf-util">
        <h3 className="mt-12 text-center text-3xl">
          Wolf Util (last commit 1 day ago)
        </h3>
      </Link>
      <Link href="/projects/tomio-ai">
        <h3 className="mt-12 text-center text-3xl">
          Tomio AI (last commit 1 day ago)
        </h3>
      </Link>
      <Link href="/projects/loop-quran">
        <h3 className="mt-12 text-center text-3xl">
          Loop Quran (last commit 1 day ago)
        </h3>
      </Link>
      <Link href="/projects/seo-sails">
        <h3 className="mt-12 text-center text-3xl">
          SEO Sails (last commit 1 day ago)
        </h3>
      </Link>
      <Link href="/projects/freebio">
        <h3 className="mt-12 text-center text-3xl">
          Free Bio (Released)
        </h3>
      </Link>
      <p className="mt-12 text-center text-3s">
        *Premium features depends on the project owner. Please contact the developer for more information.
      </p>
    </>
  );
}
