import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { editTask } from '../redux/features/tasksReducer';
import { useGetSingleTaskQuery } from '../redux/services/api';
import EditModalFunc from '../components/EditModalFunc';
import Loading from '../components/Loading/Loading';
import request from '../utils/apis'

const REACT_APP_URL_API = process.env.REACT_APP_URL_API;


export default function SingleTask() {
    const [taskData, setTaskData] = useState(null);
    const editedTask = useSelector((stste) => StaticRange.tasksReducer.taskEditObj);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, isLoading, isError } = useGetSingleTaskQuery(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setTaskData(data);
        }
    }, [data])

    const handleRemoveSingleTask = (taskId) => {
        request(`${REACT_APP_URL_API}/tasks/${taskId}`, 'DELETE')
            .then(navigate('/'))
            .catch(error => console.log(error))
    }

    if (isLoading) return <Loading />

    return (
        <>
            {
                taskData &&
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {taskData.Title}
                        </Card.Title>
                        <Card.Text>
                            {taskData.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className='list-group-flush'>
                        <ListGroup.Item>{taskData.importance}</ListGroup.Item>
                        <ListGroup.Item>{taskData.developer}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button
                            className='m-2'
                            variant='danger'
                            onClick={() => handleRemoveSingleTask(id)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            className='m-2'
                            variant='info'
                            onClick={() => dispatch(editTask(taskData))}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    </Card.Body>
                </Card>
            }
            {
                !!editedTask && <EditModalFunc />
            }
        </>

    )
}