import FacebookIcon from "/icons/icon-facebook.svg";
import InstagramIcon from "/icons/icon-instagram.svg";
import LinkedInIcon from "/icons/icon-linkedin.svg";
import TiktokIcon from "/icons/icon-tiktok.svg";

type SocialMediaImageProps = {
  src: string;
  alt: string;
};

export const socialMediaData: SocialMediaImageProps[] = [
  {
    src: FacebookIcon,
    alt: "Facebook",
  },
  {
    src: InstagramIcon,
    alt: "Instagram",
  },
  {
    src: LinkedInIcon,
    alt: "LinkedIn",
  },
  {
    src: TiktokIcon,
    alt: "Tiktok",
  },
];
