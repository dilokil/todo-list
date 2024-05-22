package ru.dilokil.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.dilokil.todolist.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
