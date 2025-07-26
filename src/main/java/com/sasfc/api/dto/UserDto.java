package com.sasfc.api.dto;

import lombok.Data;
import java.util.Date;
import java.util.Set;


@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private Set<RoleDto> roles;
    private Date createdAt;
    private Date lastLogin;
}
