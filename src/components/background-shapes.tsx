import Image from "next/image";
import logo from "@/assets/svg/logoSaluFon.svg";

export default function BackgroundShapes() {
  return (
    <>
      <Image src={logo} alt="Logo SALU" className="absolute 2xl:-left-[20rem]" />
      <div className="shape-blob w-72 h-72 -left-20 2xl:top-20 sm:-top-10" />
      <div className="shape-blob w-96 h-96 right-0 top-0" />
      <div className="shape-blob w-80 h-80 left-0 2xl:bottom-0 sm:-bottom-10" />
    </>
  );
}
