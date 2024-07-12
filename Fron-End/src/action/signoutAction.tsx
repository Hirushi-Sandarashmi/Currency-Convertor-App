// "use server";
// import { auth, signOut } from "#/app/auth";
// import { redirect } from "next/navigation";

// export const signoutAction = async (formData: FormData) => {
//   try {
//     await signOut();
//     redirect("/login");
//   } catch (e: any) {
//     redirect("/login?error=" + e.code);
//   }
// };
