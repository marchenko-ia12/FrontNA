import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

export default class LoadMoreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    };

    componentDidMount() {
        const url = 'http://localhost:2000/urnews';
        fetch(url)
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    data: responseData
                });
            })
    }
    render() {
        const list = this.state.data.map(site => (
            <li>
                <a key={'mykey'} href={site.url}> {site.title} </a>
            </li>
        ));
        return (
            <StyledFlex2>
            <div>
                <ul>
                    {list}
                </ul>
            </div>
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


