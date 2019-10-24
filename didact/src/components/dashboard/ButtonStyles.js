import styled from 'styled-components'

export const AddButton = styled.div`
    height: 75px;
    width: 175px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: none;
    background: #EEEFF3;
    border-radius: 15px;
    margin-bottom: 10px;
    &:hover {
        cursor: 'pointer';
    }
`
export const PlusDiv = styled.div`
    background: #575758;
    color: #EEEFF3;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Plus = styled.span`
    font-size: 3rem;
    padding-top: 3px;
`
export const ButtonText = styled.p`
    color: black;
    padding-right: 15px;
    font-weight: bold;
`