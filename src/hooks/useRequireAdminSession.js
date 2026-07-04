import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminSession } from "../utils/adminAuth";
import { ADMIN_LOGIN_PATH } from "../utils/admin";

/** Wait for Supabase session before running admin-only data fetches. */
export function useRequireAdminSession() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    getAdminSession().then((session) => {
      if (!active) return;
      if (!session) {
        navigate(ADMIN_LOGIN_PATH, { replace: true });
        return;
      }
      setReady(true);
    });

    return () => {
      active = false;
    };
  }, [navigate]);

  return ready;
}
