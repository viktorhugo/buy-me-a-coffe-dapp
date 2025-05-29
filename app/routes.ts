import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // Main
    ...prefix('/home', [
        index("layouts/home-layout.tsx"),
    ]),
] satisfies RouteConfig;
