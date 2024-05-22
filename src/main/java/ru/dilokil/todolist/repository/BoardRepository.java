package ru.dilokil.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.dilokil.security.entity.User;
import ru.dilokil.todolist.model.Board;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> getAllByOwner(User owner);
}
