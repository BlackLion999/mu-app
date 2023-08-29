import React, { useState } from 'react';
import { Button, Modal, Col, Form, Row, FloatingLabel} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { editTask, putEditedTaskOnList } from '../store/taskReducer';
import { useEditSelectedTaskMutation } from '../store/api';

export default function EditModalFunc() {
    const [sendEditedTask] = useEditSelectedTaskMutation();
    const taskObj = useSelector((state) => state.tasksReducer.taskEditObj);
    const dispatch = useDispatch();
    const [editedTask, setEditedTask] = useState(taskObj)

    const handleInputChange = (event) => {

        setEditedTask(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

    }

    const handleRadioChange = (event) => {
        const newFormData = {
            ...editedTask,
            importance: event.target.name,
        };
        setEditedTask(newFormData);
    }

    const handleAddKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSaveEditedTask();
        }

    }

    const handleSaveEditedTask = () => {
        sendEditedTask(editedTask)
            .then((resp) => {
                dispatch(putEditedTaskOnList(resp));
                dispatch(editTask(null));
            })
            .catch((err) => console.log('error===>>>', err))
    }

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={true}
            onHide={() => dispatch(editTask(null))}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit task
                </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Form onKeyDown={handleAddKeyDown}>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Title
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Title" name="title" value={editedTask.title} onChange={handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword" onChange={handleInputChange}>
                        <Form.Label column sm={2}>
                            Description
                        </Form.Label>
                        <Col sm={10}>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Description"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    name="description"
                                    value={editedTask.description} />
                            </FloatingLabel>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Developer
                        </Form.Label>

                        <Col sm={10}>
                            <Form.Select aria-label="Default select example" name="developer" value={editedTask.developer} onChange={handleInputChange}>
                                <option value="">Select a developer</option>
                                <option value="Aksana">Aksana</option>
                                <option value="Hovo">Hovo</option>
                                <option value="Vardges">Vardges</option>
                                <option value="Armen">Armen</option>
                                <option value="ELizabet">Elizabet</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
                                Radios
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="low"
                                    name="low"
                                    id="formHorizontalRadios1"
                                    checked={editedTask.importance === "low"}
                                    onChange={handleRadioChange}
                                />
                                <Form.Check
                                    type="radio"
                                    label="medium"
                                    name="medium"
                                    id="formHorizontalRadios2"
                                    checked={editedTask.importance === "medium"}
                                    onChange={handleRadioChange}

                                />
                                <Form.Check
                                    type="radio"
                                    label="high"
                                    name="high"
                                    id="formHorizontalRadios3"
                                    checked={editedTask.importance === "high"}
                                    onChange={handleRadioChange}

                                />
                            </Col>
                        </Form.Group>
                    </fieldset>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={handleSaveEditedTask}>Confirm</Button>
                <Button variant="secondary" onClick={() => dispatch(editTask(null))}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}