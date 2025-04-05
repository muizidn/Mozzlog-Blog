import Image from 'next/image';

import Waitlist from './waitlist';
import Link from 'next/link';

interface Props {
  name: string;
  tagline: string;
  description: string;
  waitlistProject?: string | undefined;
  websiteUrl?: string | undefined;
  image?: string | undefined;
}

const ProjectTemplatePage: React.FC<Props> = ({
  name,
  tagline,
  description,
  waitlistProject,
  websiteUrl,
  image,
}) => {
  let imageEl = <div></div>;
  if (isValid(image)) {
    imageEl = (
      <Image
        src={image!}
        alt=""
        width={2000}
        height={1000}
      ></Image>
    );
  }

  let waitlist = <div></div>;
  if (isValid(waitlistProject)) {
    waitlist = <Waitlist project={waitlistProject!} />;
  }

  let goToWebsite = <div></div>;
  if (isValid(websiteUrl)) {
    goToWebsite = (
      <Link href={websiteUrl!}>
      <button className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
        Go to Website
      </button>
      </Link>
    );
  }

  return (
    <>
      <section className="relative py-24 md:py-0">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-6xl md:text-7xl">{name}</h2>
          <div className="-mx-4 flex  flex-wrap">
            <div className="mb-12 w-full px-4 md:mb-0 ">
              <div className="mx-auto max-w-md md:mx-0 md:py-8">
                <h3 className="font-heading mb-6 text-5xl md:text-4xl">
                  {tagline}
                </h3>
                <p className="mb-6 leading-8">{description}</p>
                {goToWebsite}
                {waitlist}
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
            {imageEl}
            <div className="w-full lg:hidden">
              {/* <img src="pstls-assets/images/applications/group-phones.png" alt=""> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function isValid(input: string | undefined ) {
  return input !== '' && input !== null && input !== undefined
}

export default ProjectTemplatePage;
