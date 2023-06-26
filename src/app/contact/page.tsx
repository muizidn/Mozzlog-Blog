import Link from 'next/link';

export const metadata = {
  title: 'Contact',
  description: 'You can contact us!',
};

// fetch from github database later
const contributors = [
  {
    name: 'Muhammad Muizzsuddin',
    github: 'https://github.com/muizidn',
    stack: ['iOS', 'Flutter', 'ReactNative', 'NextJS', 'and so on'],
    role: 'Team Lead',
  },
];

export default function ContactPage() {
  const contributorsEl = [];
  for (var i = 0; i < contributors.length; i++) {
    const contributor = contributors[i];
    contributorsEl.push(
      <div key={i.toString()}>
        <h3 className="m-2 text-start text-3xl">{contributor.name}</h3>
        <h4 className="m-2 text-start text-xl">As {contributor.role}</h4>
        <h4 className="m-2 text-start text-xl">
          Does {contributor.stack.join(', ')}
        </h4>
        <Link href={contributor.github} className='flex space-x-2 m-2 text-start text-xl'>
          <h4>
            Github
          </h4>
          <div className='text-blue-600'>{contributor.github}</div>
        </Link>
      </div>
    );
  }
  return (
    <>
      <h1 className="mt-12 text-center text-3xl font-bold">Contact</h1>
      <h2 className="mt-12 text-center text-3xl">
        {"Hello there. You wan't to talk? Let's talk!"}
      </h2>
      <h2 className="mt-12 text-center text-3xl">
        You can reach these amazing talents who are contributing
        continuously.
      </h2>
      <div className="mt-12">
        <tbody>{contributorsEl}</tbody>
      </div>
    </>
  );
}
