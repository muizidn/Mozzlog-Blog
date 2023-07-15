import ProjectTemplatePage from '@/components/project-template';

export const metadata = {
  title: "Tomio AI · The more you get from AI, the more you produce tangible results",
  description: "Tomio helps you find answers, insight, questions, and many more. You will be amazed with its skill.",
  openGraph: {
    title: "Tomio AI · The more you get from AI, the more you produce tangible results",
    type: "website",
    url: "https://bmwvfjerbeswbgqrwmfp.supabase.co/storage/v1/object/public/mozzlog/tomio-banner.png",
    images: 'https://bmwvfjerbeswbgqrwmfp.supabase.co/storage/v1/object/public/mozzlog/tomio-banner.png',
    description: "Tomio helps you find answers, insight, questions, and many more. You will be amazed with its skill."
  }
};

export default function TomioAiPage() {
  return (
    <ProjectTemplatePage
      name="Tomio AI"
      tagline="Your Own Assistant At Hand"
      description="Whenever you need this AI bot assistant will help you doing your daily tasks. You don't need to worry about limit. You are the limit"
      waitlistCode='ub9Y8s'
      image="https://bmwvfjerbeswbgqrwmfp.supabase.co/storage/v1/object/public/mozzlog/tomio-banner.png"
    />
  );
}
