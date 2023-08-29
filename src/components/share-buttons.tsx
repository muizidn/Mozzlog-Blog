import React from 'react';

interface PlatformInfo {
  label: string;
  href: string;
  draggable?: string;
}

interface SocialButtonProps {
  platform: string;
  encodedUrl: string;
  text: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ platform, encodedUrl, text }) => {
  const platforms: { [key: string]: PlatformInfo } = {
    twitter: {
      label: 'Share on Twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
    },
    linkedin: {
      label: 'Share on Linkedin',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${text}&summary=${text}&source=`,
    },
    reddit: {
      label: 'Share on Reddit',
      href: `https://reddit.com/submit/?url=${encodedUrl}&resubmit=true&title=${text}`,
      draggable: 'false',
    },
    // Add more platforms as needed
  };

  const platformInfo = platforms[platform];

  if (!platformInfo) {
    return null; // Return null or fallback UI if platform is not supported
  }

  return (
    <a
      className="ease mb-1 mr-1 inline-flex items-center rounded border-2 border-indigo-600 bg-indigo-600 px-2 py-1 text-sm text-white transition duration-200 hover:border-indigo-700 hover:bg-indigo-700"
      target="_blank"
      rel="noopener"
      href={platformInfo.href}
      aria-label={platformInfo.label}
    >
      <span className="ml-1">{platformInfo.label}</span>
    </a>
  );
};

interface SharingButtonsProps {
  encodedUrl: string;
  text: string;
}

const SharingButtons: React.FC<SharingButtonsProps> = ({ encodedUrl, text }) => {
  return (
    <div className="sharing-buttons flex flex-wrap">
      <SocialButton platform="twitter" encodedUrl={encodedUrl} text={text} />
      <SocialButton platform="linkedin" encodedUrl={encodedUrl} text={text} />
      <SocialButton platform="reddit" encodedUrl={encodedUrl} text={text} />
      {/* Add more buttons here */}
    </div>
  );
};

export default SharingButtons;
