import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <>
        <Breadcrumbs />
        <div id="main-content">
          {children}
        </div>
      </>
    );

}

