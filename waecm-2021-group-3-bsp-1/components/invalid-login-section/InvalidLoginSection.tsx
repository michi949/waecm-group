import styled from 'styled-components';


const InvalidLoginSection = () => {
  
    const navigateToMainPage = () => {
        window.location.assign(
            `http://localhost:3000`
          );
    }

    return (
      <StyledSection>
        <StyledForm>
        <StyledButton onClick={navigateToMainPage}>
            Login was incorrect 
        </StyledButton>
        </StyledForm>
      </StyledSection>
    );
  };
  
  const StyledSection = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100%;
  `;
  const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 10rem;
    width: 20rem;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 2rem;
  `;
  const StyledButton = styled.button`
    width: 90%;
    padding: 1rem;
    border-radius: 2rem;
    margin-bottom: 2rem;
    background-image: linear-gradient(
      to right,
      #ef32d9 0%,
      #89fffd 51%,
      #ef32d9 100%
    );
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;
    box-shadow: 0 0 20px #eee;
    border: none;
    opacity: 0.8;
    cursor: pointer;
    &:hover {
      background-position: right center; /* change the direction of the change here */
      color: black;
      opacity: 0.9;
    }
  `;

  export default InvalidLoginSection;