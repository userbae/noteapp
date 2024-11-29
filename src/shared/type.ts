import { Layout } from "react-grid-layout";

interface UserProps {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}

interface SaveLayoutProps {
  md: Layout[];
}

export type { UserProps, SaveLayoutProps };
