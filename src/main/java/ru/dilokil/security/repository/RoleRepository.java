package ru.dilokil.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dilokil.security.entity.EnumRole;
import ru.dilokil.security.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(EnumRole name);
}
