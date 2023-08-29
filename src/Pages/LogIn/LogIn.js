import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSignInMutation } from '../../redux/services/userApi';
import { useNavigate } from 'react-router';

export default function LogIn() {
    const [signIn] = useSignInMutation();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleOnchange = (event) => {
        setLoginData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))

    }


    const handleSignIn = (e)=>{
        e.preventDefault();
        const {email, password} = loginData;
        if(!email || !password){
            return;
        }

        signIn({password})
        .then((res)=>{
            console.log('rrrrrrrrrrrrrr===>>>', res)
            if(res.error) throw new Error('Sign in field !!!');
            if(res.data.token){
                localStorage.setItem('token', res.data.token)
                navigate('/');
            }
        })

    }

    return (
        <Form className="px-5">
            <Row>
                <Col sm="12">
                    <h1 className='text-center m-2'>Sign In</h1>
                </Col>
            </Row>
            <Form.Group as={Row} className="mb-3" >
                <Form.Label column sm="2">Email address</Form.Label>
                <Col sm="10">
                    <Form.Control
                        value={loginData.email}
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
                        value={loginData.password}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleOnchange} />
                </Col>
            </Form.Group>
            <Button type="submit" variant="info" onClick={handleSignIn}>Sign In</Button>
        </Form>
    )
}