import { ComponentSample } from "./_components/component-sample";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <ComponentSample label="Component 1" delay={1000} />
      <ComponentSample label="Component 1" delay={2000} />
      <ComponentSample label="Component 1" delay={2000} />
      <ComponentSample label="Component 1" delay={-1000} />
    </div>
  );
}
