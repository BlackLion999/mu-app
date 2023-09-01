import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router';
import { useRegisterNewUserMutation } from '../../redux/services/userApi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Registration() {
    const successAuto = useSelector((state) => state.userReducer.successAuthorization);
    const [sumbitRegisterData,] = useRegisterNewUserMutation();
    const navigate = useNavigate();

    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [passwordError, setPasswordError] = useState(false);

    useEffect(()=>{
        if(successAuto) {
            navigate('/')
        }
    }, [])

    const handleOnchange = (event) => {
        setSignUpData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmitRegistration = (e) => {
        e.preventDefault()
        const { email, password, confirmPassword } = signUpData;

        if (!email || !password || !confirmPassword) {
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError(true);
            return;
        } else {
            setPasswordError(false)
        }

        sumbitRegisterData({ email, password })
            .then((res => {
                if (res.error) throw new Error('Registration field !!!');
                if (res.data.token) {
                    navigate('/signin')
                }
            }))
            .catch((err) => console.log(err))
    }

    return (
        <>
            <Form className="px-5">
                <Row>
                    <Col sm="12">
                        <h1 className='text-center m-2'>Sign Up</h1>
                    </Col>
                </Row>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">Email address</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            value={signUpData.email}
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            onChange={handleOnchange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            value={signUpData.password}
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleOnchange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >

                    {passwordError ?
                        <Form.Label column sm="2" style={{ color: "red" }}>
                            Password is not same
                        </Form.Label>
                        :
                        <Form.Label column sm="2">
                            Confirm Password
                        </Form.Label>
                    }
                    <Col sm="10">
                        <Form.Control
                            value={signUpData.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={handleOnchange} />
                    </Col>
                </Form.Group>
                <p><Link to='/signin'>Have already account ?</Link></p>
                <Button type="submit" variant="info" onClick={handleSubmitRegistration}>Sign Up</Button>
            </Form>
        </>
    );
}
