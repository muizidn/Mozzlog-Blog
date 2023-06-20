import Image from 'next/image';

import Waitlist from './waitlist';

export default function ProjectTemplatePage({
  name,
  tagline,
  description,
  code
}: {
  name: string;
  tagline: string;
  description: string;
  code: string;
}) {
  return (
    <>
      <section className="relative py-24 md:py-0">
        {/* <img className="absolute top-0 right-0 hidden lg:block w-1/2 h-full object-contain" src="pstls-assets/images/applications/group-phones.png" alt=""> */}
        <div className="container mx-auto px-4">
          <h2 className="font-heading mb-7 text-6xl md:text-7xl">{name}</h2>
          <div className="-mx-4 flex flex-wrap">
            <div className="mb-12 w-full px-4 md:mb-0 lg:w-1/2">
              <div className="mx-auto max-w-md md:mx-0 md:py-32">
                <h2 className="font-heading mb-6 text-5xl md:text-6xl">
                  {tagline}
                </h2>
                <p className="mb-6 leading-8">{description}</p>
                <Waitlist code={code}/>
                <div className="flex">
                  <a className="mr-4 inline-block" href="#">
                    {/* <img src="pstls-assets/images/applications/appstore.svg" alt=""> */}
                  </a>
                  <a className="inline-block" href="#">
                    {/* <img src="pstls-assets/images/applications/googleplay.svg" alt=""> */}
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:hidden">
              {/* <img src="pstls-assets/images/applications/group-phones.png" alt=""> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
