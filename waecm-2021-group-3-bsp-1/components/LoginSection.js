import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const LoginSection = () => {
    return (
        <StyledLoginSection>
            <StyledForm>
                <h2>Login</h2>
                <StyledInput type="username" name="username" placeholder="Username"></StyledInput>
                <StyledInput type="password" name="username" placeholder="Password"></StyledInput>
                <StyledButton><Link href="">Login</Link></StyledButton>
            </StyledForm>
        </StyledLoginSection>
            
    )
}

const StyledLoginSection = styled.div`
    display: grid;
    place-items: center;
    height: 90vh;
    width: 100%;
    background-color: #85FFBD;
    background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 50%, #ffffff 100%);
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 30rem;
    width: 20rem;
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 2rem;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
`;
const StyledInput = styled.input`
    background: transparent;
    width: 90%;
    padding: 1rem;
    margin-bottom: 2rem;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 2rem;
    -webkit-backdrop-filter: blur(5px);
            backdrop-filter: blur(5px);
    box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
    color: #698073;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    &:hover{
        color: #fff;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
    }
`;
const StyledButton = styled.button`
    background-color: #85FFBD;
    background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 50%, #ffffff 100%);
    width: 90%;
    padding: 1rem;
    margin-bottom: 2rem;
    border: none;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 2rem;
    -webkit-backdrop-filter: blur(5px);
            backdrop-filter: blur(5px);
    box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
    color: white;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    &:hover{
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 4px 4px 60px 8px rgba(0, 0, 0, 0.2);
        color: black;
    }
`;


export default LoginSection
