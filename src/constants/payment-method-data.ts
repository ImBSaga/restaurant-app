import BCAIcon from "/icons/icon-bca.svg";
import BNIIcon from "/icons/icon-bni.svg";
import BRIIcon from "/icons/icon-bri.svg";
import MandiriIcon from "/icons/icon-mandiri.svg";

type PaymentMethodImageProps = {
  src: string;
  name: string;
  alt: string;
};

export const paymentMethodData: PaymentMethodImageProps[] = [
  {
    src: BCAIcon,
    name: "Bank Central Asia",
    alt: "BCA",
  },
  {
    src: BNIIcon,
    name: "Bank Negara Indonesia",
    alt: "BNI",
  },
  {
    src: BRIIcon,
    name: "Bank Rakyat Indonesia",
    alt: "BRI",
  },
  {
    src: MandiriIcon,
    name: "Mandiri",
    alt: "Mandiri",
  },
];
