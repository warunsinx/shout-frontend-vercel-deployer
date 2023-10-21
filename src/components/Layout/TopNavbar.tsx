import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import CreateProfileButton from "../Profile/CreateProfileButton";

export default function TopNavbar() {
  const router = useRouter();

  return (
    <Navbar
      shouldHideOnScroll={true}
      maxWidth="full"
      className="py-1.5 max-w-[1200px] "
    >
      <NavbarBrand>
        <div
          onClick={() => router.push("/")}
          className="select-none cursor-pointer flex items-center"
        >
          <Image src="/shout.svg" alt="Shout Logo" width="30" height="30" />
          <p className="text-gray-800 font-bold text-2xl ml-3">
            shout protocol
          </p>
        </div>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <CreateProfileButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
