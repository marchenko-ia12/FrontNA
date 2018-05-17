import { List, Button, Spin } from 'antd';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
var bodyParser = require('body-parser');
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mydb");
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
var User = mongoose.model("User", nameSchema); */

var obj;
export default class LoadMoreList extends React.Component {

    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }
    componentDidMount() {
        const url = 'http://localhost:2000/urnews';
        fetch(url)
            .then(response => response.text())
            .then(data => obj = data)
            .then(data => console.log(obj));
        this.getData((res) => {
            this.setState({
                loading: false,
                data: res.results,
            });
        });
    }
    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
    }
    onLoadMore = () => {
        this.setState({
            loadingMore: true,
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                loadingMore: false,
            }, () => {
                window.dispatchEvent(new Event('resize'));
            });
        });
    }
    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
                    const loadMore = showLoadingMore ? (
                    <div style={{ textAlign: 'center', marginTop: 10, height: 32, lineHeight: '32px' }}>
                    {loadingMore && <Spin />}
                    {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
                    </div>
                    ) : null;
                    return (
                    <StyledFlex2>
                    <List
                    className="demo-loadmore-list"
                    loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[ <a>more</a>]}>
                        <List.Item.Meta
                            title={obj}
                            description="Fucked up beyond any recognition"
                        />
                        <div>content</div>
                    </List.Item>
                )}
            />
            </StyledFlex2>
        );

    }
}


const StyledFlex2 = styled(Flex)`
  .demo-loadmore-list {
  min-height: 350px;
}
    margin: auto;
    
`;


