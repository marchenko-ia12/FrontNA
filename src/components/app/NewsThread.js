import React from 'react';
import reqwest from 'reqwest';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
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
                <a href={site.url}> {site.title} </a>
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


