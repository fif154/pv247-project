interface PageHeaderProps {
  children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
  return <h1 className="text-4xl font-bold">{children}</h1>;
}
