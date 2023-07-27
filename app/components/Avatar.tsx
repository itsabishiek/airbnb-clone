"use client";

import Image from "next/image";

type AvatarProps = {};

const Avatar: React.FC<AvatarProps> = () => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      src="/images/placeholder.jpg"
      alt="Avatar"
    />
  );
};
export default Avatar;
