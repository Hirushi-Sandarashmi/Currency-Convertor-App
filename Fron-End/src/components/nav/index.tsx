"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { DiDrupal } from "react-icons/di";

export default function MainNavbar() {
  const { data: session, status } = useSession();

  return (
    <Navbar>
      <NavbarBrand>
        <DiDrupal className="text-2xl" />
        <p className="font-bold text-inherit ml-2">My Currency</p>
      </NavbarBrand>
      <NavbarContent className="gap-4" justify="center">
        <NavbarItem>
          <Link href="/" className="text-foreground">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/records" aria-current="page">
            Transfers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/about" className="text-foreground">
            About Us
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {status === "unauthenticated" ? (
          <>
            <NavbarItem className="lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <div className="flex gap-5 items-center">
              <div>{session?.user?.name}</div>
              <Button
                color="primary"
                variant="flat"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </Button>
            </div>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
