/**
 * Kind: external
 * Purpose: the notify helper. The message is one short sentence.
 * Used by: screens after an API error or success.
 */

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type XNotifySeverity = "error" | "warning" | "success" | "info";

type Notice = { message: string; severity: XNotifySeverity; title?: string };

type NotifyContextValue = {
  notify: (message: string, severity?: XNotifySeverity, title?: string) => void;
};

const NotifyContext = createContext<NotifyContextValue | null>(null);

export function XNotifyProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const notify = useCallback((message: string, severity: XNotifySeverity = "info", title?: string) => {
    setNotice({ message, severity, title });
  }, []);
  const value = useMemo(() => ({ notify }), [notify]);
  return (
    <NotifyContext.Provider value={value}>
      {children}
      <Snackbar open={notice !== null} autoHideDuration={4000} onClose={() => setNotice(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={notice?.severity ?? "info"} onClose={() => setNotice(null)} sx={{ width: { xs: "100%", sm: "auto" } }}>
          {notice?.title ? `${notice.title}. ` : ""}
          {notice?.message}
        </Alert>
      </Snackbar>
    </NotifyContext.Provider>
  );
}

export function useXNotify() {
  const context = useContext(NotifyContext);
  if (!context) throw new Error("useXNotify must be used inside XNotifyProvider");
  return context.notify;
}
