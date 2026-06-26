import { ContactIntakeForm } from "@/components/forms/contact-intake-form";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Contact"
};

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | Array<string> | undefined>>;
};

function firstParam(value: string | Array<string> | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = searchParams ? await searchParams : {};
  const initialIntent = firstParam(params.intent);
  const initialService = firstParam(params.service);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Request Tuning"
        copy="Tell us about the vehicle, current setup, and what you want to accomplish. The more complete the information, the more useful our first response will be."
      />
      <Section>
        <ContactIntakeForm initialIntent={initialIntent} initialService={initialService} />
      </Section>
      <CTASection
        title="Build review first."
        copy="TurboGixxer reviews the vehicle setup, current issues, goals, and requested service before recommending the next step."
      />
    </>
  );
}
