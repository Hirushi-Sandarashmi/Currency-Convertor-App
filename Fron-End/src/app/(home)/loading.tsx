import { CircularProgress } from "@nextui-org/react";

export default function Loading() {
  return (
    <div>
      {" "}
      <CircularProgress size="lg" aria-label="Loading..." />
    </div>
  );
}
