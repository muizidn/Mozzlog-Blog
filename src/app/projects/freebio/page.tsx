import ProjectTemplatePage from '@/components/project-template';

export const metadata = {
  title: "FreeBio",
  description: "FreeBio is a web service that offers a free and easy way for developers to create bio links. This service is specifically designed for developers who want a simple solution to share their profiles and portfolios.",
  openGraph: {
    title: "FreeBio",
    type: "website",
    url: "https://freebio.dev",
    images: 'https://raw.githubusercontent.com/syofyanzuhad/freebio.dev/main/public/example.jpg',
    description: "FreeBio is a web service that offers a free and easy way for developers to create bio links. This service is specifically designed for developers who want a simple solution to share their profiles and portfolios."
  }
};

export default function Page() {
  return (
    <ProjectTemplatePage
      name="FreeBio"
      tagline="Free Bio for Developer"
      description="FreeBio is a web service that offers a free and easy way for developers to create bio links. This service is specifically designed for developers who want a simple solution to share their profiles and portfolios."
      websiteUrl='https://freebio.dev'
      image="https://raw.githubusercontent.com/syofyanzuhad/freebio.dev/main/public/example.jpg"
    />
  );
}
