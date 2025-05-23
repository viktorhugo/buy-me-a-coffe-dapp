import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    // Main
    ...prefix('/main', [
        layout(
            "layouts/main-layout.tsx", [
                index("routes/main/main-page.tsx"),
                // route('client', "routes/main/main-page.tsx")
            ]
        )
    ]),
] satisfies RouteConfig;
