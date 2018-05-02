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
                        <MenuItem key="main">
                            Все новости
                        </MenuItem>
                        <MenuItem key="urnews">
                            Ваша подборка
                        </MenuItem>
                        <MenuItem key="profile">
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
          background: rgba(255, 255, 255, 0.7);
          font-weight: bolder;
      }

`;