import {useState} from "react";
import "./App.css"
import UserService from "../services/UserService";

export default function TodoList({boards, setBoards}) {

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);


    function dragOverHandler(event) {
        event.preventDefault();
        if (event.target.className === "item") {
            event.target.style.boxShadow = "0 4px 3px gray";
        }
    }

    function dragLeaveHandler(event) {
        event.target.style.boxShadow = "none";
    }

    function dragStartHandler(event, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragEndHandler(event) {
        event.target.style.boxShadow = "none";
    }

    function dropHandler(event, board, item) {
        event.preventDefault();
        const currentIndex = currentBoard.tasks.indexOf(currentItem);
        currentBoard.tasks.splice(currentIndex, 1);
        const dropIndex = board.tasks.indexOf(item);
        board.tasks.splice(dropIndex + 1, 0, currentItem);
        updateBoards(board, currentBoard);
        event.target.style.boxShadow = "none";
    }

    function dropCardHandler(event, board) {
        if (board.tasks.length === 0) {
            board.tasks.push(currentItem);
            const currentIndex = currentBoard.tasks.indexOf(currentItem);
            currentBoard.tasks.splice(currentIndex, 1);
            updateBoards(board, currentBoard);
        }
    }

    function updateBoards(board, currentBoard = null) {
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (currentBoard !== null && b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }));
        UserService.saveUserBoards(boards);
    }

    const  [inputValue, setInputValue] =  useState('');

    const  handleChange = (event) => {
        setInputValue(event.target.value);
    };

    function handleClick(event) {
        const board = boards.find(el => el.title === "Сделать");
        board.tasks.push({id: null, title: inputValue});
        setInputValue("");
        updateBoards(board);
    }

    function deleteHandler(event, board, item) {
        board.tasks.splice(board.tasks.indexOf(item), 1);
        updateBoards(board);
    }

    return (
        <>
            <div className={"add_panel"}>
                <input
                    className={"form__input"}
                    type="text" value={inputValue}
                    placeholder={"Название новой задачи"}
                    onChange={handleChange}
                />
                <button className={"add_button"} onClick={handleClick}>Добавить</button>
            </div>
            <div className={"app"}>

                {boards.map(board =>
                    <div className={"board"}
                         onDragOver={event => dragOverHandler(event)}
                         onDrop={event => dropCardHandler(event, board)}
                    >
                        <div className={"board__title"}>{board.title}</div>
                        {board.tasks.map(item =>
                            <div className={"item"}
                                 draggable={true}
                                 onDragOver={event => dragOverHandler(event, board, item)}
                                 onDragLeave={event => dragLeaveHandler(event)}
                                 onDragStart={event => dragStartHandler(event, board, item)}
                                 onDragEnd={event => dragEndHandler(event)}
                                 onDrop={event => dropHandler(event, board, item)}
                            >
                                {item.title}
                                <button className={"delete_button"} onClick={event => deleteHandler(event, board, item)}></button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
