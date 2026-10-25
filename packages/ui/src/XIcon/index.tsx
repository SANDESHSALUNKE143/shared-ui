/**
 * Kind: external
 * Purpose: the shared icon set. Every icon name starts with XIcon so a screen can see it came from this package.
 * Used by: buttons, headers, and dialogs.
 */

import {
  Bell,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  ClipboardList,
  Copy,
  Download,
  Ellipsis,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  House,
  Info,
  LayoutDashboard,
  ListFilter,
  ListTodo,
  Lock,
  LogOut,
  Mail,
  Menu,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Share2,
  Trash2,
  TriangleAlert,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

export const XIconChevronLeft = ChevronLeft;
export const XIconChevronRight = ChevronRight;
export const XIconChevronDown = ChevronDown;
export const XIconChevronUp = ChevronUp;
export const XIconClose = X;
export const XIconEdit = Pencil;
export const XIconAdd = Plus;
export const XIconDelete = Trash2;
export const XIconSearch = Search;
export const XIconSettings = Settings;
export const XIconFilter = ListFilter;
export const XIconMenu = Menu;
export const XIconMore = Ellipsis;
export const XIconCopy = Copy;
export const XIconDownload = Download;
export const XIconUpload = Upload;
export const XIconRefresh = RefreshCw;
export const XIconSave = Save;
export const XIconCheck = Check;
export const XIconShare = Share2;
export const XIconExternal = ExternalLink;
export const XIconShow = Eye;
export const XIconHide = EyeOff;
export const XIconSuccess = CircleCheck;
export const XIconError = CircleAlert;
export const XIconWarning = TriangleAlert;
export const XIconInfo = Info;
export const XIconHelp = CircleHelp;
export const XIconPerson = UserRound;
export const XIconDocument = FileText;
export const XIconRecord = ClipboardList;
export const XIconOrganization = Building2;
export const XIconDashboard = LayoutDashboard;
export const XIconTask = ListTodo;
export const XIconHome = House;
export const XIconMail = Mail;
export const XIconCalendar = Calendar;
export const XIconBell = Bell;
export const XIconLock = Lock;
export const XIconLogout = LogOut;

export const xIconSize = "1em";

export function XIconBold({ icon: Icon, ...props }: { icon: LucideIcon } & LucideProps) {
  return <Icon size={xIconSize} {...props} strokeWidth={4} />;
}
