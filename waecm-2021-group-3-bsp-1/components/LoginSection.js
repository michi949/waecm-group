import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const LoginSection = () => {
    return (
        <StyledLoginSection>
            <StyledForm>
                <ProjectName>
                    <h1>waecm-2021<br/><span>group-3-bsp-1</span></h1>
                </ProjectName>
                <Title>
                    <h2>Login</h2>
                    <Line />
                </Title>  
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
    height: 100vh;
    width: 100%;
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 30rem;
    width: 20rem;
    background: rgba( 255, 255, 255, 0.20 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 10.0px );
    -webkit-backdrop-filter: blur( 10.0px );
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    border-radius: 2rem;
`;
const StyledInput = styled.input`
    background: transparent;
    width: 90%;
    padding: 1rem;
    margin-bottom: 2rem;
    border: none;
    background: rgba( 255, 255, 255, 0.40 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 10.0px );
    -webkit-backdrop-filter: blur( 10.0px );
    border-radius: 2rem;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-family: Poppins, sans-serif;
    color: grey;
    &:hover{
        box-shadow: 0 16px 40px 0 rgba( 31, 38, 135, 0.37 );
        color: black;
    }
`;
const StyledButton = styled.button`
    width: 90%;
    padding: 1rem;
    border-radius: 2rem;
    margin-bottom: 2rem;
    background-image: linear-gradient(to right, #ef32d9 0%, #89fffd  51%, #ef32d9  100%);
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px #eee;
    border:none;
    opacity: 0.8;
    cursor: pointer;
    &:hover{
        background-position: right center; /* change the direction of the change here */
        color: black;
        opacity: 0.9;
    }`
;
const Line = styled.div`
    position: relative;
    width: 34px;
    height: 3px;
    background: white;
    top: -10px;
`;
const Title = styled.div`
    padding-left: 7%;
    margin-right: auto;
    h2{
        padding: 0;
        margin: 0;
    }
`;
const ProjectName = styled.div`
    margin: 1rem;
    width: 90%;
    text-align: right;
    h1{ 
        display: inline-block;
        margin: 0;
        padding: 1rem;
        background: rgba( 255, 255, 255, 0.40 );
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 10.0px );
        -webkit-backdrop-filter: blur( 10.0px );
        border-radius: 2rem;
        border: 1px solid rgba( 255, 255, 255, 0.18 );
    }
`;


export default LoginSection
