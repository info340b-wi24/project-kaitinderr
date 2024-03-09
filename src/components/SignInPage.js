import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function UserCard(props) {
    return ( // code from React Bootstrap documentation
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.user.userName}</Card.Title>
                <Button variant="primary" onClick={() => props.loginCallback(props.user)}>Continue</Button>
            </Card.Body>
        </Card>
    );
}

function SignInPage(props) {
    const currentUser = props.currentUser;
    const loginFunction = props.loginCallback;

    const handleClick = (user) => {
        loginFunction(user);
    }

    const userCards = props.users.map(user => {
        return <UserCard user={user} loginCallback={handleClick} key={user.userId}/>
    })

    return (
        <div>
            <h1>Select a User</h1>
            {currentUser.userId && <h3>Currently logged in as {currentUser.userName}</h3>}
            <div className='row'>
                {userCards}
            </div>
        </div>
    )
}


export default SignInPage;