import { redirect } from "next/navigation";

export const metadata = {
  title: "Haltech"
};

export default function HaltechPage() {
  redirect("/shop/haltech");
}
