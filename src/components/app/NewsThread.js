import { List, Avatar, Button, Spin } from 'antd';
import React, { Component } from 'react';
import reqwest from 'reqwest';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
var MongoClient = require('mongodb').MongoClient;
var mongo_url = "mongodb://localhost:27017/mydb";

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export default class LoadMoreList extends React.Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }
    componentDidMount() {
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
                            title={NewsBox()}
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

function NewsBox(){
    let arrSites =[];
    let newsOptions = {
        projection: {
            url: 0,
            _id:0
        }
    };
    function sites_promised(mongo_url) {
        return new Promise((resolve) => {
            MongoClient.connect(mongo_url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("nameSites");
                dbo.collection("freshMeat").find({}, newsOptions).toArray(function (err, result) {
                    if (err) throw err;
                    let hotfix=0;
                    for(let q=1;q<=result.length;q++){
                        hotfix++;
                    }
                    console.log(hotfix);
                    for (let i = 0; i <= hotfix-1; i++) {
                        arrSites[i] = result[i].title;
                    }
                    db.close();
                    resolve(arrSites);
                });
            });
        });
    }
    sites_promised(mongo_url).then(result => {
        for(let i=0;i<=result.length;i++){
            if(result[i] !== undefined) {
                return result[i];
            }
            //
        }
    });
}