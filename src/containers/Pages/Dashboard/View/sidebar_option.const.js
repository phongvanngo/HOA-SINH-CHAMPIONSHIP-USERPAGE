import MenuBookIcon from '@material-ui/icons/MenuBook';
import { DashboardRoutes } from "./../../../../routes.const";
import ContactsIcon from '@material-ui/icons/Contacts';
import SchoolIcon from '@material-ui/icons/School';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SettingsIcon from '@material-ui/icons/Settings';

export const SidebarOption = [
    {
        title: "Ca thi",
        path: DashboardRoutes.COMPETITION_MANAGEMENT,
        icon: () => <EventAvailableIcon />
    },
    {
        title: "Đề thi",
        path: DashboardRoutes.EXAM_MANAGEMENT,
        icon: () => <MenuBookIcon />
    },
    {
        title: "Thí sinh",
        path: DashboardRoutes.USER_MANAGEMENT,
        icon: () => <ContactsIcon />
    },
    {
        title: "Trường đại học",
        path: DashboardRoutes.UNIVERSITY_MANAGEMENT,
        icon: () => <SchoolIcon />
    },
    {
        title: "Cài đặt",
        path: DashboardRoutes.SETTINGS,
        icon: () => <SettingsIcon />
    },
]