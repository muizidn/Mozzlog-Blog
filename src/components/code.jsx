import dynamic from 'next/dynamic';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    await Promise.all([
      import('prismjs/components/prism-swift.js'),
      import('prismjs/components/prism-c.js'),
      import('prismjs/components/prism-shell-session.js'),
      import('prismjs/components/prism-bash.js'),
      import('prismjs/components/prism-rust.js'),
      ]);
    return m.Code;
  })
);

export default Code;