import classes from './ToDoFunc.module.css';
import React, { useEffect, useState } from "react";
import { useGetAllTasksQuery, useSearchTaskQuery } from "../../store/api";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../../store/taskReducer";
import Loading from "../../components/Loading/Loading"
import TaskFunc from "../../components/Tasks/TaskFunc";
import Confirm from "../../components/Confrim";
import EditModalFunc from "../../components/EditModalFunc";
import SearchTaskDropDown from "../../components/SearchDropDown/SearchDropdown";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AddNewTaskModalFinc from "../../components/AddNewTask/AddNewTaskModalFunc";
import { useDebounce } from "../../customHook";
import { container } from 'webpack';

export default function ToDoFanc() {
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [toggleConfrimModal, setToggleConfrimModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const { data, isError, isLoading } = useGetAllTasksQuery();
    const debounced = useDebounce(searchText);

    const { data: searchResults } = useSearchTaskQuery(debounced);
    const dispatch = useDispatch();
    const taskData = useSelector((state) => state.tasksReducer.toDoList);
    const editedTask = useSelector((state) => state.tasksReducer.taskEditObj);
    const checkedTasks = useSelector((state) => state.tasksReducer.checkedTasks);

    useEffect(() => {
        if (data) {
            dispatch(getAllTasks(data));
        }
    }, [data]);

    const toogleModal = () => {
        setShowNewTaskModal(prev => !prev)
    }
    const handleSearchChange = (event) => {
        setSearchText(event.target.value)
    }

    return (
        <>
            {isLoading && <Loading />}
            <Container>
                <Row className="justi fy-content-center">
                    <Col className="text-center mt-5">
                        <Button
                            variant="info"
                            className="w-25"
                            onClick={() => { setShowNewTaskModal(prev => !prev) }}
                            disabled={checkedTasks.length > 0}
                        >
                            Add task
                        </Button>
                    </Col>
                </Row>

                <Row className="justify-content-center" expand="lg">
                    <Col className="m-5 w-25" lg="3">
                        <Form.Control 
                            className="justify-content-center"
                            value={searchText}
                            placeholder="Search"
                            onChange={handleSearchChange}
                            aria-label="Search"
                        />
                        {
                            searchResults &&
                            <Row className="justify-content-center">
                                <Col className="text-center mt-2" lg="3">
                                    <SearchTaskDropDown tasks={searchResults} />
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>

                <Row className="mt-5">
                    {
                        taskData?.map((item) => {
                            return (
                                <Col key={item.id} sm="12" md="6" lg="4" xl="3">
                                    <TaskFunc item={item} />
                                </Col>
                            )
                        })
                    }
                </Row>

                <Row className="justify-content-center">
                    <Button
                        onClick={() => setToggleConfrimModal(prev => !prev)}
                        variant="danger"
                        className="w-25"
                        disabled={checkedTasks.length <= 0}
                    >
                        Remove checked tasks
                    </Button>
                </Row>

                <Confirm
                    show={toggleConfrimModal}
                    onHide={() => setToggleConfrimModal(false)}
                />
                {
                    !!editedTask &&
                    <EditModalFunc
                    />
                }
                {
                    showNewTaskModal &&
                    <AddNewTaskModalFinc
                        onClose={toogleModal}
                    />
                }
            </Container>
        </>
    )
}