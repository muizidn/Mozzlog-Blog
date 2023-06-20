export const metadata = {
  title: 'Project',
  description: 'Side project we are working on',
};

export default function ProjectsPage() {
  return (
    <>
    <h1 className="mt-12 text-center text-3xl font-bold">Projects</h1>
    <h2 className="mt-12 text-center text-3xl">We are working on some side projects</h2>
    <h2 className="mt-12 text-center text-3xl">Take a look</h2>
    {/* Enter you github link here */}
    <h3 className="mt-12 text-center text-3xl">Network Spy (last commit 3 days ago)</h3>
    <h3 className="mt-12 text-center text-3xl">WolfUtil (last commit 1 day ago)</h3>
    </>
  );
}
