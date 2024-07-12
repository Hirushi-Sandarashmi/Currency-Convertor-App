"use client";

import { useSearchParams } from "next/navigation";

export default function LoginError() {
  const searchParams = useSearchParams();
  return (
    <div className="w-full text-center">
      {searchParams.get("error") && (
        <div className="text-red-600 pt-5 text-sm">
          Invalid username or password
        </div>
      )}
    </div>
  );
}
