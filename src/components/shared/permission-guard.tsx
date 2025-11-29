import { Slot, component$, useComputed$ } from "@builder.io/qwik";
import { useAuth } from "~/stores/auth";

type PermissionGuardProps = {
  permission: string;
};

export const PermissionGuard = component$<PermissionGuardProps>(
  ({ permission }) => {
    const { hasPermission } = useAuth();

    const allowed = useComputed$(async () => {
      return await hasPermission(permission);
    });

    return <>{allowed.value ? <Slot /> : <Slot name="fallback" />}</>;
  },
);
