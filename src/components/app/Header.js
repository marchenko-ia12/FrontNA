import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';
//import '../header.css';
import styled from 'styled-components';
import { Flex } from 'grid-styled';


const MenuItem = Menu.Item;
export default class Header extends Component {

    static contextTypes = {
        ...Component.contextTypes,
        router: PropTypes.object,
    };


    render() {
        return (
            <header className="header">
                <StyledFlex>
                    <Menu mode="horizontal" onClick={item => this.context.router.history.push(`/${item.key}`)}>
                        <MenuItem key="personal_news">
                            Ваша подборка
                        </MenuItem>
                        <MenuItem key="urnews">
                            Все новости
                        </MenuItem>
                        <MenuItem key="main">
                            Профиль
                        </MenuItem>
                    </Menu>
                </StyledFlex>
            </header>
        );
    }
}

const StyledFlex = styled(Flex)`
    justify-content: center;
      .ant-menu{
          display: flex;
          justify-content: space-between;
          width: 70%;
          padding: 0 20px;
          box-sizing: border-box;
         
          border-radius: 20px;
          font-weight: bolder;
      }      
`;