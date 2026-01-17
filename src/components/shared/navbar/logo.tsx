import logo from "@/assets/logo.png";
import Image from "next/image";

export const Logo = () => (
  <Image
    width={96}
    height={32}
    className="w-24 h-auto"
    src={logo}
    alt="Company Logo"
  ></Image>
);
