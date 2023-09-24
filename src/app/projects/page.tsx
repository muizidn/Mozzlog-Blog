import Link from 'next/link';

export const metadata = {
  title: 'Project',
  description: 'Side project we are working on',
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">
        Side Project Helps Us Grow As A Software Engineer
      </h1>
      <h2 className="mt-12 text-center text-3xl">
        You can also benefit from our side project. Join the waitlist for free
        premium features*
      </h2>
      <h2 className="mt-12 text-center text-3xl">Take a look</h2>
      <ProjectLink link="/free-tools">
        Online Free Tools Collections (Released)
      </ProjectLink>
      <ProjectLink link="/projects/network-spy">
        Network Spy (last commit 1 day ago)
      </ProjectLink>
      <ProjectLink link="/projects/wolf-util">
        Wolf Util (last commit 1 day ago)
      </ProjectLink>
      <ProjectLink link="/projects/tomio-ai">
        Tomio AI (last commit 1 day ago)
      </ProjectLink>
      <ProjectLink link="/projects/loop-quran">
        Loop Quran (last commit 1 day ago)
      </ProjectLink>
      <ProjectLink link="/projects/seo-sails">
        SEO Sails (last commit 1 day ago)
      </ProjectLink>
      <ProjectLink link="/projects/freebio">Free Bio (Released)</ProjectLink>
      <p className="text-3s mt-12 text-center">
        *Premium features depends on the project owner. Please contact the
        developer for more information.
      </p>
    </>
  );
}

function ProjectLink({ link, children }: { link: string; children: any }) {
  return (
    <Link href={link}>
      <h3 className="x-5 mb-2 mr-2 mt-12 rounded-lg bg-blue-700 py-2.5 text-center text-3xl font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {children}
      </h3>
    </Link>
  );
}
