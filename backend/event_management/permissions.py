from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
            # allows get requests for anyone
            if request.method in permissions.SAFE_METHODS:
                return True

            # only allows post for admins
            
            return request.user and request.user.is_admin