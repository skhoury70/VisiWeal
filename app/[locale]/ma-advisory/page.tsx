import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MaAdvisoryRedirect({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/services/ma-advisory`);
}
