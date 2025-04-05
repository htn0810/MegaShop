import { ROLE, Role } from '@/constants/common.constant'
import { IRole } from '@/types/user.type'

const usePermission = (userRoles: IRole[]) => {
  const userRolesString = userRoles?.map((role: IRole) => role.name.toLowerCase())
  const hasPermission = (requiredRole: Role) => {
    if (requiredRole.toLowerCase() === ROLE.USER) {
      return true
    }
    return userRolesString?.includes(requiredRole.toLowerCase())
  }

  return { hasPermission }
}

export default usePermission
