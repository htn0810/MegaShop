export interface AppRoute {
  pageTitleKey: string
  path: string
  component: JSX.Element
  isIndexRoute?: boolean
  roles?: string[]
  isProtected?: boolean
  paramName?: string
}

export interface AppRouteBlock {
  parentRoute: AppRoute
  childRoutes?: AppRouteBlock[]
}
