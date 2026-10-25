/**
 * Kind: external
 * Purpose: the shared icon set. Every icon name starts with XIcon so a screen can see it came from this package.
 * Used by: buttons, headers, and dialogs.
 */

import {
  ChevronLeft,
  CircleAlert,
  CircleCheck,
  Eye,
  EyeOff,
  Info,
  Pencil,
  Plus,
  Trash2,
  Building2,
  FileText,
  LayoutDashboard,
  ListTodo,
  TriangleAlert,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

export const XIconChevronLeft = ChevronLeft;
export const XIconClose = X;
export const XIconEdit = Pencil;
export const XIconAdd = Plus;
export const XIconDelete = Trash2;
export const XIconShow = Eye;
export const XIconHide = EyeOff;
export const XIconSuccess = CircleCheck;
export const XIconError = CircleAlert;
export const XIconWarning = TriangleAlert;
export const XIconInfo = Info;
export const XIconPerson = UserRound;
export const XIconDocument = FileText;
export const XIconOrganization = Building2;
export const XIconDashboard = LayoutDashboard;
export const XIconTask = ListTodo;

export const xIconSize = "1em";

export function XIconBold({ icon: Icon, ...props }: { icon: LucideIcon } & LucideProps) {
  return <Icon size={xIconSize} {...props} strokeWidth={4} />;
}
