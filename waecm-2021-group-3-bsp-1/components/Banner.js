import React from 'react'
import styled from 'styled-components'

const Banner = () => {
    return (
        <StyledBanner>
            <h1>waecm-2021-group-3-bsp-1</h1>
        </StyledBanner>
    )
}

const StyledBanner = styled.div`
    display: grid;
    place-items: center;
    min-height: 10vh;
    width: 100%;
    background: #6ACC98;
    position: sticky;
    top: 0;
    left: 0;
`;

export default Banner
