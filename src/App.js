import React, { Component } from 'react';
import {Flex} from 'grid-styled';
import styled from 'styled-components';
import Header from './components/app/Header'
import Routes from './components/app/Routes'

import './App.css';
export default class App extends Component {
    render() {
        return (
            <StyledFlex flexDirection='column' flex={1}>
                <Header />
                <Flex flex={1}>
                    <Routes />
                </Flex>
            </StyledFlex>
        );
    }
}

const StyledFlex = styled(Flex)`
	height: 100%;
	min-height: 100vh;
	background: #f3f3f3;
`;
