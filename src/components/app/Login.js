import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import React from 'react'


export default class Login extends React.Component {
    render(){
        return(
            <StyledFlex2>
            <h1>Вы вошли!</h1>
            </StyledFlex2>
        )
    }
}

const StyledFlex2 = styled(Flex)`
  .demo-loadmore-list {
  min-height: 350px;
}
    margin: auto;
    
`;