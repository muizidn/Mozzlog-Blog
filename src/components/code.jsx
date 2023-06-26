import dynamic from 'next/dynamic';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    await Promise.all([
      import('prismjs/components/prism-swift.js'),
      ]);
    return m.Code;
  })
);

export default Code;