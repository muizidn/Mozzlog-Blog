import ProjectTemplatePage from '@/components/project-template';

export const metadata = {
  title: "Network Spy · Develop, Debug, Analyze. Optimize your application like never before",
  description: "Network Spy is your friend to find and raise your application networking game to the next level. Monitor, inspect, and modify your network traffic in the platform you love.",
  openGraph: {
    title: "Network Spy · Develop, Debug, Analyze. Optimize your application like never before",
    type: "website",
    url: "https://mozzlog.com/projects/network-spy",
    images: 'https://bmwvfjerbeswbgqrwmfp.supabase.co/storage/v1/object/public/mozzlog/NetworkSpy_opengraph.png',
    description: "Network Spy is your friend to find and raise your application networking game to the next level. Monitor, inspect, and modify your network traffic in the platform you love."
  }
};

export default function NetworkSpyPage() {
  return (
    <ProjectTemplatePage
      name="Network Spy"
      tagline="Develop, Debug, Analyze"
      description="No more guessing what server response causes crash. You can always inspect your application communication at any time. With analysis feature, you can get many insight from each traffic"
      code='0ev0eN'
      image="https://bmwvfjerbeswbgqrwmfp.supabase.co/storage/v1/object/public/mozzlog/NetworkSpy.png"
    />
  );
}
