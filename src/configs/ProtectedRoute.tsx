import { Role } from '@/constants/common.constant'
import { useMegaStore } from '@/store/store'
import { Navigate, Outlet } from 'react-router-dom'

type Props = {
  requiredRole: Role
  redirectPath?: string
}
const ProtectedRoute = (props: Props) => {
  const { requiredRole, redirectPath = '/' } = props

  const { user } = useMegaStore()
  const userRoles = user?.roles?.map((role) => role.name.toLowerCase())

  if (!user || !userRoles?.includes(requiredRole.toLowerCase())) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
