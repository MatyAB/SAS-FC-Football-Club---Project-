package com.sasfc.api.mapper;

import com.sasfc.api.dto.PermissionDto;
import com.sasfc.api.dto.RoleDto;
import com.sasfc.api.dto.UserDto;
import com.sasfc.api.model.Permission;
import com.sasfc.api.model.Role;
import com.sasfc.api.model.User;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setLastLogin(user.getLastLogin());
        if (user.getRoles() != null) {
            userDto.setRoles(user.getRoles().stream()
                    .map(UserMapper::toRoleDto)
                    .collect(Collectors.toSet()));
        }
        return userDto;
    }

    public static RoleDto toRoleDto(Role role) {
        if (role == null) {
            return null;
        }

        RoleDto roleDto = new RoleDto();
        roleDto.setId(role.getId());
        roleDto.setName(role.getName());
        if (role.getPermissions() != null) {
            roleDto.setPermissions(role.getPermissions().stream()
                    .map(UserMapper::toPermissionDto)
                    .collect(Collectors.toSet()));
        }
        return roleDto;
    }

    public static PermissionDto toPermissionDto(Permission permission) {
        if (permission == null) {
            return null;
        }
        PermissionDto permissionDto = new PermissionDto();
        permissionDto.setId(permission.getId());
        permissionDto.setName(permission.getName());
        return permissionDto;
    }
}