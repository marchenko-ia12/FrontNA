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
        const url = '/api/personal_news';
        axios.get(url, {
            params: {
                token: sessionStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({
                    data: response.data
                });
            });


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
            <StyledFlex>
            <li key={site._id}>
                <a
                    href={site.url}
                    onClick={async () => this.postTagInProfile(site.tag)}
                    target='_blank'> {site.title} </a>
            </li>
            </StyledFlex>
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

const StyledFlex = styled(Flex)`
  font-family: "Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  border-color: #eee #ddd #bbb;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  margin: 10px 5px;
  padding: 0 16px 16px 16px;
  max-width: 800px;
`;


