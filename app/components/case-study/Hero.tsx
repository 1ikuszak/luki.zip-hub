import { Breadcrumb } from "@/app/components/Breadcrumb";

type Props = {
  title: string;
  subtitle: string;
};

export function Hero({ title, subtitle }: Props) {
  return (
    <section className="container-wide pt-8 sm:pt-12 pb-8 sm:pb-10">
      <Breadcrumb
        items={[
          { label: "Case studies", href: "/case-studies" },
          { label: title },
        ]}
      />

      <div className="mt-10 sm:mt-14 max-w-[920px]">
        <h1 className="t-h1 enter">{title}</h1>
        <p
          className="t-body-large mt-6 max-w-[680px] text-[var(--text-secondary)] enter"
          style={{ animationDelay: "70ms" }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
