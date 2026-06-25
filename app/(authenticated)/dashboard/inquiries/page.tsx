import { getInquiryCounts } from "@/app/lib/actions/inquiry/getInquiryCounts";
import { listInquiries } from "@/app/lib/actions/inquiry/listInquiries";
import { requireAdmin } from "@/app/lib/utils/dashboard.utils";
import { redirect } from "next/navigation";
import InquiriesClient from "./InquiriesClient";

export const metadata = {
  title: "Inquiries · MHD Custom",
};

export default async function InquiriesPage() {
  const actor = await requireAdmin();
  if (!actor) redirect("/login");

  const [list, counts] = await Promise.all([
    listInquiries("ALL"),
    getInquiryCounts(),
  ]);

  return (
    <InquiriesClient
      initialInquiries={list.success ? list.data : []}
      initialCounts={counts.success ? counts.data : { ALL: 0 }}
    />
  );
}
