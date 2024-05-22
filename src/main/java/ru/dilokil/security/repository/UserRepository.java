package ru.dilokil.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dilokil.security.entity.User;

import java.util.Iterator;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
