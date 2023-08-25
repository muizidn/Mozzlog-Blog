import React, { useEffect } from 'react';

const ApolloSandbox: React.FC = () => {
	const graphQLEndpoint = process.env.NEXT_PUBLIC_SITE_URL + "/api/graphql"

  useEffect(() => {
    const sandboxHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
      <div id="sandbox" style="height:100vh; width:100vw;"></div>
      <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
      <script>
      new window.EmbeddedSandbox({
        target: "#sandbox",
        // Pass through your server href if you are embedding on an endpoint.
        // Otherwise, you can pass whatever endpoint you want Sandbox to start up with here.
        initialEndpoint: "${graphQLEndpoint}",
      });
      // advanced options: https://www.apollographql.com/docs/studio/explorer/sandbox#embedding-sandbox
      </script>
      </body>
      </html>
    `;

    const iframe = document.createElement('iframe');
    iframe.srcdoc = sandboxHTML;
    iframe.style.border = 'none';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100vh';

    document.body.appendChild(iframe);

    return () => {
      document.body.removeChild(iframe);
    };
  }, []);

  return null;
};

export default ApolloSandbox;