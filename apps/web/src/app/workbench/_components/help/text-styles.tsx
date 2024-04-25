export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold uppercase tracking-wider text-xs">
      <span className="text-accent">//</span> {children}
    </h2>
  );
}

export function SectionParagraph({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-sm leading-6">{children}</p>;
}
