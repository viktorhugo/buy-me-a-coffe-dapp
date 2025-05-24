import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // Main
    ...prefix('/main', [
        index("layouts/main-layout.tsx"),
    ]),
] satisfies RouteConfig;
