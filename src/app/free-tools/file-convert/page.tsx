import BannerProject from "@/components/banner_project";
import Tool from "./Tool";
import FreeTools from "../FreeTools";

export const metadata = {
  title: 'Image Compression Online',
  description:
    'You can use my image compression or you can go to other solutions.',
};

export default async function Page() {
  return (
    <div className="flex flex-col w-full space-y-3">
      <h1 className="text-2xl font-semibold mb-4">File Conversion Tool</h1>
      <div>
        Easy file conversion online
      </div>
      <div className="flex justify-center">
        <BannerProject />
      </div>
      <Tool/>
      <FreeTools/>
    </div>
  );
}
