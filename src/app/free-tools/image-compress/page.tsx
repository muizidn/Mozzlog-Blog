import FreeTools from '../FreeTools';
import Tool from './Tool';
import BannerProject from '@/components/banner_project';

export const metadata = {
  title: 'Image Compression Online',
  description:
    'You can use my image compression or you can go to other solutions.',
};

export default async function Page() {
  return (
    <div className="flex flex-col w-full space-y-3">
      <h1 className="text-2xl font-semibold mb-4">Image Compression Online</h1>
      <div>
        This image compress uses Rust Webassembly, enjoy the fast performance
        and its free!
      </div>
      <div className="flex justify-center">
        <BannerProject />
      </div>
      <Tool />
      <FreeTools />
    </div>
  );
}
