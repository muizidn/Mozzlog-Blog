export const metadata = {
  title: 'Contact',
  description: 'You can contact us!',
};

// fetch from github database later
const contributors = [
  {
    name: 'Muhammad Muizzsuddin',
    github: 'https://github.com/muizidn',
    stack: ['iOS', 'Flutter'],
    role: 'Team Lead',
  },
];

export default function ContactPage() {
  const contributorsEl = [];
  for (var i = 0; i < contributors.length; i++) {
    const contributor = contributors[i];
    contributorsEl.push(
      <h3 key={i.toString()} className="mt-12 text-center text-3xl">
        {contributor.name} ({contributor.github}) as {contributor.role} Does{' '}
        {contributor.stack}
      </h3>
    );
  }
  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">Contact</h1>
      <h2 className="mt-12 text-center text-3xl">
        Hi call me Mozz. I am built by team of developers
      </h2>
      <h2 className="mt-12 text-center text-3xl">
        But you can reach these amazing talents who contributed continuously
      </h2>
      {/* Enter you github link here */}
      <tbody>{contributorsEl}</tbody>
    </>
  );
}
