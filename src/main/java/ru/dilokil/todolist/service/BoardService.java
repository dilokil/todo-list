package ru.dilokil.todolist.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.dilokil.security.entity.User;
import ru.dilokil.security.repository.UserRepository;
import ru.dilokil.security.service.UserDetailsImpl;
import ru.dilokil.todolist.model.Board;
import ru.dilokil.todolist.repository.BoardRepository;
import ru.dilokil.todolist.repository.TaskRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BoardService {
    private UserRepository userRepository;
    private BoardRepository boardRepository;
    private TaskRepository taskRepository;

    public BoardService(UserRepository userRepository, BoardRepository boardRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.taskRepository = taskRepository;
    }

    @Transactional
    public List<Board> getAllBoardForAuthUser() {
        UserDetailsImpl userDetails =(UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        List<Board> boardList = boardRepository.getAllByOwner(user);
        if (boardList == null || boardList.isEmpty()) {
            boardList = initBoards();
            saveBoards(boardList);
        }
        return boardList;

    }

    @Transactional
    public void saveBoards(List<Board> boardList) {
        UserDetailsImpl userDetails =(UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.getOne(userDetails.getId());

        boardList.forEach(board -> {
            board.setOwner(user);
            board.getTasks().forEach(task -> {
                task.setBoard(board);
                taskRepository.save(task);
            });
            boardRepository.save(board);
        });
    }

    public List<Board> initBoards() {
        UserDetailsImpl userDetails =(UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        User user = userRepository.getOne(userDetails.getId());

        Board todoBoard = new Board();
        Board inProgressBoard = new Board();
        Board doneBoard = new Board();

        todoBoard.setTitle("Сделать");
        todoBoard.setOwner(user);

        inProgressBoard.setTitle("В работе");
        inProgressBoard.setOwner(user);

        doneBoard.setTitle("Готово");
        doneBoard.setOwner(user);

        return List.of(todoBoard, inProgressBoard, doneBoard);
    }
}
