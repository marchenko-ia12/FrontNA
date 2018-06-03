import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
const axios = require('axios');

export default class PersonalNewsThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };

    };

    componentDidMount() {
        const user = sessionStorage.getItem('token');
        axios.get('/api/personal_news', {
            params: {
                token: user,
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({
                    data: responseData
                });
            })
    }

    async postTagInProfile(tag) {
        const user = sessionStorage.getItem('token');
        const news = {
            token: user,
            tag: tag,
        };
        axios.post('/api/personal_news', {news})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        const list = this.state.data.map(site => (
            <li key={site._id}>
                <a
                    href={site.url}
                    onClick={async () => this.postTagInProfile(site.tag)}
                    target='_blank'> {site.title} </a>
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


