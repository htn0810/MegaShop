import {
  CART_ROUTE_BLOCK,
  DEFAULT_ROUTE_BLOCK,
  LOGIN_ROUTE_BLOCK,
  PRODUCTS_ROUTE_BLOCK,
  PRODUCT_DETAIL_ROUTE_BLOCK,
  SIGN_UP_ROUTE_BLOCK,
} from '@/constants/routes.constant'
import PrimaryLayout from '@/layouts/primary_layout'
import { AppRoute, AppRouteBlock } from '@/types/route.type'
import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import './i18n'

const App = () => {
  const renderSingleRoute = (route: AppRoute) => {
    // if (!!route.isProtected && !isLoggedIn) return <></>
    if (route.isIndexRoute) return <Route index element={route.component} />
    return <Route path={route.path} element={route.component} />
  }

  const renderRoutesOfBlock = (routeBlock: AppRouteBlock) => {
    if (!routeBlock.childRoutes) return renderSingleRoute(routeBlock.parentRoute)
    return (
      <Route path={routeBlock.parentRoute.path} element={routeBlock.parentRoute.component}>
        {routeBlock.childRoutes.map((childBlock) => (
          <Fragment key={childBlock.parentRoute.pageTitleKey}>{renderRoutesOfBlock(childBlock)}</Fragment>
        ))}
      </Route>
    )
  }
  return (
    <Fragment>
      <PrimaryLayout>
        <Routes>
          {renderRoutesOfBlock(DEFAULT_ROUTE_BLOCK)}
          {renderRoutesOfBlock(LOGIN_ROUTE_BLOCK)}
          {renderRoutesOfBlock(SIGN_UP_ROUTE_BLOCK)}
          {renderRoutesOfBlock(PRODUCTS_ROUTE_BLOCK)}
          {renderRoutesOfBlock(PRODUCT_DETAIL_ROUTE_BLOCK)}
          {renderRoutesOfBlock(CART_ROUTE_BLOCK)}
        </Routes>
      </PrimaryLayout>
    </Fragment>
  )
}

export default App
