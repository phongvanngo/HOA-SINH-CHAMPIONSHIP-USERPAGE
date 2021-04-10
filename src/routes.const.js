export const LandingPageRoutes = {
    HOMEPAGE: "/trang-chu",
    LEADERBOARD: "/bang-xep-hang",
    TEST: "/Test",
    USER_LOGIN: "/dang-nhap",
    CONTACT: "/lien-he",
    USER: "/Ca-nhan",
}

export const PublicRoutes = {
    ADMIN_DASHBOARD: "/admin-dashboard",
    ADMIN_SIGNIN: "/SignIn",
    LANDINGPAGE: "/",
    USER_DASHBOARD: "/user",
    TEST: "/test",
    RUNNING_STATION: "/runningStation",
}
export const DashboardRoutes = {
    COMPETITION_MANAGEMENT: `${PublicRoutes.ADMIN_DASHBOARD}/quan-ly-ca-thi`,
    EXAM_MANAGEMENT: `${PublicRoutes.ADMIN_DASHBOARD}/quan-ly-de-thi`,
    USER_MANAGEMENT: `${PublicRoutes.ADMIN_DASHBOARD}/quan-ly-thi-sinh`,
    QUESTION_MANAGEMENT: `${PublicRoutes.ADMIN_DASHBOARD}/quan-ly-cau-hoi`,
    UNIVERSITY_MANAGEMENT: `${PublicRoutes.ADMIN_DASHBOARD}/quan-ly-truong-hoc`,
    SETTINGS: `${PublicRoutes.ADMIN_DASHBOARD}/cai-dat`,
}