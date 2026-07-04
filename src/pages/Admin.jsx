import { Navigate } from "react-router-dom";
import { ADMIN_LOGIN_PATH } from "../utils/admin";

/** Legacy /admin entry — redirects to Supabase admin login. */
export default function Admin() {
  return <Navigate to={ADMIN_LOGIN_PATH} replace />;
}
