package com.sasfc.api.dto;

import lombok.Data;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Data
public class UserDto {
    private UUID id;
    private String name;
    private String email;
    private Set<RoleDto> roles;
    private Date createdAt;
    private Date lastLogin;
}